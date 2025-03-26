import axios from 'axios';
import { LoginRequest, LoginResponse } from '../../types/auth';

const API_URL = 'http://localhost:5000/api/auth';

export const loginService = {
  async login(formData: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, formData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
  },

  getCurrentToken(): string | null {
    return localStorage.getItem('token');
  }
}; 