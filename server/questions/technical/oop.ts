import { TechnicalQuestion } from '../../types';

export async function getOOPQuestionsJava(): Promise<TechnicalQuestion[]> {
  return [
    {
      question: "How would you implement a Circle class that follows proper encapsulation principles?",
      options: [
        "Make radius private with getters/setters and validate in setter",
        "Use public variables for direct access to radius",
        "Make radius protected and accessible to subclasses only",
        "Use static variables shared across all instances"
      ],
      correctAnswer: 0,
      explanation: "Proper encapsulation requires private fields with controlled access through methods",
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
}
`,
      sampleInput: "Circle circle = new Circle(5);",
      sampleOutput: "circle.getArea() ≈ 78.54"
    },
    {
      question: "How would you design a bank account system with different account types?",
      options: [
        "Create abstract BankAccount class with concrete CheckingAccount/SavingsAccount implementations",
        "Use separate unrelated classes for each account type",
        "Create a single BankAccount class with type parameter",
        "Use only interfaces without any abstract classes"
      ],
      correctAnswer: 0,
      explanation: "Abstract class provides common functionality while allowing specific implementations",
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
}
`,
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
}
`,
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
}
`,
      sampleInput: `
Logger logger1 = Logger.getInstance();
Logger logger2 = Logger.getInstance();
logger1.log("Test message");
System.out.println(logger2.getLogs().size());`,
      sampleOutput: `
Log: Test message
1`
    },
    {
      question: "How would you implement interfaces with default methods in Java 8+?",
      options: [
        "Define interface with default implementation and allow classes to override if needed",
        "Use abstract class instead of interface",
        "Create separate implementation class",
        "Use static methods in interface"
      ],
      correctAnswer: 0,
      explanation: "Java 8+ allows default method implementations in interfaces",
      language: 'java',
      category: 'oop',
      difficulty: 'medium',
      code: `
public interface Payable {
    // Abstract method - must be implemented
    double calculatePay();

    // Default method - can be used as-is or overridden
    default double calculateBonus() {
        return calculatePay() * 0.1;
    }

    // Static utility method
    static boolean isValidPay(double pay) {
        return pay >= 0;
    }
}

public class Employee implements Payable {
    private double baseSalary;
    private double hoursWorked;

    public Employee(double baseSalary, double hoursWorked) {
        this.baseSalary = baseSalary;
        this.hoursWorked = hoursWorked;
    }

    @Override
    public double calculatePay() {
        return baseSalary * hoursWorked;
    }

    // Using default bonus calculation
    // No need to override calculateBonus()
}

public class Contractor implements Payable {
    private double hourlyRate;
    private double hoursWorked;

    public Contractor(double hourlyRate, double hoursWorked) {
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    @Override
    public double calculatePay() {
        return hourlyRate * hoursWorked;
    }

    // Override default bonus calculation
    @Override
    public double calculateBonus() {
        return calculatePay() * 0.05; // Different bonus rate for contractors
    }
}
`,
      sampleInput: `
Employee emp = new Employee(20.0, 40.0);
Contractor cont = new Contractor(30.0, 40.0);
System.out.println(emp.calculateBonus());
System.out.println(cont.calculateBonus());`,
      sampleOutput: `
80.0   // 10% of 800
60.0   // 5% of 1200`
    },
    {
      question: "How would you implement the SOLID principles in a payment processing system?",
      options: [
        "Create separate interfaces for different responsibilities and use dependency injection",
        "Use a single class with multiple methods",
        "Create abstract class with all payment methods",
        "Use static utility class"
      ],
      correctAnswer: 0,
      explanation: "SOLID principles promote maintainable and scalable code through proper separation of concerns",
      language: 'java',
      category: 'oop',
      difficulty: 'hard',
      code: `
// Single Responsibility Principle
public interface PaymentProcessor {
    boolean processPayment(Payment payment);
}

// Open/Closed Principle
public interface PaymentValidator {
    boolean validate(Payment payment);
}

// Liskov Substitution Principle
public abstract class Payment {
    protected double amount;
    protected String currency;

    public abstract boolean isValid();
}

// Interface Segregation Principle
public interface PaymentNotifier {
    void sendConfirmation(String to);
}

public interface PaymentReporter {
    void generateReport();
}

// Dependency Inversion Principle
public class CreditCardPayment extends Payment {
    private PaymentProcessor processor;
    private PaymentValidator validator;
    private PaymentNotifier notifier;

    public CreditCardPayment(
        PaymentProcessor processor,
        PaymentValidator validator,
        PaymentNotifier notifier
    ) {
        this.processor = processor;
        this.validator = validator;
        this.notifier = notifier;
    }

    public boolean process() {
        if (!isValid() || !validator.validate(this)) {
            return false;
        }

        boolean success = processor.processPayment(this);
        if (success) {
            notifier.sendConfirmation("customer@email.com");
        }
        return success;
    }

    @Override
    public boolean isValid() {
        return amount > 0 && currency != null;
    }
}
`,
      sampleInput: `
PaymentProcessor processor = new StripeProcessor();
PaymentValidator validator = new CreditCardValidator();
PaymentNotifier notifier = new EmailNotifier();

CreditCardPayment payment = new CreditCardPayment(processor, validator, notifier);
payment.process();`,
      sampleOutput: "true"
    },
    {
      question: "How would you implement a generic collection class with type safety?",
      options: [
        "Use generics with bounded type parameters",
        "Use Object type for flexibility",
        "Use arrays with type casting",
        "Use dynamic type checking"
      ],
      correctAnswer: 0,
      explanation: "Generics provide compile-time type safety and eliminate type casting",
      language: 'java',
      category: 'oop',
      difficulty: 'medium',
      code: `
public class GenericStack<T extends Comparable<T>> {
    private List<T> items;
    private int maxSize;

    public GenericStack(int maxSize) {
        this.items = new ArrayList<>();
        this.maxSize = maxSize;
    }

    public void push(T item) throws StackFullException {
        if (items.size() >= maxSize) {
            throw new StackFullException("Stack is full");
        }
        items.add(item);
    }

    public T pop() throws StackEmptyException {
        if (items.isEmpty()) {
            throw new StackEmptyException("Stack is empty");
        }
        return items.remove(items.size() - 1);
    }

    public T peek() throws StackEmptyException {
        if (items.isEmpty()) {
            throw new StackEmptyException("Stack is empty");
        }
        return items.get(items.size() - 1);
    }

    public void sort() {
        Collections.sort(items);
    }
}

// Usage example
public class Main {
    public static void main(String[] args) {
        GenericStack<Integer> numberStack = new GenericStack<>(5);
        numberStack.push(5);
        numberStack.push(2);
        numberStack.push(8);
        numberStack.sort();

        GenericStack<String> stringStack = new GenericStack<>(5);
        stringStack.push("apple");
        stringStack.push("banana");
        stringStack.push("cherry");
        stringStack.sort();
    }
}
`,
      sampleInput: `
GenericStack<Integer> stack = new GenericStack<>(3);
stack.push(3);
stack.push(1);
stack.push(2);
stack.sort();
System.out.println(stack.pop());
System.out.println(stack.pop());
System.out.println(stack.pop());`,
      sampleOutput: `
3
2
1`
    },
    {
      question: "How would you implement robust exception handling in a file processing system?",
      options: [
        "Use custom exceptions and try-with-resources for proper resource management",
        "Use generic Exception class",
        "Use simple try-catch blocks",
        "Let exceptions propagate up"
      ],
      correctAnswer: 0,
      explanation: "Custom exceptions and try-with-resources provide better error handling and resource management",
      language: 'java',
      category: 'oop',
      difficulty: 'medium',
      code: `
public class FileProcessor {
    public class FileProcessingException extends Exception {
        public FileProcessingException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    public class InvalidFileFormatException extends FileProcessingException {
        public InvalidFileFormatException(String message) {
            super(message, null);
        }
    }

    public void processFile(String filePath) throws FileProcessingException {
        // Try-with-resources ensures proper resource cleanup
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (!isValidFormat(line)) {
                    throw new InvalidFileFormatException(
                        "Invalid format at line: " + line
                    );
                }
                processLine(line);
            }
        } catch (IOException e) {
            throw new FileProcessingException(
                "Error processing file: " + filePath, 
                e
            );
        }
    }

    private boolean isValidFormat(String line) {
        // Format validation logic
        return line.matches("^\\w+,\\d+$");
    }

    private void processLine(String line) {
        // Line processing logic
        String[] parts = line.split(",");
        // Process parts...
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        FileProcessor processor = new FileProcessor();
        try {
            processor.processFile("data.txt");
        } catch (FileProcessor.InvalidFileFormatException e) {
            System.err.println("File format error: " + e.getMessage());
            // Handle format error
        } catch (FileProcessor.FileProcessingException e) {
            System.err.println("Processing error: " + e.getMessage());
            e.printStackTrace();
            // Handle other processing errors
        }
    }
}
`,
      sampleInput: `
FileProcessor processor = new FileProcessor();
processor.processFile("invalid.txt");`,
      sampleOutput: `
FileProcessingException: Error processing file: invalid.txt
Caused by: java.io.FileNotFoundException: invalid.txt`
    },
    {
      question: "How would you manage object lifecycle in a connection pool implementation?",
      options: [
        "Implement proper initialization, validation, and cleanup with try-with-resources",
        "Use garbage collector to handle cleanup",
        "Manual resource management",
        "Static initialization blocks"
      ],
      correctAnswer: 0,
      explanation: "Proper lifecycle management ensures resources are used and released correctly",
      language: 'java',
      category: 'oop',
      difficulty: 'hard',
      code: `
public class ConnectionPool implements AutoCloseable {
    private static final int MAX_CONNECTIONS = 10;
    private final Queue<Connection> available;
    private final Set<Connection> inUse;

    public ConnectionPool() {
        available = new ConcurrentLinkedQueue<>();
        inUse = Collections.newSetFromMap(new ConcurrentHashMap<>());
        initializePool();
    }

    private void initializePool() {
        for (int i = 0; i < MAX_CONNECTIONS; i++) {
            available.offer(createConnection());
        }
    }

    public Connection acquire() throws ConnectionException {
        Connection conn = available.poll();
        if (conn == null) {
            throw new ConnectionException("No connections available");
        }

        if (!isValid(conn)) {
            conn = createConnection(); // Replace invalid connection
        }

        inUse.add(conn);
        return conn;
    }

    public void release(Connection conn) {
        if (inUse.remove(conn)) {
            available.offer(conn);
        }
    }

    @Override
    public void close() {
        // Close all connections
        available.forEach(Connection::close);
        inUse.forEach(Connection::close);
        available.clear();
        inUse.clear();
    }

    private boolean isValid(Connection conn) {
        try {
            return conn != null && !conn.isClosed();
        } catch (SQLException e) {
            return false;
        }
    }

    private Connection createConnection() {
        // Create new database connection
        return DriverManager.getConnection(url, username, password);
    }
}

// Usage with try-with-resources
public class Main {
    public static void main(String[] args) {
        try (ConnectionPool pool = new ConnectionPool()) {
            Connection conn = pool.acquire();
            try {
                // Use connection
                performOperation(conn);
            } finally {
                pool.release(conn);
            }
        }
    }
}
`,
      sampleInput: `
try (ConnectionPool pool = new ConnectionPool()) {
    Connection conn = pool.acquire();
    // Use connection
    pool.release(conn);
}
`,
      sampleOutput: "Connection acquired, used, and properly released"
    },
    {
      question: "How would you implement the Factory Pattern for creating different types of documents?",
      options: [
        "Create abstract factory with concrete implementations for each document type",
        "Use constructor overloading",
        "Use inheritance only",
        "Use static methods"
      ],
      correctAnswer: 0,
      explanation: "Factory pattern provides flexibility in object creation and encapsulates instantiation logic",
      language: 'java',
      category: 'oop',
      difficulty: 'medium',
      code: `
// Product interface
public interface Document {
    void open();
    void save();
    String getType();
}

// Concrete products
public class PDFDocument implements Document {
    private String content;

    @Override
    public void open() {
        System.out.println("Opening PDF document");
    }

    @Override
    public void save() {
        System.out.println("Saving PDF document");
    }

    @Override
    public String getType() {
        return "PDF";
    }
}

public class WordDocument implements Document {
    private String content;

    @Override
    public void open() {
        System.out.println("Opening Word document");
    }

    @Override
    public void save() {
        System.out.println("Saving Word document");
    }

    @Override
    public String getType() {
        return "Word";
    }
}

// Factory interface
public interface DocumentFactory {
    Document createDocument();
}

// Concrete factories
public class PDFDocumentFactory implements DocumentFactory {
    @Override
    public Document createDocument() {
        return new PDFDocument();
    }
}

public class WordDocumentFactory implements DocumentFactory {
    @Override
    public Document createDocument() {
        return new WordDocument();
    }
}

// Client code
public class DocumentManager {
    private DocumentFactory factory;

    public DocumentManager(DocumentFactory factory) {
        this.factory = factory;
    }

    public Document createAndOpenDocument() {
        Document doc = factory.createDocument();
        doc.open();
        return doc;
    }
}
`,
      sampleInput: `
DocumentFactory pdfFactory = new PDFDocumentFactory();
DocumentManager manager = new DocumentManager(pdfFactory);
Document doc = manager.createAndOpenDocument();
System.out.println(doc.getType());`,
      sampleOutput: `
Opening PDF document
PDF`
    }
  ];
}

