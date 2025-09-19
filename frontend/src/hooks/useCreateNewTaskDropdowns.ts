import { useState } from 'react';

export function useCreateNewTaskDropdowns() {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const closeAllDropdowns = () => {
    setShowStatusDropdown(false);
    setShowPriorityDropdown(false);
  };

  return {
    showStatusDropdown,
    setShowStatusDropdown,
    showPriorityDropdown,
    setShowPriorityDropdown,
    closeAllDropdowns
  };
}
