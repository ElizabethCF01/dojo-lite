import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '#shared/api';
import { createClass, listClasses } from '../api';
import type { ClassItem } from '../types';

export function useClasses() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const data = await listClasses();
      setClasses(data.classes);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Failed to load classes',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(async (name: string) => {
    const data = await createClass(name);
    setClasses((prev) => [...prev, data.class]);
  }, []);

  return { classes, loading, error, refresh, create };
}
