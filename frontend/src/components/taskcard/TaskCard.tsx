import type { TodoTask } from '../../services/types';
import { getProgressPercentage, getProgressColor } from '../../utils/taskUtils';
import { formatDate, shouldHighlightOverdue } from '../../utils/dateUtils';
import { useSettings } from '../../contexts/SettingsContext';

interface TaskCardProps {
  task: TodoTask;
  onTaskClick: (task: TodoTask) => void;
  onStatusChange: (id: number, status: number) => void;
  onDelete: (id: number) => void;
}

export function TaskCard({ task, onTaskClick, onStatusChange, onDelete }: TaskCardProps) {
  const { settings } = useSettings();
  const progress = getProgressPercentage(task);
  const progressColor = getProgressColor();
  const isOverdue = shouldHighlightOverdue(task.dueDate, task.status, settings.calendar);

  return (
    <div 
      className="p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer transform relative overflow-hidden" 
      onClick={() => onTaskClick(task)}
      style={{ 
        background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 8px 25px rgba(0,0,0,0.1)'
      }}
    >
      {/* Reflection overlay */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
        }}
      ></div>
      <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-light text-gray-900">{task.title}</h4>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              task.status === 0 ? 'bg-yellow-100 text-yellow-700' :
              task.status === 1 ? 'bg-blue-100 text-blue-700' :
              'bg-green-100 text-green-700'
            }`}>
              {task.status === 0 ? 'To Do' : task.status === 1 ? 'In Progress' : 'Completed'}
            </span>
          </div>
          <p className="text-gray-600 font-light mb-4">{task.description}</p>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300" 
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: progressColor
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-500 font-light">
                <span className="font-medium">Created:</span> {formatDate(task.createdAt, settings.calendar)}
              </div>
              <span className="text-lg font-light text-gray-600">{progress}%</span>
            </div>
          </div>
          
          {/* Due Date */}
          {task.dueDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600 font-light">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Due:</span>
              <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                {formatDate(task.dueDate!, settings.calendar)}
                {isOverdue && ' (Overdue)'}
              </span>
            </div>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="flex gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
          {/* Complete/Incomplete Toggle */}
          <button
            onClick={() => onStatusChange(task.id, task.status === 2 ? 0 : 2)}
            className={`p-3 rounded-lg transition-colors text-lg font-medium ${
              task.status === 2 
                ? 'text-yellow-600 hover:bg-yellow-50' 
                : 'text-green-600 hover:bg-green-50'
            }`}
            title={task.status === 2 ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.status === 2 ? '↻' : '✓'}
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => onDelete(task.id)}
            className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
