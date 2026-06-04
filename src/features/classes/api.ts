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

type RawRosterStudent = Omit<RosterStudent, 'avatar'> & {
  avatar: string | null;
};

export async function getRoster(classId: string): Promise<RosterStudent[]> {
  const data = await apiFetch<{ students: RawRosterStudent[] }>(
    `/classes/${classId}/students`,
  );
  return data.students.map(({ avatar, ...rest }) => ({
    ...rest,
    avatar: avatar ? JSON.parse(avatar) : undefined,
  }));
}

export function addPoints(
  classId: string,
  studentId: string,
  delta: 1 | -1,
): Promise<{ student: { studentId: string; points: number } }> {
  return apiFetch(`/classes/${classId}/points`, {
    method: 'POST',
    body: { studentId, delta },
  });
}
