import { Question } from '../../types';

interface PsychometricQuestion extends Question {
  category: 'big-five' | 'mbti' | 'ravens' | 'sjt' | 'eq';
  subcategory?: string;
  options: string[];
  optionInterpretations: string[]; // Interpretation for each option
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
      optionInterpretations: [
        "You show high openness to experience, embracing novelty and innovation readily",
        "You value stability and consistency, preferring established methods",
        "You balance curiosity with caution, showing moderate openness",
        "You strongly prefer familiar environments and established routines"
      ],
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
      optionInterpretations: [
        "You exhibit high conscientiousness, with strong planning and organizational skills",
        "You show balanced conscientiousness, combining structure with adaptability",
        "You prefer spontaneity and flexibility over rigid structure",
        "You take a highly adaptable approach, dealing with tasks reactively"
      ],
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
      optionInterpretations: [
        "You exhibit high extraversion, enjoying social interaction and engagement.",
        "You display moderate extraversion, comfortable in social settings but not needing constant attention.",
        "You show introverted tendencies, preferring smaller and more intimate social interactions.",
        "You are highly introverted, preferring observation over active participation in social settings."
      ],
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
      optionInterpretations: [
        "You demonstrate high agreeableness, prioritizing harmony and compromise.",
        "You show balanced agreeableness, assertively expressing your views while respecting others.",
        "You exhibit lower agreeableness, preferring to avoid conflict.",
        "You show lower agreeableness, prioritizing your position in conflict situations."
      ],
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
      optionInterpretations: [
        "You demonstrate low neuroticism, maintaining composure under stress.",
        "You show moderate neuroticism, experiencing anxiety but managing it effectively.",
        "You exhibit higher neuroticism, feeling overwhelmed by stress.",
        "You display high neuroticism, experiencing significant anxiety in stressful situations."
      ],
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
      optionInterpretations: [
        "You display high openness to experience, seeking novelty and exploration.",
        "You value routine and familiarity in your leisure time.",
        "You show balanced openness, enjoying both new and familiar experiences.",
        "You exhibit lower openness, preferring established and comfortable activities."
      ],
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
      optionInterpretations: [
        "You demonstrate high conscientiousness and excellent time management skills.",
        "You show balanced conscientiousness, effectively managing your time and commitments.",
        "You exhibit lower conscientiousness, sometimes requiring last-minute efforts.",
        "You show lower conscientiousness, often struggling with time management and deadlines."
      ],
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
      optionInterpretations: [
        "You show a preference for extroverted recharging methods.",
        "You are likely an ambivert, finding balance between social and solitary activities.",
        "You prefer introverted recharging methods, needing quiet time for restoration.",
        "You are a highly introverted individual who needs significant alone time to recharge."
      ],
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
      optionInterpretations: [
        "You demonstrate high agreeableness, readily offering support and assistance.",
        "You show balanced agreeableness, offering help when appropriate while respecting your own needs.",
        "You exhibit moderate agreeableness, carefully considering requests before responding.",
        "You demonstrate lower agreeableness, prioritizing your own needs over those of others."
      ],
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
      optionInterpretations: [
        "You demonstrate low neuroticism, adapting easily and maintaining positivity.",
        "You show moderate neuroticism, experiencing initial stress but adjusting effectively.",
        "You exhibit higher neuroticism, needing time to process and adapt to changes.",
        "You display high neuroticism, finding unexpected changes significantly disruptive."
      ],
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
      optionInterpretations: [
        "You show strong extroversion tendencies, gaining energy from social interaction",
        "You display classic introversion traits, needing solitude to recharge",
        "You exhibit ambiversion, balancing social and solitary needs",
        "You show situational adaptability in energy management"
      ],
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
      optionInterpretations: [
        "You prefer a Sensing approach, relying on concrete data and tangible evidence.",
        "You favor an Intuitive approach, focusing on patterns and possibilities.",
        "You effectively combine both Sensing and Intuitive approaches in decision-making.",
        "You adapt your approach based on the situation's needs."
      ],
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
      optionInterpretations: [
        "You prefer a Judging approach, valuing structure and organization.",
        "You favor a Perceiving approach, preferring flexibility and open-ended plans.",
        "You effectively balance Judging and Perceiving tendencies in your planning.",
        "Your approach to planning is highly contextual."
      ],
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
      optionInterpretations: [
        "You primarily use a Thinking approach, basing decisions on logic and reason.",
        "You predominantly use a Feeling approach, prioritizing values and emotions.",
        "You effectively integrate both Thinking and Feeling in your decision-making.",
        "Your decision-making style adapts to the specific context."
      ],
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
      optionInterpretations: [
        "You favor a direct and efficient communication style.",
        "You prefer a more evocative and nuanced communication style.",
        "You effectively use various communication styles based on the context.",
        "You show strong adaptability in your communication approach."
      ],
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
      optionInterpretations: [
        "You demonstrate strong extroversion, actively leading and participating in group discussions.",
        "You exhibit introverted tendencies, preferring to observe before contributing.",
        "You show a balanced approach, participating when you have relevant input.",
        "You adapt your behavior based on the group's dynamics."
      ],
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
      optionInterpretations: [
        "You are a Judging type, preferring structured work and advance planning.",
        "You are a Perceiving type, working in spurts when inspiration strikes.",
        "You are an ambivert, balancing structure and flexibility.",
        "You adapt to the project's demands."
      ],
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
      optionInterpretations: [
        "You prefer a Sensing approach, focusing on concrete information and details.",
        "You favor an Intuitive approach, considering the overall context and potential.",
        "You effectively combine Sensing and Intuitive approaches.",
        "Your approach is contextual."
      ],
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
      optionInterpretations: [
        "You use a Thinking approach, addressing conflict objectively.",
        "You use a Feeling approach, prioritizing emotional considerations.",
        "You combine Thinking and Feeling approaches.",
        "Your approach depends on the situation."
      ],
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
      optionInterpretations: [
        "You prefer a Judging approach, valuing order and structure.",
        "You favor a Perceiving approach, preferring adaptability and creativity.",
        "You balance Judging and Perceiving preferences.",
        "Your workspace preference depends on the demands of the task."
      ],
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
      optionInterpretations: [
        "Correct: Demonstrates strong pattern recognition and logical reasoning skills.",
        "Incorrect: May indicate a need to strengthen pattern identification skills.",
        "Incorrect: Suggests further development is needed in recognizing complex patterns.",
        "Incorrect: May suggest difficulty in applying logical reasoning to pattern analysis."
      ],
      explanation: "Tests pattern recognition and logical reasoning",
      category: 'ravens',
      code: `
// Visual representation of patterns would be provided here
// Example pattern sequence:
// [ ⚫ ]  [ ⚫⚫ ]  [ ⚫⚫⚫ ]  [ ? ]
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
      optionInterpretations: [
        "Correct: Demonstrates strong spatial reasoning and pattern completion abilities.",
        "Incorrect: May indicate a need to enhance spatial visualization skills.",
        "Incorrect: Suggests further development is required in recognizing geometric progressions.",
        "Incorrect: May suggest difficulty in applying deductive reasoning to spatial patterns."
      ],
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
      optionInterpretations: [
        "Correct: Shows a strong ability to analyze and extrapolate matrix patterns.",
        "Incorrect: May indicate a need to improve matrix reasoning skills.",
        "Incorrect: Suggests further development in analyzing spatial relationships within matrices.",
        "Incorrect: May suggest challenges in understanding the rules governing matrix patterns."
      ],
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
      optionInterpretations: [
        "Correct: Demonstrates proficiency in applying multiple rules to complete patterns.",
        "Incorrect: May indicate difficulty in considering multiple dimensions simultaneously.",
        "Incorrect: Suggests a need to strengthen pattern recognition skills across multiple axes.",
        "Incorrect: May signal challenges in understanding pattern consistency and rules."
      ],
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
      optionInterpretations: [
        "Correct: Shows strong spatial reasoning and rule deduction skills.",
        "Incorrect: May indicate a need to improve the ability to identify spatial relationships.",
        "Incorrect: Suggests further practice in recognizing transformations and symmetries.",
        "Incorrect: May suggest difficulties in applying logical principles to spatial problems."
      ],
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
      optionInterpretations: [
        "Correct: Demonstrates strong rule application and pattern recognition skills.",
        "Incorrect: May indicate difficulty in applying multiple rules simultaneously.",
        "Incorrect: Suggests a need to strengthen pattern recognition across different rule sets.",
        "Incorrect: May suggest difficulties in understanding and applying established rules."
      ],
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
      optionInterpretations: [
        "Correct: Demonstrates strong sequential pattern recognition skills.",
        "Incorrect: May indicate a need to strengthen sequential reasoning abilities.",
        "Incorrect: Suggests further development in recognizing complex sequential patterns.",
        "Incorrect: May suggest challenges in identifying the logical progression in sequences."
      ],
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
      optionInterpretations: [
        "Correct: Shows a strong ability to apply multiple rules in pattern completion.",
        "Incorrect: May indicate a need to improve pattern analysis across different attributes.",
        "Incorrect: Suggests further development in recognizing patterns based on individual attributes.",
        "Incorrect: May suggest challenges in applying consistent rules to pattern completion."
      ],
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
      optionInterpretations: [
        "Correct: Demonstrates strong matrix transformation understanding and application.",
        "Incorrect: May indicate a need to enhance the ability to identify matrix transformation rules.",
        "Incorrect: Suggests further development in recognizing spatial transformations in matrices.",
        "Incorrect: May suggest difficulties in applying transformation rules to matrix patterns."
      ],
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
      optionInterpretations: [
        "Correct: Shows a strong understanding of series completion and pattern recognition.",
        "Incorrect: May indicate a need to enhance series completion skills.",
        "Incorrect: Suggests further practice in identifying sequential patterns and relationships.",
        "Incorrect: May suggest challenges in understanding the logical progression in series."
      ],
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
      optionInterpretations: [
        "Direct confrontation, which can be effective but may create tension.",
        "A more diplomatic approach, prioritizing a private resolution.",
        "Escalating the issue to management, potentially bypassing direct communication.",
        "A passive approach, potentially delaying resolution and risking further issues."
      ],
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
      optionInterpretations: [
        "Proactive problem-solving, addressing the root cause of the issue.",
        "Immediate escalation, potentially overlooking potential for resolution.",
        "Taking on extra work, which may not address the underlying problem.",
        "Passive avoidance, neglecting a key team responsibility."
      ],
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
      optionInterpretations: [
        "Demonstrates responsibility and professional integrity.",
        "Neglects professional responsibility, risking client dissatisfaction.",
        "May create mistrust and undermine accountability.",
        "Passive approach that avoids responsibility and potential repercussions."
      ],
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
      optionInterpretations: [
        "Direct but professional approach, upholding workplace standards.",
        "Indirect approach, attempting a private resolution but delaying action.",
        "Immediate escalation to HR, bypassing direct communication.",
        "Passive approach, potentially allowing inappropriate behavior to continue."
      ],
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
      optionInterpretations: [
        "Demonstrates effective time management and clear communication.",
        "May lead to burnout and lack of transparency.",
        "Neglects responsibilities, potentially impacting project success.",
        "Undermines teamwork and ethical practices."
      ],
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
      optionInterpretations: [
        "Prioritizes client satisfaction and seeks collaborative solutions.",
        "May neglect client concerns and damage the relationship.",
        "May be unnecessarily costly and time-consuming.",
        "May bypass potential for direct resolution and damage relationships."
      ],
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
      optionInterpretations: [
        "Professional and constructive approach.",
        "Indirect and potentially unproductive approach.",
        "Passive resistance that may not address the underlying concerns.",
        "Unprofessional and potentially damaging action."
      ],
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
      optionInterpretations: [
        "Demonstrates teamwork and leadership through mentorship.",
        "Undermines team member growth and development.",
        "Avoids responsibility and potentially hinders project progress.",
        "Unprofessional and potentially damaging action."
      ],
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
      optionInterpretations: [
        "Demonstrates responsibility and follows established protocols.",
        "May spread unnecessary alarm and breach confidentiality.",
        "May create further risks or violate company policies.",
        "Neglects professional responsibility, potentially exposing the company to risks."
      ],
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
      optionInterpretations: [
        "Demonstrates proactive problem-solving and leadership.",
        "May lead to burnout and resentment within the team.",
        "Passive approach that does not address the problem.",
        "Avoids responsibility and hinders collaborative problem-solving."
      ],
      explanation: "Tests problem-solving and leadership",
      category: 'sjt'
    }
  ];
}

export async function getEQQuestions(): Promise<PsychometricQuestion[]> {
  return [
    {
      question: "When a team member appears visibly upset after receiving feedback, what would you do?",
      options: [
        "Give them space and time to process",
        "Immediately try to cheer them up",
        "Offer to discuss the feedback and create an improvement plan",
        "Tell them to not take criticism personally"
      ],
      optionInterpretations: [
        "You respect emotional boundaries and understand the need for processing time",
        "You show empathy but may need to develop patience with others' emotional processes",
        "You demonstrate strong emotional intelligence by offering practical support with empathy",
        "You might benefit from developing more emotional sensitivity in professional situations"
      ],
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
      optionInterpretations: [
        "You foster collaboration and constructive conflict resolution.",
        "You may overlook valuable input and stifle creativity.",
        "You allow conflict to escalate, potentially hindering team dynamics.",
        "You avoid addressing the conflict, which may hinder progress and create resentment."
      ],
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
      optionInterpretations: [
        "You demonstrate self-awareness and effective stress management strategies.",
        "You may risk burnout and reduced performance by ignoring your emotional state.",
        "You may spread negativity and hinder team morale.",
        "You may avoid responsibilities and create further issues."
      ],
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
      optionInterpretations: [
        "You demonstrate empathy and positive social engagement.",
        "You show limited emotional expression and may appear distant.",
        "You may create negativity and damage relationships.",
        "You display a lack of social awareness and may appear unsupportive."
      ],
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
      optionInterpretations: [
        "You demonstrate a growth mindset and a willingness to learn.",
        "You may hinder your development by becoming defensive.",
        "You may limit opportunities for growth and improvement.",
        "You may miss opportunities to improve performance."
      ],
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
      optionInterpretations: [
        "You demonstrate accountability and emotional maturity.",
        "You avoid responsibility and may damage trust.",
        "You hinder collaborative problem-solving and may damage relationships.",
        "You demonstrate a lack of accountability and may hinder learning from mistakes."
      ],
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
      optionInterpretations: [
        "You demonstrate emotional intelligence and resilience.",
        "You avoid addressing the issue, which may allow negativity to persist.",
        "You may contribute to negativity and damage relationships.",
        "You may escalate the issue unnecessarily."
      ],
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
      optionInterpretations: [
        "You demonstrate adaptability and emotional regulation.",
        "You may hinder team morale and productivity.",
        "You may hinder project progress and create conflict.",
        "You avoid responsibilities and may damage relationships."
      ],
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
      optionInterpretations: [
        "You demonstrate leadership and proactive problem-solving.",
        "You avoid addressing the issue, which may allow morale to remain low.",
        "You fail to engage and support your team.",
        "You may spread negativity and undermine team morale."
      ],
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
      optionInterpretations: [
        "You demonstrate professionalism and open communication.",
        "You avoid addressing potential issues, which may hinder your development.",
        "You may damage relationships and hinder productive discussion.",
        "You create resentment and limit opportunities for constructive feedback."
      ],
      explanation: "Tests professional relationships and emotional regulation",
      category: 'eq'
    }
  ];
}