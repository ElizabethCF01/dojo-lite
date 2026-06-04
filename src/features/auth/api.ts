import { apiFetch } from '#shared/api';
import type { AuthResponse, AuthUser, Role } from './types';

export function login(email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export function register(input: {
  email: string;
  password: string;
  name: string;
  role: Role;
  joinCode?: string;
}): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/register', {
    method: 'POST',
    body: input,
  });
}

export function fetchMe(): Promise<{ user: AuthUser }> {
  return apiFetch<{ user: AuthUser }>('/auth/me');
}
