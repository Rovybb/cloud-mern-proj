export interface User {
  email: string;
  password: string;
}

export interface LoginResponse {
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