export type ClassItem = {
  id: string;
  name: string;
  teacherId: string;
  joinCode: string;
  createdAt: string;
};

import type { AvatarConfig } from '#shared/design/elements';

export type RosterStudent = {
  id: string;
  name: string;
  email: string;
  points: number;
  avatar?: AvatarConfig;
  enrolledAt: string;
};

export type Standing = {
  id: string;
  name: string;
  points: number;
  avatar?: AvatarConfig;
};
