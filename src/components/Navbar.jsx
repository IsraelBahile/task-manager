import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, Bars3Icon, CalendarIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../LanguageContext.jsx';

export default function Navbar({ toggleSidebar, setCurrentView, currentView }) {
  const { language, setLanguage, t } = useLanguage();
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
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="tooltip"
            data-tooltip="Menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <span className="text-xl font-bold">{t('appName')}</span>
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => setCurrentView('tasks')}
            className={`tasks-rect ${currentView === 'tasks' ? 'bg-blue-700' : ''}`}
          >
            {t('tasks')}
          </button>
          <button
            onClick={() => setCurrentView('calendar')}
            className={`tooltip flex items-center space-x-1 ${currentView === 'calendar' ? 'bg-blue-700' : 'hover:bg-blue-700'} p-2 rounded-md`}
            data-tooltip={t('calendar')}
          >
            <CalendarIcon className="h-5 w-5" />
            <span className="hidden sm:inline">{t('calendar')}</span>
          </button>
          <button
            onClick={toggleDarkMode}
            className="tooltip"
            data-tooltip={darkMode ? t('lightMode') : t('darkMode')}
          >
            {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </button>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 bg-blue-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="am">አማርኛ</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
    </nav>
  );
}