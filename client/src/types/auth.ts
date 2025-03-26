export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

export interface AuthError {
  response?: {
    data?: {
      message?: string;
    };
  };
} 