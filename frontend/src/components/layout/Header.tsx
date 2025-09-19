export function Header() {
  return (
    <div className="flex items-center justify-between p-6 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-8 h-1 bg-gray-800 rounded-full"></div>
        <div className="w-8 h-1 bg-gray-800 rounded-full mt-1"></div>
        <div className="w-8 h-1 bg-gray-800 rounded-full mt-2"></div>
      </div>
      <h1 className="text-2xl font-light text-gray-900">eTask</h1>
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#F4C430' }}>
        <span className="text-xl">👤</span>
      </div>
    </div>
  );
}
