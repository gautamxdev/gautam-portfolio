"use client";

import { useEffect, useState } from "react";
import {
  type ContributionsData,
  fetchGitHubContributions,
  getContributionColor,
} from "@/lib/github";

const LEGEND_LEVELS = [0, 1, 2, 3, 4];

export function ContributionsSkeleton() {
  return (
    <div className="contribution-card animate-pulse">
      <div className="mx-auto flex flex-col items-center max-w-full">
        <div className="overflow-x-auto max-w-full pb-2">
          <div className="contribution-months font-mono" aria-hidden="true" />
          <div className="contribution-grid" aria-hidden="true">
            {Array.from({ length: 53 }).map((_, weekIndex) => (
              <div key={weekIndex} className="contribution-week">
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div key={dayIndex} className="contribution-cell" style={{ backgroundColor: "#161616" }} />
                ))}
              </div>
            ))}
          </div>
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
  monthLabels,
}: ContributionsData) {
  return (
    <div className="contribution-card font-mono">
      <div className="mx-auto flex flex-col items-center max-w-full">
        <div className="overflow-x-auto max-w-full pb-2">
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
            aria-label={`${total} GitHub contributions in the latest year`}
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
                    style={{ backgroundColor: getContributionColor(day.level) }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div 
          className="contribution-footer w-full max-w-full" 
          style={{ width: "calc(53 * var(--contribution-cell-size) + 52 * var(--contribution-gap))" }}
        >
          <p>{total.toLocaleString()} contributions in the last year</p>
          <div className="contribution-legend" aria-hidden="true">
            <span>Less</span>
            <div className="flex gap-2">
              {LEGEND_LEVELS.map((level) => (
                <span
                  key={level}
                  className="contribution-cell"
                  style={{ backgroundColor: getContributionColor(level) }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GitHubContributions() {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchGitHubContributions()
      .then((res) => setData(res))
      .catch((err) => {
        console.error("Error loading contributions:", err);
        setError(true);
      });
  }, []);

  if (error) {
    return <ContributionsError />;
  }

  if (!data) {
    return <ContributionsSkeleton />;
  }

  return <ContributionsGrid {...data} />;
}
