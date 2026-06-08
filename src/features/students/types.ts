import type { AvatarConfig } from '#design/elements';

export type Student = {
  id: string;
  name: string;
  points: number;
  avatar?: AvatarConfig;
};
