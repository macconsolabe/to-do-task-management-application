import type { TodoTask } from '../../services/api';

interface TaskDetailHeaderProps {
  task: TodoTask;
  showTaskMenu: boolean;
  setShowTaskMenu: (show: boolean) => void;
  onClose: () => void;
  onMarkComplete: () => void;
  onToggleImportance: (id: number) => void;
  onDelete: () => void;
}

export function TaskDetailHeader({ 
  task, 
  showTaskMenu, 
  setShowTaskMenu, 
  onClose, 
  onMarkComplete, 
  onToggleImportance, 
  onDelete 
}: TaskDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: '#F4C430' }}>
          ET
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-900">Task Details</h2>
          <p className="text-sm text-gray-500">ET-{task.id}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Three-dot menu */}
        <div className="task-menu relative">
          <button
            onClick={() => setShowTaskMenu(!showTaskMenu)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          
          {showTaskMenu && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              {task.status !== 2 && (
                <button
                  onClick={onMarkComplete}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 first:rounded-t-lg"
                >
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Mark as Complete</span>
                </button>
              )}
              <button
                onClick={() => {
                  onToggleImportance(task.id);
                  setShowTaskMenu(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-700">
                  {task.priority === 2 ? 'Remove Important' : 'Mark Important'}
                </span>
              </button>
              <button
                onClick={onDelete}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 last:rounded-b-lg text-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete Task</span>
              </button>
            </div>
          )}
        </div>
        
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
}