export async function getOOPQuestionsPython(): Promise<TechnicalQuestion[]> {
  return [
    {
      question: "How would you implement a Circle class using proper encapsulation in Python?",
      options: [
        "Use @property decorators and private attributes",
        "Use public variables with direct access",
        "Use double underscore variables",
        "Use class variables shared across instances"
      ],
      correctAnswer: 0,
      explanation: "Property decorators provide clean encapsulation in Python",
      language: 'python',
      category: 'oop',
      difficulty: 'easy',
      code: `
class Circle:
    def __init__(self, radius: float):
        self._radius = radius  # Protected attribute

    @property
    def radius(self) -> float:
        return self._radius

    @radius.setter
    def radius(self, value: float):
        if value >= 0:
            self._radius = value
        else:
            raise ValueError("Radius must be non-negative")

    def area(self) -> float:
        return 3.14159 * self._radius ** 2

    def circumference(self) -> float:
        return 2 * 3.14159 * self._radius`,
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
        return 2 * (self._width + self._height)
`,
      sampleInput: `
circle = Circle("red", 5)
rectangle = Rectangle("blue", 4, 6)
print(circle.area())
print(rectangle.perimeter())`,
      sampleOutput: `
78.53981633974483
20.0`
    },
    {
      question: "How would you implement properties and descriptors in Python?",
      options: [
        "Use @property decorator and property class",
        "Use public variables",
        "Use private variables with getters/setters",
        "Use static methods"
      ],
      correctAnswer: 0,
      explanation: "Property decorator provides clean syntax for computed attributes",
      language: 'python',
      category: 'oop',
      difficulty: 'medium',
      code: `
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

# Custom Descriptor Example
class Positive:
    def __init__(self):
        self._name = None

    def __set_name__(self, owner, name):
        self._name = name

    def __get__(self, instance, owner):
        if instance is None:
            return self
        return instance.__dict__[self._name]

    def __set__(self, instance, value):
        if value <= 0:
            raise ValueError(f"{self._name} must be positive!")
        instance.__dict__[self._name] = value

class Circle:
    radius = Positive()  # Using descriptor

    def __init__(self, radius):
        self.radius = radius  # This will validate via descriptor`,
      sampleInput: `
temp = Temperature(25)
print(temp.fahrenheit)
temp.celsius = 30
print(temp.fahrenheit)

circle = Circle(5)  # OK
try:
    circle.radius = -1  # Raises ValueError
except ValueError as e:
    print(str(e))`,
      sampleOutput: `
77.0
86.0
radius must be positive!`
    },
    {
      question: "How would you implement different method types in Python (class, static, instance)?",
      options: [
        "Use @classmethod, @staticmethod, and instance methods appropriately",
        "Use only instance methods",
        "Use only static methods",
        "Use regular functions"
      ],
      correctAnswer: 0,
      explanation: "Different method decorators serve different purposes in OOP",
      language: 'python',
      category: 'oop',
      difficulty: 'medium',
      code: `
class DateParser:
    def __init__(self, date_str):
        self.date_str = date_str

    @staticmethod
    def is_valid_format(date_str):
        """Static method to validate date format"""
        try:
            datetime.strptime(date_str, "%Y-%m-%d")
            return True
        except ValueError:
            return False

    @classmethod
    def from_timestamp(cls, timestamp):
        """Class method as alternative constructor"""
        date_str = datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d")
        return cls(date_str)

    def parse(self):
        """Instance method to parse the date"""
        if not self.is_valid_format(self.date_str):
            raise ValueError("Invalid date format")
        return datetime.strptime(self.date_str, "%Y-%m-%d")`,
      sampleInput: `
# Static method
print(DateParser.is_valid_format("2024-03-23"))

# Class method
parser = DateParser.from_timestamp(1711152000)
print(parser.date_str)

# Instance method
parser = DateParser("2024-03-23")
print(parser.parse())`,
      sampleOutput: `
True
2024-03-23
2024-03-23 00:00:00`
    },
    {
      question: "How would you implement multiple inheritance and handle method resolution order (MRO)?",
      options: [
        "Use super() and understand MRO for proper method resolution",
        "Call parent methods directly",
        "Avoid multiple inheritance",
        "Use mixins only"
      ],
      correctAnswer: 0,
      explanation: "Understanding MRO is crucial for multiple inheritance in Python",
      language: 'python',
      category: 'oop',
      difficulty: 'hard',
      code: `
class Loggable:
    def log(self, message):
        print(f"Log: {message}")

    def save(self):
        self.log("Saving in Loggable")
        return "Loggable Save"

class Serializable:
    def serialize(self):
        return "Serialized data"

    def save(self):
        print("Saving in Serializable")
        return "Serializable Save"

class Configuration(Loggable, Serializable):
    def __init__(self, config_data):
        self.config_data = config_data

    def save(self):
        self.log("Starting save operation")
        super().save()  # Calls Loggable.save() due to MRO
        return self.serialize()

# Helper function to demonstrate MRO
def show_mro(cls):
    print(f"MRO for {cls.__name__}:")
    for c in cls.__mro__:
        print(f"  {c.__name__}")`,
      sampleInput: `
config = Configuration({"key": "value"})
show_mro(Configuration)
print(config.save())`,
      sampleOutput: `
MRO for Configuration:
  Configuration
  Loggable
  Serializable
  object
Log: Starting save operation
Log: Saving in Loggable
Serialized data`
    },
    {
      question: "How would you implement a context manager in Python?",
      options: [
        "Use __enter__ and __exit__ methods or @contextmanager decorator",
        "Use try-finally blocks",
        "Use with statement without context manager",
        "Use regular methods"
      ],
      correctAnswer: 0,
      explanation: "Context managers provide clean resource management",
      language: 'python',
      category: 'oop',
      difficulty: 'medium',
      code: `
class DatabaseConnection:
    def __init__(self, connection_string):
        self.connection_string = connection_string
        self.connection = None

    def __enter__(self):
        print(f"Connecting to {self.connection_string}")
        self.connection = "DB Connection"
        return self.connection

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection")
        if self.connection:
            self.connection = None
        if exc_type:
            print(f"Error occurred: {exc_val}")
            return False  # Propagate exception
        return True

# Alternative using contextmanager decorator
from contextlib import contextmanager

@contextmanager
def file_manager(filename, mode='r'):
    try:
        f = open(filename, mode)
        yield f
    finally:
        f.close()`,
      sampleInput: `
# Using class-based context manager
with DatabaseConnection("mysql://localhost") as conn:
    print(f"Using connection: {conn}")

# Using decorator-based context manager
with file_manager("example.txt", "w") as f:
    f.write("Hello, World!")`,
      sampleOutput: `
Connecting to mysql://localhost
Using connection: DB Connection
Closing connection`
    },
    {
      question: "How would you implement a metaclass in Python?",
      options: [
        "Create a class inheriting from type with __new__ or __init__",
        "Use regular inheritance",
        "Use class decorators",
        "Use static methods"
      ],
      correctAnswer: 0,
      explanation: "Metaclasses allow customizing class creation",
      language: 'python',
      category: 'oop',
      difficulty: 'hard',
      code: `
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class ValidatorMeta(type):
    def __new__(mcs, name, bases, namespace):
        # Add validation to all public methods
        for key, value in namespace.items():
            if not key.startswith('_') and callable(value):
                namespace[key] = mcs.validate_args(value)
        return super().__new__(mcs, name, bases, namespace)

    @staticmethod
    def validate_args(func):
        def wrapper(*args, **kwargs):
            for arg in args[1:]:  # Skip self
                if not isinstance(arg, (int, float, str)):
                    raise TypeError(f"Invalid argument type: {type(arg)}")
            return func(*args, **kwargs)
        return wrapper

# Using metaclasses
class Database(metaclass=SingletonMeta):
    def __init__(self):
        self.connected = False

    def connect(self):
        self.connected = True

class Calculator(metaclass=ValidatorMeta):
    def add(self, a, b):
        return a + b`,
      sampleInput: `
# Testing Singleton
db1 = Database()
db2 = Database()
print(db1 is db2)

# Testing Validator
calc = Calculator()
try:
    result = calc.add(1, [2])  # Should raise TypeError
except TypeError as e:
    print(str(e))`,
      sampleOutput: `
True
Invalid argument type: <class 'list'>`
    },
    {
      question: "How would you implement SOLID principles in Python?",
      options: [
        "Use interfaces, dependency injection, and proper class separation",
        "Use a single class for all functionality",
        "Use only static methods",
        "Use global functions"
      ],
      correctAnswer: 0,
      explanation: "SOLID principles help create maintainable and flexible code",
      language: 'python',
      category: 'oop',
      difficulty: 'hard',
      code: `
from abc import ABC, abstractmethod
from typing import Protocol

# Single Responsibility Principle
class Logger:
    def log(self, message: str) -> None:
        print(f"Log: {message}")

# Open/Closed Principle
class PaymentMethod(Protocol):
    def process_payment(self, amount: float) -> bool:
        ...

# Liskov Substitution Principle
class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

# Interface Segregation Principle
class Printable(Protocol):
    def print_document(self) -> None:
        ...

class Scannable(Protocol):
    def scan_document(self) -> None:
        ...

# Dependency Inversion Principle
class PaymentProcessor:
    def __init__(self, payment_method: PaymentMethod):
        self.payment_method = payment_method

    def process(self, amount: float) -> bool:
        return self.payment_method.process_payment(amount)

# Implementation examples
class CreditCardPayment:
    def process_payment(self, amount: float) -> bool:
        print(f"Processing credit card payment: ${amount}")
        return True

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return 3.14 * self.radius ** 2`,
      sampleInput: `
# Using Dependency Injection
payment_method = CreditCardPayment()
processor = PaymentProcessor(payment_method)
result = processor.process(100.0)

# Using LSP
circle = Circle(5)
print(f"Circle area: {circle.area()}")`,
      sampleOutput: `
Processing credit card payment: $100.0
True
Circle area: 78.5`
    },
    {
      question: "How would you implement a Factory pattern in Python?",
      options: [
        "Use class methods or separate factory classes",
        "Use regular constructors",
        "Use global functions",
        "Use static methods"
      ],
      correctAnswer: 0,
      explanation: "Factory pattern provides flexible object creation",
      language: 'python',
      category: 'oop',
      difficulty: 'medium',
      code: `
from abc import ABC, abstractmethod
from typing import Dict, Type

class Document(ABC):
    @abstractmethod
    def create(self) -> None:
        pass

class PDFDocument(Document):
    def create(self) -> None:
        print("Creating PDF document")

class WordDocument(Document):
    def create(self) -> None:
        print("Creating Word document")

class DocumentFactory:
    _creators: Dict[str, Type[Document]] = {
        "pdf": PDFDocument,
        "word": WordDocument
    }

    @classmethod
    def register_format(cls, format_type: str, creator: Type[Document]) -> None:
        cls._creators[format_type] = creator

    @classmethod
    def create_document(cls, format_type: str) -> Document:
        creator = cls._creators.get(format_type)
        if not creator:
            raise ValueError(f"Invalid document format: {format_type}")
        return creator()

# Alternative using class methods
class Document2(ABC):
    @classmethod
    @abstractmethod
    def create(cls, content: str) -> 'Document2':
        pass

class JSONDocument(Document2):
    def __init__(self, data: dict):
        self.data = data

    @classmethod
    def create(cls, content: str) -> 'JSONDocument':
        return cls(json.loads(content))`,
      sampleInput: `
# Using factory class
pdf_doc = DocumentFactory.create_document("pdf")
pdf_doc.create()

word_doc = DocumentFactory.create_document("word")
word_doc.create()`,
      sampleOutput: `
Creating PDF document
Creating Word document`
    },
    {
      question: "How would you implement custom exception handling in Python?",
      options: [
        "Create custom exception classes and use context managers",
        "Use only built-in exceptions",
        "Use assert statements",
        "Use if-else statements"
      ],
      correctAnswer: 0,
      explanation: "Custom exceptions provide better error handling and debugging",
      language: 'python',
      category: 'oop',
      difficulty: 'medium',
      code: `
class DatabaseError(Exception):
    """Base exception for database errors"""
    pass

class ConnectionError(DatabaseError):
    """Raised when database connection fails"""
    def __init__(self, host: str, port: int):
        self.host = host
        self.port = port
        super().__init__(f"Failed to connect to {host}:{port}")

class QueryError(DatabaseError):
    """Raised when query execution fails"""
    def __init__(self, query: str, message: str):
        self.query = query
        self.message = message
        super().__init__(f"Query failed: {message}\nQuery: {query}")

class Database:
    def __init__(self, host: str, port: int):
        self.host = host
        self.port = port
        self.connected = False

    def connect(self):
        if not self.test_connection():
            raise ConnectionError(self.host, self.port)
        self.connected = True

    def execute(self, query: str):
        if not self.connected:
            raise DatabaseError("Not connected")
        if not self.validate_query(query):
            raise QueryError(query, "Invalid SQL syntax")
        return "Query results"

    def test_connection(self):
        return self.host == "localhost"

    def validate_query(self, query: str):
        return "SELECT" in query.upper()`,
      sampleInput: `
db = Database("remote", 5432)
try:
    db.connect()
except ConnectionError as e:
    print(f"Connection failed: {e}")

db = Database("localhost", 5432)
db.connect()
try:
    db.execute("INVALID SQL")
except QueryError as e:
    print(f"Query failed: {e}")`,
      sampleOutput: `
Connection failed: Failed to connect to remote:5432
Query failed: Query failed: Invalid SQL syntax
Query: INVALID SQL`
    },
    {
      question: "How would you implement object pooling in Python?",
      options: [
        "Use a class to manage object creation and reuse",
        "Create new objects each time",
        "Use global variables",
        "Use static methods"
      ],
      correctAnswer: 0,
      explanation: "Object pooling improves performance by reusing objects",
      language: 'python',
      category: 'oop',
      difficulty: 'hard',
      code: `
from typing import List, Optional
import threading

class Resource:
    def __init__(self, id: int):
        self.id = id
        self.is_busy = False

    def use(self):
        print(f"Using resource {self.id}")

class ObjectPool:
    def __init__(self, size: int):
        self.size = size
        self.resources: List[Resource] = []
        self.lock = threading.Lock()
        self._create_pool()

    def _create_pool(self):
        for i in range(self.size):
            self.resources.append(Resource(i))

    def acquire(self) -> Optional[Resource]:
        with self.lock:
            for resource in self.resources:
                if not resource.is_busy:
                    resource.is_busy = True
                    return resource
            return None

    def release(self, resource: Resource):
        with self.lock:
            if resource in self.resources:
                resource.is_busy = False

class DatabaseConnection:
    def __init__(self, pool: ObjectPool):
        self.pool = pool
        self.resource = None

    def __enter__(self):
        self.resource = self.pool.acquire()
        return self.resource

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.resource:
            self.pool.release(self.resource)`,
      sampleInput: `
pool = ObjectPool(2)
with DatabaseConnection(pool) as conn1:
    if conn1:
        conn1.use()
    with DatabaseConnection(pool) as conn2:
        if conn2:
            conn2.use()
        with DatabaseConnection(pool) as conn3:
            print("Third connection:", conn3)`,
      sampleOutput: `
Using resource 0
Using resource 1
Third connection: None`
    }
  ];
}