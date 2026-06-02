import { Suspense } from "react";
import { GitHubContributions, ContributionsSkeleton } from "@/components/GitHubContributions";
import { SectionLabel } from "@/components/SectionLabel";
import { SkillsMarquee } from "@/components/SkillsMarquee";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[990px] px-6 py-16">
      <SectionLabel label="about me_" />
      <SkillsMarquee />
      <Suspense fallback={<ContributionsSkeleton />}>
        <GitHubContributions />
      </Suspense>
    </section>
  );
}
