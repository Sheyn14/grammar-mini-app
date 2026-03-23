export type Question = {
  id: number;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correct: 'a' | 'b' | 'c' | 'd';
  explanation: string;
};

export type TestData = {
  id: number;
  level: string;
  unit: number;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
};

export type UnitInfo = {
  id: number;
  unit: number;
  title: string;
  description: string;
  icon: string;
  testCount: number;
};

export type LevelInfo = {
  id: number;
  level: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unitCount: number;
};

export type QuizState = {
  currentQuestion: number;
  answers: Record<number, 'a' | 'b' | 'c' | 'd' | null>;
  completed: boolean;
};

// Legacy types - for backward compatibility
export type GrammarTopic = {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  questions: Question[];
};
