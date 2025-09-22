import { useState, useEffect } from 'react';
import type { TodoTask, CreateTaskDto, UpdateTaskDto } from '../../services/types';
import { useSettings } from '../../contexts/SettingsContext';

interface FormData {
  title: string;
  description: string;
  priority: number;
  status: number;
  dueDate: string;
  manualProgress: number;
}

interface UseCreateNewTaskStateProps {
  task?: TodoTask;
  isOpen: boolean;
  onSubmit: (data: CreateTaskDto | UpdateTaskDto) => Promise<void>;
  onClose: () => void;
}

export function useCreateNewTaskState({ task, isOpen, onSubmit, onClose }: UseCreateNewTaskStateProps) {
  const { settings } = useSettings();
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    priority: settings.tasks.defaultPriority,
    status: settings.tasks.defaultStatus,
    dueDate: '',
    manualProgress: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data when task or modal state changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        manualProgress: task.manualProgress || 0
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: settings.tasks.defaultPriority,
        status: settings.tasks.defaultStatus,
        dueDate: '',
        manualProgress: 0
      });
    }
    setErrors({});
  }, [task, isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      
      // Apply scroll lock smoothly
      document.body.style.overflow = 'hidden';
      
      // Cleanup function
      return () => {
        // Restore original overflow value
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }
    
    if (formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const submitData = task ? {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        dueDate: formData.dueDate || undefined,
        status: formData.status
      } : {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        dueDate: formData.dueDate || undefined,
        userId: 0 // Will be set by the calling component
      };
      
      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error('Failed to submit task:', error);
      setErrors({ submit: 'Failed to save task. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    errors,
    handleChange,
    handleSubmit
  };
}
