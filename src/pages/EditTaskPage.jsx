import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../contexts/TaskContext';

export default function EditTaskPage() {
  const { id } = useParams();
  const { tasks, updateTask } = useTasks();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low'
  });

  // Populate form when tasks load
  useEffect(() => {
    const task = tasks.find(t => t._id === id);
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority
      });
    }
  }, [id, tasks]);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await updateTask(id, form);
    navigate('/dashboard');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title & Due Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            rows={3}
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Save */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold p-3 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}


