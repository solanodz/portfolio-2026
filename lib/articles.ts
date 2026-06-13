import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { getArticleHeadings, type ArticleHeading } from "./article-headings";

const articlesDirectory = path.join(process.cwd(), "content", "articles");
const articleFileExtension = ".mdx";
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export type ArticleMetadata = {
  title: string;
  publishedAt: string;
  updatedAt?: string;
  summary: string;
  keywords: string[];
  coverImage?: string;
  draft?: boolean;
};

export type Article = {
  slug: string;
  content: string;
  metadata: ArticleMetadata;
  headings: ArticleHeading[];
};

export type RelatedArticle = {
  slug: string;
  metadata: ArticleMetadata;
  sharedKeywords: string[];
};

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRequiredString(
  metadata: Record<string, unknown>,
  field: string,
  source: string,
) {
  const value = metadata[field];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${source}: frontmatter field "${field}" is required.`);
  }

  return value.trim();
}

function readOptionalString(
  metadata: Record<string, unknown>,
  field: string,
  source: string,
) {
  const value = metadata[field];

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${source}: frontmatter field "${field}" must be a string.`);
  }

  return value.trim();
}

function validateDate(value: string, field: string, source: string) {
  if (!datePattern.test(value)) {
    throw new Error(`${source}: frontmatter field "${field}" must be YYYY-MM-DD.`);
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(`${source}: frontmatter field "${field}" is not a valid date.`);
  }
}

function validateMetadata(rawMetadata: unknown, source: string): ArticleMetadata {
  if (!isPlainRecord(rawMetadata)) {
    throw new Error(`${source}: frontmatter is required.`);
  }

  const title = readRequiredString(rawMetadata, "title", source);
  const publishedAt = readRequiredString(rawMetadata, "publishedAt", source);
  const updatedAt = readOptionalString(rawMetadata, "updatedAt", source);
  const summary = readRequiredString(rawMetadata, "summary", source);
  const coverImage = readOptionalString(rawMetadata, "coverImage", source);
  const draft = rawMetadata.draft;
  const keywords = rawMetadata.keywords;

  validateDate(publishedAt, "publishedAt", source);

  if (updatedAt) {
    validateDate(updatedAt, "updatedAt", source);

    if (updatedAt < publishedAt) {
      throw new Error(`${source}: "updatedAt" cannot be before "publishedAt".`);
    }
  }

  if (
    !Array.isArray(keywords) ||
    keywords.length === 0 ||
    keywords.some((keyword) => typeof keyword !== "string" || keyword.trim().length === 0)
  ) {
    throw new Error(`${source}: frontmatter field "keywords" must be a non-empty string array.`);
  }

  if (draft !== undefined && typeof draft !== "boolean") {
    throw new Error(`${source}: frontmatter field "draft" must be a boolean.`);
  }

  if (coverImage && !coverImage.startsWith("/")) {
    throw new Error(`${source}: frontmatter field "coverImage" must start with "/".`);
  }

  return {
    title,
    publishedAt,
    updatedAt,
    summary,
    keywords: keywords.map((keyword) => keyword.trim()),
    coverImage,
    draft,
  };
}

async function getArticleFilenames() {
  const entries = await fs.readdir(articlesDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(articleFileExtension))
    .map((entry) => entry.name)
    .sort();
}

export async function getAllArticles() {
  const filenames = await getArticleFilenames();

  return Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.slice(0, -articleFileExtension.length);
      const sourcePath = path.join(articlesDirectory, filename);
      const source = await fs.readFile(sourcePath, "utf8");
      const parsed = matter(source);

      return {
        slug,
        content: parsed.content,
        metadata: validateMetadata(parsed.data, filename),
        headings: getArticleHeadings(parsed.content),
      };
    }),
  );
}

export async function getPublishedArticles() {
  const articles = await getAllArticles();

  return articles
    .filter((article) => !article.metadata.draft)
    .sort((a, b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt));
}

export async function getPublishedArticle(slug: string) {
  const articles = await getPublishedArticles();

  return articles.find((article) => article.slug === slug) ?? null;
}

function normalizeKeyword(keyword: string) {
  return keyword.trim().toLowerCase();
}

function getKeywordDocumentFrequency(
  articles: Pick<Article, "metadata">[],
) {
  const frequencies = new Map<string, number>();

  for (const article of articles) {
    const uniqueKeywords = new Set(
      article.metadata.keywords.map(normalizeKeyword),
    );

    for (const keyword of uniqueKeywords) {
      frequencies.set(keyword, (frequencies.get(keyword) ?? 0) + 1);
    }
  }

  return frequencies;
}

function getSharedKeywords(left: string[], right: string[]) {
  const leftKeywords = new Set(left.map(normalizeKeyword));

  return right.filter((keyword, index, keywords) => {
    const normalized = normalizeKeyword(keyword);

    return (
      leftKeywords.has(normalized) &&
      keywords.findIndex((item) => normalizeKeyword(item) === normalized) === index
    );
  });
}

export function getRelatedArticles(
  currentSlug: string,
  articles: Pick<Article, "slug" | "metadata">[],
  limit = 3,
): RelatedArticle[] {
  const current = articles.find((article) => article.slug === currentSlug);

  if (!current) {
    return [];
  }

  const keywordDocumentFrequency = getKeywordDocumentFrequency(articles);
  const totalArticles = articles.length;

  const ranked = articles
    .filter((article) => article.slug !== currentSlug)
    .map((article) => {
      const sharedKeywords = getSharedKeywords(
        current.metadata.keywords,
        article.metadata.keywords,
      );

      const score = sharedKeywords.reduce((total, keyword) => {
        const documentFrequency =
          keywordDocumentFrequency.get(normalizeKeyword(keyword)) ?? 1;

        return total + Math.log((totalArticles + 1) / documentFrequency);
      }, 0);

      return { article, sharedKeywords, score };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return right.article.metadata.publishedAt.localeCompare(
        left.article.metadata.publishedAt,
      );
    });

  const related = ranked.filter(({ score }) => score > 0).slice(0, limit);

  if (related.length > 0) {
    return related.map(({ article, sharedKeywords }) => ({
      slug: article.slug,
      metadata: article.metadata,
      sharedKeywords,
    }));
  }

  return ranked.slice(0, limit).map(({ article }) => ({
    slug: article.slug,
    metadata: article.metadata,
    sharedKeywords: [],
  }));
}

export async function getRelatedPublishedArticles(slug: string, limit = 3) {
  const articles = await getPublishedArticles();

  return getRelatedArticles(slug, articles, limit);
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}
