import { useWelcomeOnboarding } from '../../hooks/user/useWelcomeOnboarding';
import { WelcomeIntro } from './WelcomeIntro';
import { WelcomeStepName } from './WelcomeStepName';
import { WelcomeStepEmail } from './WelcomeStepEmail';
import { WelcomeStepPhone } from './WelcomeStepPhone';
import { WelcomeComplete } from './WelcomeComplete';

interface WelcomeOnboardingProps {
  onComplete: () => void;
}

export function WelcomeOnboarding({ onComplete }: WelcomeOnboardingProps) {
  const {
    currentStep,
    onboardingData,
    errors,
    isAnimating,
    isSubmitting,
    goToNextStep,
    updateData
  } = useWelcomeOnboarding();

  // Handle step transitions
  const handleNameNext = (name: string) => {
    updateData('name', name);
    goToNextStep('name', name);
  };

  const handleEmailNext = (email: string) => {
    updateData('email', email);
    goToNextStep('email', email);
  };

  const handlePhoneStart = (phone: string) => {
    updateData('phoneNumber', phone);
    goToNextStep('phoneNumber', phone);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
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
      >
        {/* Floating Metallic Particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-40"
              style={{
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                background: i % 4 === 0 ? '#F4C430' : i % 4 === 1 ? '#e6b800' : i % 4 === 2 ? '#d1d5db' : '#f8f9fa',
                boxShadow: i % 2 === 0 ? '0 0 10px rgba(244, 196, 48, 0.3)' : '0 0 8px rgba(233, 236, 239, 0.4)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float${i % 3} ${10 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Enhanced Geometric Patterns */}
        <div className="absolute inset-0 opacity-15">
          <div 
            className="absolute w-96 h-96 rounded-full"
            style={{
              top: '10%',
              left: '15%',
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(244, 196, 48, 0.1) 25%, transparent 50%, rgba(233, 236, 239, 0.1) 75%, transparent 100%)',
              animation: 'rotate 40s linear infinite'
            }}
          ></div>
          <div 
            className="absolute w-64 h-64 rounded-full"
            style={{
              bottom: '20%',
              right: '20%',
              background: 'conic-gradient(from 180deg, transparent 0%, rgba(244, 196, 48, 0.15) 30%, transparent 60%, rgba(248, 249, 250, 0.1) 90%, transparent 100%)',
              animation: 'rotate 35s linear infinite reverse'
            }}
          ></div>
          <div 
            className="absolute w-48 h-48 rounded-full"
            style={{
              top: '60%',
              left: '70%',
              background: 'radial-gradient(circle, rgba(244, 196, 48, 0.08) 0%, transparent 70%)',
              animation: 'float1 20s ease-in-out infinite'
            }}
          ></div>
        </div>
      </div>

      {/* Onboarding Steps */}
      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <WelcomeIntro 
          onContinue={() => goToNextStep()}
        />
        
        <WelcomeStepName
          value={onboardingData.name}
          error={errors.name}
          onNext={handleNameNext}
          isVisible={currentStep === 'name'}
        />
        
        <WelcomeStepEmail
          value={onboardingData.email}
          error={errors.email}
          onNext={handleEmailNext}
          isVisible={currentStep === 'email'}
        />
        
        <WelcomeStepPhone
          value={onboardingData.phoneNumber}
          error={errors.phoneNumber || errors.submit}
          onStart={handlePhoneStart}
          isVisible={currentStep === 'phoneNumber'}
          isSubmitting={isSubmitting}
        />
        
        <WelcomeComplete
          userName={onboardingData.name}
          onComplete={onComplete}
          isVisible={currentStep === 'complete'}
        />
      </div>
    </div>
  );
}
