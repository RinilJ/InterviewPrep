import { Question } from '../types';

// Direction Sense Questions (L01)
async function getDirectionSenseQuestions(): Promise<Question[]> {
  return [
    {
      question: "Starting from point A, John walks 3 km North, then 4 km East, and finally 3 km South. How far is he from point A?",
      options: ["4 km", "5 km", "6 km", "7 km"],
      correctAnswer: 0,
      explanation: "The North and South movements cancel out (3 km North and 3 km South). Only the 4 km East remains."
    },
    {
      question: "From his house, Tom walks 6 km West, then 8 km North. What is the direct distance from his house?",
      options: ["10 km", "12 km", "14 km", "16 km"],
      correctAnswer: 0,
      explanation: "Using Pythagorean theorem: √(6² + 8²) = 10 km"
    },
    {
      question: "Walking from point X, a person goes 5 km East, then 12 km North. How far is he from X?",
      options: ["13 km", "15 km", "17 km", "11 km"],
      correctAnswer: 0,
      explanation: "Using Pythagorean theorem: √(5² + 12²) = 13 km"
    },
    {
      question: "A man walks 2 km North, then 2 km East, then 2 km South, then 2 km West. Where is he now?",
      options: ["At starting point", "2 km East", "2 km North", "2 km West"],
      correctAnswer: 0,
      explanation: "The East and West cancel out, and North and South cancel out, bringing him back to start"
    },
    {
      question: "Starting from school, a student walks 8 km East, then 6 km North, then 8 km West. How far is the student from school?",
      options: ["6 km North", "8 km East", "6 km South", "8 km West"],
      correctAnswer: 0,
      explanation: "The East and West movements cancel out (8 km each way), leaving only 6 km North"
    },
    {
      question: "A person walks 10 km South, then 10 km East, and finally 5 km North. What is the shortest distance back to the starting point?",
      options: ["11.18 km", "15 km", "25 km", "5 km"],
      correctAnswer: 0,
      explanation: "Using Pythagorean theorem with 5 km South and 10 km East: √(5² + 10²) ≈ 11.18 km"
    },
    {
      question: "From point P, a person walks 7 km East to Q, then 24 km North to R. What is the direct distance from P to R?",
      options: ["25 km", "31 km", "27 km", "29 km"],
      correctAnswer: 0,
      explanation: "Using Pythagorean theorem: √(7² + 24²) = 25 km"
    },
    {
      question: "Starting from home, a boy walks 15 meters North, then 20 meters West, then 15 meters South. How far is he from home?",
      options: ["20 meters West", "15 meters North", "25 meters", "30 meters"],
      correctAnswer: 0,
      explanation: "The North and South movements cancel out (15m each), leaving only 20m West"
    },
    {
      question: "A person walks 4 km towards North, turns right and walks 3 km, turns right again and walks 4 km. How far is he from the starting point?",
      options: ["3 km", "4 km", "5 km", "7 km"],
      correctAnswer: 0,
      explanation: "The North movements cancel out, leaving only 3 km East"
    },
    {
      question: "From his office, John walks 5 km North, then 5 km East, then 5 km South. What is the shortest distance to his office?",
      options: ["5 km", "10 km", "15 km", "7.07 km"],
      correctAnswer: 0,
      explanation: "The North and South movements cancel out, leaving only 5 km East"
    },
    {
      question: "A cyclist rides 20 km East, then 15 km North, then 10 km West. What is his displacement from the starting point?",
      options: ["18.03 km", "25 km", "15 km", "20 km"],
      correctAnswer: 0,
      explanation: "Using Pythagorean theorem with 10 km East and 15 km North: √(10² + 15²) ≈ 18.03 km"
    },
    {
      question: "Walking from point A, a person goes 12 km South, then 5 km East, then 9 km North. What is the shortest path back to A?",
      options: ["5.83 km", "26 km", "14 km", "9 km"],
      correctAnswer: 0,
      explanation: "Using Pythagorean theorem with 3 km South and 5 km East: √(3² + 5²) ≈ 5.83 km"
    },
    {
      question: "A delivery person travels 8 km North, 6 km East, then 3 km South. What's the direct distance to the starting point?",
      options: ["7.81 km", "17 km", "11 km", "9 km"],
      correctAnswer: 0,
      explanation: "Using Pythagorean theorem with 5 km North and 6 km East: √(5² + 6²) ≈ 7.81 km"
    },
    {
      question: "Starting from college, a student walks 30 meters East, then 40 meters North, then 30 meters West. What's their distance from college?",
      options: ["40 meters", "60 meters", "70 meters", "100 meters"],
      correctAnswer: 0,
      explanation: "The East and West movements cancel out (30m each), leaving 40m North"
    },
    // ... (Add 86 more direction sense questions to reach approximately 100 questions)

  ];
}

