import { useSettings } from '../../contexts/SettingsContext';

export function SettingsThemeSection() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
        Theme Preferences
      </h3>
      
      {/* Theme Intensity */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Metallic Theme Intensity</label>
        <div className="flex gap-3">
          {['subtle', 'normal', 'enhanced'].map((intensity) => (
            <button
              key={intensity}
              onClick={() => updateSettings({ theme: { ...settings.theme, intensity: intensity as any } })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                settings.theme.intensity === intensity
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
              }`}
              style={settings.theme.intensity === intensity ? {
                background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
              } : {}}
            >
              {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Color Accent */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Color Accent</label>
        <div className="flex gap-3">
          {[
            { key: 'golden', color: '#F4C430', name: 'Golden' },
            { key: 'silver', color: '#C0C0C0', name: 'Silver' },
            { key: 'copper', color: '#B87333', name: 'Copper' }
          ].map(({ key, color, name }) => (
            <button
              key={key}
              onClick={() => updateSettings({ theme: { ...settings.theme, colorAccent: key as any } })}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                settings.theme.colorAccent === key
                  ? 'bg-gray-100 ring-2'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              style={{ 
                '--tw-ring-color': settings.theme.colorAccent === key ? color : undefined 
              } as any}
            >
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
