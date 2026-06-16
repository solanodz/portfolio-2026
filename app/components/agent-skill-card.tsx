import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { AgentSkillGroup } from "../data";

export function AgentSkillCard({ group }: { group: AgentSkillGroup }) {
  return (
    <article className="h-full border border-line px-4 py-4 transition-colors hover:bg-bg-hover sm:px-5 sm:py-5">
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-sm font-semibold text-text">{group.label}</h3>
        {group.href ? (
          <Link
            href={group.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-text"
          >
            View all
            <ArrowUpRight className="h-3 w-3 shrink-0" strokeWidth={1.5} />
          </Link>
        ) : null}
      </div>
      <p className="mb-3 text-xs leading-relaxed text-faint">{group.summary}</p>
      <div className="flex flex-wrap gap-1.5">
        {group.items.map((item) => (
          <span
            key={item}
            className="border border-line bg-bg-subtle px-2 py-0.5 text-xs font-medium text-secondary"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
