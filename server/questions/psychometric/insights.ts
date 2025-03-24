import { PsychometricQuestion } from './index';

interface PsychometricInsight {
  category: string;
  insights: string[];
  recommendations?: string[];
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

export function generateMBTIInsights(answers: number[]): PsychometricInsight {
  const type = {
    ie: answers[0] <= 1 ? 'I' : 'E',
    sn: answers[1] <= 1 ? 'S' : 'N',
    tf: answers[3] <= 1 ? 'T' : 'F',
    jp: answers[2] <= 1 ? 'J' : 'P'
  };

  const personalityType = `${type.ie}${type.sn}${type.tf}${type.jp}`;
  const insights = [
    `Your personality type appears to be ${personalityType}`,
    getTypeDescription(personalityType)
  ];

  return {
    category: 'Myers-Briggs Type Indicator',
    insights
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

// Helper functions
function calculateAspectScore(answers: number[]): number {
  return answers.reduce((sum, answer) => sum + answer, 0) / answers.length;
}

function getTypeDescription(type: string): string {
  const descriptions: Record<string, string> = {
    'INTJ': 'Analytical and strategic thinker with a focus on long-term planning',
    'INTP': 'Logical and creative problem-solver with a thirst for knowledge',
    'ENTJ': 'Natural leader with strong organizational and strategic abilities',
    'ENTP': 'Innovative and versatile thinker who enjoys intellectual challenges',
    // Add more type descriptions as needed
  };
  return descriptions[type] || 'A unique combination of personality traits that shapes your approach to work and relationships';
}
