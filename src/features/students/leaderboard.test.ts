import { buildLeaderboardSections } from './leaderboard';
import type { Student } from './types';

const student = (id: string, name: string, points: number): Student => ({
  id,
  name,
  points,
});

describe('buildLeaderboardSections', () => {
  it('ranks students by points descending, regardless of input order', () => {
    const sections = buildLeaderboardSections([
      student('a', 'Ada', 8),
      student('b', 'Bo', 25),
      student('c', 'Cy', 12),
    ]);

    const ranked = sections.flatMap((section) => section.data);
    expect(ranked.map((s) => s.name)).toEqual(['Bo', 'Cy', 'Ada']);
    expect(ranked.map((s) => s.rank)).toEqual([1, 2, 3]);
  });

  it('buckets students into belt tiers by their inclusive minimum', () => {
    const sections = buildLeaderboardSections([
      student('black', 'Black', 20),
      student('brown', 'Brown', 10),
      student('green', 'Green', 5),
      student('white', 'White', 0),
    ]);

    const tierOf = (name: string) =>
      sections.find((s) => s.data.some((d) => d.name === name))?.key;

    expect(tierOf('Black')).toBe('black');
    expect(tierOf('Brown')).toBe('brown');
    expect(tierOf('Green')).toBe('green');
    expect(tierOf('White')).toBe('white');
  });

  it('places points just below a threshold in the lower tier', () => {
    const sections = buildLeaderboardSections([
      student('a', 'Almost', 19),
      student('b', 'Barely', 4),
    ]);

    const tierOf = (name: string) =>
      sections.find((s) => s.data.some((d) => d.name === name))?.key;

    expect(tierOf('Almost')).toBe('brown');
    expect(tierOf('Barely')).toBe('white');
  });

  it('omits tiers that have no students', () => {
    const sections = buildLeaderboardSections([student('a', 'Solo', 0)]);

    expect(sections).toHaveLength(1);
    expect(sections[0].key).toBe('white');
  });

  it('returns no sections for an empty roster', () => {
    expect(buildLeaderboardSections([])).toEqual([]);
  });

  it('does not mutate the input array', () => {
    const students = [student('a', 'Ada', 1), student('b', 'Bo', 9)];
    const snapshot = [...students];
    buildLeaderboardSections(students);
    expect(students).toEqual(snapshot);
  });
});
