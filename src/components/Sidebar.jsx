import { HomeIcon, PuzzlePieceIcon, InformationCircleIcon, EnvelopeIcon, XMarkIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../LanguageContext.jsx';

export default function Sidebar({ isOpen, toggleSidebar, setCurrentView }) {
  const { t } = useLanguage();

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 sidebar text-gray-800 dark:text-white p-4 flex flex-col justify-between z-50 ${
        isOpen ? '' : 'sidebar-hidden'
      } md:w-72`}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="itm-circle">ITM</div>
          <button onClick={toggleSidebar} className="md:hidden">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="space-y-2">
          <button
            onClick={() => {
              setCurrentView('home');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <HomeIcon className="h-5 w-5" />
            <span>{t('home')}</span>
          </button>
          <button
            onClick={() => {
              setCurrentView('manual');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <BookOpenIcon className="h-5 w-5" />
            <span>{t('manual')}</span>
          </button>
          <button
            onClick={() => {
              setCurrentView('other-apps');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 w-full text-left p-2 hover:bg-grey-100 dark:hover:bg-gray-700 rounded"
          >
            <PuzzlePieceIcon className="h-5 w-5" />
            <span>{t('otherApps')}</span>
          </button>
          <button
            onClick={() => {
              setCurrentView('about');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <InformationCircleIcon className="h-5 w-5" />
            <span>{t('about')}</span>
          </button>
          <button
            onClick={() => {
              setCurrentView('contact');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <EnvelopeIcon className="h-5 w-5" />
            <span>{t('contact')}</span>
          </button>
        </nav>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        © 2025 Isra Task Manager
      </div>
    </div>
  );
}