// Blood Relations Questions (L02) 
async function getBloodRelationQuestions(): Promise<Question[]> {
  return [
    {
      question: "If A is B's father and C is B's sister, how is A related to C?",
      options: ["Father", "Uncle", "Brother", "Grandfather"],
      correctAnswer: 0,
      explanation: "Since A is B's father and C is B's sister, A must be C's father."
    },
    {
      question: "If P is Q's son and R is P's sister, how is R related to Q?",
      options: ["Daughter", "Sister", "Mother", "Aunt"],
      correctAnswer: 0,
      explanation: "Since P is Q's son and R is P's sister, R must be Q's daughter."
    },
    {
      question: "A's father is B's son. C is B's father. How is A related to C?",
      options: ["Great grandson", "Grandson", "Son", "Brother"],
      correctAnswer: 0,
      explanation: "B's son is A's father, and C is B's father, making C A's great grandfather."
    },
    {
      question: "X is Y's brother. Z is Y's father. How is X related to Z?",
      options: ["Son", "Brother", "Father", "Nephew"],
      correctAnswer: 0,
      explanation: "If X is Y's brother and Z is Y's father, then X must be Z's son."
    },
    {
      question: "If M is N's wife, O is M's son, P is O's sister, how is P related to N?",
      options: ["Daughter", "Sister", "Niece", "Wife"],
      correctAnswer: 0,
      explanation: "N's wife (M) has two children: O and P, making P N's daughter."
    },
    {
      question: "A's mother is B's father's sister. How is B related to A?",
      options: ["Cousin", "Uncle", "Nephew", "Brother"],
      correctAnswer: 0,
      explanation: "B's father's sister is A's mother, making A and B cousins."
    },
    {
      question: "If P is Q's daughter, and R is Q's mother, how is R related to P?",
      options: ["Grandmother", "Mother", "Aunt", "Sister"],
      correctAnswer: 0,
      explanation: "Q is P's parent (father) and R is Q's mother, making R P's grandmother."
    },
    {
      question: "D is E's brother, F is D's mother, G is F's father. How is G related to E?",
      options: ["Grandfather", "Father", "Uncle", "Brother"],
      correctAnswer: 0,
      explanation: "F is E's mother (since E and D are siblings), and G is F's father, making G E's grandfather."
    },
    {
      question: "J is K's brother, L is J's sister, M is L's mother. How is M related to K?",
      options: ["Mother", "Aunt", "Sister", "Grandmother"],
      correctAnswer: 0,
      explanation: "Since J, K, and L are siblings, and M is L's mother, M must be K's mother too."
    },
    {
      question: "If X's mother is Y's father's wife, how is Y related to X?",
      options: ["Brother/Sister", "Cousin", "Uncle/Aunt", "Nephew/Niece"],
      correctAnswer: 0,
      explanation: "Y's father's wife is X's mother, making X and Y siblings (brother/sister)."
    },
    {
      question: "A's father's sister's husband is B. How is B related to A?",
      options: ["Uncle", "Father", "Brother", "Cousin"],
      correctAnswer: 0,
      explanation: "A's father's sister is A's aunt, and her husband B is A's uncle."
    },
    {
      question: "P's mother's brother's wife is Q. How is Q related to P?",
      options: ["Aunt", "Mother", "Sister", "Cousin"],
      correctAnswer: 0,
      explanation: "P's mother's brother is P's uncle, and his wife Q is P's aunt."
    },
    {
      question: "X's father's mother's only son's wife is Y. How is Y related to X?",
      options: ["Mother", "Grandmother", "Aunt", "Sister"],
      correctAnswer: 0,
      explanation: "Father's mother's only son must be X's father, so his wife Y is X's mother."
    },
    {
      question: "If A's son is B's brother and C is B's father, how is A related to C?",
      options: ["Wife", "Sister", "Mother", "Daughter"],
      correctAnswer: 0,
      explanation: "B's father is C, and A has a son who is B's brother, so A must be C's wife."
    },
    // ... (Continue with 86 more similar questions with increasing complexity...)

  ];
}

