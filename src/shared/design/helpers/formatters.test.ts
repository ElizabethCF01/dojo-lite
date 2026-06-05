import { formatPoints, pluralize } from './formatters';

describe('formatPoints', () => {
  it('uses the singular unit for exactly one point', () => {
    expect(formatPoints(1)).toBe('1 pt');
    expect(formatPoints(-1)).toBe('-1 pt');
  });

  it('uses the plural unit for zero and many', () => {
    expect(formatPoints(0)).toBe('0 pts');
    expect(formatPoints(5)).toBe('5 pts');
  });
});

describe('pluralize', () => {
  it('uses the singular word for a count of one', () => {
    expect(pluralize(1, 'student')).toBe('1 student');
  });

  it('appends an "s" by default for other counts', () => {
    expect(pluralize(0, 'student')).toBe('0 students');
    expect(pluralize(3, 'student')).toBe('3 students');
  });

  it('uses the explicit plural form when provided', () => {
    expect(pluralize(2, 'class', 'classes')).toBe('2 classes');
    expect(pluralize(1, 'class', 'classes')).toBe('1 class');
  });
});
