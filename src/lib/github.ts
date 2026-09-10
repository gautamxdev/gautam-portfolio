const GITHUB_USERNAME = "gautamxdev";
const GITHUB_CALENDAR_URL = `https://github.com/users/${GITHUB_USERNAME}/contributions`;
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;
const CONTRIBUTION_WEEK_COUNT = 53;
const CONTRIBUTION_DAY_COUNT = 7;

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type ContributionsData = {
  total: number;
  weeks: ContributionDay[][];
  monthLabels: { label: string; weekIndex: number }[];
};

type ApiResponse = {
  contributions?: ContributionDay[];
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function emptyDay(): ContributionDay {
  return { date: "", count: 0, level: 0 };
}

function formatUtcDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function parseContributionTotal(html: string): number {
  const match = html.match(/(\d[\d,]*)\s+contributions\s+in the last year/i);
  if (!match) {
    throw new Error("Failed to parse GitHub contribution total");
  }

  return Number.parseInt(match[1].replace(/,/g, ""), 10);
}

function parseMonthLabels(
  html: string,
): { label: string; weekIndex: number }[] {
  const labels: { label: string; weekIndex: number }[] = [];
  const pattern =
    /ContributionCalendar-label"\s+colspan="(\d+)"[\s\S]*?<span aria-hidden="true"[^>]*>([A-Za-z]{3})<\/span>/g;

  let weekIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(html)) !== null) {
    labels.push({ label: match[2], weekIndex });
    weekIndex += Number.parseInt(match[1], 10);
  }

  return labels;
}

function parseDayRows(html: string): ContributionDay[][] {
  const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/i);
  if (!tbodyMatch) {
    throw new Error("Failed to parse GitHub contribution calendar");
  }

  const rowPattern = /<tr[\s\S]*?>([\s\S]*?)<\/tr>/gi;
  const cellPattern =
    /<td[^>]*?(?:data-date="([^"]+)"[^>]*?data-level="(\d+)"|data-level="(\d+)"[^>]*?data-date="([^"]+)")[^>]*>/gi;

  const dayRows: ContributionDay[][] = [];

  for (const rowMatch of tbodyMatch[1].matchAll(rowPattern)) {
    const cells: ContributionDay[] = [];

    for (const cellMatch of rowMatch[1].matchAll(cellPattern)) {
      const date = cellMatch[1] ?? cellMatch[4];
      const level = Number.parseInt(cellMatch[2] ?? cellMatch[3] ?? "0", 10);

      cells.push({
        date,
        count: 0,
        level,
      });
    }

    if (cells.length > 0) {
      dayRows.push(cells);
    }
  }

  if (dayRows.length === 0) {
    throw new Error("Failed to parse GitHub contribution days");
  }

  return dayRows;
}

function transposeDayRows(dayRows: ContributionDay[][]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];

  for (let weekIndex = 0; weekIndex < CONTRIBUTION_WEEK_COUNT; weekIndex++) {
    const week: ContributionDay[] = [];

    for (let dayIndex = 0; dayIndex < CONTRIBUTION_DAY_COUNT; dayIndex++) {
      const day = dayRows[dayIndex]?.[weekIndex];
      week.push(day ?? emptyDay());
    }

    weeks.push(week);
  }

  return weeks;
}

function parseGitHubCalendar(html: string): {
  total: number;
  weeks: ContributionDay[][];
  monthLabels: { label: string; weekIndex: number }[];
} {
  const dayRows = parseDayRows(html);

  return {
    total: parseContributionTotal(html),
    weeks: transposeDayRows(dayRows),
    monthLabels: parseMonthLabels(html),
  };
}

function getContributionWindow(): { start: string; end: string } {
  const today = new Date();
  const end = formatUtcDate(today);

  const currentWeekSunday = new Date(today);
  currentWeekSunday.setUTCDate(today.getUTCDate() - today.getUTCDay());

  const graphStart = new Date(currentWeekSunday);
  graphStart.setUTCDate(
    currentWeekSunday.getUTCDate() - (CONTRIBUTION_WEEK_COUNT - 1) * 7,
  );

  return { start: formatUtcDate(graphStart), end };
}

