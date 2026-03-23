'use client';

import React from 'react';
import { GrammarTopic } from '@/data/types';

interface TopicSelectorProps {
  topics: GrammarTopic[];
  onSelectTopic: (topic: GrammarTopic) => void;
  onBack?: () => void;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({ topics, onSelectTopic, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8 animate-fadeIn">
          {onBack && (
            <button
              onClick={onBack}
              className="mb-6 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <span className="text-xl">←</span>
              <span className="text-sm font-medium">Back</span>
            </button>
          )}
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Grammar Mastery</h1>
          <p className="text-lg text-slate-600">Choose a grammar topic and test your knowledge</p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {topics.map((topic, index) => (
            <div
              key={topic.id}
              className="animate-slideIn"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <button
                onClick={() => onSelectTopic(topic)}
                className="w-full h-full p-6 rounded-2xl bg-white border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-left group relative overflow-hidden"
              >
                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${topic.color}`}></div>

                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {topic.icon}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-2 text-gray-900">{topic.title}</h2>

                {/* Description */}
                <p className="text-sm mb-4 text-gray-600">{topic.description}</p>

                {/* Question Count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    {topic.questions.length} questions
                  </span>
                  <span className="text-lg text-gray-600 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="text-center py-8 border-t border-slate-200">
          <p className="text-slate-600 text-sm">
            {topics.length} topics • {topics.reduce((sum, t) => sum + t.questions.length, 0)} total questions
          </p>
        </div>
      </div>
    </div>
  );
};
