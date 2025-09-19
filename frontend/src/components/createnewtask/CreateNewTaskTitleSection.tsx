interface FormData {
  title: string;
  description: string;
  priority: number;
  status: number;
  dueDate: string;
  manualProgress: number;
}

interface CreateNewTaskTitleSectionProps {
  formData: FormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function CreateNewTaskTitleSection({ formData, errors, onChange }: CreateNewTaskTitleSectionProps) {
  return (
    <div>
      <h3 className="text-2xl font-light text-gray-900 mb-2">
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onChange}
          className={`w-full text-2xl font-light text-gray-900 bg-transparent border-b-2 border-yellow-400 focus:outline-none focus:border-yellow-500 ${
            errors.title ? 'border-red-400' : ''
          }`}
          style={{ borderColor: errors.title ? '#ef4444' : '#F4C430' }}
          placeholder="Enter task title..."
          maxLength={200}
        />
      </h3>
      {errors.title && (
        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
      )}
      
      {/* Description */}
      <div className="mt-3">
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={3}
          className={`w-full text-gray-700 font-light leading-relaxed bg-transparent border-2 border-yellow-400 rounded-lg p-2 focus:outline-none focus:border-yellow-500 resize-none ${
            errors.description ? 'border-red-400' : ''
          }`}
          style={{ borderColor: errors.description ? '#ef4444' : '#F4C430' }}
          placeholder="Add a description..."
          maxLength={1000}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
    </div>
  );
}
