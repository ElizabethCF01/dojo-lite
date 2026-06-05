import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '#shared/api';
import { readCache, writeCache } from '#shared/cache';
import { listAttempts } from '../api';
import type { Attempt } from '../types';

export function useAttempts(quizId: string) {
  const cacheKey = `attempts:${quizId}`;
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!quizId) {
      setAttempts([]);
      setLoading(false);
      return;
    }
    try {
      const data = await listAttempts(quizId);
      setAttempts(data.attempts);
      setError(null);
      await writeCache(cacheKey, data.attempts);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Failed to load attempts',
      );
    } finally {
      setLoading(false);
    }
  }, [quizId, cacheKey]);

  useEffect(() => {
    (async () => {
      const cached = await readCache<Attempt[]>(cacheKey);
      if (cached) {
        setAttempts(cached);
        setLoading(false);
      }
      refresh();
    })();
  }, [cacheKey, refresh]);

  return { attempts, loading, error, refresh };
}
