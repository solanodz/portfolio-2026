import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SiteFooter } from "../components/site-footer";
import { ArticleKeywordBadge } from "../components/article-keyword-badge";
import { formatArticleDate, getPublishedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog — Solano de Zuasnabar",
  description:
    "Articles by Solano de Zuasnabar about AI engineering, production systems, and applied machine learning.",
};

export default async function BlogPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="site-main mx-auto flex min-h-screen max-w-4xl flex-col">
      <div className="site-main-inner flex flex-1 flex-col">
        <div className="site-text flex-1">
        <header>
            <h1 className="text-xl font-semibold tracking-tight text-text">Blog</h1>
            <p className="mt-2 text-muted">
              Notes on AI engineering, product systems, and the work behind taking
              prototypes into production.
            </p>
          </header>

          <section className="site-section">
            {articles.length > 0 ? (
              <div className="space-y-12">
                {articles.map((article) => (
                  <article key={article.slug}>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="group inline-flex items-center gap-1.5 text-lg font-semibold"
                    >
                      <span className="text-text transition-colors group-hover:text-secondary">
                        {article.metadata.title}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-secondary"
                        strokeWidth={1.5}
                      />
                    </Link>
                    <p className="mt-1 font-mono text-xs text-faint">
                      {formatArticleDate(article.metadata.publishedAt)}
                    </p>
                    <p className="mt-3 text-secondary">{article.metadata.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {article.metadata.keywords.map((keyword) => (
                        <ArticleKeywordBadge key={keyword}>{keyword}</ArticleKeywordBadge>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-muted">No articles published yet.</p>
            )}
          </section>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
