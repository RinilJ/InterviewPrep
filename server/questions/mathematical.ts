// Mathematical Questions Module
import { Question } from '../types';

export async function getPercentageQuestions(): Promise<Question[]> {
  return [
    {
      question: "What is 25% of 120?",
      options: ["30", "25", "35", "40"],
      correctAnswer: 0,
      explanation: "25% = 1/4, so 25% of 120 = 120/4 = 30"
    },
    {
      question: "A shirt priced at $80 is sold at a 15% discount. What is the final price?",
      options: ["$68", "$72", "$65", "$70"],
      correctAnswer: 0,
      explanation: "15% of $80 = $12 (discount), so final price = $80 - $12 = $68"
    },
    {
      question: "If a number is increased by 20%, what is the multiplication factor?",
      options: ["1.2", "0.2", "2.0", "1.8"],
      correctAnswer: 0,
      explanation: "When increasing by 20%, multiply by (100% + 20%) = 120% = 1.2"
    },
    {
      question: "In a class of 50 students, 30 are girls. What percentage are boys?",
      options: ["40%", "35%", "45%", "50%"],
      correctAnswer: 0,
      explanation: "Boys = 20, Percentage = (20/50) × 100 = 40%"
    },
    {
      question: "A TV's price increased from $400 to $500. What is the percentage increase?",
      options: ["25%", "20%", "15%", "30%"],
      correctAnswer: 0,
      explanation: "Increase = $100, Percentage increase = (100/400) × 100 = 25%"
    },
    {
      question: "If 15% of a number is 45, what is the number?",
      options: ["300", "250", "350", "400"],
      correctAnswer: 0,
      explanation: "If 15% = 45, then 1% = 3, so 100% = 300"
    },
    {
      question: "A store offers a 30% discount followed by an additional 20% off. What is the total percentage discount?",
      options: ["44%", "50%", "40%", "35%"],
      correctAnswer: 0,
      explanation: "First discount: 70% remains, Second discount: 80% of 70% = 56% remains, so total discount = 44%"
    },
    {
      question: "What percentage of 200 is 50?",
      options: ["25%", "20%", "30%", "35%"],
      correctAnswer: 0,
      explanation: "Percentage = (50/200) × 100 = 25%"
    },
    {
      question: "A company's profit increased from $8000 to $10000. Calculate the percentage increase.",
      options: ["25%", "20%", "30%", "15%"],
      correctAnswer: 0,
      explanation: "Increase = $2000, Percentage increase = (2000/8000) × 100 = 25%"
    },
    {
      question: "If the price after a 20% discount is $160, what was the original price?",
      options: ["$200", "$180", "$220", "$240"],
      correctAnswer: 0,
      explanation: "After 20% discount, 80% = $160, so 100% = $160/0.8 = $200"
    },
    {
      question: "In a survey of 400 people, 300 preferred tea. What percentage preferred coffee?",
      options: ["25%", "30%", "35%", "20%"],
      correctAnswer: 0,
      explanation: "Coffee drinkers = 100, Percentage = (100/400) × 100 = 25%"
    },
    {
      question: "A shirt's price is reduced by 40% to $36. What was its original price?",
      options: ["$60", "$55", "$65", "$70"],
      correctAnswer: 0,
      explanation: "After 40% discount, 60% = $36, so 100% = $36/0.6 = $60"
    },
    // Add 88 more percentage questions with increasing complexity...
    // Include questions about:
    // - Compound percentage changes
    // - Business scenarios (profit/loss percentages)
    // - Real-world applications
    // - Advanced percentage calculations
  ];
}

