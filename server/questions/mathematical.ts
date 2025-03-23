// Mathematical Questions Module
import { Question } from '../types';

export async function getAverageQuestions(): Promise<Question[]> {
  console.log('Loading Average questions...');
  return [
    {
      question: "What is the average of numbers: 15, 25, 35, 45, 55?",
      options: ["35", "30", "40", "45"],
      correctAnswer: 0,
      explanation: "Sum = 175, Count = 5, Average = 175/5 = 35"
    },
    {
      question: "The average of first 10 even numbers is:",
      options: ["11", "10", "12", "9"],
      correctAnswer: 0,
      explanation: "Even numbers: 2,4,6,8,10,12,14,16,18,20; Sum = 110, Average = 110/10 = 11"
    },
    {
      question: "Find the average of: 13, 15, 17, 19, 21",
      options: ["17", "16", "18", "15"],
      correctAnswer: 0,
      explanation: "Sum = 85, Count = 5, Average = 85/5 = 17"
    },
    {
      question: "What is the mean of: 22, 24, 26, 28, 30?",
      options: ["26", "25", "27", "24"],
      correctAnswer: 0,
      explanation: "Sum = 130, Count = 5, Mean = 130/5 = 26"
    },
    {
      question: "Calculate the average: 100, 200, 300, 400, 500",
      options: ["300", "250", "350", "400"],
      correctAnswer: 0,
      explanation: "Sum = 1500, Count = 5, Average = 1500/5 = 300"
    },
    {
      question: "Find the mean: 5, 10, 15, 20, 25",
      options: ["15", "12", "18", "20"],
      correctAnswer: 0,
      explanation: "Sum = 75, Count = 5, Mean = 75/5 = 15"
    },
    {
      question: "Average of: 2, 4, 6, 8, 10",
      options: ["6", "5", "7", "8"],
      correctAnswer: 0,
      explanation: "Sum = 30, Count = 5, Average = 30/5 = 6"
    },
    {
      question: "Mean of numbers: 33, 35, 37, 39, 41",
      options: ["37", "36", "38", "35"],
      correctAnswer: 0,
      explanation: "Sum = 185, Count = 5, Mean = 185/5 = 37"
    },
    {
      question: "Calculate average: 50, 60, 70, 80, 90",
      options: ["70", "65", "75", "80"],
      correctAnswer: 0,
      explanation: "Sum = 350, Count = 5, Average = 350/5 = 70"
    },
    {
      question: "Find mean: 1000, 2000, 3000, 4000, 5000",
      options: ["3000", "2500", "3500", "4000"],
      correctAnswer: 0,
      explanation: "Sum = 15000, Count = 5, Mean = 15000/5 = 3000"
    },
    {
      question: "Average of first 5 multiples of 7 is:",
      options: ["21", "28", "35", "42"],
      correctAnswer: 0,
      explanation: "Multiples: 7,14,21,28,35; Sum = 105, Average = 105/5 = 21"
    }
  ];
}

export async function getRatioProportionQuestions(): Promise<Question[]> {
  console.log('Loading Ratio and Proportion questions...');
  return [
    {
      question: "If the ratio of boys to girls in a class is 3:2 and there are 30 boys, how many girls are there?",
      options: ["20", "25", "15", "10"],
      correctAnswer: 0,
      explanation: "If 3 parts = 30, then 1 part = 10, so 2 parts (girls) = 20"
    },
    {
        question: "A recipe calls for 2 cups of flour and 1 cup of sugar. If you want to use 6 cups of flour, how many cups of sugar do you need?",
        options: ["3", "2", "4", "1"],
        correctAnswer: 0,
        explanation: "The ratio of flour to sugar is 2:1.  If you have 6 cups of flour (3 times 2), you need 3 cups of sugar (3 times 1)."
      },
      {
        question: "If a car travels 150 miles in 3 hours, how many miles will it travel in 5 hours at the same speed?",
        options: ["250", "200", "100", "300"],
        correctAnswer: 0,
        explanation: "The car travels 50 miles per hour (150 miles / 3 hours). In 5 hours it will travel 250 miles (50 miles/hour * 5 hours)."
      },
      {
        question: "The ratio of apples to oranges in a basket is 4:3. If there are 12 oranges, how many apples are there?",
        options: ["16", "8", "12", "24"],
        correctAnswer: 0,
        explanation: "If 3 parts (oranges) = 12, then 1 part = 4.  There are 16 apples (4 parts * 4)."
      },
      {
        question: "A map has a scale of 1 cm: 10 km. If the distance between two cities on the map is 5 cm, what is the actual distance?",
        options: ["50 km", "2 km", "15 km", "25 km"],
        correctAnswer: 0,
        explanation: "The actual distance is 5 cm * 10 km/cm = 50 km."
      },
      {
        question: "Two numbers are in the ratio 5:7. If their sum is 48, what are the numbers?",
        options: ["20, 28", "15, 33", "10, 38", "24, 24"],
        correctAnswer: 0,
        explanation: "The sum of the ratio parts is 5 + 7 = 12.  Each part is 48/12 = 4. The numbers are 5 * 4 = 20 and 7 * 4 = 28."
      },
      {
        question: "If 3 workers can complete a job in 6 days, how many days will it take 2 workers to complete the same job?",
        options: ["9", "3", "18", "12"],
        correctAnswer: 0,
        explanation: "The total work is 3 workers * 6 days = 18 worker-days.  If 2 workers do the job, it will take 18 worker-days / 2 workers = 9 days."
      },
        {
        question: "A mixture contains milk and water in the ratio 3:1. If the total volume is 20 liters, what is the volume of milk?",
        options: ["15 liters", "10 liters", "5 liters", "2 liters"],
        correctAnswer: 0,
        explanation: "The ratio parts sum to 4.  Each part is 20 liters / 4 = 5 liters.  Milk is 3 * 5 = 15 liters."
      },
       {
        question: "If x/y = 2/3 and x + y = 10, what is the value of x?",
        options: ["4", "6", "2", "8"],
        correctAnswer: 0,
        explanation: "x = (2/5) * 10 = 4,  y = (3/5) * 10 = 6. x + y = 10"
      },
      {
        question: "The ratio of red marbles to blue marbles is 5:2. If there are 14 marbles in total, how many are red?",
        options: ["10", "7", "4", "5"],
        correctAnswer: 0,
        explanation: "The ratio parts sum to 7. Each part is worth 14/7 = 2. There are 5 * 2 = 10 red marbles"
      }
  ];
}

