import type { Skill } from "@/data/site";
import { skills } from "@/data/site";

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <span className="skill-chip shrink-0">
      {skill.icon && (
        <i className={`${skill.icon} skill-chip-icon`} aria-hidden="true" />
      )}
      <span>{skill.name}</span>
    </span>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: Skill[];
  direction: "left" | "right";
}) {
  const duplicated = [...items, ...items];

  return (
    <div className="marquee-fade">
      <div
        className={`marquee-track ${direction === "left" ? "marquee-scroll-left" : "marquee-scroll-right"}`}
      >
        <div className="marquee-content">
          {duplicated.map((skill, index) => (
            <SkillChip key={`${skill.name}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsMarquee() {
  const midpoint = Math.ceil(skills.length / 2);
  const rowOne = skills.slice(0, midpoint);
  const rowTwo = skills.slice(midpoint);

  return (
    <div className="mt-8 space-y-3">
      <MarqueeRow items={rowOne} direction="right" />
      <MarqueeRow items={rowTwo} direction="left" />
    </div>
  );
}
