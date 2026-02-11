const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:3000/api";

export interface StoredUser {
  id: number;
  fname: string;
  lname: string;
  email: string;
  role: string;
  photo?: string | null;
}

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

export interface AdminDashboardData {
  message: string;
  role: string;
  stats: { totalUsers: number; adminCount: number; userCount: number };
  recentUsers: { id: number; first_name: string; last_name: string; email: string; role: string; created_at: string }[];
}

export async function fetchAdminDashboard(): Promise<AdminDashboardData> {
  const res = await fetch(`${API_BASE}/admin/dashboard`, {
    credentials: 'include' // Send HttpOnly cookies with request
  });

  // Check status before parsing
  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await res.json();
      throw new Error((data as { error?: string })?.error || "Failed to load dashboard.");
    }
    if (res.status === 401) throw new Error("Unauthorized. Please log in.");
    if (res.status === 403) throw new Error("Access denied. Admin only.");
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data = await res.json();
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
  const res = await fetch(`${API_BASE}/admin/users`, {
    credentials: 'include' // Send HttpOnly cookies with request
  });

  // Check status before parsing
  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await res.json();
      throw new Error((data as { error?: string })?.error || "Failed to load users.");
    }
    if (res.status === 401) throw new Error("Unauthorized. Please log in.");
    if (res.status === 403) throw new Error("Access denied. Admin only.");
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
