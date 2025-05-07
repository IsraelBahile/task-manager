import { useState } from 'react';
import { LanguageProvider } from './LanguageContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import TaskList from './components/TaskList.jsx';
import CalendarView from './components/CalendarView.jsx';
import HomeView from './components/HomeView.jsx';
import Navbar from './components/Navbar.jsx';
import { useLanguage } from './LanguageContext.jsx';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useLanguage();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar toggleSidebar={toggleSidebar} setCurrentView={setCurrentView} currentView={currentView} />
        <div className="flex flex-1">
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            setCurrentView={setCurrentView}
          />
          <div className="flex-1">
            {currentView === 'home' && <HomeView setCurrentView={setCurrentView} />}
            {currentView === 'tasks' && <TaskList />}
            {currentView === 'calendar' && <CalendarView />}
            {currentView === 'other-apps' && (
              <div className="p-6 container">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                  {t('otherApps')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Placeholder for other apps (coming soon).
                </p>
              </div>
            )}
            {currentView === 'about' && (
              <div className="p-6 container">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                  {t('about')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  I am Israel Bahile, a passionate full-stack web developer and a proud graduate of Addis Ababa University. With expertise in both frontend and backend development, I craft innovative and user-friendly solutions that drive success. I invite clients to collaborate with me to achieve outstanding results, leveraging my skills to bring your ideas to life. Let's create something extraordinary together!{' '}
                  <button
                    onClick={() => setCurrentView('contact')}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Contact me here
                  </button>.
                </p>
              </div>
            )}
            {currentView === 'contact' && (
              <div className="p-6 container">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                  {t('contact')}
                </h2>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
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
                    <a href="https://t.me/israelat" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Telegram: @israelat
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/soulcareisra" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Instagram: @soulcareisra
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/israelbahile" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Facebook: @israelbahile
                    </a>
                  </li>
                </ul>
                <p className="mt-6 text-gray-600 dark:text-gray-400">
                  © 2025 Isra Task Manager. All rights reserved.
                </p>
              </div>
            )}
            {currentView === 'manual' && (
              <div className="p-6 container">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                  {t('manual')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Learn how to use Isra Task Manager with these simple steps:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Add a task: Enter a title, select a category, set a due date/time, and optionally upload an alarm audio in the Tasks section.</li>
                  <li>Manage tasks: Edit, delete, or mark tasks as complete using the icons next to each task.</li>
                  <li>Set alarms: Choose a due date/time and audio file to receive notifications and audio alerts when tasks are due.</li>
                  <li>View calendar: Check tasks by date in the Calendar section to stay organized.</li>
                  <li>Filter and search: Use search, category, and sort options to find tasks quickly.</li>
                  <li>Switch languages: Select English, Amharic, or French from the top bar for a personalized experience.</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;