// Coding-Decoding Questions (L03)
async function getCodingDecodingQuestions(): Promise<Question[]> {
  return [
    {
      question: "If COMPUTER is coded as RFUVQNPC, how is PRINTER coded?",
      options: ["QSJOUFQ", "SFUOJSQ", "QSJOUFS", "None of these"],
      correctAnswer: 2,
      explanation: "Each letter is shifted one position forward in the alphabet"
    },
    {
      question: "In a code, 'TIGER' is written as '51937' and 'LION' is written as '4162'. How will 'LEG' be written?",
      options: ["439", "493", "539", "593"],
      correctAnswer: 0,
      explanation: "Each letter is assigned a number: L=4, E=3, G=9"
    },
    {
      question: "If 'FACE' is coded as 'ECAF', how is 'BOOK' coded?",
      options: ["KOOB", "OKOB", "BOKO", "OBOK"],
      correctAnswer: 0,
      explanation: "The word is written in reverse order"
    },
    {
      question: "If RED is coded as 345 and BLUE is coded as 1234, how will GREEN be coded?",
      options: ["54332", "53442", "54334", "53432"],
      correctAnswer: 0,
      explanation: "Each letter is assigned a unique number based on position"
    },
    {
      question: "If HELP is coded as 8427 and WORK is coded as 5639, what is WALK?",
      options: ["5149", "5429", "5247", "5129"],
      correctAnswer: 0,
      explanation: "Letters are coded according to their position pattern"
    },
    {
      question: "In a certain code, GARDEN is written as LCXJKT. How will FOREST be written?",
      options: ["LUXKYZ", "LUXKYY", "LUZKYZ", "LYXKYZ"],
      correctAnswer: 0,
      explanation: "Each letter is shifted by a fixed pattern"
    },
    {
      question: "If '247' means 'good sweet fruit' and '256' means 'sweet yellow fruit', what is the code for 'good'?",
      options: ["2", "4", "7", "5"],
      correctAnswer: 0,
      explanation: "By comparing both codes, '2' represents 'good'"
    },
    {
      question: "If MOUSE is coded as 32901, how is HOUSE coded?",
      options: ["72901", "82901", "92901", "62901"],
      correctAnswer: 0,
      explanation: "Only the first letter changes based on alphabetical position"
    },
    {
      question: "If PAINT becomes RCKPV, what will MOHAN become?",
      options: ["OQJCP", "OQJPC", "QOJCP", "QOJPC"],
      correctAnswer: 0,
      explanation: "Each letter follows a specific shift pattern"
    },
    {
      question: "In a code, '526' means 'sky is blue' and '678' means 'blue is beautiful'. What is the code for 'is'?",
      options: ["2", "6", "8", "5"],
      correctAnswer: 1,
      explanation: "By comparing codes, '6' appears in both phrases representing 'is'"
    },
    {
      question: "If 'TEACHER' is coded as 'VGCEJGT', then 'STUDENT' will be coded as:",
      options: ["UVWFGPV", "UVWFGVP", "UVWFPGV", "UVWFVPG"],
      correctAnswer: 0,
      explanation: "Each letter is shifted two positions forward"
    },
    {
      question: "If LONDON is coded as 12-15-14-4-15-14, how is PARIS coded?",
      options: ["16-1-18-9-19", "17-2-19-10-20", "15-0-17-8-18", "16-2-18-9-18"],
      correctAnswer: 0,
      explanation: "Each letter is converted to its position in alphabet"
    },
    // ... (Add 88 more similar questions with different patterns...)

  ];
}

