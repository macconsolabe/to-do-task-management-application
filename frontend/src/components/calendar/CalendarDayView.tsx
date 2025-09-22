import type { TodoTask } from '../../services/types';

interface CalendarDayViewProps {
  date: Date;
  tasks: TodoTask[];
  onTaskClick?: (task: TodoTask) => void;
  onDateChange: (date: Date) => void;
}

export function CalendarDayView({ date, tasks, onTaskClick, onDateChange }: CalendarDayViewProps) {
  const dayTasks = tasks.filter(task => {
    if (task.dueDate) {
      const taskDate = new Date(task.dueDate).toDateString();
      return taskDate === date.toDateString();
    }
    // Fallback to creation date for today's tasks
    const taskCreatedDate = new Date(task.createdAt).toDateString();
    const todayStr = new Date().toDateString();
    return date.toDateString() === todayStr && taskCreatedDate === todayStr;
  });

  const goToPreviousDay = () => {
    const prevDay = new Date(date);
    prevDay.setDate(prevDay.getDate() - 1);
    onDateChange(prevDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    onDateChange(nextDay);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const isToday = date.toDateString() === new Date().toDateString();

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Day Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousDay}
          className="p-2 hover:bg-black hover:bg-opacity-5 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <h3 className="text-2xl font-medium text-gray-800">
            {date.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </h3>
          {!isToday && (
            <button
              onClick={goToToday}
              className="text-sm text-gray-500 hover:text-yellow-600 transition-colors font-light mt-1"
            >
              Go to Today
            </button>
          )}
        </div>

        <button
          onClick={goToNextDay}
          className="p-2 hover:bg-black hover:bg-opacity-5 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Tasks for the Day */}
      <div className="flex-1 overflow-y-auto">
        {dayTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">No tasks scheduled</h4>
            <p className="text-gray-500 font-light">This day is free of scheduled tasks.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              {dayTasks.length} {dayTasks.length === 1 ? 'Task' : 'Tasks'} Scheduled
            </h4>
            {dayTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onTaskClick?.(task)}
                className="p-4 rounded-2xl cursor-pointer hover:shadow-lg transition-all relative overflow-hidden"
                style={{ 
                  background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 4px 15px rgba(0,0,0,0.1)'
                }}
              >
                {/* Reflection overlay */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
                  }}
                ></div>
                <div className="relative z-10 flex items-center gap-3">
                  {/* Status indicator */}
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 0 ? 'bg-yellow-400' :
                    task.status === 1 ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800">{task.title}</h5>
                    {task.description && (
                      <p className="text-sm text-gray-600 font-light mt-1">{task.description}</p>
                    )}
                  </div>
                  {/* Priority indicator */}
                  {task.priority === 2 && (
                    <span className="text-yellow-500">★</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
