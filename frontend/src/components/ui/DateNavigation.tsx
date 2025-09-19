interface DateNavigationProps {
  selectedDateString: string;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

export function DateNavigation({ 
  selectedDateString, 
  onPreviousDay, 
  onNextDay, 
  onToday 
}: DateNavigationProps) {
  return (
    <div 
      className="flex items-center justify-between p-4 rounded-2xl shadow-lg mb-6 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 4px 15px rgba(0,0,0,0.1)'
      }}
    >
      {/* Metallic reflection overlay */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
        }}
      ></div>
      
      <div className="relative z-10 flex items-center justify-between w-full">
        {/* Previous Day Button */}
        <button
          onClick={onPreviousDay}
          className="p-2 hover:bg-black hover:bg-opacity-5 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Date Display */}
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-800">{selectedDateString}</h2>
          <button
            onClick={onToday}
            className="text-sm text-gray-500 hover:text-yellow-600 transition-colors font-light"
            style={{ color: selectedDateString === 'Today' ? '#F4C430' : undefined }}
          >
            {selectedDateString === 'Today' ? 'Today' : 'Go to Today'}
          </button>
        </div>

        {/* Next Day Button */}
        <button
          onClick={onNextDay}
          className="p-2 hover:bg-black hover:bg-opacity-5 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
