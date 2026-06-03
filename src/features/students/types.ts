import type { AvatarConfig } from '#shared/design/elements';

export type Student = {
  id: string;
  name: string;
  points: number;
  avatar?: AvatarConfig;
};
