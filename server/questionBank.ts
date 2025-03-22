import { z } from 'zod';

// Helper function to format explanation
function formatExplanation(question: string, answer: string, reasoning: string, formula?: string): string {
  let explanation = `Correct Answer: ${answer}\n\nReasoning: ${reasoning}`;
  if (formula) {
    explanation += `\n\nFormula Used: ${formula}`;
  }
  return explanation;
}

// Function to get unique random indices
function getUniqueRandomIndices(max: number, count: number): number[] {
  const indices = Array.from({ length: max }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

// Cache for tracking used questions per test session
const sessionQuestions = new Map<string, Set<string>>();

// Function to generate questions dynamically
function generateQuestionsForTopic(topicId: string, count: number = 15): any[] {
  console.time(`generateQuestionsForTopic-${topicId}`);

  const questions = [];
  const uniqueQuestionKeys = new Set<string>();

  for (let attempts = 0; attempts < count * 2 && questions.length < count; attempts++) {
    let question;
    if (topicId.startsWith('L')) {
      question = generateVerbalQuestion(attempts);
    } else if (topicId.startsWith('N')) {
      question = generateNonVerbalQuestion(attempts);
    } else {
      question = generateMathQuestion(attempts);
    }

    // Ensure question uniqueness using a key
    const questionKey = `${question.question}-${question.correctAnswer}`;
    if (!uniqueQuestionKeys.has(questionKey)) {
      uniqueQuestionKeys.add(questionKey);
      questions.push(question);
    }
  }

  console.timeEnd(`generateQuestionsForTopic-${topicId}`);
  console.log(`Generated ${questions.length} unique questions for topic ${topicId}`);

  return questions;
}

function generateVerbalQuestion(index: number): any {
  const directions = ['North', 'South', 'East', 'West'];
  const steps = Math.floor(Math.random() * 2) + 2; // 2-3 steps for simplicity
  const path = [];

  const usedDirections = new Set();
  for (let i = 0; i < steps; i++) {
    let dir;
    do {
      dir = directions[Math.floor(Math.random() * directions.length)];
    } while (usedDirections.has(dir));
    usedDirections.add(dir);

    const dist = Math.floor(Math.random() * 5) + 1;
    path.push(`${dist}km ${dir}`);
  }

  const question = `A person walks ${path.join(', then ')}. What is their final direction?`;
  const correctAnswer = Math.floor(Math.random() * directions.length);

  return {
    question,
    options: directions,
    correctAnswer,
    explanation: `Follow the path step by step to determine the final direction.`
  };
}

function generateNonVerbalQuestion(index: number): any {
  const shapes = ['circle', 'triangle', 'square', 'pentagon'];
  const sequence = shapes.slice(0, 3);
  const correctAnswer = Math.floor(Math.random() * shapes.length);

  return {
    question: `What comes next in the sequence: ${sequence.join(', ')}?`,
    options: shapes,
    correctAnswer,
    explanation: `Look for the pattern in the sequence.`
  };
}

function generateMathQuestion(index: number): any {
  const num1 = Math.floor(Math.random() * 50) + 1;
  const num2 = Math.floor(Math.random() * 50) + 1;
  const operators = ['+', '-', '*'];
  const operator = operators[index % operators.length];

  let answer: number, question: string;
  switch (operator) {
    case '+':
      answer = num1 + num2;
      question = `What is ${num1} + ${num2}?`;
      break;
    case '-':
      answer = num1 - num2;
      question = `What is ${num1} - ${num2}?`;
      break;
    case '*':
      answer = num1 * num2;
      question = `What is ${num1} × ${num2}?`;
      break;
    default:
      answer = num1 + num2;
      question = `What is ${num1} + ${num2}?`;
  }

  const options = [
    answer,
    answer + Math.floor(Math.random() * 5) + 1,
    answer - Math.floor(Math.random() * 5) - 1,
    answer * 2
  ];

  return {
    question,
    options: shuffleArray(options),
    correctAnswer: 0,
    explanation: `Calculate using basic arithmetic.`
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Main function to get unique questions for a user
export function getUniqueQuestionsForUser(userId: number, topicId: string, count: number = 10): any[] {
  console.time('getUniqueQuestionsForUser');

  const sessionKey = `${userId}-${topicId}-${Date.now()}`;
  if (!sessionQuestions.has(sessionKey)) {
    sessionQuestions.set(sessionKey, new Set());
  }

  try {
    console.time('generateQuestions');
    const questions = generateQuestionsForTopic(topicId, count);
    console.timeEnd('generateQuestions');

    if (questions.length < count) {
      throw new Error(`Could not generate enough unique questions (got ${questions.length}, needed ${count})`);
    }

    // Mark questions as used and shuffle options
    const sessionUsedQuestions = sessionQuestions.get(sessionKey)!;
    questions.forEach(q => {
      sessionUsedQuestions.add(q.question);
      q.options = shuffleArray([...q.options]);
      if (q.correctAnswer !== 0) {
        const correctOption = q.options[q.correctAnswer];
        q.options = [correctOption, ...q.options.filter(opt => opt !== correctOption)];
        q.correctAnswer = 0;
      }
    });

    console.timeEnd('getUniqueQuestionsForUser');
    return questions;

  } catch (error) {
    console.error('Error in getUniqueQuestionsForUser:', error);
    throw error;
  }
}

// Clean up old sessions periodically
setInterval(() => {
  const oneHourAgo = Date.now() - 3600000;
  for (const [key] of sessionQuestions) {
    const timestamp = parseInt(key.split('-')[2]);
    if (timestamp < oneHourAgo) {
      sessionQuestions.delete(key);
    }
  }
}, 3600000);

// Question bank structure (questions are generated on-demand)
export const questionBank = {
  verbal: {
    "L01": { title: "Direction Sense", questions: [] },
    "L02": { title: "Blood Relations", questions: [] },
    "L03": { title: "Coding and Decoding", questions: [] },
    "L04": { title: "Number Series", questions: [] },
    "L05": { title: "Analogy", questions: [] },
    "L06": { title: "Synonyms", questions: [] },
    "L07": { title: "Antonyms", questions: [] },
    "L08": { title: "Sentence Completion", questions: [] },
    "L09": { title: "Reading Comprehension", questions: [] },
    "L10": { title: "Verbal Reasoning", questions: [] },
    "L11": { title: "Word Order", questions: [] },
    "L12": { title: "Logical Sequence", questions: [] }
  },
  nonVerbal: {
    "N01": { title: "Logical Venn Diagrams", questions: [] },
    "N02": { title: "Dice and Cubes", questions: [] },
    "N03": { title: "Figure Series", questions: [] },
    "N04": { title: "Pattern Completion", questions: [] }
  },
  mathematical: {
    "Q01": { title: "Percentages", questions: [] },
    "Q02": { title: "Profit and Loss", questions: [] },
    "Q03": { title: "Interest", questions: [] },
    "Q04": { title: "Time and Work", questions: [] },
    "Q05": { title: "Time and Distance", questions: [] },
    "Q06": { title: "Averages", questions: [] },
    "Q07": { title: "Ratios and Proportions", questions: [] },
    "Q08": { title: "Geometry", questions: [] },
    "Q09": { title: "Numbers", questions: [] },
    "Q10": { title: "Data Interpretation", questions: [] },
    "Q11": { title: "Permutations and Combinations", questions: [] },
    "Q12": { title: "Probability", questions: [] }
  }
};