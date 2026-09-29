const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

async function request(path, options = {}) {
  const token = localStorage.getItem("pocketsmart_token");
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.detail || "Request failed");
  return data;
}

export const registerUser = (payload) => request("/api/auth/register", { method: "POST", body: JSON.stringify(payload) });
export const loginUser = (payload) => request("/api/auth/login", { method: "POST", body: JSON.stringify(payload) });
export const getMe = () => request("/api/auth/me");
export const savePlanner = (payload) => request("/api/saved-planners", { method: "POST", body: JSON.stringify(payload) });
export const getSavedPlanners = () => request("/api/saved-planners");
export const deleteSavedPlanner = (id) => request(`/api/saved-planners/${id}`, { method: "DELETE" });
export const analyzeBudget = (payload) => request("/api/budget/analyze", { method: "POST", body: JSON.stringify(payload) });
export const savePlan = (plan) => request("/api/plans", { method: "POST", body: JSON.stringify(plan) });
export const getPlans = () => request("/api/plans");
export const deletePlan = (id) => request(`/api/plans/${id}`, { method: "DELETE" });
