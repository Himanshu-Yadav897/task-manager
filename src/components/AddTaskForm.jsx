import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';

export default function AddTaskForm() {
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !dueDate) {
      alert('Title and Due Date are required');
      return;
    }

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      assigneeId: 'user-123', // hardcoded for now
    };

    await addTask(newTask);

    // clear form
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('low');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded mb-6">
      <h2 className="text-xl font-bold">Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 border rounded"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="w-full p-2 border rounded"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <select
        className="w-full p-2 border rounded"
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Add Task
      </button>
    </form>
  );
}
