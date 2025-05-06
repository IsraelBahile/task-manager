import { useState, useEffect } from 'react';
import TaskForm from './TaskForm.jsx';
import { toast } from 'react-toastify';

export default function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filterCategory, setFilterCategory] = useState('All');
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
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
    toast.info('Task updated!');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setTaskToEdit(null);
    toast.success('Task deleted!');
  };

  const filteredTasks = filterCategory === 'All'
    ? tasks
    : tasks.filter((task) => task.category === filterCategory);

  return (
    <div>
      <TaskForm addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} />
      <div className="bg-white dark:bg-gray-700 rounded shadow p-4 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Tasks
          </h2>
          <div>
            <label
              htmlFor="filter"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
            >
              Filter:
            </label>
            <select
              id="filter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-1 border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
            >
              <option value="All">All</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
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
                        Due: {task.dueDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setTaskToEdit(task)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
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