export async function getGeometryQuestions(): Promise<Question[]> {
  console.log('Loading Geometry questions...');
  return [
    {
      question: "What is the area of a rectangle with length 8m and width 6m?",
      options: ["48 sq m", "42 sq m", "54 sq m", "36 sq m"],
      correctAnswer: 0,
      explanation: "Area of rectangle = length × width = 8 × 6 = 48 sq m"
    },
    {
        question: "What is the perimeter of a square with sides of length 5 cm?",
        options: ["20 cm", "15 cm", "25 cm", "10 cm"],
        correctAnswer: 0,
        explanation: "Perimeter of a square = 4 * side length = 4 * 5 cm = 20 cm"
      },
      {
        question: "A circle has a radius of 7 cm. What is its area (use π = 22/7)?",
        options: ["154 sq cm", "144 sq cm", "164 sq cm", "174 sq cm"],
        correctAnswer: 0,
        explanation: "Area of a circle = π * radius² = (22/7) * 7² = 154 sq cm"
      },
      {
        question: "What is the volume of a cube with sides of length 4 cm?",
        options: ["64 cubic cm", "48 cubic cm", "32 cubic cm", "16 cubic cm"],
        correctAnswer: 0,
        explanation: "Volume of a cube = side³ = 4³ = 64 cubic cm"
      },
      {
        question: "A triangle has a base of 10 cm and a height of 6 cm. What is its area?",
        options: ["30 sq cm", "60 sq cm", "20 sq cm", "16 sq cm"],
        correctAnswer: 0,
        explanation: "Area of a triangle = (1/2) * base * height = (1/2) * 10 cm * 6 cm = 30 sq cm"
      },
      {
        question: "What is the circumference of a circle with a diameter of 14 cm (use π = 22/7)?",
        options: ["44 cm", "22 cm", "88 cm", "33 cm"],
        correctAnswer: 0,
        explanation: "Circumference of a circle = π * diameter = (22/7) * 14 cm = 44 cm"
      },
      {
        question: "A rectangle has a length of 12 cm and a width of 8 cm. What is its area?",
        options: ["96 sq cm", "40 sq cm", "20 sq cm", "48 sq cm"],
        correctAnswer: 0,
        explanation: "Area of a rectangle = length * width = 12 cm * 8 cm = 96 sq cm"
      },
      {
        question: "A right-angled triangle has sides of length 3 cm, 4 cm, and 5 cm. What is its area?",
        options: ["6 sq cm", "10 sq cm", "12 sq cm", "15 sq cm"],
        correctAnswer: 0,
        explanation: "Area of a triangle = (1/2) * base * height = (1/2) * 3 cm * 4 cm = 6 sq cm"
      },
      {
        question: "What is the perimeter of a rectangle with length 7 cm and width 5 cm?",
        options: ["24 cm", "35 cm", "12 cm", "30 cm"],
        correctAnswer: 0,
        explanation: "Perimeter of a rectangle = 2 * (length + width) = 2 * (7 cm + 5 cm) = 24 cm"
      },
      {
        question: "What is the diameter of a circle with a radius of 6 meters?",
        options: ["12 meters", "3 meters", "6 meters", "18 meters"],
        correctAnswer: 0,
        explanation: "Diameter = 2 * radius = 2 * 6 meters = 12 meters"
      }
  ];
}

