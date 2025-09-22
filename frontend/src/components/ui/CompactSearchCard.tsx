import type { TodoTask } from '../../services/types';

interface CompactSearchCardProps {
  task: TodoTask;
  onTaskClick: (task: TodoTask) => void;
}

export function CompactSearchCard({ task, onTaskClick }: CompactSearchCardProps) {
  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 2: return 'text-red-600';
      case 1: return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0: return { text: 'To Do', color: 'bg-gray-100 text-gray-700' };
      case 1: return { text: 'In Progress', color: 'bg-blue-100 text-blue-700' };
      case 2: return { text: 'Completed', color: 'bg-green-100 text-green-700' };
      default: return { text: 'Unknown', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const statusBadge = getStatusBadge(task.status);
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  const completedSubtasks = task.subtasks?.filter(s => s.isCompleted).length || 0;

  return (
    <div
      onClick={() => onTaskClick(task)}
      className="px-3 py-2 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors duration-150 border border-transparent hover:border-gray-200"
    >
      <div className="flex items-start gap-3">
        {/* Status indicator */}
        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
          task.status === 2 ? 'bg-green-500' : 
          task.status === 1 ? 'bg-blue-500' : 'bg-gray-400'
        }`} />
        
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {task.title}
            </h4>
            <span className={`text-xs ${getPriorityColor(task.priority)}`}>
              {task.priority === 2 ? '●' : task.priority === 1 ? '◐' : '○'}
            </span>
          </div>
          
          {task.description && (
            <p className="text-xs text-gray-500 truncate">
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-3 mt-1">
            <span className={`text-xs px-1.5 py-0.5 rounded ${statusBadge.color}`}>
              {statusBadge.text}
            </span>
            
            {hasSubtasks && (
              <span className="text-xs text-gray-500">
                {completedSubtasks}/{task.subtasks.length} subtasks
              </span>
            )}
            
            {task.dueDate && (
              <span className="text-xs text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* Progress indicator */}
        {hasSubtasks && (
          <div className="flex-shrink-0">
            <div className="text-xs text-gray-500 text-right">
              {Math.round((completedSubtasks / task.subtasks.length) * 100)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
