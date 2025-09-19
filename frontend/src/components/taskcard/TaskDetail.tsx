import type { TodoTask, UpdateTaskDto } from '../../services/api';

// Hooks
import { useTaskDetailState } from '../../hooks/useTaskDetailState';
import { useTaskDetailEditing } from '../../hooks/useTaskDetailEditing';
import { useTaskDetailActions } from '../../hooks/useTaskDetailActions';

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
  onToggleImportance: (id: number) => void;
  onTaskUpdate: (updatedTask: TodoTask) => void;
}

export function TaskDetail({ 
  task, 
  isOpen, 
  onClose, 
  onDelete, 
  onStatusChange, 
  onToggleImportance,
  onTaskUpdate
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
    handleSubtaskToggle(subtaskId, localTask, setLocalTask, onTaskUpdate, task);
  };

  const handleManualProgressWrapper = (progress: number) => {
    handleManualProgressChange(progress, localTask, setLocalTask, onTaskUpdate);
  };

  const handleFieldEditWrapper = (field: keyof UpdateTaskDto, value: any) => {
    handleFieldEdit(field, value, localTask, setLocalTask, onTaskUpdate, resetEditingStates);
  };

  return (
    <div className={`fixed inset-0 bg-black flex items-center justify-center p-4 z-50 transition-all duration-300 ${
      isOpen ? 'bg-opacity-50' : 'bg-opacity-0'
    }`}>
      <div 
        className={`bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transition-all duration-300 transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ backgroundColor: '#faf9f7' }}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="bg-white rounded-t-3xl">
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
              onToggleImportance={onToggleImportance}
              onDelete={() => {
                onDelete(localTask.id);
                setShowTaskMenu(false);
              }}
            />
            
            <div className="p-6 space-y-6">
              <EditableTitle
                task={localTask}
                isEditing={isEditingTitle}
                setIsEditing={setIsEditingTitle}
                onTaskUpdate={handleTaskUpdate}
              />

              <EditableDescription
                task={localTask}
                isEditing={isEditingDescription}
                setIsEditing={setIsEditingDescription}
                onTaskUpdate={handleTaskUpdate}
              />

              <TaskProgressSection
                task={localTask}
                onManualProgressChange={handleManualProgressWrapper}
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
  );
}