// Number Series Questions (L04)
async function getNumberSeriesQuestions(): Promise<Question[]> {
  return [
    {
      question: "What comes next in the series: 2, 4, 8, 16, 32, __?",
      options: ["64", "48", "56", "40"],
      correctAnswer: 0,
      explanation: "Each number is multiplied by 2 (2×2=4, 4×2=8, etc.)"
    },
    {
      question: "Complete the series: 3, 6, 11, 18, 27, __?",
      options: ["38", "36", "40", "42"],
      correctAnswer: 0,
      explanation: "Add consecutive numbers starting from 3 (3+3=6, 6+5=11, 11+7=18, etc.)"
    },
    {
      question: "Find the next number: 1, 4, 9, 16, 25, __?",
      options: ["36", "49", "64", "81"],
      correctAnswer: 0,
      explanation: "Square numbers sequence (1=1², 4=2², 9=3², 16=4², 25=5², 36=6²)"
    },
    {
      question: "What comes next: 1, 3, 6, 10, 15, __?",
      options: ["21", "18", "20", "25"],
      correctAnswer: 0,
      explanation: "Add increasing numbers (+2, +3, +4, +5, +6)"
    },
    {
      question: "Complete: 2, 6, 12, 20, 30, __?",
      options: ["42", "40", "44", "46"],
      correctAnswer: 0,
      explanation: "Add increasing even numbers (+4, +6, +8, +10, +12)"
    },
    {
      question: "Next number: 5, 10, 20, 40, 80, __?",
      options: ["160", "120", "140", "100"],
      correctAnswer: 0,
      explanation: "Multiply by 2 each time"
    },
    {
      question: "Series: 3, 8, 15, 24, 35, __?",
      options: ["48", "46", "50", "44"],
      correctAnswer: 0,
      explanation: "Add increasing odd numbers (+5, +7, +9, +11, +13)"
    },
    {
      question: "Next: 1, 1, 2, 3, 5, 8, __?",
      options: ["13", "11", "14", "15"],
      correctAnswer: 0,
      explanation: "Fibonacci sequence (each number is sum of previous two)"
    },
    {
      question: "Complete: 7, 14, 28, 56, 112, __?",
      options: ["224", "200", "196", "220"],
      correctAnswer: 0,
      explanation: "Multiply by 2 each time"
    },
    {
      question: "Find next: 2, 5, 10, 17, 26, __?",
      options: ["37", "35", "39", "41"],
      correctAnswer: 0,
      explanation: "Add increasing numbers (+3, +5, +7, +9, +11)"
    },
    {
      question: "What's next: 1, 8, 27, 64, __?",
      options: ["125", "100", "150", "200"],
      correctAnswer: 0,
      explanation: "Cube numbers sequence (1=1³, 8=2³, 27=3³, 64=4³, 125=5³)"
    },
    {
      question: "Series: 4, 6, 9, 13, 18, __?",
      options: ["24", "23", "25", "22"],
      correctAnswer: 0,
      explanation: "Add increasing numbers (+2, +3, +4, +5, +6)"
    },
    {
      question: "Complete: 3, 7, 15, 31, __?",
      options: ["63", "59", "61", "65"],
      correctAnswer: 0,
      explanation: "Multiply by 2 and add 1 each time (3×2+1=7, 7×2+1=15, etc.)"
    },
    {
      question: "Next in series: 2, 6, 18, 54, __?",
      options: ["162", "108", "144", "216"],
      correctAnswer: 0,
      explanation: "Multiply by 3 each time"
    },
    // ... (Add 86 more questions here with similar patterns but different numbers and complexity...)

  ];
}

