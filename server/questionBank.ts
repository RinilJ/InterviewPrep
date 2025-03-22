// Question bank with expanded questions for each topic
export const questionBank = {
  verbal: {
    "L01": { // Direction Sense
      title: "Direction Sense",
      questions: Array.from({ length: 100 }, (_, i) => {
        const directions = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];
        const distances = [2, 3, 4, 5, 6, 7, 8, 9, 10];
        const steps = Math.floor(i / 20) + 2; // 2-6 steps in the path

        let path = [];
        let finalPosition = { x: 0, y: 0 };

        for(let j = 0; j < steps; j++) {
          const dir = directions[Math.floor(Math.random() * directions.length)];
          const dist = distances[Math.floor(Math.random() * distances.length)];
          path.push(`${dist} km towards ${dir}`);

          // Calculate final position
          switch(dir) {
            case 'North': finalPosition.y += dist; break;
            case 'South': finalPosition.y -= dist; break;
            case 'East': finalPosition.x += dist; break;
            case 'West': finalPosition.x -= dist; break;
            case 'North-East': finalPosition.x += dist * 0.707; finalPosition.y += dist * 0.707; break;
            case 'North-West': finalPosition.x -= dist * 0.707; finalPosition.y += dist * 0.707; break;
            case 'South-East': finalPosition.x += dist * 0.707; finalPosition.y -= dist * 0.707; break;
            case 'South-West': finalPosition.x -= dist * 0.707; finalPosition.y -= dist * 0.707; break;
          }
        }

        const finalDist = Math.round(Math.sqrt(finalPosition.x * finalPosition.x + finalPosition.y * finalPosition.y));

        return {
          question: `A person walks ${path.join(', then ')}. How far is the person from the starting point?`,
          options: [
            `${finalDist} km`,
            `${finalDist + 2} km`,
            `${finalDist - 1} km`,
            `${finalDist + 1} km`
          ],
          correctAnswer: 0,
          explanation: `Calculate the final position after each movement and find the direct distance from start to end using the Pythagorean theorem.`
        };
      })
    },
    "L02": { // Blood Relations
      title: "Blood Relations",
      questions: Array.from({ length: 100 }, (_, i) => {
        const relations = [
          ['father', 'son'], ['mother', 'daughter'], 
          ['brother', 'sister'], ['uncle', 'nephew'],
          ['grandfather', 'grandson'], ['aunt', 'niece']
        ];
        const names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        const relationPairs = Math.floor(i / 25) + 2; // 2-5 relations in each question
        let relationshipChain = [];
        let usedNames = new Set();

        for(let j = 0; j < relationPairs; j++) {
          const [rel1, rel2] = relations[Math.floor(Math.random() * relations.length)];
          const name1 = names.find(n => !usedNames.has(n));
          const name2 = names.find(n => !usedNames.has(n) && n !== name1);
          usedNames.add(name1);
          usedNames.add(name2);
          relationshipChain.push(`${name1} is the ${rel1} of ${name2}`);
        }

        return {
          question: `If ${relationshipChain.join(', and ')}, what is the relationship between ${Array.from(usedNames)[0]} and ${Array.from(usedNames)[usedNames.size - 1]}?`,
          options: ['Grandfather', 'Uncle', 'Brother', 'Cannot be determined'],
          correctAnswer: 3,
          explanation: `Analyze each relationship in the chain to determine if a unique relationship can be established.`
        };
      })
    }
    // ... Add similar structures for L03-L12
  },
  nonVerbal: {
    "N01": { // Logical Venn Diagrams
      title: "Logical Venn Diagrams",
      questions: Array.from({ length: 100 }, (_, i) => {
        const sets = ['Animals', 'Mammals', 'Carnivores', 'Birds', 'Flying Creatures', 
                     'Pets', 'Wild Animals', 'Aquatic Animals', 'Reptiles'];
        const numSets = Math.min(3 + Math.floor(i / 25), 4); // 3-4 sets per question

        const selectedSets = sets.slice(0, numSets);
        const relationships = selectedSets.map(set => `All ${set}`).join(', ');

        return {
          question: `Consider the following sets: ${relationships}. Which Venn diagram best represents their relationship?`,
          options: [
            'Completely overlapping circles',
            'Partially overlapping circles',
            'Concentric circles',
            'Separate circles'
          ],
          correctAnswer: Math.floor(Math.random() * 4),
          explanation: `Analyze the logical relationships between the sets to determine the correct Venn diagram representation.`
        };
      })
    }
    // ... Add similar structures for N02-N04
  },
  mathematical: {
    "Q01": { // Percentages
      title: "Percentages",
      questions: Array.from({ length: 100 }, (_, i) => {
        const baseNumber = Math.floor(Math.random() * 1000) + 100;
        const percentage = Math.floor(Math.random() * 90) + 10;
        const result = (baseNumber * percentage) / 100;

        return {
          question: `${percentage}% of ${baseNumber} is:`,
          options: [
            `${result}`,
            `${result + 10}`,
            `${result - 10}`,
            `${result * 2}`
          ],
          correctAnswer: 0,
          explanation: `To find the percentage, multiply ${baseNumber} by ${percentage}/100 = ${result}`
        };
      })
    }
    // ... Add similar structures for Q02-Q12
  }
};

// Helper function to get topic names
export function getTopicName(topicId: string): string {
  for (const category in questionBank) {
    if (questionBank[category][topicId]) {
      return questionBank[category][topicId].title;
    }
  }
  return "Unknown Topic";
}

// Helper function to generate expanded questions
function generateExpandedQuestions(baseQuestion: string, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    question: `${baseQuestion} (Variation ${i + 1})`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: Math.floor(Math.random() * 4)
  }));
}

// Export the expanded question bank separately
export const questionBankExpanded = {
  verbal: {},
  nonVerbal: {},
  mathematical: {},
  technical: {},
  psychometric: {}
};

// Initialize expanded questions
Object.keys(questionBank).forEach(category => {
  Object.keys(questionBank[category]).forEach(topicId => {
    if (!questionBankExpanded[category][topicId]) {
      questionBankExpanded[category][topicId] = generateExpandedQuestions(
        `Sample ${category} question for topic ${topicId}`,
        50
      );
    }
  });
});