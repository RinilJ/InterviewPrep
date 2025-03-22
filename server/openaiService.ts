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

// Fallback questions for each category
const fallbackQuestions = {
  aptitude: [
    {
      question: "In a family, A is B's sister, B is C's mother, and D is C's daughter. What is A's relation to D?",
      options: ["Aunt", "Mother", "Grandmother", "Sister"],
      correctAnswer: 0,
      explanation: "A is B's sister, B is C's mother, and D is C's daughter. Therefore, A is C's aunt, making A the aunt of D."
    },
    {
      question: "A person walks 5 km towards north, then turns right and walks 3 km. Again turns right and walks 5 km. How far is he from the starting point?",
      options: ["3 km", "5 km", "8 km", "13 km"],
      correctAnswer: 0,
      explanation: "After walking north and south the same distance (5km), only the eastward distance (3km) remains"
    }
  ],
  technical: [
    {
      question: "What will be the output of this Python code?\n\ndef func(x=[]):\n    x.append(1)\n    return x\n\nprint(func())\nprint(func())",
      options: [
        "[1]\\n[1]", 
        "[1]\\n[1, 1]", 
        "[1, 1]\\n[1, 1, 1]", 
        "Error"
      ],
      correctAnswer: 1,
      explanation: "In Python, default mutable arguments are created once when the function is defined. The same list is used in subsequent calls.",
      code: `def func(x=[]):
    x.append(1)
    return x

print(func())
print(func())`
    },
    {
      question: "What is the time complexity of this algorithm?\n\ndef mystery(n):\n    if n <= 1: return 1\n    return mystery(n-1) + mystery(n-1)",
      options: ["O(n)", "O(n log n)", "O(2^n)", "O(n^2)"],
      correctAnswer: 2,
      explanation: "This is a recursive function making 2 calls for each n, creating a binary tree of height n, resulting in O(2^n).",
      code: `def mystery(n):
    if n <= 1: return 1
    return mystery(n-1) + mystery(n-1)`
    }
  ],
  psychometric: [
    {
      question: "You notice a colleague taking credit for your work during a team meeting. How do you respond?",
      options: [
        "Immediately confront them in front of everyone",
        "Discuss the matter privately with them after the meeting",
        "Report them to your supervisor without talking to them",
        "Say nothing and let it go"
      ],
      correctAnswer: 1,
      explanation: "Professional conflict resolution involves direct but private communication"
    },
    {
      question: "When facing a complex project with a tight deadline, what's your first step?",
      options: [
        "Start working immediately without planning",
        "Create a detailed project plan and timeline",
        "Ask for an extension immediately",
        "Delegate all tasks to team members"
      ],
      correctAnswer: 1,
      explanation: "Effective project management starts with proper planning and organization"
    }
  ]
};

const PROMPTS = {
  aptitude: (topic: string) => `Generate a unique aptitude question for ${topic}. 
    Make sure the question tests analytical and logical thinking.
    For topics like Blood Relations or Direction Sense, create complex scenarios.
    For numerical topics, focus on application-based problems.
    The response should be in JSON format with the following structure:
    {
      "question": "clear and detailed question text",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": 0-based index of correct option,
      "explanation": "detailed step-by-step explanation"
    }`,

  technical: (topic: string) => `Generate a challenging technical programming question for ${topic}.
    The question should involve actual code snippets and test understanding of programming concepts.
    Focus on practical scenarios and debugging challenges.
    For System Design questions, include architectural considerations.
    For DSA questions, include time/space complexity analysis.
    The response should be in JSON format with the following structure:
    {
      "question": "question text with embedded code snippet",
      "code": "full code snippet if applicable",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": 0-based index of correct option,
      "explanation": "detailed explanation including complexity analysis or design considerations"
    }`,

  psychometric: (topic: string) => `Generate a situational judgment question for ${topic}.
    Create realistic workplace scenarios that test behavioral tendencies.
    Focus on professional situations and decision-making skills.
    Include scenarios testing leadership, teamwork, and problem-solving.
    The response should be in JSON format with the following structure:
    {
      "question": "detailed scenario description",
      "options": ["response1", "response2", "response3", "response4"],
      "correctAnswer": 0-based index of best option,
      "explanation": "detailed explanation of why this response is most appropriate"
    }`
};

export async function generateQuestions(
  category: 'aptitude' | 'technical' | 'psychometric',
  topic: string,
  count: number = 5
): Promise<GeneratedQuestion[]> {
  try {
    const prompt = PROMPTS[category](topic);
    const questions: GeneratedQuestion[] = [];
    const usedQuestions = new Set<string>(); // Track used questions to prevent duplicates

    for (let i = 0; i < count; i++) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a professional question generator for aptitude, technical, and psychometric tests."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
        });

        const response = completion.choices[0]?.message?.content;
        if (response) {
          try {
            const questionData = JSON.parse(response);
            // Check if this question is unique
            if (!usedQuestions.has(questionData.question)) {
              usedQuestions.add(questionData.question);
              questions.push(questionData);
            } else {
              // If duplicate, try one more time
              i--;
            }
          } catch (error) {
            console.error('Failed to parse OpenAI response:', error);
            // Use a fallback question if parsing fails
            if (fallbackQuestions[category] && fallbackQuestions[category].length > 0) {
              const fallbackQuestion = fallbackQuestions[category][i % fallbackQuestions[category].length];
              if (!usedQuestions.has(fallbackQuestion.question)) {
                usedQuestions.add(fallbackQuestion.question);
                questions.push(fallbackQuestion);
              }
            }
          }
        }
      } catch (error) {
        console.error('OpenAI API error for single question:', error);
        // Use a fallback question if API call fails
        if (fallbackQuestions[category] && fallbackQuestions[category].length > 0) {
          const fallbackQuestion = fallbackQuestions[category][i % fallbackQuestions[category].length];
          if (!usedQuestions.has(fallbackQuestion.question)) {
            usedQuestions.add(fallbackQuestion.question);
            questions.push(fallbackQuestion);
          }
        }
      }
    }

    // If no questions were generated, use fallback questions
    if (questions.length === 0) {
      return fallbackQuestions[category] || [];
    }

    return questions;
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Return fallback questions if available, otherwise throw error
    if (fallbackQuestions[category]) {
      return fallbackQuestions[category];
    }
    throw new Error('Failed to generate questions');
  }
}