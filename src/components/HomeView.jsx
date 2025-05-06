import TaskList from './TaskList.jsx';
import CalendarView from './CalendarView.jsx';

export default function HomeView() {
  return (
    <div className="p-6 container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Tasks</h2>
          <TaskList />
        </div>
        <div className="card">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Calendar</h2>
          <CalendarView />
        </div>
      </div>
    </div>
  );
}