const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface LoginResponse {
  id: number;
  fname: string;
  lname: string;
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
