import { getPriorityLabel, getStatusLabel } from '../../utils/taskUtils';

interface FormData {
  title: string;
  description: string;
  priority: number;
  status: number;
  dueDate: string;
  manualProgress: number;
}

interface CreateNewTaskMetadataSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  showStatusDropdown: boolean;
  setShowStatusDropdown: (show: boolean) => void;
  showPriorityDropdown: boolean;
  setShowPriorityDropdown: (show: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CreateNewTaskMetadataSection({ 
  formData, 
  setFormData,
  showStatusDropdown, 
  setShowStatusDropdown,
  showPriorityDropdown, 
  setShowPriorityDropdown,
  onChange 
}: CreateNewTaskMetadataSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-3">
        {/* Status - exactly like TaskDetail but always in edit mode */}
        <div className="status-dropdown">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-500">Status</span>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="w-full px-3 py-2 border-2 border-yellow-400 rounded-lg focus:outline-none focus:border-yellow-500 text-left flex items-center justify-between bg-white"
              style={{ borderColor: '#F4C430' }}
            >
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  formData.status === 0 ? 'bg-yellow-400' :
                  formData.status === 1 ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <span className="font-light">{getStatusLabel(formData.status)}</span>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showStatusDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, status: 0 }));
                    setShowStatusDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 first:rounded-t-lg"
                >
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span className="font-light">To Do</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, status: 1 }));
                    setShowStatusDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-light">In Progress</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, status: 2 }));
                    setShowStatusDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 last:rounded-b-lg"
                >
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-light">Completed</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Priority */}
        <div className="priority-dropdown">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-500">Priority</span>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
              className="w-full px-3 py-2 border-2 border-yellow-400 rounded-lg focus:outline-none focus:border-yellow-500 text-left flex items-center justify-between bg-white"
              style={{ borderColor: '#F4C430' }}
            >
              <div className="flex items-center gap-2">
                <span className={formData.priority === 2 ? 'text-yellow-500' : 'text-gray-400'}>
                  {formData.priority === 2 ? '★' : '☆'}
                </span>
                <span className="font-light">{getPriorityLabel(formData.priority)}</span>
                {formData.priority === 2 && (
                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#F4C430', color: 'white' }}>
                    Important
                  </span>
                )}
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showPriorityDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, priority: 0 }));
                    setShowPriorityDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 first:rounded-t-lg"
                >
                  <span className="text-gray-400">☆</span>
                  <span className="font-light">Low</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, priority: 1 }));
                    setShowPriorityDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  <span className="text-gray-400">☆</span>
                  <span className="font-light">Medium</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, priority: 2 }));
                    setShowPriorityDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 last:rounded-b-lg"
                >
                  <span className="text-yellow-500">★</span>
                  <span className="font-light">High</span>
                  <span className="text-xs px-2 py-1 rounded-full ml-auto" style={{ backgroundColor: '#F4C430', color: 'white' }}>
                    Important
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {/* Due Date */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-500">Due Date</span>
          </div>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': '#F4C430' } as any}
          />
        </div>
      </div>
    </div>
  );
}
