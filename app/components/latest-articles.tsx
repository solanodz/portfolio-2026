import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ArticlePreviewCard } from "@/app/components/article-preview-card";
import { getLatestPublishedArticles } from "@/lib/articles";

export async function LatestArticles({ limit = 3 }: { limit?: number }) {
  const articles = await getLatestPublishedArticles(limit);

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="site-section site-articles-row">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2">
        <h2 className="text-sm font-medium text-muted">Latest writing</h2>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-0.5 text-xs text-muted transition-colors hover:border-line-strong hover:bg-bg-hover hover:text-text"
        >
          View all
          <ArrowUpRight className="h-3 w-3 shrink-0" strokeWidth={1.5} />
        </Link>
      </div>

      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <li key={article.slug} className="min-w-0">
            <ArticlePreviewCard
              slug={article.slug}
              title={article.metadata.title}
              summary={article.metadata.summary}
              keywords={article.metadata.keywords}
              innerClassName="px-4 py-2.5"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
