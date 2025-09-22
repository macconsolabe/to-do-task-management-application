import { useState } from 'react';
import type { CreateUserDto } from '../../services/types';
import { useUser } from '../../contexts/UserContext';

type OnboardingStep = 'intro' | 'name' | 'email' | 'phoneNumber' | 'complete';

interface OnboardingData {
  name: string;
  email: string;
  phoneNumber: string;
}

export function useWelcomeOnboarding() {
  const { createUser } = useUser();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('intro');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    name: '',
    email: '',
    phoneNumber: ''
  });

  // Validation functions
  const validateName = (name: string): string | null => {
    if (!name.trim()) return 'Name is required';
    if (name.length > 100) return 'Name must be less than 100 characters';
    return null;
  };

  const validateEmail = (email: string): string | null => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format';
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    if (phone && phone.length > 20) return 'Phone number must be less than 20 characters';
    return null;
  };

  // Step navigation with animation
  const goToNextStep = async (field?: keyof OnboardingData, value?: string) => {
    // Update data if provided
    if (field && value !== undefined) {
      setOnboardingData(prev => ({ ...prev, [field]: value }));
    }

    // Validate current step
    let error: string | null = null;
    switch (currentStep) {
      case 'name':
        error = validateName(value || onboardingData.name);
        break;
      case 'email':
        error = validateEmail(value || onboardingData.email);
        break;
      case 'phoneNumber':
        error = validatePhone(value || onboardingData.phoneNumber);
        break;
    }

    if (error) {
      setErrors({ [field || currentStep]: error });
      return;
    }

    // Clear errors and animate to next step
    setErrors({});
    setIsAnimating(true);
    
    setTimeout(() => {
      switch (currentStep) {
        case 'intro':
          setCurrentStep('name');
          break;
        case 'name':
          setCurrentStep('email');
          break;
        case 'email':
          setCurrentStep('phoneNumber');
          break;
        case 'phoneNumber':
          completeOnboarding();
          break;
      }
      setIsAnimating(false);
    }, 300); // Fade animation duration
  };

  // Complete onboarding and create user
  const completeOnboarding = async () => {
    try {
      setIsSubmitting(true);
      
      const userData: CreateUserDto = {
        name: onboardingData.name.trim(),
        email: onboardingData.email.trim(),
        phoneNumber: onboardingData.phoneNumber.trim() || undefined
      };

      await createUser(userData);
      setCurrentStep('complete');
      
      // Transition to main app after a brief delay
      setTimeout(() => {
        // This will be handled by the parent component
      }, 2000);
      
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
      setErrors({ submit: 'Failed to create account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update onboarding data
  const updateData = (field: keyof OnboardingData, value: string) => {
    setOnboardingData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Reset onboarding (for testing)
  const resetOnboarding = () => {
    setCurrentStep('intro');
    setOnboardingData({ name: '', email: '', phoneNumber: '' });
    setErrors({});
    setIsAnimating(false);
    setIsSubmitting(false);
  };

  return {
    currentStep,
    onboardingData,
    errors,
    isAnimating,
    isSubmitting,
    goToNextStep,
    updateData,
    resetOnboarding,
    validateName,
    validateEmail,
    validatePhone
  };
}
