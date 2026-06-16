import { cn } from "@/lib/utils";

import { profile } from "../data";

const highlightClassName =
  "box-decoration-clone bg-yellow-300/85 px-[0.3em] py-[0.01em] text-neutral-950";

/** Yellow highlighter — Tailwind only. */
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
