import { hexToRgba, stripHash } from './color';

describe('stripHash', () => {
  it('removes a leading hash', () => {
    expect(stripHash('#4F46E5')).toBe('4F46E5');
  });

  it('leaves a hash-less value untouched', () => {
    expect(stripHash('4F46E5')).toBe('4F46E5');
  });
});

describe('hexToRgba', () => {
  it('converts a hash-prefixed hex with the default alpha', () => {
    expect(hexToRgba('#4F46E5')).toBe('rgba(79, 70, 229, 1)');
  });

  it('converts a bare hex and respects a custom alpha', () => {
    expect(hexToRgba('000000', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
    expect(hexToRgba('ffffff', 0)).toBe('rgba(255, 255, 255, 0)');
  });
});
