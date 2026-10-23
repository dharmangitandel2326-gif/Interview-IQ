
import { useEffect, useState } from "react";
import { api } from "../services/api.js";

export default function CandidateProfile({ user, onUserUpdate }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    education: user?.education || "",
    experience: user?.experience || "",
    target_role: user?.target_role || "",
    skills: user?.skills || "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setForm({
      name: user?.name || "",
      phone: user?.phone || "",
      education: user?.education || "",
      experience: user?.experience || "",
      target_role: user?.target_role || "",
      skills: user?.skills || "",
    });
  }, [user]);

  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function save(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");

    try {
      const data = await api("/profile", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      onUserUpdate(data.user);
      setMessage("Profile saved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <h1 className="page-heading">Candidate Profile</h1>
      <p className="page-subtitle">
        Manage your personal details, skills, and career goals.
      </p>

      <form className="form-card" onSubmit={save}>
        <h2>Personal information</h2>
        <p className="page-subtitle">
          Your profile helps you organize your interview preparation.
        </p>

        <div className="form-grid">
          <div className="field">
            <label>Full name</label>
            <input name="name" required value={form.name} onChange={change} />
          </div>

          <div className="field">
            <label>Email address</label>
            <input value={user?.email || ""} disabled />
          </div>

          <div className="field">
            <label>Phone number</label>
            <input name="phone" value={form.phone} onChange={change} />
          </div>

          <div className="field">
            <label>Education</label>
            <input
              name="education"
              placeholder="e.g. B.Tech Computer Science"
              value={form.education}
              onChange={change}
            />
          </div>

          <div className="field">
            <label>Experience level</label>
            <select
              name="experience"
              value={form.experience}
              onChange={change}
            >
              <option value="">Select experience</option>
              <option>Student</option>
              <option>Fresher</option>
              <option>0–2 years</option>
              <option>3–5 years</option>
              <option>6+ years</option>
            </select>
          </div>

          <div className="field">
            <label>Target job role</label>
            <input
              name="target_role"
              placeholder="e.g. Full Stack Developer"
              value={form.target_role}
              onChange={change}
            />
          </div>
        </div>

        <div className="field">
          <label>Skills and technologies</label>
          <textarea
            name="skills"
            placeholder="JavaScript, React, Python, SQL..."
            value={form.skills}
            onChange={change}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button className="primary-button" disabled={busy}>
          {busy ? "Saving…" : "Save profile"}
        </button>
      </form>
    </section>
  );
}
