export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export type Skill = {
  name: string;
  icon?: string;
};

export const skills: Skill[] = [
  { name: "TypeScript", icon: "devicon-typescript-plain colored" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "Python", icon: "devicon-python-plain colored" },
  { name: "Next.js", icon: "devicon-nextjs-plain" },
  { name: "React", icon: "devicon-react-original colored" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
  { name: "Redis", icon: "devicon-redis-plain colored" },
  { name: "Docker", icon: "devicon-docker-plain colored" },
  { name: "Git", icon: "devicon-git-plain colored" },
  { name: "REST APIs" },
  { name: "GraphQL", icon: "devicon-graphql-plain colored" },
  { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored" },
  { name: "Linux", icon: "devicon-linux-plain" },
  { name: "Bash", icon: "devicon-bash-plain" },
  { name: "Prisma", icon: "devicon-prisma-original" },
  { name: "WebSockets" },
];

export type Project = {
  name: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    name: "DevFlow",
    description:
      "A lightweight project management tool for indie developers and small teams.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    name: "ScrapeKit",
    description:
      "Open-source scraping utilities with rate limiting and proxy rotation built in.",
    stack: ["Python", "FastAPI", "Redis", "Docker"],
    repoUrl: "#",
  },
  {
    name: "Pulse Dashboard",
    description:
      "Real-time analytics dashboard for monitoring web app performance metrics.",
    stack: ["React", "Node.js", "WebSockets", "Chart.js"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    name: "CLI Notes",
    description:
      "Terminal-first note-taking app with markdown support and fuzzy search.",
    stack: ["Rust", "SQLite", "TUI"],
    repoUrl: "#",
  },
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/gautamxdev",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gautamalva/",
    icon: "linkedin",
  },
  {
    label: "X",
    href: "https://x.com/Gautamonlydevs",
    icon: "twitter",
  },
] as const;

export const email = "shettygautam955@gmail.com";
