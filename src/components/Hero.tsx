import { HeroArt } from "@/components/HeroArt";
import { HeroTypewriter } from "@/components/HeroTypewriter";
import { email } from "@/data/site";
import "./Hero.css";

export function Hero() {
  return (
    <section className="mx-auto max-w-[900px] px-6 pb-8 pt-20">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
        <div className="order-1 flex flex-col justify-center md:order-1">
          <HeroTypewriter />
          <p className="mt-4 font-mono text-lg text-muted">
            I build things for the web.
          </p>
          <div className="mt-8 max-w-xl space-y-4 text-base leading-relaxed text-secondary">
            <p>
              Full-stack developer who ships. I care about clean interfaces, fast
              systems, and products people actually want to use.
            </p>
            <p>
              Currently exploring developer tools, automation, and anything that
              makes builders more productive.
            </p>
            <p className="text-sm text-accent">
              Open to full-time roles, freelance, and interesting collabs.
            </p>
          </div>
          <a
            href={`mailto:${email}`}
            className="link-hover group mt-10 inline-block font-mono text-sm text-accent"
          >
            <span className="group-hover:hidden">Let&apos;s talk →</span>
            <span className="hidden group-hover:inline">{email}</span>
          </a>
        </div>

        <div className="order-2 flex w-full items-center justify-center md:order-2">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
