import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { toast } from 'react-toastify';

export default function CalendarView() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [selectedDateTasks, setSelectedDateTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const handleDarkModeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    window.addEventListener('storage', handleDarkModeChange);
    document.documentElement.addEventListener('classChange', handleDarkModeChange);
    return () => {
      window.removeEventListener('storage', handleDarkModeChange);
      document.documentElement.removeEventListener('classChange', handleDarkModeChange);
    };
  }, []);

  const events = tasks
    .filter((task) => task.dueDate)
    .map((task) => ({
      title: `${task.title}${task.dueTime ? ` at ${task.dueTime}` : ''}`,
      date: task.dueDate,
      extendedProps: { category: task.category, completed: task.completed },
    }));

  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    const dateTasks = tasks.filter(
      (task) => task.dueDate === clickedDate
    );
    setSelectedDateTasks(dateTasks);
    if (dateTasks.length > 0) {
      toast.info(`Tasks for ${clickedDate}: ${dateTasks.length}`, { autoClose: 2000 });
    } else {
      toast.info(`No tasks for ${clickedDate}`, { autoClose: 2000 });
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-700 rounded shadow animate-fade-in">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Task Calendar
      </h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventColor={isDarkMode ? '#60a5fa' : '#2563eb'}
        eventTextColor={isDarkMode ? '#1f2937' : '#ffffff'}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
        className="dark:bg-gray-800 dark:text-gray-200"
        validRange={{
          start: new Date().toISOString().split('T')[0],
        }}
      />
      {selectedDateTasks.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Tasks for {selectedDateTasks[0].dueDate}
          </h3>
          <ul className="space-y-2 mt-2">
            {selectedDateTasks.map((task) => (
              <li
                key={task.id}
                className={
                  task.completed
                    ? 'line-through text-gray-500 dark:text-gray-400'
                    : 'text-gray-800 dark:text-gray-200'
                }
              >
                {task.title} ({task.category}) {task.dueTime && `at ${task.dueTime}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}