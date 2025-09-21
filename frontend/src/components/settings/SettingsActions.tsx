import { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { useUser } from '../../contexts/UserContext';
import { apiService } from '../../services/api';

export function SettingsActions() {
  const { resetSettings } = useSettings();
  const { user, logout } = useUser();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleReset = () => {
    resetSettings();
    // Could add a notification here if desired
  };

  const handleDeleteProfile = async () => {
    if (!user) return;
    
    try {
      await apiService.deleteUser(user.id);
      await logout(); // This will clear local storage and redirect to user selection
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete profile:', error);
      // Could add error notification here
    }
  };

  return (
    <div className="pt-6 border-t border-gray-200 space-y-4">
      {/* Reset Settings Button */}
      <button
        onClick={handleReset}
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
        <span className="relative z-10">Reset Settings to Defaults</span>
      </button>

      {/* Delete Profile Button */}
      <div className="pt-4 border-t border-red-100">
        <div className="mb-3">
          <h4 className="text-sm font-medium text-red-700 mb-1">Danger Zone</h4>
          <p className="text-xs text-red-600">This action cannot be undone</p>
        </div>
        
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
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
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Profile
            </span>
          </button>
        ) : (
          <div className="space-y-3">
            <div className="bg-red-50 p-4 rounded-2xl border border-red-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h5 className="font-medium text-red-800">Delete Profile & All Data</h5>
                  <p className="text-sm text-red-600 mt-1">
                    This will permanently delete your account ({user?.email}) and all your tasks. 
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfile}
                className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                style={{ 
                  background: 'linear-gradient(145deg, #EF4444 0%, #DC2626 50%, #EF4444 100%)'
                }}
              >
                Yes, Delete Everything
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
