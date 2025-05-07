// src/services/authService.js

// Simulate a network delay
const delay = ms => new Promise(res => setTimeout(res, ms));

export async function login({ email, password }) {
  await delay(500); // half-second “network” lag

  // Very naive check—accept any nonempty credentials
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  // Return a fake user object
  return {
    id: 'user-123',
    name: 'Demo User',
    email,
  };
}

export function logout() {
  // no-op for now (we’re not persisting tokens)
}