export async function getProfitLossQuestions(): Promise<Question[]> {
  return [
    {
      question: "A merchant buys an article for $800 and sells it for $1000. What is the percentage of profit?",
      options: ["25%", "20%", "30%", "15%"],
      correctAnswer: 0,
      explanation: "Profit = $200, Percentage profit = (200/800) × 100 = 25%"
    },
    {
      question: "If a shopkeeper sells a book at $60 which cost him $45, what is his profit percentage?",
      options: ["33.33%", "25%", "30%", "35%"],
      correctAnswer: 0,
      explanation: "Profit = $15, Profit percentage = (15/45) × 100 = 33.33%"
    },
    {
      question: "A trader had 100 kgs of rice. He sold 20% at 10% profit and rest at 20% profit. What is his total profit percentage?",
      options: ["18%", "15%", "16%", "17%"],
      correctAnswer: 0,
      explanation: "20 kgs at 10% profit and 80 kgs at 20% profit: ((20×10) + (80×20))/100 = 18%"
    },
    {
      question: "A man buys a watch for $100 and sells it at a loss of 10%. What is the selling price?",
      options: ["$90", "$95", "$85", "$80"],
      correctAnswer: 0,
      explanation: "10% of $100 = $10 (loss), so selling price = $100 - $10 = $90"
    },
    {
      question: "If selling price is $920 and loss is 8%, what is the cost price?",
      options: ["$1000", "$980", "$960", "$940"],
      correctAnswer: 0,
      explanation: "If $920 is 92% (100% - 8%), then 100% (CP) = $920 ÷ 0.92 = $1000"
    },
    {
      question: "A fruit seller buys oranges at 5 for $2 and sells at 4 for $2. What is his loss percentage?",
      options: ["20%", "25%", "15%", "10%"],
      correctAnswer: 0,
      explanation: "CP of 4 oranges = $1.60, SP = $2.00, Loss = 20%"
    },
    {
      question: "On selling a bicycle for $1440, a shopkeeper gains 20%. What is the cost price?",
      options: ["$1200", "$1300", "$1100", "$1400"],
      correctAnswer: 0,
      explanation: "If $1440 is 120%, then CP (100%) = $1440 ÷ 1.2 = $1200"
    },
    {
      question: "A TV is sold at $7500 with a profit of 25%. What was its cost price?",
      options: ["$6000", "$6500", "$5500", "$7000"],
      correctAnswer: 0,
      explanation: "If $7500 is 125%, then CP (100%) = $7500 ÷ 1.25 = $6000"
    },
    {
      question: "By selling 33 items, there is a loss equal to selling price of 11 items. The loss percentage is:",
      options: ["25%", "30%", "33.33%", "20%"],
      correctAnswer: 0,
      explanation: "Loss = SP of 11 items, Total SP = SP of 33 items, Loss% = (11/44) × 100 = 25%"
    },
    {
      question: "A man sells two articles at $100 each. On one he gains 25% and on other he loses 25%. His total gain/loss percentage is:",
      options: ["Loss 6.25%", "No profit no loss", "Gain 6.25%", "Loss 12.5%"],
      correctAnswer: 0,
      explanation: "Gain on first = $20, Loss on second = $33.33, Net loss = 6.25%"
    },
    // Add 90 more profit and loss questions...
  ];
}

export async function getInterestQuestions(): Promise<Question[]> {
  return [
    {
      question: "What is the simple interest on $1000 at 5% per annum for 2 years?",
      options: ["$100", "$150", "$200", "$250"],
      correctAnswer: 0,
      explanation: "Simple Interest = (Principal × Rate × Time)/100 = (1000 × 5 × 2)/100 = $100"
    },
    // Add more interest questions...
  ];
}

export async function getTimeWorkQuestions(): Promise<Question[]> {
  return [
    {
      question: "If 6 men can do a piece of work in 12 days, in how many days can 4 men do the same work?",
      options: ["18", "16", "20", "15"],
      correctAnswer: 0,
      explanation: "Using inverse proportion: (6 × 12)/4 = 18 days"
    },
    // Add more time and work questions...
  ];
}

