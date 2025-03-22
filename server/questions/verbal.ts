import { Question } from '../types';

// Number Series Questions (L04)
export async function getNumberSeriesQuestions(): Promise<Question[]> {
  return [
    {
      question: "What comes next in the series: 2, 4, 8, 16, 32, __?",
      options: ["64", "48", "56", "40"],
      correctAnswer: 0,
      explanation: "Each number is multiplied by 2 (2×2=4, 4×2=8, etc.)"
    },
    {
      question: "Complete the series: 3, 6, 11, 18, 27, __?",
      options: ["38", "36", "40", "42"],
      correctAnswer: 0,
      explanation: "Add consecutive numbers starting from 3 (3+3=6, 6+5=11, 11+7=18, etc.)"
    },
    {
      question: "Find the next number: 1, 4, 9, 16, 25, __?",
      options: ["36", "49", "64", "81"],
      correctAnswer: 0,
      explanation: "Square numbers sequence (1=1², 4=2², 9=3², 16=4², 25=5², 36=6²)"
    },
    {
      question: "What comes next: 1, 3, 6, 10, 15, __?",
      options: ["21", "18", "20", "25"],
      correctAnswer: 0,
      explanation: "Add increasing numbers (+2, +3, +4, +5, +6)"
    },
    {
      question: "Complete: 2, 6, 12, 20, 30, __?",
      options: ["42", "40", "44", "46"],
      correctAnswer: 0,
      explanation: "Add increasing even numbers (+4, +6, +8, +10, +12)"
    },
    {
      question: "Next number: 5, 10, 20, 40, 80, __?",
      options: ["160", "120", "140", "100"],
      correctAnswer: 0,
      explanation: "Multiply by 2 each time"
    },
    {
      question: "Series: 3, 8, 15, 24, 35, __?",
      options: ["48", "46", "50", "44"],
      correctAnswer: 0,
      explanation: "Add increasing odd numbers (+5, +7, +9, +11, +13)"
    },
    {
      question: "Next: 1, 1, 2, 3, 5, 8, __?",
      options: ["13", "11", "14", "15"],
      correctAnswer: 0,
      explanation: "Fibonacci sequence (each number is sum of previous two)"
    },
    {
      question: "Complete: 7, 14, 28, 56, 112, __?",
      options: ["224", "200", "196", "220"],
      correctAnswer: 0,
      explanation: "Multiply by 2 each time"
    },
    {
      question: "Find next: 2, 5, 10, 17, 26, __?",
      options: ["37", "35", "39", "41"],
      correctAnswer: 0,
      explanation: "Add increasing numbers (+3, +5, +7, +9, +11)"
    }
  ];
}

// Letter Series Questions (L05)
export async function getLetterSeriesQuestions(): Promise<Question[]> {
  return [
    {
      question: "What comes next in the series: A, C, E, G, __?",
      options: ["I", "J", "K", "H"],
      correctAnswer: 0,
      explanation: "Pattern follows alternate letters (skip one letter each time)"
    },
    {
      question: "Complete the series: B, D, F, H, __?",
      options: ["J", "K", "I", "L"],
      correctAnswer: 0,
      explanation: "Pattern follows even-positioned letters in alphabet"
    },
    // Add 98 more similar questions...
  ];
}

// Continue with L06 through L12...

// L10: Verbal Reasoning Questions
export async function getVerbalReasoningQuestions(): Promise<Question[]> {
  return [
    {
      question: "If all flowers are plants, and some plants are trees, which of the following must be true?",
      options: [
        "Some flowers are trees",
        "All trees are flowers",
        "All flowers are trees",
        "No flowers are trees"
      ],
      correctAnswer: 0,
      explanation: "Using syllogistic reasoning, if all flowers are plants and some plants are trees, then some flowers might be trees"
    },
    // Add 99 more similar questions...
  ];
}

// L11: Word Order Questions
export async function getWordOrderQuestions(): Promise<Question[]> {
  return [
    {
      question: "Arrange the words to form a meaningful sentence: 1. quickly 2. the 3. fox 4. brown 5. jumps",
      options: [
        "2-4-3-1-5",
        "1-2-4-3-5",
        "3-4-2-5-1",
        "5-4-3-2-1"
      ],
      correctAnswer: 0,
      explanation: "The correct order is: the brown fox quickly jumps"
    },
    // Add 99 more similar questions...
  ];
}

// L12: Logical Sequence Questions
export async function getLogicalSequenceQuestions(): Promise<Question[]> {
  return [
    {
      question: "Complete the pattern: XY15, WX13, UV11, __?",
      options: ["ST9", "TS9", "ST8", "TS10"],
      correctAnswer: 0,
      explanation: "Letters shift two positions back, numbers decrease by 2"
    },
    // Add 99 more similar questions...
  ];
}

// All other question functions with proper exports...
export { getDirectionSenseQuestions } from './verbal/directionSense';
export { getBloodRelationQuestions } from './verbal/bloodRelations';
export { getCodingDecodingQuestions } from './verbal/codingDecoding';
export { getAnalogyQuestions } from './verbal/analogy';
export { getSynonymQuestions } from './verbal/synonyms';
export { getAntonymQuestions } from './verbal/antonyms';
export { getSentenceCompletionQuestions } from './verbal/sentenceCompletion';
export { getReadingComprehensionQuestions } from './verbal/readingComprehension';
export { getVerbalReasoningQuestions } from './verbal/verbalReasoning';
export { getWordOrderQuestions } from './verbal/wordOrder';
export { getLogicalSequenceQuestions } from './verbal/logicalSequence';