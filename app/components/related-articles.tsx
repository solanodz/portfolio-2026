import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { RelatedArticle } from "@/lib/articles";

export function RelatedArticles({ articles }: { articles: RelatedArticle[] }) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <aside className="hidden lg:block">
      <nav
        aria-label="Related articles"
        className="sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto border-l border-line pl-8"
      >
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Related
        </p>
        <ul className="space-y-6">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/blog/${article.slug}`}
                className="group block"
              >
                <span className="inline-flex items-start gap-1.5">
                  <span className="text-[13px] font-semibold leading-snug text-text transition-colors group-hover:text-emerald-400">
                    {article.metadata.title}
                  </span>
                  <ArrowUpRight
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-faint transition-colors group-hover:text-emerald-400"
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
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
