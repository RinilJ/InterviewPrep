// Mathematical Questions Module
import { Question } from '../types';

// Percentage Questions (Q01)
export async function getPercentageQuestions(): Promise<Question[]> {
  return [
    {
      question: "What is 25% of 120?",
      options: ["30", "25", "35", "40"],
      correctAnswer: 0,
      explanation: "25% = 1/4, so 25% of 120 = 120/4 = 30"
    },
    // Add 99 more similar questions...
  ];
}

// Profit and Loss Questions (Q02)
export async function getProfitLossQuestions(): Promise<Question[]> {
  return [
    {
      question: "A shopkeeper bought an item for ₹800 and sold it for ₹1000. What is the profit percentage?",
      options: ["25%", "20%", "30%", "15%"],
      correctAnswer: 0,
      explanation: "Profit = 200, Cost Price = 800, Profit % = (200/800) × 100 = 25%"
    },
    // Add 99 more similar questions...
  ];
}


// Time and Work Questions (Q04)
export async function getTimeWorkQuestions(): Promise<Question[]> {
  return [
    {
      question: "If 6 men can complete a work in 12 days, in how many days will 9 men complete the same work?",
      options: ["8", "10", "6", "9"],
      correctAnswer: 0,
      explanation: "Using inverse proportion: (6 × 12) ÷ 9 = 8 days"
    },
    // Add 99 more similar questions...
  ];
}

// Continue implementing remaining sections Q05-Q12...