import { useState, useEffect, useRef } from 'react';
import ezraLogo from '../../assets/ezralogo.png';
import { useUser } from '../../contexts/UserContext';
import { useSettings } from '../../contexts/SettingsContext';
import { useHelp } from '../../contexts/HelpContext';
import { ProfileModal } from '../profile/ProfileModal';
import { NotificationToggle } from '../notifications/NotificationToggle';
import { SearchDropdown } from '../ui/SearchDropdown';
import { useTaskSearch } from '../../hooks/tasks/useTaskSearch';
import { useSearchDropdown } from '../../hooks/ui/useSearchDropdown';
import type { TodoTask } from '../../services/types';

interface HeaderProps {
  onCreateClick: () => void;
  onCalendarClick?: () => void;
  onProfileModalChange?: (isOpen: boolean) => void;
  // Task interaction handler for search dropdown
  onTaskClick?: (task: TodoTask) => void;
}

export function Header({ 
  onCreateClick, 
  onCalendarClick, 
  onProfileModalChange,
  onTaskClick
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  
  // Search functionality
  const { 
    searchQuery, 
    searchResults, 
    isSearching, 
    searchError, 
    handleSearchChange, 
    clearSearch 
  } = useTaskSearch();
  
  const { 
    isDropdownOpen, 
    searchInputRef, 
    closeDropdown, 
    handleSearchFocus, 
    handleSearchInput 
  } = useSearchDropdown();
  const { user, logout } = useUser();
  const { setIsSettingsOpen } = useSettings();
  const { setIsHelpOpen } = useHelp();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    if (showMenu || showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu, showProfileMenu]);

  // Get user initials for avatar
  const getUserInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    setShowProfileMenu(false);
  };

  // Handle profile edit
  const handleEditProfile = () => {
    setShowProfileModal(true);
    setShowProfileMenu(false);
    onProfileModalChange?.(true);
  };

  // Handle profile modal close
  const handleProfileModalClose = () => {
    setShowProfileModal(false);
    onProfileModalChange?.(false);
  };
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between p-6 z-40">
      
      <div className="relative z-10 flex items-center justify-between w-full">
        {/* Menu with 4 dots and logo */}
        <div className="flex items-center gap-3">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="grid grid-cols-2 gap-1 p-3 rounded-lg hover:bg-black hover:bg-opacity-10 transition-all duration-200 backdrop-blur-sm"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <div className="fixed top-20 left-6 w-48 rounded-xl shadow-xl overflow-hidden"
                style={{ 
                  zIndex: 9999,
                  background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 8px 25px rgba(0,0,0,0.15)'
                }}
              >
                {/* Metallic reflection overlay */}
                <div 
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
                  }}
                ></div>
                <div className="relative z-10">
                  <button
                    onClick={() => {
                      onCalendarClick?.();
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-black hover:bg-opacity-5 flex items-center gap-3 transition-colors first:rounded-t-xl"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 font-medium">Calendar</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsSettingsOpen(true);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-black hover:bg-opacity-5 flex items-center gap-3 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700 font-medium">Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsHelpOpen(true);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-black hover:bg-opacity-5 flex items-center gap-3 transition-colors last:rounded-b-xl"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-medium">Help</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div 
            className="w-12 h-10 rounded-lg flex items-center justify-center overflow-hidden"
            style={{ 
              background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <img 
              src={ezraLogo} 
              alt="Ezra Logo" 
              className="w-8 h-7 object-contain"
            />
          </div>
        </div>
        {/* Search Bar and Create Button */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl mx-8">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search tasks, descriptions, subtasks..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                handleSearchChange(value);
                handleSearchInput(value);
              }}
              onFocus={handleSearchFocus}
              className="w-full pl-10 pr-10 py-2 backdrop-blur-md border-2 border-gray-400 border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              style={{ 
                background: 'rgba(255, 255, 255, 0.4)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
                '--tw-ring-color': '#F4C430'
              } as any}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  clearSearch();
                  closeDropdown();
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            {/* Search Dropdown */}
            <SearchDropdown
              isOpen={isDropdownOpen && searchQuery.length >= 1}
              searchQuery={searchQuery}
              searchResults={searchResults}
              isSearching={isSearching}
              searchError={searchError}
              onTaskClick={(task) => {
                onTaskClick?.(task);
                closeDropdown();
              }}
              onClose={closeDropdown}
              searchInputRef={searchInputRef}
            />
          </div>
          <button 
            onClick={onCreateClick}
            className="px-4 py-2 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            style={{ 
              background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create
          </button>
        </div>
        
        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-3">
          <NotificationToggle />
          
          <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-200" 
            style={{ 
              background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {user ? (
              <span className="text-lg font-medium">{getUserInitials(user.name)}</span>
            ) : (
              <span className="text-xl">👤</span>
            )}
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && user && (
            <div className="fixed top-20 right-6 w-64 rounded-xl shadow-xl overflow-hidden"
              style={{ 
                zIndex: 9999,
                background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 8px 25px rgba(0,0,0,0.15)'
              }}
            >
              {/* Metallic reflection overlay */}
              <div 
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
                }}
              ></div>
              <div className="relative z-10">
                {/* User Info Section */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)' }}
                    >
                      {getUserInitials(user.name)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Options */}
                <div className="py-2">
                  <button
                    onClick={handleEditProfile}
                    className="w-full px-4 py-3 text-left hover:bg-black hover:bg-opacity-5 flex items-center gap-3 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-700 font-medium">Edit Profile</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center gap-3 transition-colors text-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={showProfileModal}
        onClose={handleProfileModalClose}
      />
    </div>
  );
}
