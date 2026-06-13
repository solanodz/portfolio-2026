import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { WorkPath } from "../components/work-path";
import { experience } from "../data";

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

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-[15px] leading-relaxed text-secondary sm:py-20">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-text">
          Experience
        </h1>
        <p className="mt-2 max-w-xl text-muted">
          A closer look at where I&apos;ve worked, the projects I&apos;ve
          shipped, and the stack behind each one.
        </p>
        <p className="mt-3 font-mono text-xs text-faint">
          {roleCount} roles · {projectCount} projects
        </p>
      </header>

      <section className="mt-12 border-t border-line pt-10">
        <WorkPath detailed />
      </section>

      <SiteFooter />
    </main>
  );
}
