export const HAIR_OPTIONS = [
  'short01',
  'short02',
  'short03',
  'short04',
  'short05',
  'short06',
  'short07',
  'short08',
  'short09',
  'short10',
  'short11',
  'short12',
  'short13',
  'short14',
  'short15',
  'short16',
  'short17',
  'short18',
  'short19',
  'long01',
  'long02',
  'long03',
  'long04',
  'long05',
  'long06',
  'long07',
  'long08',
  'long09',
  'long10',
  'long11',
  'long12',
  'long13',
  'long14',
  'long15',
  'long16',
  'long17',
  'long18',
  'long19',
  'long20',
  'long21',
  'long22',
  'long23',
  'long24',
  'long25',
  'long26',
];

export const EYES_OPTIONS = Array.from(
  { length: 26 },
  (_, i) => `variant${String(i + 1).padStart(2, '0')}`,
);

export const EYEBROWS_OPTIONS = Array.from(
  { length: 15 },
  (_, i) => `variant${String(i + 1).padStart(2, '0')}`,
);

export const MOUTH_OPTIONS = Array.from(
  { length: 30 },
  (_, i) => `variant${String(i + 1).padStart(2, '0')}`,
);

export type ColorOption = { value: string; label: string };

export const SKIN_COLORS: ColorOption[] = [
  { value: 'f2d3b1', label: 'Light' },
  { value: 'ecad80', label: 'Medium' },
  { value: '9e5622', label: 'Tan' },
  { value: '763900', label: 'Dark' },
];

export const HAIR_COLORS: ColorOption[] = [
  { value: '0e0e0e', label: 'Black' },
  { value: 'afafaf', label: 'Gray' },
  { value: '562306', label: 'Chestnut' },
  { value: '6a4e35', label: 'Dark Brown' },
  { value: '796a45', label: 'Brown' },
  { value: 'b9a05f', label: 'Caramel' },
  { value: 'e5d7a3', label: 'Blonde' },
  { value: 'ac6511', label: 'Auburn' },
  { value: 'cb6820', label: 'Red' },
  { value: 'ab2a18', label: 'Dark Red' },
  { value: '3eac2c', label: 'Green' },
  { value: '85c2c6', label: 'Teal' },
  { value: 'dba3be', label: 'Pink' },
  { value: '592454', label: 'Purple' },
];

export const BG_COLORS: ColorOption[] = [
  { value: '4F46E5', label: 'Indigo' },
  { value: '7C3AED', label: 'Violet' },
  { value: 'DB2777', label: 'Pink' },
  { value: 'DC2626', label: 'Red' },
  { value: 'D97706', label: 'Amber' },
  { value: '059669', label: 'Emerald' },
  { value: '0891B2', label: 'Cyan' },
  { value: '374151', label: 'Slate' },
];

export const DEFAULT_AVATAR_CONFIG = {
  hair: 'short01',
  hairColor: '0e0e0e',
  eyes: 'variant01',
  eyebrows: 'variant01',
  mouth: 'variant01',
  skinColor: 'f2d3b1',
  backgroundColor: '4F46E5',
} as const;
