import { useSettings } from '../../contexts/SettingsContext';

export function SettingsNotificationSection() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 19.462A8.978 8.978 0 003 15a9 9 0 0118 0 8.978 8.978 0 00-1.868 4.462M7 15a5 5 0 1110 0v1a3 3 0 11-6 0v-1z" />
        </svg>
        Notification Settings
      </h3>
      
      {/* Auto-save Notifications */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Auto-save Notifications</label>
          <p className="text-xs text-gray-500">Show notifications when changes are saved automatically</p>
        </div>
        <button
          onClick={() => updateSettings({ 
            notifications: { ...settings.notifications, autoSaveEnabled: !settings.notifications.autoSaveEnabled } 
          })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.notifications.autoSaveEnabled ? 'bg-yellow-400' : 'bg-gray-200'
          }`}
          style={{ backgroundColor: settings.notifications.autoSaveEnabled ? '#F4C430' : undefined }}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.autoSaveEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Notification Duration */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Notification Duration</label>
        <div className="flex gap-3">
          {[
            { value: 2000, label: '2 seconds' },
            { value: 3000, label: '3 seconds' },
            { value: 5000, label: '5 seconds' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateSettings({ 
                notifications: { ...settings.notifications, duration: value as any } 
              })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                settings.notifications.duration === value
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
              }`}
              style={settings.notifications.duration === value ? {
                background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
              } : {}}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Sound Notifications */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Sound Notifications</label>
          <p className="text-xs text-gray-500">Play sound when notifications appear</p>
        </div>
        <button
          onClick={() => updateSettings({ 
            notifications: { ...settings.notifications, soundEnabled: !settings.notifications.soundEnabled } 
          })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.notifications.soundEnabled ? 'bg-yellow-400' : 'bg-gray-200'
          }`}
          style={{ backgroundColor: settings.notifications.soundEnabled ? '#F4C430' : undefined }}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.soundEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-md font-medium text-gray-800 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          External Reminders
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-normal">Production Feature</span>
        </h4>
      </div>

      {/* Email Reminders */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Email Reminders</label>
          <p className="text-xs text-gray-500">Send email notifications for due dates and daily digest</p>
        </div>
        <button
          onClick={() => updateSettings({ 
            notifications: { ...settings.notifications, emailReminders: !settings.notifications.emailReminders } 
          })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.notifications.emailReminders ? 'bg-yellow-400' : 'bg-gray-200'
          }`}
          style={{ backgroundColor: settings.notifications.emailReminders ? '#F4C430' : undefined }}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.emailReminders ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* SMS Reminders */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">SMS Reminders</label>
          <p className="text-xs text-gray-500">Send text message reminders for urgent tasks</p>
        </div>
        <button
          onClick={() => updateSettings({ 
            notifications: { ...settings.notifications, smsReminders: !settings.notifications.smsReminders } 
          })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.notifications.smsReminders ? 'bg-yellow-400' : 'bg-gray-200'
          }`}
          style={{ backgroundColor: settings.notifications.smsReminders ? '#F4C430' : undefined }}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.smsReminders ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Daily Digest */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Daily Task Digest</label>
          <p className="text-xs text-gray-500">Daily summary of pending tasks and upcoming due dates</p>
        </div>
        <button
          onClick={() => updateSettings({ 
            notifications: { ...settings.notifications, dailyDigest: !settings.notifications.dailyDigest } 
          })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.notifications.dailyDigest ? 'bg-yellow-400' : 'bg-gray-200'
          }`}
          style={{ backgroundColor: settings.notifications.dailyDigest ? '#F4C430' : undefined }}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.dailyDigest ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Due Date Reminders */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Due Date Reminders</label>
          <p className="text-xs text-gray-500">Get notified 24 hours before tasks are due</p>
        </div>
        <button
          onClick={() => updateSettings({ 
            notifications: { ...settings.notifications, dueDateReminders: !settings.notifications.dueDateReminders } 
          })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.notifications.dueDateReminders ? 'bg-yellow-400' : 'bg-gray-200'
          }`}
          style={{ backgroundColor: settings.notifications.dueDateReminders ? '#F4C430' : undefined }}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.dueDateReminders ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Reminder Time */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Daily Digest Time</label>
        <div className="flex gap-3">
          {[
            { value: '09:00', label: '9:00 AM' },
            { value: '12:00', label: '12:00 PM' },
            { value: '18:00', label: '6:00 PM' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateSettings({ 
                notifications: { ...settings.notifications, reminderTime: value as any } 
              })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                settings.notifications.reminderTime === value
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
              }`}
              style={settings.notifications.reminderTime === value ? {
                background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
              } : {}}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Email/SMS notifications available in production deployment
        </p>
      </div>
    </div>
  );
}
