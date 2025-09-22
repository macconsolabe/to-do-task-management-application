import type { TodoTask } from '../../services/types';
import { taskService } from '../../services/TaskService';
import { subtaskService } from '../../services/SubtaskService';
import { useNotificationCenter } from '../../contexts/NotificationCenterContext';

interface SubtasksSectionProps {
  task: TodoTask;
  editingSubtask: number | null;
  setEditingSubtask: (id: number | null) => void;
  newSubtaskTitle: string;
  setNewSubtaskTitle: (title: string) => void;
  isAddingSubtask: boolean;
  setIsAddingSubtask: (adding: boolean) => void;
  onTaskUpdate: (updatedTask: TodoTask) => void;
  onSubtaskToggle: (subtaskId: number) => void;
  onShowNotification?: (message: string, type: 'success' | 'error') => void;
}

export function SubtasksSection({ 
  task, 
  editingSubtask, 
  setEditingSubtask,
  newSubtaskTitle, 
  setNewSubtaskTitle,
  isAddingSubtask, 
  setIsAddingSubtask,
  onTaskUpdate,
  onSubtaskToggle,
  onShowNotification
}: SubtasksSectionProps) {
  const { addNotification } = useNotificationCenter();
  const handleSubtaskEdit = async (subtaskId: number, newTitle: string) => {
    if (!newTitle.trim()) return;
    
    try {
      await subtaskService.updateSubtask(subtaskId, newTitle.trim());
      
      // Refresh the task to get updated subtasks
      const updatedTask = await taskService.getTask(task.id);
      onTaskUpdate(updatedTask);
      setEditingSubtask(null);
      onShowNotification?.('Subtask updated ✓', 'success');
    } catch (error) {
      console.error('Failed to update subtask:', error);
      onShowNotification?.('Failed to update subtask', 'error');
    }
  };

  const handleSubtaskDelete = async (subtaskId: number) => {
    try {
      await subtaskService.deleteSubtask(subtaskId);
      
      // Refresh the task to get updated subtasks
      const updatedTask = await taskService.getTask(task.id);
      onTaskUpdate(updatedTask);
      onShowNotification?.('Subtask deleted ✓', 'success');
    } catch (error) {
      console.error('Failed to delete subtask:', error);
      onShowNotification?.('Failed to delete subtask', 'error');
    }
  };

  const handleAddSubtask = async () => {
    if (!newSubtaskTitle.trim()) return;
    
    try {
      const newOrder = task.subtasks ? task.subtasks.length : 0;
      await subtaskService.createSubtask({
        Title: newSubtaskTitle.trim(),
        TodoTaskId: task.id,
        Order: newOrder
      });
      
      // Refresh the task to get updated subtasks
      const updatedTask = await taskService.getTask(task.id);
      onTaskUpdate(updatedTask);
      setNewSubtaskTitle('');
      setIsAddingSubtask(false);
      onShowNotification?.('Subtask added ✓', 'success');
      
      // Add to notification center
      addNotification({
        type: 'subtask_added',
        title: 'Subtask Added',
        message: `"${task.title}" - Added subtask: "${newSubtaskTitle.trim()}"`,
        taskId: task.id,
        taskTitle: task.title
      });
    } catch (error) {
      console.error('Failed to add subtask:', error);
      onShowNotification?.('Failed to add subtask', 'error');
    }
  };

  const hasSubtasks = task.subtasks && task.subtasks.length > 0;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h5 className="text-md font-medium text-gray-800">
          {hasSubtasks 
            ? `Subtasks (${task.subtasks.filter(s => s.isCompleted).length}/${task.subtasks.length})`
            : 'Subtasks (0)'
          }
        </h5>
        <button
          onClick={() => setIsAddingSubtask(true)}
          className="text-sm px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-1"
        >
          + Add
        </button>
      </div>
      
      <div className="space-y-2">
        {hasSubtasks && task.subtasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors group">
            <button
              onClick={() => onSubtaskToggle(subtask.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                subtask.isCompleted 
                  ? 'border-green-500 bg-green-500 text-white' 
                  : 'border-gray-300 hover:border-green-400'
              }`}
            >
              {subtask.isCompleted && '✓'}
            </button>
            
            {editingSubtask === subtask.id ? (
              <input
                type="text"
                defaultValue={subtask.title}
                autoFocus
                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#F4C430' } as any}
                onBlur={(e) => handleSubtaskEdit(subtask.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubtaskEdit(subtask.id, e.currentTarget.value);
                  } else if (e.key === 'Escape') {
                    setEditingSubtask(null);
                  }
                }}
              />
            ) : (
              <span className={`flex-1 ${subtask.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {subtask.title}
              </span>
            )}
            
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
              <button
                onClick={() => setEditingSubtask(subtask.id)}
                className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => handleSubtaskDelete(subtask.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        
        {isAddingSubtask && (
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <div className="w-5 h-5 rounded border-2 border-gray-300"></div>
            <input
              type="text"
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              placeholder="Enter subtask title..."
              autoFocus
              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#F4C430' } as any}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddSubtask();
                } else if (e.key === 'Escape') {
                  setIsAddingSubtask(false);
                  setNewSubtaskTitle('');
                }
              }}
            />
            <div className="flex items-center gap-1">
              <button
                onClick={handleAddSubtask}
                className="p-1 text-green-600 hover:text-green-700 transition-colors"
                disabled={!newSubtaskTitle.trim()}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setIsAddingSubtask(false);
                  setNewSubtaskTitle('');
                }}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
