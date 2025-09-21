import type { TodoTask, UpdateTaskDto } from '../../services/api';
import { apiService } from '../../services/api';
import { useNotificationCenter } from '../../contexts/NotificationCenterContext';

interface EditableTitleProps {
  task: TodoTask;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onTaskUpdate: (updatedTask: TodoTask) => void;
  onShowNotification?: (message: string, type: 'success' | 'error') => void;
}

export function EditableTitle({ task, isEditing, setIsEditing, onTaskUpdate, onShowNotification }: EditableTitleProps) {
  const { addNotification } = useNotificationCenter();
  const handleTitleEdit = async (newTitle: string) => {
    if (!task || newTitle.trim() === task.title) {
      setIsEditing(false);
      return;
    }
    
    try {
      const updateData: UpdateTaskDto = { 
        title: newTitle.trim(),
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate
      };
      const updatedTask = await apiService.updateTask(task.id, updateData);
      onTaskUpdate(updatedTask);
      setIsEditing(false);
      onShowNotification?.('Title updated ✓', 'success');
      
      // Add to notification center
      addNotification({
        type: 'title_updated',
        title: 'Task Title Updated',
        message: `Changed title to "${newTitle.trim()}"`,
        taskId: task.id,
        taskTitle: newTitle.trim()
      });
    } catch (error) {
      console.error('Failed to update title:', error);
      onShowNotification?.('Failed to update title', 'error');
    }
  };

  return (
    <div>
      {isEditing ? (
        <div className="mb-2">
          <input
            type="text"
            defaultValue={task.title}
            autoFocus
            className="text-2xl font-light text-gray-900 bg-transparent border-b-2 border-yellow-400 focus:outline-none focus:border-yellow-500 w-full"
            style={{ borderColor: '#F4C430' }}
            onBlur={(e) => handleTitleEdit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTitleEdit(e.currentTarget.value);
              } else if (e.key === 'Escape') {
                setIsEditing(false);
              }
            }}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-2 group">
          <h3 className="text-2xl font-light text-gray-900">{task.title}</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-yellow-500 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
