import { useLanguage } from '../LanguageContext.jsx';

export default function HomeView({ setCurrentView }) {
  const { t } = useLanguage();

  return (
    <div className="p-6 container min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        <div
          className="home-box animate-fade-in"
          onClick={() => setCurrentView('tasks')}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            {t('tasksBoxTitle')}
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li>{t('tasksFeature1')}</li>
            <li>{t('tasksFeature2')}</li>
            <li>{t('tasksFeature3')}</li>
          </ul>
        </div>
        <div
          className="home-box animate-fade-in"
          onClick={() => setCurrentView('calendar')}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            {t('calendarBoxTitle')}
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li>{t('calendarFeature1')}</li>
            <li>{t('calendarFeature2')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}