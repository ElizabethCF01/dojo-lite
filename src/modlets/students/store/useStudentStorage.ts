import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import type { Student } from '../types';

const STORAGE_KEY = 'dojolite:students';

const SEED_STUDENTS: Student[] = [
  { id: '1', name: 'Pepito', points: -1 },
  { id: '2', name: 'Lola', points: 2 },
  { id: '3', name: 'Maripili', points: 5 },
];

export function useStudentStorage() {
  const [students, setStudentsState] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        setStudentsState(raw ? (JSON.parse(raw) as Student[]) : SEED_STUDENTS);
      })
      .catch(() => {
        setStudentsState(SEED_STUDENTS);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const setStudents = useCallback((updater: (prev: Student[]) => Student[]) => {
    setStudentsState((prev) => {
      const next = updater(prev);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  return { students, isLoading, setStudents };
}
