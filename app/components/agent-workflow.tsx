import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { AgentSkillCarousel } from "./agent-skill-carousel";

export function AgentWorkflow() {
  return (
    <section className="site-section">
      <div className="mb-5">
        <h2 className="text-sm font-medium text-muted">How I work with AI</h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-secondary">
          Cursor agent skills I reach for daily — planning, debugging, and shipping
          with structure.
        </p>
      </div>

      <AgentSkillCarousel />

      <div className="mt-6 border-t border-line pt-5">
        <p className="max-w-2xl text-sm leading-relaxed text-secondary">
          I built{" "}
          <Link
            href="https://github.com/solanodz/harness-engineering-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-text underline decoration-line underline-offset-2 transition-colors hover:decoration-line-strong"
          >
            Harness Engineering
          </Link>
          {" "}
          — open-source agent skills for Cursor, Claude Code, and Codex, based on{" "}
          <a
            href="https://walkinglabs.github.io/learn-harness-engineering/es/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text underline decoration-line underline-offset-2 transition-colors hover:decoration-line-strong"
          >
            Learn Harness Engineering
          </a>
          .
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted">
          <code className="border border-line bg-bg-subtle px-1.5 py-0.5 font-mono text-secondary">
            npx harness-skills install
          </code>
          <Link
            href="https://github.com/solanodz/harness-engineering-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-text"
          >
            View repo
            <ArrowUpRight className="h-3 w-3 shrink-0" strokeWidth={1.5} />
          </Link>
        </p>
      </div>
    </section>
  );
}
