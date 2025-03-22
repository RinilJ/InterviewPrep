import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  code?: string; // For technical questions with code snippets
}

// Module-specific prompts for better context
const MODULE_PROMPTS = {
  // Verbal Reasoning Modules
  "L01": "Generate a direction sense question involving complex paths and cardinal directions",
  "L02": "Create a blood relations question with extended family relationships",
  "L03": "Create a coding-decoding question using letter/number patterns",
  "L04": "Generate a number series question with complex mathematical patterns",
  "L05": "Create a letter series question with alphabetical patterns",
  "L06": "Generate a ranking/arrangement question with multiple conditions",
  "L07": "Create a number/letter analogy question",
  "L08": "Generate a mixed analogy question combining different concepts",
  "L09": "Create a syllogism question testing logical deduction",
  "L10": "Generate an odd-man-out question for classification",

  // Non-verbal Reasoning Modules
  "N01": "Create a logical Venn diagram question with set relationships",
  "N02": "Generate a dice/cube question with spatial reasoning",
  "N03": "Create a mirror/water image question",
  "N04": "Generate a missing number/figure series question",

  // Mathematical Aptitude Modules
  "Q01": "Create a percentage problem with real-world applications",
  "Q02": "Generate a profit/loss question with complex scenarios",
  "Q03": "Create an interest calculation problem",
  "Q04": "Generate a ratio/proportion question",
  "Q05": "Create an age/mixture problem",
  "Q06": "Generate a time/work question",
  "Q07": "Create a time/distance/speed problem",
  "Q08": "Generate an averages question",
  "Q09": "Create a geometry problem",
  "Q10": "Generate a number system question",

  // Technical Modules
  "T01": "Generate a DSA problem with code implementation and complexity analysis",
  "T02": "Create a competitive programming challenge with algorithmic thinking",
  "T03": "Generate a system design question with scalability considerations",
  "T04": "Create an OOP concept question with practical implementation",
  "T05": "Generate a code debugging challenge with common programming issues",

  // Psychometric Modules
  "P01": "Create a personality assessment scenario",
  "P02": "Generate an emotional intelligence situation",
  "P03": "Create a leadership potential scenario",
  "P04": "Generate a team dynamics situation",
  "P05": "Create a problem-solving style assessment"
};

const PROMPTS = {
  aptitude: (topic: string, moduleId: string) => `Generate a unique ${topic} question.
    Context: ${MODULE_PROMPTS[moduleId]}
    Requirements:
    - Question should be challenging but solvable
    - Include step-by-step solution in the explanation
    - Ensure options are distinct and plausible
    - Make sure question tests analytical thinking

    The response should be in JSON format:
    {
      "question": "detailed question text",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": 0-based index of correct option,
      "explanation": "detailed step-by-step solution"
    }`,

  technical: (topic: string, moduleId: string) => `Generate a unique technical question for ${topic}.
    Context: ${MODULE_PROMPTS[moduleId]}
    Requirements:
    - For coding questions, include actual code snippets
    - Test understanding of core concepts
    - Include time/space complexity for algorithms
    - Focus on practical, industry-relevant scenarios

    The response should be in JSON format:
    {
      "question": "detailed question text",
      "code": "code snippet if applicable",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": 0-based index of correct option,
      "explanation": "detailed solution with analysis"
    }`,

  psychometric: (topic: string, moduleId: string) => `Generate a unique psychometric question for ${topic}.
    Context: ${MODULE_PROMPTS[moduleId]}
    Requirements:
    - Create realistic workplace scenarios
    - Focus on behavioral assessment
    - Include various response strategies
    - Ensure options reflect different approaches

    The response should be in JSON format:
    {
      "question": "detailed scenario",
      "options": ["response1", "response2", "response3", "response4"],
      "correctAnswer": 0-based index of best option,
      "explanation": "detailed analysis of each response"
    }`
};

// Cache to store used questions per module
const questionCache = new Map<string, Set<string>>();

export async function generateQuestions(
  category: 'aptitude' | 'technical' | 'psychometric',
  topic: string,
  moduleId: string,
  count: number = 10
): Promise<GeneratedQuestion[]> {
  try {
    // Initialize cache for this module if not exists
    if (!questionCache.has(moduleId)) {
      questionCache.set(moduleId, new Set());
    }
    const usedQuestions = questionCache.get(moduleId)!;

    const prompt = PROMPTS[category](topic, moduleId);
    const questions: GeneratedQuestion[] = [];
    let attempts = 0;
    const maxAttempts = count * 3; // Allow for some retry attempts

    while (questions.length < count && attempts < maxAttempts) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are an expert question generator for ${category} tests, specifically focusing on ${topic}.`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.8, // Slightly increase randomness for more variety
        });

        const response = completion.choices[0]?.message?.content;
        if (response) {
          try {
            const questionData = JSON.parse(response);

            // Check for uniqueness using question text
            if (!usedQuestions.has(questionData.question)) {
              usedQuestions.add(questionData.question);
              questions.push(questionData);
              console.log(`Generated unique question ${questions.length}/${count} for module ${moduleId}`);
            }
          } catch (error) {
            console.error('Failed to parse OpenAI response:', error);
          }
        }
      } catch (error) {
        console.error('OpenAI API error for single question:', error);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay between retries
      }
      attempts++;
    }

    if (questions.length === 0) {
      throw new Error(`Failed to generate questions for module ${moduleId}`);
    }

    return questions;
  } catch (error) {
    console.error('Question generation error:', error);
    throw new Error('Failed to generate questions');
  }
}