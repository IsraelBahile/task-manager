import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import TaskList from './components/TaskList.jsx';
import CalendarView from './components/CalendarView.jsx';

function App() {
  const [currentView, setCurrentView] = useState('tasks');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar setCurrentView={setCurrentView} />
      <div className="container mx-auto p-4">
        {currentView === 'tasks' && <TaskList />}
        {currentView === 'calendar' && <CalendarView />}
      </div>
    </div>
  );
}

export default App;