import { z } from 'zod';

// Helper function for explanations
function formatExplanation(question: string, answer: string, reasoning: string): string {
  return `Correct Answer: ${answer}\n\nReasoning: ${reasoning}`;
}

// Cache for tracking used questions per test session
const sessionQuestions = new Map<string, Set<string>>();

// Function to get unique random indices
function getUniqueRandomIndices(max: number, count: number): number[] {
  const indices = Array.from({ length: max }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

// Question bank structure (questions are loaded on-demand)
const questionBank = {
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

// Load questions for a specific topic
function loadQuestionsForTopic(topicId: string): any[] {
  console.log(`Loading questions for topic: ${topicId}`);

  let questions = [];
  switch(topicId) {
    case 'L01':
      questions = getDirectionSenseQuestions();
      break;
    case 'L02':
      questions = getBloodRelationQuestions();
      break;
    case 'L03':
      questions = getCodingDecodingQuestions();
      break;
    case 'L04':
      questions = getNumberSeriesQuestions();
      break;
    case 'L05':
      questions = getAnalogyQuestions();
      break;
    case 'L06':
      questions = getSynonymQuestions();
      break;
    case 'L07':
      questions = getAntonymQuestions();
      break;
    case 'L08':
      questions = getSentenceCompletionQuestions();
      break;
    case 'L09':
      questions = getReadingComprehensionQuestions();
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
  if (!sessionQuestions.has(sessionKey)) {
    sessionQuestions.set(sessionKey, new Set());
  }

  try {
    // Get questions for this topic
    const topicQuestions = loadQuestionsForTopic(topicId);
    const sessionUsedQuestions = sessionQuestions.get(sessionKey)!;

    // Select random questions
    const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count).map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5)
    }));

    // Mark questions as used
    selected.forEach(q => sessionUsedQuestions.add(q.question));

    return selected;
  } catch (error) {
    console.error('Error in getUniqueQuestionsForUser:', error);
    throw error;
  }
}

// Clean up old sessions periodically
setInterval(() => {
  const oneHourAgo = Date.now() - 3600000;
  [...sessionQuestions.keys()].forEach(key => {
    const timestamp = parseInt(key.split('-')[2]);
    if (timestamp < oneHourAgo) {
      sessionQuestions.delete(key);
    }
  });
}, 3600000);

