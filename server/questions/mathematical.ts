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
    // Add more ratio and proportion questions here...
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
    // Add 95 more geometry questions with increasing complexity...
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
    // Add more number system questions here...
  ];
}

export async function getDataInterpretationQuestions(): Promise<Question[]> {
  return [
    {
      question: `Study the graph showing sales data:
Monthly Sales (in units):
Jan: 100
Feb: 150
Mar: 200
Apr: 175
What was the percentage increase in sales from January to March?`,
      options: ["100%", "75%", "50%", "25%"],
      correctAnswer: 0,
      explanation: "Increase = 100 units, Percentage = (100/100) × 100 = 100%"
    },
    // Add more data interpretation questions here...
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
    // Add more permutation and combination questions here...
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
    // Add 95 more probability questions with increasing complexity...
  ];
}