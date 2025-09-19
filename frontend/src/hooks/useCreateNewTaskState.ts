import { useState, useEffect } from 'react';
import type { TodoTask, CreateTaskDto, UpdateTaskDto } from '../services/api';

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
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    priority: 1,
    status: 0,
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
        priority: 1,
        status: 0,
        dueDate: '',
        manualProgress: 0
      });
    }
    setErrors({});
  }, [task, isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
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
      const submitData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        dueDate: formData.dueDate || undefined,
        ...(task && { status: formData.status })
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
