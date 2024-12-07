import { Login, Logout, Register, Status } from '@/types/api-adapter';

export interface ApiAdapterInterface {
  login(credentials: Login['request']): Promise<Login['response']>;
  logout(): Promise<Logout['response']>;
  status(): Promise<Status['response']>;
  register(credentials: Register['request']): Promise<void>;
}
