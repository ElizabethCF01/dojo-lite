import {
  BG_COLORS,
  DEFAULT_AVATAR_CONFIG,
  EYEBROWS_OPTIONS,
  EYES_OPTIONS,
  HAIR_COLORS,
  HAIR_OPTIONS,
  MOUTH_OPTIONS,
  SKIN_COLORS,
} from './avatarOptions';

describe('avatar option lists', () => {
  it('generates zero-padded variant ids of the expected length', () => {
    expect(EYES_OPTIONS).toHaveLength(26);
    expect(EYEBROWS_OPTIONS).toHaveLength(15);
    expect(MOUTH_OPTIONS).toHaveLength(30);
    expect(EYES_OPTIONS[0]).toBe('variant01');
    expect(MOUTH_OPTIONS[29]).toBe('variant30');
  });
});

describe('DEFAULT_AVATAR_CONFIG', () => {
  const colorValues = (list: { value: string }[]) =>
    list.map((option) => option.value);

  it('references hair and feature variants that exist in their option lists', () => {
    expect(HAIR_OPTIONS).toContain(DEFAULT_AVATAR_CONFIG.hair);
    expect(EYES_OPTIONS).toContain(DEFAULT_AVATAR_CONFIG.eyes);
    expect(EYEBROWS_OPTIONS).toContain(DEFAULT_AVATAR_CONFIG.eyebrows);
    expect(MOUTH_OPTIONS).toContain(DEFAULT_AVATAR_CONFIG.mouth);
  });

  it('references colors that exist in their palettes', () => {
    expect(colorValues(HAIR_COLORS)).toContain(DEFAULT_AVATAR_CONFIG.hairColor);
    expect(colorValues(SKIN_COLORS)).toContain(DEFAULT_AVATAR_CONFIG.skinColor);
    expect(colorValues(BG_COLORS)).toContain(
      DEFAULT_AVATAR_CONFIG.backgroundColor,
    );
  });
});