export async function getNumberQuestions(): Promise<Question[]> {
  console.log('Loading Number System questions...');
  return [
    {
      question: "What is the least number that should be added to 1056 to make it perfectly divisible by 23?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 0,
      explanation: "1056 ÷ 23 = 45.91..., so add 2 to make it 1058 (perfectly divisible by 23)"
    },
    {
        question: "What is the prime factorization of 36?",
        options: ["2² * 3²", "2 * 3 * 6", "2 * 18", "3 * 12"],
        correctAnswer: 0,
        explanation: "36 = 2 * 2 * 3 * 3 = 2² * 3²"
      },
      {
        question: "What is the greatest common divisor (GCD) of 12 and 18?",
        options: ["6", "3", "4", "2"],
        correctAnswer: 0,
        explanation: "The factors of 12 are 1, 2, 3, 4, 6, 12. The factors of 18 are 1, 2, 3, 6, 9, 18. The GCD is 6."
      },
      {
        question: "What is the least common multiple (LCM) of 4 and 6?",
        options: ["12", "24", "2", "6"],
        correctAnswer: 0,
        explanation: "Multiples of 4: 4, 8, 12, 16... Multiples of 6: 6, 12, 18... The LCM is 12."
      },
      {
        question: "What is the square root of 64?",
        options: ["8", "4", "16", "32"],
        correctAnswer: 0,
        explanation: "8 * 8 = 64"
      },
      {
        question: "What is 15% of 200?",
        options: ["30", "15", "20", "10"],
        correctAnswer: 0,
        explanation: "(15/100) * 200 = 30"
      },
      {
        question: "What is the next number in the sequence: 2, 4, 6, 8, ...?",
        options: ["10", "9", "11", "12"],
        correctAnswer: 0,
        explanation: "This is an arithmetic sequence with a common difference of 2."
      },
      {
        question: "Simplify the fraction 12/18.",
        options: ["2/3", "3/2", "1/2", "6/9"],
        correctAnswer: 0,
        explanation: "Divide both numerator and denominator by their greatest common divisor (GCD), which is 6."
      },
      {
        question: "What is the sum of the digits in the number 5783?",
        options: ["23", "22", "24", "21"],
        correctAnswer: 0,
        explanation: "5 + 7 + 8 + 3 = 23"
      },
      {
        question: "What is 25% expressed as a fraction?",
        options: ["1/4", "1/2", "1/5", "3/4"],
        correctAnswer: 0,
        explanation: "25% = 25/100 = 1/4"
      }
  ];
}

export async function getDataInterpretationQuestions(): Promise<Question[]> {
  console.log('Loading Data Interpretation questions...');
  return [
    {
      question: `Study the graph showing sales of a company:
Jan: 100 units
Feb: 150 units
Mar: 200 units
Apr: 175 units
What was the percentage increase in sales from January to March?`,
      options: ["100%", "75%", "50%", "25%"],
      correctAnswer: 0,
      explanation: "Increase = 100 units, Percentage = (100/100) × 100 = 100%"
    },
    {
        question: `The following table shows the number of books sold in a bookstore over four days:

Day | Books Sold
---|---
Monday | 25
Tuesday | 30
Wednesday | 20
Thursday | 35

What is the average number of books sold per day?`,
        options: ["27.5", "30", "25", "35"],
        correctAnswer: 0,
        explanation: "(25 + 30 + 20 + 35) / 4 = 27.5"
      },
      {
        question: `A pie chart shows the following distribution of expenses:

Rent: 25%
Food: 30%
Transportation: 15%
Entertainment: 30%

If the total monthly expenses are $2000, how much is spent on food?`,
        options: ["$600", "$500", "$300", "$400"],
        correctAnswer: 0,
        explanation: "Food expenses = 30% of $2000 = 0.3 * $2000 = $600"
      },
      {
        question: `The bar graph below shows the number of students in different classes:

Class | Number of Students
---|---
A | 20
B | 25
C | 15
D | 30

How many more students are in class D than in class A?`,
        options: ["10", "5", "15", "20"],
        correctAnswer: 0,
        explanation: "Difference = 30 - 20 = 10"
      },
      {
        question: `A line graph shows the temperature over a week:

Day | Temperature (°C)
---|---
Monday | 20
Tuesday | 22
Wednesday | 25
Thursday | 23
Friday | 21
Saturday | 18
Sunday | 19

What was the highest temperature recorded during the week?`,
        options: ["25°C", "23°C", "22°C", "20°C"],
        correctAnswer: 0,
        explanation: "The highest temperature was 25°C"
      },
      {
        question: `The table below displays sales figures for a company:

Year | Sales (in millions)
---|---
2020 | 10
2021 | 12
2022 | 15
2023 | 18

What was the percentage increase in sales from 2020 to 2023?`,
        options: ["80%", "60%", "40%", "20%"],
        correctAnswer: 0,
        explanation: "Increase in sales = 18 - 10 = 8; Percentage increase = (8/10) * 100% = 80%"
      },
      {
        question: `A scatter plot shows a strong positive correlation between study hours and exam scores. What does this imply?`,
        options: ["More study hours tend to lead to higher exam scores", "There is no relationship between study hours and exam scores", "More study hours tend to lead to lower exam scores", "Study hours have no impact on exam scores."],
        correctAnswer: 0,
        explanation: "A strong positive correlation means that as one variable increases, the other tends to increase as well."
      },
      {
        question: `A histogram shows the distribution of ages in a population. What type of data does a histogram display?`,
        options: ["Continuous Data", "Categorical Data", "Nominal Data", "Ordinal Data"],
        correctAnswer: 0,
        explanation: "Histograms display continuous data, often grouped into intervals (bins)."
      },
      {
        question: `Box and whisker plots are commonly used to show what kind of data?`,
        options: ["Distribution of data, including median, quartiles, and outliers", "The frequency of data values within specific ranges", "The relationship between two variables", "The correlation between two sets of data"],
        correctAnswer: 0,
        explanation: "Box and whisker plots display the distribution of data, including median, quartiles, and outliers."
      },
      {
        question: `A frequency distribution table shows the number of occurrences of specific data values or ranges. What is the purpose of a cumulative frequency column?`,
        options: ["It shows the running total of frequencies", "It indicates the individual frequency of each data point", "It highlights the most frequent data value", "It indicates the variance of the data"],
        correctAnswer: 0,
        explanation: "A cumulative frequency column shows the running total of frequencies."
      }
  ];
}

