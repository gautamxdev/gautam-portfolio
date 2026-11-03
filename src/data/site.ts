export const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export type Skill = { name: string; icon?: string };
export const skills: Skill[] = [
  { name: "TypeScript" },
  { name: "React" },
  { name: "Next.js" },
  { name: "Node.js" },
  { name: "PostgreSQL" },
  { name: "Three.js" },
  { name: "Tailwind CSS" },
  { name: "Git" },
];

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
  note: string;
};

// Verified against the public repositories. No invented adoption metrics.
export const projects: Project[] = [
  {
    id: "mcp-doctor",
    name: "MCP Doctor",
    category: "01 / DEVELOPER TOOLING",
    description:
      "Your tools should work together. A local-first CLI that finds conflicting MCP configurations in Cursor and helps you fix them—with backups, not guesswork.",
    stack: ["TypeScript", "Node.js", "Vitest"],
    liveUrl: "https://www.npmjs.com/package/mcp-doctor-cli",
    liveLabel: "View on npm",
    repoUrl: "https://github.com/gautamxdev/mcp-doctor-cli",
    note: "Inspects both global and workspace MCP configurations. Changes require confirmation, backups come first, and diagnostics stay on your machine. Built for the unglamorous problems that interrupt a good coding session.",
  },
  {
    id: "sylva",
    name: "Sylva Sounds",
    category: "02 / CREATIVE DEVELOPMENT",
    description:
      "An immersive home for an audio-production studio. Interactive visuals, music previews, and a project catalogue that give sound a visual identity.",
    stack: ["Next.js", "Three.js", "GSAP", "Howler.js"],
    liveUrl: "https://sylvasounds.com/",
    repoUrl: "https://github.com/gautamxdev/sylva-sounds",
    note: "Brings an audio studio’s work into the browser through motion, 3D, and playable music previews. Next.js provides the site structure; Three.js, GSAP, and Howler.js handle the visual and audio experience.",
  },
  {
    id: "quickfill",
    name: "TTD QuickFill",
    category: "03 / BROWSER EXTENSION",
    description:
      "Less repetitive typing. More control. A Chrome extension that turns saved pilgrim details into a guarded paste queue, with personal data kept on the device.",
    stack: ["React", "TypeScript", "Vite", "Chrome APIs"],
    repoUrl: "https://github.com/gautamxdev/ttd-quickfill",
    note: "Uses row and field guards to guide a local paste queue. The person stays in control of verification and submission. An independent extension, with no networking or automatic form submission.",
  },
  {
    id: "compliance",
    name: "Compliance Flow",
    category: "04 / PRODUCT WEBSITE",
    description:
      "A focused product website for a CA-firm compliance workspace, making client workflows, deadlines, and audit organisation easier to understand.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    liveUrl: "https://compliance-flow-sage.vercel.app/",
    repoUrl: "https://github.com/gautamxdev/compliance-flow",
    note: "A frontend product website and workspace concept, exploring how a clear interface can communicate complex compliance workflows.",
  },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/gautamxdev", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gautamalva/",
    icon: "linkedin",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/Gautamonlydevs",
    icon: "twitter",
  },
] as const;
export const email = "shettygautam955@gmail.com";
export const brewingCompanies = [
  {
    name: "Reddmark",
    status: "Live",
    description:
      "My software studio. Websites, MVPs, and automation for people with something worth building.",
    stack: ["Next.js", "React", "TypeScript", "GSAP"],
    link: "https://reddmark.net/",
  },
];
