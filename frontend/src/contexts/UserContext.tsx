import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, CreateUserDto, UpdateUserDto } from '../services/types';
import { userService } from '../services/UserService';

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isFirstTimeUser: boolean;
  hasExistingUsers: boolean;
  allUsers: User[];
  createUser: (userData: CreateUserDto) => Promise<User>;
  updateUser: (userData: UpdateUserDto) => Promise<User>;
  loginUser: (selectedUser: User) => Promise<void>;
  refreshUser: () => Promise<void>;
  completeOnboarding: () => void;
  logout: () => void;
  startOnboarding: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [hasExistingUsers, setHasExistingUsers] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Load user on app startup
  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check localStorage first for faster loading
      const cachedUser = localStorage.getItem('eTask_user');
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
      }

      // Fetch all users to determine app state
      const users = await userService.getUsers();
      setAllUsers(users);
      setHasExistingUsers(users.length > 0);

      // Only auto-login if we have a cached user, otherwise stay logged out
      if (cachedUser) {
        // Verify cached user still exists in backend
        const currentUser = await userService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem('eTask_user', JSON.stringify(currentUser));
          setIsFirstTimeUser(false);
        } else {
          // Cached user no longer exists
          setUser(null);
          localStorage.removeItem('eTask_user');
          setIsFirstTimeUser(users.length === 0);
        }
      } else {
        // No cached user - stay logged out
        setUser(null);
        localStorage.removeItem('eTask_user');
        setIsFirstTimeUser(users.length === 0);
      }
    } catch (err) {
      console.error('Error loading user:', err);
      setError('Failed to load user data');
      setIsFirstTimeUser(true);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: CreateUserDto): Promise<User> => {
    try {
      setError(null);
      const newUser = await userService.createUser(userData);
      setUser(newUser);
      localStorage.setItem('eTask_user', JSON.stringify(newUser));
      setIsFirstTimeUser(false);
      
      // Refresh the user list to include the new user
      const updatedUsers = await userService.getUsers();
      setAllUsers(updatedUsers);
      setHasExistingUsers(updatedUsers.length > 0);
      
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      throw err;
    }
  };

  const updateUser = async (userData: UpdateUserDto): Promise<User> => {
    if (!user) {
      throw new Error('No user to update');
    }

    try {
      setError(null);
      const updatedUser = await userService.updateUser(user.id, userData);
      setUser(updatedUser);
      localStorage.setItem('eTask_user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      throw err;
    }
  };

  const refreshUser = async (): Promise<void> => {
    await loadCurrentUser();
  };

  const completeOnboarding = () => {
    setIsFirstTimeUser(false);
  };

  const loginUser = async (selectedUser: User): Promise<void> => {
    try {
      setError(null);
      // Verify user still exists in backend
      const verifiedUser = await userService.getUserByEmail(selectedUser.email);
      
      if (verifiedUser) {
        setUser(verifiedUser);
        localStorage.setItem('eTask_user', JSON.stringify(verifiedUser));
        setIsFirstTimeUser(false);
      } else {
        throw new Error('User no longer exists');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to login';
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    setUser(null);
    setIsFirstTimeUser(false); // Don't show onboarding, show user selection
    localStorage.removeItem('eTask_user');
    setError(null);
    
    // Refresh user list to show all available accounts
    try {
      const users = await userService.getUsers();
      setAllUsers(users);
      setHasExistingUsers(users.length > 0);
    } catch (err) {
      console.error('Error refreshing users after logout:', err);
    }
  };

  const startOnboarding = () => {
    setUser(null);
    setIsFirstTimeUser(true); // Force onboarding flow
    localStorage.removeItem('eTask_user');
    setError(null);
  };

  const value: UserContextType = {
    user,
    loading,
    error,
    isFirstTimeUser,
    hasExistingUsers,
    allUsers,
    createUser,
    updateUser,
    loginUser,
    refreshUser,
    completeOnboarding,
    logout,
    startOnboarding
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
