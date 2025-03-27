// Mathematical Questions Module
import { Question } from '../types';

export async function getProfitLossQuestions(): Promise<Question[]> {
  return [
    {
      question: "A shopkeeper sold an article for $720 at a profit of 20%. Find the cost price of the article.",
      options: ["$600", "$650", "$550", "$700"],
      correctAnswer: 0,
      explanation: "Let CP = x, then x + 20% of x = 720, 1.2x = 720, x = 600"
    },
    {
      question: "By selling an article for $540, a man gains 20%. What would be his percentage loss if he sells it for $360?",
      options: ["20%", "25%", "15%", "10%"],
      correctAnswer: 0,
      explanation: "CP = 540/1.2 = 450, Loss = 450 - 360 = 90, Loss% = (90/450) × 100 = 20%"
    },
    {
      question: "A dealer buys an article for $400 and sells it at a profit of 30%. What is the selling price?",
      options: ["$520", "$500", "$550", "$480"],
      correctAnswer: 0,
      explanation: "SP = 400 + 30% of 400 = 400 + 120 = 520"
    },
    {
      question: "An article is sold for $1680 at a gain of 20%. If it is sold for $1470, the gain or loss percent is:",
      options: ["5% gain", "10% gain", "5% loss", "10% loss"],
      correctAnswer: 0,
      explanation: "CP = 1680/1.2 = 1400, Profit = 1470 - 1400 = 70, Profit% = (70/1400) × 100 = 5%"
    },
    {
      question: "A shopkeeper sells his goods at a premium of 40% above his cost price and offers a discount of 30% on the marked price. His profit or loss percentage is:",
      options: ["2% loss", "2% profit", "5% loss", "5% profit"],
      correctAnswer: 0,
      explanation: "Marked price = 140%, After 30% discount, SP = 98%, so loss = 2%"
    },
    {
      question: "By selling 11 items, a merchant gains the selling price of 1 item. Find his gain percentage.",
      options: ["10%", "5%", "15%", "20%"],
      correctAnswer: 0,
      explanation: "Let SP of 1 item be x, then 11x - 10x = x, so profit = x in 10x, which is 10%"
    },
    {
      question: "Raja bought a watch for $1200 and sold it to Rani at a profit of 25%. Rani sold it to Krishna at a loss of 20%. How much did Krishna pay for the watch?",
      options: ["$1200", "$1000", "$1500", "$1300"],
      correctAnswer: 0,
      explanation: "Raja's SP = 1200 × 1.25 = 1500, Rani's SP = 1500 × 0.8 = 1200"
    },
    {
      question: "If the cost price of 15 articles is equal to the selling price of 12 articles, find the profit percent.",
      options: ["25%", "20%", "30%", "15%"],
      correctAnswer: 0,
      explanation: "Let CP of 1 article be x, then 15x = 12 × SP, 15x = 12 × CP × (1 + P/100), 15 = 12(1 + P/100), P = 25%"
    },
    {
      question: "A dealer purchased a TV for $8500. He marks the price at $11050 and gives his customer a discount of 15%. What is his profit percentage?",
      options: ["10%", "15%", "20%", "25%"],
      correctAnswer: 0,
      explanation: "Final SP = 11050 × 0.85 = 9392.5, Profit = 9392.5 - 8500 = 892.5, Profit% = (892.5/8500) × 100 = 10%"
    },
    {
      question: "A merchant mixes two varieties of rice costing $50/kg and $45/kg in the ratio 3:2. At what price should he sell the mixture to earn a profit of 25%?",
      options: ["$60/kg", "$65/kg", "$55/kg", "$70/kg"],
      correctAnswer: 0,
      explanation: "Average CP = (3×50 + 2×45)/5 = 48, For 25% profit, SP = 48 × 1.25 = 60"
    }
  ];
}

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
      options: ["$65", "$68", "$72", "$70"],
      correctAnswer: 1,
      explanation: "15% of $80 = $12 (discount), so final price = $80 - $12 = $68"
    },
    {
      question: "If a number is increased by 20%, what is the multiplication factor?",
      options: ["0.2", "2.0", "1.2", "1.8"],
      correctAnswer: 2,
      explanation: "When increasing by 20%, multiply by (100% + 20%) = 120% = 1.2"
    },
    {
      question: "In a class of 50 students, 30 are girls. What percentage are boys?",
      options: ["35%", "45%", "50%", "40%"],
      correctAnswer: 3,
      explanation: "Boys = 20, Percentage = (20/50) × 100 = 40%"
    },
    {
      question: "A TV's price increased from $400 to $500. What is the percentage increase?",
      options: ["15%", "20%", "25%", "30%"],
      correctAnswer: 2,
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
      options: ["20%", "25%", "35%", "30%"],
      correctAnswer: 1,
      explanation: "Coffee drinkers = 100, Percentage = (100/400) × 100 = 25%"
    },
    {
      question: "A shirt's price is reduced by 40% to $36. What was its original price?",
      options: ["$55", "$65", "$60", "$70"],
      correctAnswer: 2,
      explanation: "After 40% discount, 60% = $36, so 100% = $36/0.6 = $60"
    },
    {
      question: "A store increases prices by 20% and then offers a 20% discount. What is the final price of an item originally priced at $100?",
      options: ["$96", "$100", "$104", "$92"],
      correctAnswer: 0,
      explanation: "First increase: $120, then 20% discount on $120 = $96 (not $100 due to compound effect)"
    },
    {
      question: "In a class of 200 students, 55% are girls. After 20 new students join, of whom 15 are girls, what is the new percentage of girls?",
      options: ["54%", "56%", "53%", "55%"],
      correctAnswer: 0,
      explanation: "Original girls: 110, New total: 220, New girls: 125, Percentage = (125/220) × 100 = 54%"
    },
    {
      question: "If a company's profits increase by 50% one year and decrease by 40% the next year, what is the overall percentage change?",
      options: ["-10%", "-5%", "10%", "0%"],
      correctAnswer: 0,
      explanation: "If initial profit is x, after increase: 1.5x, after decrease: 1.5x × 0.6 = 0.9x, so -10% overall"
    },
    {
      question: "A solution contains 20% alcohol. How much water should be added to 100ml of this solution to make it 15% alcohol?",
      options: ["33.33ml", "25ml", "30ml", "35ml"],
      correctAnswer: 0,
      explanation: "Using C₁V₁ = C₂V₂: 20 × 100 = 15(100 + x), solving for x gives 33.33ml"
    },
    {
      question: "Three numbers are in the ratio 2:3:5. If the second number is increased by 50%, what is the new ratio?",
      options: ["4:9:10", "4:6:10", "2:4.5:5", "2:3:7.5"],
      correctAnswer: 0,
      explanation: "Original ratio 2:3:5, after 50% increase in second number: 2:4.5:5, simplifying = 4:9:10"
    },
    {
      question: "A businessman invested $12000, part of which at 8% and the rest at 10%. If the total annual interest is $1040, how much was invested at 8%?",
      options: ["$8000", "$7000", "$6000", "$9000"],
      correctAnswer: 0,
      explanation: "Let x be invested at 8%, solving: 0.08x + 0.1(12000-x) = 1040 gives x = 8000"
    },
    {
      question: "The population of a town increased by 25% in the first year and decreased by 20% in the second year. If the final population is 20000, what was the initial population?",
      options: ["20000", "18000", "22000", "24000"],
      correctAnswer: 0,
      explanation: "Working backwards: 20000 ÷ 0.8 × 0.8 = 20000"
    },
    {
      question: "A car depreciates by 15% in the first year and 10% in each subsequent year. What percentage of its original value remains after 3 years?",
      options: ["69.615%", "65%", "70%", "68%"],
      correctAnswer: 0,
      explanation: "After 1st year: 85%, 2nd year: 85% × 0.9 = 76.5%, 3rd year: 76.5% × 0.9 = 69.615%"
    },
    {
      question: "In an exam, 70% students passed in English and 65% in Math. If 15% failed in both, what percentage passed in both subjects?",
      options: ["50%", "45%", "55%", "40%"],
      correctAnswer: 0,
      explanation: "Using P(A∪B) = P(A) + P(B) - P(A∩B), 85% = 70% + 65% - P(A∩B), so P(A∩B) = 50%"
    },
    {
      question: "A mixture contains milk and water in the ratio 5:3. If 4 liters of water is added, the ratio becomes 5:4. Find the initial quantity of milk.",
      options: ["20 liters", "15 liters", "25 liters", "18 liters"],
      correctAnswer: 0,
      explanation: "Let milk be x, then: x/5 = (3x/5 + 4)/4, solving gives x = 20"
    },
    {
      question: "A retailer buys 100 items at $20 each. He sells 80% of them at a profit of 25% and the rest at a loss of 20%. What is his overall profit/loss percentage?",
      options: ["16%", "12%", "14%", "18%"],
      correctAnswer: 0,
      explanation: "Profit on 80 items = 400, Loss on 20 items = 80, Net profit = 320 on cost of 2000 = 16%"
    },
    {
      question: "A shopkeeper marks his goods 60% above cost price and allows a discount of 25%. What is his profit percentage?",
      options: ["20%", "25%", "15%", "30%"],
      correctAnswer: 0,
      explanation: "Marked price = 160%, After 25% discount = 120%, so profit = 20%"
    },
    {
      question: "On selling an article for $540, the loss is equal to the cost price of another identical article. What is the cost price of the article?",
      options: ["$1080", "$960", "$1200", "$900"],
      correctAnswer: 0,
      explanation: "Let CP be x, then x - 540 = x, solving gives x = 1080"
    },
    {
      question: "A person buys 12 pens for $100 and sells them at 10 pens for $100. Find the profit or loss percentage.",
      options: ["20% profit", "20% loss", "25% profit", "15% profit"],
      correctAnswer: 0,
      explanation: "CP of 10 pens = 83.33, SP = 100, Profit = 20%"
    },
    {
      question: "A trader had 100 kgs of rice. He sold 40% at 20% profit and rest at 10% loss. What is his overall profit/loss percentage?",
      options: ["2% profit", "5% profit", "2% loss", "No profit no loss"],
      correctAnswer: 0,
      explanation: "Profit on 40kg = 8, Loss on 60kg = 6, Net profit = 2 on 100 = 2%"
    },
    {
      question: "An article is sold at three consecutive discounts of 20%, 10% and 5%. What is the net discount percentage?",
      options: ["31.6%", "35%", "30%", "33%"],
      correctAnswer: 0,
      explanation: "After discounts: 0.8 × 0.9 × 0.95 = 0.684, so net discount = 31.6%"
    },
    {
      question: "A merchant buys an article for $800. At what price should he mark it to gain 25% after allowing a discount of 20%?",
      options: ["$1250", "$1200", "$1300", "$1150"],
      correctAnswer: 0,
      explanation: "Required SP = 1000, so marked price = 1000/0.8 = 1250"
    },
    {
      question: "By selling 33 items, there is a loss equal to SP of 11 items. The loss percentage is:",
      options: ["25%", "30%", "33.33%", "20%"],
      correctAnswer: 0,
      explanation: "Loss = SP of 11 items, Total SP = SP of 33 items, Loss% = (11/44) × 100 = 25%"
    },
    {
      question: "A shopkeeper sold an article at 20% above the cost price. Had he sold it for $50 more, his profit would have been 30%. Find the cost price.",
      options: ["$500", "$450", "$550", "$600"],
      correctAnswer: 0,
      explanation: "Let CP = x, then 1.2x + 50 = 1.3x, solving gives x = 500"
    },
    {
      question: "On selling a watch for $150, a shopkeeper loses 25%. To gain 25%, at what price should he sell it?",
      options: ["$250", "$225", "$200", "$275"],
      correctAnswer: 0,
      explanation: "CP = 150/0.75 = 200, For 25% profit, SP = 200 × 1.25 = 250"
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
    },
    {
      question: "Find the compound interest on $5000 at 10% per annum for 2 years if interest is compounded annually.",
      options: ["$1050", "$1000", "$1100", "$1025"],
      correctAnswer: 0,
      explanation: "CI = P(1 + r)^t - P = 5000(1 + 0.1)^2 - 5000 = 1050"
    },
    {
      question: "What principal amount will earn $60 as simple interest in 2 years at 6% per annum?",
      options: ["$500", "$600", "$400", "$550"],
      correctAnswer: 0,
      explanation: "Using SI formula: 60 = P × 6 × 2/100, so P = 500"
    },
    {
      question: "In how many years will $800 double at 12.5% simple interest?",
      options: ["8 years", "10 years", "6 years", "12 years"],
      correctAnswer: 0,
      explanation: "Using SI formula: 800 = 800 × 12.5 × t/100, so t = 8"
    },
    {
      question: "What rate of interest will earn $120 on $400 in 2 years as simple interest?",
      options: ["15%", "12%", "18%", "20%"],
      correctAnswer: 0,
      explanation: "Using SI formula: 120 = 400 × r × 2/100, so r = 15%"
    },
    {
      question: "Calculate the compound interest on $2000 at 8% per annum for 2 years compounded semi-annually.",
      options: ["$348.32", "$340.25", "$352.64", "$345.86"],
      correctAnswer: 0,
      explanation: "CI = P(1 + r/2)^4 - P = 2000(1 + 0.08/2)^4 - 2000 = 348.32"
    },
    {
      question: "What sum will amount to $1331 in 2 years at 10% compound interest?",
      options: ["$1100", "$1200", "$1000", "$1150"],
      correctAnswer: 0,
      explanation: "Using CI formula: 1331 = P(1 + 0.1)^2, so P = 1100"
    },
    {
      question: "If simple interest on a sum for 3 years at 12% per annum is $360, what is the principal?",
      options: ["$1000", "$1200", "$800", "$1500"],
      correctAnswer: 0,
      explanation: "Using SI formula: 360 = P × 12 × 3/100, so P = 1000"
    },
    {
      question: "Find the difference between CI and SI on $5000 at 4% for 2 years.",
      options: ["$4", "$8", "$6", "$10"],
      correctAnswer: 0,
      explanation: "CI = 5000(1.04)² - 5000, SI = 5000 × 0.04 × 2, Difference = 4"
    },
    {
      question: "A sum becomes $6050 in 2 years at 10% compound interest. What is the sum?",
      options: ["$5000", "$5500", "$4500", "$5250"],
      correctAnswer: 0,
      explanation: "Using CI formula: 6050 = P(1 + 0.1)^2, so P = 5000"
    },
    // Add 90 more interest questions with increasing complexity...
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
    {
      question: "If 8 workers can build a wall in 10 days, how many workers are needed to build it in 5 days?",
      options: ["16", "12", "14", "18"],
      correctAnswer: 0,
      explanation: "Using inverse proportion: (8 × 10)/5 = 16 workers"
    },
    {
      question: "A can do a work in 10 days and B in 15 days. In how many days can they do it together?",
      options: ["6", "8", "5", "7"],
      correctAnswer: 0,
      explanation: "Days = (10 × 15)/(10 + 15) = 6 days"
    },
    {
      question: "If 15 men can complete a work in 12 days working 8 hours a day, how many days will 20 men take working 6 hours a day?",
      options: ["12", "10", "14", "16"],
      correctAnswer: 0,
      explanation: "Using M₁D₁H₁ = M₂D₂H₂: 15 × 12 × 8 = 20 × D × 6, so D = 12"
    },
    {
      question: "A can do a piece of work in 6 days and B can do it in 12 days. In how many days can A and B together do 3/4 of the work?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 0,
      explanation: "Time for whole work = (6 × 12)/(6 + 12) = 4 days, for 3/4 work = 3 days"
    },
    {
      question: "12 men complete a work in 9 days. How many more men are needed to complete the work in 6 days?",
      options: ["6", "8", "4", "10"],
      correctAnswer: 0,
      explanation: "Using M₁D₁ = M₂D₂: 12 × 9 = M₂ × 6, M₂ = 18, Extra men = 6"
    },
    {
      question: "A does 4/5 of work in 20 days. B can do 5/6 of the work in 15 days. In how many days can they together do the whole work?",
      options: ["10", "12", "8", "15"],
      correctAnswer: 0,
      explanation: "A's 1 day work = 4/100, B's 1 day work = 1/18, Together = 10 days"
    },
    {
      question: "If 20 men working 8 hours a day can finish a work in 15 days, in how many days will 15 men working 6 hours a day finish it?",
      options: ["26", "24", "28", "22"],
      correctAnswer: 0,
      explanation: "Using M₁D₁H₁ = M₂D₂H₂: 20 × 15 × 8 = 15 × D × 6, so D = 26"
    },
    {
      question: "A can do a piece of work in 20 days. He works at it for 5 days and then B finishes it in 9 days. In how many days can B alone do the whole work?",
      options: ["12", "15", "18", "20"],
      correctAnswer: 0,
      explanation: "B's 1 day work = (3/4)/9 = 1/12, So B alone takes 12 days"
    },
    {
      question: "Three men can complete a piece of work in 6 days. How many men are needed to complete 1/3 of the work in 2 days?",
      options: ["4", "5", "3", "6"],
      correctAnswer: 0,
      explanation: "Using M₁D₁W₁ = M₂D₂W₂: 3 × 6 × 1 = M × 2 × 1/3, so M = 4"
    },
    // Add 90 more time and work questions with increasing complexity...
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
    {
      question: "Average of 10 numbers is 15. If each number is increased by 3, what is the new average?",
      options: ["18", "15", "21", "12"],
      correctAnswer: 0,
      explanation: "When each number increases by 3, average increases by 3"
    },
    {
      question: "The average weight of 8 people is 65 kg. If two more people weighing 72 kg each join, what is the new average?",
      options: ["66", "67", "68", "69"],
      correctAnswer: 0,
      explanation: "New average = (8×65 + 2×72)/10 = 66"
    },
    {
      question: "The average of 11 numbers is 60. If one number 40 is excluded, what is the new average?",
      options: ["62", "58", "64", "61"],
      correctAnswer: 0,
      explanation: "New sum = (11×60 - 40), New average = (11×60 - 40)/10 = 62"
    },
    {
      question: "Average age of a family of 6 members is 25 years. If grandmother aged 70 years joins, what is the new average?",
      options: ["30", "28", "32", "35"],
      correctAnswer: 0,
      explanation: "New average = (6×25 + 70)/7 = 30"
    },
    {
      question: "Average marks of 30 students is 75. If 5 students with average marks 65 leave, what is the new average?",
      options: ["77", "73", "75", "79"],
      correctAnswer: 0,
      explanation: "New average = (30×75 - 5×65)/25 = 77"
    },
    {
      question: "A batsman scores 87 runs in 18th match making his average 53. How many runs did he score in first 17 matches?",
      options: ["814", "824", "804", "834"],
      correctAnswer: 0,
      explanation: "18×53 = 87 + previous runs, so previous runs = 814"
    },
    {
      question: "Average salary of 60 workers is $5000. If 10 workers with average salary $4000 leave, what is the new average?",
      options: ["$5200", "$5100", "$5300", "$5400"],
      correctAnswer: 0,
      explanation: "New average = (60×5000 - 10×4000)/50 = $5200"
    },
    {
      question: "Average of 5 consecutive even numbers is 50. What is the largest number?",
      options: ["54", "52", "56", "58"],
      correctAnswer: 0,
      explanation: "Numbers are 46,48,50,52,54; largest is 54"
    },
    {
      question: "The average of three numbers is 36. If onenumber is 45, what is the averageof other two numbers?",
      options: ["31.5", "32.5", "30.5", "33.5"],
      correctAnswer: 0,
      explanation: "Sum of other two = (36×3 - 45), their average = (36×3 - 45)/2 = 31.5"
    },
    // Add 90 more average questions with increasing complexity...
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