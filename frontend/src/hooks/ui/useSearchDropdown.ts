import { useState, useCallback, useRef } from 'react';

export function useSearchDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const openDropdown = useCallback(() => {
    setIsDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  // Open dropdown when user starts typing
  const handleSearchFocus = useCallback(() => {
    openDropdown();
  }, [openDropdown]);

  // Keep dropdown open while typing
  const handleSearchInput = useCallback((query: string) => {
    if (query.trim().length >= 1) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }, [openDropdown, closeDropdown]);

  return {
    isDropdownOpen,
    searchInputRef,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    handleSearchFocus,
    handleSearchInput
  };
}
