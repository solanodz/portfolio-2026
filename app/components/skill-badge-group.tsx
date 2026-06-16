export function SkillBadgeGroup({
  label,
  items,
  href,
  summary,
  command,
}: {
  label: string;
  items: string[];
  href?: string;
  summary?: string;
  command?: string;
  owned?: boolean;
}) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs text-faint">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-muted"
          >
            {label}
          </a>
        ) : (
          label
        )}
      </p>
      {summary ? (
        <p className="mb-3 text-sm leading-relaxed text-secondary">{summary}</p>
      ) : null}
      {command ? (
        <p className="mb-3 font-mono text-xs text-secondary">{command}</p>
      ) : null}
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="shrink-0 bg-emerald-400/15 px-1.5 py-0.5 text-[10px] font-medium leading-none text-emerald-600 dark:text-emerald-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
