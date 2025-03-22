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
  // Add more direction sense questions to ensure at least 10
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
  // Add more blood relation questions to ensure at least 10
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
  // Add more coding-decoding questions to ensure at least 10
];

// Get questions for a specific topic
function getQuestionsForTopic(topicId: string): any[] {
  console.log(`Getting questions for topic: ${topicId}`);

  switch(topicId) {
    case 'L01':
      return directionSenseQuestions;
    case 'L02':
      return bloodRelationQuestions;
    case 'L03':
      return codingDecodingQuestions;
    // Add cases for other topics
    default:
      throw new Error(`No questions available for topic ${topicId}`);
  }
}

// Function to get unique questions for a test session
export function getUniqueQuestionsForUser(userId: number, topicId: string, count: number = 10): any[] {
  console.log(`Getting ${count} questions for user ${userId}, topic ${topicId}`);
  const sessionKey = `${userId}-${topicId}-${Date.now()}`;

  try {
    // Get questions for the specific topic
    const topicQuestions = getQuestionsForTopic(topicId);

    if (!topicQuestions || topicQuestions.length < count) {
      throw new Error(`Not enough questions available for topic ${topicId}. Need ${count}, have ${topicQuestions?.length || 0}`);
    }

    // Initialize session tracking
    if (!sessionQuestions.has(sessionKey)) {
      sessionQuestions.set(sessionKey, new Set());
    }
    const sessionUsedQuestions = sessionQuestions.get(sessionKey)!;

    // Shuffle and select questions
    const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count).map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5)
    }));

    // Mark questions as used
    selected.forEach(q => sessionUsedQuestions.add(q.question));

    console.log(`Selected ${selected.length} questions for topic ${topicId}`);
    return selected;

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

const numberSeriesQuestions = [
  {
    question: "What comes next in the series: 2, 4, 8, 16, 32, __?",
    options: ["64", "48", "56", "40"],
    correctAnswer: 0,
    explanation: "Each number is multiplied by 2 to get the next number (2×2=4, 4×2=8, etc.)"
  },
  {
    question: "Find the next number: 1, 3, 6, 10, 15, __?",
    options: ["21", "18", "20", "25"],
    correctAnswer: 1,
    explanation: "The difference between consecutive terms increases by 1 (+2, +3, +4, +5)"
  },
  {
    question: "Complete the sequence: 3, 6, 11, 18, 27, __?",
    options: ["38", "36", "40", "42"],
    correctAnswer: 0,
    explanation: "Add consecutive numbers starting from 3 (3+3=6, 6+5=11, 11+7=18, etc.)"
  }
  // Add more number series questions...
];

const analogyQuestions = [
  {
    question: "Book is to Reading as Food is to:",
    options: ["Eating", "Cooking", "Tasting", "Serving"],
    correctAnswer: 0,
    explanation: "Book is used for Reading, similarly Food is used for Eating"
  },
  {
    question: "Bird is to Sky as Fish is to:",
    options: ["Water", "Ocean", "Sea", "River"],
    correctAnswer: 0,
    explanation: "Birds live/move in Sky, similarly Fish live/move in Water"
  }
  // Add more analogy questions...
];

const synonymQuestions = [
  {
    question: "Select the word most similar in meaning to 'Benevolent':",
    options: ["Kind", "Cruel", "Strict", "Harsh"],
    correctAnswer: 0,
    explanation: "Benevolent means kind or generous"
  },
  {
    question: "Choose the synonym for 'Eloquent':",
    options: ["Articulate", "Silent", "Quiet", "Reserved"],
    correctAnswer: 0,
    explanation: "Eloquent means fluent or persuasive in speaking"
  }
  // Add more synonym questions...
];

const logicalVennQuestions = [
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
  }
  // Add more Venn diagram questions...
];

const percentageQuestions = [
  {
    question: "If 15% of a number is 45, what is the number?",
    options: ["300", "250", "350", "400"],
    correctAnswer: 0,
    explanation: "If 15% = 45, then 1% = 3, and 100% = 300"
  },
  {
    question: "What is 25% of 120?",
    options: ["30", "40", "25", "35"],
    correctAnswer: 0,
    explanation: "25% = 1/4, so 25% of 120 = 120 ÷ 4 = 30"
  }
  // Add more percentage questions...
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const questionBank2 = {
  verbal: {
    "L03": { title: "Coding and Decoding", questions: codingDecodingQuestions },
    "L04": { title: "Number Series", questions: numberSeriesQuestions },
    "L05": { title: "Analogy", questions: analogyQuestions },
    "L06": { title: "Synonyms", questions: synonymQuestions },
    "L07": { title: "Antonyms", questions: [] },
    "L08": { title: "Sentence Completion", questions: [] },
    "L09": { title: "Reading Comprehension", questions: [] },
    "L10": { title: "Verbal Reasoning", questions: [] },
    "L11": { title: "Word Order", questions: [] },
    "L12": { title: "Logical Sequence", questions: [] }
  },
  nonVerbal: {
    "N01": { title: "Logical Venn Diagrams", questions: logicalVennQuestions },
    "N02": { title: "Dice and Cubes", questions: [] },
    "N03": { title: "Figure Series", questions: [] },
    "N04": { title: "Pattern Completion", questions: [] }
  },
  mathematical: {
    "Q01": { title: "Percentages", questions: percentageQuestions },
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