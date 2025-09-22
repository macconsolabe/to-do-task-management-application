import { useRef, useEffect } from 'react';
import type { TodoTask } from '../../services/types';
import { CompactSearchCard } from './CompactSearchCard';

interface SearchDropdownProps {
  isOpen: boolean;
  searchQuery: string;
  searchResults: TodoTask[];
  isSearching: boolean;
  searchError: string | null;
  onTaskClick: (task: TodoTask) => void;
  onClose: () => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export function SearchDropdown({
  isOpen,
  searchQuery,
  searchResults,
  isSearching,
  searchError,
  onTaskClick,
  onClose,
  searchInputRef
}: SearchDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef?.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, searchInputRef]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Dropdown */}
      <div
        ref={dropdownRef}
        className="absolute top-full left-0 right-0 mt-1 z-50 rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto"
        style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
      >
        {/* Header */}
        <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs font-medium text-gray-700">
                Search results for "{searchQuery}"
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="py-1">
          {isSearching ? (
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="text-xs text-gray-600">Searching...</span>
              </div>
            </div>
          ) : searchError ? (
            <div className="flex items-center justify-center py-4">
              <div className="text-center">
                <svg className="w-8 h-8 text-red-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-red-600 font-medium">Search Error</p>
                <p className="text-xs text-gray-500">{searchError}</p>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="flex items-center justify-center py-4">
              <div className="text-center">
                <svg className="w-8 h-8 text-gray-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-xs text-gray-600 font-medium">No tasks found</p>
                <p className="text-xs text-gray-500">
                  Try different keywords
                </p>
              </div>
            </div>
          ) : (
            <div>
              {/* Results count */}
              <div className="px-3 py-1 text-xs text-gray-500 font-medium border-b border-gray-100">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </div>
              
              {/* Results */}
              <div className="max-h-64 overflow-y-auto">
                {searchResults.slice(0, 10).map((task) => (
                  <CompactSearchCard
                    key={task.id}
                    task={task}
                    onTaskClick={(task) => {
                      onTaskClick(task);
                      onClose();
                    }}
                  />
                ))}
              </div>
              
              {/* View all results link */}
              {searchResults.length > 10 && (
                <div className="px-3 py-2 border-t border-gray-200 bg-gray-50">
                  <button
                    onClick={onClose}
                    className="w-full text-center text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all {searchResults.length} results
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
