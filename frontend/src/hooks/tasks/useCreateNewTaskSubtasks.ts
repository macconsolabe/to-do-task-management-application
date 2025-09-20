import { useState, useEffect } from 'react';
import type { TodoTask } from '../../services/api';

interface UseCreateNewTaskSubtasksProps {
  task?: TodoTask;
  isOpen: boolean;
}

export function useCreateNewTaskSubtasks({ task, isOpen }: UseCreateNewTaskSubtasksProps) {
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  // Initialize subtasks when task or modal state changes
  useEffect(() => {
    if (task) {
      setSubtasks(task.subtasks ? task.subtasks.map(s => s.title) : []);
    } else {
      setSubtasks([]);
    }
  }, [task, isOpen]);

  const addSubtask = () => {
    if (newSubtaskTitle.trim()) {
      setSubtasks(prev => [...prev, newSubtaskTitle.trim()]);
      setNewSubtaskTitle('');
    }
  };

  const removeSubtask = (index: number) => {
    setSubtasks(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubtaskKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSubtask();
    }
  };

  return {
    subtasks,
    newSubtaskTitle,
    setNewSubtaskTitle,
    addSubtask,
    removeSubtask,
    handleSubtaskKeyDown
  };
}
