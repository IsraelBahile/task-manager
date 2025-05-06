import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, Bars3Icon, CalendarIcon, ListBulletIcon } from '@heroicons/react/24/outline';

export default function Navbar({ toggleSidebar, setCurrentView, currentView }) {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    const event = new Event('classChange');
    document.documentElement.dispatchEvent(event);
  };

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  return (
    <nav className="navbar text-white p-4 mb-6">
      <div className="container flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="tooltip"
          data-tooltip="Menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentView('tasks')}
            className={`tooltip flex items-center space-x-1 ${currentView === 'tasks' ? 'bg-blue-700' : 'hover:bg-blue-700'} p-2 rounded-md`}
            data-tooltip="Tasks"
          >
            <ListBulletIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Tasks</span>
          </button>
          <button
            onClick={() => setCurrentView('calendar')}
            className={`tooltip flex items-center space-x-1 ${currentView === 'calendar' ? 'bg-blue-700' : 'hover:bg-blue-700'} p-2 rounded-md`}
            data-tooltip="Calendar"
          >
            <CalendarIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Calendar</span>
          </button>
          <button
            onClick={toggleDarkMode}
            className="tooltip"
            data-tooltip={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
}