export async function getTimeDistanceQuestions(): Promise<Question[]> {
  return [
    {
      question: "A train traveling at 60 km/h covers a distance in 6 hours. How long will it take at 90 km/h?",
      options: ["4 hours", "5 hours", "3 hours", "7 hours"],
      correctAnswer: 0,
      explanation: "Using inverse proportion: (60 × 6)/90 = 4 hours"
    },
    {
      question: "If a car travels 300 km in 5 hours, what is its average speed?",
      options: ["60 km/h", "50 km/h", "70 km/h", "65 km/h"],
      correctAnswer: 0,
      explanation: "Average speed = Distance/Time = 300/5 = 60 km/h"
    },
    {
      question: "A cyclist covers 240 km in 8 hours riding at uniform speed. If he wants to cover the same distance in 6 hours, by how much should he increase his speed?",
      options: ["10 km/h", "15 km/h", "20 km/h", "25 km/h"],
      correctAnswer: 0,
      explanation: "Original speed = 240/8 = 30 km/h, Required speed = 240/6 = 40 km/h, Increase = 10 km/h"
    },
    {
      question: "Two trains start at the same time from points A and B, 300 km apart, and travel towards each other at 50 km/h and 70 km/h. When will they meet?",
      options: ["2.5 hours", "3 hours", "2 hours", "3.5 hours"],
      correctAnswer: 0,
      explanation: "Relative speed = 50 + 70 = 120 km/h, Time = Distance/Speed = 300/120 = 2.5 hours"
    },
    {
      question: "A person walks at 5 km/h for 3 hours and then runs at 10 km/h for 2 hours. What is the total distance covered?",
      options: ["35 km", "30 km", "40 km", "45 km"],
      correctAnswer: 0,
      explanation: "Distance = (5 × 3) + (10 × 2) = 15 + 20 = 35 km"
    },
    {
      question: "A train 100 meters long passes a pole in 10 seconds. What is its speed in km/h?",
      options: ["36 km/h", "40 km/h", "42 km/h", "38 km/h"],
      correctAnswer: 0,
      explanation: "Speed = (100 meters/10 seconds) = 10 m/s = (10 × 3600)/1000 = 36 km/h"
    },
    {
      question: "If a bus travels 480 km in 8 hours, and a car covers the same distance in 6 hours, how much faster is the car?",
      options: ["20 km/h", "15 km/h", "25 km/h", "30 km/h"],
      correctAnswer: 0,
      explanation: "Bus speed = 480/8 = 60 km/h, Car speed = 480/6 = 80 km/h, Difference = 20 km/h"
    },
    {
      question: "A train 200 meters long crosses a platform 300 meters long in 25 seconds. What is the speed of the train in km/h?",
      options: ["72 km/h", "68 km/h", "70 km/h", "74 km/h"],
      correctAnswer: 0,
      explanation: "Total distance = 200 + 300 = 500m, Speed = (500/25) = 20 m/s = 72 km/h"
    },
    {
      question: "Two cyclists start 100 km apart and ride towards each other at 20 km/h and 30 km/h. After how many hours will they meet?",
      options: ["2 hours", "2.5 hours", "3 hours", "1.5 hours"],
      correctAnswer: 0,
      explanation: "Relative speed = 20 + 30 = 50 km/h, Time = 100/50 = 2 hours"
    },
    {
      question: "A train travels first 160 km at 40 km/h and the next 160 km at 80 km/h. What is the average speed for the entire journey?",
      options: ["53.33 km/h", "50 km/h", "55 km/h", "60 km/h"],
      correctAnswer: 0,
      explanation: "Total time = 4 + 2 = 6 hours, Total distance = 320 km, Average speed = 320/6 = 53.33 km/h"
    },
    // Add 90 more time and distance questions with increasing complexity...
    // Include scenarios with:
    // - Multiple vehicles
    // - Relative motion
    // - Complex time-distance relationships
    // - Real-world applications
  ];
}

export async function getAverageQuestions(): Promise<Question[]> {
  return [
    {
      question: "The average of first 5 multiples of 3 is:",
      options: ["9", "12", "15", "18"],
      correctAnswer: 0,
      explanation: "First 5 multiples: 3,6,9,12,15; Average = (3+6+9+12+15)/5 = 9"
    },
    // Add more average questions...
  ];
}

