export function HelpAbout() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-medium text-gray-900 mb-4">About eTask</h3>
        <p className="text-gray-600 font-light">Learn more about eTask and get support information.</p>
      </div>

      {/* App version and build info */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Version Information
        </h4>
        <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">App Version:</span>
              <p className="text-gray-600">1.0.0</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Build Date:</span>
              <p className="text-gray-600">September 2025</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Frontend:</span>
              <p className="text-gray-600">React 18 + TypeScript</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Backend:</span>
              <p className="text-gray-600">.NET Core 8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Credits/attribution */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Credits & Attribution
        </h4>
        <div className="bg-gray-50 p-4 rounded-2xl space-y-4">
          <div>
            <p className="text-gray-600 mb-3">Built with ❤️ for Ezra's Full Stack Developer Assessment</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Developer:</strong> Mac Consolabe</p>
              <p><strong>Design System:</strong> Custom metallic theme with golden accents</p>
              <p><strong>Icons:</strong> Heroicons and Lucide React</p>
              <p><strong>Fonts:</strong> System fonts for optimal performance</p>
              <p><strong>Architecture:</strong> Clean DTO pattern (backend) + SOC pattern (frontend)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact information */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Support & Contact
        </h4>
        <div className="bg-gray-50 p-4 rounded-2xl space-y-4">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Need Help?</h5>
            <p className="text-sm text-gray-600 mb-3">If you encounter any issues or have suggestions for improvement:</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Check the browser console for error messages</p>
              <p>• Refresh the page to resolve temporary issues</p>
              <p>• Clear browser cache if experiencing persistent problems</p>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Technical Specifications</h5>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Requires modern browser with JavaScript enabled</p>
              <p>• Optimized for Chrome, Firefox, Safari, and Edge</p>
              <p>• Mobile-responsive design for all device sizes</p>
              <p>• Data stored locally and in SQLite database</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          eTask - Smart Task Management Application
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Demonstrating modern web development practices and clean architecture
        </p>
      </div>
    </div>
  );
}
