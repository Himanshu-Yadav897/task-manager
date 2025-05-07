// Simulate network latency
const delay = ms => new Promise(res => setTimeout(res, ms));

// In-memory fake task DB
let tasks = [
  {
    id: '1',
    title: 'Finish assignment',
    description: 'Complete the frontend task manager UI',
    dueDate: '2025-05-10',
    priority: 'high',
    status: 'in-progress',
    assigneeId: 'user-123',
  },
  {
    id: '2',
    title: 'Review PRs',
    description: 'Go through pull requests from teammates',
    dueDate: '2025-05-08',
    priority: 'medium',
    status: 'todo',
    assigneeId: 'user-123',
  },
];

// GET all tasks
export async function getAll() {
  await delay(500);
  return [...tasks]; // return a copy
}

// POST a new task
export async function create(taskData) {
  await delay(300);
  const newTask = {
    ...taskData,
    id: String(Date.now()),
    status: 'todo',
  };
  tasks.unshift(newTask);
  return newTask;
}
