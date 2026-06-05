import { apiFetch } from '#shared/api';
import type { AvatarConfig } from '#shared/design/elements';
import type { AuthResponse, AuthUser, Role } from './types';

type RawUser = Omit<AuthUser, 'avatar'> & { avatar?: string | null };

function parseUser(raw: RawUser): AuthUser {
  const { avatar, ...rest } = raw;
  return { ...rest, avatar: avatar ? JSON.parse(avatar) : undefined };
}

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const data = await apiFetch<{ user: RawUser; token: string }>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  return { user: parseUser(data.user), token: data.token };
}

export async function register(input: {
  email: string;
  password: string;
  name: string;
  role: Role;
  joinCode?: string;
}): Promise<AuthResponse> {
  const data = await apiFetch<{ user: RawUser; token: string }>(
    '/auth/register',
    { method: 'POST', body: input },
  );
  return { user: parseUser(data.user), token: data.token };
}

export function fetchMe(): Promise<{ user: AuthUser }> {
  return apiFetch<{ user: AuthUser }>('/auth/me');
}

export function updateAvatar(avatar: AvatarConfig | null): Promise<unknown> {
  return apiFetch('/auth/me/avatar', { method: 'PATCH', body: { avatar } });
}
