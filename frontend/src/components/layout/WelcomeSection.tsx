import { formatDate } from '../../utils/dateUtils';

export function WelcomeSection() {
  return (
    <div className="mb-8">
      <p className="text-gray-500 font-light mb-2">Welcome</p>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-light text-gray-900">Mac Developer</h2>
        <div className="text-right">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <span>📅</span>
            <span className="font-light">Today</span>
            <span style={{ color: '#F4C430' }}>▼</span>
          </div>
          <p className="text-gray-800 font-light">{formatDate()}</p>
        </div>
      </div>
    </div>
  );
}