export async function getPermutationCombinationQuestions(): Promise<Question[]> {
  console.log('Loading Permutation and Combination questions...');
  return [
    {
      question: "In how many ways can 4 people be seated in a row?",
      options: ["24", "12", "16", "20"],
      correctAnswer: 0,
      explanation: "Number of permutations = 4! = 4 × 3 × 2 × 1 = 24"
    },
    {
        question: "How many ways can you choose 2 items from a set of 5 items?",
        options: ["10", "20", "25", "5"],
        correctAnswer: 0,
        explanation: "This is a combination problem: 5C2 = 5! / (2! * 3!) = 10"
      },
      {
        question: "In how many ways can 3 distinct books be arranged on a shelf?",
        options: ["6", "3", "9", "12"],
        correctAnswer: 0,
        explanation: "This is a permutation problem: 3! = 3 * 2 * 1 = 6"
      },
      {
        question: "How many different 3-digit numbers can be formed using the digits 1, 2, and 3 without repetition?",
        options: ["6", "3", "9", "12"],
        correctAnswer: 0,
        explanation: "This is a permutation problem: 3! = 3 * 2 * 1 = 6"
      },
      {
        question: "A committee of 3 people is to be selected from a group of 5 people. How many different committees are possible?",
        options: ["10", "15", "20", "5"],
        correctAnswer: 0,
        explanation: "This is a combination problem: 5C3 = 5! / (3! * 2!) = 10"
      },
      {
        question: "In how many ways can the letters in the word 'CAT' be arranged?",
        options: ["6", "3", "2", "1"],
        correctAnswer: 0,
        explanation: "3! = 6"
      },
      {
        question: "How many different ways can you arrange the letters of the word 'MATH'?",
        options: ["24", "12", "6", "4"],
        correctAnswer: 0,
        explanation: "4! = 24"
      },
      {
        question: "A bag contains 4 red balls and 3 blue balls. In how many ways can you select 2 red balls?",
        options: ["6", "3", "4", "1"],
        correctAnswer: 0,
        explanation: "4C2 = 4! / (2! * 2!) = 6"
      },
      {
        question: "How many 3-letter words can be formed from the letters A, B, C, and D if repetition is allowed?",
        options: ["64", "24", "16", "4"],
        correctAnswer: 0,
        explanation: "4 * 4 * 4 = 64"
      },
      {
        question: "In how many ways can you arrange 5 distinct objects in a circular arrangement?",
        options: ["24", "120", "12", "60"],
        correctAnswer: 0,
        explanation: "(5 - 1)! = 4! = 24"
      }
  ];
}

export async function getProbabilityQuestions(): Promise<Question[]> {
  console.log('Loading Probability questions...');
  return [
    {
      question: "A bag contains 3 red and 2 blue balls. What is the probability of drawing a red ball?",
      options: ["3/5", "2/5", "1/2", "2/3"],
      correctAnswer: 0,
      explanation: "Probability = Number of favorable outcomes/Total outcomes = 3/5"
    },
    {
        question: "What is the probability of rolling a 6 on a standard six-sided die?",
        options: ["1/6", "1/2", "1/3", "1/4"],
        correctAnswer: 0,
        explanation: "There is only one 6 on a six-sided die."
      },
      {
        question: "A coin is flipped twice. What is the probability of getting two heads?",
        options: ["1/4", "1/2", "1/3", "2/3"],
        correctAnswer: 0,
        explanation: "The possible outcomes are HH, HT, TH, TT.  The probability of HH is 1/4."
      },
      {
        question: "A bag contains 5 red marbles and 3 green marbles. If you pick one marble at random, what is the probability of selecting a green marble?",
        options: ["3/8", "5/8", "1/2", "2/3"],
        correctAnswer: 0,
        explanation: "Probability = (Number of green marbles) / (Total number of marbles) = 3/8"
      },
      {
        question: "A deck of cards has 52 cards. What is the probability of drawing a king?",
        options: ["1/13", "1/4", "1/52", "4/52"],
        correctAnswer: 0,
        explanation: "There are 4 kings in a deck of 52 cards. Probability = 4/52 = 1/13"
      },
      {
        question: "Two coins are tossed. What is the probability of getting at least one head?",
        options: ["3/4", "1/2", "1/4", "2/3"],
        correctAnswer: 0,
        explanation: "The possible outcomes are HH, HT, TH, TT.  Three of these have at least one head. Probability = 3/4"
      },
      {
        question: "What is the probability of drawing a queen or a king from a standard deck of cards?",
        options: ["2/13", "4/13", "1/13", "1/26"],
        correctAnswer: 0,
        explanation: "There are 4 queens and 4 kings. Probability = (4 + 4) / 52 = 8/52 = 2/13"
      },
      {
        question: "A bag contains 7 blue balls and 3 red balls. If you pick two balls without replacement, what is the probability that both are blue?",
        options: ["7/15", "42/100", "7/10", "21/50"],
        correctAnswer: 0,
        explanation: "The probability of the first ball being blue is 7/10.  After picking one blue ball, there are 6 blue balls left out of 9 total balls. The probability of the second ball being blue is 6/9.  The probability of both being blue is (7/10) * (6/9) = 42/90 = 7/15"
      },
      {
        question: "If you roll a die, what is the probability of getting an even number?",
        options: ["1/2", "1/3", "1/4", "1/6"],
        correctAnswer: 0,
        explanation: "There are 3 even numbers (2, 4, 6) on a six-sided die. Probability = 3/6 = 1/2"
      },
      {
        question: "A box contains 5 red pens and 2 blue pens. What is the probability of randomly selecting a blue pen?",
        options: ["2/7", "5/7", "1/2", "2/5"],
        correctAnswer: 0,
        explanation: "Probability = (Number of blue pens) / (Total number of pens) = 2/7"
      }

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
    }
  ];
}

