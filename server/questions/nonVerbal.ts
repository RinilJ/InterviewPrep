// Non-verbal Questions Module
import { Question } from '../types';

export function getLogicalVennQuestions(): Question[] {
  console.log('Loading Logical Venn questions');
  return [
    {
      question: "In a Venn diagram showing the relationship between 'Birds', 'Flying creatures', and 'Insects', where would a butterfly be placed?",
      options: [
        "Intersection of Flying creatures and Insects",
        "Only in Birds",
        "Only in Insects",
        "Outside all circles"
      ],
      correctAnswer: 0,
      explanation: "A butterfly is both a flying creature and an insect"
    },
    // Add more questions...
  ];
}

// Add other non-verbal question generators...
