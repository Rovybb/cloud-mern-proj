import axios from 'axios';
import { RegisterRequest, LoginResponse } from '../../types/auth';

const API_URL = 'http://localhost:5000/api/auth';

export const registerService = {
  async register(formData: RegisterRequest): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(`${API_URL}/register`, formData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }
}; 