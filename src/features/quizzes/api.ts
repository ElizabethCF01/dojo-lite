import { apiFetch } from '#shared/api';
import type { Quiz } from './types';

export function listQuizzes(classId: string): Promise<{ quizzes: Quiz[] }> {
  return apiFetch<{ quizzes: Quiz[] }>(
    `/quizzes?classId=${encodeURIComponent(classId)}`,
  );
}
