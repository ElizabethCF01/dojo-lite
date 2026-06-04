import { apiFetch } from '#shared/api';
import type { ClassItem, RosterStudent } from './types';

export function listClasses(): Promise<{ classes: ClassItem[] }> {
  return apiFetch<{ classes: ClassItem[] }>('/classes');
}

export function createClass(name: string): Promise<{ class: ClassItem }> {
  return apiFetch<{ class: ClassItem }>('/classes', {
    method: 'POST',
    body: { name },
  });
}

export function getRoster(
  classId: string,
): Promise<{ students: RosterStudent[] }> {
  return apiFetch<{ students: RosterStudent[] }>(
    `/classes/${classId}/students`,
  );
}
