"use client";

import { useEffect, useState } from "react";

import type { ArticleHeading } from "@/lib/article-headings";

export function ArticleIndex({ headings }: { headings: ArticleHeading[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));

    function updateActiveHeading() {
      const readingLine = window.innerHeight * 0.45;
      const currentHeading = headingElements.reduce((closest, element) => {
        const distance = Math.abs(element.getBoundingClientRect().top - readingLine);

        if (!closest || distance < closest.distance) {
          return { element, distance };
        }

        return closest;
      }, null as { element: HTMLElement; distance: number } | null);

      setActiveId(currentHeading?.element.id ?? headings[0].id);
    }

    updateActiveHeading();
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  function scrollToHeading(heading: ArticleHeading) {
    const element = document.getElementById(heading.id);

    if (!element) {
      return;
    }

    const readingLine = window.innerHeight * 0.45;
    const top = element.getBoundingClientRect().top + window.scrollY - readingLine;

    setActiveId(heading.id);
    window.history.pushState(null, "", `#${heading.id}`);
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <aside className="hidden lg:block">
      <nav
        aria-label="Article index"
        className="sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto pr-8"
      >
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Index
        </p>
        <ol className="space-y-1 border-l border-line">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;

            return (
              <li
                key={heading.id}
                className={[
                  "-ml-px border-l-2",
                  heading.depth === 3 ? "pl-8" : "pl-5",
                  isActive ? "border-emerald-400" : "border-transparent",
                ].join(" ")}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToHeading(heading);
                  }}
                  className={[
                    "block py-1.5 text-[13px] leading-snug transition-colors",
                    isActive
                      ? "font-semibold text-text"
                      : "font-normal text-muted hover:text-text",
                  ].join(" ")}
                >
                  {heading.title}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
