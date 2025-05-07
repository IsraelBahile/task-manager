import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../LanguageContext.jsx';

export default function TaskForm({ addTask, editTask, taskToEdit }) {
  const { t } = useLanguage();
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
      toast.error(t('titleRequired'), { autoClose: 1000 });
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
    } else {
      addTask(task);
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
          {t('taskTitle')}
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-3 w-full border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          placeholder={t('enterTaskTitle')}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('category')}
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 p-3 w-full border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        >
          <option value="Personal">{t('personal')}</option>
          <option value="Work">{t('work')}</option>
          <option value="Other">{t('other')}</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="dueDateTime"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('dueDateTime')}
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
          {t('alarmAudio')}
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
          data-tooltip={isEditing ? t('updateTask') : t('addTask')}
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
            {t('cancel')}
          </button>
        )}
      </div>
    </form>
  );
}