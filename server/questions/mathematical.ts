// Mathematical Questions Module
import { Question } from '../types';

export function getPercentageQuestions(): Question[] {
  console.log('Loading Percentage questions');
  return [
    {
      question: "What is 25% of 120?",
      options: ["30", "25", "35", "40"],
      correctAnswer: 0,
      explanation: "25% = 1/4, so 25% of 120 = 120/4 = 30"
    },
    // Add more questions...
  ];
}

// Add other mathematical question generators...
