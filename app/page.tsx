import {
  ArrowUpRight,
  Code2,
  Link2,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AgentWorkflow } from "./components/agent-workflow";
import { RoleTitle } from "./components/text-marker";
import { AdditionalWork } from "./components/additional-work";
import { CopyEmailButton } from "./components/copy-email-button";
import { LatestArticles } from "./components/latest-articles";
import { sectionViewAllLinkClass } from "./components/link-styles";
import { SiteFooter } from "./components/site-footer";
import { SkillGroups } from "./components/skill-groups";
import { WorkPath } from "./components/work-path";
import { languages, profile } from "./data";

function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("mb-6 text-sm font-medium text-muted", className)}>
      {children}
    </h2>
  );
}

const linkIcons = {
  GitHub: Code2,
  LinkedIn: Link2,
  Email: Mail,
} as const;

const headerLinkClass =
  "group inline-flex items-center gap-1.5 border border-line px-2.5 py-1 text-sm text-secondary transition-colors hover:border-line-strong hover:bg-bg-hover hover:text-text";

function HeaderLink({
  href,
  icon: Icon,
  children,
  external = false,
}: {
  href: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children: React.ReactNode;
  external?: boolean;
}) {
  const isExternal = external || href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={headerLinkClass}
    >
      {Icon ? (
        <Icon
          className="icon-group-hover h-3.5 w-3.5 shrink-0 text-faint"
          strokeWidth={1.75}
        />
      ) : null}
      {children}
    </a>
  );
}

function RoleLine({ role }: { role: string }) {
  return (
    <p className="mb-4 text-lg font-semibold leading-snug sm:mb-5 sm:text-xl">
      <RoleTitle>{role}</RoleTitle>
    </p>
  );
}

export default async function Home() {
  return (
    <main className="site-main mx-auto w-full max-w-4xl">
      <div className="site-main-inner">
      <div className="site-text">
      <header>
        <h1 className="text-[1.625rem] font-semibold leading-tight tracking-tight text-text sm:text-2xl md:text-[2rem]">
          {profile.name}
        </h1>
        <RoleLine role={profile.role} />
        <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-muted">
          <span className="inline-flex items-center gap-3">
            <Image
              src="/AR_flag.svg"
              alt=""
              width={20}
              height={15}
              className="h-4 w-5 shrink-0 rounded-[3px] border border-line"
              aria-hidden
            />
            <span>{profile.location}</span>
          </span>
        </p>

        <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
          {profile.links.map((link) => {
            const Icon = linkIcons[link.label as keyof typeof linkIcons];

            if (link.label === "Email") {
              return (
                <CopyEmailButton
                  key={link.label}
                  email={profile.email}
                  className={headerLinkClass}
                >
                  {link.label}
                </CopyEmailButton>
              );
            }

            return (
              <HeaderLink key={link.label} href={link.href} icon={Icon}>
                {link.label}
              </HeaderLink>
            );
          })}
        </div>
      </header>

      <p className="mt-8 sm:mt-10">{profile.summary}</p>

      <section className="site-section">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2">
          <SectionLabel className="mb-0">Experience</SectionLabel>
          <Link href="/experience" className={sectionViewAllLinkClass}>
            View all
            <ArrowUpRight className="h-3 w-3 shrink-0" strokeWidth={1.5} />
          </Link>
        </div>
        <WorkPath />
      </section>
      </div>
      </div>

      <div className="site-main-inner">
        <AgentWorkflow />
      </div>

      <div className="site-main-inner">
        <LatestArticles />
      </div>

      <div className="site-main-inner">
      <div className="site-text">
      <section className="site-section">
        <SectionLabel>Stack &amp; Tools</SectionLabel>
        <SkillGroups />
      </section>

      <section className="site-section">
        <SectionLabel>Also worked on</SectionLabel>
        <AdditionalWork />
      </section>

      <section className="site-section">
        <SectionLabel>Languages</SectionLabel>
        <div className="space-y-1">
          {languages.map((lang) => (
            <p key={lang.name}>
              <strong className="font-semibold text-text">{lang.name}</strong> —{" "}
              {lang.level}
            </p>
          ))}
        </div>
      </section>

      </div>
      </div>

      <SiteFooter />
    </main>
  );
}
