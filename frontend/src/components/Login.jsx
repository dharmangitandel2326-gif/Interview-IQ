
import { useState } from "react";
import {
  BrainCircuit,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { api, setUserId } from "../services/api.js";

export default function Login({ onSuccess, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      const data = await api("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setUserId(data.user.id);
      onSuccess(data.user);
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="login-decoration login-decoration-one" />
      <div className="login-decoration login-decoration-two" />

      <form className="auth-card login-card" onSubmit={submit}>
        {/* Brand logo */}
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <BrainCircuit size={30} strokeWidth={2} />
          </div>

          <div className="auth-brand-text">
            <strong>
              Interview<span>IQ</span>
            </strong>
            <small>Technical Interview Preparation</small>
          </div>
        </div>

        {/* Welcome heading */}
        <div className="login-heading">
          <div className="login-welcome-badge">
            <Sparkles size={15} />
            Welcome back
          </div>

          <h1>Let's get you ready.</h1>

          <p>
            Sign in to continue your interview preparation
            and build your technical skills.
          </p>
        </div>

        {/* Email */}
        <div className="field login-field">
          <label htmlFor="login-email">Email address</label>

          <div className="login-input-wrap">
            <Mail size={18} className="login-input-icon" />

            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="field login-field">
          <label htmlFor="login-password">Password</label>

          <div className="login-input-wrap">
            <LockKeyhole size={18} className="login-input-icon" />

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="login-error" role="alert">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="primary-button login-submit"
          disabled={busy}
        >
          {busy ? (
            <>
              <span className="login-spinner" />
              Signing in...
            </>
          ) : (
            <>
              Sign in to your account
              <ArrowRight size={18} />
            </>
          )}
        </button>

        <div className="login-divider">
          <span>NEW TO INTERVIEW IQ?</span>
        </div>

        <button
          type="button"
          className="login-register-button"
          onClick={onRegister}
        >
          Create an account
          <ArrowRight size={16} />
        </button>

        <p className="login-footer">
          Learn <span>·</span> Practice <span>·</span> Improve
        </p>
      </form>
    </div>
  );
}
