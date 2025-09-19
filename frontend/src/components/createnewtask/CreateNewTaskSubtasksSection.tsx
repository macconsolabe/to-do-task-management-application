interface CreateNewTaskSubtasksSectionProps {
  subtasks: string[];
  newSubtaskTitle: string;
  setNewSubtaskTitle: (title: string) => void;
  addSubtask: () => void;
  removeSubtask: (index: number) => void;
  handleSubtaskKeyDown: (e: React.KeyboardEvent) => void;
}

export function CreateNewTaskSubtasksSection({ 
  subtasks, 
  newSubtaskTitle, 
  setNewSubtaskTitle, 
  addSubtask, 
  removeSubtask, 
  handleSubtaskKeyDown 
}: CreateNewTaskSubtasksSectionProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-medium text-gray-800">Subtasks ({subtasks.length})</h4>
        <span className="text-xs text-gray-500">Optional - enables automatic progress</span>
      </div>
      
      {/* Existing Subtasks */}
      {subtasks.length > 0 && (
        <div className="space-y-2 mb-3">
          {subtasks.map((subtask, index) => (
            <div key={index} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors group">
              <div className="w-5 h-5 rounded border-2 border-gray-300"></div>
              <span className="flex-1 text-gray-800">{subtask}</span>
              <button
                type="button"
                onClick={() => removeSubtask(index)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Add New Subtask */}
      <div className="flex items-center gap-3 p-2 bg-gray-100 rounded-lg">
        <div className="w-5 h-5 rounded border-2 border-gray-300"></div>
        <input
          type="text"
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          onKeyDown={handleSubtaskKeyDown}
          placeholder="Add a subtask..."
          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:border-transparent"
          style={{ '--tw-ring-color': '#F4C430' } as any}
        />
        <button
          type="button"
          onClick={addSubtask}
          disabled={!newSubtaskTitle.trim()}
          className="p-1 text-green-600 hover:text-green-700 transition-colors disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
      
      {subtasks.length > 0 && (
        <p className="text-sm text-gray-600 font-light mt-2">
          Progress will be calculated automatically based on completed subtasks
        </p>
      )}
    </div>
  );
}
