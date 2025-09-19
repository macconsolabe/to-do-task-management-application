export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#faf9f7' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-6" style={{ borderColor: '#F4C430' }}></div>
        <p className="text-xl text-gray-700 font-light">Loading your tasks...</p>
      </div>
    </div>
  );
}
