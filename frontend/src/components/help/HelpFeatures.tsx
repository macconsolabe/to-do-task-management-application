export function HelpFeatures() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-medium text-gray-900 mb-4">Features Overview</h3>
        <p className="text-gray-600 font-light">Discover all the powerful features that make eTask the perfect task management solution.</p>
      </div>

      {/* Working with subtasks */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Working with Subtasks
        </h4>
        <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
          <p className="text-gray-600">Break down complex tasks into manageable steps:</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Add subtasks when creating a new task or editing existing ones
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Check off subtasks as you complete them
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Progress automatically calculates based on completed subtasks
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Edit or delete subtasks by hovering over them
            </li>
          </ul>
        </div>
      </div>

      {/* Setting priorities and due dates */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Setting Priorities and Due Dates
        </h4>
        <div className="bg-gray-50 p-4 rounded-2xl space-y-4">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Priority Levels:</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">☆</span>
                <span className="text-sm text-gray-600"><strong>Low:</strong> Nice to have, no rush</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">☆</span>
                <span className="text-sm text-gray-600"><strong>Medium:</strong> Standard priority</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600"><strong>High (Important):</strong> Urgent, high priority</span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Due Dates:</h5>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Set due dates to track deadlines</li>
              <li>• Overdue tasks are highlighted in red</li>
              <li>• Use the calendar to see tasks by date</li>
              <li>• Due dates are optional but recommended</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Using the progress tracking */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Using Progress Tracking
        </h4>
        <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
          <p className="text-gray-600">eTask offers two types of progress tracking:</p>
          <div className="space-y-3">
            <div>
              <h5 className="font-medium text-gray-800">Automatic Progress (with Subtasks)</h5>
              <p className="text-sm text-gray-600">When you add subtasks, progress is calculated automatically based on completed subtasks.</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-800">Manual Progress (without Subtasks)</h5>
              <p className="text-sm text-gray-600">For tasks without subtasks, drag the progress bar to set completion percentage manually.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Email & SMS Reminders */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email & SMS Reminders
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-normal">Production Feature</span>
        </h4>
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
          <h5 className="font-medium text-blue-800 mb-2">Available in Production Deployment:</h5>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• <strong>Email Reminders:</strong> Daily digest and due date notifications</li>
            <li>• <strong>SMS Alerts:</strong> Urgent task reminders via text message</li>
            <li>• <strong>Customizable Timing:</strong> Choose when to receive daily summaries</li>
            <li>• <strong>Smart Filtering:</strong> Only get notified about relevant tasks</li>
          </ul>
          <p className="text-xs text-blue-600 mt-3 italic">
            Production implementation would integrate with SendGrid (email) and Twilio (SMS) APIs
          </p>
        </div>
      </div>
    </div>
  );
}