export async function getRatioProportionQuestions(): Promise<Question[]> {
  return [
    {
      question: "If the ratio of boys to girls in a class is 3:2 and there are 30 boys, how many girls are there?",
      options: ["20", "25", "15", "10"],
      correctAnswer: 0,
      explanation: "If 3 parts = 30, then 1 part = 10, so 2 parts (girls) = 20"
    },
    {
      question: "In a mixture of milk and water in the ratio 5:2, if milk is 25 liters, how much water is there?",
      options: ["10 liters", "12 liters", "8 liters", "15 liters"],
      correctAnswer: 0,
      explanation: "If 5 parts = 25 liters, then 1 part = 5 liters, so 2 parts = 10 liters"
    },
    {
      question: "If 2 men can complete a work in 6 days, how many days will 3 men take to complete the same work?",
      options: ["4", "5", "3", "6"],
      correctAnswer: 0,
      explanation: "Using inverse proportion: (2 × 6)/3 = 4 days"
    },
    {
      question: "The ratio of ages of two people is 4:5, and their sum is 54. Find the younger person's age.",
      options: ["24", "30", "20", "28"],
      correctAnswer: 0,
      explanation: "Total parts = 9, one part = 54/9 = 6, younger age = 4 × 6 = 24"
    },
    {
      question: "A car travels 240 km in 4 hours. How long will it take to travel 360 km at the same speed?",
      options: ["6 hours", "5 hours", "7 hours", "8 hours"],
      correctAnswer: 0,
      explanation: "Using direct proportion: (4 × 360)/240 = 6 hours"
    },
    {
      question: "If 15 workers can build a wall in 12 days, how many workers are needed to build it in 9 days?",
      options: ["20", "18", "22", "16"],
      correctAnswer: 0,
      explanation: "Using inverse proportion: (15 × 12)/9 = 20 workers"
    },
    {
      question: "In a map, 2 cm represents 1 km. What is the actual distance for 5 cm on the map?",
      options: ["2.5 km", "5 km", "1.5 km", "3 km"],
      correctAnswer: 0,
      explanation: "Using ratio: 2 cm : 1 km = 5 cm : x km, so x = 2.5 km"
    },
    {
      question: "If the ratio of red to blue marbles is 3:4 and there are 28 blue marbles, how many red marbles are there?",
      options: ["21", "24", "18", "20"],
      correctAnswer: 0,
      explanation: "If 4 parts = 28, then 1 part = 7, so 3 parts = 21"
    },
    {
      question: "A recipe requires 2 cups of flour for 3 servings. How many cups of flour are needed for 9 servings?",
      options: ["6", "4", "8", "5"],
      correctAnswer: 0,
      explanation: "Using direct proportion: (2 × 9)/3 = 6 cups"
    },
    {
      question: "In a class, the ratio of students who passed to failed is 5:1. If 60 students passed, how many failed?",
      options: ["12", "15", "10", "8"],
      correctAnswer: 0,
      explanation: "If 5 parts = 60, then 1 part = 12 students failed"
    },
    // Add 90 more questions here with increasing complexity...
  ];
}

export async function getGeometryQuestions(): Promise<Question[]> {
  return [
    {
      question: "What is the area of a rectangle with length 8m and width 6m?",
      options: ["48 sq m", "42 sq m", "54 sq m", "36 sq m"],
      correctAnswer: 0,
      explanation: "Area of rectangle = length × width = 8 × 6 = 48 sq m"
    },
    {
      question: "Find the area of a triangle with base 12cm and height 8cm.",
      options: ["48 sq cm", "96 sq cm", "24 sq cm", "72 sq cm"],
      correctAnswer: 0,
      explanation: "Area of triangle = (1/2) × base × height = (1/2) × 12 × 8 = 48 sq cm"
    },
    {
      question: "Calculate the circumference of a circle with radius 7cm (use π = 3.14).",
      options: ["43.96 cm", "44.96 cm", "42.96 cm", "45.96 cm"],
      correctAnswer: 0,
      explanation: "Circumference = 2πr = 2 × 3.14 × 7 = 43.96 cm"
    },
    {
      question: "What is the volume of a cube with side length 5cm?",
      options: ["125 cu cm", "100 cu cm", "75 cu cm", "150 cu cm"],
      correctAnswer: 0,
      explanation: "Volume of cube = side³ = 5³ = 125 cubic cm"
    },
    {
      question: "If a cylinder has radius 3cm and height 10cm, what is its volume (use π = 3.14)?",
      options: ["282.6 cu cm", "270.5 cu cm", "290.7 cu cm", "265.4 cu cm"],
      correctAnswer: 0,
      explanation: "Volume of cylinder = πr²h = 3.14 × 3² × 10 = 282.6 cubic cm"
    },
    {
      question: "What is the perimeter of a regular pentagon with side length 6cm?",
      options: ["30 cm", "36 cm", "24 cm", "42 cm"],
      correctAnswer: 0,
      explanation: "Perimeter of regular pentagon = 5 × side length = 5 × 6 = 30 cm"
    },
    {
      question: "Calculate the area of a circle with diameter 14cm (use π = 3.14).",
      options: ["153.86 sq cm", "146.86 sq cm", "160.86 sq cm", "140.86 sq cm"],
      correctAnswer: 0,
      explanation: "Area = πr² = π(d/2)² = 3.14 × 7² = 153.86 sq cm"
    },
    {
      question: "Find the surface area of a cube with edge length 4cm.",
      options: ["96 sq cm", "64 sq cm", "128 sq cm", "80 sq cm"],
      correctAnswer: 0,
      explanation: "Surface area of cube = 6 × side² = 6 × 4² = 96 sq cm"
    },
    {
      question: "What is the area of a rhombus with diagonals 8cm and 6cm?",
      options: ["24 sq cm", "48 sq cm", "36 sq cm", "30 sq cm"],
      correctAnswer: 0,
      explanation: "Area of rhombus = (d₁ × d₂)/2 = (8 × 6)/2 = 24 sq cm"
    },
    {
      question: "Calculate the volume of a rectangular prism with length 5cm, width 4cm, and height 3cm.",
      options: ["60 cu cm", "50 cu cm", "70 cu cm", "80 cu cm"],
      correctAnswer: 0,
      explanation: "Volume = length × width × height = 5 × 4 × 3 = 60 cu cm"
    },
    // Add 90 more geometry questions...
  ];
}

