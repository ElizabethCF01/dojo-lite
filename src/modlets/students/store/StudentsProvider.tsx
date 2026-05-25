import { createContext, type ReactNode, useContext, useState } from 'react';
import type { Student } from '../types';

const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Pepito', points: -1 },
  { id: '2', name: 'Lola', points: 2 },
  { id: '3', name: 'Maripili', points: 5 },
];

type StudentsContextValue = {
  students: Student[];
  addPoint: (id: string) => void;
  removePoint: (id: string) => void;
  addStudent: (name: string) => void;
};

const StudentsContext = createContext<StudentsContextValue | null>(null);

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  const addPoint = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, points: s.points + 1 } : s)),
    );
  };

  const removePoint = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, points: s.points - 1 } : s)),
    );
  };

  const addStudent = (name: string) => {
    setStudents((prev) => [
      ...prev,
      { id: String(Date.now()), name, points: 0 },
    ]);
  };

  return (
    <StudentsContext.Provider
      value={{ students, addPoint, removePoint, addStudent }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  const ctx = useContext(StudentsContext);
  if (!ctx) throw new Error('No StudentsProvider');
  return ctx;
}
