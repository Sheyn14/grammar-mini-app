'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

interface QuizProps {
  quizId: string;
  questions: QuizQuestion[];
  title: string;
}

export function QuizInterface({ quizId, questions, title }: QuizProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = (optionIndex: number) => {
    if (answered) return;

    setSelectedAnswer(optionIndex);
    setAnswered(true);

    if (optionIndex === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setCompleted(false);
  };

  const handleExit = () => {
    router.push('/home/tests');
  };

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <div className="mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-2">{percentage}%</div>
            <p className="text-gray-600 text-lg">
              You scored {score} out of {questions.length}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Retry Quiz
            </button>
            <button
              onClick={handleExit}
              className="w-full px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 mt-4">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <span className="text-gray-600 font-semibold">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-white rounded-lg shadow p-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isCorrect = index === question.correct;
              const isSelected = index === selectedAnswer;
              let buttonClass =
                'w-full p-4 text-left rounded-lg border-2 transition font-medium ';

              if (!answered) {
                buttonClass +=
                  'border-gray-300 hover:border-blue-600 cursor-pointer hover:bg-blue-50';
              } else if (isCorrect) {
                buttonClass += 'border-green-500 bg-green-50 text-green-800';
              } else if (isSelected && !isCorrect) {
                buttonClass += 'border-red-500 bg-red-50 text-red-800';
              } else {
                buttonClass += 'border-gray-300 text-gray-600';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                  className={buttonClass}
                >
                  <div className="flex items-center">
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleExit}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-semibold"
          >
            Exit Quiz
          </button>
          <span className="text-gray-600 font-semibold">
            Score: {score}/{questions.length}
          </span>
          <button
            onClick={handleNext}
            disabled={!answered}
            className={`px-6 py-3 rounded-lg transition font-semibold ${
              answered
                ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
