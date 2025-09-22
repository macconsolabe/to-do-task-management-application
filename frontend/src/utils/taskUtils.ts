import type { TodoTask } from '../services/types';

export const getProgressPercentage = (task: TodoTask): number => {
  // If task is completed, always 100%
  if (task.status === 2) return 100;
  
  // If task has subtasks, calculate based on completed subtasks
  if (task.subtasks && task.subtasks.length > 0) {
    const completedSubtasks = task.subtasks.filter(s => s.isCompleted).length;
    return Math.round((completedSubtasks / task.subtasks.length) * 100);
  }
  
  // Otherwise, use manual progress
  return task.manualProgress || 0;
};

export const getProgressColor = (): string => {
  return '#F4C430'; // Always use eTask yellow for consistent branding
};

export const filterTasks = (tasks: TodoTask[], activeTab: string): TodoTask[] => {
  switch (activeTab) {
    case 'todo': return tasks.filter(task => task.status === 0); // Only To Do status
    case 'inprogress': return tasks.filter(task => task.status === 1); // Only In Progress status
    case 'completed': return tasks.filter(task => task.status === 2); // Only Completed status
    case 'important': return tasks.filter(task => task.priority === 2); // High priority tasks
    default: return tasks;
  }
};

// TaskDetail utility functions
export const getStatusLabel = (status: number): string => {
  switch (status) {
    case 0: return 'To Do';
    case 1: return 'In Progress';
    case 2: return 'Completed';
    default: return 'Unknown';
  }
};

export const getPriorityLabel = (priority: number): string => {
  switch (priority) {
    case 0: return 'Low';
    case 1: return 'Medium';
    case 2: return 'High';
    default: return 'Unknown';
  }
};

export const getProgressExplanation = (task: TodoTask): string => {
  if (task.status === 2) return 'Task completed (100% - Finished)';
  
  if (task.subtasks && task.subtasks.length > 0) {
    const completed = task.subtasks.filter(s => s.isCompleted).length;
    return `Progress based on subtasks (${completed}/${task.subtasks.length} completed)`;
  }
  
  return `Manual progress set by user (${task.manualProgress}%)`;
};

export const sortTasks = (tasks: TodoTask[], sortBy: 'createdAt' | 'dueDate' | 'priority' | 'title'): TodoTask[] => {
  const sortedTasks = [...tasks];
  
  switch (sortBy) {
    case 'createdAt':
      return sortedTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'dueDate':
      return sortedTasks.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    case 'priority':
      return sortedTasks.sort((a, b) => b.priority - a.priority); // High to Low
    case 'title':
      return sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sortedTasks;
  }
};
