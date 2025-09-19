import type { TodoTask, CreateTaskDto, UpdateTaskDto } from '../../services/api';

// Hooks
import { useCreateNewTaskState } from '../../hooks/useCreateNewTaskState';
import { useCreateNewTaskDropdowns } from '../../hooks/useCreateNewTaskDropdowns';
import { useCreateNewTaskSubtasks } from '../../hooks/useCreateNewTaskSubtasks';

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
  onSubmit: (data: CreateTaskDto | UpdateTaskDto) => Promise<void>;
}

export function CreateNewTask({ isOpen, task, onClose, onSubmit }: CreateNewTaskProps) {
  // Custom hooks
  const { formData, setFormData, isSubmitting, errors, handleChange, handleSubmit } = useCreateNewTaskState({
    task,
    isOpen,
    onSubmit,
    onClose
  });

  const {
    showStatusDropdown,
    setShowStatusDropdown,
    showPriorityDropdown,
    setShowPriorityDropdown
  } = useCreateNewTaskDropdowns();

  const {
    subtasks,
    newSubtaskTitle,
    setNewSubtaskTitle,
    addSubtask,
    removeSubtask,
    handleSubtaskKeyDown
  } = useCreateNewTaskSubtasks({ task, isOpen });

  // Handle manual progress change
  const handleProgressChange = (progress: number) => {
    setFormData(prev => ({ ...prev, manualProgress: progress }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden relative"
        style={{ 
          background: 'linear-gradient(145deg, #e8eaed 0%, #d1d5db 30%, #f1f3f4 70%, #e8eaed 100%)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.2)'
        }}
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
              <CreateNewTaskHeader task={task} onClose={onClose} />
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
    </div>
  );
}
