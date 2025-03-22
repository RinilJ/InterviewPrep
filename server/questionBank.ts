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
    "L05": {
      title: "Analogy",
      questions: Array.from({ length: 100 }, (_, i) => {
        const analogyTypes = [
          {
            pairs: [
              ['Bird : Sky', 'Fish : Water'],
              ['Book : Knowledge', 'Food : Energy'],
              ['Tree : Forest', 'Brick : Building'],
              ['Clock : Time', 'Thermometer : Temperature']
            ],
            relationship: 'habitat/environment'
          },
          {
            pairs: [
              ['Doctor : Patient', 'Teacher : Student'],
              ['Chef : Food', 'Artist : Painting'],
              ['Writer : Book', 'Sculptor : Statue'],
              ['Farmer : Crop', 'Carpenter : Furniture']
            ],
            relationship: 'creator/creation'
          },
          {
            pairs: [
              ['Hot : Cold', 'Light : Dark'],
              ['Happy : Sad', 'Success : Failure'],
              ['Giant : Dwarf', 'Mountain : Valley'],
              ['Dawn : Dusk', 'Birth : Death']
            ],
            relationship: 'opposites'
          }
        ];

        const type = analogyTypes[i % analogyTypes.length];
        const pair = type.pairs[Math.floor(i / analogyTypes.length) % type.pairs.length];
        const [first, second] = pair;
        const [baseTerm, relatedTerm] = first.split(' : ');
        const [targetTerm, correctAnswer] = second.split(' : ');

        return {
          question: `${baseTerm} is to ${relatedTerm} as ${targetTerm} is to:`,
          options: [
            correctAnswer,
            `${targetTerm}`,
            `${baseTerm}`,
            `${relatedTerm}`
          ],
          correctAnswer: 0,
          explanation: `This is a ${type.relationship} relationship analogy. As ${baseTerm} is related to ${relatedTerm}, similarly ${targetTerm} is related to ${correctAnswer}.`
        };
      })
    },
    "L06": {
      title: "Synonyms",
      questions: Array.from({ length: 100 }, (_, i) => {
        const wordPairs = [
          { word: 'Abundant', synonyms: ['Plentiful', 'Scarce', 'Limited', 'Rare'], correct: 0 },
          { word: 'Benevolent', synonyms: ['Kind', 'Cruel', 'Harsh', 'Strict'], correct: 0 },
          { word: 'Concise', synonyms: ['Brief', 'Long', 'Detailed', 'Extended'], correct: 0 },
          { word: 'Diligent', synonyms: ['Hardworking', 'Lazy', 'Careless', 'Negligent'], correct: 0 },
          { word: 'Enormous', synonyms: ['Huge', 'Tiny', 'Small', 'Little'], correct: 0 },
          { word: 'Furious', synonyms: ['Angry', 'Calm', 'Peaceful', 'Serene'], correct: 0 },
          { word: 'Gregarious', synonyms: ['Sociable', 'Shy', 'Timid', 'Reserved'], correct: 0 },
          { word: 'Hostile', synonyms: ['Unfriendly', 'Friendly', 'Amicable', 'Cordial'], correct: 0 },
          { word: 'Insignificant', synonyms: ['Trivial', 'Important', 'Significant', 'Essential'], correct: 0 },
          { word: 'Jubilant', synonyms: ['Joyful', 'Sad', 'Mournful', 'Gloomy'], correct: 0 }
        ];

        const selectedPair = wordPairs[i % wordPairs.length];

        return {
          question: `Choose the word most similar in meaning to: ${selectedPair.word}`,
          options: selectedPair.synonyms,
          correctAnswer: selectedPair.correct,
          explanation: `${selectedPair.word} means ${selectedPair.synonyms[selectedPair.correct]}.`
        };
      })
    },
    "L07": {
      title: "Antonyms",
      questions: Array.from({ length: 100 }, (_, i) => {
        const antonymPairs = [
          { word: 'Optimistic', options: ['Pessimistic', 'Happy', 'Cheerful', 'Hopeful'], correct: 0 },
          { word: 'Ancient', options: ['Modern', 'Old', 'Archaic', 'Traditional'], correct: 0 },
          { word: 'Extrovert', options: ['Introvert', 'Outgoing', 'Social', 'Friendly'], correct: 0 },
          { word: 'Accelerate', options: ['Decelerate', 'Speed', 'Rush', 'Hurry'], correct: 0 },
          { word: 'Artificial', options: ['Natural', 'Fake', 'Synthetic', 'Man-made'], correct: 0 },
          // Add more word pairs...
        ];

        const selectedPair = antonymPairs[i % antonymPairs.length];

        return {
          question: `Choose the word most opposite in meaning to: ${selectedPair.word}`,
          options: selectedPair.options,
          correctAnswer: selectedPair.correct,
          explanation: `The opposite of ${selectedPair.word} is ${selectedPair.options[selectedPair.correct]}.`
        };
      })
    },
    "L08": {
      title: "Sentence Completion",
      questions: Array.from({ length: 100 }, (_, i) => {
        const sentences = [
          {
            text: "Despite the heavy rain, the team decided to _____ with the outdoor practice session.",
            options: ['proceed', 'cancel', 'postpone', 'delay'],
            correct: 0,
            context: 'showing determination'
          },
          {
            text: "The scientist's new theory was so _____ that even experts in the field had difficulty understanding it.",
            options: ['complex', 'simple', 'obvious', 'clear'],
            correct: 0,
            context: 'describing difficulty level'
          },
          // Add more sentences...
        ];

        const selected = sentences[i % sentences.length];

        return {
          question: selected.text,
          options: selected.options,
          correctAnswer: selected.correct,
          explanation: `The word '${selected.options[selected.correct]}' best completes the sentence, ${selected.context}.`
        };
      })
    },
    "L09": {
      title: "Reading Comprehension",
      questions: Array.from({ length: 100 }, (_, i) => {
        const passages = [
          {
            text: `Renewable energy sources, such as solar and wind power, are becoming increasingly important in our fight against climate change. These sources provide clean energy without producing harmful greenhouse gases. However, they also face challenges such as intermittent availability and storage issues.`,
            questions: [
              {
                question: "What is the main advantage of renewable energy sources?",
                options: [
                  "They produce no greenhouse gases",
                  "They are always available",
                  "They are cheap to install",
                  "They require no maintenance"
                ],
                correct: 0
              }
            ]
          }
          // Add more passages...
        ];

        const passageIndex = Math.floor(i / 4);
        const questionIndex = i % 4;
        const passage = passages[passageIndex % passages.length];
        const questionData = passage.questions[questionIndex % passage.questions.length];

        return {
          question: `${passage.text}\n\n${questionData.question}`,
          options: questionData.options,
          correctAnswer: questionData.correct,
          explanation: `Based on the passage, renewable energy sources provide clean energy without producing harmful greenhouse gases.`
        };
      })
    },
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
    "N03": {
      title: "Figure Series",
      questions: Array.from({ length: 100 }, (_, i) => {
        const seriesTypes = [
          {
            type: 'Rotation',
            pattern: 'The figure rotates by 45 degrees clockwise in each step',
            options: ['90° clockwise', '45° clockwise', '45° counterclockwise', '90° counterclockwise']
          },
          {
            type: 'Reflection',
            pattern: 'The figure is reflected alternatively on vertical and horizontal axis',
            options: ['Vertical reflection', 'Horizontal reflection', 'Diagonal reflection', 'No reflection']
          },
          {
            type: 'Addition',
            pattern: 'A new element is added in each step following a specific rule',
            options: ['Circle added', 'Square added', 'Triangle added', 'Line added']
          }
          // Add more pattern types...
        ];

        const selectedType = seriesTypes[i % seriesTypes.length];

        return {
          question: `If the figures in the series follow the pattern: ${selectedType.pattern}, what would be the next figure?`,
          options: selectedType.options,
          correctAnswer: i % 4,
          explanation: `This is a ${selectedType.type} pattern where ${selectedType.pattern}.`
        };
      })
    },
    "N04": {
      title: "Non-Verbal Analogy",
      questions: Array.from({ length: 100 }, (_, i) => {
        const analogyTypes = [
          {
            type: 'Shape Transformation',
            pattern: 'Circle transforms to square',
            options: ['Triangle transforms to rectangle', 'Pentagon transforms to hexagon', 'Line transforms to curve', 'Point transforms to line']
          },
          {
            type: 'Pattern Completion',
            pattern: 'Simple pattern becomes complex',
            options: ['Basic shape becomes detailed', 'Solid becomes dotted', 'Small becomes large', 'Light becomes dark']
          },
          // Add more analogy types...
        ];

        const selectedType = analogyTypes[i % analogyTypes.length];

        return {
          question: `If the first pair shows: ${selectedType.pattern}, which of the following would complete the second pair?`,
          options: selectedType.options,
          correctAnswer: i % 4,
          explanation: `This is a ${selectedType.type} analogy where the same transformation rule applies to both pairs.`
        };
      })
    },
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
    "Q04": {
      title: "Compound Interest",
      questions: Array.from({ length: 100 }, (_, i) => {
        const principal = Math.floor(Math.random() * 10000) + 1000;
        const rate = (Math.floor(Math.random() * 10) + 5);
        const time = Math.floor(Math.random() * 3) + 1;
        const CI = principal * Math.pow((1 + rate/100), time) - principal;

        return {
          question: `What is the Compound Interest on Rs. ${principal} at ${rate}% per annum for ${time} years?`,
          options: [
            `Rs. ${Math.round(CI)}`,
            `Rs. ${Math.round(CI + 100)}`,
            `Rs. ${Math.round(CI - 100)}`,
            `Rs. ${Math.round(CI * 1.5)}`
          ],
          correctAnswer: 0,
          explanation: `CI = P(1 + r/100)^t - P = ${principal}(1 + ${rate}/100)^${time} - ${principal} = ${Math.round(CI)}`
        };
      })
    },
    "Q05": {
      title: "Ratio and Proportion",
      questions: Array.from({ length: 100 }, (_, i) => {
        const ratio1 = Math.floor(Math.random() * 5) + 2;
        const ratio2 = Math.floor(Math.random() * 5) + 2;
        const total = (ratio1 + ratio2) * 10;
        const part1 = (total * ratio1) / (ratio1 + ratio2);

        return {
          question: `If two numbers are in the ratio ${ratio1}:${ratio2} and their sum is ${total}, find the first number.`,
          options: [
            `${Math.round(part1)}`,
            `${Math.round(part1 + 10)}`,
            `${Math.round(part1 - 10)}`,
            `${Math.round(part1 * 1.5)}`
          ],
          correctAnswer: 0,
          explanation: `First number = (Total × ${ratio1})/(${ratio1} + ${ratio2}) = (${total} × ${ratio1})/${ratio1 + ratio2} = ${Math.round(part1)}`
        };
      })
    },
    "Q06": {
      title: "Time and Work",
      questions: Array.from({ length: 100 }, (_, i) => {
        const numPeople = Math.floor(Math.random() * 5) + 2;
        const numDays = Math.floor(Math.random() * 10) + 5;
        const totalWork = numPeople * numDays;
        const newPeople = Math.floor(Math.random() * 5) + 2;

        const newDays = Math.round(totalWork / newPeople);

        return {
          question: `${numPeople} people can complete a piece of work in ${numDays} days. How many days will it take ${newPeople} people to complete the same work?`,
          options: [
            `${newDays}`,
            `${newDays + 2}`,
            `${newDays - 2}`,
            `${newDays * 2}`
          ],
          correctAnswer: 0,
          explanation: `${numPeople} people × ${numDays} days = ${totalWork} units of work.  ${totalWork} units of work / ${newPeople} people = ${newDays} days`
        };
      })
    },
    "Q07": {
      title: "Time and Distance",
      questions: Array.from({ length: 100 }, (_, i) => {
        const speed = Math.floor(Math.random() * 60) + 20;
        const time = Math.floor(Math.random() * 10) + 2;
        const distance = speed * time;

        return {
          question: `If a car travels at a speed of ${speed} km/h for ${time} hours, what distance does it cover?`,
          options: [
            `${distance} km`,
            `${distance + 10} km`,
            `${distance - 10} km`,
            `${distance * 2} km`
          ],
          correctAnswer: 0,
          explanation: `Distance = Speed × Time = ${speed} km/h × ${time} h = ${distance} km`
        };
      })
    },
    "Q08": {
      title: "Average",
      questions: Array.from({ length: 100 }, (_, i) => {
          const numbers = Array.from({length: 5}, () => Math.floor(Math.random() * 100));
          const sum = numbers.reduce((a, b) => a + b, 0);
          const average = sum / numbers.length;

          return {
              question: `What is the average of the following numbers: ${numbers.join(', ')}?`,
              options: [
                  `${average}`,
                  `${average + 5}`,
                  `${average - 5}`,
                  `${average * 2}`
              ],
              correctAnswer: 0,
              explanation: `Average = Sum of numbers / Number of numbers = ${sum} / 5 = ${average}`
          };
      })
    },
    "Q09": {
      title: "Number System",
      questions: Array.from({ length: 100 }, (_, i) => {
        const num1 = Math.floor(Math.random() * 100) + 1;
        const num2 = Math.floor(Math.random() * 100) + 1;
        const operation = Math.floor(Math.random() * 4); // 0:add, 1:subtract, 2:multiply, 3:divide
        let result;
        let question;

        switch (operation) {
          case 0: result = num1 + num2; question = `What is ${num1} + ${num2}?`; break;
          case 1: result = num1 - num2; question = `What is ${num1} - ${num2}?`; break;
          case 2: result = num1 * num2; question = `What is ${num1} × ${num2}?`; break;
          case 3: result = num1 / num2; question = `What is ${num1} / ${num2}?`; break;
        }

        return {
          question: question,
          options: [
            `${result}`,
            `${result + 5}`,
            `${result - 5}`,
            `${result * 2}`
          ],
          correctAnswer: 0,
          explanation: `${num1} ${operation === 0 ? '+' : operation === 1 ? '-' : operation === 2 ? '×' : '/'} ${num2} = ${result}`
        };
      })
    },
    "Q10": {
      title: "Algebra",
      questions: Array.from({ length: 100 }, (_, i) => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = a + b;
        const question = `If x + ${a} = ${c}, what is the value of x?`;

        return {
          question: question,
          options: [
            `${b}`,
            `${a}`,
            `${a + b}`,
            `${a - b}`
          ],
          correctAnswer: 0,
          explanation: `x = ${c} - ${a} = ${b}`
        };
      })
    },
    "Q11": {
      title: "Geometry",
      questions: Array.from({ length: 100 }, (_, i) => {
        const shapes = ['circle', 'square', 'triangle', 'rectangle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const question = `What is a ${shape}?`;

        return {
          question: question,
          options: [
            `A round 2D shape`,
            `A 4-sided polygon`,
            `A 3-sided polygon`,
            `A 4-sided polygon with 4 right angles`
          ],
          correctAnswer: shapes.indexOf(shape),
          explanation: `A ${shape} is a basic geometric figure`
        };
      })
    },
    "Q12": {
      title: "Mensuration",
      questions: Array.from({ length: 100 }, (_, i) => {
        const length = Math.floor(Math.random() * 10) + 5;
        const width = Math.floor(Math.random() * 10) + 5;
        const area = length * width;

        return {
          question: `What is the area of a rectangle with length ${length} cm and width ${width} cm?`,
          options: [
            `${area} cm²`,
            `${area + 10} cm²`,
            `${area - 10} cm²`,
            `${area * 2} cm²`
          ],
          correctAnswer: 0,
          explanation: `Area = Length × Width = ${length} cm × ${width} cm = ${area} cm²`
        };
      })
    },
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