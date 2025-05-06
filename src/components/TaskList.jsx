import { useState, useEffect } from 'react';
import TaskForm from './TaskForm.jsx';
import { toast } from 'react-toastify';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterSort, setFilterSort] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    tasks.forEach((task) => {
      if (task.dueDate && task.dueTime && task.alarmAudio) {
        const dueDateTime = new Date(`${task.dueDate}T${task.dueTime}`).getTime();
        const now = new Date().getTime();
        if (dueDateTime <= now && !task.completed) {
          const audio = new Audio(task.alarmAudio);
          audio.play();
          if (Notification.permission === 'granted') {
            new Notification(`Task Due: ${task.title}`);
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
              if (permission === 'granted') {
                new Notification(`Task Due: ${task.title}`);
              }
            });
          }
          toast.info(
            <div>
              Task Due: {task.title}
              <button
                onClick={() => audio.pause()}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Stop Alarm
              </button>
            </div>,
            { autoClose: 2000 }
          );
        }
      }
    });
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const editTask = (updatedTask) => {
    if (updatedTask === null) {
      setTaskToEdit(null);
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setTaskToEdit(null);
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    toast.info('Task updated!', { autoClose: 2000 });
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Want to delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== taskId));
      setTaskToEdit(null);
      toast.success('Task deleted!', { autoClose: 2000 });
    }
  };

  const clearAllTasks = () => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      setTasks([]);
      setTaskToEdit(null);
      toast.success('All tasks cleared!', { autoClose: 2000 });
    }
  };

  let filteredTasks = filterCategory === 'All'
    ? tasks
    : tasks.filter((task) => task.category === filterCategory);

  filteredTasks = searchQuery
    ? filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredTasks;

  if (filterSort === 'alphabet') {
    filteredTasks = [...filteredTasks].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (filterSort === 'time') {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      const aTime = a.dueDate ? new Date(`${a.dueDate}T${a.dueTime || '00:00'}`).getTime() : Infinity;
      const bTime = b.dueDate ? new Date(`${b.dueDate}T${b.dueTime || '00:00'}`).getTime() : Infinity;
      return aTime - bTime;
    });
  }

  return (
    <div>
      <TaskForm addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} />
      <div className="bg-white dark:bg-gray-700 rounded shadow p-4 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Tasks
          </h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-1 border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-1 border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
            >
              <option value="All">All Categories</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={filterSort}
              onChange={(e) => setFilterSort(e.target.value)}
              className="p-1 border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
            >
              <option value="default">Default Sort</option>
              <option value="alphabet">Alphabetical</option>
              <option value="time">By Due Time</option>
            </select>
            <button
              onClick={clearAllTasks}
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Clear All
            </button>
          </div>
        </div>
        {filteredTasks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No tasks found.</p>
        ) : (
          <ul className="space-y-2">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-2 border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <div>
                    <span
                      className={
                        task.completed
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : 'text-gray-800 dark:text-gray-200'
                      }
                    >
                      {task.title} ({task.category})
                    </span>
                    {task.dueDate && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Due: {task.dueDate} {task.dueTime}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setTaskToEdit(task)}
                    className="tooltip text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    data-tooltip="Edit Task"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="tooltip text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    data-tooltip="Delete Task"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}