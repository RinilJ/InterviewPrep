import { TechnicalQuestion } from '../../types';

export async function getOOPQuestionsJava(): Promise<TechnicalQuestion[]> {
  return [
    {
      question: "Implement a Circle class with encapsulation that calculates area and circumference.",
      options: [
        "Use public variables for radius",
        "Use private variables with getters/setters",
        "Use protected variables",
        "Use package-private variables"
      ],
      correctAnswer: 1,
      explanation: "Proper encapsulation uses private variables with public getters/setters",
      language: 'java',
      category: 'oop',
      difficulty: 'easy',
      code: `
public class Circle {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    public double getRadius() {
        return radius;
    }
    
    public void setRadius(double radius) {
        if (radius >= 0) {
            this.radius = radius;
        }
    }
    
    public double getArea() {
        return Math.PI * radius * radius;
    }
    
    public double getCircumference() {
        return 2 * Math.PI * radius;
    }
}`,
      sampleInput: "Circle circle = new Circle(5);",
      sampleOutput: "circle.getArea() ≈ 78.54"
    },
    {
      question: "Implement a bank account system using inheritance with checking and savings accounts.",
      options: [
        "Use separate unrelated classes",
        "Use composition only",
        "Use inheritance with abstract base class",
        "Use interfaces only"
      ],
      correctAnswer: 2,
      explanation: "Abstract base class provides common functionality while allowing specific implementations",
      language: 'java',
      category: 'oop',
      difficulty: 'medium',
      code: `
public abstract class BankAccount {
    protected double balance;
    protected String accountNumber;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    public abstract void withdraw(double amount);
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public double getBalance() {
        return balance;
    }
}

public class CheckingAccount extends BankAccount {
    private double overdraftLimit;
    
    public CheckingAccount(String accountNumber, double initialBalance, double overdraftLimit) {
        super(accountNumber, initialBalance);
        this.overdraftLimit = overdraftLimit;
    }
    
    @Override
    public void withdraw(double amount) {
        if (balance - amount >= -overdraftLimit) {
            balance -= amount;
        }
    }
}`,
      sampleInput: "CheckingAccount account = new CheckingAccount('12345', 1000, 200);",
      sampleOutput: "account.withdraw(1100); // Balance becomes -100"
    },
    // Add 98 more OOP questions for Java...
  ];
}

export async function getOOPQuestionsPython(): Promise<TechnicalQuestion[]> {
  return [
    {
      question: "Implement a Circle class with encapsulation that calculates area and circumference.",
      options: [
        "Use public variables for radius",
        "Use private variables with properties",
        "Use protected variables",
        "Use no access modifiers"
      ],
      correctAnswer: 1,
      explanation: "Python properties provide clean encapsulation",
      language: 'python',
      category: 'oop',
      difficulty: 'easy',
      code: `
import math

class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value >= 0:
            self._radius = value
    
    def area(self):
        return math.pi * self._radius ** 2
    
    def circumference(self):
        return 2 * math.pi * self._radius`,
      sampleInput: "circle = Circle(5)",
      sampleOutput: "circle.area() ≈ 78.54"
    },
    // Add 98 more OOP questions for Python...
  ];
}
