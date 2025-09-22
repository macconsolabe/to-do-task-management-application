import type { TodoTask } from '../../services/types';

interface CreateNewTaskHeaderProps {
  task?: TodoTask;
  onClose: () => void;
}

export function CreateNewTaskHeader({ task, onClose }: CreateNewTaskHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: '#F4C430' }}>
          ET
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-900">{task ? 'Edit Task' : 'Create New Task'}</h2>
          <p className="text-sm text-gray-500">{task ? `ET-${task.id}` : 'New Task'}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors text-lg"
      >
        ×
      </button>
    </div>
  );
}
