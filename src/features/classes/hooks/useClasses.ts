import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '#features/auth';
import { ApiError } from '#shared/api';
import { readCache, writeCache } from '#shared/cache';
import { createClass, joinClass, listClasses } from '../api';
import type { ClassItem } from '../types';

export function useClasses() {
  const { user } = useAuth();
  const cacheKey = `classes:${user?.id ?? 'anon'}`;
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const data = await listClasses();
      setClasses(data.classes);
      setError(null);
      await writeCache(cacheKey, data.classes);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Failed to load classes',
      );
    } finally {
      setLoading(false);
    }
  }, [cacheKey]);

  useEffect(() => {
    (async () => {
      const cached = await readCache<ClassItem[]>(cacheKey);
      if (cached) {
        setClasses(cached);
        setLoading(false);
      }
      refresh();
    })();
  }, [cacheKey, refresh]);

  const create = useCallback(
    async (name: string) => {
      const data = await createClass(name);
      setClasses((prev) => {
        const next = [...prev, data.class];
        writeCache(cacheKey, next);
        return next;
      });
    },
    [cacheKey],
  );

  const join = useCallback(
    async (code: string) => {
      const data = await joinClass(code);
      setClasses((prev) => {
        if (prev.some((c) => c.id === data.class.id)) return prev;
        const next = [...prev, data.class];
        writeCache(cacheKey, next);
        return next;
      });
    },
    [cacheKey],
  );

  return { classes, loading, error, refresh, create, join };
}
