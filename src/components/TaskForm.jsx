import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function TaskForm({ addTask, editTask, taskToEdit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [alarmAudio, setAlarmAudio] = useState(null);
  const isEditing = !!taskToEdit;

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setCategory(taskToEdit.category);
      setDueDate(taskToEdit.dueDate || '');
      setDueTime(taskToEdit.dueTime || '');
      setAlarmAudio(taskToEdit.alarmAudio || null);
    } else {
      setTitle('');
      setCategory('Personal');
      setDueDate('');
      setDueTime('');
      setAlarmAudio(null);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Task title is required!', { autoClose: 2000 });
      return;
    }

    const task = {
      id: isEditing ? taskToEdit.id : uuidv4(),
      title,
      category,
      dueDate: dueDate || undefined,
      dueTime: dueTime || undefined,
      alarmAudio,
      completed: isEditing ? taskToEdit.completed : false,
      createdAt: isEditing ? taskToEdit.createdAt : new Date().toISOString(),
    };

    if (isEditing) {
      editTask(task);
      toast.success('Task updated successfully!', { autoClose: 2000 });
    } else {
      addTask(task);
      toast.success('Task added successfully!', { autoClose: 2000 });
    }

    setTitle('');
    setCategory('Personal');
    setDueDate('');
    setDueTime('');
    setAlarmAudio(null);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 bg-white dark:bg-gray-700 rounded shadow animate-fade-in"
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
          className="mt-1 p-2 w-full border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
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
          className="mt-1 p-2 w-full border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Due Date (Optional)
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={today}
          className="mt-1 p-2 w-full border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="dueTime"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Due Time (Optional)
        </label>
        <input
          type="time"
          id="dueTime"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          className="mt-1 p-2 w-full border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
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
          className="mt-1 p-2 w-full border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
        />
      </div>
      <button
        type="submit"
        className="tooltip flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
        data-tooltip={isEditing ? 'Update Task' : 'Add Task'}
      >
        <PlusIcon className="h-5 w-5" />
        <span>{isEditing ? 'Update Task' : 'Add Task'}</span>
      </button>
      {isEditing && (
        <button
          type="button"
          onClick={() => {
            setTitle('');
            setCategory('Personal');
            setDueDate('');
            setDueTime('');
            setAlarmAudio(null);
            editTask(null);
          }}
          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200"
        >
          Cancel
        </button>
      )}
    </form>
  );
}