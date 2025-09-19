import { useState, useEffect } from 'react';
import type { TodoTask } from '../../services/api';
import { CalendarDayView } from './CalendarDayView';
import { CalendarWeekView } from './CalendarWeekView';
import { CalendarMonthView } from './CalendarMonthView';

type CalendarView = 'day' | 'week' | 'month';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: TodoTask[];
  initialDate?: Date;
  onTaskClick?: (task: TodoTask) => void;
}

export function CalendarModal({ isOpen, onClose, tasks, initialDate = new Date(), onTaskClick }: CalendarModalProps) {
  const [currentView, setCurrentView] = useState<CalendarView>('day');
  const [currentDate, setCurrentDate] = useState(initialDate);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Update current date when initialDate changes
  useEffect(() => {
    if (initialDate) {
      setCurrentDate(initialDate);
    }
  }, [initialDate]);

  if (!isOpen) return null;

  const viewButtons = [
    { key: 'day' as const, label: 'Day', shortcut: 'D' },
    { key: 'week' as const, label: 'Week', shortcut: 'W' },
    { key: 'month' as const, label: 'Month', shortcut: 'M' }
  ];

  // Handle day click from week/month view - switch to day view
  const handleDayClick = (date: Date) => {
    setCurrentDate(date);
    setCurrentView('day');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'day':
        return <CalendarDayView date={currentDate} tasks={tasks} onTaskClick={onTaskClick} onDateChange={setCurrentDate} />;
      case 'week':
        return <CalendarWeekView date={currentDate} tasks={tasks} onTaskClick={onTaskClick} onDateChange={setCurrentDate} onDayClick={handleDayClick} />;
      case 'month':
        return <CalendarMonthView date={currentDate} tasks={tasks} onTaskClick={onTaskClick} onDateChange={setCurrentDate} onDayClick={handleDayClick} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="rounded-3xl shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden relative"
        style={{ 
          background: 'linear-gradient(145deg, #e8eaed 0%, #d1d5db 30%, #f1f3f4 70%, #e8eaed 100%)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.2)'
        }}
      >
        {/* Metallic reflection overlay */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.3) 100%)'
          }}
        ></div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: '#F4C430' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-medium text-gray-900">Calendar</h2>
                <p className="text-sm text-gray-500">Task Schedule View</p>
              </div>
            </div>

            {/* View Switcher */}
            <div 
              className="flex rounded-xl overflow-hidden ml-8"
              style={{ 
                background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1)'
              }}
            >
              {viewButtons.map((button) => (
                <button
                  key={button.key}
                  onClick={() => setCurrentView(button.key)}
                  className={`px-4 py-2 text-sm font-medium transition-all relative ${
                    currentView === button.key
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  style={{
                    background: currentView === button.key 
                      ? 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)'
                      : 'transparent'
                  }}
                >
                  {currentView === button.key && (
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.1) 100%)'
                      }}
                    ></div>
                  )}
                  <span className="relative z-10">{button.label}</span>
                  <span className="relative z-10 ml-2 text-xs opacity-70">{button.shortcut}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors text-lg"
          >
            ×
          </button>
        </div>

        {/* Calendar Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <div 
            className="h-full relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(145deg, rgba(248,249,250,0.98) 0%, rgba(233,236,239,0.95) 50%, rgba(248,249,250,0.98) 100%)',
              backdropFilter: 'blur(5px)'
            }}
          >
            {/* Inner content reflection */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.2) 100%)'
              }}
            ></div>
            <div className="relative z-10 h-full">
              {renderCurrentView()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
