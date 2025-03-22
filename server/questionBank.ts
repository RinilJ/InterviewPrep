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
  // Add 8 more questions to ensure at least 10 total
  {
    question: "Walking from his house, Sam goes 15 meters North, then 20 meters West, then 15 meters South. How far is he from his house?",
    options: ["20 meters", "25 meters", "30 meters", "35 meters"],
    correctAnswer: 0,
    explanation: "The North and South movements cancel out, leaving only 20 meters West"
  },
  {
    question: "From point X, walking 6 km East to Y, then 8 km North to Z. Find the direct distance from X to Z.",
    options: ["10 km", "14 km", "12 km", "15 km"],
    correctAnswer: 0,
    explanation: "Using Pythagorean theorem: √(6² + 8²) = 10 km"
  },
  {
    question: "A man walks 4 km towards North, turns right and walks 3 km, turns right again and walks 4 km. How far is he from the starting point?",
    options: ["3 km", "4 km", "5 km", "7 km"],
    correctAnswer: 0,
    explanation: "After walking North and South, these cancel out. Only the 3 km East remains."
  },
  {
    question: "From his office, John walks 5 km North, then 5 km East, then 5 km South. What is the shortest distance back to his office?",
    options: ["5 km", "10 km", "15 km", "7.07 km"],
    correctAnswer: 0,
    explanation: "The North and South movements cancel out, leaving only 5 km East."
  },
  {
    question: "Starting from school, a student walks 8 km East, then 6 km North, then 8 km West. How far is the student from school?",
    options: ["6 km", "8 km", "10 km", "14 km"],
    correctAnswer: 0,
    explanation: "The East and West movements cancel out, leaving only 6 km North."
  },
  {
    question: "A cyclist rides 10 km South, then 10 km West, then 10 km North. What is the shortest distance to the starting point?",
    options: ["10 km", "20 km", "15 km", "30 km"],
    correctAnswer: 0,
    explanation: "The North and South movements cancel out, leaving 10 km West."
  },
  {
    question: "Walking from point P, 7 km East to Q, then 24 km North to R. What is the direct distance from P to R?",
    options: ["25 km", "31 km", "27 km", "29 km"],
    correctAnswer: 0,
    explanation: "Using Pythagorean theorem: √(7² + 24²) = 25 km"
  },
  {
    question: "A person walks 5 km North, then 12 km East, then 5 km South. Find the shortest distance to the starting point.",
    options: ["12 km", "17 km", "22 km", "10 km"],
    correctAnswer: 0,
    explanation: "The North and South movements cancel out, leaving only 12 km East."
  }
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
  // Add 8 more questions to ensure at least 10 total
  {
    question: "X is Y's brother. Z is Y's father. How is X related to Z?",
    options: ["Son", "Brother", "Father", "Nephew"],
    correctAnswer: 0,
    explanation: "If X is Y's brother and Z is Y's father, then X must be Z's son."
  },
  {
    question: "If A is B's father, B is C's brother, and D is C's daughter, how is A related to D?",
    options: ["Grandfather", "Uncle", "Father", "Brother"],
    correctAnswer: 0,
    explanation: "A is B's father, B is C's brother, so A is C's father, making A D's grandfather."
  },
  {
    question: "M is N's wife, O is M's son, P is O's sister. How is P related to N?",
    options: ["Daughter", "Sister", "Niece", "Aunt"],
    correctAnswer: 0,
    explanation: "M is N's wife, O and P are M's children, therefore P is N's daughter."
  },
  {
    question: "If J is K's sister, and L is K's daughter, how is J related to L?",
    options: ["Aunt", "Mother", "Sister", "Grandmother"],
    correctAnswer: 0,
    explanation: "J is K's sister, and L is K's daughter, making J L's aunt."
  },
  {
    question: "A's father is B's son. C is B's father. How is A related to C?",
    options: ["Great grandson", "Grandson", "Son", "Brother"],
    correctAnswer: 0,
    explanation: "B's son is A's father, and C is B's father, making C A's great grandfather."
  },
  {
    question: "If P is Q's daughter, and R is Q's mother, how is R related to P?",
    options: ["Grandmother", "Mother", "Aunt", "Sister"],
    correctAnswer: 0,
    explanation: "P is Q's daughter, and R is Q's mother, making R P's grandmother."
  },
  {
    question: "X's father's sister is Y's mother. How is Y related to X?",
    options: ["Cousin", "Sister", "Aunt", "Niece"],
    correctAnswer: 0,
    explanation: "X's father's sister (aunt) is Y's mother, making X and Y cousins."
  },
  {
    question: "If A is B's son, and C is B's brother, how is A related to C?",
    options: ["Nephew", "Son", "Brother", "Cousin"],
    correctAnswer: 0,
    explanation: "A is B's son, and C is B's brother, making A C's nephew."
  }
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
  { question: "If CAT is coded as 3120, what is the code for DOG?", options: ["4157", "4150", "4167", "5160"], correctAnswer: 1, explanation: "Each letter is replaced with its position in the alphabet" },
  { question: "Decode the message: '1234' if A=1, B=2, C=3, D=4", options: ["ABCD", "DCBA", "ADCB", "BADC"], correctAnswer: 0, explanation: "Replace numerical values with letters based on the key" },
  { question: "If 'apple' is coded as 'orange', 'orange' as 'banana', and 'banana' as 'grape', what is the code for 'apple'?", options: ["orange", "banana", "grape", "apple"], correctAnswer: 1, explanation: "Follow the given code conversions." },
  { question: "If 'sky' is 'blue', 'blue' is 'green', and 'green' is 'red', what color is the sky?", options: ["blue", "green", "red", "sky"], correctAnswer: 1, explanation: "Use the code conversions." },
  { question: "Decode: '1.5.11.12' if 1=A, 5=E, 11=K, 12=L", options: ["AEKL", "LEKA", "AKEL", "EKLA"], correctAnswer: 0, explanation: "Replace the numbers using the key provided." },
  { question: "If 'house' is coded as '1.8.21.19.5', what is 'home'?", options: ["1.15.13.5", "1.13.15.5", "8.15.13.5", "5.13.15.1"], correctAnswer: 0, explanation: "Assign numbers to each letter based on position in alphabet (A=1, B=2 etc.)" },
  { question: "If 'rain' is coded as 'sun', what is the code for 'sun'?", options: ["rain", "moon", "star", "cloud"], correctAnswer: 0, explanation: "Simple direct substitution" },
  { question: "If 'hot' is coded as 'cold', what is the code for 'cold'?", options: ["hot", "warm", "cool", "icy"], correctAnswer: 0, explanation: "Simple direct substitution" }
];


// Function to get questions for a specific topic
function getQuestionsForTopic(topicId: string): any[] {
  console.log(`Getting questions for topic: ${topicId}`);

  let questions;
  switch(topicId) {
    case 'L01':
      questions = directionSenseQuestions;
      break;
    case 'L02':
      questions = bloodRelationQuestions;
      break;
    case 'L03':
      questions = codingDecodingQuestions;
      break;
    default:
      throw new Error(`No questions available for topic ${topicId}`);
  }

  if (!questions || questions.length < 10) {
    throw new Error(`Not enough questions available for topic ${topicId}. Need 10, have ${questions?.length || 0}`);
  }

  return questions;
}

// Function to get unique questions for a test session
export function getUniqueQuestionsForUser(userId: number, topicId: string, count: number = 10): any[] {
  console.log(`Getting ${count} questions for user ${userId}, topic ${topicId}`);
  const sessionKey = `${userId}-${topicId}-${Date.now()}`;

  try {
    // Get questions for the specific topic
    const topicQuestions = getQuestionsForTopic(topicId);

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