import { z } from 'zod';

// Helper function to format explanation
function formatExplanation(question: string, answer: string, reasoning: string): string {
  return `Correct Answer: ${answer}\n\nReasoning: ${reasoning}`;
}

// Cache for tracking used questions per test session
const sessionQuestions = new Map<string, Set<string>>();

// Pre-defined question banks for each topic
const directionSenseQuestions = [
  {
    question: "A person walks 3 km North, then 4 km East, and finally 3 km South. How far is he from the starting point?",
    options: ["4 km", "5 km", "6 km", "7 km"],
    correctAnswer: 0,
    explanation: "The person ends up 4 km East of the starting point as the North and South movements cancel out."
  },
  {
    question: "Starting from point A, Alex walks 5 km East to point B, then 12 km North to point C. How far is C from A?",
    options: ["13 km", "17 km", "15 km", "11 km"],
    correctAnswer: 0,
    explanation: "Using the Pythagorean theorem: √(5² + 12²) = 13 km"
  },
  {
    question: "Walking from his house, Sam goes 15 meters North, then 20 meters West, then 15 meters South. How far is he from his house?",
    options: ["20 meters", "25 meters", "30 meters", "35 meters"],
    correctAnswer: 0,
    explanation: "The North and South movements cancel out, leaving only 20 meters West"
  },
  // Add more unique direction sense questions...
];

const bloodRelationQuestions = [
  {
    question: "A is B's sister, C is B's mother, D is C's father, E is D's mother. How is A related to E?",
    options: ["Great granddaughter", "Grandmother", "Daughter", "Granddaughter"],
    correctAnswer: 0,
    explanation: "A is B's sister → C is their mother → D is their grandfather → E is their great grandmother"
  },
  {
    question: "If P is Q's son, S is P's sister, R is Q's mother, then how is S related to R?",
    options: ["Granddaughter", "Daughter", "Grandmother", "Cannot be determined"],
    correctAnswer: 0,
    explanation: "P is Q's son and S is P's sister, so S is Q's daughter. R is Q's mother, making S R's granddaughter"
  },
  // Add more unique blood relation questions...
];

const codingDecodingQuestions = [
  {
    question: "If COMPUTER is coded as RFUVQNPC, then how will PRINTER be coded?",
    options: ["QSJOUFQ", "SFUOJSQ", "QSJOUFS", "None of these"],
    correctAnswer: 2,
    explanation: "Each letter is replaced by the next letter in the alphabet (P→Q, R→S, etc.)"
  },
  {
    question: "In a certain code, '247' means 'spread the news', '147' means 'spread good news' and '367' means 'tell the truth'. What is the code for 'tell'?",
    options: ["3", "6", "7", "Cannot be determined"],
    correctAnswer: 0,
    explanation: "By comparing the codes, '3' must represent 'tell' as it's the unique digit in 'tell the truth'"
  },
  // Add more unique coding-decoding questions...
];

// Function to get random unique questions for a topic
function getUniqueQuestionsForTopic(topicId: string, count: number): any[] {
  let questionBank;
  switch (topicId) {
    case 'L01':
      questionBank = directionSenseQuestions;
      break;
    case 'L02':
      questionBank = bloodRelationQuestions;
      break;
    case 'L03':
      questionBank = codingDecodingQuestions;
      break;
    default:
      questionBank = directionSenseQuestions; // Fallback
  }

  // Shuffle and select questions
  const shuffledQuestions = [...questionBank].sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, count).map(q => ({
    ...q,
    options: [...q.options].sort(() => Math.random() - 0.5)
  }));
}

// Main function to get unique questions for a user
export function getUniqueQuestionsForUser(userId: number, topicId: string, count: number = 10): any[] {
  console.time('getUniqueQuestionsForUser');

  const sessionKey = `${userId}-${topicId}-${Date.now()}`;
  if (!sessionQuestions.has(sessionKey)) {
    sessionQuestions.set(sessionKey, new Set());
  }

  try {
    // Get unique questions for this topic
    const questions = getUniqueQuestionsForTopic(topicId, count);

    if (questions.length < count) {
      throw new Error(`Not enough questions available for topic ${topicId}`);
    }

    // Track used questions for this session
    const sessionUsedQuestions = sessionQuestions.get(sessionKey)!;
    questions.forEach(q => sessionUsedQuestions.add(q.question));

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

// Question bank structure
export const questionBank = {
  verbal: {
    "L01": { title: "Direction Sense", questions: directionSenseQuestions },
    "L02": { title: "Blood Relations", questions: bloodRelationQuestions },
    "L03": { title: "Coding and Decoding", questions: codingDecodingQuestions },
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

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}