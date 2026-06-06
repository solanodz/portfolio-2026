import {
  ArrowUpRight,
  Code2,
  Link2,
  Mail,
  Minus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CopyEmailButton } from "./components/copy-email-button";
import { SiteFooter } from "./components/site-footer";
import { SkillGroups } from "./components/skill-groups";
import { WorkPath } from "./components/work-path";
import {
  additional,
  languages,
  profile,
} from "./data";

function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("mb-4 text-sm font-medium text-muted", className)}>
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
  "group inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-sm text-secondary transition-colors hover:border-line-strong hover:bg-bg-hover hover:text-text";

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
    <p className="mb-5 text-xl font-semibold text-emerald-400">
      {role}
    </p>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-[15px] leading-relaxed text-secondary sm:py-20">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-[2rem] sm:leading-tight">
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

        <div className="mt-5 flex flex-wrap gap-2">
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

      <p className="mt-8">{profile.summary}</p>

      <section className="mt-12 border-t border-line pt-10">
        <div className="mb-4 flex items-baseline justify-between">
          <SectionLabel className="mb-0">Experience</SectionLabel>
          <Link
            href="/experience"
            className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-0.5 text-xs text-muted transition-colors hover:border-line-strong hover:bg-bg-hover hover:text-text"
          >
            View all
            <ArrowUpRight className="h-3 w-3 shrink-0" strokeWidth={1.5} />
          </Link>
        </div>
        <WorkPath />
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <SectionLabel>Stack &amp; Tools</SectionLabel>
        <SkillGroups />
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <SectionLabel>Also worked on</SectionLabel>
        <ul className="space-y-2">
          {additional.map((item, i) => (
            <li key={i} className="flex gap-2.5">
              <Minus
                className="mt-[9px] h-3 w-3 shrink-0 text-faint"
                strokeWidth={1.5}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 border-t border-line pt-10">
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

      <SiteFooter />
    </main>
  );
}
