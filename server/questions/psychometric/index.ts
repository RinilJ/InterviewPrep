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
    },
    {
      question: "How do you prefer to spend your free time?",
      options: [
        "Exploring new places and activities",
        "Following established hobbies and routines",
        "A mix of familiar and new activities",
        "Sticking to what I know I enjoy"
      ],
      correctAnswer: -1,
      explanation: "Measures openness",
      category: 'big-five',
      subcategory: 'openness'
    },
    {
      question: "How do you approach deadlines and commitments?",
      options: [
        "I always complete tasks well ahead of schedule",
        "I plan carefully and finish on time",
        "I sometimes need to rush at the last minute",
        "I often struggle with time management"
      ],
      correctAnswer: -1,
      explanation: "Measures conscientiousness",
      category: 'big-five',
      subcategory: 'conscientiousness'
    },
    {
      question: "How do you recharge after a long day?",
      options: [
        "By spending time with friends",
        "Through a mix of social and alone time",
        "By engaging in quiet activities alone",
        "By completely isolating myself"
      ],
      correctAnswer: -1,
      explanation: "Measures extraversion",
      category: 'big-five',
      subcategory: 'extraversion'
    },
    {
      question: "How do you typically respond to others' needs?",
      options: [
        "I immediately offer help and support",
        "I help when asked but maintain boundaries",
        "I consider the situation carefully first",
        "I focus on my own needs first"
      ],
      correctAnswer: -1,
      explanation: "Measures agreeableness",
      category: 'big-five',
      subcategory: 'agreeableness'
    },
    {
      question: "How do you handle unexpected changes?",
      options: [
        "I adapt quickly and stay positive",
        "I feel initial stress but adjust well",
        "I need time to process and adapt",
        "I find changes very disturbing"
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
    },
    {
      question: "How do you prefer to plan activities?",
      options: [
        "With a clear schedule and structure",
        "Keeping options open and flexible",
        "A mix of planned and spontaneous",
        "Depends on the activity"
      ],
      correctAnswer: -1,
      explanation: "Measures Judging vs Perceiving",
      category: 'mbti',
      subcategory: 'JP'
    },
    {
      question: "How do you usually make important decisions?",
      options: [
        "Based on logical analysis and facts",
        "Based on values and feelings",
        "Considering both logic and feelings",
        "It varies by situation"
      ],
      correctAnswer: -1,
      explanation: "Measures Thinking vs Feeling",
      category: 'mbti',
      subcategory: 'TF'
    },
    {
      question: "How do you prefer to communicate?",
      options: [
        "Direct and straightforward",
        "Through stories and metaphors",
        "Using a mix of both styles",
        "Adapting to the listener"
      ],
      correctAnswer: -1,
      explanation: "Measures Sensing vs Intuition",
      category: 'mbti',
      subcategory: 'SN'
    },
    {
      question: "In group settings, how do you typically behave?",
      options: [
        "Take charge and lead discussions",
        "Listen and observe before contributing",
        "Participate when I have something to add",
        "Vary based on the group dynamics"
      ],
      correctAnswer: -1,
      explanation: "Measures Introversion vs Extraversion",
      category: 'mbti',
      subcategory: 'IE'
    },
    {
      question: "How do you approach deadlines?",
      options: [
        "Work steadily with a clear plan",
        "Work in bursts as inspiration hits",
        "Balance planning with flexibility",
        "Adapt based on the project"
      ],
      correctAnswer: -1,
      explanation: "Measures Judging vs Perceiving",
      category: 'mbti',
      subcategory: 'JP'
    },
    {
      question: "When solving problems, what do you focus on first?",
      options: [
        "The practical details and facts",
        "The big picture and possibilities",
        "Both details and possibilities",
        "Whatever seems most relevant"
      ],
      correctAnswer: -1,
      explanation: "Measures Sensing vs Intuition",
      category: 'mbti',
      subcategory: 'SN'
    },
    {
      question: "How do you handle conflict?",
      options: [
        "Address issues objectively and directly",
        "Consider everyone's feelings first",
        "Balance facts with emotional impact",
        "Adapt to the specific situation"
      ],
      correctAnswer: -1,
      explanation: "Measures Thinking vs Feeling",
      category: 'mbti',
      subcategory: 'TF'
    },
    {
      question: "How do you prefer your workspace?",
      options: [
        "Neat and well-organized",
        "Creative and adaptable",
        "A mix of organization and flexibility",
        "Whatever works for the current task"
      ],
      correctAnswer: -1,
      explanation: "Measures Judging vs Perceiving",
      category: 'mbti',
      subcategory: 'JP'
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
    },
    {
      question: "Identify the missing pattern in this matrix:",
      options: [
        "A grid with diagonal line from top-left to bottom-right",
        "A grid with diagonal line from top-right to bottom-left",
        "A grid with horizontal line through the middle",
        "A grid with vertical line through the middle"
      ],
      correctAnswer: 1,
      explanation: "The pattern follows alternating diagonal lines in a 3x3 matrix",
      category: 'ravens',
      code: `
// Visual representation of a 3x3 matrix with the bottom-right cell missing
// The pattern shows alternating diagonal lines
`
    },
    {
      question: "Which figure completes the progressive sequence?",
      options: [
        "A triangle with one dot",
        "A triangle with two dots",
        "A triangle with three dots",
        "A triangle with four dots"
      ],
      correctAnswer: 2,
      explanation: "The pattern shows a progression of dots increasing by one in each step",
      category: 'ravens',
      code: `
// Visual representation of triangles with increasing number of dots
// [ △⚫ ]  [ △⚫⚫ ]  [ ? ]
`
    },
    {
      question: "Select the figure that continues the logical sequence:",
      options: [
        "A square with a circle in the top-right corner",
        "A square with a circle in the bottom-left corner",
        "A square with a circle in the bottom-right corner",
        "A square with a circle in the top-left corner"
      ],
      correctAnswer: 3,
      explanation: "The circle moves clockwise around the corners of the square in each step",
      category: 'ravens',
      code: `
// Visual representation of squares with a circle moving around the corners
// [ ▢⚫_ ]  [ _⚫▢ ]  [ ▢_⚫ ]  [ ? ]
`
    },
    {
      question: "Which figure completes the pattern?",
      options: [
        "A hexagon with two triangles inside",
        "A hexagon with three triangles inside",
        "A hexagon with one triangle inside",
        "A hexagon with four triangles inside"
      ],
      correctAnswer: 0,
      explanation: "The pattern shows a progression where the number of internal shapes follows a specific sequence",
      category: 'ravens',
      code: `
// Visual representation of hexagons with varying numbers of internal triangles
// Following a pattern of: 3, 4, 1, 5, ?
`
    },
    {
      question: "Which shape continues the series?",
      options: [
        "A rotating square with increasing elements",
        "A circle with decreasing segments",
        "A triangle with changing orientation",
        "A hexagon with varying patterns"
      ],
      correctAnswer: 0,
      explanation: "Tests spatial reasoning and pattern completion",
      category: 'ravens'
    },
    {
      question: "What comes next in this matrix?",
      options: [
        "Square with three dots in diagonal",
        "Circle with cross pattern",
        "Triangle with center dot",
        "Rectangle with vertical lines"
      ],
      correctAnswer: 0,
      explanation: "Tests matrix reasoning and pattern analysis",
      category: 'ravens'
    },
    {
      question: "Which element completes the 3x3 grid?",
      options: [
        "Pattern following both row and column rules",
        "Pattern following only row rules",
        "Pattern following only column rules",
        "Random pattern breaking the sequence"
      ],
      correctAnswer: 0,
      explanation: "Tests matrix pattern completion",
      category: 'ravens'
    },
    {
      question: "What element belongs in the missing space?",
      options: [
        "Shape combining features of adjacent elements",
        "Opposite of the diagonal element",
        "Mirror image of adjacent shape",
        "Random unrelated shape"
      ],
      correctAnswer: 0,
      explanation: "Tests spatial reasoning and rule deduction",
      category: 'ravens'
    },
    {
      question: "Which pattern follows the established rule?",
      options: [
        "Pattern following both rotation and addition rules",
        "Pattern following only rotation rule",
        "Pattern following only addition rule",
        "Pattern breaking established rules"
      ],
      correctAnswer: 0,
      explanation: "Tests rule application and pattern recognition",
      category: 'ravens'
    },
    {
      question: "What comes next in the sequence?",
      options: [
        "Shape following established progression",
        "Reverse of the first shape",
        "Combination of previous shapes",
        "Unrelated shape"
      ],
      correctAnswer: 0,
      explanation: "Tests sequential pattern recognition",
      category: 'ravens'
    },
    {
      question: "Which element completes the pattern?",
      options: [
        "Element following both size and color rules",
        "Element following only size rule",
        "Element following only color rule",
        "Element breaking pattern rules"
      ],
      correctAnswer: 0,
      explanation: "Tests multiple rule application",
      category: 'ravens'
    },
    {
      question: "What belongs in the empty cell?",
      options: [
        "Shape following matrix transformation rules",
        "Copy of adjacent shape",
        "Inverse of opposite shape",
        "Random shape"
      ],
      correctAnswer: 0,
      explanation: "Tests matrix transformation understanding",
      category: 'ravens'
    },
    {
      question: "Which pattern completes the series?",
      options: [
        "Pattern following established sequence rules",
        "Mirror image of last pattern",
        "Combination of first and last patterns",
        "Unrelated pattern"
      ],
      correctAnswer: 0,
      explanation: "Tests series completion and pattern recognition",
      category: 'ravens'
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
    },
    {
      question: "A team member consistently misses deadlines, affecting the project timeline. What would you do?",
      options: [
        "Have a private conversation to understand their challenges",
        "Report them to the project manager immediately",
        "Take over their tasks to meet deadlines",
        "Ignore the situation and focus on your work"
      ],
      correctAnswer: 0,
      explanation: "Tests leadership and problem-solving approach",
      category: 'sjt'
    },
    {
      question: "You discover a minor error in a report that has already been sent to the client. What action do you take?",
      options: [
        "Immediately notify your supervisor and propose a correction plan",
        "Ignore it since it's a minor error",
        "Fix it quietly without telling anyone",
        "Wait to see if the client notices"
      ],
      correctAnswer: 0,
      explanation: "Tests integrity and professional responsibility",
      category: 'sjt'
    },
    {
      question: "During a meeting, a colleague makes an inappropriate comment. How do you respond?",
      options: [
        "Address it professionally in the moment",
        "Discuss it privately with them after",
        "Report it to HR immediately",
        "Ignore it to avoid conflict"
      ],
      correctAnswer: 1,
      explanation: "Tests professional conduct and conflict handling",
      category: 'sjt'
    },
    {
      question: "You have multiple urgent deadlines and can't complete them all. What do you do?",
      options: [
        "Prioritize tasks and communicate with stakeholders",
        "Work overtime without telling anyone",
        "Complete what you can and ignore the rest",
        "Ask a colleague to secretly help you"
      ],
      correctAnswer: 0,
      explanation: "Tests time management and communication skills",
      category: 'sjt'
    },
    {
      question: "A client is unhappy with a deliverable that meets all specified requirements. How do you handle it?",
      options: [
        "Schedule a meeting to understand their concerns and find a solution",
        "Defend the work as meeting requirements",
        "Immediately offer to redo the work",
        "Escalate to your manager"
      ],
      correctAnswer: 0,
      explanation: "Tests client relationship management",
      category: 'sjt'
    },
    {
      question: "You disagree with a new policy implemented by management. What's your response?",
      options: [
        "Share concerns professionally through appropriate channels",
        "Complain to colleagues",
        "Ignore the policy quietly",
        "Threaten to quit"
      ],
      correctAnswer: 0,
      explanation: "Tests professional communication and adaptation",
      category: 'sjt'
    },
    {
      question: "A team member is struggling with a task you're expert in. What do you do?",
      options: [
        "Offer to mentor them and share your knowledge",
        "Do the task for them",
        "Tell them to figure it out",
        "Report their incompetence"
      ],
      correctAnswer: 0,
      explanation: "Tests teamwork and leadership",
      category: 'sjt'
    },
    {
      question: "You notice a potential security risk in the company's procedures. How do you address it?",
      options: [
        "Document the issue and report it through proper channels",
        "Share it with colleagues to warn them",
        "Try to fix it yourself",
        "Ignore it as it's not your responsibility"
      ],
      correctAnswer: 0,
      explanation: "Tests responsibility and protocol adherence",
      category: 'sjt'
    },
    {
      question: "Your team's project is behind schedule due to external factors. What action do you take?",
      options: [
        "Analyze the situation and propose alternative solutions",
        "Push the team to work overtime",
        "Accept the delay without action",
        "Blame the external factors"
      ],
      correctAnswer: 0,
      explanation: "Tests problem-solving and leadership",
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
    },
    {
      question: "How do you handle a situation where team members have conflicting ideas?",
      options: [
        "Listen to all perspectives and facilitate a constructive discussion",
        "Choose the idea you think is best",
        "Let them argue it out",
        "Avoid the conflict"
      ],
      correctAnswer: 0,
      explanation: "Tests conflict resolution and emotional management",
      category: 'eq'
    },
    {
      question: "When you feel overwhelmed at work, what do you typically do?",
      options: [
        "Take a brief break to recompose and prioritize tasks",
        "Push through without acknowledging the feeling",
        "Complain to colleagues",
        "Give up on some tasks"
      ],
      correctAnswer: 0,
      explanation: "Tests self-awareness and stress management",
      category: 'eq'
    },
    {
      question: "How do you respond when a colleague is celebrating a major success?",
      options: [
        "Show genuine enthusiasm and congratulate them",
        "Briefly acknowledge their success",
        "Compare it to your own achievements",
        "Ignore it to stay focused on work"
      ],
      correctAnswer: 0,
      explanation: "Tests empathy and social awareness",
      category: 'eq'
    },
    {
      question: "When receiving negative feedback, how do you typically react?",
      options: [
        "Listen carefully and ask for specific examples to improve",
        "Defend your actions immediately",
        "Become emotionally withdrawn",
        "Dismiss the feedback as incorrect"
      ],
      correctAnswer: 0,
      explanation: "Tests feedback reception and emotional regulation",
      category: 'eq'
    },
    {
      question: "How do you handle a situation where you made a mistake that affected others?",
      options: [
        "Take responsibility and work on fixing the situation",
        "Try to hide the mistake",
        "Blame others or circumstances",
        "Minimize the importance of the mistake"
      ],
      correctAnswer: 0,
      explanation: "Tests accountability and emotional maturity",
      category: 'eq'
    },
    {
      question: "When a colleague is consistently negative, how do you manage the situation?",
      options: [
        "Try to understand their perspective while maintaining boundaries",
        "Avoid them completely",
        "Match their negativity",
        "Report them to management"
      ],
      correctAnswer: 0,
      explanation: "Tests emotional resilience and relationship management",
      category: 'eq'
    },
    {
      question: "How do you respond to unexpected changes in project requirements?",
      options: [
        "Remain calm and assess the situation objectively",
        "Express immediate frustration",
        "Resist the changes",
        "Disengage from the project"
      ],
      correctAnswer: 0,
      explanation: "Tests adaptability and emotional stability",
      category: 'eq'
    },
    {
      question: "When team morale is low, what action do you take?",
      options: [
        "Initiate conversations to understand concerns and suggest improvements",
        "Wait for someone else to address it",
        "Focus only on your own motivation",
        "Complain about management"
      ],
      correctAnswer: 0,
      explanation: "Tests leadership and emotional intelligence",
      category: 'eq'
    },
    {
      question: "How do you handle disagreements with your supervisor?",
      options: [
        "Express your views respectfully while remaining open to feedback",
        "Avoid bringing up disagreements",
        "Become defensive or argumentative",
        "Comply while harboring resentment"
      ],
      correctAnswer: 0,
      explanation: "Tests professional relationships and emotional regulation",
      category: 'eq'
    }
  ];
}