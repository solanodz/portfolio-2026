import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ArticleKeywordBadge } from "@/app/components/article-keyword-badge";
import { cn } from "@/lib/utils";

type ArticlePreviewCardProps = {
  slug: string;
  title: string;
  summary: string;
  keywords: string[];
  innerClassName?: string;
};

export function ArticlePreviewCard({
  slug,
  title,
  summary,
  keywords,
  innerClassName,
}: ArticlePreviewCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block h-full w-full transition-colors hover:bg-bg-hover"
    >
      <div className={cn("px-4 py-2.5", innerClassName)}>
        <span className="inline-flex items-start gap-1.5">
          <span className="text-sm font-semibold leading-snug text-text">
            {title}
          </span>
          <ArrowUpRight
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-faint"
            strokeWidth={1.5}
          />
        </span>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
          {summary}
        </p>
        {keywords.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {keywords.map((keyword) => (
              <ArticleKeywordBadge key={keyword} size="sm">
                {keyword}
              </ArticleKeywordBadge>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