export async function getInterestQuestions(): Promise<Question[]> {
  return [
    {
      question: "What is the simple interest on $1000 at 5% per annum for 2 years?",
      options: ["$100", "$150", "$200", "$250"],
      correctAnswer: 0,
      explanation: "Simple Interest = (Principal × Rate × Time)/100 = (1000 × 5 × 2)/100 = $100"
    }
  ];
}

export async function getTimeWorkQuestions(): Promise<Question[]> {
  return [
    {
      question: "If 6 men can do a piece of work in 12 days, in how many days can 4 men do the same work?",
      options: ["18", "16", "20", "15"],
      correctAnswer: 0,
      explanation: "Using inverse proportion: (6 × 12)/4 = 18 days"
    }
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
    }
  ];
}

export async function getRatioProportionQuestions(): Promise<Question[]> {
  console.log('Loading Ratio and Proportion questions...');
  return [
    {
      question: "If the ratio of boys to girls in a class is 3:2 and there are 30 boys, how many girls are there?",
      options: ["20", "25", "15", "10"],
      correctAnswer: 0,
      explanation: "If 3 parts = 30, then 1 part = 10, so 2 parts (girls) = 20"
    },
    {
        question: "A recipe calls for 2 cups of flour and 1 cup of sugar. If you want to use 6 cups of flour, how many cups of sugar do you need?",
        options: ["3", "2", "4", "1"],
        correctAnswer: 0,
        explanation: "The ratio of flour to sugar is 2:1.  If you have 6 cups of flour (3 times 2), you need 3 cups of sugar (3 times 1)."
      },
      {
        question: "If a car travels 150 miles in 3 hours, how many miles will it travel in 5 hours at the same speed?",
        options: ["250", "200", "100", "300"],
        correctAnswer: 0,
        explanation: "The car travels 50 miles per hour (150 miles / 3 hours). In 5 hours it will travel 250 miles (50 miles/hour * 5 hours)."
      },
      {
        question: "The ratio of apples to oranges in a basket is 4:3. If there are 12 oranges, how many apples are there?",
        options: ["16", "8", "12", "24"],
        correctAnswer: 0,
        explanation: "If 3 parts (oranges) = 12, then 1 part = 4.  There are 16 apples (4 parts * 4)."
      },
      {
        question: "A map has a scale of 1 cm: 10 km. If the distance between two cities on the map is 5 cm, what is the actual distance?",
        options: ["50 km", "2 km", "15 km", "25 km"],
        correctAnswer: 0,
        explanation: "The actual distance is 5 cm * 10 km/cm = 50 km."
      },
      {
        question: "Two numbers are in the ratio 5:7. If their sum is 48, what are the numbers?",
        options: ["20, 28", "15, 33", "10, 38", "24, 24"],
        correctAnswer: 0,
        explanation: "The sum of the ratio parts is 5 + 7 = 12.  Each part is 48/12 = 4. The numbers are 5 * 4 = 20 and 7 * 4 = 28."
      },
      {
        question: "If 3 workers can complete a job in 6 days, how many days will it take 2 workers to complete the same job?",
        options: ["9", "3", "18", "12"],
        correctAnswer: 0,
        explanation: "The total work is 3 workers * 6 days = 18 worker-days.  If 2 workers do the job, it will take 18 worker-days / 2 workers = 9 days."
      },
        {
        question: "A mixture contains milk and water in the ratio 3:1. If the total volume is 20 liters, what is the volume of milk?",
        options: ["15 liters", "10 liters", "5 liters", "2 liters"],
        correctAnswer: 0,
        explanation: "The ratio parts sum to 4.  Each part is 20 liters / 4 = 5 liters.  Milk is 3 * 5 = 15 liters."
      },
       {
        question: "If x/y = 2/3 and x + y = 10, what is the value of x?",
        options: ["4", "6", "2", "8"],
        correctAnswer: 0,
        explanation: "x = (2/5) * 10 = 4,  y = (3/5) * 10 = 6. x + y = 10"
      },
      {
        question: "The ratio of red marbles to blue marbles is 5:2. If there are 14 marbles in total, how many are red?",
        options: ["10", "7", "4", "5"],
        correctAnswer: 0,
        explanation: "The ratio parts sum to 7. Each part is worth 14/7 = 2. There are 5 * 2 = 10 red marbles"
      }
  ];
}

