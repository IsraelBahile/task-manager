import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import TaskList from './components/TaskList.jsx';
import CalendarView from './components/CalendarView.jsx';
import HomeView from './components/HomeView.jsx';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar setCurrentView={setCurrentView} />
      <div className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'tasks' && <TaskList />}
        {currentView === 'calendar' && <CalendarView />}
        {currentView === 'other-apps' && (
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Other Apps to Try
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Placeholder for other apps (coming soon).
            </p>
          </div>
        )}
        {currentView === 'about' && (
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              About
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Hi, I'm Israel Bahile, a passionate developer building tools like Isra Task Manager to make life easier. Connect with me below!
            </p>
          </div>
        )}
        {currentView === 'contact' && (
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Contact
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <a href="tel:+251994779694" className="hover:underline">
                  Phone: +251994779694
                </a>
              </li>
              <li>
                <a href="mailto:bahileisrael@gmail.com" className="hover:underline">
                  Email: bahileisrael@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/bahileisrael" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Instagram: @bahileisrael
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/israelbahile" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Facebook: @israelbahile
                </a>
              </li>
            </ul>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              &copy; 2025 Isra Task Manager. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;