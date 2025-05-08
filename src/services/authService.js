// src/services/authService.js
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',        // send/receive httpOnly cookie
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
}

export function logout() {
  // simply clear client state; cookie will expire automatically
  localStorage.removeItem('user');
}
