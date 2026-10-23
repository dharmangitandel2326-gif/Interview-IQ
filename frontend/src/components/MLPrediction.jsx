
import { useState } from "react";

const API_URL = "http://127.0.0.1:5000";

export default function MLPrediction() {
  const [form, setForm] = useState({
    practice_score: 70,
    completed_questions: 10,
    mock_score: 65,
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setResult(null);
  }

  async function predictPerformance(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/predict-performance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          practice_score: Number(form.practice_score),
          completed_questions: Number(form.completed_questions),
          mock_score: Number(form.mock_score),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate prediction.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Make sure Flask is running on port 5000."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  const probabilities = result?.probabilities
    ? Object.entries(result.probabilities)
    : [];

  return (
    <section className="ml-page">
      <h1 className="page-heading">Performance Prediction</h1>
      <p className="page-subtitle">
        Enter your practice statistics to get a prediction from the
        trained machine-learning model.
      </p>

      <div className="ml-layout">
        <form className="ml-card" onSubmit={predictPerformance}>
          <h2>Your performance data</h2>
          <p className="ml-description">
            Enter values within the ranges below.
          </p>

          <div className="field">
            <label htmlFor="practice_score">Practice score (0–100)</label>
            <input
              id="practice_score"
              name="practice_score"
              type="number"
              min="0"
              max="100"
              value={form.practice_score}
              onChange={updateField}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="completed_questions">
              Completed questions (0–500)
            </label>
            <input
              id="completed_questions"
              name="completed_questions"
              type="number"
              min="0"
              max="500"
              value={form.completed_questions}
              onChange={updateField}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="mock_score">Mock interview score (0–100)</label>
            <input
              id="mock_score"
              name="mock_score"
              type="number"
              min="0"
              max="100"
              value={form.mock_score}
              onChange={updateField}
              required
            />
          </div>

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Predicting…" : "Predict Performance"}
          </button>

          {error && (
            <p className="ml-error" role="alert">
              {error}
            </p>
          )}
        </form>

        <div className="ml-card ml-result-card">
          <div className="ml-result-icon">✦</div>
          <h2>Prediction result</h2>

          {!result && !loading && (
            <p className="ml-description">
              Your prediction will appear here after you submit your data.
            </p>
          )}

          {loading && (
            <p className="ml-description">Analyzing your input…</p>
          )}

          {result && (
            <>
              <p className="ml-description">Predicted performance category</p>
              <div className="ml-prediction">
                {result.prediction}
              </div>

              {probabilities.length > 0 && (
                <div className="ml-probabilities">
                  <h3>Model class probabilities</h3>

                  {probabilities.map(([label, probability]) => {
                    const percentage = Math.max(
                      0,
                      Math.min(100, Number(probability) * 100)
                    );

                    return (
                      <div className="ml-probability" key={label}>
                        <div className="ml-probability-heading">
                          <span>{label}</span>
                          <strong>{percentage.toFixed(1)}%</strong>
                        </div>

                        <div className="ml-track">
                          <div
                            className="ml-fill"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <p className="ml-note">
                This prediction is based on the model's training data.
                It is an estimate, not a guarantee of interview outcomes.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="ml-info">
        <h3>How this feature works</h3>
        <p>
          The React form sends your input to the Flask API. The backend
          uses the saved machine-learning model to predict a performance
          category and returns the result to this page.
        </p>
        <p>
          If the model was trained on illustrative sample data, its
          predictions and probabilities should not be treated as
          validated measures of real-world performance.
        </p>
      </div>
    </section>
  );
}
