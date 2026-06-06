import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { ArticleIndex } from "@/app/components/article-index";
import { mdxComponents } from "@/app/components/mdx-components";
import { ReadingProgress } from "@/app/components/reading-progress";
import { SiteFooter } from "@/app/components/site-footer";
import {
  formatArticleDate,
  getPublishedArticle,
  getPublishedArticles,
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

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 text-[15px] leading-relaxed text-secondary sm:py-20">
      <ReadingProgress />
      <div className="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10">
        <div className="hidden lg:block" />
        <Link
          href="/blog"
          className="icon-hover inline-flex items-center gap-1.5 text-sm text-muted"
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
          Blog
        </Link>

        <ArticleIndex headings={article.headings} />

        <div className="min-w-0">
          <article className="mt-8">
            <header>
              <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-[2rem] sm:leading-tight">
                {article.metadata.title}
              </h1>
              <p className="mt-4 max-w-3xl text-muted">
                {article.metadata.summary}
              </p>
              <div className="mt-4 space-y-1 font-mono text-xs text-faint">
                <p>Published {formatArticleDate(article.metadata.publishedAt)}</p>
                {article.metadata.updatedAt ? (
                  <p>Updated {formatArticleDate(article.metadata.updatedAt)}</p>
                ) : null}
              </div>
              <div className="mt-4 flex flex-wrap gap-1">
                {article.metadata.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="shrink-0 rounded bg-emerald-400 px-2 py-1 text-[11px] font-medium leading-none text-white dark:text-black"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </header>

            <div className="mt-10 border-t border-line pt-10">
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
            </div>
          </article>

          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
