import ezraLogo from '../../assets/ezralogo.png';

interface AIFloatingButtonProps {
  onClick: () => void;
}

export function AIFloatingButton({ onClick }: AIFloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center z-50 group"
      title="Chat with Ezra AI"
    >
      {/* Ezra Logo */}
      <img 
        src={ezraLogo} 
        alt="Ezra AI" 
        className="w-10 h-10 group-hover:animate-pulse rounded-full"
      />
      
      {/* Pulse animation ring */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75 animate-ping"></span>
    </button>
  );
}
