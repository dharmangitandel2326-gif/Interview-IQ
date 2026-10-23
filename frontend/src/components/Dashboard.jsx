
import { useEffect, useState } from "react";
import { api } from "../services/api.js";

export default function Dashboard({ user, onNavigate, refreshKey }) {
  const [stats, setStats] = useState({
    completed: 0,
    bookmarked: 0,
    results: [],
  });

  useEffect(() => {
    api("/analytics")
      .then(setStats)
      .catch(() => {});
  }, [refreshKey]);

  const average = stats.results.length
    ? Math.round(
        stats.results.reduce(
          (sum, result) =>
            sum + (result.total ? (result.score / result.total) * 100 : 0),
          0
        ) / stats.results.length
      )
    : 0;

  const cards = [
    ["Questions completed", stats.completed, "practice"],
    ["Saved bookmarks", stats.bookmarked, "bookmarks"],
    ["Mock interviews", stats.results.length, "mock"],
    ["Average score", `${average}%`, "analytics"],
  ];

  return (
    <section>
      <h1 className="page-heading">Welcome, {user?.name || "Candidate"}!</h1>
      <p className="page-subtitle">
        Continue your preparation and keep building your interview skills.
      </p>

      <div className="stat-grid">
        {cards.map(([label, value, destination]) => (
          <button
            key={label}
            className="stat-card"
            style={{ textAlign: "left", color: "var(--text)" }}
            onClick={() => onNavigate(destination)}
          >
            <small>{label}</small>
            <strong>{value}</strong>
            <p>View details →</p>
          </button>
        ))}
      </div>

      <div className="panel">
        <h2>Continue learning</h2>
        <p className="page-subtitle">
          Choose a module to continue your preparation.
        </p>
        <div className="form-grid">
          <button
            className="secondary-button"
            onClick={() => onNavigate("questions")}
          >
            Open Question Bank →
          </button>
          <button
            className="secondary-button"
            onClick={() => onNavigate("practice")}
          >
            Start Practice →
          </button>
          <button
            className="secondary-button"
            onClick={() => onNavigate("mock")}
          >
            Start Mock Interview →
          </button>
          <button
            className="secondary-button"
            onClick={() => onNavigate("profile")}
          >
            Update Candidate Profile →
          </button>
        </div>
      </div>
    </section>
  );
}