// Analogy Questions (L05)
async function getAnalogyQuestions(): Promise<Question[]> {
  return [
    {
      question: "Book is to Reading as Food is to:",
      options: ["Eating", "Cooking", "Tasting", "Serving"],
      correctAnswer: 0,
      explanation: "As Book is used for Reading, Food is used for Eating"
    },
    {
      question: "Bird is to Sky as Fish is to:",
      options: ["Water", "Ocean", "Sea", "River"],
      correctAnswer: 0,
      explanation: "As Birds live in Sky, Fish live in Water"
    },
    {
      question: "Doctor is to Patient as Teacher is to:",
      options: ["Student", "Class", "School", "Book"],
      correctAnswer: 0,
      explanation: "As Doctor treats Patient, Teacher teaches Student"
    },
    {
      question: "Clock is to Time as Thermometer is to:",
      options: ["Temperature", "Heat", "Weather", "Mercury"],
      correctAnswer: 0,
      explanation: "As Clock measures Time, Thermometer measures Temperature"
    },
    {
      question: "Pencil is to Write as Scissors is to:",
      options: ["Cut", "Sharp", "Paper", "Tool"],
      correctAnswer: 0,
      explanation: "As Pencil is used to Write, Scissors are used to Cut"
    },
    {
      question: "Tree is to Forest as Brick is to:",
      options: ["Building", "Wall", "House", "Construction"],
      correctAnswer: 0,
      explanation: "As Tree is part of Forest, Brick is part of Building"
    },
    {
      question: "Painter is to Brush as Writer is to:",
      options: ["Pen", "Paper", "Book", "Story"],
      correctAnswer: 0,
      explanation: "As Painter uses Brush, Writer uses Pen"
    },
    {
      question: "Car is to Garage as Ship is to:",
      options: ["Harbor", "Ocean", "Dock", "Sea"],
      correctAnswer: 0,
      explanation: "As Car is kept in Garage, Ship is kept in Harbor"
    },
    {
      question: "Light is to Dark as Day is to:",
      options: ["Night", "Evening", "Dusk", "Sunset"],
      correctAnswer: 0,
      explanation: "As Light is opposite to Dark, Day is opposite to Night"
    },
    {
      question: "Triangle is to Three as Square is to:",
      options: ["Four", "Box", "Rectangle", "Shape"],
      correctAnswer: 0,
      explanation: "As Triangle has Three sides, Square has Four sides"
    },
    {
      question: "Water is to Thirst as Food is to:",
      options: ["Hunger", "Eat", "Cook", "Meal"],
      correctAnswer: 0,
      explanation: "As Water satisfies Thirst, Food satisfies Hunger"
    },
    {
      question: "Shoe is to Foot as Hat is to:",
      options: ["Head", "Hair", "Cap", "Cover"],
      correctAnswer: 0,
      explanation: "As Shoe protects Foot, Hat protects Head"
    },
    {
      question: "Piano is to Musician as Brush is to:",
      options: ["Artist", "Paint", "Canvas", "Color"],
      correctAnswer: 0,
      explanation: "As Piano is used by Musician, Brush is used by Artist"
    },
    {
      question: "Bee is to Honey as Cow is to:",
      options: ["Milk", "Grass", "Farm", "Cattle"],
      correctAnswer: 0,
      explanation: "As Bee produces Honey, Cow produces Milk"
    },
    // ... (Add 86 more analogy questions with increasing complexity...)

  ];
}