export async function getNumberQuestions(): Promise<Question[]> {
  return [
    {
      question: "What is the least number that should be added to 1056 to make it perfectly divisible by 23?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 0,
      explanation: "1056 ÷ 23 = 45.91..., so add 2 to make it 1058 (perfectly divisible by 23)"
    },
    {
      question: "Find the next number in the sequence: 2, 6, 12, 20, 30, ?",
      options: ["42", "40", "38", "44"],
      correctAnswer: 0,
      explanation: "Each number increases by 4, 6, 8, 10, so next increase is 12"
    },
    {
      question: "What is the LCM of 12, 18, and 24?",
      options: ["72", "36", "48", "96"],
      correctAnswer: 0,
      explanation: "Prime factorization method: 72 is the least common multiple"
    },
    {
      question: "Find the HCF of 54 and 81.",
      options: ["27", "18", "9", "36"],
      correctAnswer: 0,
      explanation: "Using prime factorization: 27 is the highest common factor"
    },
    {
      question: "Which number when divided by 7 gives remainder 3 and when divided by 4 gives remainder 2?",
      options: ["23", "27", "19", "31"],
      correctAnswer: 0,
      explanation: "23 when divided by 7 gives remainder 3 and by 4 gives remainder 2"
    },
    {
      question: "What is the square root of 1296?",
      options: ["36", "34", "38", "32"],
      correctAnswer: 0,
      explanation: "36 × 36 = 1296"
    },
    {
      question: "Find the missing number: 3, 9, 27, ?, 243",
      options: ["81", "72", "90", "108"],
      correctAnswer: 0,
      explanation: "Each number is multiplied by 3: 3 × 3 = 9, 9 × 3 = 27, 27 × 3 = 81"
    },
    {
      question: "What is the sum of first 15 natural numbers?",
      options: ["120", "105", "135", "150"],
      correctAnswer: 0,
      explanation: "Using formula n(n+1)/2 where n=15: 15 × 16/2 = 120"
    },
    {
      question: "If a number is increased by 20% and then decreased by 20%, what is the net change?",
      options: ["-4%", "0%", "+4%", "-2%"],
      correctAnswer: 0,
      explanation: "After increase: 120%, after decrease: (120 × 80)/100 = 96%, net change = -4%"
    },
    {
      question: "What is the smallest 3-digit number exactly divisible by 8?",
      options: ["104", "100", "108", "112"],
      correctAnswer: 0,
      explanation: "104 is the first 3-digit number divisible by 8"
    },
    // Add 90 more questions here with increasing complexity...
  ];
}

