import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MarkerHighlight } from "./text-marker";
import { AgentSkillCarousel } from "./agent-skill-carousel";

export function AgentWorkflow() {
  return (
    <section className="site-section">
      <div className="mb-5">
        <h2 className="text-base font-semibold tracking-tight text-text sm:text-lg">
          How I work with AI
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
          Cursor agent skills I reach for daily — planning, debugging, and shipping
          with structure.
        </p>
      </div>

      <AgentSkillCarousel />

      <div className="mt-6 border-t border-line pt-5">
        <p className="max-w-2xl text-sm leading-relaxed">
          <MarkerHighlight>
            I built{" "}
            <Link
              href="https://github.com/solanodz/harness-engineering-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-inherit underline decoration-line-strong underline-offset-2 transition-opacity hover:opacity-80"
            >
              Harness Engineering
            </Link>
            {" "}
            — open-source agent skills for Cursor, Claude Code, and Codex, based on{" "}
            <a
              href="https://walkinglabs.github.io/learn-harness-engineering/es/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit underline decoration-line-strong underline-offset-2 transition-opacity hover:opacity-80"
            >
              Learn Harness Engineering
            </a>
            .
          </MarkerHighlight>
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted">
          <code className="rounded border border-line bg-bg-subtle px-1.5 py-0.5 font-mono text-secondary">
            npx harness-skills install
          </code>
          <Link
            href="https://github.com/solanodz/harness-engineering-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-secondary transition-colors hover:text-text"
          >
            View repo
            <ArrowUpRight className="h-3 w-3 shrink-0" strokeWidth={1.5} />
          </Link>
        </p>
      </div>
    </section>
  );
}
