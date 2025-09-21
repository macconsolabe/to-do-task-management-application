import { useSettings } from '../../contexts/SettingsContext';

export function SettingsTaskSection() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        Task Management
      </h3>
      
      {/* Default Priority */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Default Task Priority</label>
        <div className="flex gap-3">
          {[
            { value: 0, label: 'Low', icon: '☆' },
            { value: 1, label: 'Medium', icon: '☆' },
            { value: 2, label: 'High', icon: '★' }
          ].map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => updateSettings({ 
                tasks: { ...settings.tasks, defaultPriority: value as any } 
              })}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                settings.tasks.defaultPriority === value
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
              }`}
              style={settings.tasks.defaultPriority === value ? {
                background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
              } : {}}
            >
              <span className={value === 2 ? 'text-yellow-500' : 'text-gray-400'}>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Default Status */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Default Task Status</label>
        <div className="flex gap-3">
          {[
            { value: 0, label: 'To Do', color: '#F4C430' },
            { value: 1, label: 'In Progress', color: '#3B82F6' }
          ].map(({ value, label, color }) => (
            <button
              key={value}
              onClick={() => updateSettings({ 
                tasks: { ...settings.tasks, defaultStatus: value as any } 
              })}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                settings.tasks.defaultStatus === value
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
              }`}
              style={settings.tasks.defaultStatus === value ? {
                background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
              } : {}}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-complete with Subtasks */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Auto-complete Tasks</label>
          <p className="text-xs text-gray-500">Automatically mark task as complete when all subtasks are done</p>
        </div>
        <button
          onClick={() => updateSettings({ 
            tasks: { ...settings.tasks, autoCompleteWithSubtasks: !settings.tasks.autoCompleteWithSubtasks } 
          })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.tasks.autoCompleteWithSubtasks ? 'bg-yellow-400' : 'bg-gray-200'
          }`}
          style={{ backgroundColor: settings.tasks.autoCompleteWithSubtasks ? '#F4C430' : undefined }}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.tasks.autoCompleteWithSubtasks ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

    </div>
  );
}
