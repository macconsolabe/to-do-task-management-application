interface FloatingAddButtonProps {
  onClick: () => void;
}

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <div className="fixed bottom-8 right-8">
      <button 
        className="w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl"
        style={{ backgroundColor: '#F4C430' }}
        onClick={onClick}
      >
        +
      </button>
    </div>
  );
}