export async function getGeometryQuestions(): Promise<Question[]> {
  console.log('Loading Geometry questions...');
  return [
    {
      question: "What is the area of a rectangle with length 8m and width 6m?",
      options: ["48 sq m", "42 sq m", "54 sq m", "36 sq m"],
      correctAnswer: 0,
      explanation: "Area of rectangle = length × width = 8 × 6 = 48 sq m"
    },
    {
        question: "What is the perimeter of a square with sides of length 5 cm?",
        options: ["20 cm", "15 cm", "25 cm", "10 cm"],
        correctAnswer: 0,
        explanation: "Perimeter of a square = 4 * side length = 4 * 5 cm = 20 cm"
      },
      {
        question: "A circle has a radius of 7 cm. What is its area (use π = 22/7)?",
        options: ["154 sq cm", "144 sq cm", "164 sq cm", "174 sq cm"],
        correctAnswer: 0,
        explanation: "Area of a circle = π * radius² = (22/7) * 7² = 154 sq cm"
      },
      {
        question: "What is the volume of a cube with sides of length 4 cm?",
        options: ["64 cubic cm", "48 cubic cm", "32 cubic cm", "16 cubic cm"],
        correctAnswer: 0,
        explanation: "Volume of a cube = side³ = 4³ = 64 cubic cm"
      },
      {
        question: "A triangle has a base of 10 cm and a height of 6 cm. What is its area?",
        options: ["30 sq cm", "60 sq cm", "20 sq cm", "16 sq cm"],
        correctAnswer: 0,
        explanation: "Area of a triangle = (1/2) * base * height = (1/2) * 10 cm * 6 cm = 30 sq cm"
      },
      {
        question: "What is the circumference of a circle with a diameter of 14 cm (use π = 22/7)?",
        options: ["44 cm", "22 cm", "88 cm", "33 cm"],
        correctAnswer: 0,
        explanation: "Circumference of a circle = π * diameter = (22/7) * 14 cm = 44 cm"
      },
      {
        question: "A rectangle has a length of 12 cm and a width of 8 cm. What is its area?",
        options: ["96 sq cm", "40 sq cm", "20 sq cm", "48 sq cm"],
        correctAnswer: 0,
        explanation: "Area of a rectangle = length * width = 12 cm * 8 cm = 96 sq cm"
      },
      {
        question: "A right-angled triangle has sides of length 3 cm, 4 cm, and 5 cm. What is its area?",
        options: ["6 sq cm", "10 sq cm", "12 sq cm", "15 sq cm"],
        correctAnswer: 0,
        explanation: "Area of a triangle = (1/2) * base * height = (1/2) * 3 cm * 4 cm = 6 sq cm"
      },
      {
        question: "What is the perimeter of a rectangle with length 7 cm and width 5 cm?",
        options: ["24 cm", "35 cm", "12 cm", "30 cm"],
        correctAnswer: 0,
        explanation: "Perimeter of a rectangle = 2 * (length + width) = 2 * (7 cm + 5 cm) = 24 cm"
      },
      {
        question: "What is the diameter of a circle with a radius of 6 meters?",
        options: ["12 meters", "3 meters", "6 meters", "18 meters"],
        correctAnswer: 0,
        explanation: "Diameter = 2 * radius = 2 * 6 meters = 12 meters"
      }
  ];
}

export async function getNumberQuestions(): Promise<Question[]> {
  console.log('Loading Number System questions...');
  return [
    {
      question: "What is the least number that should be added to 1056 to make it perfectly divisible by 23?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 0,
      explanation: "1056 ÷ 23 = 45.91..., so add 2 to make it 1058 (perfectly divisible by 23)"
    },
    {
        question: "What is the prime factorization of 36?",
        options: ["2² * 3²", "2 * 3 * 6", "2 * 18", "3 * 12"],
        correctAnswer: 0,
        explanation: "36 = 2 * 2 * 3 * 3 = 2² * 3²"
      },
      {
        question: "What is the greatest common divisor (GCD) of 12 and 18?",
        options: ["6", "3", "4", "2"],
        correctAnswer: 0,
        explanation: "The factors of 12 are 1, 2, 3, 4, 6, 12. The factors of 18 are 1, 2, 3, 6, 9, 18. The GCD is 6."
      },
      {
        question: "What is the least common multiple (LCM) of 4 and 6?",
        options: ["12", "24", "2", "6"],
        correctAnswer: 0,
        explanation: "Multiples of 4: 4, 8, 12, 16... Multiples of 6: 6, 12, 18... The LCM is 12."
      },
      {
        question: "What is the square root of 64?",
        options: ["8", "4", "16", "32"],
        correctAnswer: 0,
        explanation: "8 * 8 = 64"
      },
      {
        question: "What is 15% of 200?",
        options: ["30", "15", "20", "10"],
        correctAnswer: 0,
        explanation: "(15/100) * 200 = 30"
      },
      {
        question: "What is the next number in the sequence: 2, 4, 6, 8, ...?",
        options: ["10", "9", "11", "12"],
        correctAnswer: 0,
        explanation: "This is an arithmetic sequence with a common difference of 2."
      },
      {
        question: "Simplify the fraction 12/18.",
        options: ["2/3", "3/2", "1/2", "6/9"],
        correctAnswer: 0,
        explanation: "Divide both numerator and denominator by their greatest common divisor (GCD), which is 6."
      },
      {
        question: "What is the sum of the digits in the number 5783?",
        options: ["23", "22", "24", "21"],
        correctAnswer: 0,
        explanation: "5 + 7 + 8 + 3 = 23"
      },
      {
        question: "What is 25% expressed as a fraction?",
        options: ["1/4", "1/2", "1/5", "3/4"],
        correctAnswer: 0,
        explanation: "25% = 25/100 = 1/4"
      }
  ];
}

