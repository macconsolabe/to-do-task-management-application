import { useTheme } from '../../hooks/ui/useTheme';

interface TaskTabsProps {
  activeTab: 'todo' | 'inprogress' | 'completed' | 'important';
  onTabChange: (tab: 'todo' | 'inprogress' | 'completed' | 'important') => void;
}

export function TaskTabs({ activeTab, onTabChange }: TaskTabsProps) {
  const { accentColor } = useTheme();
  
  const tabs = [
    { key: 'todo', label: 'To Do' },
    { key: 'inprogress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'important', label: 'Important' }
  ];

  return (
    <div className="flex gap-8 mb-6 border-b border-gray-200">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onTabChange(key as 'todo' | 'inprogress' | 'completed' | 'important')}
          className={`pb-3 px-1 font-light transition-colors ${
            activeTab === key 
              ? 'border-b-2 text-gray-900' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          style={{ 
            borderColor: activeTab === key ? accentColor : 'transparent',
            color: activeTab === key ? accentColor : undefined
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
