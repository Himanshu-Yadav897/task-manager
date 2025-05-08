import React, { useState, useMemo } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';
import AddTaskForm from '../components/AddTaskForm';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { tasks, status, error, deleteTask } = useTasks();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  const getPriorityBadge = (priority) => {
    const map = {
      high: 'bg-red-500 text-white',
      medium: 'bg-yellow-400 text-white',
      low: 'bg-green-500 text-white',
    };
    return `px-3 py-1 rounded-full text-xs font-bold ${map[priority] || ''}`;
  };

  const isDueSoon = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    return due - now <= 24 * 60 * 60 * 1000 && due >= now;
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const displayedTasks = useMemo(() => {
    let filtered = tasks;
    if (priorityFilter !== 'all') {
      filtered = filtered.filter((t) => t.priority === priorityFilter);
    }
    filtered.sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate)
    );
    return filtered;
  }, [tasks, priorityFilter, sortOrder]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {currentUser.name}
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      <AddTaskForm />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Filter by Priority
          </label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Sort by Due Date
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {status === 'loading' && <p>Loading tasks…</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {displayedTasks.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No tasks to display. Add your first task!
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedTasks.map((task) => (
          <div
            key={task._id}
            className={`bg-white p-5 rounded-xl shadow-md border border-gray-200 transition space-y-3 ${
              isOverdue(task.dueDate)
                ? 'border-l-4 border-red-600 bg-red-50'
                : isDueSoon(task.dueDate)
                ? 'border-l-4 border-yellow-400 bg-yellow-50'
                : 'border-l-4 border-green-500'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
              <span className={getPriorityBadge(task.priority)}>
                {task.priority}
              </span>
            </div>
            {task.description && (
              <p className="text-sm text-gray-700 mb-2">{task.description}</p>
            )}
           

            <p className="text-sm text-gray-600">
              Due: {task.dueDate}
              {isOverdue(task.dueDate) && (
                <span className="ml-2 text-red-600 font-semibold">(Overdue)</span>
              )}
              {!isOverdue(task.dueDate) && isDueSoon(task.dueDate) && (
                <span className="ml-2 text-yellow-600 font-semibold">(Due Soon)</span>
              )}
            </p>

            {task.assigneeId === currentUser.id && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => navigate(`/edit/${task._id}`)}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded-lg transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
