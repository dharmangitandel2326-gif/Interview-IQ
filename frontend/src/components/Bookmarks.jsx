
import { useEffect, useState } from "react";
import { questions } from "../questions.js";
import { api } from "../services/api.js";

export default function Bookmarks({ onProgressChange }) {
  const [ids, setIds] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setError("");
    try {
      const data = await api("/bookmarks");
      setIds(data.bookmarks.map(String));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    try {
      await api(`/bookmarks/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      setIds((old) => old.filter((item) => item !== id));
      onProgressChange?.();
    } catch (err) {
      setError(err.message);
    }
  }

  const savedQuestions = questions
    .map((q, index) => ({
      ...q,
      stableId: String(q.id ?? `${q.category}-${index}`),
    }))
    .filter((q) => ids.includes(q.stableId));

  return (
    <section>
      <h1 className="page-heading">Saved Bookmarks</h1>
      <p className="page-subtitle">
        Questions you've saved for revision.
      </p>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <div className="panel">Loading bookmarks…</div>
      ) : savedQuestions.length === 0 ? (
        <div className="panel empty-state">
          <h2>No saved questions yet</h2>
          <p>Open Question Bank and bookmark questions you want to revisit.</p>
        </div>
      ) : (
        <>
          <p className="page-subtitle">
            {savedQuestions.length} saved questions
          </p>

          {savedQuestions.map((q) => (
            <article className="question-card" key={q.stableId}>
              <div className="question-meta">
                <span className="tag">{q.category}</span>
                <span className="tag">{q.topic}</span>
                <span className="tag">{q.difficulty}</span>
              </div>

              <h2 className="question-title">{q.question}</h2>

              <details className="answer-panel">
                <summary>View answer</summary>
                <p>{q.answer || "No answer added yet."}</p>
              </details>

              <button
                className="danger-button"
                style={{ marginTop: 12 }}
                onClick={() => remove(q.stableId)}
              >
                Remove bookmark
              </button>
            </article>
          ))}
        </>
      )}
    </section>
  );
}
