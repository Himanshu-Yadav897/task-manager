import React, { useState, useEffect } from 'react';
import { useTasks } from '../contexts/TaskContext';

export default function AddTaskForm() {
  const { addTask } = useTasks();

  const [users, setUsers] = useState([]);
  const [assigneeId, setAssigneeId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');

  // load users for assignee dropdown
  useEffect(() => {
    fetch('http://localhost:5000/users', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title || !dueDate) {
      return alert('Title and due date required');
    }
    await addTask({ title, description, dueDate, priority, assigneeId });
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('low');
    setAssigneeId('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title & Due Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Task title"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            rows={3}
            placeholder="Optional details..."
          />
        </div>

        {/* Priority & Assignee */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Assign To</label>
            <select
              value={assigneeId}
              onChange={e => setAssigneeId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="">— Select user —</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold p-3 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
