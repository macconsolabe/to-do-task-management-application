import { useState } from 'react';
import type { TodoTask } from '../../services/api';

export function useTaskModal() {
  const [selectedTask, setSelectedTask] = useState<TodoTask | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleTaskClick = (task: TodoTask) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailOpen(false);
    setSelectedTask(null);
  };

  return {
    selectedTask,
    isDetailOpen,
    setSelectedTask,
    handleTaskClick,
    handleDetailClose
  };
}
