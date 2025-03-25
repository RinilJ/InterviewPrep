import { PsychometricQuestion } from './index';

interface PsychometricInsight {
  category: string;
  insights: string[];
  recommendations?: string[];
}

// MBTI type descriptions
const mbtiDescriptions: Record<string, { description: string, characteristics: string[], careerPaths: string[] }> = {
  'ISTJ': {
    description: 'The Inspector: Practical, fact-minded, and reliable. You carefully plan and organize your life.',
    characteristics: [
      'Detail-oriented and thorough',
      'Responsible and dependable',
      'Practical and realistic'
    ],
    careerPaths: ['Accountant', 'Manager', 'Military Officer', 'Quality Assurance']
  },
  'ISFJ': {
    description: 'The Protector: Caring, supportive, and focused on meeting others\' needs.',
    characteristics: [
      'Loyal and devoted',
      'Patient and detailed',
      'Service-oriented'
    ],
    careerPaths: ['Nurse', 'Teacher', 'Social Worker', 'Administrative Assistant']
  },
  'INFJ': {
    description: 'The Counselor: Insightful, creative, and focused on helping others.',
    characteristics: [
      'Deep and complex thinker',
      'Highly empathetic',
      'Future-oriented'
    ],
    careerPaths: ['Counselor', 'Writer', 'HR Development', 'Non-profit Director']
  },
  'INTJ': {
    description: 'The Mastermind: Strategic, innovative, and driven by logic.',
    characteristics: [
      'Independent and decisive',
      'Original thinker',
      'High standards'
    ],
    careerPaths: ['Strategic Planner', 'Software Architect', 'Investment Banker', 'Scientific Researcher']
  },
  'ISTP': {
    description: 'The Craftsperson: Practical problem-solver who enjoys hands-on work.',
    characteristics: [
      'Adaptable and resourceful',
      'Action-oriented',
      'Independent thinking'
    ],
    careerPaths: ['Engineer', 'Mechanic', 'Pilot', 'Data Analyst']
  },
  'ISFP': {
    description: 'The Artist: Gentle, sensitive, and enjoys exploring creative possibilities.',
    characteristics: [
      'Artistic and creative',
      'Present-focused',
      'Warm and sympathetic'
    ],
    careerPaths: ['Artist', 'Designer', 'Healthcare Worker', 'Musician']
  },
  'INFP': {
    description: 'The Idealist: Creative, empathetic, and guided by strong personal values.',
    characteristics: [
      'Deeply caring',
      'Creative and imaginative',
      'Value-driven'
    ],
    careerPaths: ['Writer', 'Counselor', 'Artist', 'Non-profit Worker']
  },
  'INTP': {
    description: 'The Thinker: Logical, creative, and focused on theoretical possibilities.',
    characteristics: [
      'Analytical mind',
      'Original thinker',
      'Values knowledge'
    ],
    careerPaths: ['Computer Programmer', 'Physicist', 'Professor', 'Research Scientist']
  },
  'ESTP': {
    description: 'The Doer: Energetic, practical, and enjoys taking risks.',
    characteristics: [
      'Active and energetic',
      'Adaptable and pragmatic',
      'Good at problem solving'
    ],
    careerPaths: ['Sales Representative', 'Entrepreneur', 'Police Officer', 'Athletic Coach']
  },
  'ESFP': {
    description: 'The Performer: Outgoing, friendly, and loves being the center of attention.',
    characteristics: [
      'Enthusiastic and fun-loving',
      'People-oriented',
      'Lives in the moment'
    ],
    careerPaths: ['Event Planner', 'Sales Representative', 'Child Care Provider', 'Actor']
  },
  'ENFP': {
    description: 'The Champion: Enthusiastic, creative, and people-oriented.',
    characteristics: [
      'Warm and enthusiastic',
      'Creative and inspiring',
      'Excellent people skills'
    ],
    careerPaths: ['Journalist', 'Consultant', 'Teacher', 'Marketing Professional']
  },
  'ENTP': {
    description: 'The Visionary: Quick, ingenious, and good at many things.',
    characteristics: [
      'Innovative and creative',
      'Energetic and outgoing',
      'Analytical'
    ],
    careerPaths: ['Entrepreneur', 'Lawyer', 'Creative Director', 'Business Consultant']
  },
  'ESTJ': {
    description: 'The Supervisor: Practical, traditional, and organized.',
    characteristics: [
      'Organized and structured',
      'Leadership ability',
      'Hard-working'
    ],
    careerPaths: ['Business Administrator', 'Project Manager', 'School Principal', 'Financial Officer']
  },
  'ESFJ': {
    description: 'The Provider: Warm-hearted, popular, and conscientious.',
    characteristics: [
      'Cooperative and caring',
      'Social and outgoing',
      'Practical helper'
    ],
    careerPaths: ['Sales Manager', 'Nurse', 'Teacher', 'Social Worker']
  },
  'ENFJ': {
    description: 'The Teacher: Charismatic leader, inspiring and warm.',
    characteristics: [
      'Natural leader',
      'Empathetic and warm',
      'Organized and decisive'
    ],
    careerPaths: ['Teacher', 'HR Manager', 'Training Developer', 'Marketing Manager']
  },
  'ENTJ': {
    description: 'The Commander: Natural leader, quick to see possibilities for improvement.',
    characteristics: [
      'Strategic thinker',
      'Confident and assertive',
      'Efficient organizer'
    ],
    careerPaths: ['Executive', 'Management Consultant', 'Lawyer', 'Entrepreneur']
  }
};

