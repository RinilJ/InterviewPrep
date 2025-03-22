import OpenAI from "openai";

// Safely check for API key and initialize client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  code?: string;
}

// Module-specific prompts for better context
const MODULE_PROMPTS = {
  // Verbal Reasoning Modules
  "L01": "Generate a unique direction sense question involving complex paths and cardinal directions. Focus on spatial reasoning.",
  "L02": "Create a unique blood relations question with complex family tree relationships. Focus on deductive reasoning.",
  "L03": "Create a unique coding-decoding question using letter/number patterns. Include pattern recognition.",
  "L04": "Generate a unique number series question with progressive mathematical patterns. Include step-by-step pattern explanation.",
  "L05": "Create a unique letter series question with complex alphabetical patterns. Focus on pattern recognition.",
  "L06": "Generate a unique ranking/arrangement question with multiple conditions. Test logical organization.",
  "L07": "Create a unique number/letter analogy question focusing on relationship patterns.",
  "L08": "Generate a unique mixed analogy question combining different concepts. Test abstract thinking.",
  "L09": "Create a unique syllogism question testing logical deduction and inference.",
  "L10": "Generate a unique odd-man-out question focusing on classification and categories.",

  // Non-verbal Reasoning Modules
  "N01": "Create a unique logical Venn diagram question with complex set relationships.",
  "N02": "Generate a unique dice/cube question testing spatial visualization.",
  "N03": "Create a unique mirror/water image question focusing on visual transformation.",
  "N04": "Generate a unique figure series question with progressive pattern changes.",

  // Mathematical Aptitude Modules
  "Q01": "Create a unique percentage problem with practical business scenarios.",
  "Q02": "Generate a unique profit/loss question with market-based situations.",
  "Q03": "Create a unique compound interest problem with real-world applications.",
  "Q04": "Generate a unique ratio/proportion question with practical scenarios.",
  "Q05": "Create a unique age/mixture problem with complex relationships.",
  "Q06": "Generate a unique time/work question involving multiple workers.",
  "Q07": "Create a unique time/distance problem with multiple vehicles.",
  "Q08": "Generate a unique averages question with data interpretation.",
  "Q09": "Create a unique geometry problem with practical applications.",
  "Q10": "Generate a unique number system question with mathematical properties.",

  // Technical Modules
  "T01": `Generate a unique Data Structures & Algorithms question.
    Include:
    - Actual code implementation
    - Time/space complexity analysis
    - Edge cases consideration
    Focus on one of: arrays, linked lists, trees, graphs, sorting, or searching algorithms.`,

  "T02": `Create a unique competitive programming challenge.
    Include:
    - Problem statement with input/output format
    - Sample test cases
    - Constraints
    - Required time/space complexity
    Style similar to LeetCode/CodeForces problems.`,

  "T03": `Generate a unique system design question.
    Include:
    - Scalability considerations
    - Performance requirements
    - Architecture patterns
    Focus on real-world scenarios and best practices.`,

  "T04": `Create a unique OOP concept question.
    Include:
    - Practical implementation scenario
    - Code demonstrating OOP principles
    - Design patterns application
    Focus on inheritance, polymorphism, encapsulation, or abstraction.`,

  "T05": `Generate a unique code debugging challenge.
    Include:
    - Code with intentional bugs
    - Expected vs actual output
    - Common programming pitfalls
    Focus on language-specific features and best practices.`
};

const PROMPTS = {
  aptitude: (topic: string, moduleId: string) => `Generate a unique ${topic} question.
    Context: ${MODULE_PROMPTS[moduleId]}
    Requirements:
    - Question should be challenging but solvable
    - Include step-by-step solution in the explanation
    - Ensure options are distinct and plausible
    - Make sure question tests analytical thinking

    Response Format:
    {
      "question": "detailed question text",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": 0-based index of correct option,
      "explanation": "detailed step-by-step solution"
    }`,

  technical: (topic: string, moduleId: string) => `Generate a unique technical question for ${topic}.
    Context: ${MODULE_PROMPTS[moduleId]}
    Requirements:
    - Include practical code examples
    - Test core programming concepts
    - Focus on industry-relevant scenarios
    - Include detailed explanations

    Response Format:
    {
      "question": "detailed question text",
      "code": "complete code snippet if applicable",
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

    Response Format:
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
  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is not configured');
    throw new Error('OpenAI API key is not configured');
  }

  try {
    // Initialize cache for this module if not exists
    if (!questionCache.has(moduleId)) {
      questionCache.set(moduleId, new Set());
    }
    const usedQuestions = questionCache.get(moduleId)!;

    const prompt = PROMPTS[category](topic, moduleId);
    const questions: GeneratedQuestion[] = [];
    let attempts = 0;
    const maxAttempts = count * 3;

    console.log(`Generating ${count} questions for ${category} - ${topic} (${moduleId})`);

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
          temperature: 0.8,
        });

        const response = completion.choices[0]?.message?.content;
        if (response) {
          try {
            const questionData = JSON.parse(response);
            const questionKey = questionData.question.trim().toLowerCase();

            if (!usedQuestions.has(questionKey)) {
              usedQuestions.add(questionKey);
              questions.push(questionData);
              console.log(`Generated unique question ${questions.length}/${count} for module ${moduleId}`);
            }
          } catch (error) {
            console.error('Failed to parse OpenAI response:', error);
          }
        }
      } catch (error) {
        console.error('OpenAI API error for single question:', error);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      attempts++;
    }

    if (questions.length === 0) {
      throw new Error(`Failed to generate questions for module ${moduleId}`);
    }

    // Clear old questions from cache if it gets too large
    if (usedQuestions.size > 1000) {
      questionCache.set(moduleId, new Set());
    }

    return questions;
  } catch (error) {
    console.error('Question generation error:', error);
    throw new Error('Failed to generate questions');
  }
}