function buildContributionWeeks(
  contributions: ContributionDay[],
  start: string,
  end: string,
): ContributionDay[][] {
  const byDate = new Map(contributions.map((day) => [day.date, day]));
  const weeks: ContributionDay[][] = [];
  const cursor = new Date(`${start}T00:00:00Z`);

  for (let weekIndex = 0; weekIndex < CONTRIBUTION_WEEK_COUNT; weekIndex++) {
    const week: ContributionDay[] = [];

    for (let dayIndex = 0; dayIndex < CONTRIBUTION_DAY_COUNT; dayIndex++) {
      const date = formatUtcDate(cursor);

      if (date > end) {
        week.push(emptyDay());
      } else {
        week.push(
          byDate.get(date) ?? {
            date,
            count: 0,
            level: 0,
          },
        );
      }

      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    weeks.push(week);
  }

  return weeks;
}

function getMonthLabelsFromWeeks(
  weeks: ContributionDay[][],
): { label: string; weekIndex: number }[] {
  const labels: { label: string; weekIndex: number }[] = [];
  let currentMonth = "";
  let lastWeekIndex = -10;

  weeks.forEach((week, weekIndex) => {
    const firstDatedDay = week.find((day) => day.date);
    if (!firstDatedDay?.date) return;

    const monthIndex = Number.parseInt(firstDatedDay.date.slice(5, 7), 10) - 1;
    const month = MONTH_NAMES[monthIndex] || "";

    if (month && month !== currentMonth) {
      currentMonth = month;
      if (weekIndex - lastWeekIndex >= 4) {
        labels.push({ label: month, weekIndex });
        lastWeekIndex = weekIndex;
      } else if (lastWeekIndex === 0 && labels.length > 0) {
        labels[labels.length - 1] = { label: month, weekIndex };
        lastWeekIndex = weekIndex;
      }
    }
  });

  return labels;
}

function applyContributionCounts(
  weeks: ContributionDay[][],
  countsByDate: Map<string, number>,
): ContributionDay[][] {
  return weeks.map((week) =>
    week.map((day) => {
      if (!day.date) {
        return day;
      }

      const count = countsByDate.get(day.date);
      return count === undefined
        ? day
        : {
            ...day,
            count,
          };
    }),
  );
}

async function fetchContributionCounts(): Promise<Map<string, number>> {
  try {
    const response = await fetch(CONTRIBUTIONS_API, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return new Map();
    }

    const data: ApiResponse = await response.json();

    if (!Array.isArray(data.contributions)) {
      return new Map();
    }

    return new Map(
      data.contributions.map((day) => [day.date, day.count ?? 0]),
    );
  } catch {
    return new Map();
  }
}

async function fetchContributionsApiData(): Promise<ContributionDay[]> {
  const response = await fetch(CONTRIBUTIONS_API, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub contributions API");
  }

  const data: ApiResponse = await response.json();

  if (!Array.isArray(data.contributions)) {
    throw new Error("Invalid GitHub contributions API response");
  }

  return data.contributions;
}

async function fetchFromGitHubHtml(
  countsByDate: Map<string, number>,
): Promise<ContributionsData> {
  const response = await fetch(GITHUB_CALENDAR_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub contribution calendar");
  }

  const html = await response.text();
  const calendar = parseGitHubCalendar(html);

  return {
    total: calendar.total,
    weeks: applyContributionCounts(calendar.weeks, countsByDate),
    monthLabels: calendar.monthLabels,
  };
}

async function fetchFromContributionsApi(
  contributions: ContributionDay[],
): Promise<ContributionsData> {
  const { start, end } = getContributionWindow();
  const filtered = contributions.filter((day) => day.date <= end);
  const weeks = buildContributionWeeks(filtered, start, end);
  const total = weeks
    .flat()
    .filter((day) => day.date && day.date <= end)
    .reduce((sum, day) => sum + day.count, 0);

  return {
    total,
    weeks,
    monthLabels: getMonthLabelsFromWeeks(weeks),
  };
}

export async function fetchGitHubContributions(): Promise<ContributionsData> {
  const [countsByDate, contributions] = await Promise.all([
    fetchContributionCounts(),
    fetchContributionsApiData(),
  ]);

  try {
    return await fetchFromGitHubHtml(countsByDate);
  } catch {
    return fetchFromContributionsApi(contributions);
  }
}
