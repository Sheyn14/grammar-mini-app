'use client';

import { QuizInterface } from '@/components/quiz/QuizInterface';
import { QUIZZES } from '@/data/quizzes';
import { useParams, useRouter } from 'next/navigation';

export default function QuizPage() {
  const params = useParams();
  const quizId = params.id as string;
  const router = useRouter();

  const quiz = QUIZZES[quizId];

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz Not Found</h1>
          <p className="text-gray-600 mb-6">The quiz you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/home/tests')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <QuizInterface
      quizId={quizId}
      questions={quiz.questions}
      title={quiz.title}
    />
  );
}