export async function getDataInterpretationQuestions(): Promise<Question[]> {
  console.log('Loading Data Interpretation questions...');
  return [
    {
      question: `Study the graph showing sales of a company:
Jan: 100 units
Feb: 150 units
Mar: 200 units
Apr: 175 units
What was the percentage increase in sales from January to March?`,
      options: ["100%", "75%", "50%", "25%"],
      correctAnswer: 0,
      explanation: "Increase = 100 units, Percentage = (100/100) × 100 = 100%"
    },
    {
        question: `The following table shows the number of books sold in a bookstore over four days:

Day | Books Sold
---|---
Monday | 25
Tuesday | 30
Wednesday | 20
Thursday | 35

What is the average number of books sold per day?`,
        options: ["27.5", "30", "25", "35"],
        correctAnswer: 0,
        explanation: "(25 + 30 + 20 + 35) / 4 = 27.5"
      },
      {
        question: `A pie chart shows the following distribution of expenses:

Rent: 25%
Food: 30%
Transportation: 15%
Entertainment: 30%

If the total monthly expenses are $2000, how much is spent on food?`,
        options: ["$600", "$500", "$300", "$400"],
        correctAnswer: 0,
        explanation: "Food expenses = 30% of $2000 = 0.3 * $2000 = $600"
      },
      {
        question: `The bar graph below shows the number of students in different classes:

Class | Number of Students
---|---
A | 20
B | 25
C | 15
D | 30

How many more students are in class D than in class A?`,
        options: ["10", "5", "15", "20"],
        correctAnswer: 0,
        explanation: "Difference = 30 - 20 = 10"
      },
      {
        question: `A line graph shows the temperature over a week:

Day | Temperature (°C)
---|---
Monday | 20
Tuesday | 22
Wednesday | 25
Thursday | 23
Friday | 21
Saturday | 18
Sunday | 19

What was the highest temperature recorded during the week?`,
        options: ["25°C", "23°C", "22°C", "20°C"],
        correctAnswer: 0,
        explanation: "The highest temperature was 25°C"
      },
      {
        question: `The table below displays sales figures for a company:

Year | Sales (in millions)
---|---
2020 | 10
2021 | 12
2022 | 15
2023 | 18

What was the percentage increase in sales from 2020 to 2023?`,
        options: ["80%", "60%", "40%", "20%"],
        correctAnswer: 0,
        explanation: "Increase in sales = 18 - 10 = 8; Percentage increase = (8/10) * 100% = 80%"
      },
      {
        question: `A scatter plot shows a strong positive correlation between study hours and exam scores. What does this imply?`,
        options: ["More study hours tend to lead to higher exam scores", "There is no relationship between study hours and exam scores", "More study hours tend to lead to lower exam scores", "Study hours have no impact on exam scores."],
        correctAnswer: 0,
        explanation: "A strong positive correlation means that as one variable increases, the other tends to increase as well."
      },
      {
        question: `A histogram shows the distribution of ages in a population. What type of data does a histogram display?`,
        options: ["Continuous Data", "Categorical Data", "Nominal Data", "Ordinal Data"],
        correctAnswer: 0,
        explanation: "Histograms display continuous data, often grouped into intervals (bins)."
      },
      {
        question: `Box and whisker plots are commonly used to show what kind of data?`,
        options: ["Distribution of data, including median, quartiles, and outliers", "The frequency of data values within specific ranges", "The relationship between two variables", "The correlation between two sets of data"],
        correctAnswer: 0,
        explanation: "Box and whisker plots display the distribution of data, including median, quartiles, and outliers."
      },
      {
        question: `A frequency distribution table shows the number of occurrences of specific data values or ranges. What is the purpose of a cumulative frequency column?`,
        options: ["It shows the running total of frequencies", "It indicates the individual frequency of each data point", "It highlights the most frequent data value", "It indicates the variance of the data"],
        correctAnswer: 0,
        explanation: "A cumulative frequency column shows the running total of frequencies."
      }
  ];
}

