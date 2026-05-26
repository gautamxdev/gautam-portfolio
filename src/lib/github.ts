import { cache } from "react";

const GITHUB_USERNAME = "gautamxdev";
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type ContributionsData = {
  total: number;
  weeks: ContributionDay[][];
};

type ApiResponse = {
  total?: Record<string, number>;
  contributions?: ContributionDay[];
};

const LEVEL_COLORS: Record<number, string> = {
  0: "#0f1624",
  1: "#001a3a",
  2: "#003a7a",
  3: "#0066cc",
  4: "#4d9fff",
};

export function getContributionColor(level: number): string {
  return LEVEL_COLORS[level] ?? LEVEL_COLORS[0];
}

function getLastYearContributions(
  contributions: ContributionDay[],
): ContributionDay[] {
  const cutoff = new Date();
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 1);

  return contributions.filter(
    (day) => new Date(`${day.date}T00:00:00Z`) >= cutoff,
  );
}

function contributionsToWeeks(contributions: ContributionDay[]): ContributionDay[][] {
  if (contributions.length === 0) return [];

  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  const firstDate = new Date(`${sorted[0].date}T00:00:00Z`);
  const startOffset = firstDate.getUTCDay();

  const weeks: ContributionDay[][] = [];
  let currentWeek: (ContributionDay | null)[] = Array(startOffset).fill(null);

  for (const day of sorted) {
    if (currentWeek.length === 7) {
      weeks.push(
        currentWeek.map(
          (d) => d ?? { date: "", count: 0, level: 0 },
        ),
      );
      currentWeek = [];
    }
    currentWeek.push(day);
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(
      currentWeek.map((d) => d ?? { date: "", count: 0, level: 0 }),
    );
  }

  return weeks;
}

export const fetchGitHubContributions = cache(async (): Promise<ContributionsData> => {
  const response = await fetch(CONTRIBUTIONS_API, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  const data: ApiResponse = await response.json();

  if (!Array.isArray(data.contributions)) {
    throw new Error("Invalid GitHub contributions response");
  }

  const lastYearContributions = getLastYearContributions(data.contributions);
  const total = lastYearContributions.reduce(
    (sum, day) => sum + (day.count ?? 0),
    0,
  );

  return {
    total,
    weeks: contributionsToWeeks(lastYearContributions),
  };
});
