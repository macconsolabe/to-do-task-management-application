import type { TodoTask } from '../../services/api';
import { getProgressPercentage, getProgressColor } from '../../utils/taskUtils';

interface CalendarCardProps {
  task: TodoTask;
  taskIndex?: number;
  totalTasks?: number;
}

export function CalendarCard({ task, taskIndex = 0, totalTasks = 1 }: CalendarCardProps) {
  const progress = getProgressPercentage(task);
  const progressColor = getProgressColor();

  return (
    <div 
      className="p-6 rounded-3xl text-white shadow-lg relative overflow-hidden" 
      style={{ 
        background: `linear-gradient(145deg, ${progressColor} 0%, #e6b800 50%, ${progressColor} 100%)`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 8px 25px rgba(0,0,0,0.15)'
      }}
    >
      {/* Metallic reflection overlay */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.1) 100%)'
        }}
      ></div>
      <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg"></div>
        {totalTasks > 1 && (
          <div className="text-white text-opacity-90 text-sm font-light">
            {taskIndex + 1} of {totalTasks}
          </div>
        )}
      </div>
      <h4 className="text-xl font-light mb-2">{task.title}</h4>
      <p className="text-white text-opacity-90 font-light mb-4">{task.description}</p>
      
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-white text-opacity-90 mt-1 font-light">{progress}%</p>
      </div>
      
      {/* Due Date */}
      {task.dueDate && (
        <div className="flex items-center gap-2 text-white text-opacity-90">
          <span>🕐</span>
          <span className="font-light">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      )}
      </div>
    </div>
  );
}
