export type Role = 'teacher' | 'student';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};
