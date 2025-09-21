export function HelpShortcuts() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-medium text-gray-900 mb-4">Tips & Shortcuts</h3>
        <p className="text-gray-600 font-light">Master these shortcuts and tips to use eTask more efficiently.</p>
      </div>

      {/* Keyboard shortcuts */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
          Keyboard Shortcuts
        </h4>
        <div className="bg-gray-50 p-4 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 className="font-medium text-gray-800">Editing Tasks</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Save changes</span>
                  <kbd className="px-2 py-1 bg-white rounded border text-xs font-mono">Enter</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cancel editing</span>
                  <kbd className="px-2 py-1 bg-white rounded border text-xs font-mono">Escape</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Save description</span>
                  <kbd className="px-2 py-1 bg-white rounded border text-xs font-mono">Ctrl + Enter</kbd>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="font-medium text-gray-800">Adding Subtasks</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Add subtask</span>
                  <kbd className="px-2 py-1 bg-white rounded border text-xs font-mono">Enter</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cancel adding</span>
                  <kbd className="px-2 py-1 bg-white rounded border text-xs font-mono">Escape</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Actions
        </h4>
        <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
              <div>
                <strong>Click outside modals:</strong> Close any open modal or dialog instantly
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
              <div>
                <strong>Three-dot menu:</strong> Access quick actions like mark complete, toggle importance, delete
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
              <div>
                <strong>Status buttons:</strong> Click directly on task status indicators to change them quickly
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
              <div>
                <strong>Calendar integration:</strong> Click on due dates to see tasks in calendar context
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bulk operations */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Efficient Task Management
        </h4>
        <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
              <div>
                <strong>Filter by tabs:</strong> Use To Do, In Progress, Completed, and Important tabs to focus
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
              <div>
                <strong>Auto-save:</strong> All changes are saved automatically - no need to click save buttons
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
              <div>
                <strong>Inline editing:</strong> Click on any text field to edit directly in task details
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
              <div>
                <strong>Smart notifications:</strong> Get specific feedback for every action you take
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
