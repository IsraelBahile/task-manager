import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
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
    <nav className="bg-blue-600 text-white p-4 mb-4">
      <div className="container mx-auto flex justify-end">
        <button
          onClick={toggleDarkMode}
          className="tooltip flex items-center space-x-1 hover:underline"
          data-tooltip={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          <span className="hidden md:inline">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </nav>
  );
}