import type { TodoTask } from '../../services/types';
import { getProgressPercentage, getProgressExplanation } from '../../utils/taskUtils';

interface TaskProgressSectionProps {
  task: TodoTask;
  onManualProgressChange: (progress: number) => void;
  onShowNotification?: (message: string, type: 'success' | 'error') => void;
}

export function TaskProgressSection({ task, onManualProgressChange, onShowNotification }: TaskProgressSectionProps) {
  const progress = getProgressPercentage(task);

  return (
    <div className="bg-gray-50 p-4 rounded-2xl">
      <h4 className="text-lg font-medium text-gray-800 mb-3">Progress Breakdown</h4>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Current Progress:</span>
          <span className="text-2xl font-bold" style={{ color: '#F4C430' }}>{progress}%</span>
        </div>
        
        {/* Interactive Progress Bar */}
        {(!task.subtasks || task.subtasks.length === 0) ? (
          // Draggable progress bar for manual progress
          <div className="space-y-2">
            <div className="text-xs text-gray-500 font-light text-center">
              Drag to adjust progress
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={task.manualProgress}
              onChange={(e) => {
                const newProgress = parseInt(e.target.value);
                onManualProgressChange(newProgress);
                onShowNotification?.(`Progress updated to ${newProgress}% ✓`, 'success');
              }}
              className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #F4C430 0%, #F4C430 ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`
              }}
            />
          </div>
        ) : (
          // Static progress bar for subtask-based progress
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-300" 
              style={{ 
                width: `${progress}%`,
                backgroundColor: '#F4C430'
              }}
            ></div>
          </div>
        )}
        
        <p className="text-sm text-gray-600 font-light">
          {getProgressExplanation(task)}
        </p>
      </div>
    </div>
  );
}
