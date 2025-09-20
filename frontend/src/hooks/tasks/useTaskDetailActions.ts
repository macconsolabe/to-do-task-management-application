import type { TodoTask, UpdateTaskDto } from '../../services/api';
import { apiService } from '../../services/api';

export function useTaskDetailActions() {
  const handleSubtaskToggle = async (
    subtaskId: number, 
    localTask: TodoTask,
    setLocalTask: (task: TodoTask) => void,
    onTaskUpdate: (task: TodoTask) => void,
    originalTask: TodoTask | null
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
    } catch (err) {
      console.error('Failed to toggle subtask:', err);
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
