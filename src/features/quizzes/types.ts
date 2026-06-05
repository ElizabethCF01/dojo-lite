export type Quiz = {
  id: string;
  classId: string;
  title: string;
  createdAt: string;
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
