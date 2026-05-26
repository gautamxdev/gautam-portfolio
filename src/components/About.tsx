import { SectionLabel } from "@/components/SectionLabel";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[900px] px-6 pb-16 pt-8">
      <SectionLabel label="about_" />
      <p className="max-w-2xl text-base leading-relaxed text-secondary">
        I&apos;m a software engineer based somewhere on the internet, building
        web applications and developer tools. My work spans frontend interfaces,
        backend APIs, and the glue that holds them together. I care about
        readable code, fast load times, and products that feel good to use.
        When I&apos;m not coding, I&apos;m probably reading docs or refactoring
        something I wrote last week.
      </p>
    </section>
  );
}
