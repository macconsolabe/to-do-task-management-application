import { useState, useEffect, useRef } from 'react';
import ezraLogo from '../../assets/ezralogo.png';

interface HeaderProps {
  onCreateClick: () => void;
  onCalendarClick?: () => void;
}

export function Header({ onCreateClick, onCalendarClick }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);
  return (
    <div className="flex items-center justify-between p-6 relative z-40">
      
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
                      // Future: Add settings functionality
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
                      // Future: Add help functionality
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
        <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 backdrop-blur-md border-2 border-gray-400 border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              style={{ 
                background: 'rgba(255, 255, 255, 0.4)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
                '--tw-ring-color': '#F4C430'
              } as any}
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
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white" 
          style={{ 
            background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <span className="text-xl">👤</span>
        </div>
      </div>
    </div>
  );
}
