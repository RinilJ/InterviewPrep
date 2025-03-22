import { Question } from '../types';

// Logical Venn Questions (N01)
export async function getLogicalVennQuestions(): Promise<Question[]> {
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
    // Add 99 more similar questions...
  ];
}

// Dice and Cube Questions (N02)
export async function getDiceCubeQuestions(): Promise<Question[]> {
  return [
    {
      question: "If a dice shows 6 on top, 2 on front, and 3 on right, what number is on the bottom?",
      options: ["1", "4", "5", "3"],
      correctAnswer: 0,
      explanation: "Opposite faces sum to 7, so if top is 6, bottom must be 1"
    },
    // Add 99 more similar questions...
  ];
}

// Figure Series Questions (N03)
export async function getFigureSeriesQuestions(): Promise<Question[]> {
  return [
    {
      question: "What comes next in the sequence: Square → Triangle → Circle → Square → Triangle → ?",
      options: ["Circle", "Square", "Triangle", "Rectangle"],
      correctAnswer: 0,
      explanation: "The pattern repeats: Square, Triangle, Circle"
    },
    // Add 99 more similar questions...
  ];
}

// Pattern Completion Questions (N04)
export async function getPatternCompletionQuestions(): Promise<Question[]> {
  return [
    {
      question: "Complete the pattern: 2,4,8,16,32,?",
      options: ["64", "48", "56", "72"],
      correctAnswer: 0,
      explanation: "Each number is multiplied by 2"
    },
    // Add 99 more similar questions...
  ];
}