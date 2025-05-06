import { useState } from 'react';

export default function Navbar({ setCurrentView }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentView('tasks')}
            className="hover:underline"
          >
            Tasks
          </button>
          <button
            onClick={() => setCurrentView('calendar')}
            className="hover:underline"
          >
            Calendar
          </button>
          <button onClick={toggleDarkMode} className="hover:underline">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
}