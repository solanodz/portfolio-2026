import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";
import { Mermaid } from "./mermaid";

function ArticleLink(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href ?? "";
  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-text underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-text"
      >
        {props.children}
      </Link>
    );
  }

  return (
    <a
      {...props}
      className={cn(
        "text-text underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-text",
        props.className,
      )}
      target="_blank"
      rel="noopener noreferrer"
    />
  );
}

export const mdxComponents = {
  Mermaid,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 {...props} className="mt-12 text-lg font-semibold tracking-tight text-text" />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 {...props} className="mt-8 text-base font-semibold tracking-tight text-text" />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="mt-5 text-secondary" />
  ),
  a: ArticleLink,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="mt-5 list-disc space-y-2 pl-5 text-secondary" />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="mt-5 list-decimal space-y-2 pl-5 text-secondary" />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} className="pl-1" />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="mt-6 border-l border-line-strong pl-4 text-muted"
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr {...props} className="my-10 border-line" />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <img
      {...props}
      className={cn("mt-6 rounded-lg border border-line", props.className)}
      alt={props.alt ?? ""}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      className="mt-6 overflow-x-auto rounded-lg border border-line bg-bg-subtle p-4 text-sm"
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      className={cn(
        "rounded border border-line bg-bg-subtle px-1 py-0.5 font-mono text-[0.9em] text-text",
        props.className,
      )}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-6 overflow-x-auto">
      <table {...props} className="w-full border-collapse text-sm" />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      {...props}
      className="border-b border-line px-3 py-2 text-left font-medium text-text"
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td {...props} className="border-b border-line px-3 py-2 text-secondary" />
  ),
};
