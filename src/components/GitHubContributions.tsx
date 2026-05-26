import {
  fetchGitHubContributions,
  getContributionColor,
} from "@/lib/github";

export function ContributionsSkeleton() {
  return (
    <div className="mt-10">
      <div className="flex gap-[3px] overflow-hidden">
        {Array.from({ length: 53 }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div
                key={dayIndex}
                className="h-[10px] w-[10px] rounded-sm bg-elevated"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContributionsError() {
  return (
    <div className="mt-10">
      <p className="font-mono text-sm text-muted">
        {"// contribution data unavailable"}
      </p>
    </div>
  );
}

function ContributionsGrid({
  total,
  weeks,
}: {
  total: number;
  weeks: { date: string; count: number; level: number }[][];
}) {
  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <div
          className="inline-flex gap-[3px]"
          role="img"
          aria-label={`${total} GitHub contributions in the last year`}
        >
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  title={
                    day.date
                      ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                      : undefined
                  }
                  className="h-[10px] w-[10px] rounded-sm"
                  style={{ backgroundColor: getContributionColor(day.level) }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 font-mono text-sm text-muted">
        {total.toLocaleString()} contributions in the last year
      </p>
    </div>
  );
}

export async function GitHubContributions() {
  try {
    const data = await fetchGitHubContributions();
    return <ContributionsGrid total={data.total} weeks={data.weeks} />;
  } catch {
    return <ContributionsError />;
  }
}
