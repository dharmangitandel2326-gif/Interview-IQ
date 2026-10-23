
import { useState } from "react";
import {
  BrainCircuit,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { api, setUserId } from "../services/api.js";

export default function Register({ onSuccess, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setBusy(true);

    try {
      const data = await api("/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      setUserId(data.user.id);
      onSuccess(data.user);
    } catch (err) {
      setError(err.message || "Unable to create your account. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-screen register-screen">
      <div className="login-decoration login-decoration-one" />
      <div className="login-decoration login-decoration-two" />

      <form className="auth-card login-card register-card" onSubmit={submit}>
        {/* Interview IQ branding */}
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
            Start your journey
          </div>

          <h1>Create your account.</h1>

          <p>
            Build your skills, practise technical questions,
            and prepare confidently for your next interview.
          </p>
        </div>

        {/* Full name */}
        <div className="field login-field">
          <label htmlFor="register-name">Full name</label>

          <div className="login-input-wrap">
            <UserRound size={18} className="login-input-icon" />

            <input
              id="register-name"
              type="text"
              placeholder="Enter your full name"
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="field login-field">
          <label htmlFor="register-email">Email address</label>

          <div className="login-input-wrap">
            <Mail size={18} className="login-input-icon" />

            <input
              id="register-email"
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
          <label htmlFor="register-password">Password</label>

          <div className="login-input-wrap">
            <LockKeyhole size={18} className="login-input-icon" />

            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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

          <div className="register-password-hint">
            <CheckCircle2 size={14} />
            Use at least 8 characters.
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="login-error" role="alert">
            {error}
          </div>
        )}

        {/* Register button */}
        <button
          type="submit"
          className="primary-button login-submit"
          disabled={busy}
        >
          {busy ? (
            <>
              <span className="login-spinner" />
              Creating account...
            </>
          ) : (
            <>
              Create my account
              <ArrowRight size={18} />
            </>
          )}
        </button>

        {/* Login navigation */}
        <div className="login-divider">
          <span>ALREADY HAVE AN ACCOUNT?</span>
        </div>

        <button
          type="button"
          className="login-register-button"
          onClick={onLogin}
        >
          Sign in to Interview IQ
          <ArrowRight size={16} />
        </button>

        <p className="login-footer">
          Learn <span>·</span> Practice <span>·</span> Improve
        </p>
      </form>
    </div>
  );
}
