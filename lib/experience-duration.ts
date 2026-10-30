const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export type ExperienceMonth = {
  year: number;
  month: number; // 1-12
};

/** Parse `YYYY-MM` into a month marker. */
export function parseExperienceMonth(value: string): ExperienceMonth | null {
  const match = /^(\d{4})-(\d{2})$/.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);

  if (!Number.isInteger(year) || month < 1 || month > 12) {
    return null;
  }

  return { year, month };
}

export function formatMonthLabel(value: ExperienceMonth) {
  return `${MONTH_LABELS[value.month - 1]} ${value.year}`;
}

export function formatExperiencePeriod(
  start: string,
  end: string | null,
  now: Date = new Date(),
) {
  const startMonth = parseExperienceMonth(start);
  if (!startMonth) return start;

  const endLabel = end
    ? (() => {
        const parsed = parseExperienceMonth(end);
        return parsed ? formatMonthLabel(parsed) : end;
      })()
    : "Present";

  return `${formatMonthLabel(startMonth)} — ${endLabel}`;
}

/** Whole months between start and end (or now). Jun→Jun = 24; Jun→Oct = 4. */
export function getDurationMonths(
  start: string,
  end: string | null,
  now: Date = new Date(),
) {
  const startMonth = parseExperienceMonth(start);
  if (!startMonth) return 0;

  const endMonth = end
    ? parseExperienceMonth(end)
    : { year: now.getFullYear(), month: now.getMonth() + 1 };

  if (!endMonth) return 0;

  const months =
    (endMonth.year - startMonth.year) * 12 +
    (endMonth.month - startMonth.month);

  return Math.max(0, months);
}

export function formatDurationLabel(totalMonths: number) {
  if (totalMonths <= 0) {
    return "just started";
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "month" : "months"}`);
  }

  return parts.join(" ");
}

export function formatExperiencePeriodWithDuration(
  start: string,
  end: string | null,
  now: Date = new Date(),
) {
  const period = formatExperiencePeriod(start, end, now);
  const months = getDurationMonths(start, end, now);
  return `${period} (${formatDurationLabel(months)})`;
}

type ExperienceRange = {
  start: string;
  end: string | null;
};

function toAbsoluteMonth(value: ExperienceMonth) {
  return value.year * 12 + (value.month - 1);
}

function fromAbsoluteMonth(absolute: number): ExperienceMonth {
  return {
    year: Math.floor(absolute / 12),
    month: (absolute % 12) + 1,
  };
}

/**
 * Total experience across roles, merging overlapping ranges so concurrent
 * work is not double-counted.
 */
export function getTotalExperienceMonths(
  roles: ExperienceRange[],
  now: Date = new Date(),
) {
  const nowMonth = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };

  const ranges = roles
    .map((role) => {
      const start = parseExperienceMonth(role.start);
      const end = role.end ? parseExperienceMonth(role.end) : nowMonth;
      if (!start || !end) return null;
      return {
        start: toAbsoluteMonth(start),
        end: toAbsoluteMonth(end),
      };
    })
    .filter((range): range is { start: number; end: number } => range !== null)
    .sort((a, b) => a.start - b.start);

  if (ranges.length === 0) return 0;

  const merged: { start: number; end: number }[] = [];

  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (!last || range.start > last.end) {
      merged.push({ ...range });
      continue;
    }
    last.end = Math.max(last.end, range.end);
  }

  return merged.reduce((total, range) => total + (range.end - range.start), 0);
}

export function formatTotalExperienceLabel(
  roles: ExperienceRange[],
  now: Date = new Date(),
) {
  return formatDurationLabel(getTotalExperienceMonths(roles, now));
}