export async function getPermutationCombinationQuestions(): Promise<Question[]> {
  console.log('Loading Permutation and Combination questions...');
  return [
    {
      question: "In how many ways can 4 people be seated in a row?",
      options: ["24", "12", "16", "20"],
      correctAnswer: 0,
      explanation: "Number of permutations = 4! = 4 × 3 × 2 × 1 = 24"
    },
    {
        question: "How many ways can you choose 2 items from a set of 5 items?",
        options: ["10", "20", "25", "5"],
        correctAnswer: 0,
        explanation: "This is a combination problem: 5C2 = 5! / (2! * 3!) = 10"
      },
      {
        question: "In how many ways can 3 distinct books be arranged on a shelf?",
        options: ["6", "3", "9", "12"],
        correctAnswer: 0,
        explanation: "This is a permutation problem: 3! = 3 * 2 * 1 = 6"
      },
      {
        question: "How many different 3-digit numbers can be formed using the digits 1, 2, and 3 without repetition?",
        options: ["6", "3", "9", "12"],
        correctAnswer: 0,
        explanation: "This is a permutation problem: 3! = 3 * 2 * 1 = 6"
      },
      {
        question: "A committee of 3 people is to be selected from a group of 5 people. How many different committees are possible?",
        options: ["10", "15", "20", "5"],
        correctAnswer: 0,
        explanation: "This is a combination problem: 5C3 = 5! / (3! * 2!) = 10"
      },
      {
        question: "In how many ways can the letters in the word 'CAT' be arranged?",
        options: ["6", "3", "2", "1"],
        correctAnswer: 0,
        explanation: "3! = 6"
      },
      {
        question: "How many different ways can you arrange the letters of the word 'MATH'?",
        options: ["24", "12", "6", "4"],
        correctAnswer: 0,
        explanation: "4! = 24"
      },
      {
        question: "A bag contains 4 red balls and 3 blue balls. In how many ways can you select 2 red balls?",
        options: ["6", "3", "4", "1"],
        correctAnswer: 0,
        explanation: "4C2 = 4! / (2! * 2!) = 6"
      },
      {
        question: "How many 3-letter words can be formed from the letters A, B, C, and D if repetition is allowed?",
        options: ["64", "24", "16", "4"],
        correctAnswer: 0,
        explanation: "4 * 4 * 4 = 64"
      },
      {
        question: "In how many ways can you arrange 5 distinct objects in a circular arrangement?",
        options: ["24", "120", "12", "60"],
        correctAnswer: 0,
        explanation: "(5 - 1)! = 4! = 24"
      }
  ];
}

export async function getProbabilityQuestions(): Promise<Question[]> {
  console.log('Loading Probability questions...');
  return [
    {
      question: "A bag contains 3 red and 2 blue balls. What is the probability of drawing a red ball?",
      options: ["3/5", "2/5", "1/2", "2/3"],
      correctAnswer: 0,
      explanation: "Probability = Number of favorable outcomes/Total outcomes = 3/5"
    },
    {
        question: "What is the probability of rolling a 6 on a standard six-sided die?",
        options: ["1/6", "1/2", "1/3", "1/4"],
        correctAnswer: 0,
        explanation: "There is only one 6 on a six-sided die."
      },
      {
        question: "A coin is flipped twice. What is the probability of getting two heads?",
        options: ["1/4", "1/2", "1/3", "2/3"],
        correctAnswer: 0,
        explanation: "The possible outcomes are HH, HT, TH, TT.  The probability of HH is 1/4."
      },
      {
        question: "A bag contains 5 red marbles and 3 green marbles. If you pick one marble at random, what is the probability of selecting a green marble?",
        options: ["3/8", "5/8", "1/2", "2/3"],
        correctAnswer: 0,
        explanation: "Probability = (Number of green marbles) / (Total number of marbles) = 3/8"
      },
      {
        question: "A deck of cards has 52 cards. What is the probability of drawing a king?",
        options: ["1/13", "1/4", "1/52", "4/52"],
        correctAnswer: 0,
        explanation: "There are 4 kings in a deck of 52 cards. Probability = 4/52 = 1/13"
      },
      {
        question: "Two coins are tossed. What is the probability of getting at least one head?",
        options: ["3/4", "1/2", "1/4", "2/3"],
        correctAnswer: 0,
        explanation: "The possible outcomes are HH, HT, TH, TT.  Three of these have at least one head. Probability = 3/4"
      },
      {
        question: "What is the probability of drawing a queen or a king from a standard deck of cards?",
        options: ["2/13", "4/13", "1/13", "1/26"],
        correctAnswer: 0,
        explanation: "There are 4 queens and 4 kings. Probability = (4 + 4) / 52 = 8/52 = 2/13"
      },
      {
        question: "A bag contains 7 blue balls and 3 red balls. If you pick two balls without replacement, what is the probability that both are blue?",
        options: ["7/15", "42/100", "7/10", "21/50"],
        correctAnswer: 0,
        explanation: "The probability of the first ball being blue is 7/10.  After picking one blue ball, there are 6 blue balls left out of 9 total balls. The probability of the second ball being blue is 6/9.  The probability of both being blue is (7/10) * (6/9) = 42/90 = 7/15"
      },
      {
        question: "If you roll a die, what is the probability of getting an even number?",
        options: ["1/2", "1/3", "1/4", "1/6"],
        correctAnswer: 0,
        explanation: "There are 3 even numbers (2, 4, 6) on a six-sided die. Probability = 3/6 = 1/2"
      },
      {
        question: "A box contains 5 red pens and 2 blue pens. What is the probability of randomly selecting a blue pen?",
        options: ["2/7", "5/7", "1/2", "2/5"],
        correctAnswer: 0,
        explanation: "Probability = (Number of blue pens) / (Total number of pens) = 2/7"
      }

  ];
}