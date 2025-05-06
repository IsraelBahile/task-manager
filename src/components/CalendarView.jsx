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
    .filter((task) => task.dueDateTime)
    .map((task) => ({
      title: task.title,
      date: task.dueDateTime.split('T')[0],
      extendedProps: { category: task.category, completed: task.completed, time: task.dueDateTime.split('T')[1] },
    }));

  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    const dateTasks = tasks.filter(
      (task) => task.dueDateTime && task.dueDateTime.startsWith(clickedDate)
    );
    setSelectedDateTasks(dateTasks);
    if (dateTasks.length > 0) {
      toast.info(`Tasks for ${clickedDate}: ${dateTasks.length}`, { autoClose: 1000 });
    } else {
      toast.info(`No tasks for ${clickedDate}`, { autoClose: 1000 });
    }
  };

  return (
    <div className="p-6 container">
      <div className="card">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Task Calendar
        </h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventColor={isDarkMode ? '#60a5fa' : '#3b82f6'}
          eventTextColor={isDarkMode ? '#1a202c' : '#ffffff'}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek',
          }}
          className="dark:bg-gray-700 dark:text-gray-200 rounded-md"
          validRange={{
            start: new Date().toISOString().split('T')[0],
          }}
          eventContent={(eventInfo) => (
            <div>
              <b>{eventInfo.event.extendedProps.time?.slice(0, 5)}</b> {eventInfo.event.title}
            </div>
          )}
        />
        {selectedDateTasks.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Tasks for {selectedDateTasks[0].dueDateTime.split('T')[0]}
            </h3>
            <ul className="space-y-3 mt-3">
              {selectedDateTasks.map((task) => (
                <li
                  key={task.id}
                  className={
                    task.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-800 dark:text-gray-200'
                  }
                >
                  {task.title} ({task.category}) at {new Date(task.dueDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}