
// Question bank for aptitude tests
export const questionBank = {
  verbal: {
    "L01": [ // Direction Sense
      {
        question: "If you are facing north and turn 90 degrees clockwise, which direction will you face?",
        options: ["East", "West", "South", "North-East"],
        correctAnswer: 0
      },
      {
        question: "Rahul walks 5 km towards East, then turns left and walks 4 km. Which direction is he now from the starting point?",
        options: ["North-East", "South-East", "North-West", "South-West"],
        correctAnswer: 1
      },
      {
        question: "If South-East becomes North, then North-East becomes?",
        options: ["South-West", "North-West", "West", "East"],
        correctAnswer: 3
      },
      {
        question: "A person walks 3 km northwards and then turns right and walks 4 km. In which direction is he from the starting point?",
        options: ["North-East", "North-West", "South-East", "South-West"],
        correctAnswer: 0
      },
      {
        question: "Sita walks 20 meters towards North. Then she turns right and walks 30 meters. Then she turns right and walks 35 meters. Then she turns left and walks 15 meters. How far is she from the starting position?",
        options: ["50 meters", "45 meters", "40 meters", "35 meters"],
        correctAnswer: 1
      }
    ],
    "L02": [ // Blood Relations
      {
        question: "If A is the brother of B; B is the sister of C; and C is the father of D, how D is related to A?",
        options: ["Brother", "Sister", "Nephew", "Cannot be determined"],
        correctAnswer: 3
      },
      {
        question: "Pointing to a photograph, Ram said, 'She is the daughter of the only son of my grandfather.' How is the girl in the photograph related to Ram?",
        options: ["Sister", "Niece", "Aunt", "Cousin"],
        correctAnswer: 0
      },
      {
        question: "A is B's sister. C is B's mother. D is C's father. E is D's mother. How is A related to D?",
        options: ["Granddaughter", "Daughter", "Grandmother", "Grandfather"],
        correctAnswer: 0
      },
      {
        question: "Introducing a woman, a man says, 'She is the mother of my brother's daughter.' What is the woman to the man?",
        options: ["Sister-in-law", "Mother-in-law", "Aunt", "Sister"],
        correctAnswer: 0
      },
      {
        question: "If P is the husband of Q, and R is the mother of S and Q, what is P to S?",
        options: ["Uncle", "Brother-in-law", "Father", "Brother"],
        correctAnswer: 1
      }
    ]
  },
  nonVerbal: {
    "N01": [ // Logical Venn Diagrams
      {
        question: "Which Venn diagram best represents the relationship between: Fruits, Apples, Food?",
        options: [
          "Three overlapping circles with equal overlap",
          "Apple circle inside Fruit circle, both inside Food circle", 
          "Three separate circles", 
          "Food and Fruit overlap, Apple separate"
        ],
        correctAnswer: 1
      },
      {
        question: "Which diagram represents the relationship between: Ocean, Water, Land?",
        options: [
          "Water circle contains Ocean circle, Land circle separate",
          "Ocean circle and Land circle both inside Water circle",
          "Water circle inside Ocean circle, Land circle separate",
          "Three circles with partial overlap"
        ],
        correctAnswer: 0
      },
      {
        question: "Which diagram represents the relationship between: Teachers, Women, Mothers?",
        options: [
          "Three separate circles",
          "Three circles with some area of overlap between all",
          "Women circle contains Mothers circle, Teachers circle partially overlaps both",
          "Teachers circle and Mothers circle inside Women circle"
        ],
        correctAnswer: 2
      },
      {
        question: "Choose the Venn diagram that illustrates the relationship between: Cats, Mammals, Pets",
        options: [
          "Cats circle inside both Mammals and Pets circles, with Mammals and Pets partially overlapping",
          "Three circles with equal overlap",
          "Mammals circle contains Cats circle, Pets circle overlaps both",
          "Pets circle contains Cats circle, Mammals circle contains Pets circle"
        ],
        correctAnswer: 0
      },
      {
        question: "Which diagram correctly shows the relationship between: Quadrilaterals, Squares, Rectangles?",
        options: [
          "Quadrilaterals contains both Squares and Rectangles, with Squares and Rectangles having no overlap",
          "Squares inside Rectangles, both inside Quadrilaterals",
          "Rectangles inside Squares, both inside Quadrilaterals",
          "Squares inside Rectangles, Rectangles partially overlapping with Quadrilaterals"
        ],
        correctAnswer: 1
      }
    ]
  },
  mathematical: {
    "Q01": [ // Percentages
      {
        question: "If 30% of a number is 45, what is the number?",
        options: ["135", "150", "175", "120"],
        correctAnswer: 1
      },
      {
        question: "A shirt is discounted by 20% to $40. What was its original price?",
        options: ["$45", "$48", "$50", "$52"],
        correctAnswer: 2
      },
      {
        question: "If the price of a product increases by 25% and then decreases by 20%, the net change in price is:",
        options: ["0%", "+5%", "-5%", "+10%"],
        correctAnswer: 1
      },
      {
        question: "In an exam, a student scored 85% and got 425 marks. What is the maximum marks of the exam?",
        options: ["450", "475", "500", "525"],
        correctAnswer: 2
      },
      {
        question: "If 40% of a number is 30 more than 25% of the same number, what is the number?",
        options: ["150", "200", "250", "300"],
        correctAnswer: 1
      }
    ],
    "Q02": [ // Profit and Loss
      {
        question: "A shopkeeper bought an item for $800 and sold it for $1000. What is the profit percentage?",
        options: ["20%", "25%", "15%", "22.5%"],
        correctAnswer: 0
      },
      {
        question: "If a shopkeeper sells an article at 10% loss instead of 10% profit, he would lose $60 more. What is the cost price of the article?",
        options: ["$300", "$320", "$350", "$400"],
        correctAnswer: 0
      },
      {
        question: "A trader bought goods worth $2400 and sold half of them at 20% profit and the remaining at 10% loss. The overall profit/loss percentage is:",
        options: ["5% profit", "5% loss", "10% profit", "No profit, no loss"],
        correctAnswer: 0
      },
      {
        question: "An article is sold at 20% profit. If both the cost price and selling price are reduced by $50, the profit would be 25%. Find the original cost price.",
        options: ["$350", "$400", "$450", "$500"],
        correctAnswer: 1
      },
      {
        question: "A shopkeeper marks his goods 40% above cost price and allows a 25% discount. His profit percentage is:",
        options: ["5%", "10%", "15%", "7.5%"],
        correctAnswer: 0
      }
    ]
  },
  technical: {
    "T01": [ // Data Structures
      {
        question: "Which data structure operates on a LIFO (Last In First Out) principle?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        correctAnswer: 1
      },
      {
        question: "What is the worst-case time complexity of binary search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 1
      },
      {
        question: "Which of the following is not a linear data structure?",
        options: ["Array", "Linked List", "Queue", "Tree"],
        correctAnswer: 3
      },
      {
        question: "In a hash table, what happens when two different keys hash to the same value?",
        options: ["Key Error", "Collision", "Overflow", "Underflow"],
        correctAnswer: 1
      },
      {
        question: "Which sorting algorithm has the best average-case time complexity?",
        options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"],
        correctAnswer: 3
      }
    ]
  },
  psychometric: {
    "P01": [ // Personality Assessment
      {
        question: "When faced with a challenging problem, I typically:",
        options: [
          "Analyze it logically and systematically", 
          "Rely on intuition and creativity", 
          "Consult with others for their perspectives", 
          "Draw from past experiences with similar problems"
        ],
        correctAnswer: -1 // No correct answer for psychometric questions
      },
      {
        question: "In team settings, I am most comfortable:",
        options: [
          "Leading and directing others", 
          "Supporting and contributing as needed", 
          "Working independently on assigned tasks", 
          "Collaborating closely with a small group"
        ],
        correctAnswer: -1
      },
      {
        question: "When receiving criticism, I typically:",
        options: [
          "Carefully consider its validity", 
          "Feel uncomfortable regardless of its merit", 
          "Appreciate the feedback as an opportunity to improve", 
          "Defend my position and decisions"
        ],
        correctAnswer: -1
      },
      {
        question: "When it comes to making decisions, I prefer to:",
        options: [
          "Gather all possible information before deciding", 
          "Trust my instincts and decide quickly", 
          "Weigh pros and cons methodically", 
          "Consult others before finalizing"
        ],
        correctAnswer: -1
      },
      {
        question: "Which best describes your approach to new situations?",
        options: [
          "Excited to explore new possibilities", 
          "Cautious until I understand all aspects", 
          "Confident in my ability to adapt", 
          "Concerned about potential challenges"
        ],
        correctAnswer: -1
      }
    ]
  }
};