// Synonyms Questions (L06)
async function getSynonymQuestions(): Promise<Question[]> {
  return [
    {
      question: "Select the word most similar in meaning to 'Benevolent':",
      options: ["Kind", "Cruel", "Strict", "Harsh"],
      correctAnswer: 0,
      explanation: "Benevolent means kind or generous in nature"
    },
    {
      question: "Choose the synonym for 'Eloquent':",
      options: ["Articulate", "Silent", "Quiet", "Reserved"],
      correctAnswer: 0,
      explanation: "Eloquent means fluent or persuasive in speaking"
    },
    {
      question: "Which word means the same as 'Diligent'?",
      options: ["Hardworking", "Lazy", "Careless", "Idle"],
      correctAnswer: 0,
      explanation: "Diligent means showing persistent effort and care"
    },
    {
      question: "Find the synonym of 'Abundant':",
      options: ["Plentiful", "Scarce", "Limited", "Rare"],
      correctAnswer: 0,
      explanation: "Abundant means existing in large quantities"
    },
    {
      question: "Which word is closest in meaning to 'Courageous'?",
      options: ["Brave", "Fearful", "Timid", "Weak"],
      correctAnswer: 0,
      explanation: "Courageous means showing bravery"
    },
    {
      question: "Select the synonym for 'Magnificent':",
      options: ["Splendid", "Ordinary", "Plain", "Simple"],
      correctAnswer: 0,
      explanation: "Magnificent means impressive or beautiful"
    },
    {
      question: "Which word means the same as 'Prudent'?",
      options: ["Wise", "Foolish", "Reckless", "Hasty"],
      correctAnswer: 0,
      explanation: "Prudent means acting with care and thought"
    },
    {
      question: "Find the synonym of 'Authentic':",
      options: ["Genuine", "Fake", "False", "Artificial"],
      correctAnswer: 0,
      explanation: "Authentic means genuine or real"
    },
    {
      question: "Select the word most similar to 'Tranquil':",
      options: ["Peaceful", "Agitated", "Disturbed", "Chaotic"],
      correctAnswer: 0,
      explanation: "Tranquil means calm and peaceful"
    },
    {
      question: "Choose the synonym for 'Jubilant':",
      options: ["Joyful", "Sad", "Gloomy", "Depressed"],
      correctAnswer: 0,
      explanation: "Jubilant means feeling or expressing great happiness"
    },
    // ... (Add 90 more synonym questions here...)

  ];
}

// Antonyms Questions (L07)
async function getAntonymQuestions(): Promise<Question[]> {
  return [
    {
      question: "Choose the word most opposite in meaning to 'Ancient':",
      options: ["Modern", "Old", "Archaic", "Traditional"],
      correctAnswer: 0,
      explanation: "Ancient means very old, so its opposite is Modern"
    },
    {
      question: "Select the antonym for 'Brave':",
      options: ["Cowardly", "Bold", "Daring", "Heroic"],
      correctAnswer: 0,
      explanation: "Brave means courageous, its opposite is Cowardly"
    },
    {
      question: "Find the opposite of 'Generous':",
      options: ["Stingy", "Kind", "Giving", "Charitable"],
      correctAnswer: 0,
      explanation: "Generous means giving freely, its opposite is Stingy"
    },
    {
      question: "Which word is the antonym of 'Victory'?",
      options: ["Defeat", "Success", "Triumph", "Achievement"],
      correctAnswer: 0,
      explanation: "Victory means winning, its opposite is Defeat"
    },
    {
      question: "Select the word opposite to 'Transparent':",
      options: ["Opaque", "Clear", "Visible", "Obvious"],
      correctAnswer: 0,
      explanation: "Transparent means clear, its opposite is Opaque"
    },
    {
      question: "Choose the antonym for 'Temporary':",
      options: ["Permanent", "Brief", "Short", "Fleeting"],
      correctAnswer: 0,
      explanation: "Temporary means lasting for a short time, its opposite is Permanent"
    },
    {
      question: "Find the opposite of 'Abundant':",
      options: ["Scarce", "Plenty", "Much", "Numerous"],
      correctAnswer: 0,
      explanation: "Abundant means plentiful, its opposite is Scarce"
    },
    {
      question: "Which word is the antonym of 'Artificial'?",
      options: ["Natural", "Synthetic", "Fake", "Man-made"],
      correctAnswer: 0,
      explanation: "Artificial means made by humans, its opposite is Natural"
    },
    {
      question: "Select the word opposite to 'Dangerous':",
      options: ["Safe", "Risky", "Hazardous", "Perilous"],
      correctAnswer: 0,
      explanation: "Dangerous means unsafe, its opposite is Safe"
    },
    {
      question: "Choose the antonym for 'Maximum':",
      options: ["Minimum", "Highest", "Greatest", "Most"],
      correctAnswer: 0,
      explanation: "Maximum means the highest amount, its opposite is Minimum"
    },
    // Add 90 more antonym questions with increasing complexity...
    {
      question: "Find the opposite of 'Zealous':",
      options: ["Apathetic", "Eager", "Passionate", "Enthusiastic"],
      correctAnswer: 0,
      explanation: "Zealous means showing great enthusiasm, its opposite is Apathetic"
    }
  ];
}

