export type Quiz = {
  id: string;
  classId: string;
  title: string;
  createdAt: string;
};

export type QuizOption = {
  id: string;
  text: string;
  isCorrect?: boolean;
};

export type QuizQuestion = {
  id: string;
  text: string;
  position: number;
  options: QuizOption[];
};

export type QuizDetail = Quiz & {
  questions: QuizQuestion[];
};

export type Attempt = {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  totalQuestions: number;
  submittedAt: string;
};

type NewQuizOption = {
  text: string;
  isCorrect: boolean;
};

export type NewQuizQuestion = {
  text: string;
  options: NewQuizOption[];
};

export type NewQuiz = {
  classId: string;
  title: string;
  questions: NewQuizQuestion[];
};
