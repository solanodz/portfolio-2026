import { SkillBadgeGroup } from "@/app/components/skill-badge-group";
import { skills } from "../data";

export function SkillGroups() {
  return (
    <div className="space-y-4">
      {skills.map((group) => (
        <SkillBadgeGroup
          key={group.label}
          label={group.label}
          items={group.items}
          href={group.href}
          summary={group.summary}
          command={group.command}
          owned={group.owned}
        />
      ))}
    </div>
  );
}
