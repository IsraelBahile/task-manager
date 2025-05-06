import TaskList from './TaskList.jsx';
import CalendarView from './CalendarView.jsx';
import Navbar from './Navbar.jsx';

export default function HomeView() {
  return (
    <div className="p-4">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Tasks</h2>
          <TaskList />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Calendar</h2>
          <CalendarView />
        </div>
      </div>
    </div>
  );
}