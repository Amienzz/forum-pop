const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/** Stored user shape after login (saved in localStorage). */
export interface StoredUser {
  id: number;
  fname: string;
  lname: string;
  email: string;
  role: string;
  photo: string | null;
}

/** Safe read of stored user; returns null if missing or invalid. */
export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const user = JSON.parse(raw) as StoredUser;
    return user?.role != null ? user : null;
  } catch {
    return null;
  }
}

/** Admin API request options: adds x-user-role for backend. */
function adminHeaders(): Record<string, string> {
  const user = getStoredUser();
  const role = user?.role ?? "user";
  return { "x-user-role": role };
}

export interface AdminDashboardData {
  message: string;
  role: string;
  stats: { totalUsers: number; adminCount: number; userCount: number };
  recentUsers: { id: number; first_name: string; last_name: string; email: string; role: string; created_at: string }[];
}

export async function fetchAdminDashboard(): Promise<AdminDashboardData> {
  const res = await fetch(`${API_BASE}/admin/dashboard`, { headers: adminHeaders() });
  const data = await res.json();
  if (res.status === 403) throw new Error("Access denied.");
  if (!res.ok) throw new Error((data as ApiError).error || "Failed to load dashboard.");
  return data as AdminDashboardData;
}

export interface AdminUserRow {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  profile_photo_path: string | null;
  created_at: string;
}

export async function fetchAdminUsers(): Promise<AdminUserRow[]> {
  const res = await fetch(`${API_BASE}/admin/users`, { headers: adminHeaders() });
  const data = await res.json();
  if (res.status === 403) throw new Error("Access denied.");
  if (!res.ok) throw new Error((data as ApiError).error || "Failed to load users.");
  return Array.isArray(data) ? data : [];
}

export interface LoginResponse {
  id: number;
  fname: string;
  lname: string;
  email: string;
  role: string;
  photo: string | null;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  error: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error((data as ApiError).error || "Login failed");
  return data as LoginResponse;
}

export async function registerUser(formData: FormData): Promise<RegisterResponse> {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error((data as ApiError).error || "Registration failed");
  return data as RegisterResponse;
}
