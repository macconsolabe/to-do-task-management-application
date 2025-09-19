export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Metallic Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(244, 196, 48, 0.25) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(233, 236, 239, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 40% 40%, rgba(248, 249, 250, 0.2) 0%, transparent 60%),
            radial-gradient(circle at 60% 10%, rgba(244, 196, 48, 0.15) 0%, transparent 40%),
            linear-gradient(135deg, #f0f2f5 0%, #e8eaed 25%, #f5f7fa 50%, #e8eaed 75%, #f0f2f5 100%)
          `,
          backgroundSize: '300% 300%',
          animation: 'metallicFlow 15s ease-in-out infinite'
        }}
      ></div>
      
      <div className="text-center relative z-10">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-6" style={{ borderColor: '#F4C430' }}></div>
        <p className="text-xl text-gray-700 font-light">Loading your tasks...</p>
      </div>
    </div>
  );
}
