import type { TodoTask } from '../../services/api';
import { getProgressPercentage, getProgressColor } from '../../utils/taskUtils';

interface ProgressCardProps {
  task: TodoTask;
}

export function ProgressCard({ task }: ProgressCardProps) {
  const progress = getProgressPercentage(task);
  const progressColor = getProgressColor();

  return (
    <div className="p-6 rounded-3xl text-white shadow-lg" style={{ backgroundColor: progressColor }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg"></div>
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
  );
}