// Sentence Completion Questions (L08)
async function getSentenceCompletionQuestions(): Promise<Question[]> {
  return [
    {
      question: "Despite the heavy rain, the team decided to _____ with the outdoor practice session.",
      options: ["proceed", "cancel", "postpone", "delay"],
      correctAnswer: 0,
      explanation: "Context suggests determination to continue despite obstacles"
    },
    {
      question: "The scientist's new theory was so _____ that even experts in the field had difficulty understanding it.",
      options: ["complex", "simple", "obvious", "clear"],
      correctAnswer: 0,
      explanation: "Context suggests the theory was difficult to understand"
    },
    {
      question: "The mountain climbers were _____ by the sudden snowstorm and had to return to base camp.",
      options: ["forced", "encouraged", "motivated", "inspired"],
      correctAnswer: 0,
      explanation: "Context indicates they had to stop due to weather"
    },
    {
      question: "The old manuscript was so _____ that historians could barely read its contents.",
      options: ["faded", "bright", "colorful", "fresh"],
      correctAnswer: 0,
      explanation: "Context suggests difficulty in reading due to age"
    },
    {
      question: "The company's new policies were designed to _____ employee productivity and job satisfaction.",
      options: ["enhance", "reduce", "limit", "restrict"],
      correctAnswer: 0,
      explanation: "Context implies positive improvement"
    },
    {
      question: "After hours of negotiation, the two parties finally reached a _____ agreement.",
      options: ["mutual", "disputed", "conflicting", "divided"],
      correctAnswer: 0,
      explanation: "Context indicates both parties came to terms"
    },
    {
      question: "The music was so _____ that everyone at the concert was dancing.",
      options: ["infectious", "boring", "dull", "monotonous"],
      correctAnswer: 0,
      explanation: "Context shows the music had a positive effect on people"
    },
    {
      question: "The detective's investigation was _____ by the lack of physical evidence.",
      options: ["hampered", "helped", "assisted", "supported"],
      correctAnswer: 0,
      explanation: "Context suggests difficulty due to missing evidence"
    },
    {
      question: "The new restaurant's cuisine was so _____ that it quickly became popular in the neighborhood.",
      options: ["delicious", "tasteless", "bland", "ordinary"],
      correctAnswer: 0,
      explanation: "Context indicates positive reception"
    },
    {
      question: "The students were _____ tolearn that their favorite teacher was retiring.",
      options: ["saddened", "delighted", "excited","pleased"],
      correctAnswer: 0,
      explanation: "Context suggests emotional loss"
    },
    // Add 90 more sentence completion questions...
    {
      question: "The archaeologist's discovery was _____ as it provided new insights into ancient civilizations.",
      options: ["groundbreaking", "ordinary", "common", "typical"],
      correctAnswer: 0,
      explanation: "Context suggests a significant discovery"
    }
  ];
}

