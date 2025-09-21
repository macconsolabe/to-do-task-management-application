interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ 
  isOpen, 
  title, 
  message, 
  confirmText = 'OK', 
  cancelText = 'Cancel',
  onConfirm, 
  onCancel 
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
      onClick={onCancel}
    >
      <div 
        className="rounded-3xl shadow-xl w-full max-w-md relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Metallic reflection overlay */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.3) 100%)'
          }}
        ></div>
        
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 font-light">{message}</p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-6 py-3 text-sm font-medium text-gray-700 rounded-2xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.1)',
                '--tw-ring-color': '#9CA3AF'
              } as any}
            >
              {/* Metallic reflection overlay */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.1) 100%)'
                }}
              ></div>
              <span className="relative z-10">{cancelText}</span>
            </button>
            
            <button
              onClick={onConfirm}
              className="px-6 py-3 text-sm font-medium text-white rounded-2xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(145deg, #EF4444 0%, #DC2626 50%, #EF4444 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)',
                '--tw-ring-color': '#EF4444'
              } as any}
            >
              {/* Metallic reflection overlay */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.1) 100%)'
                }}
              ></div>
              <span className="relative z-10">{confirmText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
