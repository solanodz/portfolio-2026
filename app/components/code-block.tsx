"use client";

import { useRef, useState } from "react";

type CodeBlockProps = {
  language: string;
  children: React.ReactNode;
};

export function CodeBlock({ language, children }: CodeBlockProps) {
  const codeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    const code = codeRef.current?.querySelector("pre")?.innerText ?? "";

    if (!code) {
      return;
    }

    await navigator.clipboard.writeText(code.trimEnd());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div
      data-code-block
      className="overflow-hidden border border-line bg-bg-subtle"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="font-mono text-xs text-muted">{language}</span>
        <button
          type="button"
          onClick={copyCode}
          className="font-mono text-xs text-muted transition-colors hover:text-black dark:hover:text-white"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div ref={codeRef}>{children}</div>
    </div>
  );
}
