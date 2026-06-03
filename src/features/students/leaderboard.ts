import type { Student } from './types';

export type BeltTier = {
  key: string;
  title: string;
  min: number;
};

export const BELT_TIERS: BeltTier[] = [
  { key: 'black', title: 'Black Belt', min: 20 },
  { key: 'brown', title: 'Brown Belt', min: 10 },
  { key: 'green', title: 'Green Belt', min: 5 },
  { key: 'white', title: 'White Belt', min: 0 },
];

export type LeaderboardEntry = Student & { rank: number };

export type LeaderboardSection = {
  key: string;
  title: string;
  data: LeaderboardEntry[];
};

function tierKeyFor(points: number): string {
  return BELT_TIERS.find((tier) => points >= tier.min)?.key ?? 'white';
}

export function buildLeaderboardSections(
  students: Student[],
): LeaderboardSection[] {
  const ranked: LeaderboardEntry[] = [...students]
    .sort((a, b) => b.points - a.points)
    .map((student, index) => ({ ...student, rank: index + 1 }));

  return BELT_TIERS.map((tier) => ({
    key: tier.key,
    title: tier.title,
    data: ranked.filter((student) => tierKeyFor(student.points) === tier.key),
  })).filter((section) => section.data.length > 0);
}
