import type { TodoTask, UpdateTaskDto } from '../../services/api';
import { getStatusLabel, getPriorityLabel } from '../../utils/taskUtils';

interface TaskMetadataProps {
  task: TodoTask;
  isEditingStatus: boolean;
  setIsEditingStatus: (editing: boolean) => void;
  isEditingPriority: boolean;
  setIsEditingPriority: (editing: boolean) => void;
  isEditingDueDate: boolean;
  setIsEditingDueDate: (editing: boolean) => void;
  showStatusDropdown: boolean;
  setShowStatusDropdown: (show: boolean) => void;
  showPriorityDropdown: boolean;
  setShowPriorityDropdown: (show: boolean) => void;
  onFieldEdit: (field: keyof UpdateTaskDto, value: any) => void;
}

export function TaskMetadata({ 
  task, 
  isEditingStatus, 
  setIsEditingStatus,
  isEditingPriority, 
  setIsEditingPriority,
  isEditingDueDate, 
  setIsEditingDueDate,
  showStatusDropdown, 
  setShowStatusDropdown,
  showPriorityDropdown, 
  setShowPriorityDropdown,
  onFieldEdit 
}: TaskMetadataProps) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 2;

  const handleStatusSelect = (status: number) => {
    onFieldEdit('status', status);
  };

  const handlePrioritySelect = (priority: number) => {
    onFieldEdit('priority', priority);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-3">
        {/* Status */}
        <div className="status-dropdown">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-500">Status</span>
            <button
              onClick={() => {
                setIsEditingStatus(!isEditingStatus);
                setShowStatusDropdown(false);
              }}
              className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
          {isEditingStatus ? (
            <div className="relative">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="w-full px-3 py-2 border-2 border-yellow-400 rounded-lg focus:outline-none focus:border-yellow-500 text-left flex items-center justify-between bg-white"
                style={{ borderColor: '#F4C430' }}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 0 ? 'bg-yellow-400' :
                    task.status === 1 ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <span className="font-light">{getStatusLabel(task.status)}</span>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showStatusDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleStatusSelect(0)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 first:rounded-t-lg"
                  >
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <span className="font-light">To Do</span>
                  </button>
                  <button
                    onClick={() => handleStatusSelect(1)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="font-light">In Progress</span>
                  </button>
                  <button
                    onClick={() => handleStatusSelect(2)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 last:rounded-b-lg"
                  >
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="font-light">Completed</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-3 h-3 rounded-full ${
                task.status === 0 ? 'bg-yellow-400' :
                task.status === 1 ? 'bg-blue-500' : 'bg-green-500'
              }`}></div>
              <span className="font-light">{getStatusLabel(task.status)}</span>
            </div>
          )}
        </div>
        
        {/* Priority */}
        <div className="priority-dropdown">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-500">Priority</span>
            <button
              onClick={() => {
                setIsEditingPriority(!isEditingPriority);
                setShowPriorityDropdown(false);
              }}
              className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
          {isEditingPriority ? (
            <div className="relative">
              <button
                onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                className="w-full px-3 py-2 border-2 border-yellow-400 rounded-lg focus:outline-none focus:border-yellow-500 text-left flex items-center justify-between bg-white"
                style={{ borderColor: '#F4C430' }}
              >
                <div className="flex items-center gap-2">
                  <span className={task.priority === 2 ? 'text-yellow-500' : 'text-gray-400'}>
                    {task.priority === 2 ? '★' : '☆'}
                  </span>
                  <span className="font-light">{getPriorityLabel(task.priority)}</span>
                  {task.priority === 2 && (
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#F4C430', color: 'white' }}>
                      Important
                    </span>
                  )}
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showPriorityDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handlePrioritySelect(0)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 first:rounded-t-lg"
                  >
                    <span className="text-gray-400">☆</span>
                    <span className="font-light">Low</span>
                  </button>
                  <button
                    onClick={() => handlePrioritySelect(1)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <span className="text-gray-400">☆</span>
                    <span className="font-light">Medium</span>
                  </button>
                  <button
                    onClick={() => handlePrioritySelect(2)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 last:rounded-b-lg"
                  >
                    <span className="text-yellow-500">★</span>
                    <span className="font-light">High</span>
                    <span className="text-xs px-2 py-1 rounded-full ml-auto" style={{ backgroundColor: '#F4C430', color: 'white' }}>
                      Important
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-1">
              <span className={task.priority === 2 ? 'text-yellow-500' : 'text-gray-400'}>
                {task.priority === 2 ? '★' : '☆'}
              </span>
              <span className="font-light">{getPriorityLabel(task.priority)}</span>
              {task.priority === 2 && (
                <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#F4C430', color: 'white' }}>
                  Important
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-gray-500">Created</span>
          <p className="font-light text-gray-800 mt-1">
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        
        {/* Due Date */}
        <div className="due-date-field">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-500">Due Date</span>
            <button
              onClick={() => setIsEditingDueDate(!isEditingDueDate)}
              className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
          {isEditingDueDate ? (
            <input
              type="date"
              value={task.dueDate ? task.dueDate.split('T')[0] : ''}
              onChange={(e) => onFieldEdit('dueDate', e.target.value || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#F4C430' } as any}
              autoFocus
            />
          ) : (
            <div className="mt-1">
              {task.dueDate ? (
                <p className={`font-light ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-800'}`}>
                  {new Date(task.dueDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  {isOverdue && ' (Overdue)'}
                </p>
              ) : (
                <p className="font-light text-gray-500 italic">No due date set</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
