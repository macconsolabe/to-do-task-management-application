interface TaskTabsProps {
  activeTab: 'todo' | 'important' | 'notes' | 'completed';
  onTabChange: (tab: 'todo' | 'important' | 'notes' | 'completed') => void;
}

export function TaskTabs({ activeTab, onTabChange }: TaskTabsProps) {
  const tabs = [
    { key: 'todo', label: 'To-Do' },
    { key: 'important', label: 'Important' },
    { key: 'notes', label: 'Notes' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex gap-8 mb-6 border-b border-gray-200">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onTabChange(key as 'todo' | 'important' | 'notes' | 'completed')}
          className={`pb-3 px-1 font-light transition-colors ${
            activeTab === key 
              ? 'border-b-2 text-gray-900' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          style={{ 
            borderColor: activeTab === key ? '#F4C430' : 'transparent',
            color: activeTab === key ? '#F4C430' : undefined
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
