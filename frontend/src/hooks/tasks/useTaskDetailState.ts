import { useState, useEffect } from 'react';
import type { TodoTask } from '../../services/types';

export function useTaskDetailState(task: TodoTask | null, isOpen: boolean) {
  const [localTask, setLocalTask] = useState<TodoTask | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Update local task when prop changes
  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  // Handle modal animation
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      // Delay hiding the modal to allow exit animation
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return {
    localTask,
    setLocalTask,
    isAnimating
  };
}
