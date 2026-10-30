import { cn } from "@/lib/utils";

import { profile } from "../data";

/** Sole accent mark — soft yellow highlighter for rare emphasis only. */
const highlightClassName =
  "box-decoration-clone bg-yellow-200/80 px-[0.22em] py-[0.02em] text-neutral-950 dark:bg-yellow-300/70";

/** Yellow highlighter — use sparingly (role, open article title). */
export function MarkerHighlight({
  children,
  className,
  as: Component = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "code";
}) {
  return (
    <Component className={cn(highlightClassName, className)}>{children}</Component>
  );
}

/** Profile role title only ("AI Engineer"). */
export function RoleTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  if (children !== profile.role) {
    return <span className={className}>{children}</span>;
  }

  return <span className={cn(highlightClassName, className)}>{children}</span>;
}
