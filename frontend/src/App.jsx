
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard.jsx";
import Practice from "./components/Practice.jsx";
import QuestionBank from "./components/QuestionBank.jsx";
import MockInterview from "./components/MockInterview.jsx";
import Analytics from "./components/Analytics.jsx";
import Bookmarks from "./components/Bookmarks.jsx";
import CandidateProfile from "./components/CandidateProfile.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import MLPrediction from "./components/MLPrediction.jsx";
import { api, getUserId, clearUserId } from "./services/api.js";
import "./style.css";

const menu = [
  ["dashboard", "Dashboard", "▦"],
  ["practice", "Practice Mode", "▷"],
  ["questions", "Question Bank", "▤"],
  ["mock", "Mock Interview", "▣"],
  ["analytics", "Analytics & Trends", "▥"],
  ["bookmarks", "Saved Bookmarks", "☆"],
  ["profile", "Candidate Profile", "♙"],
  ["mlprediction", "Performance Prediction", "✦"],
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const userId = getUserId();

    if (!userId) {
      setLoading(false);
      return;
    }

    api("/profile")
      .then((data) => setUser(data.user))
      .catch(() => {
        clearUserId();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleLogin(userData) {
    setUser(userData);
    setAuthPage("login");
    setPage("dashboard");
  }

  function handleLogout() {
    clearUserId();
    setUser(null);
    setPage("dashboard");
    setAuthPage("login");
  }

  function handleProgressChange() {
    setRefreshKey((value) => value + 1);
  }

  if (loading) {
    return <div className="loading-screen">Loading Interview IQ…</div>;
  }

  if (!user) {
    return authPage === "register" ? (
      <Register
        onSuccess={handleLogin}
        onLogin={() => setAuthPage("login")}
      />
    ) : (
      <Login
        onSuccess={handleLogin}
        onRegister={() => setAuthPage("register")}
      />
    );
  }

  const props = {
    user,
    onUserUpdate: setUser,
    onProgressChange: handleProgressChange,
    refreshKey,
    onNavigate: setPage,
  };

  return (
    <div className={dark ? "app-shell dark" : "app-shell light"}>
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">✧</div>
          <div>
            <strong>
              Interview<span>IQ</span>
            </strong>
            <small>Technical Interview Preparation</small>
          </div>
        </div>

        <div className="top-actions">
          <button
            className="theme-button"
            onClick={() => setDark((value) => !value)}
          >
            {dark ? "☀ Light mode" : "☾ Dark mode"}
          </button>

          <button
            className="user-chip"
            onClick={() => setPage("profile")}
          >
            ◉ {user.name}
          </button>

          <button className="logout-button" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <div className="candidate-summary">
            <small>LOGGED IN CANDIDATE</small>
            <strong>{user.name}</strong>
            <span>{user.target_role || "Interview Candidate"}</span>
          </div>

          <nav className="side-nav">
            {menu.map(([id, label, icon]) => (
              <button
                key={id}
                className={
                  page === id ? "nav-item active" : "nav-item"
                }
                onClick={() => setPage(id)}
              >
                <span className="nav-icon">{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <strong>Interview IQ</strong>
            <small>Learn · Practice · Improve</small>
          </div>
        </aside>

        <main className="main-content">
          {page === "dashboard" && <Dashboard {...props} />}
          {page === "practice" && <Practice {...props} />}
          {page === "questions" && <QuestionBank {...props} />}
          {page === "mock" && <MockInterview {...props} />}
          {page === "analytics" && <Analytics {...props} />}
          {page === "bookmarks" && <Bookmarks {...props} />}
          {page === "profile" && <CandidateProfile {...props} />}
          {page === "mlprediction" && <MLPrediction {...props} />}
        </main>
      </div>
    </div>
  );
}
