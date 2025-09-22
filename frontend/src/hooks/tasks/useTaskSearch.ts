import { useState, useEffect, useCallback } from 'react';
import type { TodoTask } from '../../services/types';
import { taskService } from '../../services/TaskService';
import { useUser } from '../../contexts/UserContext';

export function useTaskSearch() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TodoTask[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Debounced search function
  const performSearch = useCallback(async (query: string) => {
    const trimmedQuery = query.trim();
    
    // Require minimum 2 characters to search
    if (!trimmedQuery || trimmedQuery.length < 2) {
      setSearchResults([]);
      setIsSearchActive(false);
      setSearchError(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setIsSearchActive(true);

    try {
      const results = await taskService.searchTasks(trimmedQuery, user?.id);
      setSearchResults(results);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Search failed';
      setSearchError(errorMessage);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [user?.id]);

  // Debounce search with 300ms delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchActive(false);
    setSearchError(null);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  }, [searchQuery, performSearch]);

  return {
    searchQuery,
    searchResults,
    isSearching,
    searchError,
    isSearchActive,
    handleSearchChange,
    clearSearch,
    handleSearchSubmit
  };
}
