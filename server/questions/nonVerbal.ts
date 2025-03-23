// Non-verbal Questions Module
import { Question } from '../types';

export async function getLogicalVennQuestions(): Promise<Question[]> {
  return [
    {
      question: "In a Venn diagram showing the relationship between 'Birds', 'Flying creatures', and 'Insects', where would a butterfly be placed?",
      options: [
        "Intersection of Flying creatures and Insects",
        "Only in Birds",
        "Only in Insects",
        "Outside all circles"
      ],
      correctAnswer: 0,
      explanation: "A butterfly is both a flying creature and an insect, thus belongs in the intersection"
    },
    {
      question: "In a Venn diagram of 'Students', 'Athletes', and 'Musicians', where would a student who plays basketball and piano be placed?",
      options: [
        "Intersection of all three circles",
        "Intersection of Students and Athletes only",
        "Intersection of Students, Athletes, and Musicians",
        "Intersection of Athletes and Musicians only"
      ],
      correctAnswer: 2,
      explanation: "This person belongs in all three categories: student, athlete (basketball), and musician (piano)"
    },
    {
      question: "In a Venn diagram of 'Mammals', 'Aquatic animals', and 'Carnivores', where would a dolphin be placed?",
      options: [
        "Intersection of Mammals and Aquatic animals",
        "Only in Aquatic animals",
        "Intersection of all three circles",
        "Only in Mammals"
      ],
      correctAnswer: 2,
      explanation: "Dolphins are mammals that live in water and eat fish, thus belong in all three categories"
    },
    {
      question: "In a Venn diagram of 'Fruits', 'Red foods', and 'Sweet foods', where would a red apple be placed?",
      options: [
        "Intersection of all three circles",
        "Only in Fruits",
        "Intersection of Fruits and Red foods",
        "Outside all circles"
      ],
      correctAnswer: 0,
      explanation: "A red apple is a fruit that is both red and sweet, thus belongs in all three categories"
    },
    {
      question: "In a Venn diagram of 'Vehicles', 'Electric powered', and 'Four-wheeled', where would a gas-powered motorcycle be placed?",
      options: [
        "Only in Vehicles",
        "Intersection of Vehicles and Four-wheeled",
        "Outside all circles",
        "In all three circles"
      ],
      correctAnswer: 0,
      explanation: "A gas-powered motorcycle is only a vehicle, not electric or four-wheeled"
    },
    {
      question: "In a Venn diagram of 'Books', 'Digital media', and 'Educational resources', where would an e-textbook be placed?",
      options: [
        "Intersection of all three circles",
        "Only in Books",
        "Intersection of Books and Digital media",
        "Only in Digital media"
      ],
      correctAnswer: 0,
      explanation: "An e-textbook is a book, digital media, and educational resource"
    },
    {
      question: "In a Venn diagram of 'Metals', 'Conductors', and 'Elements', where would gold be placed?",
      options: [
        "Intersection of all three circles",
        "Only in Metals",
        "Intersection of Metals and Elements",
        "Only in Elements"
      ],
      correctAnswer: 0,
      explanation: "Gold is a metal, a conductor, and an element"
    },
    {
      question: "In a Venn diagram of 'Furniture', 'Wooden items', and 'Antiques', where would a modern plastic chair be placed?",
      options: [
        "Only in Furniture",
        "Intersection of Furniture and Antiques",
        "Intersection of all three circles",
        "Outside all circles"
      ],
      correctAnswer: 0,
      explanation: "A modern plastic chair is only furniture, not wooden or antique"
    },
    {
      question: "In a Venn diagram of 'Plants', 'Edible items', and 'Green colored', where would a red apple be placed?",
      options: [
        "Only in Edible items",
        "Intersection of Plants and Edible items",
        "In all three circles",
        "Outside all circles"
      ],
      correctAnswer: 1,
      explanation: "A red apple is both a plant and edible, but not green"
    },
    {
      question: "In a Venn diagram of 'Tools', 'Electronic devices', and 'Communication devices', where would a hammer be placed?",
      options: [
        "Only in Tools",
        "Intersection of Tools and Electronic devices",
        "In all three circles",
        "Outside all circles"
      ],
      correctAnswer: 0,
      explanation: "A hammer is only a tool, not electronic or for communication"
    },
    // Add 90 more similar questions with increasing complexity...
    // Each should test understanding of set relationships and logical reasoning
  ];
}

