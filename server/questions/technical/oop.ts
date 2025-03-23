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
    {
      question: "Implement a Shape hierarchy with proper abstraction and polymorphism. The base class should have area() and perimeter() methods.",
      options: [
        "Use abstract class with abstract methods",
        "Use interface only",
        "Use regular inheritance",
        "Use composition"
      ],
      correctAnswer: 0,
      explanation: "Abstract class provides common functionality while allowing specific implementations",
      language: 'java',
      category: 'oop',
      difficulty: 'medium',
      code: `
public abstract class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    public abstract double area();
    public abstract double perimeter();

    public String getColor() {
        return color;
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}

public class Rectangle extends Shape {
    private double width;
    private double height;

    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }

    @Override
    public double perimeter() {
        return 2 * (width + height);
    }
}`,
      sampleInput: `
Shape circle = new Circle("red", 5);
Shape rectangle = new Rectangle("blue", 4, 6);
System.out.println(circle.area());
System.out.println(rectangle.perimeter());`,
      sampleOutput: `
78.53981633974483
20.0`
    },
    {
      question: "Implement a Logger class using the Singleton pattern to ensure only one instance exists.",
      options: [
        "Use private constructor and static instance",
        "Use public constructor",
        "Use static methods only",
        "Use multiple instances"
      ],
      correctAnswer: 0,
      explanation: "Singleton pattern ensures a class has only one instance with global access point",
      language: 'java',
      category: 'oop',
      difficulty: 'medium',
      code: `
public class Logger {
    private static Logger instance;
    private List<String> logs;

    private Logger() {
        logs = new ArrayList<>();
    }

    public static synchronized Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }

    public void log(String message) {
        logs.add(message);
        System.out.println("Log: " + message);
    }

    public List<String> getLogs() {
        return new ArrayList<>(logs);
    }
}`,
      sampleInput: `
Logger logger1 = Logger.getInstance();
Logger logger2 = Logger.getInstance();
logger1.log("Test message");
System.out.println(logger2.getLogs().size());`,
      sampleOutput: `
Log: Test message
1`
    }
    // Add 96 more OOP questions for Java...
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
    {
      question: "Implement a Shape hierarchy using abstract base classes in Python.",
      options: [
        "Use ABC and abstract methods",
        "Use regular inheritance",
        "Use multiple inheritance",
        "Use composition"
      ],
      correctAnswer: 0,
      explanation: "ABC provides proper abstraction in Python",
      language: 'python',
      category: 'oop',
      difficulty: 'medium',
      code: `
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    def __init__(self, color: str):
        self._color = color

    @property
    def color(self) -> str:
        return self._color

    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass

class Circle(Shape):
    def __init__(self, color: str, radius: float):
        super().__init__(color)
        self._radius = radius

    def area(self) -> float:
        return math.pi * self._radius ** 2

    def perimeter(self) -> float:
        return 2 * math.pi * self._radius

class Rectangle(Shape):
    def __init__(self, color: str, width: float, height: float):
        super().__init__(color)
        self._width = width
        self._height = height

    def area(self) -> float:
        return self._width * self._height

    def perimeter(self) -> float:
        return 2 * (self._width + self._height)`,
      sampleInput: `
circle = Circle("red", 5)
rectangle = Rectangle("blue", 4, 6)
print(circle.area())
print(rectangle.perimeter())`,
      sampleOutput: `
78.53981633974483
20.0`
    }
    // Add more Python OOP questions...
  ];
}