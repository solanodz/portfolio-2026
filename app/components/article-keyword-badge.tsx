import { cn } from "@/lib/utils";

type ArticleKeywordBadgeProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
};

const badgeClassNames = {
  sm: "shrink-0 bg-emerald-400/15 px-1.5 py-0.5 text-[10px] font-medium leading-none text-emerald-600 dark:text-emerald-300",
  md: "shrink-0 bg-emerald-400 px-2 py-1 text-[11px] font-medium leading-none text-white dark:text-black",
} as const;

export function ArticleKeywordBadge({
  children,
  className,
  size = "md",
}: ArticleKeywordBadgeProps) {
  return (
    <span className={cn(badgeClassNames[size], className)}>{children}</span>
  );
}
