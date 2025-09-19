interface HeaderProps {
  onCreateClick: () => void;
}

export function Header({ onCreateClick }: HeaderProps) {
  return (
    <div 
      className="flex items-center justify-between p-6 shadow-lg relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 4px 15px rgba(0,0,0,0.1)'
      }}
    >
      {/* Metallic reflection overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
        }}
      ></div>
      
      <div className="relative z-10 flex items-center justify-between w-full">
        {/* Menu with 4 dots and logo */}
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-2 gap-1 p-2">
            <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
          </div>
          <div className="px-3 py-2 rounded-lg flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: '#F4C430' }}>
            eTask
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
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              style={{ '--tw-ring-color': '#F4C430' } as any}
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
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#F4C430' }}>
          <span className="text-xl">👤</span>
        </div>
      </div>
    </div>
  );
}
