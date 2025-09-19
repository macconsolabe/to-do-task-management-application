import type { TodoTask, UpdateTaskDto } from '../../services/api';
import { apiService } from '../../services/api';

interface EditableDescriptionProps {
  task: TodoTask;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onTaskUpdate: (updatedTask: TodoTask) => void;
}

export function EditableDescription({ task, isEditing, setIsEditing, onTaskUpdate }: EditableDescriptionProps) {
  const handleDescriptionEdit = async (newDescription: string) => {
    if (!task || newDescription.trim() === task.description) {
      setIsEditing(false);
      return;
    }
    
    try {
      const updateData: UpdateTaskDto = { 
        title: task.title,
        description: newDescription.trim(),
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate
      };
      const updatedTask = await apiService.updateTask(task.id, updateData);
      onTaskUpdate(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update description:', error);
    }
  };

  return (
    <div className="mt-3">
      {isEditing ? (
        <textarea
          defaultValue={task.description || ''}
          autoFocus
          rows={3}
          className="w-full text-gray-700 font-light leading-relaxed bg-transparent border-2 border-yellow-400 rounded-lg p-2 focus:outline-none focus:border-yellow-500 resize-none"
          style={{ borderColor: '#F4C430' }}
          onBlur={(e) => handleDescriptionEdit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
              handleDescriptionEdit(e.currentTarget.value);
            } else if (e.key === 'Escape') {
              setIsEditing(false);
            }
          }}
          placeholder="Add a description..."
        />
      ) : (
        <div className="group">
          {task.description ? (
            <div className="flex items-start gap-2">
              <p className="text-gray-700 font-light leading-relaxed flex-1">{task.description}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-yellow-500 transition-all duration-200 mt-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 font-light italic hover:text-gray-700 transition-colors flex items-center gap-2"
            >
              <span>Add a description...</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
