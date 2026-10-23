
import { useEffect, useMemo, useState } from "react";
import { questions } from "../questions.js";
import { api } from "../services/api.js";

export default function MockInterview({ onProgressChange }) {
  const [started, setStarted] = useState(false);
  const [duration, setDuration] = useState(10);
  const [seconds, setSeconds] = useState(600);
  const [responses, setResponses] = useState({});
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const session = useMemo(() => {
    const copy = [...questions];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(5, copy.length));
  }, [started]);

  useEffect(() => {
    if (!started || finished || seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, finished, seconds]);

  useEffect(() => {
    if (started && seconds === 0) setFinished(true);
  }, [started, seconds]);

  async function saveResult(score) {
    setError("");
    try {
      await api("/results", {
        method: "POST",
        body: JSON.stringify({
          score,
          total: session.length,
          mode: "Mock Interview",
        }),
      });
      setSaved(true);
      onProgressChange?.();
    } catch (err) {
      setError(err.message);
    }
  }

  function start() {
    setResponses({});
    setSeconds(duration * 60);
    setFinished(false);
    setSaved(false);
    setError("");
    setStarted(true);
  }

  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  if (!started) {
    return (
      <section>
        <h1 className="page-heading">Mock Interview</h1>
        <p className="page-subtitle">
          Simulate a technical interview using a short question set.
        </p>

        <div className="panel">
          <h2>Session setup</h2>
          <p>Questions per session: {Math.min(5, questions.length)}</p>
          <div className="field">
            <label>Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
            </select>
          </div>
          <button className="primary-button" onClick={start}>
            Start interview
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-heading">
        {finished ? "Interview Results" : "Mock Interview in Progress"}
      </h1>

      <p className="page-subtitle">
        {!finished && (
          <>Time remaining: {minutes}:{String(remaining).padStart(2, "0")}</>
        )}
      </p>

      {finished ? (
        <div className="panel">
          <h2>Review your answers</h2>
          <p>
            Answered: {session.filter((q) =>
              (responses[q.id] || "").trim()
            ).length} / {session.length}
          </p>
          <p>
            Score each response yourself based on correctness and clarity.
          </p>
          {session.map((q, i) => (
            <div key={q.id ?? i} className="answer-panel">
              <strong>{i + 1}. {q.question}</strong>
              <p>{responses[q.id] || "No answer entered."}</p>
              <details>
                <summary>View suggested answer</summary>
                <p>{q.answer || "No suggested answer available."}</p>
              </details>
            </div>
          ))}

          <div className="field">
            <label>Self-assessed score (out of {session.length})</label>
            <select id="mock-score" defaultValue={0}>
              {Array.from({ length: session.length + 1 }, (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>

          <button
            className="primary-button"
            disabled={saved}
            onClick={() => {
              const score = Number(
                document.getElementById("mock-score").value
              );
              saveResult(score);
            }}
          >
            {saved ? "Result saved" : "Save result"}
          </button>

          {error && <p className="error-message">{error}</p>}

          <button
            className="secondary-button"
            style={{ marginLeft: 10 }}
            onClick={() => {
              setStarted(false);
              setFinished(false);
            }}
          >
            New interview
          </button>
        </div>
      ) : (
        <>
          {session.map((q, i) => (
            <div className="question-card" key={q.id ?? i}>
              <div className="question-meta">
                <span className="tag">{q.category}</span>
                <span className="tag">{q.difficulty}</span>
              </div>
              <h2 className="question-title">{i + 1}. {q.question}</h2>
              <div className="field" style={{ marginTop: 16 }}>
                <label>Your answer</label>
                <textarea
                  rows={4}
                  value={responses[q.id] || ""}
                  onChange={(e) =>
                    setResponses({
                      ...responses,
                      [q.id]: e.target.value,
                    })
                  }
                  placeholder="Write your answer here..."
                />
              </div>
            </div>
          ))}

          <button
            className="primary-button"
            onClick={() => setFinished(true)}
          >
            Finish interview
          </button>
        </>
      )}
    </section>
  );
}
