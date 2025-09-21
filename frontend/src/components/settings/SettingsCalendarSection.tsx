import { useSettings } from '../../contexts/SettingsContext';

export function SettingsCalendarSection() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Calendar & Dates
      </h3>
      
      {/* Date Format */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Date Format</label>
        <div className="flex gap-3">
          {[
            { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
            { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (EU)' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateSettings({ 
                calendar: { ...settings.calendar, dateFormat: value as any } 
              })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                settings.calendar.dateFormat === value
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
              }`}
              style={settings.calendar.dateFormat === value ? {
                background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
              } : {}}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Week Start Day */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Week Starts On</label>
        <div className="flex gap-3">
          {[
            { value: 'sunday', label: 'Sunday' },
            { value: 'monday', label: 'Monday' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateSettings({ 
                calendar: { ...settings.calendar, weekStartDay: value as any } 
              })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                settings.calendar.weekStartDay === value
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
              }`}
              style={settings.calendar.weekStartDay === value ? {
                background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
              } : {}}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Overdue Highlighting */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Overdue Task Highlighting</label>
          <p className="text-xs text-gray-500">Highlight overdue tasks in red</p>
        </div>
        <button
          onClick={() => updateSettings({ 
            calendar: { ...settings.calendar, overdueHighlighting: !settings.calendar.overdueHighlighting } 
          })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.calendar.overdueHighlighting ? 'bg-yellow-400' : 'bg-gray-200'
          }`}
          style={{ backgroundColor: settings.calendar.overdueHighlighting ? '#F4C430' : undefined }}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.calendar.overdueHighlighting ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