export async function getDataInterpretationQuestions(): Promise<Question[]> {
  return [
    {
      question: `Study the following sales data:
Monthly Sales (in units):
Jan: 100
Feb: 150
Mar: 200
Apr: 175
May: 225

What was the percentage increase in sales from January to March?`,
      options: ["100%", "75%", "50%", "25%"],
      correctAnswer: 0,
      explanation: "Increase = 100 units, Percentage = (100/100) × 100 = 100%"
    },
    {
      question: `Based on the same sales data:
What was the average monthly sales for the first quarter (Jan-Mar)?`,
      options: ["150 units", "175 units", "125 units", "200 units"],
      correctAnswer: 0,
      explanation: "Average = (100 + 150 + 200)/3 = 150 units"
    },
    {
      question: `Based on the same sales data:
In which month was the highest month-over-month growth recorded?`,
      options: ["February", "March", "April", "May"],
      correctAnswer: 0,
      explanation: "Feb growth = 50 units, Mar = 50 units, Apr = -25 units, May = 50 units. Feb had earliest highest growth"
    },
    {
      question: `Study the following temperature data:
City Temperatures (°C):
Monday: 25
Tuesday: 28
Wednesday: 24
Thursday: 27
Friday: 26

What was the average temperature for the week?`,
      options: ["26°C", "25°C", "27°C", "28°C"],
      correctAnswer: 0,
      explanation: "Average = (25 + 28 + 24 + 27 + 26)/5 = 26°C"
    },
    {
      question: `Based on the same temperature data:
What was the temperature range for the week?`,
      options: ["4°C", "3°C", "5°C", "2°C"],
      correctAnswer: 0,
      explanation: "Range = Highest - Lowest = 28 - 24 = 4°C"
    },
    {
      question: `Study the following expense data:
Monthly Expenses:
Rent: $800
Food: $400
Transport: $200
Entertainment: $100
Utilities: $300

What percentage of total expenses is spent on rent?`,
      options: ["44.4%", "40%", "45%", "42%"],
      correctAnswer: 0,
      explanation: "Total = $1800, Rent percentage = (800/1800) × 100 = 44.4%"
    },
    {
      question: `Based on the same expense data:
What is the ratio of Food to Transport expenses?`,
      options: ["2:1", "3:1", "4:1", "5:2"],
      correctAnswer: 0,
      explanation: "Food:Transport = 400:200 = 2:1"
    },
    {
      question: `Study the following test scores:
Subject Scores (out of 100):
Math: 85
Science: 92
English: 78
History: 88
Art: 95

Which subject had the second-highest score?`,
      options: ["Science", "Math", "History", "Art"],
      correctAnswer: 0,
      explanation: "Scores in descending order: Art(95), Science(92), History(88), Math(85), English(78)"
    },
    {
      question: `Based on the same test scores:
What is the difference between the highest and lowest scores?`,
      options: ["17", "15", "20", "10"],
      correctAnswer: 0,
      explanation: "Difference = Highest - Lowest = 95 - 78 = 17"
    },
    {
      question: `Study the following production data:
Daily Production (units):
Machine A: 150
Machine B: 200
Machine C: 175
Machine D: 225
Machine E: 250

What is the total daily production?`,
      options: ["1000 units", "950 units", "1050 units", "900 units"],
      correctAnswer: 0,
      explanation: "Total = 150 + 200 + 175 + 225 + 250 = 1000 units"
    },
    // Add 90 more questions here with increasing complexity...
  ];
}

export async function getPermutationCombinationQuestions(): Promise<Question[]> {
  return [
    {
      question: "In how many ways can 4 people be seated in a row?",
      options: ["24", "12", "16", "20"],
      correctAnswer: 0,
      explanation: "Number of permutations = 4! = 4 × 3 × 2 × 1 = 24"
    },
    {
      question: "How many 3-digit numbers can be formed using digits 1, 2, 3, 4 without repetition?",
      options: ["24", "12", "36", "48"],
      correctAnswer: 0,
      explanation: "This is a permutation: 4P3 = 4 × 3 × 2 = 24"
    },
    {
      question: "In how many ways can a team of 3 be selected from 10 players?",
      options: ["120", "720", "210", "45"],
      correctAnswer: 0,
      explanation: "This is a combination: 10C3 = (10 × 9 × 8)/(3 × 2 × 1) = 120"
    },
    {
      question: "How many ways can 2 boys and 2 girls be arranged in a row if boys must sit together?",
      options: ["12", "24", "48", "6"],
      correctAnswer: 0,
      explanation: "Consider boys as one unit: 3! × 2! = 12 ways"
    },
    {
      question: "From 6 different books, in how many ways can 3 books be selected?",
      options: ["20", "30", "15", "25"],
      correctAnswer: 0,
      explanation: "This is 6C3 = (6 × 5 × 4)/(3 × 2 × 1) = 20"
    },
    {
      question: "In how many ways can 5 different colored balls be arranged in a line?",
      options: ["120", "60", "24", "720"],
      correctAnswer: 0,
      explanation: "This is a permutation of 5 items: 5! = 5 × 4 × 3 × 2 × 1 = 120"
    },
    {
      question: "How many different 4-letter words can be formed from the word 'BOOK'?",
      options: ["12", "24", "4", "6"],
      correctAnswer: 0,
      explanation: "4!/(2!) = 12 (as O appears twice)"
    },
    {
      question: "In how many ways can 4 cards be selected from a deck of 52 cards?",
      options: ["270725", "270724", "270726", "270723"],
      correctAnswer: 0,
      explanation: "This is 52C4 = (52 × 51 × 50 × 49)/(4 × 3 × 2 × 1) = 270725"
    },
    {
      question: "How many 3-digit even numbers can be formed using digits 1, 2, 3, 4 without repetition?",
      options: ["12", "6", "8", "10"],
      correctAnswer: 0,
      explanation: "Last digit must be 2 or 4, then arrange remaining digits: 3 × 2 × 2 = 12"
    },
    {
      question: "In how many ways can 3 identical red balls and 2 identical blue balls be arranged in a line?",
      options: ["10", "12", "15", "20"],
      correctAnswer: 0,
      explanation: "5!/(3!×2!) = 10 (using repetition formula)"
    },
    // Add 90 more questions here with increasing complexity...
  ];
}

