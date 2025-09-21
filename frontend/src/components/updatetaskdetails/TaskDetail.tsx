import type { TodoTask, UpdateTaskDto } from '../../services/api';
import { apiService } from '../../services/api';

// Hooks
import { useTaskDetailState } from '../../hooks/tasks/useTaskDetailState';
import { useTaskDetailEditing } from '../../hooks/tasks/useTaskDetailEditing';
import { useTaskDetailActions } from '../../hooks/tasks/useTaskDetailActions';

// Components
import { TaskDetailHeader } from './TaskDetailHeader';
import { EditableTitle } from './EditableTitle';
import { EditableDescription } from './EditableDescription';
import { TaskProgressSection } from './TaskProgressSection';
import { TaskMetadata } from './TaskMetadata';
import { SubtasksSection } from './SubtasksSection';

interface TaskDetailProps {
  task: TodoTask | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: number) => void;
  onTaskUpdate: (updatedTask: TodoTask) => void;
  onCalendarClick?: (date: Date) => void;
  onShowNotification?: (message: string, type: 'success' | 'error') => void;
}

export function TaskDetail({ 
  task, 
  isOpen, 
  onClose, 
  onDelete, 
  onStatusChange, 
  onTaskUpdate,
  onCalendarClick,
  onShowNotification
}: TaskDetailProps) {
  // Custom hooks
  const { localTask, setLocalTask, isAnimating } = useTaskDetailState(task, isOpen);
  const {
    isEditingTitle, setIsEditingTitle,
    isEditingDescription, setIsEditingDescription,
    editingSubtask, setEditingSubtask,
    isEditingStatus, setIsEditingStatus,
    isEditingPriority, setIsEditingPriority,
    isEditingDueDate, setIsEditingDueDate,
    newSubtaskTitle, setNewSubtaskTitle,
    isAddingSubtask, setIsAddingSubtask,
    showStatusDropdown, setShowStatusDropdown,
    showPriorityDropdown, setShowPriorityDropdown,
    showTaskMenu, setShowTaskMenu,
    resetEditingStates
  } = useTaskDetailEditing();

  const { handleSubtaskToggle, handleManualProgressChange, handleFieldEdit } = useTaskDetailActions();

  if (!isAnimating || !localTask) return null;

  // Wrapper functions to match component signatures
  const handleTaskUpdate = (updatedTask: TodoTask) => {
    setLocalTask(updatedTask);
    onTaskUpdate(updatedTask);
  };

  const handleSubtaskToggleWrapper = (subtaskId: number) => {
    handleSubtaskToggle(subtaskId, localTask, setLocalTask, onTaskUpdate, task, onShowNotification);
  };

  const handleManualProgressWrapper = (progress: number) => {
    handleManualProgressChange(progress, localTask, setLocalTask, onTaskUpdate);
  };

  const handleFieldEditWrapper = (field: keyof UpdateTaskDto, value: any) => {
    handleFieldEdit(field, value, localTask, setLocalTask, onTaskUpdate, resetEditingStates);
  };

  const handleToggleImportanceWrapper = async () => {
    try {
      const updatedTask = await apiService.toggleTaskImportance(localTask.id);
      setLocalTask(updatedTask);
      onTaskUpdate(updatedTask);
      setShowTaskMenu(false);
      
      // Show notification
      const isNowImportant = updatedTask.priority === 2;
      onShowNotification?.(
        isNowImportant ? 'Task marked as Important ⭐' : 'Task removed from Important 📝', 
        'success'
      );
    } catch (err) {
      console.error('Failed to toggle importance:', err);
      onShowNotification?.('Failed to update task importance', 'error');
      setShowTaskMenu(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black flex items-center justify-center p-4 z-50 transition-all duration-300 ${
        isOpen ? 'bg-opacity-50' : 'bg-opacity-0'
      }`}
      onClick={onClose}
    >
      <div 
        className={`rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transition-all duration-300 transform relative ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ 
          background: 'linear-gradient(145deg, #e8eaed 0%, #d1d5db 30%, #f1f3f4 70%, #e8eaed 100%)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Metallic reflection overlay */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.3) 100%)'
          }}
        ></div>
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <div 
            className="rounded-t-3xl relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(145deg, rgba(248,249,250,0.98) 0%, rgba(233,236,239,0.95) 50%, rgba(248,249,250,0.98) 100%)',
              backdropFilter: 'blur(5px)'
            }}
          >
            {/* Inner content reflection */}
            <div 
              className="absolute inset-0 rounded-t-3xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.2) 100%)'
              }}
            ></div>
            <div className="relative z-10">
            <TaskDetailHeader
              task={localTask}
              showTaskMenu={showTaskMenu}
              setShowTaskMenu={setShowTaskMenu}
              onClose={onClose}
              onMarkComplete={() => {
                if (localTask.status !== 2) {
                  onStatusChange(localTask.id, 2);
                }
                setShowTaskMenu(false);
              }}
              onToggleImportance={handleToggleImportanceWrapper}
              onDelete={() => {
                onDelete(localTask.id);
                setShowTaskMenu(false);
              }}
              onCalendarClick={onCalendarClick}
            />
            
            <div className="p-6 space-y-6 pb-32">
              <EditableTitle
                task={localTask}
                isEditing={isEditingTitle}
                setIsEditing={setIsEditingTitle}
                onTaskUpdate={handleTaskUpdate}
                onShowNotification={onShowNotification}
              />

              <EditableDescription
                task={localTask}
                isEditing={isEditingDescription}
                setIsEditing={setIsEditingDescription}
                onTaskUpdate={handleTaskUpdate}
                onShowNotification={onShowNotification}
              />

              <TaskProgressSection
                task={localTask}
                onManualProgressChange={handleManualProgressWrapper}
                onShowNotification={onShowNotification}
              />

              <SubtasksSection
                task={localTask}
                editingSubtask={editingSubtask}
                setEditingSubtask={setEditingSubtask}
                newSubtaskTitle={newSubtaskTitle}
                setNewSubtaskTitle={setNewSubtaskTitle}
                isAddingSubtask={isAddingSubtask}
                setIsAddingSubtask={setIsAddingSubtask}
                onTaskUpdate={handleTaskUpdate}
                onSubtaskToggle={handleSubtaskToggleWrapper}
                onShowNotification={onShowNotification}
              />

              <TaskMetadata
                task={localTask}
                isEditingStatus={isEditingStatus}
                setIsEditingStatus={setIsEditingStatus}
                isEditingPriority={isEditingPriority}
                setIsEditingPriority={setIsEditingPriority}
                isEditingDueDate={isEditingDueDate}
                setIsEditingDueDate={setIsEditingDueDate}
                showStatusDropdown={showStatusDropdown}
                setShowStatusDropdown={setShowStatusDropdown}
                showPriorityDropdown={showPriorityDropdown}
                setShowPriorityDropdown={setShowPriorityDropdown}
                onFieldEdit={handleFieldEditWrapper}
                onShowNotification={onShowNotification}
              />

              {/* Last Updated */}
              <div className="text-xs text-gray-500 font-light border-t pt-4">
                Last updated: {new Date(localTask.updatedAt).toLocaleString()}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
