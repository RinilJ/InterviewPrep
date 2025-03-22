// Question bank with expanded questions for each topic
export const questionBank = {
  verbal: {
    "L01": {
      title: "Direction Sense",
      questions: Array.from({ length: 100 }, (_, i) => {
        const directions = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];
        const distances = [2, 3, 4, 5, 6, 7, 8, 9, 10];
        const steps = Math.floor(i / 20) + 2; // 2-6 steps in the path

        let path = [];
        let finalPosition = { x: 0, y: 0 };

        for (let j = 0; j < steps; j++) {
          const dir = directions[Math.floor(Math.random() * directions.length)];
          const dist = distances[Math.floor(Math.random() * distances.length)];
          path.push(`${dist} km towards ${dir}`);

          // Calculate final position
          switch (dir) {
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
    "L02": {
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

        for (let j = 0; j < relationPairs; j++) {
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
    },
    "L03": {
      title: "Coding and Decoding",
      questions: Array.from({ length: 100 }, (_, i) => {
        const codeTypes = [
          { type: 'letter-shift', desc: 'each letter is shifted by a fixed number' },
          { type: 'number-mapping', desc: 'letters are mapped to numbers' },
          { type: 'symbol-substitution', desc: 'letters are replaced with symbols' },
          { type: 'reverse-coding', desc: 'words are reversed with a pattern' }
        ];
        const selectedType = codeTypes[i % codeTypes.length];
        const words = ['COMPUTER', 'PROGRAM', 'KEYBOARD', 'MONITOR', 'SYSTEM', 'NETWORK', 'DATABASE', 'ALGORITHM'];
        const word = words[i % words.length];

        let question, options, correctAnswer;
        switch (selectedType.type) {
          case 'letter-shift':
            const shift = (i % 3) + 1;
            const encoded = word.split('').map(c =>
              String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65)
            ).join('');
            question = `If each letter in the word ${word} is shifted ${shift} position(s) forward in the alphabet, what is the coded word?`;
            options = [
              encoded,
              encoded.split('').reverse().join(''),
              word.split('').reverse().join(''),
              word
            ];
            correctAnswer = 0;
            break;
          default:
            question = `If ${word} is coded according to a ${selectedType.desc}, what would be its coded form?`;
            options = [`Option A`, `Option B`, `Option C`, `Option D`];
            correctAnswer = 0;
        }

        return {
          question,
          options,
          correctAnswer,
          explanation: `This is a ${selectedType.type} coding where ${selectedType.desc}.`
        };
      })
    },
    "L04": {
      title: "Number Series",
      questions: Array.from({ length: 100 }, (_, i) => {
        const seriesTypes = [
          { type: 'arithmetic', formula: (n: number) => n * 2 + 3 },
          { type: 'geometric', formula: (n: number) => Math.pow(2, n) },
          { type: 'fibonacci', formula: (n: number) => n * n + 1 },
          { type: 'square', formula: (n: number) => n * n }
        ];

        const selectedType = seriesTypes[i % seriesTypes.length];
        const length = 5;
        const series = Array.from({ length }, (_, j) => selectedType.formula(j + 1));
        const nextNumber = selectedType.formula(length + 1);

        return {
          question: `What comes next in the series: ${series.join(', ')}?`,
          options: [
            String(nextNumber),
            String(nextNumber + 2),
            String(nextNumber - 2),
            String(nextNumber * 2)
          ],
          correctAnswer: 0,
          explanation: `This is a ${selectedType.type} series where each number follows the pattern: ${selectedType.desc}`
        };
      })
    },
    "L05": { title: "Analogy", questions: Array.from({ length: 100 }, () => ({ question: "Analogy Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Analogy Explanation" })) },
    "L06": { title: "Synonyms", questions: Array.from({ length: 100 }, () => ({ question: "Synonym Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Synonym Explanation" })) },
    "L07": { title: "Antonyms", questions: Array.from({ length: 100 }, () => ({ question: "Antonym Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Antonym Explanation" })) },
    "L08": { title: "Sentence Completion", questions: Array.from({ length: 100 }, () => ({ question: "Sentence Completion Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Sentence Completion Explanation" })) },
    "L09": { title: "Reading Comprehension", questions: Array.from({ length: 100 }, () => ({ question: "Reading Comprehension Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Reading Comprehension Explanation" })) },
    "L10": { title: "Verbal Reasoning", questions: Array.from({ length: 100 }, () => ({ question: "Verbal Reasoning Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Verbal Reasoning Explanation" })) },
    "L11": { title: "Word Order", questions: Array.from({ length: 100 }, () => ({ question: "Word Order Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Word Order Explanation" })) },
    "L12": { title: "Logical Sequence", questions: Array.from({ length: 100 }, () => ({ question: "Logical Sequence Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Logical Sequence Explanation" })) },
  },
  nonVerbal: {
    "N01": {
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
    },
    "N02": {
      title: "Dice and Cubes",
      questions: Array.from({ length: 100 }, (_, i) => {
        const diceOperations = [
          { type: 'rotation', desc: 'dice is rotated' },
          { type: 'opposite', desc: 'opposite faces sum to 7' },
          { type: 'adjacent', desc: 'adjacent faces are connected' },
          { type: 'pattern', desc: 'numbers follow a pattern' }
        ];

        const operation = diceOperations[i % diceOperations.length];

        return {
          question: `In a dice numbered 1 to 6, if ${operation.desc}, what number would be on top?`,
          options: ['1', '2', '3', '4', '5', '6'],
          correctAnswer: i % 6,
          explanation: `Based on ${operation.type}, where ${operation.desc}`
        };
      })
    },
    "N03": { title: "Figure Series", questions: Array.from({ length: 100 }, () => ({ question: "Figure Series Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Figure Series Explanation" })) },
    "N04": { title: "Analogy", questions: Array.from({ length: 100 }, () => ({ question: "Non-Verbal Analogy Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Non-Verbal Analogy Explanation" })) },
  },
  mathematical: {
    "Q01": {
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
    },
    "Q02": {
      title: "Profit and Loss",
      questions: Array.from({ length: 100 }, (_, i) => {
        const costPrice = Math.floor(Math.random() * 900) + 100;
        const profitPercentage = Math.floor(Math.random() * 50) + 10;
        const sellingPrice = costPrice + (costPrice * profitPercentage / 100);

        return {
          question: `If the cost price is Rs. ${costPrice} and profit percentage is ${profitPercentage}%, what is the selling price?`,
          options: [
            `Rs. ${sellingPrice}`,
            `Rs. ${sellingPrice + 10}`,
            `Rs. ${sellingPrice - 10}`,
            `Rs. ${sellingPrice * 2}`
          ],
          correctAnswer: 0,
          explanation: `Selling Price = Cost Price + (Cost Price × Profit%/100) = ${costPrice} + (${costPrice} × ${profitPercentage}/100) = ${sellingPrice}`
        };
      })
    },
    "Q03": {
      title: "Simple and Compound Interest",
      questions: Array.from({ length: 100 }, (_, i) => {
        const principal = Math.floor(Math.random() * 9000) + 1000;
        const rate = Math.floor(Math.random() * 10) + 5;
        const time = Math.floor(Math.random() * 5) + 1;
        const simpleInterest = (principal * rate * time) / 100;

        return {
          question: `What is the Simple Interest on Rs. ${principal} at ${rate}% per annum for ${time} years?`,
          options: [
            `Rs. ${simpleInterest}`,
            `Rs. ${simpleInterest + 100}`,
            `Rs. ${simpleInterest - 100}`,
            `Rs. ${simpleInterest * 2}`
          ],
          correctAnswer: 0,
          explanation: `Simple Interest = (Principal × Rate × Time)/100 = (${principal} × ${rate} × ${time})/100 = ${simpleInterest}`
        };
      })
    },
    "Q04": { title: "Compound Interest", questions: Array.from({ length: 100 }, () => ({ question: "Compound Interest Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Compound Interest Explanation" })) },
    "Q05": { title: "Ratio and Proportion", questions: Array.from({ length: 100 }, () => ({ question: "Ratio and Proportion Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Ratio and Proportion Explanation" })) },
    "Q06": { title: "Time and Work", questions: Array.from({ length: 100 }, () => ({ question: "Time and Work Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Time and Work Explanation" })) },
    "Q07": { title: "Time and Distance", questions: Array.from({ length: 100 }, () => ({ question: "Time and Distance Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Time and Distance Explanation" })) },
    "Q08": { title: "Average", questions: Array.from({ length: 100 }, () => ({ question: "Average Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Average Explanation" })) },
    "Q09": { title: "Number System", questions: Array.from({ length: 100 }, () => ({ question: "Number System Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Number System Explanation" })) },
    "Q10": { title: "Algebra", questions: Array.from({ length: 100 }, () => ({ question: "Algebra Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Algebra Explanation" })) },
    "Q11": { title: "Geometry", questions: Array.from({ length: 100 }, () => ({ question: "Geometry Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Geometry Explanation" })) },
    "Q12": { title: "Mensuration", questions: Array.from({ length: 100 }, () => ({ question: "Mensuration Question", options: ["A", "B", "C", "D"], correctAnswer: 0, explanation: "Mensuration Explanation" })) },
  }
};

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