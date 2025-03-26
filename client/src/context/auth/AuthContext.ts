import { createContext } from 'react';
import { LoginRequest, User } from '../../types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: LoginRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined); 