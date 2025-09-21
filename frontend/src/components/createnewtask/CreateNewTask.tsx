import type { TodoTask, CreateTaskDto, UpdateTaskDto } from '../../services/api';

// Hooks
import { useCreateNewTaskState } from '../../hooks/tasks/useCreateNewTaskState';
import { useCreateNewTaskDropdowns } from '../../hooks/tasks/useCreateNewTaskDropdowns';
import { useCreateNewTaskSubtasks } from '../../hooks/tasks/useCreateNewTaskSubtasks';

// Components
import { CreateNewTaskHeader } from './CreateNewTaskHeader';
import { CreateNewTaskTitleSection } from './CreateNewTaskTitleSection';
import { CreateNewTaskProgressSection } from './CreateNewTaskProgressSection';
import { CreateNewTaskSubtasksSection } from './CreateNewTaskSubtasksSection';
import { CreateNewTaskMetadataSection } from './CreateNewTaskMetadataSection';
import { CreateNewTaskActions } from './CreateNewTaskActions';

interface CreateNewTaskProps {
  isOpen: boolean;
  task?: TodoTask;
  onClose: () => void;
  onSubmit: (data: CreateTaskDto | UpdateTaskDto, subtasks: string[]) => Promise<void>;
}

export function CreateNewTask({ isOpen, task, onClose, onSubmit }: CreateNewTaskProps) {
  // Custom hooks
  const {
    subtasks,
    newSubtaskTitle,
    setNewSubtaskTitle,
    addSubtask,
    removeSubtask,
    handleSubtaskKeyDown
  } = useCreateNewTaskSubtasks({ task, isOpen });

  // Wrapper to handle subtasks
  const handleSubmitWithSubtasks = async (data: CreateTaskDto | UpdateTaskDto) => {
    console.log('CreateNewTask: Submitting with subtasks:', subtasks);
    await onSubmit(data, subtasks);
  };

  const { formData, setFormData, isSubmitting, errors, handleChange, handleSubmit } = useCreateNewTaskState({
    task,
    isOpen,
    onSubmit: handleSubmitWithSubtasks,
    onClose
  });

  const {
    showStatusDropdown,
    setShowStatusDropdown,
    showPriorityDropdown,
    setShowPriorityDropdown
  } = useCreateNewTaskDropdowns();

  // Handle manual progress change
  const handleProgressChange = (progress: number) => {
    setFormData(prev => ({ ...prev, manualProgress: progress }));
  };

  if (!isOpen) return null;

  // Handle click outside to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking on the backdrop itself, not on any child elements
    if (e.target === e.currentTarget) {
      // Close any open dropdowns first
      setShowStatusDropdown(false);
      setShowPriorityDropdown(false);
      // Then close the modal
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        style={{ 
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="rounded-t-3xl"
          >
              <CreateNewTaskHeader task={task} onClose={onClose} />
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6 pb-32">
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
                    {errors.submit}
                  </div>
                )}
                
                <CreateNewTaskTitleSection
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                />

                <CreateNewTaskProgressSection
                  task={task}
                  formData={formData}
                  subtasks={subtasks}
                  onProgressChange={handleProgressChange}
                />

                <CreateNewTaskSubtasksSection
                  subtasks={subtasks}
                  newSubtaskTitle={newSubtaskTitle}
                  setNewSubtaskTitle={setNewSubtaskTitle}
                  addSubtask={addSubtask}
                  removeSubtask={removeSubtask}
                  handleSubtaskKeyDown={handleSubtaskKeyDown}
                />

                <CreateNewTaskMetadataSection
                  formData={formData}
                  setFormData={setFormData}
                  showStatusDropdown={showStatusDropdown}
                  setShowStatusDropdown={setShowStatusDropdown}
                  showPriorityDropdown={showPriorityDropdown}
                  setShowPriorityDropdown={setShowPriorityDropdown}
                  onChange={handleChange}
                />
                
                <CreateNewTaskActions
                  task={task}
                  isSubmitting={isSubmitting}
                  onClose={onClose}
                />
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}
