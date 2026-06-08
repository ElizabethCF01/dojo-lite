import type { AvatarConfig } from '#design/elements';

export type Role = 'teacher' | 'student';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: AvatarConfig;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};
