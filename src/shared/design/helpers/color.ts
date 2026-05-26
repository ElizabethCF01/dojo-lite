export function stripHash(hex: string): string {
  return hex.startsWith('#') ? hex.slice(1) : hex;
}

export function hexToRgba(hex: string, alpha = 1): string {
  const value = stripHash(hex);
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
