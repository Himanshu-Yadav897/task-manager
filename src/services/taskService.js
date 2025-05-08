// src/services/taskService.js

const API_URL = 'http://localhost:5000/tasks';

// GET all tasks for current user
export async function getAll() {
  const res = await fetch(API_URL, {
    credentials: 'include', // ✅ send JWT cookie
  });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

// POST new task
export async function create(task) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // ✅ send JWT cookie
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

// PUT update task
export async function update(id, updatedTask) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // ✅ send JWT cookie
    body: JSON.stringify(updatedTask),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

// DELETE task
export async function remove(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include', // ✅ send JWT cookie
  });
  if (!res.ok) throw new Error('Failed to delete task');
}
