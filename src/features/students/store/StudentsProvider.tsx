import { createContext, type ReactNode, useContext } from 'react';
import type { AvatarConfig } from '#shared/design/elements';
import { successPulse, warningPulse } from '../../../shared/services/haptics';
import type { Student } from '../types';
import { useStudentStorage } from './useStudentStorage';

type StudentsContextValue = {
  students: Student[];
  addPoint: (id: string) => void;
  removePoint: (id: string) => void;
  addStudent: (name: string) => void;
  updateAvatar: (id: string, config: AvatarConfig) => void;
};

const StudentsContext = createContext<StudentsContextValue | null>(null);

export function StudentsProvider({ children }: { children: ReactNode }) {
  const { students, isLoading, setStudents } = useStudentStorage();

  const addPoint = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, points: s.points + 1 } : s)),
    );
    successPulse();
  };

  const removePoint = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, points: s.points - 1 } : s)),
    );
    warningPulse();
  };

  const addStudent = (name: string) => {
    setStudents((prev) => [
      ...prev,
      { id: String(Date.now()), name, points: 0 },
    ]);
  };

  const updateAvatar = (id: string, config: AvatarConfig) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, avatar: config } : s)),
    );
  };

  if (isLoading) return null;

  return (
    <StudentsContext.Provider
      value={{ students, addPoint, removePoint, addStudent, updateAvatar }}
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
