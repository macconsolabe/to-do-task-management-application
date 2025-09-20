import { useState, useEffect } from 'react';

export function useTaskDetailEditing() {
  // Editing states
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editingSubtask, setEditingSubtask] = useState<number | null>(null);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showTaskMenu, setShowTaskMenu] = useState(false);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Close status dropdown if clicking outside
      if (isEditingStatus && !target.closest('.status-dropdown')) {
        setIsEditingStatus(false);
        setShowStatusDropdown(false);
      }
      
      // Close priority dropdown if clicking outside
      if (isEditingPriority && !target.closest('.priority-dropdown')) {
        setIsEditingPriority(false);
        setShowPriorityDropdown(false);
      }
      
      // Close due date field if clicking outside
      if (isEditingDueDate && !target.closest('.due-date-field')) {
        setIsEditingDueDate(false);
      }
      
      // Close task menu if clicking outside
      if (showTaskMenu && !target.closest('.task-menu')) {
        setShowTaskMenu(false);
      }
    };

    if (isEditingStatus || isEditingPriority || isEditingDueDate || showTaskMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isEditingStatus, isEditingPriority, isEditingDueDate, showTaskMenu]);

  const resetEditingStates = () => {
    setIsEditingStatus(false);
    setIsEditingPriority(false);
    setIsEditingDueDate(false);
    setShowStatusDropdown(false);
    setShowPriorityDropdown(false);
  };

  return {
    // Title editing
    isEditingTitle,
    setIsEditingTitle,
    
    // Description editing
    isEditingDescription,
    setIsEditingDescription,
    
    // Subtask editing
    editingSubtask,
    setEditingSubtask,
    newSubtaskTitle,
    setNewSubtaskTitle,
    isAddingSubtask,
    setIsAddingSubtask,
    
    // Field editing
    isEditingStatus,
    setIsEditingStatus,
    isEditingPriority,
    setIsEditingPriority,
    isEditingDueDate,
    setIsEditingDueDate,
    
    // Dropdown states
    showStatusDropdown,
    setShowStatusDropdown,
    showPriorityDropdown,
    setShowPriorityDropdown,
    showTaskMenu,
    setShowTaskMenu,
    
    // Utilities
    resetEditingStates
  };
}
