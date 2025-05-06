import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export default function TaskForm({ addTask, editTask, taskToEdit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');
  const isEditing = !!taskToEdit;

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setCategory(taskToEdit.category);
      setDueDate(taskToEdit.dueDate || '');
    } else {
      setTitle('');
      setCategory('Personal');
      setDueDate('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Task title is required!');
      return;
    }

    const task = {
      id: isEditing ? taskToEdit.id : uuidv4(),
      title,
      category,
      dueDate: dueDate || undefined,
      completed: isEditing ? taskToEdit.completed : false,
      createdAt: isEditing ? taskToEdit.createdAt : new Date().toISOString(),
    };

    if (isEditing) {
      editTask(task);
      toast.success('Task updated successfully!');
    } else {
      addTask(task);
      toast.success('Task added successfully!');
    }

    setTitle('');
    setCategory('Personal');
    setDueDate('');
  };

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
          className="mt-1 p-2 w-full border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
      {isEditing && (
        <button
          type="button"
          onClick={() => {
            setTitle('');
            setCategory('Personal');
            setDueDate('');
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