export async function getDiceCubeQuestions(): Promise<Question[]> {
  return [
    {
      question: "If a cube has number 1 opposite to 6, 2 opposite to 5, which number is opposite to 3?",
      options: ["4", "5", "6", "2"],
      correctAnswer: 0,
      explanation: "Following the pattern, numbers opposite each other sum to 7 (1+6=7, 2+5=7, so 3+4=7)"
    },
    {
      question: "A cube is painted red on three adjacent faces and blue on the remaining faces. How many vertices have exactly two red faces meeting at them?",
      options: ["4", "6", "8", "2"],
      correctAnswer: 0,
      explanation: "At a vertex where three faces meet, only two can be red since they are adjacent"
    },
    {
      question: "On a dice, if 1 is on top and 2 is facing front, what number is on the right face?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 0,
      explanation: "Following standard dice configuration, when 1 is top and 2 is front, 3 is on the right"
    },
    {
      question: "A cube has different colors on each face. If white is opposite to black, red opposite to blue, what color is opposite to green?",
      options: ["Yellow", "Red", "Blue", "White"],
      correctAnswer: 0,
      explanation: "By elimination, since other pairs are given, yellow must be opposite to green"
    },
    {
      question: "If you roll two dice, what is the probability of getting a sum of 7?",
      options: ["1/6", "1/8", "1/12", "1/36"],
      correctAnswer: 0,
      explanation: "There are 6 ways to get sum 7 out of 36 possible combinations, so probability is 6/36 = 1/6"
    },
    {
      question: "A cube is painted red. It is then cut into 27 smaller equal cubes. How many small cubes have exactly two red faces?",
      options: ["12", "8", "6", "4"],
      correctAnswer: 0,
      explanation: "Edge cubes (not corners) have exactly two painted faces, and there are 12 such cubes"
    },
    {
      question: "If a die shows 3 on top and 1 facing you, what number is on the bottom?",
      options: ["4", "5", "6", "2"],
      correctAnswer: 0,
      explanation: "On a standard die, opposite faces sum to 7, so if 3 is on top, 4 is on bottom"
    },
    {
      question: "A cube has numbers 1 to 6 on its faces. If 2 is on top and 3 is on front, what is on the bottom?",
      options: ["5", "4", "6", "1"],
      correctAnswer: 0,
      explanation: "Opposite faces sum to 7, so if 2 is on top, 5 must be on bottom"
    },
    {
      question: "In a standard die, sum of numbers on opposite faces is 7. If 6 is on top and 2 is in front, what is on the right face?",
      options: ["3", "4", "5", "1"],
      correctAnswer: 0,
      explanation: "Following standard die configuration, when 6 is top and 2 is front, 3 is on right"
    },
    {
      question: "A cube is painted yellow on all faces. It is cut into 64 smaller equal cubes. How many small cubes have no yellow face?",
      options: ["27", "36", "8", "16"],
      correctAnswer: 0,
      explanation: "Interior cubes have no painted faces. In a 4×4×4 cube, there are 2×2×2 = 8 interior cubes"
    },
    // Add 90 more similar questions with increasing complexity...
    // Include questions about:
    // - Dice probabilities
    // - Cube painting and cutting
    // - Spatial reasoning
    // - Dice patterns and relationships
  ];
}

