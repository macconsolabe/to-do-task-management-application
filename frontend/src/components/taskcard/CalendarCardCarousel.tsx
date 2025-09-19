import type { TodoTask } from '../../services/api';
import { CalendarCard } from './CalendarCard';
import { useCarousel } from '../../hooks/useCarousel';

interface CalendarCardCarouselProps {
  tasks: TodoTask[];
  selectedDateString: string;
  selectedDate?: Date;
  onTaskClick?: (task: TodoTask) => void;
  onCalendarClick?: (date?: Date) => void;
}

export function CalendarCardCarousel({ tasks, selectedDateString, selectedDate, onTaskClick, onCalendarClick }: CalendarCardCarouselProps) {
  const { currentIndex, goToNext, goToPrevious, canGoNext, canGoPrevious, hasMultipleItems } = useCarousel(tasks.length);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div 
          className="p-8 rounded-3xl shadow-lg relative overflow-hidden mx-auto max-w-md"
          style={{ 
            background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 8px 25px rgba(0,0,0,0.1)'
          }}
        >
          {/* Metallic reflection overlay */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
            }}
          ></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks for {selectedDateString}</h3>
            <p className="text-gray-500 font-light">Create a new task or select a different date.</p>
          </div>
        </div>
      </div>
    );
  }

  const currentTask = tasks[currentIndex];

  return (
    <div className="relative">
      {/* Date Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h3 className="text-xl font-medium text-gray-800">{selectedDateString}</h3>
          <button
            onClick={() => onCalendarClick?.(selectedDate)}
            className="p-2 hover:bg-black hover:bg-opacity-5 rounded-lg transition-colors"
            title="Open Calendar View"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 font-light">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} scheduled
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-md mx-auto">
        {/* Navigation Arrows */}
        {hasMultipleItems && (
          <>
            <button
              onClick={goToPrevious}
              disabled={!canGoPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white bg-opacity-90 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ marginLeft: '-3rem' }}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              disabled={!canGoNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white bg-opacity-90 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ marginRight: '-3rem' }}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Calendar Card */}
        <div 
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => onTaskClick?.(currentTask)}
        >
          <CalendarCard 
            task={currentTask} 
            taskIndex={currentIndex}
            totalTasks={tasks.length}
          />
        </div>

        {/* Dot Indicators */}
        {hasMultipleItems && (
          <div className="flex justify-center mt-4 gap-2">
            {tasks.map((_, index) => (
              <button
                key={index}
                onClick={() => {/* We'll implement goToIndex later if needed */}}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-yellow-400 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                style={{ backgroundColor: index === currentIndex ? '#F4C430' : undefined }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
