import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";
import { slugifyHeading } from "@/lib/article-headings";
import { CodeBlock } from "./code-block";
import { Mermaid } from "./mermaid";

function ArticleLink(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href ?? "";
  const isInternal = href.startsWith("/");

  const linkClassName = "article-link";

  if (isInternal) {
    return (
      <Link href={href} className={linkClassName}>
        {props.children}
      </Link>
    );
  }

  return (
    <a
      {...props}
      className={cn(linkClassName, props.className)}
      target="_blank"
      rel="noopener noreferrer"
    />
  );
}

function ArticleCode(props: ComponentPropsWithoutRef<"code">) {
  if ("data-language" in props) {
    return <code {...props} />;
  }

  return (
    <code
      {...props}
      className={cn(
        "rounded border border-line bg-bg-subtle px-1 py-0.5 font-mono text-[0.9em] text-text",
        props.className,
      )}
    />
  );
}

function ArticlePre(props: ComponentPropsWithoutRef<"pre">) {
  const language =
    (props as ComponentPropsWithoutRef<"pre"> & { "data-language"?: string })[
      "data-language"
    ] ?? "text";

  return (
    <CodeBlock language={language}>
      <pre {...props} />
    </CodeBlock>
  );
}

function getNodeText(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getNodeText).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    return getNodeText(
      (children as { props?: { children?: React.ReactNode } }).props?.children,
    );
  }

  return "";
}

export const mdxComponents = {
  Mermaid,
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      id={slugifyHeading(getNodeText(children))}
      {...props}
      className="scroll-mt-24 mt-12 text-lg font-semibold tracking-tight text-text"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      id={slugifyHeading(getNodeText(children))}
      {...props}
      className="scroll-mt-24 mt-8 text-base font-semibold tracking-tight text-text"
    >
      {children}
    </h3>
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <div {...props} className="mt-5 text-secondary" />
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
  pre: ArticlePre,
  code: ArticleCode,
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
