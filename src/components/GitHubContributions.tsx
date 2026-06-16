import {
  type ContributionsData,
  fetchGitHubContributions,
} from "@/lib/github";

const LEGEND_LEVELS = [0, 1, 2, 3, 4];

export function ContributionsSkeleton() {
  return (
    <div className="contribution-card animate-pulse">
      <div className="contribution-frame">
        <div className="contribution-months" aria-hidden="true" />
        <div className="contribution-grid" aria-hidden="true">
          {Array.from({ length: 53 }).map((_, weekIndex) => (
            <div key={weekIndex} className="contribution-week">
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <div key={dayIndex} className="contribution-cell" />
              ))}
            </div>
          ))}
        </div>
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
  year,
  monthLabels,
}: ContributionsData) {
  return (
    <div className="contribution-card">
      <div className="contribution-frame">
        <div className="contribution-months" aria-hidden="true">
          {monthLabels.map((month) => (
            <span
              key={`${month.label}-${month.weekIndex}`}
              style={{
                left: `calc(${month.weekIndex} * (var(--contribution-cell-size) + var(--contribution-gap)))`,
              }}
            >
              {month.label}
            </span>
          ))}
        </div>
        <div
          className="contribution-grid"
          role="img"
          aria-label={`${total} GitHub contributions in ${year}`}
        >
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="contribution-week">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  title={
                    day.date
                      ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                      : undefined
                  }
                  className="contribution-cell"
                  data-level={day.level}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="contribution-footer">
          <p>{total.toLocaleString()} contributions in {year}</p>
          <div className="contribution-legend" aria-hidden="true">
            <span>Less</span>
            <div className="flex gap-2">
              {LEGEND_LEVELS.map((level) => (
                <span key={level} className="contribution-cell" data-level={level} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function GitHubContributions() {
  try {
    const data = await fetchGitHubContributions();
    return <ContributionsGrid {...data} />;
  } catch {
    return <ContributionsError />;
  }
}
