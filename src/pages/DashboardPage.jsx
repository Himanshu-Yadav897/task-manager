import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';
import AddTaskForm from '../components/AddTaskForm';

export default function DashboardPage() {
  const { tasks, status, error } = useTasks();
  const { currentUser, logout } = useAuth();

  return (

    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Welcome, {currentUser.name}</h1>
        <button onClick={logout} className="py-1 px-3 border rounded">
          Logout
        </button>
      </div>

      <AddTaskForm />

      {status === 'loading' && <p>Loading tasks…</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="p-4 border rounded">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.dueDate}</p>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(task)}
                className="px-3 py-1 bg-yellow-400 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}
