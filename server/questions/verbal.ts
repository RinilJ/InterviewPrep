import { Question } from '../types';

// Direction Sense Questions (L01)
async function getDirectionSenseQuestions(): Promise<Question[]> {
  console.log('Loading Direction Sense questions...');
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
  console.log('Loading Blood Relation questions...');
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
  console.log('Loading Coding-Decoding questions...');
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
  console.log('Loading Number Series questions...');
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
  console.log('Loading Analogy questions...');
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
  console.log('Loading Synonym questions...');
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
  ];
}

// Antonyms Questions (L07)
async function getAntonymQuestions(): Promise<Question[]> {
  console.log('Loading Antonym questions...');
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
  console.log('Loading Sentence Completion questions...');
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
      explanation: "Contextsuggests a significant discovery"
    }
  ];
}

// Reading Comprehension Questions (L09)
async function getReadingComprehensionQuestions(): Promise<Question[]> {
  console.log('Loading Reading Comprehension questions...');
  return [
    // Science Passage
    {
      question: "Read the following passage:\nThe process of photosynthesis is crucial for life on Earth. Plants use sunlight, water, and carbon dioxide to produce glucose and oxygen. The sunlight is absorbed by chlorophyll in the leaves, which converts light energy into chemical energy. This energy is used to split water molecules and combine them with carbon dioxide to form glucose. Oxygen is released as a byproduct of this process. The glucose can either be used immediately by the plant for energy or stored as starch for later use.\n\nWhat is the primary function of chlorophyll in photosynthesis?",
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

When did the Industrial Revolution begin?`,
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

What is the primary effect of rising global temperatures mentioned in the passage?`,
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

What is the main capability of machine learning algorithms mentioned in the passage?`,
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
  console.log('Loading Verbal Reasoning questions...');
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
      question: "All scientists are researchers. Some researchers wear glasses. What can we conclude?",
      options: [
        "Some scientists may wear glasses",
        "All scientists wear glasses",
        "No scientists wear glasses",
        "Only scientists wear glasses"
      ],
      correctAnswer: 0,
      explanation: "Since all scientists are researchers and some researchers wear glasses, it's possible that some scientists wear glasses"
    },
    {
      question: "If all squares are rectangles, and all rectangles have four sides, what can we conclude about squares?",
      options: [
        "All squares have four sides",
        "Only squares have four sides",
        "Some squares have four sides",
        "Rectangles are squares"
      ],
      correctAnswer: 0,
      explanation: "Using transitive logic: if all squares are rectangles, and all rectangles have four sides, then all squares must have four sides"
    },
    {
      question: "No fruits are vegetables. All apples are fruits. Therefore:",
      options: [
        "No apples are vegetables",
        "Some apples are vegetables",
        "All vegetables are apples",
        "Some vegetables are apples"
      ],
      correctAnswer: 0,
      explanation: "Using syllogistic reasoning: if no fruits are vegetables and all apples are fruits, then no apples can be vegetables"
    },
    {
      question: "All doctors are graduates. Some graduates are unemployed. Which statement must be false?",
      options: [
        "All graduates are doctors",
        "Some doctors are unemployed",
        "Some graduates are employed",
        "Some doctors are employed"
      ],
      correctAnswer: 0,
      explanation: "The statement 'all graduates are doctors' must be false because we know some graduates are unemployed, and not all graduates are necessarily doctors"
    },
    {
      question: "If every student in the class speaks either French or Spanish, and no student speaks both languages, what can we conclude about a student who doesn't speak French?",
      options: [
        "They must speak Spanish",
        "They might speak Spanish",
        "They speak neither language",
        "They speak both languages"
      ],
      correctAnswer: 0,
      explanation: "Given that every student speaks exactly one of the two languages, if a student doesn't speak French, they must speak Spanish"
    },
    {
      question: "All mammals are warm-blooded. Whales are mammals. Therefore:",
      options: [
        "Whales are warm-blooded",
        "Some whales are warm-blooded",
        "Whales might be warm-blooded",
        "Most whales are warm-blooded"
      ],
      correctAnswer: 0,
      explanation: "Using syllogistic reasoning: if all mammals are warm-blooded and whales are mammals, then all whales must be warm-blooded"
    },
    {
      question: "If no successful people are lazy, and John is lazy, what can we conclude?",
      options: [
        "John is not successful",
        "John might be successful",
        "John is unsuccessful",
        "John works hard"
      ],
      correctAnswer: 0,
      explanation: "If no successful people are lazy and John is lazy, we can conclude that John is not successful"
    },
    {
      question: "Some artists are musicians. All musicians are creative. What can we conclude?",
      options: [
        "Some artists are creative",
        "All artists are creative",
        "No artists are creative",
        "Only artists are creative"
      ],
      correctAnswer: 0,
      explanation: "Since some artists are musicians and all musicians are creative, we can conclude that at least some artists are creative"
    },
    {
      question: "No birds are reptiles. All penguins are birds. Therefore:",
      options: [
        "No penguins are reptiles",
        "All penguins are reptiles",
        "Some penguins are reptiles",
        "Reptiles are birds"
      ],
      correctAnswer: 0,
      explanation: "Syllogistic reasoning: If no birds are reptiles and all penguins are birds, then no penguins are reptiles."
    },
    {
      question: "All squares are quadrilaterals. Some quadrilaterals are rhombuses.  What can we conclude?",
      options: [
        "Some squares may be rhombuses",
        "All squares are rhombuses",
        "No squares are rhombuses",
        "All rhombuses are squares"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some squares are also rhombuses, given the overlapping categories."
    },
    {
      question: "If all fish swim, and some animals swim, what can we definitely say?",
      options: [
        "Some animals are fish",
        "All animals are fish",
        "No animals are fish",
        "Some fish are animals"
      ],
      correctAnswer: 3,
      explanation: "The premise only establishes that swimming is a characteristic of both fish and some animals, not that there is any direct relationship between them."
    },
    {
      question: "All cats are mammals. Some mammals are herbivores. Therefore:",
      options: [
        "Some cats may be herbivores",
        "All cats are herbivores",
        "No cats are herbivores",
        "Some herbivores are cats"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some cats are herbivores, but not necessarily."
    },
    {
      question: "If no dogs are cats, and all poodles are dogs, which statement is true?",
      options: [
        "No poodles are cats",
        "All poodles are cats",
        "Some poodles are cats",
        "Cats are poodles"
      ],
      correctAnswer: 0,
      explanation: "Using syllogistic reasoning: If no dogs are cats and all poodles are dogs, then no poodles are cats."
    },
    {
      question: "All roses are flowers. Some flowers are red. Therefore:",
      options: [
        "Some roses are red",
        "All roses are red",
        "No roses are red",
        "All red things are roses"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some roses are red, but not guaranteed."
    },
    {
      question: "If every triangle has three sides, and this shape has three sides, what can we conclude?",
      options: [
        "This shape may be a triangle",
        "This shape is a triangle",
        "This shape is not a triangle",
        "Triangles have three sides"
      ],
      correctAnswer: 0,
      explanation: "The statement only gives a necessary condition, not a sufficient condition for being a triangle."
    },
    {
      question: "No planets are stars. Jupiter is a planet.  Therefore:",
      options: [
        "Jupiter is not a star",
        "Jupiter is a star",
        "Some planets are stars",
        "All stars are planets"
      ],
      correctAnswer: 0,
      explanation: "Syllogistic reasoning: If no planets are stars and Jupiter is a planet, then Jupiter is not a star."
    },
    {
      question: "All books are literature. Some literature is fiction. Which statement is definitely true?",
      options: [
        "Some books are fiction",
        "All books are fiction",
        "No books are fiction",
        "All fiction is literature"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some books are fiction, but not guaranteed."
    },
    {
      question: "If no birds are mammals, and all bats are mammals, which statement must be true?",
      options: [
        "No birds are bats",
        "All birds are bats",
        "Some birds are bats",
        "Some bats are birds"
      ],
      correctAnswer: 0,
      explanation: "Syllogistic reasoning: If no birds are mammals and all bats are mammals, then no birds are bats."
    },
    {
      question: "Some musicians are composers. All composers are creative. Therefore:",
      options: [
        "Some musicians are creative",
        "All musicians are creative",
        "No musicians are creative",
        "Only composers are creative"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some musicians are creative, but not guaranteed that all of them are."
    },
    {
      question: "If all cars have wheels, and this vehicle has wheels, what can we say?",
      options: [
        "This vehicle might be a car",
        "This vehicle is a car",
        "This vehicle is not a car",
        "All vehicles have wheels"
      ],
      correctAnswer: 0,
      explanation: "The statement only gives a necessary condition, not a sufficient condition for being a car."
    },
    {
      question: "All apples are fruits. Some fruits are sweet. Therefore:",
      options: [
        "Some apples are sweet",
        "All apples are sweet",
        "No apples are sweet",
        "All sweet things are apples"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some apples are sweet, but not guaranteed."
    },
    {
      question: "If no squares are circles, and all rhombuses are squares, what can we conclude?",
      options: [
        "No rhombuses are circles",
        "All rhombuses are circles",
        "Some rhombuses are circles",
        "Circles are rhombuses"
      ],
      correctAnswer: 0,
      explanation: "Syllogistic reasoning: If no squares are circles and all rhombuses are squares, then no rhombuses are circles."
    },
    {
      question: "All dogs are canines. Some canines are wolves. Therefore:",
      options: [
        "Some dogs may be wolves",
        "All dogs are wolves",
        "No dogs are wolves",
        "Some wolves are dogs"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some dogs are wolves, but not guaranteed."
    },
    {
      question: "If every even number is divisible by 2, and 14 is an even number, what can we conclude?",
      options: [
        "14 is divisible by 2",
        "14 is not divisible by 2",
        "Some even numbers are not divisible by 2",
        "14 is an odd number"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If every even number is divisible by 2 and 14 is an even number, then 14 is divisible by 2."
    },
    {
      question: "All bicycles have two wheels. This vehicle has two wheels. Therefore:",
      options: [
        "This vehicle may be a bicycle",
        "This vehicle is a bicycle",
        "This vehicle is not a bicycle",
        "All two-wheeled vehicles are bicycles"
      ],
      correctAnswer: 0,
      explanation: "Having two wheels is a necessary, but not sufficient condition to be a bicycle."
    },
    {
      question: "If no fish are mammals, and dolphins are mammals, what can we conclude?",
      options: [
        "Dolphins are not fish",
        "Dolphins are fish",
        "Some fish are mammals",
        "Some dolphins are fish"
      ],
      correctAnswer: 0,
      explanation: "Syllogistic reasoning: If no fish are mammals and dolphins are mammals, then dolphins are not fish."
    },
    {
      question: "All oranges are citrus fruits. Some citrus fruits are sour. Which statement is necessarily true?",
      options: [
        "Some oranges are sour",
        "All oranges are sour",
        "No oranges are sour",
        "All sour fruits are oranges"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some oranges are sour, but not guaranteed."
    },
    {
      question: "If every prime number greater than 2 is odd, and 17 is a prime number greater than 2, what can we conclude?",
      options: [
        "17 is an odd number",
        "17 is an even number",
        "Some prime numbers are even",
        "17 is not a prime number"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If every prime number greater than 2 is odd and 17 is a prime number greater than 2, then 17 is odd."
    },
    {
      question: "All cars are vehicles. Some vehicles are trucks.  What can we conclude?",
      options: [
        "Some cars may be trucks",
        "All cars are trucks",
        "No cars are trucks",
        "All trucks are cars"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some cars are also trucks, given the overlapping categories."
    },
    {
      question: "If all birds have wings, and eagles are birds, what can we conclude?",
      options: [
        "Eagles have wings",
        "Some eagles have wings",
        "Eagles don't have wings",
        "All winged creatures are eagles"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If all birds have wings and eagles are birds, then eagles have wings."
    },
    {
      question: "No mammals are reptiles. All snakes are reptiles.  Therefore:",
      options: [
        "No mammals are snakes",
        "All mammals are snakes",
        "Some mammals are snakes",
        "Some snakes are mammals"
      ],
      correctAnswer: 0,
      explanation: "Syllogistic reasoning: If no mammals are reptiles and all snakes are reptiles, then no mammals are snakes."
    },
    {
      question: "All squares have four sides. This shape has four sides. Therefore:",
      options: [
        "This shape might be a square",
        "This shape is a square",
        "This shape is not a square",
        "All four-sided shapes are squares"
      ],
      correctAnswer: 0,
      explanation: "Having four sides is a necessary, but not sufficient condition to be a square."
    },
    {
      question: "If all pencils are writing instruments, and some writing instruments are expensive, what can we say?",
      options: [
        "Some pencils might be expensive",
        "All pencils are expensive",
        "No pencils are expensive",
        "Expensive items are pencils"
      ],
      correctAnswer: 0,
      explanation: "It's possible some pencils are expensive, but not guaranteed."
    },
    {
      question: "All circles are round. This shape is round. Therefore:",
      options: [
        "This shape might be a circle",
        "This shape is a circle",
        "This shape is not a circle",
        "All round shapes are circles"
      ],
      correctAnswer: 0,
      explanation: "Being round is a necessary condition for a circle, but not sufficient."
    },
    {
      question: "If all planets orbit a star, and Earth orbits a star, what can we conclude?",
      options: [
        "Earth may be a planet",
        "Earth is a planet",
        "Earth is not a planet",
        "All orbiting bodies are planets"
      ],
      correctAnswer: 0,
      explanation: "Orbiting a star is a necessary condition for being a planet, but not sufficient."
    },
    {
      question: "No fish are mammals. All whales are mammals. Therefore:",
      options: [
        "No whales are fish",
        "All whales are fish",
        "Some whales are fish",
        "Some fish are whales"
      ],
      correctAnswer: 0,
      explanation: "Syllogistic reasoning: If no fish are mammals and all whales are mammals, then no whales are fish."
    },
    {
      question: "All triangles have three angles. This shape has three angles. Therefore:",
      options: [
        "This shape might be a triangle",
        "This shape is a triangle",
        "This shape is not a triangle",
        "All three-angled shapes are triangles"
      ],
      correctAnswer: 0,
      explanation: "Having three angles is a necessary condition for being a triangle, but not sufficient."
    },
    {
      question: "If all dogs bark, and Fido is a dog, what can we conclude?",
      options: [
        "Fido barks",
        "Fido does not bark",
        "Some dogs bark",
        "All barking animals are dogs"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If all dogs bark and Fido is a dog, then Fido barks."
    },
    {
      question: "All cars have engines. Some vehicles have engines. Therefore:",
      options: [
        "Some cars may be vehicles",
        "All cars are vehicles",
        "No cars are vehicles",
        "All vehicles are cars"
      ],
      correctAnswer: 1,
      explanation: "This is a deductive statement showing a subset relationship."
    },
    {
      question: "If no cats are dogs, and Mittens is a cat, what can we conclude?",
      options: [
        "Mittens is not a dog",
        "Mittens is a dog",
        "Some cats are dogs",
        "Some dogs are cats"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If no cats are dogs and Mittens is a cat, then Mittens is not a dog."
    },
    {
      question: "All birds lay eggs. Penguins are birds. Therefore:",
      options: [
        "Penguins lay eggs",
        "Penguins do not lay eggs",
        "Some birds lay eggs",
        "All egg-laying creatures are birds"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If all birds lay eggs and penguins are birds, then penguins lay eggs."
    },
    {
      question: "If all squares are rectangles, and some rectangles are squares, which statement is necessarily true?",
      options: [
        "Some squares are rectangles",
        "All rectangles are squares",
        "No squares are rectangles",
        "Rectangles and squares are mutually exclusive"
      ],
      correctAnswer: 0,
      explanation: "This statement simply reiterates a subset relationship."
    },
    {
      question: "All mammals are vertebrates. Dolphins are mammals. What can we conclude about dolphins?",
      options: [
        "Dolphins are vertebrates",
        "Dolphins are not vertebrates",
        "Some dolphins are vertebrates",
        "All vertebrates are dolphins"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If all mammals are vertebrates and dolphins are mammals, then dolphins are vertebrates."
    },
    {
      question: "No fish can fly. All airplanes can fly. Therefore:",
      options: [
        "No fish are airplanes",
        "All fish are airplanes",
        "Some fish are airplanes",
        "Some airplanes are fish"
      ],
      correctAnswer: 0,
      explanation: "Syllogistic reasoning: If no fish can fly and all airplanes can fly, then no fish are airplanes."
    },
    {
      question: "All apples are fruits. Some fruits are red. What can we conclude about apples?",
      options: [
        "Some apples might be red",
        "All apples are red",
        "No apples are red",
        "All red things are apples"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some apples are red, but not guaranteed."
    },
    {
      question: "If every even number is divisible by 2, and 20 is an even number, what can we conclude?",
      options: [
        "20 is divisible by 2",
        "20 is not divisible by 2",
        "Some even numbers are not divisible by 2",
        "20 is an odd number"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If every even number is divisible by 2 and 20 is an even number, then 20 is divisible by 2."
    },
    {
      question: "All dogs have four legs. Spot has four legs. Therefore:",
      options: [
        "Spot might be a dog",
        "Spot is a dog",
        "Spot is not a dog",
        "All four-legged creatures are dogs"
      ],
      correctAnswer: 0,
      explanation: "Having four legs is a necessary condition for being a dog, but not sufficient."
    },
    {
      question: "If no birds are reptiles, and all crocodiles are reptiles, what can we conclude?",
      options: [
        "No birds are crocodiles",
        "All birds are crocodiles",
        "Some birds are crocodiles",
        "Some crocodiles are birds"
      ],
      correctAnswer: 0,
      explanation: "Syllogistic reasoning: If no birds are reptiles and all crocodiles are reptiles, then no birds are crocodiles."
    },
    {
      question: "All squares are quadrilaterals. Some quadrilaterals are parallelograms.  What can we conclude?",
      options: [
        "Some squares may be parallelograms",
        "All squares are parallelograms",
        "No squares are parallelograms",
        "All parallelograms are squares"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some squares are also parallelograms, given the overlapping categories."
    },
    {
      question: "If all cats are mammals, and some mammals are carnivores, which statement is definitely true?",
      options: [
        "Some cats may be carnivores",
        "All cats are carnivores",
        "No cats are carnivores",
        "All carnivores are cats"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some cats are carnivores, but not guaranteed."
    },
    {
      question: "All pencils write. Some things that write are expensive. Therefore:",
      options: [
        "Some pencils might be expensive",
        "All pencils are expensive",
        "No pencils are expensive",
        "All expensive things are pencils"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some pencils are expensive, but not guaranteed."
    },
    {
      question: "If no circles are squares, and all ellipses are circles, which statement is true?",
      options: [
        "No ellipses are squares",
        "All ellipses are squares",
        "Some ellipses are squares",
        "Squares are ellipses"
      ],
      correctAnswer: 0,
      explanation: "Syllogistic reasoning: If no circles are squares and all ellipses are circles, then no ellipses are squares."
    },
    {
      question: "All oranges are fruits. Some fruits are sweet. Therefore:",
      options: [
        "Some oranges are sweet",
        "All oranges are sweet",
        "No oranges are sweet",
        "All sweet things are oranges"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some oranges are sweet, but not guaranteed."
    },
    {
      question: "If all birds have beaks, and robins are birds, what can we conclude?",
      options: [
        "Robins have beaks",
        "Robins do not have beaks",
        "Some birds have beaks",
        "All beaked creatures are robins"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If all birds have beaks and robins are birds, then robins have beaks."
    },
    {
      question: "All squares are rectangles. Some rectangles are squares. Which statement is necessarily true?",
      options: [
        "Some squares are rectangles",
        "All rectangles are squares",
        "No squares are rectangles",
        "Rectangles and squares are mutually exclusive"
      ],
      correctAnswer: 0,
      explanation: "This statement simply reiterates a subset relationship."
    },
    {
      question: "All mammals are vertebrates. Dolphins are mammals. What can we conclude about dolphins?",
      options: [
        "Dolphins are vertebrates",
        "Dolphins are not vertebrates",
        "Some dolphins are vertebrates",
        "All vertebrates are dolphins"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If all mammals are vertebrates and dolphins are mammals, then dolphins are vertebrates."
    },
    {
      question: "No fish can fly. All planes can fly. Therefore:",
      options: [
        "No fish are planes",
        "All fish are planes",
        "Some fish are planes",
        "Some planes are fish"
      ],
      correctAnswer: 0,
      explanation: "Syllogistic reasoning: If no fish can fly and all planes can fly, then no fish are planes."
    },
    {
      question: "All apples are fruits. Some fruits grow on trees. What can we conclude about apples?",
      options: [
        "Some apples might grow on trees",
        "All apples grow on trees",
        "No apples grow on trees",
        "All fruits grow on trees"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some apples grow on trees, but not guaranteed."
    },
    {
      question: "If all dogs are animals, and some animals are pets, which statement is definitely true?",
      options: [
        "Some dogs may be pets",
        "All dogs are pets",
        "No dogs are pets",
        "All pets are dogs"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some dogs are pets, but not guaranteed."
    },
    {
      question: "All birds have feathers. Ostriches are birds. Therefore:",
      options: [
        "Ostriches have feathers",
        "Ostriches do not have feathers",
        "Some birds have feathers",
        "All feathered creatures are ostriches"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If all birds have feathers and ostriches are birds, then ostriches have feathers."
    },
    {
      question: "If all squares are rectangles, and all rectangles are quadrilaterals, what can we conclude about squares?",
      options: [
        "All squares are quadrilaterals",
        "Some squares are quadrilaterals",
        "No squares are quadrilaterals",
        "All quadrilaterals are squares"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If all squares are rectangles and all rectangles are quadrilaterals, then all squares are quadrilaterals."
    },
    {
      question: "All cats are mammals. Some mammals are aquatic. Therefore:",
      options: [
        "Some cats might be aquatic",
        "All cats are aquatic",
        "No cats are aquatic",
        "All aquatic creatures are cats"
      ],
      correctAnswer: 0,
      explanation: "It's possible that some cats are aquatic, but not guaranteed."
    },
    {
      question: "If all fish swim, and sharks are fish, what can we conclude?",
      options: [
        "Sharks swim",
        "Sharks do not swim",
        "Some fish swim",
        "All swimming creatures are sharks"
      ],
      correctAnswer: 0,
      explanation: "Deductive reasoning: If all fish swim and sharks are fish, then sharks swim."
    },
    {
      question: "Analogous to 'Physician : Patient', what is the correct pairing?",
      options: [
        "Teacher : Student",
        "Chef : Restaurant",
        "Mechanic : Car",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "All options show a professional-client relationship."
    },
    {
      question: "Which word is the closest antonym to 'Enormous'?",
      options: [
        "Tiny",
        "Gigantic",
        "Immense",
        "Massive"
      ],
      correctAnswer: 0,
      explanation: "Tiny is the opposite of enormous in size."
    },
    {
      question: "Complete the analogy: 'Sunrise : Dawn :: Sunset : ____'",
      options: [
        "Dusk",
        "Morning",
        "Noon",
        "Night"
      ],
      correctAnswer: 0,
      explanation: "Dusk is the period of time corresponding to sunset."
    },
    {
      question: "Find the synonym of 'Ephemeral':",
      options: [
        "Fleeting",
        "Eternal",
        "Permanent",
        "Lasting"
      ],
      correctAnswer: 0,
      explanation: "Fleeting means lasting for a short time, just like ephemeral."
    },
    {
      question: "What is the antonym of 'Gregarious'?",
      options: [
        "Solitary",
        "Friendly",
        "Outgoing",
        "Sociable"
      ],
      correctAnswer: 0,
      explanation: "Solitary means alone and not sociable, the opposite of gregarious."
    },
    {
      question: "Which word best completes the sentence: 'The evidence was _____ , leading to the defendant's acquittal.'",
      options: [
        "insufficient",
        "sufficient",
        "abundant",
        "overwhelming"
      ],
      correctAnswer: 0,
      explanation: "Insufficient evidence means not enough to convict."
    },
    {
      question: "Complete the analogy: 'Hammer : Nail :: Wrench : ____'",
      options: [
        "Bolt",
        "Screw",
        "Wood",
        "Metal"
      ],
      correctAnswer: 1,
      explanation: "A wrench is used to tighten or loosen screws."
    },
    {
      question: "Which word is the closest synonym to 'Obscure'?",
      options: [
        "Unclear",
        "Clear",
        "Obvious",
        "Transparent"
      ],
      correctAnswer: 0,
      explanation: "Unclear means not easily understood, like obscure."
    },
    {
      question: "What is the antonym of 'Fastidious'?",
      options: [
        "Careless",
        "Meticulous",
        "Precise",
        "Exacting"
      ],
      correctAnswer: 0,
      explanation: "Careless is the opposite of fastidious, meaning not attentive to detail."
    },
    {
      question: "Which word best completes the sentence: 'The speaker's remarks were met with _____ silence.'",
      options: [
        "awkward",
        "comfortable",
        "pleasant",
        "enjoyable"
      ],
      correctAnswer: 0,
      explanation: "Awkward silence suggests an uncomfortable or uneasy silence."
    },
    {
      question: "Complete the analogy: 'Doctor : Stethoscope :: Painter : ____'",
      options: [
        "Brush",
        "Canvas",
        "Palette",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "All options are tools used by painters."
    },
    {
      question: "Which word is the closest synonym to 'Laconic'?",
      options: [
        "Brief",
        "Verbose",
        "Wordy",
        "Prolix"
      ],
      correctAnswer: 0,
      explanation: "Brief means short and concise, like laconic."
    },
    {
      question: "What is the antonym of 'Benevolent'?",
      options: [
        "Malevolent",
        "Kind",
        "Generous",
        "Compassionate"
      ],
      correctAnswer: 0,
      explanation: "Malevolent means wishing evil or harm, the opposite of benevolent."
    },
    {
      question: "Which word best completes the sentence: 'The negotiations were _____ , resulting in a stalemate.'",
      options: [
        "fruitless",
        "successful",
        "productive",
        "effective"
      ],
      correctAnswer: 0,
      explanation: "Fruitless means unproductive or unsuccessful."
    },
    {
      question: "Complete the analogy: 'Bird : Wing :: Fish : ____'",
      options: [
        "Fin",
        "Scale",
        "Gill",
        "Water"
      ],
      correctAnswer: 0,
      explanation: "A fin is the analogous body part to a bird's wing."
    },
    {
      question: "Which word is the closest synonym to 'Eloquent'?",
      options: [
        "Articulate",
        "Mumbling",
        "Inarticulate",
        "Stammering"
      ],
      correctAnswer: 0,
      explanation: "Articulate means able to express oneself clearly and effectively, like eloquent."
    },
    {
      question: "What is the antonym of 'Diligent'?",
      options: [
        "Lazy",
        "Hardworking",
        "Industrious",
        "Assiduous"
      ],
      correctAnswer: 0,
      explanation: "Lazy is the opposite of diligent, meaning not working hard."
    },
    {
      question: "Which word best completes the sentence: 'The detective discovered a _____ clue that solved the mystery.'",
      options: [
        "crucial",
        "unimportant",
        "trivial",
        "insignificant"
      ],
      correctAnswer: 0,
      explanation: "Crucial means essential or vital."
    },
    {
      question: "Complete the analogy: 'Tree : Branch :: River : ____'",
      options: [
        "Tributary",
        "Source",
        "Ocean",
        "Water"
      ],
      correctAnswer: 0,
      explanation: "A tributary is a smaller river flowing into a larger one."
    },
    {
      question: "Which word is the closest synonym to 'Tenacious'?",
      options: [
        "Persistent",
        "Weak",
        "Fickle",
        "Indecisive"
      ],
      correctAnswer: 0,
      explanation: "Persistent means continuing firmly or obstinately in a course of action in spite of difficulty or opposition, like tenacious."
    },
    {
      question: "What is the antonym of 'Transparent'?",
      options: [
        "Opaque",
        "Clear",
        "Lucid",
        "Translucent"
      ],
      correctAnswer: 0,
      explanation: "Opaque means not able to be seen through; not transparent."
    },
    {
      question: "Which word best completes the sentence: 'The artist's work was highly _____ , full of symbolism and hidden meanings.'",
      options: [
        "allusive",
        "literal",
        "explicit",
        "straightforward"
      ],
      correctAnswer: 0,
      explanation: "Allusive means expressing something indirectly."
    },
    {
      question: "Complete the analogy: 'Singer : Song :: Author : ____'",
      options: [
        "Book",
        "Story",
        "Novel",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "All options are works created by authors."
    },
    {
      question: "Which word is the closest synonym to 'Concise'?",
      options: [
        "Brief",
        "Wordy",
        "Verbose",
        "Lengthy"
      ],
      correctAnswer: 0,
      explanation: "Brief means short and concise."
    },
    {
      question: "What is the antonym of 'Abundant'?",
      options: [
        "Scarce",
        "Plentiful",
        "Ample",
        "Copious"
      ],
      correctAnswer: 0,
      explanation: "Scarce means insufficient or in short supply, the opposite of abundant."
    },
    {
      question: "Which word best completes the sentence: 'The meeting was unexpectedly _____ , lasting only fifteen minutes.'",
      options: [
        "brief",
        "lengthy",
        "protracted",
        "extended"
      ],
      correctAnswer: 0,
      explanation: "Brief means short and concise."
    },
    {
      question: "Complete the analogy: 'Sun : Solar :: Moon : ____'",
      options: [
        "Lunar",
        "Stellar",
        "Solar",
        "Cosmic"
      ],
      correctAnswer: 0,
      explanation: "Lunar refers to the moon."
    },
    {
      question: "Which word is the closest synonym to 'Incisive'?",
      options: [
        "Sharp",
        "Blunt",
        "Dull",
        "Unclear"
      ],
      correctAnswer: 0,
      explanation: "Sharp means quick and direct, like incisive."
    },
    {
      question: "What is the antonym of 'Prolific'?",
      options: [
        "Unproductive",
        "Productive",
        "Fruitful",
        "Fertile"
      ],
      correctAnswer: 0,
      explanation: "Unproductive means not producing or achieving much, the opposite of prolific."
    },
    {
      question: "Which word best completes the sentence: 'The evidence presented was _____ , leaving no doubt of the suspect's guilt.'",
      options: [
        "conclusive",
        "inconclusive",
        "ambiguous",
        "uncertain"
      ],
      correctAnswer: 0,
      explanation: "Conclusive means showing that something is definitely true."
    },
    {
      question: "Complete the analogy: 'Circle : Round :: Square : ____'",
      options: [
        "Square",
        "Rectangular",
        "Triangular",
        "Quadrilateral"
      ],
      correctAnswer: 0,
      explanation: "Square refers to the shape."
    },
    {
      question: "Which word is the closest synonym to 'Taciturn'?",
      options: [
        "Reserved",
        "Talkative",
        "Loquacious",
        "Garrulous"
      ],
      correctAnswer: 0,
      explanation: "Reserved means slow to reveal emotion or opinions, like taciturn."
    },
    {
      question: "What is the antonym of 'Obstinate'?",
      options: [
        "Yielding",
        "Stubborn",
        "Headstrong",
        "Intransigent"
      ],
      correctAnswer: 0,
      explanation: "Yielding means giving way to pressure; compliant, the opposite of obstinate."
    },
    {
      question: "Which word best completes the sentence: 'The presentation was _____ , leaving the audience confused.'",
      options: [
        "unclear",
        "clear",
        "lucid",
        "transparent"
      ],
      correctAnswer: 0,
      explanation: "Unclear means not easily understood."
    },
    {
      question: "Complete the analogy: 'Physician : Heal :: Teacher : ____'",
      options: [
        "Educate",
        "School",
        "Classroom",
        "Teach"
      ],
      correctAnswer: 0,
      explanation: "Educate is the action a teacher performs."
    },
    {
      question: "Which word is the closest synonym to 'Elusive'?",
      options: [
        "Hard to find",
        "Easy to find",
        "Obvious",
        "Apparent"
      ],
      correctAnswer: 0,
      explanation: "Hard to find means difficult to locate or grasp, like elusive."
    },
    {
      question: "What is the antonym of 'Inherent'?",
      options: [
        "Acquired",
        "Intrinsic",
        "Innate",
        "Natural"
      ],
      correctAnswer: 0,
      explanation: "Acquired means obtained or gained, the opposite of inherent."
    },
    {
      question: "Which word best completes the sentence: 'The evidence was _____ , requiring further investigation.'",
      options: [
        "inconclusive",
        "conclusive",
        "definitive",
        "certain"
      ],
      correctAnswer: 0,
      explanation: "Inconclusive means not leading to a firm conclusion."
    },
    {
      question: "Complete the analogy: 'Car : Road :: Boat : ____'",
      options: [
        "Water",
        "River",
        "Ocean",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "All options are places where boats travel."
    },
    {
      question: "Which word is the closest synonym to 'Veracious'?",
      options: [
        "Truthful",
        "Deceptive",
        "Untruthful",
        "False"
      ],
      correctAnswer: 0,
      explanation: "Truthful means honest and accurate, like veracious."
    },
    {
      question: "What is the antonym of 'Equivocal'?",
      options: [
        "Unequivocal",
        "Ambiguous",
        "Uncertain",
        "Doubtful"
      ],
      correctAnswer: 0,
      explanation: "Unequivocal means leaving no doubt, the opposite of equivocal."
    },
    {
      question: "Which word best completes the sentence: 'The experiment's results were _____ , supporting the initial hypothesis.'",
      options: [
        "supportive",
        "contradictory",
        "inconclusive",
        "uncertain"
      ],
      correctAnswer: 0,
      explanation: "Supportive means giving help or encouragement."
    },
    {
      question: "Complete the analogy: 'Bread : Bakery :: Newspaper : ____'",
      options: [
        "Printing press",
        "Newsstand",
        "Publisher",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "All options are related to the production and distribution of newspapers."
    },
    {
      question: "Which word is the closest synonym to 'Laconic'?",
      options: [
        "Concise",
        "Verbose",
        "Rambling",
        "Wordy"
      ],
      correctAnswer: 0,
      explanation: "Concise means brief and to the point, like laconic."
    },
    {
      question: "What is the antonym of 'Gregarious'?",
      options: [
        "Reclusive",
        "Sociable",
        "Friendly",
        "Outgoing"
      ],
      correctAnswer: 0,
      explanation: "Reclusive means avoiding the company of other people; solitary, the opposite of gregarious."
    },
    {
      question: "Which word best completes the sentence: 'The argument was _____ , lacking any logical basis.'",
      options: [
        "fallacious",
        "sound",
        "valid",
        "logical"
      ],
      correctAnswer: 0,
      explanation: "Fallacious means based on a mistaken belief."
    },
    {
      question: "Complete the analogy: 'Doctor : Medicine :: Teacher : ____'",
      options: [
        "Education",
        "Knowledge",
        "Learning",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "All options are related to what a teacher provides."
    },
    {
      question: "Which word is the closest synonym to 'Intrepid'?",
      options: [
        "Brave",
        "Fearful",
        "Timid",
        "Cowardly"
      ],
      correctAnswer: 0,
      explanation: "Brave means showing courage, like intrepid."
    },
    {
      question: "What is the antonym of 'Ephemeral'?",
      options: [
        "Eternal",
        "Fleeting",
        "Transient",
        "Short-lived"
      ],
      correctAnswer: 0,
      explanation: "Eternal means lasting forever, the opposite of ephemeral."
    },
    {
      question: "Which word best completes the sentence: 'The decision was made after _____ consideration of all factors.'",
      options: [
        "careful",
        "hasty",
        "reckless",
        "impulsive"
      ],
      correctAnswer: 0,
      explanation: "Careful means done with attention to detail."
    },
    {
      question: "Complete the analogy: 'Pilot : Airplane :: Driver : ____'",
      options: [
        "Car",
        "Vehicle",
        "Truck",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "All options are types of vehicles driven by drivers."
    },
    {
      question: "Which word is the closest synonym to 'Pragmatic'?",
      options: [
        "Practical",
        "Idealistic",
        "Theoretical",
        "Utopian"
      ],
      correctAnswer: 0,
      explanation: "Practical means concerned with practice or action, like pragmatic."
    },
    {
      question: "What is the antonym of 'Ambiguous'?",
      options: [
        "Unambiguous",
        "Uncertain",
        "Vague",
        "Indeterminate"
      ],
      correctAnswer: 0,
      explanation: "Unambiguous means not open to more than one interpretation, the opposite of ambiguous."
    }
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
      question: "Arrange the following words to form a logical sentence: quickly, the, fox, brown, ran",
      options: ["The brown fox ran quickly", "Quickly the brown fox ran", "Fox the brown quickly ran", "Ran quickly the fox brown"],
      correctAnswer: 0,
      explanation: "This forms a grammatically correct and logical sentence."
    },
    {
      question: "Order these events logically: 1. Wake up 2. Eat breakfast 3. Go to bed 4. Brush teeth",
      options: ["1,4,2,3", "3,1,4,2", "2,1,4,3", "4,3,2,1"],
      correctAnswer: 0,
      explanation: "Typical morning routine: Wake up, brush teeth, eat breakfast, go to bed."
    },
    {
      question: "Put the following steps in the correct order: 1. Bake 2. Mix ingredients 3. Prepare oven 4. Serve",
      options: ["2,3,1,4", "3,2,1,4", "1,2,3,4", "4,1,2,3"],
      correctAnswer: 1,
      explanation: "Correct order for baking: Prepare oven, mix ingredients, bake, serve."
    },
    {
      question: "Arrange logically: 1. Plant seeds 2. Harvest crops 3. Water plants 4. Fertilize soil",
      options: ["1,4,3,2", "4,1,3,2", "2,3,1,4", "3,2,4,1"],
      correctAnswer: 0,
      explanation: "Correct order for farming: Plant seeds, fertilize soil, water plants, harvest crops."
    },
    {
      question: "Order these steps for writing an essay: 1. Write the conclusion 2. Conduct research 3. Create an outline 4. Write the introduction",
      options: ["2,3,4,1", "3,2,4,1", "4,1,3,2", "1,4,3,2"],
      correctAnswer: 1,
      explanation: "Typical essay-writing steps: Conduct research, create an outline, write introduction, write conclusion."
    },
    {
      question: "What is the correct order of these life cycle stages: 1. Adult 2. Child 3. Baby 4. Teenager",
      options: ["3,2,4,1", "1,2,3,4", "2,1,3,4", "4,3,2,1"],
      correctAnswer: 0,
      explanation: "The order is: Baby, Child, Teenager, Adult."
    },
    {
      question: "Arrange the stages of a software development project: 1. Deployment 2. Testing 3. Design 4. Development",
      options: ["3,4,2,1", "1,2,3,4", "2,3,4,1", "4,3,2,1"],
      correctAnswer: 0,
      explanation: "The correct order is: Design, Development, Testing, Deployment."
    },
    {
      question: "Place the following in the correct order: 1. Graduate 2. Attend school 3. Apply for jobs 4. Get a job",
      options: ["2,1,3,4", "1,2,3,4", "3,2,1,4", "4,1,3,2"],
      correctAnswer: 0,
      explanation: "The correct order is: Attend school, graduate, apply for jobs, get a job."
    }
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
      question: "What comes next in this sequence: A1, B2, C3, ...?",
      options: ["D4", "E5", "A4", "B3"],
      correctAnswer: 0,
      explanation: "Simple alphabetical and numerical sequence."
    },
    {
      question: "Continue the pattern: ZY, XW, VU, ...?",
      options: ["TS", "RS", "ST", "SR"],
      correctAnswer: 0,
      explanation: "Pairs of letters moving backward two spaces in the alphabet."
    },
    {
      question: "What number follows in this series: 2, 6, 18, 54, ...?",
      options: ["162", "108", "144", "216"],
      correctAnswer: 0,
      explanation: "Each number is multiplied by 3."
    },
    {
      question: "Complete the sequence: 1, 4, 9, 16, 25, ...?",
      options: ["36", "49", "30", "40"],
      correctAnswer: 0,
      explanation: "Sequence of perfect squares."
    },
    {
      question: "What comes next: O1, N2, M3, ...?",
      options: ["L4", "K4", "L5", "M4"],
      correctAnswer: 0,
      explanation: "Letters go backwards, numbers increase."
    },
    {
      question: "Continue the pattern: 1, 3, 6, 10, 15, ...?",
      options: ["21", "20", "25", "18"],
      correctAnswer: 0,
      explanation: "Triangular numbers: each number is the sum of consecutive integers."
    },
    {
      question: "What is the next number: 1, 2, 4, 8, 16, ...?",
      options: ["32", "24", "30", "28"],
      correctAnswer: 0,
      explanation: "Each number is doubled."
    },
    {
      question: "Complete this sequence: 2, 5, 10, 17, 26, ...?",
      options: ["37", "35", "39", "41"],
      correctAnswer: 0,
      explanation: "Add increasing odd numbers."
    },
    {
      question: "Continue the pattern:  A, C, E, G, ...?",
      options: ["I", "H", "J", "B"],
      correctAnswer: 0,
      explanation: "Every other letter in the alphabet."
    },
    {
      question: "What comes next in this series: 1, 8, 27, 64, ...?",
      options: ["125", "100", "150", "200"],
      correctAnswer: 0,
      explanation: "Perfect cubes: 1³, 2³, 3³, 4³, 5³."
    },
    {
      question: "Complete the sequence: 1, 2, 6, 24, 120, ...?",
      options: ["720", "600", "840", "60"],
      correctAnswer: 0,
      explanation: "Each number is multiplied by consecutive integers."
    },
    {
      question: "Find the next term: 3, 5, 9, 17, 33, ...?",
      options: ["65", "63", "61", "67"],
      correctAnswer: 0,
      explanation: "Double the previous number and add 1."
    },
    {
      question: "Continue the pattern: 1, 1, 2, 3, 5, 8, ...?",
      options: ["13", "12", "14", "11"],
      correctAnswer: 0,
      explanation: "Fibonacci sequence."
    }
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
      question: "Order correctly: 1. Mix ingredients 2. Bake 3. Prepare pan 4. Cool 5. Serve",
      options: ["3,1,2,4,5", "1,2,3,4,5", "2,1,3,4,5", "1,3,2,4,5"],
      correctAnswer: 0,
      explanation: "Baking sequence: Prepare pan → Mix ingredients → Bake → Cool → Serve"
    },
    {
      question: "Arrange chronologically: 1. Bronze Age 2. Stone Age 3. Iron Age 4. Modern Age",
      options: ["2,1,3,4", "1,2,3,4", "4,3,2,1", "3,2,1,4"],
      correctAnswer: 0,
      explanation: "Historical sequence: Stone Age → Bronze Age → Iron Age → Modern Age"
    },
    {
      question: "Put in order: 1. School 2. College 3. Kindergarten 4. Job 5. Preschool",
      options: ["5,3,1,2,4", "3,5,1,2,4", "1,2,3,4,5", "4,3,2,1,5"],
      correctAnswer: 0,
      explanation: "Educational sequence: Preschool → Kindergarten → School → College → Job"
    },
    {
      question: "Arrange the process: 1. Research 2. Draft 3. Edit 4. Publish 5. Review",
      options: ["1,2,5,3,4", "2,1,3,4,5", "1,2,3,5,4", "2,3,1,4,5"],
      correctAnswer: 0,
      explanation: "Writing sequence: Research → Draft → Review → Edit → Publish"
    },
    {
      question: "Order the steps: 1. Interview 2. Apply 3. Resume 4. Job offer 5. Follow up",
      options: ["3,2,1,5,4", "2,3,1,4,5", "1,2,3,4,5", "4,3,2,1,5"],
      correctAnswer: 0,
      explanation: "Job application sequence: Resume → Apply → Interview → Follow up → Job offer"
    },
    {
      question: "Arrange in sequence: 1. Dawn 2. Noon 3. Dusk 4. Midnight",
      options: ["1,2,3,4", "4,1,2,3", "3,4,1,2", "2,3,4,1"],
      correctAnswer: 0,
      explanation: "Daily time sequence: Dawn → Noon → Dusk → Midnight"
    },
    {
      question: "Order the meal: 1. Main course 2. Appetizer 3. Dessert 4. Coffee",
      options: ["2,1,3,4", "1,2,3,4", "3,2,1,4", "4,3,2,1"],
      correctAnswer: 0,
      explanation: "Dining sequence: Appetizer → Main course → Dessert → Coffee"
    },
    {
      question: "Arrange the travel steps: 1. Pack 2. Book tickets 3. Plan itinerary 4. Travel 5. Research",
      options: ["5,3,2,1,4", "1,2,3,4,5", "3,2,1,5,4", "2,1,3,5,4"],
      correctAnswer: 0,
      explanation: "Travel planning sequence: Research → Plan itinerary → Book tickets → Pack → Travel"
    },
    {
      question: "Order the building process: 1. Foundation 2. Walls 3. Plan 4. Roof 5. Interior",
      options: ["3,1,2,4,5", "1,2,3,4,5", "2,1,3,4,5", "4,3,2,1,5"],
      correctAnswer: 0,
      explanation: "Construction sequence: Plan → Foundation → Walls → Roof → Interior"
    },
    {
      question: "Arrange the movie stages: 1. Filming 2. Script 3. Editing 4. Release 5. Casting",
      options: ["2,5,1,3,4", "1,2,3,4,5", "5,2,1,3,4", "3,2,1,4,5"],
      correctAnswer: 0,
      explanation: "Movie production sequence: Script → Casting → Filming → Editing → Release"
    }
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
      question: "Which comes next: AAB, ABB, BAA, ?",
      options: ["BBA", "BAB", "ABB", "AAB"],
      correctAnswer: 0,
      explanation: "Pattern: Letters rotate positions in sequence"
    },
    {
      question: "Complete: 2Y4, 4U6, 6Q8, ?",
      options: ["8M10", "8N10", "10M8", "6M8"],
      correctAnswer: 0,
      explanation: "Pattern: Numbers increase by 2, letters move backward 4 positions"
    },
    {
      question: "Next in sequence: A1, C3, E5, G7, ?",
      options: ["I9", "H8", "J10", "I8"],
      correctAnswer: 0,
      explanation: "Pattern: Letters advance 2 positions, numbers increase by 2"
    },
    {
      question: "Complete: RED5, ORA4, KLI3, ?",
      options: ["HGE2", "GHE2", "HGF2", "GHF2"],
      correctAnswer: 0,
      explanation: "Pattern: Letters shift 3 positions back, number decreases by 1"
    },
    {
      question: "Next in series: AB12, CD34, EF56, ?",
      options: ["GH78", "HI78", "GH89", "IJ78"],
      correctAnswer: 0,
      explanation: "Pattern: Letters advance 2 positions, numbers follow sequence"
    },
    {
      question: "Complete: Z25, X16, V9, ?",
      options: ["T4", "S4", "T5", "U4"],
      correctAnswer: 0,
      explanation: "Pattern: Letters move back 2, numbers decrease by sequence"
    },
    {
      question: "Which follows: 1AB, 2BC, 3CD, ?",
      options: ["4DE", "4CD", "3DE", "5DE"],
      correctAnswer: 0,
      explanation: "Pattern: Number increases by 1, letters advance one position"
    },
    {
      question: "Next term: P3Q, R5S, T7U, ?",
      options: ["V9W", "W9V", "V8W", "W8V"],
      correctAnswer: 0,
      explanation: "Pattern: Letters advance 2 positions, middle number increases by 2"
    },
    {
      question: "Complete sequence: 2XA, 4YB, 6ZC, ?",
      options: ["8AD", "8BD", "6AD", "8CD"],
      correctAnswer: 0,
      explanation: "Pattern: First number +2, second letter cycles, third letter advances"
    },
    {
      question: "Next in pattern: 12AB, 23BC, 34CD, ?",
      options: ["45DE", "45CD", "34DE", "56DE"],
      correctAnswer: 0,
      explanation: "Pattern: Numbers advance one digit, letters advance one position"
    },
    {
      question: "Complete: AZ1, BY2, CX3, ?",
      options: ["DW4", "DX4", "CW4", "EW4"],
      correctAnswer: 0,
      explanation: "Pattern: First letter forward, second letter backward, number increases"
    }
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