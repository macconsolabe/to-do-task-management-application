import { useUser } from '../../contexts/UserContext';

export function WelcomeSection() {
  const { user } = useUser();
  
  return (
    <div className="mb-8">
      <p className="text-gray-500 font-light mb-2">Welcome</p>
      <h2 className="text-3xl font-light text-gray-900">
        {user?.name || 'User'}
      </h2>
    </div>
  );
}
