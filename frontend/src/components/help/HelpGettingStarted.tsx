export function HelpGettingStarted() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-medium text-gray-900 mb-4">Getting Started</h3>
        <p className="text-gray-600 font-light">Welcome to eTask! Here's everything you need to know to get started with managing your tasks effectively.</p>
      </div>

      {/* How to create your first task */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          How to Create Your First Task
        </h4>
        <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-white rounded-full flex items-center justify-center text-sm font-medium">1</span>
            <div>
              <p className="font-medium text-gray-800">Click the "+" button</p>
              <p className="text-sm text-gray-600">Found in the top-right corner of the header</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-white rounded-full flex items-center justify-center text-sm font-medium">2</span>
            <div>
              <p className="font-medium text-gray-800">Fill in task details</p>
              <p className="text-sm text-gray-600">Add title, description, priority, and due date</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-white rounded-full flex items-center justify-center text-sm font-medium">3</span>
            <div>
              <p className="font-medium text-gray-800">Add subtasks (optional)</p>
              <p className="text-sm text-gray-600">Break down your task into smaller, manageable steps</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-white rounded-full flex items-center justify-center text-sm font-medium">4</span>
            <div>
              <p className="font-medium text-gray-800">Click "Create Task"</p>
              <p className="text-sm text-gray-600">Your task will be saved and appear in the task list</p>
            </div>
          </div>
        </div>
      </div>

      {/* Understanding task statuses */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Understanding Task Statuses
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="font-medium text-gray-800">To Do</span>
            </div>
            <p className="text-sm text-gray-600">Tasks that haven't been started yet. This is the default status for new tasks.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="font-medium text-gray-800">In Progress</span>
            </div>
            <p className="text-sm text-gray-600">Tasks you're currently working on. Move tasks here when you start them.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-medium text-gray-800">Completed</span>
            </div>
            <p className="text-sm text-gray-600">Finished tasks. They'll show 100% progress and move to the Completed tab.</p>
          </div>
        </div>
      </div>

      {/* Using the calendar view */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Using the Calendar View
        </h4>
        <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
          <p className="text-gray-600">The calendar view helps you visualize your tasks by date:</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              Click the calendar icon in the header to open the full calendar
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              Switch between Day, Week, and Month views
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              Click on any task in the calendar to view its details
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              Use "See in Calendar" from task details to jump to specific dates
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
