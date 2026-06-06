import { skills } from "../data";

export function SkillGroups() {
  return (
    <div className="space-y-2.5">
      {skills.map((group) => (
        <p key={group.label} className="text-sm leading-relaxed">
          <span className="text-text">{group.label}</span>
          <span className="text-faint"> — </span>
          <span className="text-muted">{group.items.join(", ")}</span>
        </p>
      ))}
    </div>
  );
}