export async function getProbabilityQuestions(): Promise<Question[]> {
  return [
    {
      question: "A bag contains 3 red and 2 blue balls. What is the probability of drawing a red ball?",
      options: ["3/5", "2/5", "1/2", "2/3"],
      correctAnswer: 0,
      explanation: "Probability = Number of favorable outcomes/Total outcomes = 3/5"
    },
    {
      question: "Two dice are rolled. What is the probability of getting a sum of 7?",
      options: ["1/6", "1/8", "1/12", "1/36"],
      correctAnswer: 0,
      explanation: "There are 6 ways to get sum 7 out of 36 possible combinations, so probability = 6/36 = 1/6"
    },
    {
      question: "In a deck of 52 cards, what is the probability of drawing a face card?",
      options: ["12/52", "13/52", "4/52", "16/52"],
      correctAnswer: 0,
      explanation: "There are 12 face cards (J, Q, K) in a deck of 52 cards, so probability = 12/52"
    },
    {
      question: "If you flip a coin twice, what is the probability of getting at least one head?",
      options: ["3/4", "1/2", "1/4", "1/3"],
      correctAnswer: 0,
      explanation: "1 - P(no heads) = 1 - (1/2 × 1/2) = 3/4"
    },
    {
      question: "A box has 4 white and 6 black marbles. What is the probability of drawing a white marble?",
      options: ["2/5", "3/5", "1/2", "1/3"],
      correctAnswer: 0,
      explanation: "Probability = 4/(4+6) = 4/10 = 2/5"
    },
    {
      question: "In a class of 30 students, 18 are girls. If a student is chosen at random, what is the probability of selecting a boy?",
      options: ["0.4", "0.6", "0.5", "0.3"],
      correctAnswer: 0,
      explanation: "Number of boys = 12, Probability = 12/30 = 0.4"
    },
    {
      question: "When rolling a die, what is the probability of getting an even number?",
      options: ["1/2", "1/3", "2/3", "1/6"],
      correctAnswer: 0,
      explanation: "Even numbers on a die: 2,4,6. Probability = 3/6 = 1/2"
    },
    {
      question: "If you draw two cards from a deck, what is the probability of getting two aces?",
      options: ["1/221", "1/169", "1/121", "1/26"],
      correctAnswer: 0,
      explanation: "P(two aces) = (4/52) × (3/51) = 1/221"
    },
    {
      question: "Three coins are tossed. What is the probability of getting exactly two heads?",
      options: ["3/8", "1/2", "1/4", "1/8"],
      correctAnswer: 0,
      explanation: "Favorable outcomes (HHT,HTH,THH) = 3, Total outcomes = 8, P = 3/8"
    },
    {
      question: "In a bag with 5 red, 3 blue, and 2 green marbles, what is the probability of not drawing a red marble?",
      options: ["1/2", "3/5", "2/5", "1/3"],
      correctAnswer: 0,
      explanation: "Non-red marbles = 5, Total = 10, P = 5/10 = 1/2"
    },
    // Continue with 90 more probability questions with increasing complexity...
  ];
}