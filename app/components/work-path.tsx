"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircle,
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
import { RoleTitle } from "@/app/components/text-marker";
import { TreeElbow } from "@/app/components/file-tree";
import {
  getExperienceCompanyId,
  getExperienceProjectId,
} from "@/lib/experience-anchors";
import { formatExperiencePeriodWithDuration } from "@/lib/experience-duration";
import { experience, profile, type IconName } from "../data";
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
  backgroundClassName,
}: {
  src: string;
  alt: string;
  href?: string;
  backgroundClassName?: string;
}) {
  const logo = (
    <span
      className={cn(
        "block h-8 w-8 shrink-0 overflow-hidden border border-line-logo",
        backgroundClassName,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={64}
        height={64}
        quality={100}
        unoptimized
        className={cn(
          "size-full",
          backgroundClassName ? "object-contain p-1" : "object-cover",
        )}
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

function ProjectAccordion({
  parentId,
  scopeId,
  jobId,
  highlights,
}: {
  parentId: string;
  scopeId: string;
  jobId: string;
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
    <ul className="mt-3.5 space-y-1">
      {highlights.map((highlight, index) => {
        const itemId = `${parentId}-${index}`;
        const projectAnchorId = getExperienceProjectId(
          jobId,
          scopeId,
          highlight.title,
        );
        const isOpen = openItems.has(itemId);
        const isLast = index === highlights.length - 1;

        return (
          <li key={highlight.title} className="relative">
            {!isLast ? (
              <span
                aria-hidden
                className="absolute top-[13px] bottom-[-4px] left-[6px] w-px bg-tree-line"
              />
            ) : null}

            <div className="flex">
              <TreeElbow isLast={isLast} />
              <button
                type="button"
                id={projectAnchorId}
                aria-expanded={isOpen}
                onClick={() => toggle(itemId)}
                className="group/item flex min-w-0 flex-1 scroll-mt-24 items-center gap-2 py-1.5 text-left"
              >
                <span
                  className={cn(
                    "min-w-0 flex-1 text-[13px] leading-snug transition-colors",
                    isOpen
                      ? "font-medium text-text"
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
            </div>

            {isOpen ? (
              <div className="relative ml-4 pb-4 pl-4">
                {!isLast ? (
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-[-10px] w-px bg-tree-line"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute top-0 left-[-10px] h-3 w-px bg-tree-line"
                  />
                )}
                <ProjectDetail detail={highlight.detail} />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function EngagementBlock({
  context,
  summary,
  parentId,
  scopeId,
  jobId,
  highlights,
  stack,
  detailed = false,
  className,
}: {
  context: string;
  summary: string;
  parentId: string;
  scopeId: string;
  jobId: string;
  highlights: NonNullable<(typeof experience)[number]["highlights"]>;
  stack?: string[];
  detailed?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mt-6 first:mt-4 sm:mt-8 sm:first:mt-6", className)}>
      <p className="text-sm font-medium text-muted sm:text-[15px]">{context}</p>
      <p className="mt-2 text-sm leading-relaxed text-secondary">{summary}</p>

      {detailed && stack?.length ? (
        <p className="mt-3 text-sm leading-relaxed">
          <span className="text-text">Stack</span>
          <span className="text-faint"> — </span>
          <span className="text-muted">{stack.join(", ")}</span>
        </p>
      ) : null}

      <ProjectAccordion
        parentId={parentId}
        scopeId={scopeId}
        jobId={jobId}
        highlights={highlights}
        detailed={detailed}
      />
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
      scopeId={client.id}
      jobId={job.id}
      highlights={client.highlights}
      stack={client.stack ?? job.stack}
      detailed={detailed}
    />
  );
}

const obscuredBlurMaskClassName = [
  "[mask-image:linear-gradient(to_bottom,transparent,black_24px,black_calc(100%-24px),transparent),linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]",
  "[mask-composite:intersect]",
  "[-webkit-mask-image:linear-gradient(to_bottom,transparent,black_24px,black_calc(100%-24px),transparent),linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]",
  "[-webkit-mask-composite:source-in]",
].join(" ");

const inProgressCalloutClassName =
  "inline-flex items-center gap-1.5 border border-line bg-bg-subtle px-3 py-1.5 text-sm text-secondary";

function ObscuredExperienceDetails({
  message,
  children,
  className,
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative pt-2 pl-0 sm:pl-7", className)}>
      <div
        className={cn(
          "pointer-events-none select-none blur-sm",
          obscuredBlurMaskClassName,
        )}
        aria-hidden="true"
      >
        {children}
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 py-8">
        <p className="max-w-md text-center text-sm leading-relaxed sm:text-[15px]">
          <span className={inProgressCalloutClassName}>
            <AlertCircle
              className="h-3.5 w-3.5 shrink-0 text-faint"
              strokeWidth={1.75}
              aria-hidden
            />
            {message}
          </span>
        </p>
      </div>
    </div>
  );
}

function WorkGroup({
  job,
  detailed = false,
}: {
  job: (typeof experience)[number];
  detailed?: boolean;
}) {
  const companyId = getExperienceCompanyId(job.id);

  const clientDetails = job.clients ? (
    <>
      <p className="text-sm leading-relaxed text-secondary">{job.summary}</p>
      <div>
        {job.clients.map((client) => (
          <ClientGroup
            key={client.id}
            client={client}
            job={job}
            detailed={detailed}
          />
        ))}
      </div>
    </>
  ) : null;

  return (
    <div id={companyId} className="scroll-mt-24">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-2 sm:flex sm:items-center sm:gap-3">
        {job.logo ? (
          <CompanyLogo
            src={job.logo}
            alt={job.company}
            href={job.website}
            backgroundClassName={job.logoBackground}
          />
        ) : (
          <NodeIcon name={job.icon} className="text-text" />
        )}
        <div className="col-start-2 min-w-0">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span className="font-medium text-text">{job.company}</span>
            <span className="text-secondary">
              ·{" "}
              {job.role === profile.role ? (
                <RoleTitle>{job.role}</RoleTitle>
              ) : (
                job.role
              )}
            </span>
            {job.current ? (
              <span className="border border-line px-1.5 py-0.5 text-[10px] font-medium leading-none text-muted">
                Now
              </span>
            ) : null}
          </div>
        </div>
        <span className="col-span-2 col-start-2 font-mono text-xs text-faint sm:col-auto sm:ml-auto sm:shrink-0">
          {formatExperiencePeriodWithDuration(job.start, job.end)}
        </span>
      </div>

      {job.clients ? (
        job.obscureDetails ? (
          <ObscuredExperienceDetails
            message={
              job.obscureDetailsMessage ?? "Recently started"
            }
          >
            {clientDetails}
          </ObscuredExperienceDetails>
        ) : (
          <div className="mt-1.5 pl-0 sm:pl-7">{clientDetails}</div>
        )
      ) : job.context && job.highlights ? (
        <div className="mt-1.5 pl-0 sm:pl-7">
          <EngagementBlock
            context={job.context}
            summary={job.summary}
            parentId={job.id}
            scopeId={job.id}
            jobId={job.id}
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
    <div className={detailed ? "space-y-10 sm:space-y-14" : "space-y-8 sm:space-y-10"}>
      {experience.map((job) => (
        <WorkGroup key={job.id} job={job} detailed={detailed} />
      ))}
    </div>
  );
}
