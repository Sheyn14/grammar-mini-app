export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export const QUIZZES: Record<string, Quiz> = {
  'present-simple': {
    id: 'present-simple',
    title: 'Present Simple',
    questions: [
      {
        id: 'ps-1',
        question: 'Which sentence is correct?',
        options: [
          'He go to school every day.',
          'He goes to school every day.',
          'He is going to school every day.',
          'He will go to school every day.',
        ],
        correct: 1,
        explanation: 'With third person singular (he, she, it), we add "s" to the verb.',
      },
      {
        id: 'ps-2',
        question: 'What do you do on weekends?',
        options: [
          'I am playing football.',
          'I plays football.',
          'I play football.',
          'I is playing football.',
        ],
        correct: 2,
        explanation: 'With "I" (first person singular), we use the base form of the verb.',
      },
      {
        id: 'ps-3',
        question: 'Choose the negative form: She watches TV.',
        options: [
          'She not watches TV.',
          'She do not watch TV.',
          'She does not watch TV.',
          'She is not watching TV.',
        ],
        correct: 2,
        explanation: 'With third person singular, we use "does not" for negation.',
      },
    ],
  },
  'present-continuous': {
    id: 'present-continuous',
    title: 'Present Continuous',
    questions: [
      {
        id: 'pc-1',
        question: 'What is she doing right now?',
        options: [
          'She reads a book.',
          'She is reading a book.',
          'She has read a book.',
          'She reads the book.',
        ],
        correct: 1,
        explanation: 'For actions happening now, we use Present Continuous (is/are + -ing).',
      },
      {
        id: 'pc-2',
        question: 'Choose the correct form: They ___ a movie.',
        options: [
          'watch',
          'are watching',
          'watches',
          'watched',
        ],
        correct: 1,
        explanation: 'They is plural, so we use "are" + present participle.',
      },
      {
        id: 'pc-3',
        question: 'Transform to negative: I am eating lunch.',
        options: [
          'I am not eating lunch.',
          'I do not eat lunch.',
          'I not eating lunch.',
          'I am not eat lunch.',
        ],
        correct: 0,
        explanation: 'In Present Continuous, negation is: am/are/is + not + -ing form.',
      },
    ],
  },
  'past-simple': {
    id: 'past-simple',
    title: 'Past Simple',
    questions: [
      {
        id: 'pas-1',
        question: 'What did you do yesterday?',
        options: [
          'I go to the market.',
          'I went to the market.',
          'I am going to the market.',
          'I am going to the market yesterday.',
        ],
        correct: 1,
        explanation: 'For completed actions in the past, we use Past Simple.',
      },
      {
        id: 'pas-2',
        question: 'Choose the correct form: He ___ a sandwich.',
        options: [
          'eats',
          'eat',
          'ate',
          'is eating',
        ],
        correct: 2,
        explanation: 'For finished past actions, we use the past simple form.',
      },
    ],
  },
  'modals': {
    id: 'modals',
    title: 'Modals',
    questions: [
      {
        id: 'mod-1',
        question: 'Which sentence shows ability?',
        options: [
          'I should play tennis.',
          'I can play tennis.',
          'I must play tennis.',
          'I might play tennis.',
        ],
        correct: 1,
        explanation: '"Can" is used to show ability or possibility.',
      },
      {
        id: 'mod-2',
        question: 'Choose the correct modal for advice:',
        options: [
          'You can study hard.',
          'You should study hard.',
          'You will study hard.',
          'You might study hard.',
        ],
        correct: 1,
        explanation: '"Should" is used to give advice or recommendations.',
      },
    ],
  },
  'present-perfect': {
    id: 'present-perfect',
    title: 'Present Perfect',
    questions: [
      {
        id: 'pp-1',
        question: 'Correct the sentence: I ate breakfast today.',
        options: [
          'I eat breakfast today.',
          'I have eaten breakfast today.',
          'I ate breakfast.',
          'I am eating breakfast today.',
        ],
        correct: 1,
        explanation: 'For actions that started in the past and continue or have impact on present, use Present Perfect.',
      },
    ],
  },
  'past-continuous': {
    id: 'past-continuous',
    title: 'Past Continuous',
    questions: [
      {
        id: 'pac-1',
        question: 'He ___ when the phone rang.',
        options: [
          'slept',
          'was sleeping',
          'has slept',
          'is sleeping',
        ],
        correct: 1,
        explanation: 'Use Past Continuous for an action that was in progress when another action happened.',
      },
    ],
  },
};
