"use client";

import { AgentSkillCard } from "./agent-skill-card";
import { agentSkills } from "../data";

const slides = [...agentSkills, ...agentSkills];

export function AgentSkillCarousel() {
  return (
    <div className="agent-skill-carousel group relative -mx-1 overflow-hidden px-1">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-bg to-transparent sm:w-14"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-bg to-transparent sm:w-14"
      />

      <div className="agent-skill-carousel-track flex w-max gap-3">
        {slides.map((group, index) => (
          <div
            key={`${group.label}-${index}`}
            className="agent-skill-carousel-slide shrink-0"
          >
            <AgentSkillCard group={group} />
          </div>
        ))}
      </div>
    </div>
  );
}
