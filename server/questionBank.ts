import { Question, QuestionBank } from './types';
import * as verbalQuestions from './questions/verbal';
import * as nonVerbalQuestions from './questions/nonVerbal';
import * as mathematicalQuestions from './questions/mathematical';

// Cache for tracking used questions per test session
const sessionQuestions = new Map<string, Set<string>>();

// Question bank structure with lazy loading
export const questionBank: QuestionBank = {
  verbal: {
    "L01": {
      title: "Direction Sense",
      getQuestions: verbalQuestions.getDirectionSenseQuestions
    },
    "L02": {
      title: "Blood Relations",
      getQuestions: verbalQuestions.getBloodRelationQuestions
    },
    "L03": {
      title: "Coding and Decoding",
      getQuestions: verbalQuestions.getCodingDecodingQuestions
    },
    "L04": {
      title: "Number Series",
      getQuestions: verbalQuestions.getNumberSeriesQuestions
    },
    "L05": {
      title: "Analogy",
      getQuestions: verbalQuestions.getAnalogyQuestions
    },
    "L06": {
      title: "Synonyms",
      getQuestions: verbalQuestions.getSynonymQuestions
    },
    "L07": {
      title: "Antonyms",
      getQuestions: verbalQuestions.getAntonymQuestions
    },
    "L08": {
      title: "Sentence Completion",
      getQuestions: verbalQuestions.getSentenceCompletionQuestions
    },
    "L09": {
      title: "Reading Comprehension",
      getQuestions: verbalQuestions.getReadingComprehensionQuestions
    },
    "L10": {
      title: "Verbal Reasoning",
      getQuestions: verbalQuestions.getVerbalReasoningQuestions
    },
    "L11": {
      title: "Word Order",
      getQuestions: verbalQuestions.getWordOrderQuestions
    },
    "L12": {
      title: "Logical Sequence",
      getQuestions: verbalQuestions.getLogicalSequenceQuestions
    }
  },
  nonVerbal: {
    "N01": {
      title: "Logical Venn Diagrams",
      getQuestions: nonVerbalQuestions.getLogicalVennQuestions
    },
    "N02": {
      title: "Dice and Cubes",
      getQuestions: nonVerbalQuestions.getDiceCubeQuestions
    },
    "N03": {
      title: "Figure Series",
      getQuestions: nonVerbalQuestions.getFigureSeriesQuestions
    },
    "N04": {
      title: "Pattern Completion",
      getQuestions: nonVerbalQuestions.getPatternCompletionQuestions
    }
  },
  mathematical: {
    "Q01": {
      title: "Percentages",
      getQuestions: mathematicalQuestions.getPercentageQuestions
    },
    "Q02": {
      title: "Profit and Loss",
      getQuestions: mathematicalQuestions.getProfitLossQuestions
    },
    "Q03": {
      title: "Interest",
      getQuestions: mathematicalQuestions.getInterestQuestions
    },
    "Q04": {
      title: "Time and Work",
      getQuestions: mathematicalQuestions.getTimeWorkQuestions
    },
    "Q05": {
      title: "Time and Distance",
      getQuestions: mathematicalQuestions.getTimeDistanceQuestions
    },
    "Q06": {
      title: "Averages",
      getQuestions: mathematicalQuestions.getAverageQuestions
    },
    "Q07": {
      title: "Ratios and Proportions",
      getQuestions: mathematicalQuestions.getRatioProportionQuestions
    },
    "Q08": {
      title: "Geometry",
      getQuestions: mathematicalQuestions.getGeometryQuestions
    },
    "Q09": {
      title: "Numbers",
      getQuestions: mathematicalQuestions.getNumberQuestions
    },
    "Q10": {
      title: "Data Interpretation",
      getQuestions: mathematicalQuestions.getDataInterpretationQuestions
    },
    "Q11": {
      title: "Permutations and Combinations",
      getQuestions: mathematicalQuestions.getPermutationCombinationQuestions
    },
    "Q12": {
      title: "Probability",
      getQuestions: mathematicalQuestions.getProbabilityQuestions
    }
  }
};

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  console.log(`Shuffling array of length ${array.length}`);
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to get unique questions for a test session
export async function getUniqueQuestionsForUser(
  userId: number,
  topicId: string,
  count: number = 10
): Promise<Question[]> {
  console.time(`getUniqueQuestionsForUser-${topicId}`);
  console.log(`Getting ${count} questions for user ${userId}, topic ${topicId}`);

  try {
    let category: keyof QuestionBank;
    if (topicId.startsWith('L')) category = 'verbal';
    else if (topicId.startsWith('N')) category = 'nonVerbal';
    else if (topicId.startsWith('Q')) category = 'mathematical';
    else throw new Error(`Invalid topic ID: ${topicId}`);

    const topic = questionBank[category][topicId];
    if (!topic) {
      throw new Error(`Topic not found: ${topicId}`);
    }

    // Initialize session tracking
    const sessionKey = `${userId}-${topicId}-${Date.now()}`;
    if (!sessionQuestions.has(sessionKey)) {
      sessionQuestions.set(sessionKey, new Set());
    }
    const sessionUsedQuestions = sessionQuestions.get(sessionKey)!;

    // Load questions for this topic
    console.time(`loadQuestions-${topicId}`);
    const questions = await topic.getQuestions();
    console.timeEnd(`loadQuestions-${topicId}`);

    if (!questions || questions.length < count) {
      throw new Error(`Not enough questions available for topic ${topicId}. Need ${count}, have ${questions?.length || 0}`);
    }

    // Select random questions and shuffle options
    const shuffled = shuffleArray(questions);
    const selected = shuffled.slice(0, count).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));

    // Mark questions as used
    selected.forEach(q => sessionUsedQuestions.add(q.question));

    console.timeEnd(`getUniqueQuestionsForUser-${topicId}`);
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