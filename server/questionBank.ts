// Helper function to format explanation
function formatExplanation(question: string, answer: string, reasoning: string, formula?: string): string {
  let explanation = `Correct Answer: ${answer}\n\nReasoning: ${reasoning}`;
  if (formula) {
    explanation += `\n\nFormula Used: ${formula}`;
  }
  return explanation;
}

// Utility function to generate unique random indices
function getUniqueRandomIndices(max: number, count: number): number[] {
  const indices = Array.from({length: max}, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

// Cache for tracking used questions per user and topic
const usedQuestions = new Map<string, Set<string>>();

// Function to get unique questions for a user
export function getUniqueQuestionsForUser(userId: number, topicId: string, count: number = 10): any[] {
  const userTopicKey = `${userId}-${topicId}`;

  // Initialize user-topic tracking if not exists
  if (!usedQuestions.has(userTopicKey)) {
    usedQuestions.set(userTopicKey, new Set());
  }
  const userTopicUsedQuestions = usedQuestions.get(userTopicKey)!;

  // Get base questions for the topic
  const category = topicId.startsWith('L') ? 'verbal' : 
                  topicId.startsWith('N') ? 'nonVerbal' : 'mathematical';
  const topicQuestions = questionBank[category][topicId].questions;

  // Filter out used questions
  const availableQuestions = topicQuestions.filter(q => !userTopicUsedQuestions.has(q.question));

  // If running low on questions, reset the used questions for this topic
  if (availableQuestions.length < count) {
    usedQuestions.delete(userTopicKey);
    usedQuestions.set(userTopicKey, new Set());
    return getUniqueQuestionsForUser(userId, topicId, count);
  }

  // Get random unique questions
  const indices = getUniqueRandomIndices(availableQuestions.length, count);
  const selectedQuestions = indices.map(i => {
    const question = availableQuestions[i];
    userTopicUsedQuestions.add(question.question);
    return {
      ...question,
      options: [...question.options] // Create a new array to avoid reference issues
    };
  });

  // Shuffle options for each question
  selectedQuestions.forEach(q => {
    const correctAnswer = q.options[q.correctAnswer];
    for (let i = q.options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
    }
    q.correctAnswer = q.options.indexOf(correctAnswer);
  });

  return selectedQuestions;
}

// Question bank with unique questions for each topic
export const questionBank = {
  verbal: {
    "L01": {
      title: "Direction Sense",
      questions: Array.from({ length: 100 }, (_, i) => {
        const directions = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];
        const distances = [2, 3, 4, 5, 6, 7, 8, 9, 10];
        const steps = Math.floor(Math.random() * 3) + 2; // 2-4 steps for variety

        let path = [];
        let finalPosition = { x: 0, y: 0 };

        // Generate unique path
        const usedDirections = new Set();
        for (let j = 0; j < steps; j++) {
          let dir;
          do {
            dir = directions[Math.floor(Math.random() * directions.length)];
          } while (usedDirections.has(dir));
          usedDirections.add(dir);

          const dist = distances[Math.floor(Math.random() * distances.length)];
          path.push(`${dist} km towards ${dir}`);

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
        const answer = `${finalDist} km`;

        // Generate unique wrong options
        const wrongOptions = [
          finalDist + Math.floor(Math.random() * 5) + 1,
          finalDist - Math.floor(Math.random() * 5) - 1,
          finalDist * (Math.floor(Math.random() * 2) + 2)
        ].map(d => `${d} km`);

        return {
          question: `A person walks ${path.join(', then ')}. How far is the person from the starting point?`,
          options: [answer, ...wrongOptions],
          correctAnswer: 0,
          explanation: formatExplanation(
            `A person walks ${path.join(', then ')}. How far is the person from the starting point?`,
            answer,
            `To find the shortest distance from start to end point:
            1. Track position changes in x and y coordinates
            2. Use Pythagorean theorem to calculate direct distance`,
            "Distance = √(x² + y²)"
          )
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
        const question = `If ${relationshipChain.join(', and ')}, what is the relationship between ${Array.from(usedNames)[0]} and ${Array.from(usedNames)[usedNames.size - 1]}?`;
        const options = ['Grandfather', 'Uncle', 'Brother', 'Cannot be determined'];
        const correctAnswer = 3;
        const answer = options[correctAnswer];
        return {
          question: question,
          options: options,
          correctAnswer: correctAnswer,
          explanation: formatExplanation(
            question,
            answer,
            `Analyze each relationship in the chain to determine if a unique relationship can be established.  Consider the order and type of each relationship to trace the connection between the initial and final individuals.`
          )
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
        let answer;
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
            answer = options[correctAnswer];
            break;
          default:
            question = `If ${word} is coded according to a ${selectedType.desc}, what would be its coded form?`;
            options = [`Option A`, `Option B`, `Option C`, `Option D`];
            correctAnswer = 0;
            answer = options[correctAnswer];
            break;
        }

        return {
          question,
          options,
          correctAnswer,
          explanation: formatExplanation(
            question,
            answer,
            `This is a ${selectedType.type} coding where ${selectedType.desc}.  The solution involves applying the described coding method to the given word.`
          )
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
        const answer = String(nextNumber);

        return {
          question: `What comes next in the series: ${series.join(', ')}?`,
          options: [
            answer,
            String(nextNumber + 2),
            String(nextNumber - 2),
            String(nextNumber * 2)
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `What comes next in the series: ${series.join(', ')}?`,
            answer,
            `This is a ${selectedType.type} series.  The pattern is defined by the formula: ${selectedType.formula}. Applying the formula to the next term in the series (n=${length + 1}) gives the answer.`
          )
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
        const answer = correctAnswer;

        return {
          question: `${baseTerm} is to ${relatedTerm} as ${targetTerm} is to:`,
          options: [
            answer,
            `${targetTerm}`,
            `${baseTerm}`,
            `${relatedTerm}`
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `${baseTerm} is to ${relatedTerm} as ${targetTerm} is to:`,
            answer,
            `This is a ${type.relationship} relationship analogy.  The relationship between ${baseTerm} and ${relatedTerm} is the same as the relationship between ${targetTerm} and ${correctAnswer}.`
          )
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
        const answer = selectedPair.synonyms[selectedPair.correct];

        return {
          question: `Choose the word most similar in meaning to: ${selectedPair.word}`,
          options: selectedPair.synonyms,
          correctAnswer: selectedPair.correct,
          explanation: formatExplanation(
            `Choose the word most similar in meaning to: ${selectedPair.word}`,
            answer,
            `${selectedPair.word} means ${answer}.`
          )
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
        const answer = selectedPair.options[selectedPair.correct];

        return {
          question: `Choose the word most opposite in meaning to: ${selectedPair.word}`,
          options: selectedPair.options,
          correctAnswer: selectedPair.correct,
          explanation: formatExplanation(
            `Choose the word most opposite in meaning to: ${selectedPair.word}`,
            answer,
            `The opposite of ${selectedPair.word} is ${answer}.`
          )
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
        const answer = selected.options[selected.correct];

        return {
          question: selected.text,
          options: selected.options,
          correctAnswer: selected.correct,
          explanation: formatExplanation(
            selected.text,
            answer,
            `The word '${answer}' best completes the sentence, ${selected.context}.`
          )
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
        const answer = questionData.options[questionData.correct];

        return {
          question: `${passage.text}\n\n${questionData.question}`,
          options: questionData.options,
          correctAnswer: questionData.correct,
          explanation: formatExplanation(
            `${passage.text}\n\n${questionData.question}`,
            answer,
            `Based on the passage, ${answer}.`
          )
        };
      })
    },
    "L10": {
      title: "Verbal Reasoning",
      questions: Array.from({ length: 100 }, (_, i) => {
        const scenarios = [
          {
            premise: "All cats are animals. All animals need food.",
            question: "Which conclusion is valid?",
            options: [
              "All cats need food",
              "Some animals are cats",
              "All animals are cats",
              "Some cats don't need food"
            ],
            correct: 0,
            explain: "Since all cats are animals and all animals need food, it logically follows that all cats need food."
          },
          {
            premise: "Some birds can fly. All pigeons are birds.",
            question: "What can we conclude?",
            options: [
              "All birds can fly",
              "Some pigeons can fly",
              "All pigeons can fly",
              "No pigeons can fly"
            ],
            correct: 1,
            explain: "Since some birds can fly and all pigeons are birds, some pigeons might be among those birds that can fly."
          },
          {
            premise: "All students in the class passed. John is in the class.",
            question: "What can we conclude?",
            options: [
              "John passed",
              "John failed",
              "John might have passed",
              "We can't determine John's result"
            ],
            correct: 0,
            explain: "Since all students passed and John is in the class, John must have passed."
          }
        ];

        const selectedScenario = scenarios[i % scenarios.length];
        const answer = selectedScenario.options[selectedScenario.correct];

        return {
          question: `${selectedScenario.premise}\n${selectedScenario.question}`,
          options: selectedScenario.options,
          correctAnswer: selectedScenario.correct,
          explanation: formatExplanation(
            selectedScenario.question,
            answer,
            `${selectedScenario.explain}\n\nLogical Steps:
            1. Identify the given statements
            2. Analyze the relationships between terms
            3. Apply logical reasoning rules
            4. Draw valid conclusions`
          )
        };
      })
    },
    "L11": {
      title: "Word Order",
      questions: Array.from({ length: 100 }, (_, i) => {
        const wordSets = [
          {
            words: ["book", "page", "chapter", "paragraph", "sentence"],
            correct: ["sentence", "paragraph", "page", "chapter", "book"],
            explain: "Arrange from smallest to largest unit in written text"
          },
          {
            words: ["year", "century", "decade", "month", "day"],
            correct: ["day", "month", "year", "decade", "century"],
            explain: "Arrange from shortest to longest time period"
          },
          {
            words: ["ocean", "pond", "lake", "sea", "stream"],
            correct: ["pond", "stream", "lake", "sea", "ocean"],
            explain: "Arrange from smallest to largest body of water"
          }
        ];

        const set = wordSets[i % wordSets.length];
        const shuffled = shuffleArray([...set.words]);
        const answer = set.correct.join(" → ");

        return {
          question: `Arrange these words in logical order: ${shuffled.join(", ")}`,
          options: [
            answer,
            shuffled.join(" → "),
            shuffleArray([...set.words]).join(" → "),
            shuffleArray([...set.words]).join(" → ")
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `Arrange these words in logical order: ${shuffled.join(", ")}`,
            answer,
            `${set.explain}`
          )
        };
      })
    },
    "L12": {
      title: "Logical Sequence",
      questions: Array.from({ length: 100 }, (_, i) => {
        const sequences = [
          {
            events: [
              "1. Wake up in the morning",
              "2. Brush teeth",
              "3. Take a shower",
              "4. Get dressed",
              "5. Eat breakfast"
            ],
            scrambled: [
              "Take a shower",
              "Eat breakfast",
              "Wake up in the morning",
              "Get dressed",
              "Brush teeth"
            ],
            explain: "Logical sequence of morning routine activities"
          },
          {
            events: [
              "1. Plant seed",
              "2. Water soil",
              "3. Seedling appears",
              "4. Plant grows",
              "5. Flowers bloom"
            ],
            scrambled: [
              "Flowers bloom",
              "Plant seed",
              "Seedling appears",
              "Water soil",
              "Plant grows"
            ],
            explain: "Natural sequence of plant growth"
          },
          {
            events: [
              "1. Mix ingredients",
              "2. Knead dough",
              "3. Let dough rise",
              "4. Shape bread",
              "5. Bake bread"
            ],
            scrambled: [
              "Bake bread",
              "Mix ingredients",
              "Let dough rise",
              "Shape bread",
              "Knead dough"
            ],
            explain: "Correct sequence of bread making process"
          }
        ];

        const sequence = sequences[i % sequences.length];
        const correctOrder = sequence.events.join(" → ");
        const answer = correctOrder;

        return {
          question: `Arrange these events in the correct sequence: ${sequence.scrambled.join(" | ")}`,
          options: [
            correctOrder,
            shuffleArray([...sequence.events]).join(" → "),
            shuffleArray([...sequence.events]).join(" → "),
            shuffleArray([...sequence.events]).join(" → ")
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `Arrange these events in the correct sequence: ${sequence.scrambled.join(" | ")}`,
            answer,
            `${sequence.explain}`
          )
        };
      })
    },
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
        const options = [
          'Completely overlapping circles',
          'Partially overlapping circles',
          'Concentric circles',
          'Separate circles'
        ];
        const correctAnswer = Math.floor(Math.random() * 4);
        const answer = options[correctAnswer];

        return {
          question: `Consider the following sets: ${relationships}. Which Venn diagram best represents their relationship?`,
          options: options,
          correctAnswer: correctAnswer,
          explanation: formatExplanation(
            `Consider the following sets: ${relationships}. Which Venn diagram best represents their relationship?`,
            answer,
            `Analyze the logical relationships between the sets to determine the correct Venn diagram representation. Consider the overlaps and exclusions between the sets to visualize the appropriate diagram.`
          )
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
        const options = ['1', '2', '3', '4', '5', '6'];
        const correctAnswer = i % 6;
        const answer = options[correctAnswer];

        return {
          question: `In a dice numbered 1 to 6, if ${operation.desc}, what number would be on top?`,
          options: options,
          correctAnswer: correctAnswer,
          explanation: formatExplanation(
            `In a dice numbered 1 to 6, if ${operation.desc}, what number would be on top?`,
            answer,
            `Based on ${operation.type}, where ${operation.desc}.  Visualize the dice and its rotations to determine the top face.`
          )
        };
      })
    },
    "N03": {
      title: "Figure Series",
      questions: Array.from({ length: 100 }, (_, i) => {
        const patterns = [
          {
            series: "Triangle → Square → Pentagon → Hexagon → ?",
            pattern: "Each shape has one more side than the previous shape",
            options: ["Circle", "Heptagon", "Rectangle", "Triangle"],
            correct: 1,
            explain: "The pattern shows shapes with increasing number of sides (3→4→5→6→7)"
          },
          {
            series: "Small circle → Medium circle → Large circle → Medium circle → ?",
            pattern: "Alternating size pattern",
            options: ["Extra large circle", "Small circle", "Medium circle", "Large circle"],
            correct: 1,
            explain: "The pattern follows: small→medium→large→medium→small"
          },
          {
            series: "Empty square → Square with dot → Square with cross → Square with star → ?",
            pattern: "Increasing complexity of internal symbol",
            options: [
              "Square with circle",
              "Empty square",
              "Square with multiple stars",
              "Square with dot"
            ],
            correct: 2,
            explain: "Each step adds more complex internal symbols"
          }
        ];

        const selectedPattern = patterns[i % patterns.length];
        const answer = selectedPattern.options[selectedPattern.correct];

        return {
          question: `What comes next in the series: ${selectedPattern.series}`,
          options: selectedPattern.options,
          correctAnswer: selectedPattern.correct,
          explanation: formatExplanation(
            `What comes next in the series: ${selectedPattern.series}`,
            answer,
            `${selectedPattern.explain}`
          )
        };
      })
    },
    "N04": {
      title: "Non-Verbal Analogy",
      questions: Array.from({ length: 100 }, (_, i) => {
        const analogies = [
          {
            premise: "Square is to Cube as Circle is to ?",
            options: ["Cylinder", "Sphere", "Cone", "Rectangle"],
            correct: 1,
            explain: "As a cube is a 3D extension of a square, a sphere is a 3D extension of a circle"
          },
          {
            premise: "Single dot is to Multiple dots as Single line is to ?",
            options: ["Circle", "Triangle", "Multiple lines", "Square"],
            correct: 2,
            explain: "The relationship is single to multiple of the same shape"
          },
          {
            premise: "Black shape is to White shape as Solid line is to ?",
            options: ["Thick line", "Colored line", "Dotted line", "No line"],
            correct: 2,
            explain: "The relationship shows contrast in representation"
          }
        ];

        const selectedAnalogy = analogies[i % analogies.length];
        const answer = selectedAnalogy.options[selectedAnalogy.correct];

        return {
          question: selectedAnalogy.premise,
          options: selectedAnalogy.options,
          correctAnswer: selectedAnalogy.correct,
          explanation: formatExplanation(
            selectedAnalogy.premise,
            answer,
            `${selectedAnalogy.explain}`
          )
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
        const answer = `${result}`;

        return {
          question: `${percentage}% of ${baseNumber} is:`,
          options: [
            answer,
            `${result + 10}`,
            `${result - 10}`,
            `${result * 2}`
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `${percentage}% of ${baseNumber} is:`,
            answer,
            `To calculate percentage:
            1. Convert percentage to decimal (${percentage}/100 = ${percentage / 100})
            2. Multiply by the base number (${baseNumber})
            3. Result: ${result}`,
            "Percentage = (Value × Percentage) ÷ 100"
          )
        };
      })
    },
    "Q02": {
      title: "Profit and Loss",
      questions: Array.from({ length: 100 }, (_, i) => {
        const costPrice = Math.floor(Math.random() * 900) + 100;
        const profitPercentage = Math.floor(Math.random() * 50) + 10;
        const sellingPrice = costPrice + (costPrice * profitPercentage / 100);
        const answer = `Rs. ${sellingPrice}`;

        return {
          question: `If the cost price is Rs. ${costPrice} and profit percentage is ${profitPercentage}%, what is the selling price?`,
          options: [
            answer,
            `Rs. ${sellingPrice + 10}`,
            `Rs. ${sellingPrice - 10}`,
            `Rs. ${sellingPrice * 2}`
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `If the cost price is Rs. ${costPrice} and profit percentage is ${profitPercentage}%, what is the selling price?`,
            answer,
            `Selling Price = Cost Price + (Cost Price × Profit%/100) = ${costPrice} + (${costPrice} × ${profitPercentage}/100) = ${sellingPrice}`,
            "Selling Price = Cost Price + (Cost Price × Profit Percentage / 100)"
          )
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
        const answer = `Rs. ${simpleInterest}`;

        return {
          question: `What is the Simple Interest on Rs. ${principal} at ${rate}% per annum for ${time} years?`,
          options: [
            answer,
            `Rs. ${simpleInterest + 100}`,
            `Rs. ${simpleInterest - 100}`,
            `Rs. ${simpleInterest * 2}`
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `What is the Simple Interest on Rs. ${principal} at ${rate}% per annum for ${time} years?`,
            answer,
            `Simple Interest = (Principal × Rate × Time)/100 = (${principal} × ${rate} × ${time})/100 = ${simpleInterest}`,
            "Simple Interest = (Principal × Rate × Time) / 100"
          )
        };
      })
    },
    "Q04": {
      title: "Compound Interest",
      questions: Array.from({ length: 100 }, (_, i) => {
        const principal = Math.floor(Math.random() * 10000) + 1000;
        const rate = (Math.floor(Math.random() * 10) + 5);
        const time = Math.floor(Math.random() * 3) + 1;
        const CI = principal * Math.pow((1 + rate / 100), time) - principal;
        const answer = `Rs. ${Math.round(CI)}`;

        return {
          question:`What is the Compound Interest on Rs. ${principal} at${rate}% per annum for ${time} years?`,
          options: [
            answer,
            `Rs. ${Math.round(CI + 100)}`,
            `Rs. ${Math.round(CI - 100)}`,
            `Rs. ${Math.round(CI * 1.5)}`
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `What is the Compound Interest on Rs. ${principal} at ${rate}% per annum for ${time} years?`,
            answer,
            `CI = P(1 + r/100)^t - P = ${principal}(1 + ${rate}/100)^${time} - ${principal} = ${Math.round(CI)}`,
            "Compound Interest = P(1 + r/100)^t - P"
          )
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
        const answer = `${Math.round(part1)}`;

        return {
          question: `If two numbers are in the ratio ${ratio1}:${ratio2} and their sum is ${total}, find the first number.`,
          options: [
            answer,
            `${Math.round(part1 + 10)}`,
            `${Math.round(part1 - 10)}`,
            `${Math.round(part1 * 1.5)}`
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `If two numbers are in the ratio ${ratio1}:${ratio2} and their sum is ${total}, find the first number.`,
            answer,
            `First number = (Total × ${ratio1})/(${ratio1} + ${ratio2}) = (${total} × ${ratio1})/${ratio1 + ratio2} = ${Math.round(part1)}`,
            "First Number = (Total × Ratio1) / (Ratio1 + Ratio2)"
          )
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
        const answer = `${newDays}`;

        return {
          question: `${numPeople} people can complete a piece of work in ${numDays} days. How many days will it take ${newPeople} people to complete the same work?`,
          options: [
            answer,
            `${newDays + 2}`,
            `${newDays - 2}`,
            `${newDays * 2}`
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `${numPeople} people can complete a piece of work in ${numDays} days. How many days will it take ${newPeople} people to complete the same work?`,
            answer,
            `${numPeople} people × ${numDays} days = ${totalWork} units of work.  ${totalWork} units of work / ${newPeople} people = ${newDays} days`,
            "Days = (People × Days) / New People"
          )
        };
      })
    },
    "Q07": {
      title: "Time and Distance",
      questions: Array.from({ length: 100 }, (_, i) => {
        const speed = Math.floor(Math.random() * 60) + 20;
        const time = Math.floor(Math.random() * 10) + 2;
        const distance = speed * time;
        const answer = `${distance} km`;

        return {
          question: `If a car travels at a speed of ${speed} km/h for ${time} hours, what distance does it cover?`,
          options: [
            answer,
            `${distance + 10} km`,
            `${distance - 10} km`,
            `${distance * 2} km`
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `If a car travels at a speed of ${speed} km/h for ${time} hours, what distance does it cover?`,
            answer,
            `Distance = Speed × Time = ${speed} km/h × ${time} h = ${distance} km`,
            "Distance = Speed × Time"
          )
        };
      })
    },
    "Q08": {
      title: "Average",
      questions: Array.from({ length: 100 }, (_, i) => {
        const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
        const sum = numbers.reduce((a, b) => a + b, 0);
        const average = sum / numbers.length;
        const answer = `${average}`;

        return {
          question: `What is the average of the following numbers: ${numbers.join(', ')}?`,
          options: [
            answer,
            `${average + 5}`,
            `${average - 5}`,
            `${average * 2}`
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `What is the average of the following numbers: ${numbers.join(', ')}?`,
            answer,
            `Average = Sum of numbers / Number of numbers = ${sum} /5 = ${average}`,
            "Average = Sum of Numbers / Number of Numbers"
          )
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
        const answer = `${result}`;

        return {
          question: question,
          options: [
            answer,
            `${result + 5}`,
            `${result - 5}`,
            `${result * 2}`
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            question,
            answer,
            `${num1} ${operation === 0 ? '+' : operation === 1 ? '-' : operation === 2 ? '×' : '/'} ${num2} = ${result}`
          )
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
        const answer = `${b}`;

        return {
          question: question,
          options: [
            answer,
            `${a}`,
            `${a + b}`,
            `${a - b}`
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            question,
            answer,
            `x = ${c} - ${a} = ${b}`
          )
        };
      })
    },
    "Q11": {
      title: "Geometry",
      questions: Array.from({ length: 100 }, (_, i) => {
        const shapes = ['circle', 'square', 'triangle', 'rectangle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const question = `What is a ${shape}?`;
        const answer = [
          `A round 2D shape`,
          `A 4-sided polygon`,
          `A 3-sided polygon`,
          `A 4-sided polygon with 4 right angles`
        ][shapes.indexOf(shape)];

        return {
          question: question,
          options: [
            `A round 2D shape`,
            `A 4-sided polygon`,
            `A 3-sided polygon`,
            `A 4-sided polygon with 4 right angles`
          ],
          correctAnswer: shapes.indexOf(shape),
          explanation: formatExplanation(
            question,
            answer,
            `A ${shape} is a basic geometric figure.`
          )
        };
      })
    },
    "Q12": {
      title: "Mensuration",
      questions: Array.from({ length: 100 }, (_, i) => {
        const length = Math.floor(Math.random() * 10) + 5;
        const width = Math.floor(Math.random() * 10) + 5;
        const area = length * width;
        const answer = `${area} cm²`;

        return {
          question: `What is the area of a rectangle with length ${length} cm and width ${width} cm?`,
          options: [
            answer,
            `${area + 10} cm²`,
            `${area - 10} cm²`,
            `${area * 2} cm²`
          ],
          correctAnswer: 0,
          explanation: formatExplanation(
            `What is the area of a rectangle with length ${length} cm and width ${width} cm?`,
            answer,
            `Area = Length × Width = ${length} cm × ${width} cm = ${area} cm²`,
            "Area of Rectangle = Length × Width"
          )
        };
      })
    },
  }
};

// Helper function to generate expanded questions
function generateQuestions(baseQuestion: string, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    question: `${baseQuestion} #${i + 1}`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: Math.floor(Math.random() * 4),
    explanation: `This is the explanation for ${baseQuestion} #${i + 1}`
  }));
}

// Lazy load sections of the question bank as needed
export function getQuestionsForTopic(category: string, topicId: string): any[] {
  if (!questionBank[category]?.[topicId]) {
    return [];
  }
  return questionBank[category][topicId].questions;
}

//Fisher-Yates shuffle algorithm
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}