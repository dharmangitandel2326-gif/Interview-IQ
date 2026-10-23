

import { useEffect, useState } from "react";
import { api } from "../services/api.js";

function BarChart({ title, subtitle, items, valueKey, labelKey, maxValue }) {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">Complete some practice sessions to see your graph.</div>
      ) : (
        <>
          <div className="bar-chart">
            {items.map((item, index) => {
              const value = Number(item[valueKey]) || 0;
              const height = Math.max(
                value > 0 ? 5 : 0,
                Math.min(100, (value / Math.max(maxValue, 1)) * 100)
              );

              return (
                <div
                  className="bar-column"
                  key={item.id ?? `${item[labelKey]}-${index}`}
                  title={`${item[labelKey]}: ${value}`}
                >
                  <span className="bar-value">{value}</span>
                  <div
                    className="bar"
                    style={{ height: `${height}%` }}
                  />
                  <span className="bar-label">{item[labelKey]}</span>
                </div>
              );
            })}
          </div>
          <div className="chart-legend">
            Bars show the most recent sessions, ordered from oldest to newest.
          </div>
        </>
      )}
    </div>
  );
}

export default function Analytics({ refreshKey }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/analytics")
      .then(setData)
      .catch((err) => setError(err.message));
  }, [refreshKey]);

  if (error) {
    return (
      <section>
        <h1 className="page-heading">Analytics & Trends</h1>
        <p className="error-message">{error}</p>
      </section>
    );
  }

  if (!data) {
    return <div className="panel">Loading analytics…</div>;
  }

  const results = [...(data.results || [])].reverse().slice(-7);

  const average = results.length
    ? Math.round(
        results.reduce(
          (sum, item) =>
            sum + (item.total ? (item.score / item.total) * 100 : 0),
          0
        ) / results.length
      )
    : 0;

  const scoreItems = results.map((result, index) => ({
    ...result,
    percentage: result.total
      ? Math.round((result.score / result.total) * 100)
      : 0,
    sessionLabel: `#${index + 1}`,
  }));

  const overview = [
    {
      label: "Completed",
      value: Number(data.completed) || 0,
    },
    {
      label: "Bookmarks",
      value: Number(data.bookmarked) || 0,
    },
    {
      label: "Interviews",
      value: results.length,
    },
  ];

  const maxOverview = Math.max(1, ...overview.map((item) => item.value));

  return (
    <section>
      <h1 className="page-heading">Analytics & Trends</h1>
      <p className="page-subtitle">
        Track your interview preparation, practice activity, and recent scores.
      </p>

      <div className="stat-grid">
        <div className="stat-card">
          <small>Questions completed</small>
          <strong>{data.completed ?? 0}</strong>
          <p>Practice progress</p>
        </div>

        <div className="stat-card">
          <small>Saved bookmarks</small>
          <strong>{data.bookmarked ?? 0}</strong>
          <p>Questions to revisit</p>
        </div>

        <div className="stat-card">
          <small>Mock interviews</small>
          <strong>{(data.results || []).length}</strong>
          <p>Sessions recorded</p>
        </div>

        <div className="stat-card">
          <small>Average recent score</small>
          <strong>{average}%</strong>
          <p>Based on recent sessions</p>
        </div>
      </div>

      <div className="chart-grid">
        <BarChart
          title="Interview score trend"
          subtitle="Your latest seven recorded sessions"
          items={scoreItems}
          valueKey="percentage"
          labelKey="sessionLabel"
          maxValue={100}
        />

        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h2>Activity overview</h2>
              <p>Your saved progress at a glance</p>
            </div>
          </div>

          <div className="bar-chart">
            {overview.map((item) => {
              const height = (item.value / maxOverview) * 100;

              return (
                <div className="bar-column" key={item.label}>
                  <span className="bar-value">{item.value}</span>
                  <div
                    className="bar"
                    style={{ height: `${Math.max(item.value ? 5 : 0, height)}%` }}
                  />
                  <span className="bar-label">{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="chart-legend">
            Counts are based on the current analytics API response.
          </div>
        </div>
      </div>

      <div className="panel">
        <h2>Recent interview results</h2>

        {results.length === 0 ? (
          <div className="empty-state">
            <h3>No interview results yet</h3>
            <p>Complete a mock interview and save your score to see trends.</p>
          </div>
        ) : (
          results.slice().reverse().map((result) => {
            const percentage = result.total
              ? Math.round((result.score / result.total) * 100)
              : 0;

            return (
              <div className="answer-panel" key={result.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  <strong>{result.mode || "Mock Interview"}</strong>
                  <strong>{percentage}%</strong>
                </div>

                <p>
                  Score: {result.score} / {result.total}
                </p>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <small>{result.created_at}</small>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
