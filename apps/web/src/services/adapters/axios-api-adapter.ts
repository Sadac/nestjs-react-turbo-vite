import axios from 'axios';
import { ApiAdapterInterface } from './api-adapter.interface';
import { Login, Register, Logout, Status } from '@/types/api-adapter';

class NestAdapter implements ApiAdapterInterface {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  login = async (credentials: Login['request']): Promise<Login['response']> => {
    const response = await axios.post(
      `${this.baseUrl}/auth/login`,
      credentials,
    );

    return response.data;
  };

  logout = async (): Promise<Logout['response']> => {
    const response = await axios.post(`${this.baseUrl}/auth/logout`);

    return response.data;
  };

  register = async (credentials: Register['request']): Promise<void> => {
    const response = await axios.post(
      `${this.baseUrl}/auth/register`,
      credentials,
    );

    return response.data;
  };

  status = async (): Promise<Status['response']> => {
    const response = await axios.get(`${this.baseUrl}/auth/status`);

    return response.data;
  };
}

const apiAdapter = new NestAdapter('api');

export default apiAdapter;
