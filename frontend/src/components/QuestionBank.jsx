
import { useEffect, useMemo, useState } from "react";
import { questions } from "../questions.js";
import { api } from "../services/api.js";

export default function QuestionBank({ onProgressChange }) {
  const [search, setSearch] = useState("");
  const [track, setTrack] = useState("All Tracks");
  const [level, setLevel] = useState("All Levels");
  const [expanded, setExpanded] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/bookmarks")
      .then((data) => setBookmarks(data.bookmarks.map(String)))
      .catch((err) => setError(err.message));

    api("/analytics")
      .then((data) => {
        // The analytics endpoint returns a count, not individual IDs.
        // Individual completion state is loaded by the dedicated endpoint
        // if you add one later; the current count remains on the dashboard.
      })
      .catch(() => {});
  }, []);

  const tracks = [
    "All Tracks",
    ...new Set(questions.map((q) => q.category).filter(Boolean)),
  ];

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return questions.filter((q) => {
      const matchesSearch = [
        q.question, q.answer, q.topic, q.category, q.description,
      ].some((value) => String(value || "").toLowerCase().includes(keyword));

      const matchesTrack = track === "All Tracks" || q.category === track;

      const matchesLevel =
        level === "All Levels" ||
        String(q.difficulty || "").toLowerCase() === level.toLowerCase();

      return matchesSearch && matchesTrack && matchesLevel;
    });
  }, [search, track, level]);

  function idFor(q, index) {
    return String(q.id ?? `${q.category}-${index}`);
  }

  async function toggleBookmark(id) {
    const exists = bookmarks.includes(id);
    setError("");

    try {
      if (exists) {
        await api(`/bookmarks/${encodeURIComponent(id)}`, {
          method: "DELETE",
        });
        setBookmarks((old) => old.filter((item) => item !== id));
      } else {
        await api("/bookmarks", {
          method: "POST",
          body: JSON.stringify({ question_id: id }),
        });
        setBookmarks((old) => [...old, id]);
      }
      onProgressChange?.();
    } catch (err) {
      setError(err.message);
    }
  }

  async function markCompleted(id) {
    setError("");
    try {
      await api("/progress", {
        method: "POST",
        body: JSON.stringify({ question_id: id }),
      });
      setCompleted((old) => old.includes(id) ? old : [...old, id]);
      onProgressChange?.();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <h1 className="page-heading">Technical Question Bank</h1>
      <p className="page-subtitle">
        Explore {questions.length} technical interview questions.
        Search topics, select a track, or filter by difficulty.
      </p>

      <div className="panel">
        <div className="filter-grid">
          <input
            aria-label="Search questions"
            placeholder="⌕ Search keywords, topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            aria-label="Select track"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
          >
            {tracks.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            aria-label="Select difficulty"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {["All Levels", "Beginner", "Intermediate", "Advanced"].map(
              (item) => <option key={item}>{item}</option>
            )}
          </select>
        </div>
      </div>

      <p className="page-subtitle">
        Showing {filtered.length} of {questions.length} questions
        {" · "}{bookmarks.length} saved
      </p>

      {error && <p className="error-message">{error}</p>}

      {filtered.length === 0 && (
        <div className="panel empty-state">
          No questions found. Try another keyword or filter.
        </div>
      )}

      {filtered.map((q, index) => {
        const id = idFor(q, index);
        const isExpanded = expanded === id;
        const saved = bookmarks.includes(id);
        const done = completed.includes(id);

        return (
          <article className="question-card" key={id}>
            <div className="question-meta">
              <span className="tag">{q.category}</span>
              {q.topic && <span className="tag">{q.topic}</span>}
              <span className="tag">{q.difficulty || "Unspecified"}</span>
              {done && <span className="tag">Completed</span>}
            </div>

            <h2 className="question-title">{q.question}</h2>

            <div className="question-actions">
              <button
                className="secondary-button"
                onClick={() => setExpanded(isExpanded ? null : id)}
              >
                {isExpanded ? "Hide answer" : "Show answer"}
              </button>

              <button
                className="secondary-button"
                onClick={() => toggleBookmark(id)}
              >
                {saved ? "★ Saved" : "☆ Bookmark"}
              </button>

              <button
                className="secondary-button"
                disabled={done}
                onClick={() => markCompleted(id)}
              >
                {done ? "✓ Completed" : "Mark completed"}
              </button>
            </div>

            {isExpanded && (
              <div className="answer-panel">
                <strong>Answer</strong>
                <p>{q.answer || "No answer has been added for this question yet."}</p>
                {q.description && <p>{q.description}</p>}
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
