"use client";

import { cn } from "@/lib/utils";
import {
  Brain,
  Briefcase,
  ChevronDown,
  LineChart,
  MessageSquare,
  RefreshCw,
  ScanSearch,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { experience, type IconName } from "../data";
import { ProjectDetail } from "./project-detail";

const iconMap: Record<IconName, LucideIcon> = {
  briefcase: Briefcase,
  sparkles: Sparkles,
  "message-square": MessageSquare,
  "scan-search": ScanSearch,
  "line-chart": LineChart,
  brain: Brain,
  workflow: Workflow,
  "refresh-cw": RefreshCw,
};

function NodeIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Icon = iconMap[name];
  return (
    <Icon
      className={cn("h-4 w-4 shrink-0 text-muted", className)}
      strokeWidth={1.75}
    />
  );
}

function CompanyLogo({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href?: string;
}) {
  const logo = (
    <span className="block h-8 w-8 shrink-0 overflow-hidden rounded-md border-2 border-line-logo">
      <Image
        src={src}
        alt={alt}
        width={64}
        height={64}
        quality={100}
        unoptimized
        className="size-full object-cover"
      />
    </span>
  );

  if (!href) {
    return logo;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${alt}`}
      className="shrink-0 transition-opacity hover:opacity-80"
    >
      {logo}
    </a>
  );
}

function TreeBranch() {
  return (
    <div className="relative w-7 shrink-0 self-stretch">
      <span
        aria-hidden
        className="absolute left-[13px] top-[18px] h-[1.5px] w-[18px] -translate-y-1/2 bg-tree-line"
      />
    </div>
  );
}

function ProjectAccordion({
  parentId,
  highlights,
}: {
  parentId: string;
  highlights: (typeof experience)[number]["highlights"];
  detailed?: boolean;
}) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => new Set());

  if (!highlights?.length) {
    return null;
  }

  const toggle = (itemId: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  return (
    <div className="relative mt-3 ml-2">
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[13px] w-[1.5px] rounded-full bg-tree-line"
      />
      <div>
        {highlights.map((highlight, index) => {
          const itemId = `${parentId}-${index}`;
          const isOpen = openItems.has(itemId);

          return (
            <div key={highlight.title} className="flex">
              <TreeBranch />
              <div className="min-w-0 flex-1 pl-2.5">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(itemId)}
                  className="group/item flex w-full cursor-pointer items-center gap-2.5 rounded-md px-0 py-2 text-left"
                >
                  <span
                    className={cn(
                      "min-w-0 flex-1 text-sm transition-colors",
                      isOpen
                        ? "text-text"
                        : "text-secondary group-hover/item:text-text",
                    )}
                  >
                    {highlight.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 text-faint transition-transform",
                      isOpen && "rotate-180",
                    )}
                    strokeWidth={1.5}
                  />
                </button>
                {isOpen ? (
                  <div className="pr-2 pb-3 pl-0">
                    <ProjectDetail detail={highlight.detail} />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EngagementBlock({
  context,
  summary,
  parentId,
  highlights,
  stack,
  detailed = false,
  className,
}: {
  context: string;
  summary: string;
  parentId: string;
  highlights: NonNullable<(typeof experience)[number]["highlights"]>;
  stack?: string[];
  detailed?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mt-8 first:mt-6", className)}>
      <p className="text-[15px] font-medium text-muted">{context}</p>
      <p className="mt-2 text-sm leading-relaxed text-secondary">{summary}</p>

      {detailed && stack?.length ? (
        <p className="mt-3 text-sm leading-relaxed">
          <span className="text-text">Stack</span>
          <span className="text-faint"> — </span>
          <span className="text-muted">{stack.join(", ")}</span>
        </p>
      ) : null}

      <ProjectAccordion parentId={parentId} highlights={highlights} detailed={detailed} />
    </div>
  );
}

function ClientGroup({
  client,
  job,
  detailed = false,
}: {
  client: NonNullable<(typeof experience)[number]["clients"]>[number];
  job: (typeof experience)[number];
  detailed?: boolean;
}) {
  return (
    <EngagementBlock
      context={client.context}
      summary={client.summary}
      parentId={`${job.id}-${client.id}`}
      highlights={client.highlights}
      stack={client.stack ?? job.stack}
      detailed={detailed}
    />
  );
}

function WorkGroup({
  job,
  detailed = false,
}: {
  job: (typeof experience)[number];
  detailed?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        {job.logo ? (
          <CompanyLogo
            src={job.logo}
            alt={job.company}
            href={job.website}
          />
        ) : (
          <NodeIcon name={job.icon} className="text-text" />
        )}
        <div className="min-w-0 flex-1">
          <span className="font-medium text-text">{job.company}</span>
          <span className="text-emerald-400"> · {job.role}</span>
        </div>
        {job.current ? (
          <span className="shrink-0 rounded bg-emerald-400 px-1.5 py-0.5 text-[11px] font-medium leading-none text-white dark:text-black">
            Now
          </span>
        ) : null}
        <span className="shrink-0 font-mono text-xs text-faint">
          {job.period}
        </span>
      </div>

      {job.clients ? (
        <div className="mt-1.5 pl-7">
          <p className="text-sm leading-relaxed text-secondary">{job.summary}</p>
        </div>
      ) : null}

      {job.clients ? (
        <div className="pl-7">
          {job.clients.map((client) => (
            <ClientGroup
              key={client.id}
              client={client}
              job={job}
              detailed={detailed}
            />
          ))}
        </div>
      ) : job.context && job.highlights ? (
        <div className="mt-1.5 pl-7">
          <EngagementBlock
            context={job.context}
            summary={job.summary}
            parentId={job.id}
            highlights={job.highlights}
            stack={job.stack}
            detailed={detailed}
            className="!mt-0"
          />
        </div>
      ) : null}
    </div>
  );
}

export function WorkPath({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={detailed ? "space-y-12" : "space-y-8"}>
      {experience.map((job) => (
        <WorkGroup key={job.id} job={job} detailed={detailed} />
      ))}
    </div>
  );
}
