import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { RelatedArticle } from "@/lib/articles";

export function RelatedArticles({ articles }: { articles: RelatedArticle[] }) {
  if (articles.length === 0) {
    return <aside className="hidden" aria-hidden="true" />;
  }

  return (
    <aside className="article-layout-sidebar w-full max-w-none justify-self-stretch overflow-x-hidden overflow-y-auto">
      <nav aria-label="Related articles">
        <p className="mb-5 px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-faint min-[1400px]:px-5 min-[1536px]:px-6 min-[1800px]:px-8">
          Related
        </p>
        <ul className="space-y-1">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/blog/${article.slug}`}
                className="block w-full transition-colors hover:bg-bg-hover"
              >
                <div className="px-4 py-2.5 min-[1400px]:px-5 min-[1536px]:px-6 min-[1800px]:px-8">
                <span className="inline-flex items-start gap-1.5">
                  <span className="text-sm font-semibold leading-snug text-text">
                    {article.metadata.title}
                  </span>
                  <ArrowUpRight
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-faint"
                    strokeWidth={1.5}
                  />
                </span>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
                  {article.metadata.summary}
                </p>
                {article.sharedKeywords.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {article.sharedKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="shrink-0 rounded bg-emerald-400/15 px-1.5 py-0.5 text-[10px] font-medium leading-none text-emerald-600 dark:text-emerald-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
