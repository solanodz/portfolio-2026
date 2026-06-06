import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { SiteFooter } from "../components/site-footer";
import { formatArticleDate, getPublishedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog — Solano de Zuasnabar",
  description:
    "Articles by Solano de Zuasnabar about AI engineering, production systems, and applied machine learning.",
};

export default async function BlogPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16 text-[15px] leading-relaxed text-secondary sm:py-20">
      <div className="flex-1">
        <Link
          href="/"
          className="icon-hover inline-flex items-center gap-1.5 text-sm text-muted"
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
          Back
        </Link>

        <header className="mt-8">
          <h1 className="text-xl font-semibold tracking-tight text-text">Blog</h1>
          <p className="mt-2 max-w-xl text-muted">
            Notes on AI engineering, product systems, and the work behind taking
            prototypes into production.
          </p>
        </header>

        <section className="mt-12 border-t border-line pt-10">
          {articles.length > 0 ? (
            <div className="space-y-8">
              {articles.map((article) => (
                <article key={article.slug}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group inline-flex items-center gap-1.5 text-lg font-semibold"
                  >
                    <span className="text-text transition-colors group-hover:text-emerald-400">
                      {article.metadata.title}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-emerald-400"
                      strokeWidth={1.5}
                    />
                  </Link>
                  <p className="mt-1 font-mono text-xs text-faint">
                    {formatArticleDate(article.metadata.publishedAt)}
                  </p>
                  <p className="mt-3 max-w-2xl text-secondary">
                    {article.metadata.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {article.metadata.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="shrink-0 rounded bg-emerald-400 px-2 py-1 text-[11px] font-medium leading-none text-white dark:text-black"
                      >
                        {keyword}
                      </span>
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

      <SiteFooter />
    </main>
  );
}
