
import { useMemo, useState } from "react";
import { questions } from "../questions.js";
import { api } from "../services/api.js";

export default function Practice({ onProgressChange }) {
  const [track, setTrack] = useState("All Tracks");
  const [level, setLevel] = useState("All Levels");
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [message, setMessage] = useState("");

  const filtered = useMemo(
    () => questions.filter((q) =>
      (track === "All Tracks" || q.category === track) &&
      (level === "All Levels" ||
        String(q.difficulty).toLowerCase() === level.toLowerCase())
    ),
    [track, level]
  );

  const question = filtered[index];

  function changeFilters(setter, value) {
    setter(value);
    setIndex(0);
    setShowAnswer(false);
    setMessage("");
  }

  async function completeQuestion() {
    if (!question) return;
    try {
      await api("/progress", {
        method: "POST",
        body: JSON.stringify({
          question_id: String(question.id ?? `${question.category}-${index}`),
        }),
      });
      setMessage("Question marked as completed.");
      onProgressChange?.();
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <section>
      <h1 className="page-heading">Practice Mode</h1>
      <p className="page-subtitle">
        Practice one question at a time and reveal the answer when you're ready.
      </p>

      <div className="panel">
        <div className="filter-grid">
          <select
            value={track}
            onChange={(e) => changeFilters(setTrack, e.target.value)}
          >
            {["All Tracks", ...new Set(questions.map((q) => q.category))].map(
              (item) => <option key={item}>{item}</option>
            )}
          </select>

          <select
            value={level}
            onChange={(e) => changeFilters(setLevel, e.target.value)}
          >
            {["All Levels", "Beginner", "Intermediate", "Advanced"].map(
              (item) => <option key={item}>{item}</option>
            )}
          </select>
        </div>
      </div>

      {!question ? (
        <div className="panel empty-state">No questions match these filters.</div>
      ) : (
        <div className="panel">
          <div className="question-meta">
            <span className="tag">{question.category}</span>
            <span className="tag">{question.topic}</span>
            <span className="tag">{question.difficulty}</span>
          </div>

          <p className="page-subtitle">
            Question {index + 1} of {filtered.length}
          </p>

          <h2 className="question-title">{question.question}</h2>

          {showAnswer && (
            <div className="answer-panel">
              <strong>Suggested answer</strong>
              <p>{question.answer || "No answer has been added yet."}</p>
            </div>
          )}

          <div className="question-actions">
            <button
              className="primary-button"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? "Hide answer" : "Reveal answer"}
            </button>
            <button className="secondary-button" onClick={completeQuestion}>
              Mark completed
            </button>
          </div>

          {message && <p className="success-message">{message}</p>}

          <div className="question-actions">
            <button
              className="secondary-button"
              disabled={index === 0}
              onClick={() => {
                setIndex(index - 1);
                setShowAnswer(false);
                setMessage("");
              }}
            >
              ← Previous
            </button>
            <button
              className="secondary-button"
              disabled={index >= filtered.length - 1}
              onClick={() => {
                setIndex(index + 1);
                setShowAnswer(false);
                setMessage("");
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