// Question generator functions
function getDirectionSenseQuestions() {
  return [
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
}

function getBloodRelationQuestions() {
  return [
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
}


function getCodingDecodingQuestions() {
  return [
    {
      question: "If COMPUTER is coded as RFUVQNPC, then how will PRINTER be coded?",
      options: ["QSJOUFQ", "SFUOJSQ", "QSJOUFS", "None of these"],
      correctAnswer: 2,
      explanation: "Each letter is replaced by the next letter in the alphabet (P→Q, R→S, etc.)"
    },
    {
      question: "In a code, 'TIGER' is written as '51937' and 'LION' is written as '4162'. How will 'LEG' be written?",
      options: ["439", "493", "539", "593"],
      correctAnswer: 0,
      explanation: "Each letter is assigned a number: L=4, E=3, G=9"
    },
    {
      question: "If 'FACE' is coded as 'ECAF', how is 'BOOK' coded?",
      options: ["KOOB", "OKOB", "BOKO", "OBOK"],
      correctAnswer: 0,
      explanation: "The word is written in reverse order"
    },
    {
      question: "If 'RED' is coded as '345' and 'BLUE' is coded as '1234', how will 'GREEN' be coded?",
      options: ["54332", "53442", "54334", "53432"],
      correctAnswer: 0,
      explanation: "Each letter is assigned a unique number based on the pattern"
    },
    {
      question: "If 'HELP' is '8427' and 'WORK' is '5639', what is 'WALK'?",
      options: ["5149", "5429", "5247", "5129"],
      correctAnswer: 0,
      explanation: "Letters are coded according to the established pattern"
    },
    {
      question: "In a certain code language, if 'GARDEN' is written as 'LCXJKT', how will 'FOREST' be written?",
      options: ["LUXKYZ", "LUXKYY", "LUZKYZ", "LYXKYZ"],
      correctAnswer: 0,
      explanation: "Each letter is shifted by a fixed pattern in the alphabet"
    },
    {
      question: "If '247' means 'good sweet fruit', '256' means 'sweet yellow fruit', what is the code for 'good'?",
      options: ["4", "2", "7", "5"],
      correctAnswer: 1,
      explanation: "By comparing the codes, '2' appears in good sweet fruit but not in sweet yellow fruit"
    },
    {
      question: "If 'MOUSE' is coded as '32901', how is 'HOUSE' coded?",
      options: ["72901", "82901", "92901", "62901"],
      correctAnswer: 0,
      explanation: "Only the first letter changes based on its position in the alphabet"
    },
    {
      question: "If 'PAINT' becomes 'RCKPV', what will 'MOHAN' become?",
      options: ["OQJCP", "OQJPC", "QOJCP", "QOJPC"],
      correctAnswer: 0,
      explanation: "Each letter is shifted by a specific pattern"
    },
    {
      question: "In a certain code '526' means 'sky is blue', '678' means 'blue is beautiful', what is the code for 'is'?",
      options: ["6", "2", "8", "5"],
      correctAnswer: 1,
      explanation: "By comparing both codes, '2' represents 'is' as it appears in first code but not in second"
    }
  ];
}

function getNumberSeriesQuestions() {
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
      correctAnswer: 1,
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

function getAnalogyQuestions() {
  return [
    {
      question: "Book is to Reading as Food is to:",
      options: ["Eating", "Cooking", "Tasting", "Serving"],
      correctAnswer: 0,
      explanation: "As Book is used for Reading, Food is used for Eating"
    },
    {
      question: "Bird is to Sky as Fish is to:",
      options: ["Water", "Ocean", "Sea", "River"],
      correctAnswer: 0,
      explanation: "As Birds live in Sky, Fish live in Water"
    },
    {
      question: "Doctor is to Patient as Teacher is to:",
      options: ["Student", "Class", "School", "Book"],
      correctAnswer: 0,
      explanation: "As Doctor treats Patient, Teacher teaches Student"
    },
    {
      question: "Clock is to Time as Thermometer is to:",
      options: ["Temperature", "Heat", "Weather", "Mercury"],
      correctAnswer: 0,
      explanation: "As Clock measures Time, Thermometer measures Temperature"
    },
    {
      question: "Pencil is to Write as Scissors is to:",
      options: ["Cut", "Sharp", "Paper", "Tool"],
      correctAnswer: 0,
      explanation: "As Pencil is used to Write, Scissors are used to Cut"
    },
    {
      question: "Tree is to Forest as Brick is to:",
      options: ["Building", "Wall", "House", "Construction"],
      correctAnswer: 0,
      explanation: "As Tree is part of Forest, Brick is part of Building"
    },
    {
      question: "Painter is to Brush as Writer is to:",
      options: ["Pen", "Paper", "Book", "Story"],
      correctAnswer: 0,
      explanation: "As Painter uses Brush, Writer uses Pen"
    },
    {
      question: "Car is to Garage as Ship is to:",
      options: ["Harbor", "Ocean", "Dock", "Sea"],
      correctAnswer: 0,
      explanation: "As Car is kept in Garage, Ship is kept in Harbor"
    },
    {
      question: "Light is to Dark as Day is to:",
      options: ["Night", "Evening", "Dusk", "Sunset"],
      correctAnswer: 0,
      explanation: "As Light is opposite to Dark, Day is opposite to Night"
    },
    {
      question: "Triangle is to Three as Square is to:",
      options: ["Four", "Box", "Rectangle", "Shape"],
      correctAnswer: 0,
      explanation: "As Triangle has Three sides, Square has Four sides"
    }
  ];
}

function getSynonymQuestions() {
  return [
    {
      question: "Select the word most similar in meaning to 'Benevolent':",
      options: ["Kind", "Cruel", "Strict", "Harsh"],
      correctAnswer: 0,
      explanation: "Benevolent means kind or generous in nature"
    },
    {
      question: "Choose the synonym for 'Eloquent':",
      options: ["Articulate", "Silent", "Quiet", "Reserved"],
      correctAnswer: 0,
      explanation: "Eloquent means fluent or persuasive in speaking"
    },
    {
      question: "Which word means the same as 'Diligent'?",
      options: ["Hardworking", "Lazy", "Careless", "Idle"],
      correctAnswer: 0,
      explanation: "Diligent means showing persistent effort and care"
    },
    {
      question: "Find the synonym of 'Abundant':",
      options: ["Plentiful", "Scarce", "Limited", "Rare"],
      correctAnswer: 0,
      explanation: "Abundant means existing in large quantities"
    },
    {
      question: "Which word is closest in meaning to 'Courageous'?",
      options: ["Brave", "Fearful", "Timid", "Weak"],
      correctAnswer: 0,
      explanation: "Courageous means showing bravery"
    },
    {
      question: "Select the synonym for 'Magnificent':",
      options: ["Splendid", "Ordinary", "Plain", "Simple"],
      correctAnswer: 0,
      explanation: "Magnificent means impressive or beautiful"
    },
    {
      question: "Which word means the same as 'Prudent'?",
      options: ["Wise", "Foolish", "Reckless", "Hasty"],
      correctAnswer: 0,
      explanation: "Prudent means acting with care and thought"
    },
    {
      question: "Find the synonym of 'Authentic':",
      options: ["Genuine", "Fake", "False", "Artificial"],
      correctAnswer: 0,
      explanation: "Authentic means genuine or real"
    },
    {
      question: "Select the word most similar to 'Tranquil':",
      options: ["Peaceful", "Agitated", "Disturbed", "Chaotic"],
      correctAnswer: 0,
      explanation: "Tranquil means calm and peaceful"
    },
    {
      question: "Choose the synonym for 'Jubilant':",
      options: ["Joyful", "Sad", "Gloomy", "Depressed"],
      correctAnswer: 0,
      explanation: "Jubilant means feeling or expressing great happiness"
    }
  ];
}

function getAntonymQuestions() {
  return [
    {
      question: "Choose the word most opposite in meaning to 'Ancient':",
      options: ["Modern", "Old", "Archaic", "Traditional"],
      correctAnswer: 0,
      explanation: "Ancient means very old, so its opposite is Modern"
    },
    {
      question: "Select the antonym for 'Brave':",
      options: ["Cowardly", "Bold", "Daring", "Heroic"],
      correctAnswer: 0,
      explanation: "Brave means courageous, its opposite is Cowardly"
    },
    {
      question: "Find the opposite of 'Generous':",
      options: ["Stingy", "Kind", "Giving", "Charitable"],
      correctAnswer: 0,
      explanation: "Generous means giving freely, its opposite is Stingy"
    },
    {
      question: "Which word is the antonym of 'Victory'?",
      options: ["Defeat", "Success", "Triumph", "Achievement"],
      correctAnswer: 0,
      explanation: "Victory means winning, its opposite is Defeat"
    },
    {
      question: "Select the word opposite to 'Transparent':",
      options: ["Opaque", "Clear", "Visible", "Obvious"],
      correctAnswer: 0,
      explanation: "Transparent means clear, its opposite is Opaque"
    },
    {
      question: "Choose the antonym for 'Temporary':",
      options: ["Permanent", "Brief", "Short", "Fleeting"],
      correctAnswer: 0,
      explanation: "Temporary means lasting for a short time, its opposite is Permanent"
    },
    {
      question: "Find the opposite of 'Abundant':",
      options: ["Scarce", "Plenty", "Much", "Numerous"],
      correctAnswer: 0,
      explanation: "Abundant means plentiful, its opposite is Scarce"
    },
    {
      question: "Which word is the antonym of 'Artificial'?",
      options: ["Natural", "Synthetic", "Fake", "Man-made"],
      correctAnswer: 0,
      explanation: "Artificial means made by humans, its opposite is Natural"
    },
    {
      question: "Select the word opposite to 'Dangerous':",
      options: ["Safe", "Risky", "Hazardous", "Perilous"],
      correctAnswer: 0,
      explanation: "Dangerous means unsafe, its opposite is Safe"
    },
    {
      question: "Choose the antonym for 'Maximum':",
      options: ["Minimum", "Highest", "Greatest", "Most"],
      correctAnswer: 0,
      explanation: "Maximum means the highest amount, its opposite is Minimum"
    }
  ];
}

function getSentenceCompletionQuestions() {
  return [
    {
      question: "Despite the heavy rain, the team decided to _____ with the outdoor practice session.",
      options: ["proceed", "cancel", "postpone", "delay"],
      correctAnswer: 0,
      explanation: "Context suggests determination to continue despite obstacles"
    },
    {
      question: "The scientist's new theory was so _____ that even experts in the field had difficulty understanding it.",
      options: ["complex", "simple", "obvious", "clear"],
      correctAnswer: 0,
      explanation: "Context suggests the theory was difficult to understand"
    },
    {
      question: "The mountain climbers were _____ by the sudden snowstorm and had to return to base camp.",
      options: ["forced", "encouraged", "motivated", "inspired"],
      correctAnswer: 0,
      explanation: "Context indicates they had to stop due to weather"
    },
    {
      question: "The old manuscript was so _____ that historians could barely read its contents.",
      options: ["faded", "bright", "colorful", "fresh"],
      correctAnswer: 0,
      explanation: "Context suggests difficulty in reading due to age"
    },
    {
      question: "The company's new policies were designed to _____ employee productivity and job satisfaction.",
      options: ["enhance", "reduce", "limit", "restrict"],
      correctAnswer: 0,
      explanation: "Context implies positive improvement"
    },
    {
      question: "After hours of negotiation, the two parties finally reached a _____ agreement.",
      options: ["mutual", "disputed", "conflicting", "divided"],
      correctAnswer: 0,
      explanation: "Context indicates both parties came to terms"
    },
    {
      question: "The music was so _____ that everyone at the concert was dancing.",
      options: ["infectious", "boring", "dull", "monotonous"],
      correctAnswer: 0,
      explanation: "Context shows the music had a positive effect on people"
    },
    {
      question: "The detective's investigation was _____ by the lack of physical evidence.",
      options: ["hampered", "helped", "assisted", "supported"],
      correctAnswer: 0,
      explanation: "Context suggests difficulty due to missing evidence"
    },
    {
      question: "The new restaurant's cuisine was so _____ that it quickly became popular in the neighborhood.",
      options: ["delicious", "tasteless", "bland", "ordinary"],
      correctAnswer: 0,
      explanation: "Context indicates positive reception"
    },
    {
      question: "The students were _____ to learn that their favorite teacher was retiring.",
      options: ["saddened", "delighted", "excited", "pleased"],
      correctAnswer: 0,
      explanation: "Context suggests emotional loss"
    }
  ];
}

function getReadingComprehensionQuestions() {
  return [
    {
      question: `Read the following passage:
Renewable energy sources, such as solar and wind power, are becoming increasingly important in our fight against climate change. These sources provide clean energy without producing harmful greenhouse gases. However, they also face challenges such as intermittent availability and storage issues. Scientists and engineers are working on innovative solutions to overcome these limitations.

What is the main advantage of renewable energy sources?`,
      options: [
        "They produce no greenhouse gases",
        "They are always available",
        "They are cheap to install",
        "They require no maintenance"
      ],
      correctAnswer: 0,
      explanation: "The passage states that renewable sources provide clean energy without producing harmful greenhouse gases"
    },
    {
      question: `Read the following passage:
Artificial Intelligence (AI) is transforming various industries, from healthcare to transportation. Machine learning algorithms can analyze vast amounts of data to identify patterns and make predictions. In healthcare, AI assists doctors in diagnosing diseases and recommending treatments. However, there are concerns about privacy, bias in algorithms, and the potential impact on employment.

How does AI benefit healthcare?`,
      options: [
        "By replacing doctors completely",
        "By assisting in diagnosis and treatment",
        "By reducing healthcare costs only",
        "By managing hospital administration"
      ],
      correctAnswer: 1,
      explanation: "The passage mentions AI assists doctors in diagnosing diseases and recommending treatments"
    },
    {
      question: `Read the following passage:
The human brain contains approximately 86 billion neurons, forming trillions of connections. These connections allow us to think, feel, and make decisions. Recent research has shown that the braincontinues to form new connections throughout our lives, a process known as neuroplasticity. This discovery has important implications for learning and recovery from brain injuries.

What is neuroplasticity?`,
      options: [
        "Brain's ability to form new connections",
        "Number of neurons in the brain",
        "Brain's size at birth",
        "Speed of neural transmission"
      ],
      correctAnswer: 0,
      explanation: "The passage defines neuroplasticity as the brain's ability to form new connections throughout life"
    },
    {
      question: `Read the following passage:
Ocean acidification is a growing environmental concern. As atmospheric carbon dioxide levels rise, more CO2 dissolves in seawater, making it more acidic. This increased acidity affects marine organisms, particularly those that build shells or skeletons from calcium carbonate. Coral reefs and shellfish are especially vulnerable to these changes.

What is the main cause of ocean acidification?`,
      options: [
        "Rising atmospheric CO2 levels",
        "Industrial pollution",
        "Ocean temperature changes",
        "Marine organism decay"
      ],
      correctAnswer: 0,
      explanation: "The passage states that rising atmospheric carbon dioxide leads to more CO2 dissolving in seawater"
    },
    {
      question: `Read the following passage:
The Amazon rainforest, often called the "lungs of the planet," plays a crucial role in regulating Earth's climate. It absorbs vast amounts of carbon dioxide from the atmosphere and releases oxygen. Deforestation, driven by agriculture and logging, is a major threat to this vital ecosystem, reducing its capacity to absorb CO2 and contributing to climate change.

What is the Amazon rainforest's main function regarding the climate?`,
      options: [
        "Absorbs CO2 and releases oxygen",
        "Produces rainfall only",
        "Regulates ocean currents",
        "Supports biodiversity only"
      ],
      correctAnswer: 0,
      explanation: "The passage highlights the Amazon's role in absorbing CO2 and releasing oxygen"
    },
    {
      question: `Read the following passage:
The Great Barrier Reef, the world's largest coral reef system, is facing severe threats from climate change, such as coral bleaching and ocean acidification. Rising sea temperatures cause coral bleaching, where corals expel their symbiotic algae, leading to their death. Ocean acidification weakens coral skeletons, making them more susceptible to damage.

What causes coral bleaching in the Great Barrier Reef?`,
      options: [
        "Rising sea temperatures",
        "Ocean acidification",
        "Overfishing",
        "Pollution"
      ],
      correctAnswer: 0,
      explanation: "The passage explicitly states that rising sea temperatures cause coral bleaching"
    },
    {
      question: `Read the following passage:
The ozone layer, a region in Earth's stratosphere, absorbs most of the sun's harmful ultraviolet (UV) radiation. This protection is crucial for life on Earth, as excessive UV exposure can cause skin cancer and other health problems. Depletion of the ozone layer, primarily caused by the release of ozone-depleting substances, poses a significant environmental risk.

Why is the ozone layer important?`,
      options: [
        "It absorbs harmful UV radiation",
        "It regulates rainfall patterns",
        "It creates wind currents",
        "It influences ocean temperatures"
      ],
      correctAnswer: 0,
      explanation: "The passage clearly states that the ozone layer absorbs harmful UV radiation"
    },
    {
      question: `Read the following passage:
Sustainable development aims to meet the needs of the present without compromising the ability of future generations to meet their own needs. It involves balancing economic growth, social equity, and environmental protection.  It requires careful management of natural resources and a transition towards renewable energy sources.

What is the main goal of sustainable development?`,
      options: [
        "Meeting present needs without harming future generations",
        "Achieving rapid economic growth only",
        "Protecting the environment at all costs",
        "Ensuring social equity only"
      ],
      correctAnswer: 0,
      explanation: "The passage defines sustainable development as meeting present needs without compromising future generations' ability to meet their own"
    },
    {
      question: `Read the following passage:
The process of photosynthesis is essential for life on Earth. Plants use sunlight, water, and carbon dioxide to produce glucose (a type of sugar) and oxygen.  This process is the foundation of most food chains, providing energy for nearly all living organisms.

What is the primary product of photosynthesis?`,
      options: [
        "Glucose and oxygen",
        "Water and carbon dioxide",
        "Sunlight and energy",
        "Minerals and nutrients"
      ],
      correctAnswer: 0,
      explanation: "The passage clearly states that plants produce glucose and oxygen through photosynthesis"
    }
  ];
}

export { questionBank };