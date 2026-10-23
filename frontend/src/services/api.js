
const API_URL = "http://127.0.0.1:5000/api";

export function getUserId() {
  return localStorage.getItem("interview_iq_user_id");
}

export function setUserId(id) {
  localStorage.setItem("interview_iq_user_id", String(id));
}

export function clearUserId() {
  localStorage.removeItem("interview_iq_user_id");
}

export async function api(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(getUserId() ? { "X-User-ID": getUserId() } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }

  return data;
}
