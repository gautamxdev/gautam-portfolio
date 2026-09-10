export const navLinks = [
  { label: "About Me", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Brewing", href: "#currently-brewing" },
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
  image?: string;
};

export const projects: Project[] = [
  {
    name: "Sub-Agents Directory",
    description:
      "Curated collection of Claude Code sub-agent prompts and MCP servers. Discover sub-agents, prompts and more.",
    stack: ["Next.js", "Tailwind CSS"],
    liveUrl: "#",
    repoUrl: "https://github.com/gautamxdev/sub-agents-directory",
    image: "/project-sub-agents.png",
  },
  {
    name: "Codejeet",
    description:
      "System Design and DSA learning platform with 17,000+ company-wise LeetCode questions scraped via Selenium and pSEO blogs. Serving 345K+ monthly pageviews.",
    stack: ["Next.js", "TypeScript", "Selenium", "Tailwind CSS"],
    liveUrl: "#",
    repoUrl: "https://github.com/gautamxdev/codejeet",
    image: "/project-codejeet.png",
  },
  {
    name: "DevShorts",
    description:
      "Automated short-form video generator that combines coding screencasts with engaging gaming clips and captions to boost developer engagement.",
    stack: ["React", "TypeScript", "FFmpeg", "Tailwind CSS"],
    liveUrl: "#",
    repoUrl: "https://github.com/gautamxdev/devshorts",
    image: "/project-devshorts.png",
  },
  {
    name: "TrendTrader",
    description:
      "Social trend analysis and prediction platform that maps social media engagement peaks directly to tradeable crypto assets.",
    stack: ["Next.js", "Python", "FastAPI", "Tailwind CSS"],
    liveUrl: "#",
    repoUrl: "https://github.com/gautamxdev/trendtrader",
    image: "/project-trendtrader.png",
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

export type BrewingCompany = {
  name: string;
  status: "in progress" | "beta" | "alpha" | string;
  description: string;
  stack: string[];
  link?: string;
};

export const brewingCompanies: BrewingCompany[] = [
  {
    name: "Reddmark",
    status: "Live",
    description:
      "Software, built and shipped. A studio for founders who need it done. I build MVPs, websites, and automation systems end-to-end for growing businesses, from idea to production.",
    stack: ["MVPs", "Websites", "Automation", "WhatsApp Systems"],
    link: "https://reddmark.net/",
  },
  {
    name: "Compliance Flow Sage",
    status: "beta",
    description:
      "A structured workspace for CA firms to run compliance work without chaos. Streamlines audit trails, deadlines, and client workflows in one quiet, organised view.",
    stack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    link: "https://compliance-flow-sage.vercel.app/",
  },
];
