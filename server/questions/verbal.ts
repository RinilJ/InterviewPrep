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
  ];
}

// Synonyms Questions (L06)
async function getSynonymQuestions(): Promise<Question[]> {
  return [
    {
      question: "Select the word most similar in meaning to 'Benevolent':",
      options: ["Harsh", "Kind", "Cruel", "Strict"],
      correctAnswer: 1,
      explanation: "Benevolent means kind or generous in nature"
    },
    {
      question: "Choose the synonym for 'Eloquent':",
      options: ["Silent", "Reserved", "Articulate", "Quiet"],
      correctAnswer: 2,
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
      question: "The students were _____ to learn that their favorite teacher was retiring.",
      options: ["saddened", "delighted", "excited", "pleased"],
      correctAnswer: 0,
      explanation: "Context suggests emotional loss"
    },
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
  return [// Science Passage
    {
      question: `Read thefollowing passage:
The process ofphotosynthesis is crucial for life on Earth. Plants use sunlight, water,and carbon dioxide to produce glucose and oxygen. The sunlight is absorbed by chlorophyll in the leaves, which converts light energy into chemical energy. This energy is used to split water molecules and combine them with carbon dioxide to form glucose. Oxygen is released as a byproduct of this process. The glucose can either be used immediately by the plant for energy or stored as starch for later use.

Questions based on this passage:`,
      options: [
        "Continue reading for questions",
        "",
        "",
        ""
      ],
      correctAnswer: 0,
      explanation: "This is the passage introduction"
    },
    {
      question: "What is the primary function of chlorophyll in photosynthesis?",
      options: [
        "To absorb sunlight and convert it to chemical energy",
        "To split water molecules",
        "To produce oxygen",
        "To store glucose"
      ],
      correctAnswer: 0,
      explanation: "The passage states that chlorophyll absorbs sunlight and converts light energy into chemical energy"
    },
    {
      question: `Based on the same passage about photosynthesis:
What are the three main ingredients needed for photosynthesis?`,
      options: [
        "Sunlight, water, and carbon dioxide",
        "Oxygen, glucose, and water",
        "Carbon dioxide, oxygen, and sunlight",
        "Water, glucose, and chlorophyll"
      ],
      correctAnswer: 0,
      explanation: "The passage clearly states that plants use sunlight, water, and carbon dioxide for photosynthesis"
    },
    {
      question: `Based on the same passage about photosynthesis:
What happens to the glucose produced during photosynthesis?`,
      options: [
        "It can be used immediately or stored as starch",
        "It is always converted to oxygen",
        "It is only used for immediate energy",
        "It is always stored as starch"
      ],
      correctAnswer: 0,
      explanation: "The passage mentions that glucose can either be used immediately for energy or stored as starch"
    },
    // Historical Passage
    {
      question: `Read the following passage:
The Industrial Revolution, which began in the late 18th century in Great Britain, marked a major turning point in human history. This period saw the transition from manual production methods to machine manufacturing processes. The development of steam power and the increased use of coal were crucial drivers of this change. Factories emerged, leading to urbanization as people moved from rural areas to cities in search of work. This transformation had profound social, economic, and environmental impacts that continue to influence our world today.

Questions based on this passage:`,
      options: [
        "Continue reading for questions",
        "",
        "",
        ""
      ],
      correctAnswer: 0,
      explanation: "This is the passage introduction"
    },
    {
      question: "When did the Industrial Revolution begin?",
      options: [
        "Late 18th century",
        "Early 18th century",
        "Mid 19th century",
        "Early 19th century"
      ],
      correctAnswer: 0,
      explanation: "The passage explicitly states that the Industrial Revolution began in the late 18th century"
    },
    {
      question: `Based on the same passage about the Industrial Revolution:
What was a key factor in driving the Industrial Revolution?`,
      options: [
        "Development of steam power and increased coal use",
        "Increased rural population",
        "Decrease in factory production",
        "Reduction in urban areas"
      ],
      correctAnswer: 0,
      explanation: "The passage mentions that steam power and increased coal use were crucial drivers of change"
    },
    {
      question: `Based on the same passage about the Industrial Revolution:
What social change occurred during this period?`,
      options: [
        "People moved from rural areas to cities",
        "People moved from cities to rural areas",
        "Factory production decreased",
        "Steam power became less important"
      ],
      correctAnswer: 0,
      explanation: "The passage states that urbanization occurred as people moved from rural areas to cities for work"
    },
    // Environmental Passage
    {
      question: `Read the following passage:
Climate change is causing significant alterations to Earth's ecosystems. Rising global temperatures are leading to melting polar ice caps and rising sea levels. This affects not only coastal communities but also wildlife habitats and migration patterns. Extreme weather events, such as hurricanes and droughts, are becoming more frequent and intense. Scientists warn that without significant reduction in greenhouse gas emissions, these changes will accelerate in the coming decades.

Questions based on this passage:`,
      options: [
        "Continue reading for questions",
        "",
        "",
        ""
      ],
      correctAnswer: 0,
      explanation: "This is the passage introduction"
    },
    {
      question: "What is the primary effect of rising global temperatures mentioned in the passage?",
      options: [
        "Melting polar ice caps and rising sea levels",
        "Changes in wildlife migration",
        "Increase in greenhouse gases",
        "More frequent hurricanes"
      ],
      correctAnswer: 0,
      explanation: "The passage directly states that rising temperatures are leading to melting polar ice caps and rising sea levels"
    },
    {
      question: `Based on the same passage about climate change:
According to the passage, what is happening to extreme weather events?`,
      options: [
        "They are becoming more frequent and intense",
        "They are decreasing in frequency",
        "They remain unchanged",
        "They only affect coastal areas"
      ],
      correctAnswer: 0,
      explanation: "The passage states that extreme weather events are becoming more frequent and intense"
    },
    {
      question: `Based on the same passage about climate change:
What do scientists suggest is necessary to prevent acceleration of these changes?`,
      options: [
        "Significant reduction in greenhouse gas emissions",
        "Increased polar ice cap formation",
        "More coastal community development",
        "Changes in wildlife migration patterns"
      ],
      correctAnswer: 0,
      explanation: "Scientists warn that reducing greenhouse gas emissions is necessary to prevent acceleration of changes"
    },
    // Technology Passage
    {
      question: `Read the following passage:
Artificial Intelligence (AI) is revolutionizing various sectors of society. Machine learning algorithms can now process vast amounts of data to identify patterns and make predictions. In healthcare, AI assists in disease diagnosis and drug development. In transportation, it enables the development of self-driving vehicles. However, the increasing reliance on AI also raises concerns about privacy, job displacement, and ethical decision-making.

Questions based on this passage:`,
      options: [
        "Continue reading for questions",
        "",
        "",
        ""
      ],
      correctAnswer: 0,
      explanation: "This is the passage introduction"
    },
    {
      question: "What is the main capability of machine learning algorithms mentioned in the passage?",
      options: [
        "Processing data to identify patterns and make predictions",
        "Creating self-driving vehicles",
        "Developing new drugs",
        "Making ethical decisions"
      ],
      correctAnswer: 0,
      explanation: "The passage states that machine learning algorithms can process vast amounts of data to identify patterns and make predictions"
    },
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
    {
      question: "All flowers are plants. Some plants need sunlight. Which conclusion is valid?",
      options: [
        "Some flowers may need sunlight",
        "All flowers need sunlight",
        "No flowers need sunlight",
        "Plants are flowers"
      ],
      correctAnswer: 0,
      explanation: "Since all flowers are plants and some plants need sunlight, some flowers may need sunlight"
    },
    {
      question: "If all doctors are graduates, and Sarah is a doctor, what must be true?",
      options: [
        "Sarah is a graduate",
        "Sarah is intelligent",
        "Sarah likes studying",
        "Sarah teaches others"
      ],
      correctAnswer: 0,
      explanation: "Given all doctors are graduates and Sarah is a doctor, Sarah must be a graduate"
    },
    {
      question: "No fish can fly. A tuna is a fish. Therefore:",
      options: [
        "A tuna cannot fly",
        "Some fish can fly",
        "Flying fish can fly",
        "Birds can swim"
      ],
      correctAnswer: 0,
      explanation: "Since no fish can fly and a tuna is a fish, a tuna cannot fly"
    },
    {
      question: "All students in the class speak English. John is in the class. What can we conclude?",
      options: [
        "John speaks English",
        "John only speaks English",
        "John teaches English",
        "The class only has English speakers"
      ],
      correctAnswer: 0,
      explanation: "Given all students in the class speak English and John is in the class, John must speak English"
    },
    {
      question: "Some birds can swim. All penguins are birds. Which statement is possible?",
      options: [
        "Some penguins can swim",
        "No penguins can swim",
        "All birds can swim",
        "Penguins can fly"
      ],
      correctAnswer: 0,
      explanation: "Since some birds can swim and all penguins are birds, it's possible that some penguins can swim"
    },
    {
      question: "All metals conduct electricity. Gold is a metal. Therefore:",
      options: [
        "Gold conducts electricity",
        "Only gold conducts electricity",
        "Electricity is metal",
        "Metals are gold"
      ],
      correctAnswer: 0,
      explanation: "Since all metals conduct electricity and gold is a metal, gold must conduct electricity"
    },
    {
      question: "If all squares are rectangles, and all rectangles have four sides, what must be true about squares?",
      options: [
        "Squares have four sides",
        "All rectangles are squares",
        "Squares are circles",
        "Rectangles are triangles"
      ],
      correctAnswer: 0,
      explanation: "Since all squares are rectangles and all rectangles have four sides, squares must have four sides"
    },
    {
      question: "No mammals can breathe underwater. Dolphins are mammals. What can we conclude?",
      options: [
        "Dolphins cannot breathe underwater",
        "Dolphins can swim",
        "Dolphins are fish",
        "Mammals live on land"
      ],
      correctAnswer: 0,
      explanation: "Given no mammals can breathe underwater and dolphins are mammals, dolphins cannot breathe underwater"
    },
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
    {
      question: "Order these words: 1. Mix 2. Pour 3. Drink 4. Fill 5. Stir",
      options: ["4,2,1,5,3", "2,4,1,3,5", "4,1,5,2,3", "1,2,3,4,5"],
      correctAnswer: 0,
      explanation: "Logical sequence: Fill → Pour → Mix → Stir → Drink"
    },
    {
      question: "Arrange in cooking order: 1. Serve 2. Cook 3. Prepare 4. Buy 5. Eat",
      options: ["4,3,2,1,5", "3,4,2,1,5", "4,2,3,1,5", "1,2,3,4,5"],
      correctAnswer: 0,
      explanation: "Logical sequence: Buy → Prepare → Cook → Serve → Eat"
    },
    {
      question: "Order these actions: 1. Win 2. Practice 3. Learn 4. Master 5. Start",
      options: ["5,3,2,4,1", "3,2,1,4,5", "5,2,3,1,4", "1,2,3,4,5"],
      correctAnswer: 0,
      explanation: "Logical sequence: Start → Learn → Practice → Master → Win"
    },
    {
      question: "Arrange in time sequence: 1. Night 2. Evening 3. Morning 4. Afternoon",
      options: ["3,4,2,1", "1,2,3,4", "2,3,4,1", "4,3,2,1"],
      correctAnswer: 0,
      explanation: "Time sequence: Morning → Afternoon → Evening → Night"
    },
    {
      question: "Order the education stages: 1. College 2. School 3. Kindergarten 4. University",
      options: ["3,2,1,4", "2,3,1,4", "3,1,2,4", "4,3,2,1"],
      correctAnswer: 0,
      explanation: "Education sequence: Kindergarten → School → College → University"
    },
    {
      question: "Arrange the process: 1. Results 2. Experiment 3. Hypothesis 4. Research 5. Conclusion",
      options: ["4,3,2,1,5", "3,4,2,1,5", "4,2,3,1,5", "1,2,3,4,5"],
      correctAnswer: 0,
      explanation: "Scientific method: Research → Hypothesis → Experiment → Results → Conclusion"
    },
    {
      question: "Order these events: 1. Graduate 2. Study 3. Enroll 4. Apply 5. Celebrate",
      options: ["4,3,2,1,5", "3,2,4,1,5", "4,2,3,1,5", "1,2,3,4,5"],
      correctAnswer: 0,
      explanation: "Logical sequence: Apply → Enroll → Study → Graduate → Celebrate"
    },
    {
      question: "Arrange in building order: 1. Paint 2. Plan 3. Foundation 4. Walls 5. Roof",
      options: ["2,3,4,5,1", "3,2,4,1,5", "4,2,3,1,5", "1,2,3,4,5"],
      correctAnswer: 0,
      explanation: "Construction sequence: Plan → Foundation → Walls → Roof → Paint"
    },
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
    {
      question: "Complete: A2Z, B4Y, C6X, ?",
      options: ["D8W", "E8W", "D6W", "E6W"],
      correctAnswer: 0,
      explanation: "Pattern: Letters move forward from start and backward from end, numbers increase by 2"
    },
    {
      question: "What comes next: RED5, ORG4, YEL3, ?",
      options: ["GRN2", "BLU2", "GRN1", "BLU3"],
      correctAnswer: 0,
      explanation: "Pattern: Color abbreviations with decreasing numbers"
    },
    {
      question: "Next in sequence: 3Z, 6Y, 9X, ?",
      options: ["12W", "12X", "9W", "15W"],
      correctAnswer: 0,
      explanation: "Pattern: Numbers increase by 3, letters move backward"
    },
    {
      question: "Complete the pattern: AB12, CD34, EF56, ?",
      options: ["GH78", "GH87", "HG78", "GH67"],
      correctAnswer: 0,
      explanation: "Pattern: Letters continue alphabetically, numbers increase by 22"
    },
    {
      question: "Next term: 2P4, 4R8, 6T16, ?",
      options: ["8V32", "8U32", "6U32", "8V24"],
      correctAnswer: 0,
      explanation: "Pattern: Numbers: 2→4→6→8, Letters: P→R→T→V, Last number doubles"
    },
    {
      question: "Find next: M3N, N4P, O5R, ?",
      options: ["P6T", "P7T", "Q6T", "P6S"],
      correctAnswer: 0,
      explanation: "Pattern: First letter +1, number +1, last letter +2"
    },
    {
      question: "Complete: 1A3, 2B6, 3C9, ?",
      options: ["4D12", "4C12", "3D12", "4D9"],
      correctAnswer: 0,
      explanation: "Pattern: First number +1, letters alphabetical, last number +3"
    },
    {
      question: "Next in series: JAM2, KBN4, LCO6, ?",
      options: ["MDP8", "MCP8", "MDQ8", "MDP10"],
      correctAnswer: 0,
      explanation: "Pattern: First letter +1, second letter +1, third letter +1, number ×2"
    },
  ];
}

// Export all sections
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