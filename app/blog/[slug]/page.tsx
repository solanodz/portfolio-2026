import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { ArticleIndex } from "@/app/components/article-index";
import { ArticleKeywordBadge } from "@/app/components/article-keyword-badge";
import { mdxComponents } from "@/app/components/mdx-components";
import { MarkerHighlight } from "@/app/components/text-marker";
import { ReadingProgress } from "@/app/components/reading-progress";
import { RelatedArticles } from "@/app/components/related-articles";
import { SiteFooter } from "@/app/components/site-footer";
import {
  formatArticleDate,
  getPublishedArticle,
  getPublishedArticles,
  getRelatedPublishedArticles,
} from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const prettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark-dimmed",
  },
  keepBackground: false,
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getPublishedArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.metadata.title} — Solano de Zuasnabar`,
    description: article.metadata.summary,
    keywords: article.metadata.keywords,
    openGraph: {
      title: article.metadata.title,
      description: article.metadata.summary,
      type: "article",
      publishedTime: article.metadata.publishedAt,
      modifiedTime: article.metadata.updatedAt,
      images: article.metadata.coverImage ? [article.metadata.coverImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedPublishedArticles(slug);

  return (
    <main className="site-main w-full">
      <ReadingProgress />

      <div className="article-layout mt-6">
        <ArticleIndex headings={article.headings} />

        <div className="article-layout-content">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-[2rem] sm:leading-tight">
              <MarkerHighlight className="text-2xl sm:text-[2rem] sm:leading-tight">
                {article.metadata.title}
              </MarkerHighlight>
            </h1>
            <p className="mt-4 text-muted">{article.metadata.summary}</p>
            <div className="mt-4 space-y-1 font-mono text-xs text-faint">
              <p>Published {formatArticleDate(article.metadata.publishedAt)}</p>
              {article.metadata.updatedAt ? (
                <p>Updated {formatArticleDate(article.metadata.updatedAt)}</p>
              ) : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-1">
              {article.metadata.keywords.map((keyword) => (
                <ArticleKeywordBadge key={keyword}>{keyword}</ArticleKeywordBadge>
              ))}
            </div>
          </header>

          <article className="mt-8 border-t border-line pt-8">
            <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{
                blockJS: false,
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
                },
              }}
            />
          </article>
        </div>

        <RelatedArticles articles={relatedArticles} />
      </div>

      <SiteFooter />
    </main>
  );
}
