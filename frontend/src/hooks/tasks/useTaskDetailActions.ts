import type { TodoTask, UpdateTaskDto } from '../../services/api';
import { apiService } from '../../services/api';
import { useSettings } from '../../contexts/SettingsContext';

export function useTaskDetailActions() {
  const { settings } = useSettings();
  
  const handleSubtaskToggle = async (
    subtaskId: number, 
    localTask: TodoTask,
    setLocalTask: (task: TodoTask) => void,
    onTaskUpdate: (task: TodoTask) => void,
    originalTask: TodoTask | null,
    onShowNotification?: (message: string, type: 'success' | 'error') => void
  ) => {
    try {
      // Optimistic update - update UI immediately
      const updatedSubtasks = localTask.subtasks.map(s => 
        s.id === subtaskId ? { ...s, isCompleted: !s.isCompleted } : s
      );
      const updatedTask = { ...localTask, subtasks: updatedSubtasks };
      setLocalTask(updatedTask);
      onTaskUpdate(updatedTask);

      // Make API call
      await apiService.toggleSubtask(subtaskId);
      
      // Check if auto-complete is enabled and all subtasks are now completed
      if (settings.tasks.autoCompleteWithSubtasks && 
          updatedSubtasks.length > 0 && 
          updatedSubtasks.every(s => s.isCompleted) &&
          updatedTask.status !== 2) {
        // Auto-complete the task
        const completeUpdateData: UpdateTaskDto = {
          title: updatedTask.title,
          description: updatedTask.description,
          status: 2, // Completed
          priority: updatedTask.priority,
          dueDate: updatedTask.dueDate
        };
        const completedTask = await apiService.updateTask(updatedTask.id, completeUpdateData);
        setLocalTask(completedTask);
        onTaskUpdate(completedTask);
        onShowNotification?.('Task auto-completed! All subtasks finished ✅', 'success');
      } else {
        // Show regular subtask notification
        const toggledSubtask = updatedSubtasks.find(s => s.id === subtaskId);
        if (toggledSubtask) {
          const message = toggledSubtask.isCompleted ? 'Subtask completed ✓' : 'Subtask marked incomplete ↩️';
          onShowNotification?.(message, 'success');
        }
      }
    } catch (err) {
      console.error('Failed to toggle subtask:', err);
      onShowNotification?.('Failed to update subtask', 'error');
      // Revert on error
      if (originalTask) setLocalTask(originalTask);
    }
  };

  const handleManualProgressChange = (
    newProgress: number,
    localTask: TodoTask,
    setLocalTask: (task: TodoTask) => void,
    onTaskUpdate: (task: TodoTask) => void
  ) => {
    const updatedTask = { ...localTask, manualProgress: newProgress };
    setLocalTask(updatedTask);
    onTaskUpdate(updatedTask);
  };

  const handleFieldEdit = async (
    field: keyof UpdateTaskDto, 
    value: any,
    task: TodoTask,
    setLocalTask: (task: TodoTask) => void,
    onTaskUpdate: (task: TodoTask) => void,
    resetEditingStates: () => void
  ) => {
    try {
      const updateData: UpdateTaskDto = { 
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        [field]: value 
      };
      const updatedTask = await apiService.updateTask(task.id, updateData);
      setLocalTask(updatedTask);
      onTaskUpdate(updatedTask);
      resetEditingStates();
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  return {
    handleSubtaskToggle,
    handleManualProgressChange,
    handleFieldEdit
  };
}
