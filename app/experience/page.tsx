import type { Metadata } from "next";

import { ExperienceIndex } from "@/app/components/experience-index";
import { SiteFooter } from "@/app/components/site-footer";
import { WorkPath } from "@/app/components/work-path";
import { experience } from "@/app/data";
import { formatTotalExperienceLabel } from "@/lib/experience-duration";

export const metadata: Metadata = {
  title: "Experience — Solano de Zuasnabar",
  description:
    "Full work history of Solano de Zuasnabar — AI engineering roles, projects and the stack behind each one.",
};

export default function ExperiencePage() {
  const roleCount = experience.length;
  const projectCount = experience.reduce((total, job) => {
    if (job.clients) {
      return (
        total +
        job.clients.reduce((clientTotal, client) => {
          return clientTotal + client.highlights.length;
        }, 0)
      );
    }
    return total + (job.highlights?.length ?? 0);
  }, 0);
  const totalExperience = formatTotalExperienceLabel(experience);

  return (
    <main className="site-main site-main-article w-full">
      <div className="article-layout">
        <ExperienceIndex />

        <div className="article-layout-content">
          <header>
            <h1
              id="experience-title"
              className="scroll-mt-24 text-[1.625rem] font-semibold leading-tight tracking-tight text-text sm:text-xl md:text-2xl"
            >
              Experience
            </h1>
            <p className="mt-2 max-w-xl text-muted sm:mt-3">
              A closer look at where I&apos;ve worked, the projects I&apos;ve
              shipped, and the stack behind each one.
            </p>
            <p className="mt-3 font-mono text-xs text-faint">
              Total experience: {totalExperience}
              <span className="mx-1.5 text-line">·</span>
              {roleCount} roles · {projectCount} projects
            </p>
          </header>

          <section className="site-section">
            <WorkPath detailed />
          </section>
        </div>

        <div className="article-layout-sidebar hidden min-[1400px]:block" />
      </div>

      <SiteFooter />
    </main>
  );
}