// Reading Comprehension Questions (L09)
async function getReadingComprehensionQuestions(): Promise<Question[]> {
  return [
    {
      question: `Read the following passage:
Plants are essential for life on Earth as they produce oxygen through photosynthesis. During this process, they use sunlight, water, and carbon dioxide to produce glucose and oxygen. The oxygen is released into the atmosphere, while the glucose is used by the plant for energy. This process is crucial for maintaining the Earth's atmosphere and providing food for other organisms.

What do plants produce through photosynthesis?`,
      options: [
        "Glucose and oxygen",
        "Carbon dioxide and water",
        "Sunlight and oxygen",
        "Water and glucose"
      ],
      correctAnswer: 0,
      explanation: "The passage clearly states that plants produce glucose and oxygen through photosynthesis"
    },
    {
      question: `Read the passage:
The Industrial Revolution was a period of major industrialization and innovation during the late 18th and early 19th centuries. The Industrial Revolution began in Great Britain and quickly spread throughout Western Europe and North America. This period saw the mechanization of agriculture and textile manufacturing and a revolution in power, including steam ships and railroads.

When did the Industrial Revolution begin?`,
      options: [
        "Late 18th and early 19th centuries",
        "Early 17th century",
        "Mid 19th century",
        "20th century"
      ],
      correctAnswer: 0,
      explanation: "The passage states that the Industrial Revolution occurred during the late 18th and early 19th centuries"
    },
    // Add more reading comprehension questions with varied passages and multiple questions per passage...
    // Each passage should have 3-4 questions to test different aspects of comprehension
    // Continue until reaching approximately 100 questions total
  ];
}

// Verbal Reasoning Questions (L10)
async function getVerbalReasoningQuestions(): Promise<Question[]> {
  return [
    {
      question: "If all cats are animals, and some animals are pets, which statement is definitely true?",
      options: [
        "Some cats may be pets",
        "All cats are pets",
        "No cats are pets",
        "All pets are cats"
      ],
      correctAnswer: 0,
      explanation: "Since all cats are animals and some animals are pets, it follows that some cats may be pets"
    },
    {
      question: "If no heroes are cowards, and John is a hero, what can we conclude?",
      options: [
        "John is not a coward",
        "John is brave",
        "All heroes are brave",
        "Cowards can't be heroes"
      ],
      correctAnswer: 0,
      explanation: "Given that no heroes are cowards and John is a hero, we can definitively conclude that John is not a coward"
    },
    // Add more verbal reasoning questions testing logical deduction, syllogisms, and critical thinking...
    // Continue until reaching approximately 100 questions
  ];
}

// Word Order Questions (L11)
async function getWordOrderQuestions(): Promise<Question[]> {
  return [
    {
      question: "Arrange the words in a meaningful sequence: 1. Water 2. Crop 3. Seed 4. Plant 5. Harvest",
      options: ["3,4,1,2,5", "3,1,4,2,5", "2,3,4,1,5", "4,3,1,2,5"],
      correctAnswer: 1,
      explanation: "Logical sequence: Seed → Water → Plant → Crop → Harvest"
    },
    {
      question: "Arrange in order: 1. Infant 2. Adult 3. Child 4. Teenager",
      options: ["1,3,4,2", "1,2,3,4", "1,4,3,2", "2,1,3,4"],
      correctAnswer: 0,
      explanation: "Life stages sequence: Infant → Child → Teenager → Adult"
    },
    // Add more word order questions with different contexts and complexities...
    // Continue until reaching approximately 100 questions
  ];
}

// Logical Sequence Questions (L12)
async function getLogicalSequenceQuestions(): Promise<Question[]> {
  return [
    {
      question: "Complete the sequence: XY15, WX13, UV11, ?",
      options: ["ST9", "TS9", "ST8", "TS10"],
      correctAnswer: 0,
      explanation: "Pattern: Letters shift 2 positions back, numbers decrease by 2"
    },
    {
      question: "Next in the series: 1, 4, 9, 16, ?",
      options: ["25", "20", "22", "28"],
      correctAnswer: 0,
      explanation: "Squares: 1², 2², 3², 4², 5²"
    },
    // Add more logical sequence questions with various patterns...
    // Continue until reaching approximately 100 questions
  ];
}

// Single export statement at the bottom
export {
  getDirectionSenseQuestions,
  getBloodRelationQuestions,
  getCodingDecodingQuestions,
  getNumberSeriesQuestions,
  getAnalogyQuestions,
  getSynonymQuestions,
  getAntonymQuestions,
  getSentenceCompletionQuestions,
  getReadingComprehensionQuestions,
  getVerbalReasoningQuestions,
  getWordOrderQuestions,
  getLogicalSequenceQuestions
};