import { Question } from '../../types';

interface PsychometricQuestion extends Question {
  category: 'big-five' | 'mbti' | 'ravens' | 'sjt' | 'eq';
  subcategory?: string;
}

export async function getBigFiveQuestions(): Promise<PsychometricQuestion[]> {
  return [
    {
      question: "How do you typically approach new situations?",
      options: [
        "I eagerly seek out new experiences and ideas",
        "I prefer familiar routines and patterns",
        "I'm cautiously open to new experiences",
        "I strongly prefer sticking to what I know"
      ],
      correctAnswer: -1, // No correct answer for personality tests
      explanation: "Measures openness to experience",
      category: 'big-five',
      subcategory: 'openness'
    },
    {
      question: "When working on a project, how do you typically organize your tasks?",
      options: [
        "I create detailed plans and strictly follow them",
        "I make general plans but remain flexible",
        "I prefer to go with the flow",
        "I deal with tasks as they come"
      ],
      correctAnswer: -1,
      explanation: "Measures conscientiousness",
      category: 'big-five',
      subcategory: 'conscientiousness'
    },
    {
      question: "How do you usually behave in social gatherings?",
      options: [
        "I actively engage with many people and initiate conversations",
        "I enjoy participating but don't need to be the center of attention",
        "I prefer small group interactions",
        "I tend to observe more than participate"
      ],
      correctAnswer: -1,
      explanation: "Measures extraversion",
      category: 'big-five',
      subcategory: 'extraversion'
    },
    {
      question: "How do you typically handle conflicts with others?",
      options: [
        "I always try to find a compromise that satisfies everyone",
        "I stand firm on my position while respecting others",
        "I prefer to avoid confrontation",
        "I strongly defend my viewpoint"
      ],
      correctAnswer: -1,
      explanation: "Measures agreeableness",
      category: 'big-five',
      subcategory: 'agreeableness'
    },
    {
      question: "How do you usually react to stressful situations?",
      options: [
        "I remain calm and composed",
        "I feel some anxiety but manage it well",
        "I often feel overwhelmed",
        "I get very anxious and worried"
      ],
      correctAnswer: -1,
      explanation: "Measures neuroticism",
      category: 'big-five',
      subcategory: 'neuroticism'
    }
  ];
}

export async function getMBTIQuestions(): Promise<PsychometricQuestion[]> {
  return [
    {
      question: "How do you prefer to recharge?",
      options: [
        "By spending time with others",
        "By spending time alone",
        "Through a mix of social and solitary activities",
        "It depends on the situation"
      ],
      correctAnswer: -1,
      explanation: "Measures Introversion vs Extraversion",
      category: 'mbti',
      subcategory: 'IE'
    },
    {
      question: "When making decisions, what do you rely on more?",
      options: [
        "Concrete facts and direct experience",
        "Patterns and possible implications",
        "A combination of both",
        "It depends on the context"
      ],
      correctAnswer: -1,
      explanation: "Measures Sensing vs Intuition",
      category: 'mbti',
      subcategory: 'SN'
    }
  ];
}

export async function getRavensQuestions(): Promise<PsychometricQuestion[]> {
  return [
    {
      question: "Which pattern completes the sequence?",
      options: [
        "Pattern A: Square with increasing dots",
        "Pattern B: Circle with decreasing lines",
        "Pattern C: Triangle with alternating shapes",
        "Pattern D: Rectangle with mixed elements"
      ],
      correctAnswer: 0,
      explanation: "Tests pattern recognition and logical reasoning",
      category: 'ravens',
      code: `
// Visual representation of patterns would be provided here
// Example pattern sequence:
// [ ⚫ ]  [ ⚫⚫ ]  [ ⚫⚫⚫ ]  [ ? ]
`
    }
  ];
}

export async function getSJTQuestions(): Promise<PsychometricQuestion[]> {
  return [
    {
      question: "You notice a colleague taking credit for your work during a team meeting. How do you handle the situation?",
      options: [
        "Speak up immediately during the meeting to correct the misconception",
        "Discuss the issue privately with your colleague after the meeting",
        "Raise the concern with your supervisor",
        "Document the incident and wait for another opportunity to showcase your contribution"
      ],
      correctAnswer: 1,
      explanation: "Tests professional judgment and conflict resolution skills",
      category: 'sjt'
    }
  ];
}

export async function getEQQuestions(): Promise<PsychometricQuestion[]> {
  return [
    {
      question: "A team member appears visibly upset after receiving critical feedback. What would you do?",
      options: [
        "Give them space and time to process the feedback",
        "Immediately try to cheer them up",
        "Offer to discuss the feedback and help create an improvement plan",
        "Tell them to not take criticism personally"
      ],
      correctAnswer: 2,
      explanation: "Tests emotional intelligence and empathy",
      category: 'eq'
    }
  ];
}
