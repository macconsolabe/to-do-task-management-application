import { useEffect } from 'react';
import { useUserProfile } from '../../hooks/user/useUserProfile';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const {
    user,
    isEditing,
    isSaving,
    editData,
    error,
    startEditing,
    cancelEditing,
    saveProfile,
    updateEditData
  } = useUserProfile();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Start editing when modal opens
  useEffect(() => {
    if (isOpen && !isEditing) {
      startEditing();
    }
  }, [isOpen, isEditing, startEditing]);

  const handleSave = async () => {
    const success = await saveProfile();
    if (success) {
      onClose();
    }
  };

  const handleClose = () => {
    cancelEditing();
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="rounded-3xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden relative"
        style={{ 
          background: 'linear-gradient(145deg, #e8eaed 0%, #d1d5db 30%, #f1f3f4 70%, #e8eaed 100%)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.2)'
        }}
      >
        {/* Metallic reflection overlay */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.3) 100%)'
          }}
        ></div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium"
              style={{ background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-900">Edit Profile</h2>
              <p className="text-sm text-gray-500">Update your account information</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors text-lg"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <div 
            className="p-6 space-y-6"
            style={{ 
              background: 'linear-gradient(145deg, rgba(248,249,250,0.98) 0%, rgba(233,236,239,0.95) 50%, rgba(248,249,250,0.98) 100%)',
              backdropFilter: 'blur(5px)'
            }}
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={editData.name || ''}
                onChange={(e) => updateEditData('name', e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                style={{ borderColor: '#F4C430' }}
                placeholder="Enter your full name"
                maxLength={100}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={editData.email || ''}
                onChange={(e) => updateEditData('email', e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                style={{ borderColor: '#F4C430' }}
                placeholder="Enter your email address"
                maxLength={255}
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={editData.phoneNumber || ''}
                onChange={(e) => updateEditData('phoneNumber', e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                style={{ borderColor: '#F4C430' }}
                placeholder="Enter your phone number (optional)"
                maxLength={20}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="relative z-10 flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-6 py-3 text-sm font-medium text-gray-700 rounded-2xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.1)',
              '--tw-ring-color': '#F4C430'
            } as any}
          >
            {/* Metallic reflection overlay */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
              }}
            ></div>
            <span className="relative z-10">Cancel</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 text-sm font-medium text-white rounded-2xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)',
              '--tw-ring-color': '#F4C430'
            } as any}
          >
            {/* Metallic reflection overlay */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.1) 100%)'
              }}
            ></div>
            <div className="relative z-10 flex items-center gap-2">
              {isSaving && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