export async function getFigureSeriesQuestions(): Promise<Question[]> {
  return [
    {
      question: "Which figure comes next in the series: △ □ ○ △ □ ○ △ ?",
      options: ["□", "○", "△", "×"],
      correctAnswer: 1,
      explanation: "The pattern repeats every three figures: △ □ ○"
    },
    {
      question: "Next in sequence: ◇ ◆ ◇◆ ◇◆◇ ?",
      options: ["◆◇◆", "◇◆◇", "◆◇◇", "◇◇◆"],
      correctAnswer: 0,
      explanation: "Each term alternates between hollow and filled diamonds with increasing length"
    },
    {
      question: "What comes next: ● ▲ ■ ● ▲ ■ ?",
      options: ["●", "▲", "■", "★"],
      correctAnswer: 0,
      explanation: "The pattern follows a repeating sequence of circle, triangle, square"
    },
    {
      question: "Next in series: ★ ☆ ★★ ☆☆ ★★★ ?",
      options: ["☆☆☆", "★★★★", "☆★☆", "★☆★"],
      correctAnswer: 0,
      explanation: "Alternating filled and hollow stars with increasing count"
    },
    {
      question: "Complete the sequence: ◐ ◓ ◑ ◒ ?",
      options: ["◐", "◓", "◑", "◒"],
      correctAnswer: 0,
      explanation: "The half-circle rotates 90° clockwise in each step"
    },
    {
      question: "What follows: □ □□ □□□ □□□□ ?",
      options: ["□□□□□", "□□□", "□□", "□"],
      correctAnswer: 0,
      explanation: "Number of squares increases by one in each term"
    },
    {
      question: "Next figure: ○ ◎ ⊕ ◉ ?",
      options: ["○", "◎", "⊕", "◉"],
      correctAnswer: 0,
      explanation: "The pattern repeats with circle variants"
    },
    {
      question: "Continue sequence: △ ▲ ▲△ △▲ ?",
      options: ["△△", "▲▲", "△▲", "▲△"],
      correctAnswer: 2,
      explanation: "Alternating filled and hollow triangles in pairs"
    },
    {
      question: "Next in pattern: ■ □ ■□ □■ ?",
      options: ["■■", "□□", "■□", "□■"],
      correctAnswer: 0,
      explanation: "The sequence follows filled square patterns"
    },
    {
      question: "Complete: ⬡ ⬢ ⬡⬢ ⬢⬡ ?",
      options: ["⬡⬡", "⬢⬢", "⬡⬢", "⬢⬡"],
      correctAnswer: 1,
      explanation: "Alternating hexagon pattern with filled variants"
    },
    // Add 90 more questions with similar patterns and complexity...
    {
      question: "Which shape continues: ◇ ◆ ◇◆ ◆◇ ?",
      options: ["◇◇", "◆◆", "◇◆", "◆◇"],
      correctAnswer: 0,
      explanation: "The pattern follows diamond variations"
    }
  ];
}

export async function getPatternCompletionQuestions(): Promise<Question[]> {
  return [
    {
      question: "Complete the pattern: ■ □ ■ □\n□ ■ □ ?\n■ □ ■ □\n□ ■ □ ■",
      options: ["■", "□", "★", "◆"],
      correctAnswer: 0,
      explanation: "The pattern alternates between filled and hollow squares in a checkerboard pattern"
    },
    {
      question: "What completes: ▲ ○ ▲\n○ ? ○\n▲ ○ ▲",
      options: ["▲", "○", "■", "△"],
      correctAnswer: 0,
      explanation: "The pattern shows triangles in corners with circles between"
    },
    {
      question: "Fill the blank: ★ ☆ ★\n☆ ? ☆\n★ ☆ ★",
      options: ["★", "☆", "■", "○"],
      correctAnswer: 0,
      explanation: "The pattern alternates between filled and hollow stars"
    },
    {
      question: "Missing shape: □ ■ □\n■ ? ■\n□ ■ □",
      options: ["□", "■", "○", "▲"],
      correctAnswer: 0,
      explanation: "The pattern alternates squares in a symmetrical way"
    },
    {
      question: "Complete: ○ ● ○\n● ? ●\n○ ● ○",
      options: ["○", "●", "■", "□"],
      correctAnswer: 0,
      explanation: "The pattern shows alternating filled and hollow circles"
    },
    {
      question: "What fits: △ ▲ △\n▲ ? ▲\n△ ▲ △",
      options: ["△", "▲", "○", "□"],
      correctAnswer: 0,
      explanation: "The pattern alternates between filled and hollow triangles"
    },
    {
      question: "Fill in: ◇ ◆ ◇\n◆ ? ◆\n◇ ◆ ◇",
      options: ["◇", "◆", "○", "□"],
      correctAnswer: 0,
      explanation: "The pattern shows alternating diamond shapes"
    },
    {
      question: "Missing element: ⬡ ⬢ ⬡\n⬢ ? ⬢\n⬡ ⬢ ⬡",
      options: ["⬡", "⬢", "○", "□"],
      correctAnswer: 0,
      explanation: "The pattern alternates between hexagon variants"
    },
    {
      question: "Complete pattern: ● ○ ●\n○ ? ○\n● ○ ●",
      options: ["●", "○", "■", "□"],
      correctAnswer: 0,
      explanation: "The pattern shows alternating circles in a grid"
    },
    {
      question: "What belongs: ■ □ ■\n□ ? □\n■ □ ■",
      options: ["■", "□", "○", "●"],
      correctAnswer: 0,
      explanation: "The pattern alternates squares in a symmetrical grid"
    },
    // Add 90 more pattern completion questions...
    {
      question: "Fill blank: ★ ☆ ★\n☆ ? ☆\n★ ☆ ★",
      options: ["★", "☆", "■", "□"],
      correctAnswer: 0,
      explanation: "The pattern follows star variations in a grid"
    }
  ];
}