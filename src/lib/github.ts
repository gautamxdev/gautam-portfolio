const GITHUB_USERNAME = "gautamxdev";
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;
const CONTRIBUTION_WEEK_COUNT = 53;

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type ContributionsData = {
  total: number;
  weeks: ContributionDay[][];
  year: string;
  monthLabels: { label: string; weekIndex: number }[];
};

type ApiResponse = {
  total?: Record<string, number>;
  contributions?: ContributionDay[];
};

const LEVEL_COLORS: Record<number, string> = {
  0: "#161616",
  1: "#3d1705",
  2: "#702602",
  3: "#b83c02",
  4: "#ff4d00",
};

export function getContributionColor(level: number): string {
  return LEVEL_COLORS[level] ?? LEVEL_COLORS[0];
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

function getContributionYear(weeks: ContributionDay[][]): string {
  const latestDay = weeks
    .flat()
    .filter((day) => day.date)
    .at(-1);

  return latestDay ? latestDay.date.slice(0, 4) : new Date().getFullYear().toString();
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getMonthLabels(
  weeks: ContributionDay[][],
): { label: string; weekIndex: number }[] {
  const labels: { label: string; weekIndex: number }[] = [];
  let currentMonth = "";
  let lastWeekIndex = -10;

  weeks.forEach((week, weekIndex) => {
    const firstDatedDay = week.find((day) => day.date);
    if (!firstDatedDay || !firstDatedDay.date) return;

    const monthIndex = parseInt(firstDatedDay.date.slice(5, 7), 10) - 1;
    const month = MONTH_NAMES[monthIndex] || "";

    if (month && month !== currentMonth) {
      currentMonth = month;
      if (weekIndex - lastWeekIndex >= 4) {
        labels.push({ label: month, weekIndex });
        lastWeekIndex = weekIndex;
      } else if (lastWeekIndex === 0 && labels.length > 0) {
        // If the new label is too close to the very start of the graph, replace it
        labels[labels.length - 1] = { label: month, weekIndex };
        lastWeekIndex = weekIndex;
      }
    }
  });

  return labels;
}

export async function fetchGitHubContributions(): Promise<ContributionsData> {
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

  const weeks = contributionsToWeeks(data.contributions).slice(
    -CONTRIBUTION_WEEK_COUNT,
  );
  const total = weeks.flat().reduce(
    (sum, day) => sum + (day.count ?? 0),
    0,
  );

  return {
    total,
    weeks,
    year: getContributionYear(weeks),
    monthLabels: getMonthLabels(weeks),
  };
}
