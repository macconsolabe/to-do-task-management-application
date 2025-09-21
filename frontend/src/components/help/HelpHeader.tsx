interface HelpHeaderProps {
  onClose: () => void;
}

export function HelpHeader({ onClose }: HelpHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium"
          style={{ background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-900">Help & Support</h2>
          <p className="text-sm text-gray-500">Learn how to use eTask effectively</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors text-lg"
      >
        ×
      </button>
    </div>
  );
}
