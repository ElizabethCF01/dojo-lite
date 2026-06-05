import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '#shared/api';
import { readCache, writeCache } from '#shared/cache';
import { getLeaderboard } from '../api';
import type { Standing } from '../types';

export function useLeaderboard(classId: string) {
  const cacheKey = `leaderboard:${classId}`;
  const [students, setStudents] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!classId) {
      setStudents([]);
      setLoading(false);
      return;
    }
    try {
      const data = await getLeaderboard(classId);
      setStudents(data);
      setError(null);
      await writeCache(cacheKey, data);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Failed to load leaderboard',
      );
    } finally {
      setLoading(false);
    }
  }, [classId, cacheKey]);

  useEffect(() => {
    (async () => {
      const cached = await readCache<Standing[]>(cacheKey);
      if (cached) {
        setStudents(cached);
        setLoading(false);
      }
      refresh();
    })();
  }, [cacheKey, refresh]);

  return { students, loading, error, refresh };
}
