import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '#shared/api';
import { readCache, writeCache } from '#shared/cache';
import { successPulse, warningPulse } from '#shared/services';
import { addPoints, getRoster } from '../api';
import type { RosterStudent } from '../types';

export function useRoster(classId: string) {
  const cacheKey = `roster:${classId}`;
  const [students, setStudents] = useState<RosterStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!classId) {
      setStudents([]);
      setLoading(false);
      return;
    }
    try {
      const data = await getRoster(classId);
      setStudents(data);
      setError(null);
      await writeCache(cacheKey, data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load roster');
    } finally {
      setLoading(false);
    }
  }, [classId, cacheKey]);

  useEffect(() => {
    (async () => {
      const cached = await readCache<RosterStudent[]>(cacheKey);
      if (cached) {
        setStudents(cached);
        setLoading(false);
      }
      refresh();
    })();
  }, [cacheKey, refresh]);

  const award = useCallback(
    async (studentId: string, delta: 1 | -1) => {
      const shift = (d: number) =>
        setStudents((prev) =>
          prev.map((s) =>
            s.id === studentId ? { ...s, points: s.points + d } : s,
          ),
        );
      shift(delta);
      (delta > 0 ? successPulse : warningPulse)();
      try {
        await addPoints(classId, studentId, delta);
      } catch {
        shift(-delta);
      }
    },
    [classId],
  );

  return { students, loading, error, refresh, award };
}
