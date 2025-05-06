import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function TaskForm({ addTask, editTask, taskToEdit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [dueDateTime, setDueDateTime] = useState('');
  const [alarmAudio, setAlarmAudio] = useState(null);
  const isEditing = !!taskToEdit;

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setCategory(taskToEdit.category);
      setDueDateTime(taskToEdit.dueDateTime || '');
      setAlarmAudio(taskToEdit.alarmAudio || null);
    } else {
      setTitle('');
      setCategory('Personal');
      setDueDateTime('');
      setAlarmAudio(null);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Task title is required!', { autoClose: 1000 });
      return;
    }

    const task = {
      id: isEditing ? taskToEdit.id : uuidv4(),
      title,
      category,
      dueDateTime: dueDateTime || undefined,
      alarmAudio,
      completed: isEditing ? taskToEdit.completed : false,
      createdAt: isEditing ? taskToEdit.createdAt : new Date().toISOString(),
    };

    if (isEditing) {
      editTask(task);
      toast.success('Task updated successfully!', { autoClose: 1000 });
    } else {
      addTask(task);
      toast.success('Task added successfully!', { autoClose: 1000 });
    }

    setTitle('');
    setCategory('Personal');
    setDueDateTime('');
    setAlarmAudio(null);
  };

  const today = new Date().toISOString().slice(0, 16);

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-6 card animate-fade-in"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Task Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-3 w-full border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task title"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 p-3 w-full border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="dueDateTime"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Due Date & Time (Optional)
        </label>
        <input
          type="datetime-local"
          id="dueDateTime"
          value={dueDateTime}
          onChange={(e) => setDueDateTime(e.target.value)}
          min={today}
          className="mt-1 p-3 w-full border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="alarmAudio"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Alarm Audio (Optional)
        </label>
        <input
          type="file"
          id="alarmAudio"
          accept="audio/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setAlarmAudio(url);
            }
          }}
          className="mt-1 p-3 w-full border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>
      <div className="flex space-x-3">
        <button
          type="submit"
          className="tooltip bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          data-tooltip={isEditing ? 'Update Task' : 'Add Task'}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setTitle('');
              setCategory('Personal');
              setDueDateTime('');
              setAlarmAudio(null);
              editTask(null);
            }}
            className="bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}