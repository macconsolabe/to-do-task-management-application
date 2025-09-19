import type { TodoTask } from '../../services/api';

interface CalendarWeekViewProps {
  date: Date;
  tasks: TodoTask[];
  onTaskClick?: (task: TodoTask) => void;
  onDateChange: (date: Date) => void;
  onDayClick?: (date: Date) => void;
}

export function CalendarWeekView({ date, tasks, onTaskClick, onDateChange, onDayClick }: CalendarWeekViewProps) {
  // Get the start of the week (Sunday)
  const getWeekStart = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return start;
  };

  const weekStart = getWeekStart(date);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    return day;
  });

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

  const goToPreviousWeek = () => {
    const prevWeek = new Date(date);
    prevWeek.setDate(prevWeek.getDate() - 7);
    onDateChange(prevWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(date);
    nextWeek.setDate(nextWeek.getDate() + 7);
    onDateChange(nextWeek);
  };

  const isToday = (checkDate: Date) => {
    return checkDate.toDateString() === new Date().toDateString();
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Week Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousWeek}
          className="p-2 hover:bg-black hover:bg-opacity-5 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-800">
            {weekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {' '}
            {weekDays[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
        </div>

        <button
          onClick={goToNextWeek}
          className="p-2 hover:bg-black hover:bg-opacity-5 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Week Grid */}
      <div className="flex-1 grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const dayTasks = getTasksForDate(day);
          const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          
          return (
            <div
              key={day.toISOString()}
              className={`p-3 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md relative overflow-hidden ${
                isToday(day) ? 'border-yellow-400' : 'border-gray-200'
              }`}
              style={{ 
                background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
                borderColor: isToday(day) ? '#F4C430' : '#e5e7eb'
              }}
              onClick={() => onDayClick ? onDayClick(day) : onDateChange(day)}
            >
              {/* Reflection overlay */}
              <div 
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)'
                }}
              ></div>
              <div className="relative z-10">
                <div className="text-center mb-2">
                  <div className="text-xs text-gray-500 font-medium">{dayNames[index]}</div>
                  <div className={`text-lg font-medium ${isToday(day) ? 'text-yellow-600' : 'text-gray-800'}`}>
                    {day.getDate()}
                  </div>
                </div>
                
                {/* Task indicators */}
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTaskClick?.(task);
                      }}
                      className="text-xs p-1 rounded truncate hover:bg-black hover:bg-opacity-5 transition-colors"
                      style={{ 
                        backgroundColor: task.status === 0 ? '#fef3c7' : task.status === 1 ? '#dbeafe' : '#d1fae5',
                        color: task.status === 0 ? '#92400e' : task.status === 1 ? '#1e40af' : '#065f46'
                      }}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayTasks.length - 3} more
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
