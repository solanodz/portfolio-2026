"use client";

import { useEffect, useMemo, useState } from "react";

import {
  FileTree,
  type FileTreeItem,
} from "@/app/components/file-tree";
import { experience } from "@/app/data";
import {
  getExperienceCompanyId,
  getExperienceProjectId,
} from "@/lib/experience-anchors";

const EXPERIENCE_ROOT_ID = "experience-title";

function buildExperienceTree(): FileTreeItem {
  return {
    id: EXPERIENCE_ROOT_ID,
    title: "Experience",
    children: experience.map((job) => {
      const projects = job.clients
        ? job.clients.flatMap((client) =>
            client.highlights.map((highlight) => ({
              id: getExperienceProjectId(job.id, client.id, highlight.title),
              title: highlight.title,
            })),
          )
        : (job.highlights ?? []).map((highlight) => ({
            id: getExperienceProjectId(job.id, job.id, highlight.title),
            title: highlight.title,
          }));

      return {
        id: getExperienceCompanyId(job.id),
        title: job.company,
        children: projects,
      };
    }),
  };
}

export function ExperienceIndex() {
  const tree = useMemo(() => buildExperienceTree(), []);
  const [activeId, setActiveId] = useState(EXPERIENCE_ROOT_ID);

  const allIds = useMemo(() => {
    const ids = [tree.id];
    for (const branch of tree.children ?? []) {
      ids.push(branch.id);
      for (const child of branch.children ?? []) {
        ids.push(child.id);
      }
    }
    return ids;
  }, [tree]);

  useEffect(() => {
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      return;
    }

    function updateActive() {
      const readingLine = window.innerHeight * 0.45;
      const current = elements.reduce(
        (closest, element) => {
          const distance = Math.abs(
            element.getBoundingClientRect().top - readingLine,
          );

          if (!closest || distance < closest.distance) {
            return { element, distance };
          }

          return closest;
        },
        null as { element: HTMLElement; distance: number } | null,
      );

      setActiveId(current?.element.id ?? EXPERIENCE_ROOT_ID);
    }

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [allIds]);

  function scrollToItem(item: FileTreeItem) {
    const element = document.getElementById(item.id);

    if (!element) {
      return;
    }

    const readingLine = window.innerHeight * 0.45;
    const top =
      element.getBoundingClientRect().top + window.scrollY - readingLine;

    setActiveId(item.id);
    window.history.pushState(null, "", `#${item.id}`);
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <aside className="article-layout-sidebar justify-self-end overflow-y-auto pl-3 pr-4 min-[1400px]:max-w-[14rem] min-[1400px]:pl-4 min-[1400px]:pr-5 min-[1536px]:max-w-[16rem] min-[1536px]:pl-5 min-[1536px]:pr-6 min-[1800px]:max-w-[18rem] min-[1800px]:pl-6 min-[1800px]:pr-8">
      <FileTree
        root={tree}
        activeId={activeId}
        onNavigate={scrollToItem}
        aria-label="Experience index"
      />
    </aside>
  );
}