function analyzeMBTIPreferences(answers: number[]): { type: string, preferences: string[] } {
  // E/I - questions[0], S/N - questions[1], T/F - questions[2], J/P - questions[3]
  const preferences: string[] = [];
  const type = {
    ei: answers[0] <= 3 ? 'I' : 'E', // Lower score = Introversion
    sn: answers[1] <= 3 ? 'S' : 'N', // Lower score = Sensing
    tf: answers[2] <= 3 ? 'T' : 'F', // Lower score = Thinking
    jp: answers[3] <= 3 ? 'J' : 'P'  // Lower score = Judging
  };

  // E/I Preference
  if (type.ei === 'E') {
    preferences.push('You gain energy from social interactions and external activities.');
  } else {
    preferences.push('You prefer quiet reflection and solitary activities to recharge.');
  }

  // S/N Preference
  if (type.sn === 'S') {
    preferences.push('You focus on concrete facts and practical matters.');
  } else {
    preferences.push('You enjoy abstract thinking and exploring possibilities.');
  }

  // T/F Preference
  if (type.tf === 'T') {
    preferences.push('You make decisions based on logical analysis and objective criteria.');
  } else {
    preferences.push('You consider people\'s feelings and values when making decisions.');
  }

  // J/P Preference
  if (type.jp === 'J') {
    preferences.push('You prefer structure, planning, and organized approaches.');
  } else {
    preferences.push('You are flexible and adaptable, preferring to keep options open.');
  }

  return {
    type: `${type.ei}${type.sn}${type.tf}${type.jp}`,
    preferences
  };
}

export function generateMBTIInsights(answers: number[]): PsychometricInsight {
  const { type, preferences } = analyzeMBTIPreferences(answers);
  const typeInfo = mbtiDescriptions[type];

  const insights = [
    `Your personality type is ${type} - ${typeInfo.description}`,
    '\nKey Characteristics:',
    ...typeInfo.characteristics.map(char => `• ${char}`),
    '\nYour Preferences:',
    ...preferences.map(pref => `• ${pref}`),
    '\nPotential Career Paths:',
    ...typeInfo.careerPaths.map(career => `• ${career}`)
  ];

  return {
    category: 'Myers-Briggs Type Indicator (MBTI)',
    insights
  };
}

export function generateBigFiveInsights(answers: number[]): PsychometricInsight {
  const traits = {
    openness: answers[0] <= 1 ? 'high' : 'low',
    conscientiousness: answers[1] <= 1 ? 'high' : 'low',
    extraversion: answers[2] <= 1 ? 'high' : 'low',
    agreeableness: answers[3] <= 1 ? 'high' : 'low',
    neuroticism: answers[4] <= 1 ? 'high' : 'low'
  };

  const insights = [];
  const recommendations = [];

  if (traits.openness === 'high') {
    insights.push('You show a strong inclination towards creativity and new experiences');
    recommendations.push('Consider roles that involve innovation and creative problem-solving');
  } else {
    insights.push('You prefer structure and familiar approaches');
    recommendations.push('Consider roles that require attention to detail and consistent processes');
  }

  if (traits.conscientiousness === 'high') {
    insights.push('You demonstrate strong organizational skills and attention to detail');
    recommendations.push('Seek positions that require project management and systematic approaches');
  }

  if (traits.extraversion === 'high') {
    insights.push('You thrive in social situations and team environments');
    recommendations.push('Look for roles involving team collaboration and client interaction');
  }

  return {
    category: 'Big Five Personality Assessment',
    insights,
    recommendations
  };
}

export function generateEQInsights(answers: number[]): PsychometricInsight {
  const aspects = {
    selfAwareness: calculateAspectScore(answers.slice(0, 2)),
    empathy: calculateAspectScore(answers.slice(2, 4)),
    socialSkills: calculateAspectScore(answers.slice(4, 6))
  };

  const insights = [];
  if (aspects.selfAwareness > 2) {
    insights.push('You show strong self-awareness and emotional understanding');
  }
  if (aspects.empathy > 2) {
    insights.push('You demonstrate high empathy and understanding of others');
  }
  if (aspects.socialSkills > 2) {
    insights.push('You exhibit strong social and interpersonal skills');
  }

  return {
    category: 'Emotional Intelligence Assessment',
    insights
  };
}

export function generateSJTInsights(answers: number[]): PsychometricInsight {
  const aspects = {
    problemSolving: answers[0] <= 1 ? 'strong' : 'developing',
    teamwork: answers[1] <= 1 ? 'strong' : 'developing',
    communication: answers[2] <= 1 ? 'strong' : 'developing'
  };

  const insights = [];
  if (aspects.problemSolving === 'strong') {
    insights.push('You demonstrate effective problem-solving abilities in workplace scenarios');
  }
  if (aspects.teamwork === 'strong') {
    insights.push('You show strong team collaboration skills');
  }
  if (aspects.communication === 'strong') {
    insights.push('You exhibit good communication and conflict resolution abilities');
  }

  return {
    category: 'Situational Judgment',
    insights
  };
}

function calculateAspectScore(answers: number[]): number {
  return answers.reduce((sum, answer) => sum + answer, 0) / answers.length;
}