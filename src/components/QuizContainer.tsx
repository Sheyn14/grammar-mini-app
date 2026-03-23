'use client';

import React, { useState, useCallback } from 'react';
import { HomeScreen } from './HomeScreen';
import { LevelSelector } from './LevelSelector';
import { UnitSelector } from './UnitSelector';
import { QuestionCard } from './QuestionCard';
import { ResultsScreen } from './ResultsScreen';
import { ProgressBar } from './ProgressBar';
import { LevelInfo, UnitInfo, TestData, QuizState } from '@/data/types';
import { getAllLevels, getUnitsByLevel, getTestByLevelAndUnit } from '@/data/levels';
import { sendResultsToBot } from '@/utils/telegram';
import { saveTestResult } from '@/lib/progress';

type Screen = 'home' | 'level-selector' | 'unit-selector' | 'quiz' | 'results';

export const QuizContainer: React.FC = () => {
  const allLevels = getAllLevels();

  const [screen, setScreen] = useState<Screen>('home');
  const [selectedLevel, setSelectedLevel] = useState<LevelInfo | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitInfo | null>(null);
  const [selectedTest, setSelectedTest] = useState<TestData | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    completed: false,
  });

  // Get current questions from selected test
  const currentQuestions = selectedTest?.questions || [];
  const currentQuestion = currentQuestions[quizState.currentQuestion];
  const totalQuestions = currentQuestions.length;

  // Calculate score
  const score = Object.entries(quizState.answers).filter(([qId, answer]) => {
    const question = currentQuestions[parseInt(qId) - 1];
    return question && answer === question.correct;
  }).length;

  // Handle home screen start
  const handleStart = useCallback(() => {
    setScreen('level-selector');
  }, []);

  // Handle level selection
  const handleSelectLevel = useCallback((level: LevelInfo) => {
    setSelectedLevel(level);
    setScreen('unit-selector');
  }, []);

  // Handle back to home
  const handleBackToHome = useCallback(() => {
    setScreen('home');
    setSelectedLevel(null);
    setSelectedUnit(null);
    setSelectedTest(null);
    setQuizState({
      currentQuestion: 0,
      answers: {},
      completed: false,
    });
  }, []);

  // Handle back to levels
  const handleBackToLevels = useCallback(() => {
    setScreen('level-selector');
    setSelectedUnit(null);
    setSelectedTest(null);
    setQuizState({
      currentQuestion: 0,
      answers: {},
      completed: false,
    });
  }, []);

  // Handle unit selection
  const handleSelectUnit = useCallback((unit: UnitInfo) => {
    if (!selectedLevel) return;

    // Load test data for this unit
    const test = getTestByLevelAndUnit(selectedLevel.slug, unit.unit);
    if (test) {
      setSelectedUnit(unit);
      setSelectedTest(test);
      setQuizState({
        currentQuestion: 0,
        answers: {},
        completed: false,
      });
      setScreen('quiz');
    }
  }, [selectedLevel]);

  // Handle answer selection
  const handleSelectAnswer = useCallback(
    (answer: 'a' | 'b' | 'c' | 'd') => {
      setQuizState((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: answer,
        },
      }));
    },
    [currentQuestion?.id]
  );

  // Handle next question or go to results
  const handleNextQuestion = useCallback(async () => {
    const nextIndex = quizState.currentQuestion + 1;

    if (nextIndex < totalQuestions) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: nextIndex,
      }));
    } else {
      // Quiz completed
      setQuizState((prev) => ({
        ...prev,
        completed: true,
      }));

      // Save progress to database
      if (selectedLevel && selectedUnit && selectedTest) {
        try {
          const percentage = Math.round((score / totalQuestions) * 100);
          await saveTestResult({
            level: selectedLevel.level,
            unit: selectedUnit.unit,
            score,
            totalQuestions,
            percentage,
          });
        } catch (error) {
          console.error('Error saving progress:', error);
        }

        // Send results to bot
        const testTitle = `${selectedLevel.title} - ${selectedTest.title}`;
        sendResultsToBot(testTitle, score, totalQuestions);
      }

      setScreen('results');
    }
  }, [quizState.currentQuestion, totalQuestions, score, selectedLevel, selectedUnit, selectedTest]);

  // Handle restart
  const handleRestart = useCallback(() => {
    setScreen('home');
    setSelectedLevel(null);
    setSelectedUnit(null);
    setSelectedTest(null);
    setQuizState({
      currentQuestion: 0,
      answers: {},
      completed: false,
    });
  }, []);

  // Handle back to units
  const handleBackToUnits = useCallback(() => {
    setScreen('unit-selector');
  }, []);

  const isAnswered = quizState.answers[currentQuestion?.id] !== undefined;

  // Get units for selected level
  const currentUnits = selectedLevel ? getUnitsByLevel(selectedLevel.slug) : [];

  return (
    <>
      {screen === 'home' && <HomeScreen onStart={handleStart} />}

      {screen === 'level-selector' && (
        <LevelSelector
          levels={allLevels}
          onSelectLevel={handleSelectLevel}
          onBack={handleBackToHome}
        />
      )}

      {screen === 'unit-selector' && selectedLevel && (
        <UnitSelector
          level={selectedLevel}
          units={currentUnits}
          onSelectUnit={handleSelectUnit}
          onBack={handleBackToLevels}
        />
      )}

      {screen === 'quiz' && selectedLevel && selectedUnit && selectedTest && currentQuestion && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
          <div className="max-w-2xl mx-auto">
            {/* Back Button */}
            <div className="mb-6 pt-4">
              <button
                onClick={handleBackToUnits}
                className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-2 transition-colors"
              >
                ← Back to Units
              </button>
            </div>

            {/* Test Title */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedTest.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedTest.title}</h2>
                  <p className="text-sm text-slate-600">{selectedLevel.title}</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <ProgressBar current={quizState.currentQuestion + 1} total={totalQuestions} />
            </div>

            {/* Question Card */}
            <div className="mb-6">
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={quizState.answers[currentQuestion.id] || null}
                onSelectAnswer={handleSelectAnswer}
                isAnswered={isAnswered}
              />
            </div>

            {/* Next Button */}
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 animate-slideIn"
              >
                {quizState.currentQuestion === totalQuestions - 1 ? 'See Results' : 'Next Question'}
              </button>
            )}

            {/* Hint for unanswered */}
            {!isAnswered && (
              <div className="text-center text-gray-500 py-4">
                <p className="text-sm">Select an answer to continue →</p>
              </div>
            )}
          </div>
        </div>
      )}

      {screen === 'results' && selectedLevel && selectedUnit && selectedTest && (
        <ResultsScreen
          score={score}
          total={totalQuestions}
          questions={currentQuestions}
          answers={quizState.answers}
          onRestart={handleRestart}
          topicTitle={selectedTest.title}
          topicIcon={selectedTest.icon}
          testContext={{
            level: selectedLevel.title,
            unit: selectedUnit.title,
          }}
        />
      )}
    </>
  );
};
