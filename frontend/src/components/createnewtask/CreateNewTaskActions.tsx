import type { TodoTask } from '../../services/types';

import { useTheme } from '../../hooks/ui/useTheme';

interface CreateNewTaskActionsProps {
  task?: TodoTask;
  isSubmitting: boolean;
  onClose: () => void;
}

export function CreateNewTaskActions({ task, isSubmitting, onClose }: CreateNewTaskActionsProps) {
  const { accentGradient, reflectionOverlay } = useTheme();
  return (
    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
      <button
        type="button"
        onClick={onClose}
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
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 text-sm font-medium text-white rounded-2xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 relative overflow-hidden"
        style={{ 
          background: accentGradient,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        {/* Metallic reflection overlay */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: reflectionOverlay
          }}
        ></div>
        <div className="relative z-10 flex items-center gap-2">
          {isSubmitting && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {isSubmitting ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
        </div>
      </button>
    </div>
  );
}
