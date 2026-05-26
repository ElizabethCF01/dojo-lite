export function formatPoints(points: number): string {
  return `${points} pt${Math.abs(points) === 1 ? '' : 's'}`;
}

export function pluralize(count: number, singular: string, plural?: string) {
  const word = count === 1 ? singular : (plural ?? `${singular}s`);
  return `${count} ${word}`;
}
