import { apiFetch } from '#shared/api';
import type { Attempt, NewQuiz, Quiz, QuizDetail } from './types';

export function listQuizzes(classId: string): Promise<{ quizzes: Quiz[] }> {
  return apiFetch<{ quizzes: Quiz[] }>(
    `/quizzes?classId=${encodeURIComponent(classId)}`,
  );
}

export function getQuiz(quizId: string): Promise<{ quiz: QuizDetail }> {
  return apiFetch<{ quiz: QuizDetail }>(`/quizzes/${quizId}`);
}

export function listAttempts(quizId: string): Promise<{ attempts: Attempt[] }> {
  return apiFetch<{ attempts: Attempt[] }>(`/quizzes/${quizId}/attempts`);
}

export function createQuiz(input: NewQuiz): Promise<{ quiz: Quiz }> {
  return apiFetch<{ quiz: Quiz }>('/quizzes', {
    method: 'POST',
    body: input,
  });
}
