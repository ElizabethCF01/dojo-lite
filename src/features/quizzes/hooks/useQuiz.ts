import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '#shared/api';
import { readCache, writeCache } from '#shared/cache';
import { getQuiz } from '../api';
import type { QuizDetail } from '../types';

export function useQuiz(quizId: string) {
  const cacheKey = `quiz:${quizId}`;
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!quizId) {
      setQuiz(null);
      setLoading(false);
      return;
    }
    try {
      const data = await getQuiz(quizId);
      setQuiz(data.quiz);
      setError(null);
      await writeCache(cacheKey, data.quiz);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load quiz');
    } finally {
      setLoading(false);
    }
  }, [quizId, cacheKey]);

  useEffect(() => {
    (async () => {
      const cached = await readCache<QuizDetail>(cacheKey);
      if (cached) {
        setQuiz(cached);
        setLoading(false);
      }
      refresh();
    })();
  }, [cacheKey, refresh]);

  return { quiz, loading, error, refresh };
}
