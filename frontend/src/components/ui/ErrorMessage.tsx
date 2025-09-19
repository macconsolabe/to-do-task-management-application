interface ErrorMessageProps {
  error: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="mb-6 bg-white border border-red-200 text-red-800 px-6 py-4 rounded-2xl shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">⚠️</span>
        <span className="font-light">{error}</span>
      </div>
    </div>
  );
}
