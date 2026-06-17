"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

type MermaidProps = {
  chart: string;
};

export function Mermaid({ chart }: MermaidProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "default",
        });

        const result = await mermaid.render(`mermaid-${id}`, chart);

        if (!cancelled) {
          setSvg(result.svg);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setSvg(null);
          setError(err instanceof Error ? err.message : "Unable to render diagram.");
        }
      }
    }

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  if (error) {
    return (
      <pre className="overflow-x-auto border border-line bg-bg-subtle p-4 text-xs text-muted">
        {error}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="border border-line bg-bg-subtle p-4 text-sm text-muted">
        Rendering diagram...
      </div>
    );
  }

  return (
    <div
      className="overflow-x-auto border border-line bg-bg-subtle p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
