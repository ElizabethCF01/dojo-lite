import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '#shared/api';
import { readCache, writeCache } from '#shared/cache';
import { createQuiz, listQuizzes } from '../api';
import type { NewQuizQuestion, Quiz } from '../types';

export function useQuizzes(classId: string) {
  const cacheKey = `quizzes:${classId}`;
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!classId) {
      setQuizzes([]);
      setLoading(false);
      return;
    }
    try {
      const data = await listQuizzes(classId);
      setQuizzes(data.quizzes);
      setError(null);
      await writeCache(cacheKey, data.quizzes);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Failed to load quizzes',
      );
    } finally {
      setLoading(false);
    }
  }, [classId, cacheKey]);

  useEffect(() => {
    (async () => {
      const cached = await readCache<Quiz[]>(cacheKey);
      if (cached) {
        setQuizzes(cached);
        setLoading(false);
      }
      refresh();
    })();
  }, [cacheKey, refresh]);

  const create = useCallback(
    async (title: string, questions: NewQuizQuestion[]) => {
      const data = await createQuiz({ classId, title, questions });
      setQuizzes((prev) => {
        const next = [...prev, data.quiz];
        writeCache(cacheKey, next);
        return next;
      });
      return data.quiz;
    },
    [classId, cacheKey],
  );

  return { quizzes, loading, error, refresh, create };
}
