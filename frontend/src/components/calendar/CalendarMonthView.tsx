import type { TodoTask } from '../../services/api';
import { getWeekStartDay } from '../../utils/dateUtils';
import { useSettings } from '../../contexts/SettingsContext';

interface CalendarMonthViewProps {
  date: Date;
  tasks: TodoTask[];
  onTaskClick?: (task: TodoTask) => void;
  onDateChange: (date: Date) => void;
  onDayClick?: (date: Date) => void;
}

export function CalendarMonthView({ date, tasks, onTaskClick, onDateChange, onDayClick }: CalendarMonthViewProps) {
  const { settings } = useSettings();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  // Get first day of month and calculate calendar grid
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startDate = new Date(firstDayOfMonth);
  const weekStartDay = getWeekStartDay(settings.calendar);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysToSubtract = (firstDayOfWeek - weekStartDay + 7) % 7;
  startDate.setDate(startDate.getDate() - daysToSubtract);

  const calendarDays = [];
  const currentDate = new Date(startDate);
  
  // Generate 42 days (6 weeks) for complete calendar grid
  for (let i = 0; i < 42; i++) {
    calendarDays.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const getTasksForDate = (targetDate: Date) => {
    const targetDateStr = targetDate.toDateString();
    return tasks.filter(task => {
      if (task.dueDate) {
        return new Date(task.dueDate).toDateString() === targetDateStr;
      }
      // Fallback to creation date for today's tasks
      const taskCreatedDate = new Date(task.createdAt).toDateString();
      const todayStr = new Date().toDateString();
      return targetDateStr === todayStr && taskCreatedDate === todayStr;
    });
  };

  const goToPreviousMonth = () => {
    const prevMonth = new Date(date);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    onDateChange(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    onDateChange(nextMonth);
  };

  const isToday = (checkDate: Date) => {
    return checkDate.toDateString() === new Date().toDateString();
  };

  const isCurrentMonth = (checkDate: Date) => {
    return checkDate.getMonth() === currentMonth;
  };

  const dayNames = settings.calendar.weekStartDay === 'monday' 
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Month Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-black hover:bg-opacity-5 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="text-2xl font-medium text-gray-800">
          {date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
          })}
        </h3>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-black hover:bg-opacity-5 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Names Header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((dayName) => (
          <div key={dayName} className="text-center text-sm font-medium text-gray-500 py-2">
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 gap-2">
        {calendarDays.map((day) => {
          const dayTasks = getTasksForDate(day);
          const isCurrentMonthDay = isCurrentMonth(day);
          const isTodayDay = isToday(day);
          
          return (
            <div
              key={day.toISOString()}
              onClick={() => onDayClick ? onDayClick(day) : onDateChange(day)}
              className={`p-2 rounded-lg border transition-all cursor-pointer hover:shadow-md relative overflow-hidden min-h-[80px] ${
                isTodayDay ? 'border-yellow-400 border-2' : 'border-gray-200'
              } ${
                !isCurrentMonthDay ? 'opacity-40' : ''
              }`}
              style={{ 
                background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
                borderColor: isTodayDay ? '#F4C430' : '#e5e7eb'
              }}
            >
              {/* Reflection overlay */}
              <div 
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)'
                }}
              ></div>
              <div className="relative z-10">
                <div className={`text-sm font-medium mb-1 ${
                  isTodayDay ? 'text-yellow-600' : isCurrentMonthDay ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {day.getDate()}
                </div>
                
                {/* Task dots */}
                <div className="space-y-1">
                  {dayTasks.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTaskClick?.(task);
                      }}
                      className="text-xs p-1 rounded truncate hover:bg-black hover:bg-opacity-10 transition-colors"
                      style={{ 
                        backgroundColor: task.status === 0 ? '#fef3c7' : task.status === 1 ? '#dbeafe' : '#d1fae5',
                        color: task.status === 0 ? '#92400e' : task.status === 1 ? '#1e40af' : '#065f46'
                      }}
                    >
                      {task.title.length > 8 ? task.title.substring(0, 8) + '...' : task.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayTasks.length - 2}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
