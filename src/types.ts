export  interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedOption: number | null;
  showResult: boolean;
  isAnswered: boolean;
  isCorrect: boolean | null;
  answers: (number | null)[];
  showLanding: boolean;
  showDetailedResults: boolean;
}

export interface UserProfile {
  name: string;
  age: string;
  avatar: string;
}

export interface Avatar {
  id: number;
  url: string;
  alt: string;
}
 