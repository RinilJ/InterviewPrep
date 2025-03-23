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
      sampleInput: "circle = Circle(5)\nprint(circle.area())",
      sampleOutput: "78.53975"
    },
    {
      question: "How would you implement a Bank Account hierarchy using abstract base classes?",
      options: [
        "Use ABC and abstract methods",
        "Use regular inheritance",
        "Use multiple inheritance",
        "Use class decorators"
      ],
      correctAnswer: 0,
      explanation: "ABC enforces interface implementation in Python",
      language: 'python',
      category: 'oop',
      difficulty: 'medium',
      code: `
from abc import ABC, abstractmethod

class BankAccount(ABC):
    def __init__(self, balance: float):
        self._balance = balance

    @property
    def balance(self) -> float:
        return self._balance

    @abstractmethod
    def withdraw(self, amount: float) -> bool:
        pass

    @abstractmethod
    def deposit(self, amount: float) -> bool:
        pass

class CheckingAccount(BankAccount):
    def __init__(self, balance: float, overdraft_limit: float):
        super().__init__(balance)
        self._overdraft_limit = overdraft_limit

    def withdraw(self, amount: float) -> bool:
        if self._balance - amount >= -self._overdraft_limit:
            self._balance -= amount
            return True
        return False

    def deposit(self, amount: float) -> bool:
        self._balance += amount
        return True`,
      sampleInput: `
account = CheckingAccount(100.0, 50.0)
print(account.withdraw(120.0))
print(account.balance)`,
      sampleOutput: "True\n-20.0"
    },
    {
      question: "How would you implement a custom container class in Python?",
      options: [
        "Implement __len__, __getitem__, and __iter__",
        "Inherit from list class",
        "Use composition with a list",
        "Use dictionary instead"
      ],
      correctAnswer: 0,
      explanation: "Custom containers need special methods for proper integration",
      language: 'python',
      category: 'oop',
      difficulty: 'medium',
      code: `
class CustomList:
    def __init__(self, items=None):
        self._items = items if items is not None else []

    def __len__(self) -> int:
        return len(self._items)

    def __getitem__(self, index: int):
        return self._items[index]

    def __iter__(self):
        return iter(self._items)

    def append(self, item):
        self._items.append(item)

    def __str__(self) -> str:
        return f"CustomList({self._items})"`,
      sampleInput: `
custom = CustomList([1, 2, 3])
for item in custom:
    print(item)
print(len(custom))`,
      sampleOutput: "1\n2\n3\n3"
    },
    {
      question: "How would you implement a Singleton pattern in Python?",
      options: [
        "Use __new__ method and class variable",
        "Use global variable",
        "Use class decorator",
        "Use module-level variable"
      ],
      correctAnswer: 0,
      explanation: "Control instance creation with __new__ method",
      language: 'python',
      category: 'oop',
      difficulty: 'hard',
      code: `
class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, value: str):
        # Initialize only once
        if not hasattr(self, 'value'):
            self.value = value`,
      sampleInput: `
s1 = Singleton("first")
s2 = Singleton("second")
print(s1.value, s2.value)
print(s1 is s2)`,
      sampleOutput: "first first\nTrue"
    },
    {
      question: "How would you implement method chaining in Python?",
      options: [
        "Return self from methods",
        "Use properties",
        "Use static methods",
        "Return new instance"
      ],
      correctAnswer: 0,
      explanation: "Return self enables method chaining",
      language: 'python',
      category: 'oop',
      difficulty: 'medium',
      code: `
class QueryBuilder:
    def __init__(self):
        self._select = "*"
        self._from = ""
        self._where = []

    def select(self, columns: str) -> 'QueryBuilder':
        self._select = columns
        return self

    def from_table(self, table: str) -> 'QueryBuilder':
        self._from = table
        return self

    def where(self, condition: str) -> 'QueryBuilder':
        self._where.append(condition)
        return self

    def build(self) -> str:
        query = f"SELECT {self._select} FROM {self._from}"
        if self._where:
            query += " WHERE " + " AND ".join(self._where)
        return query`,
      sampleInput: `
query = QueryBuilder()
sql = query.select("name, age")\\
           .from_table("users")\\
           .where("age > 18")\\
           .build()
print(sql)`,
      sampleOutput: "SELECT name, age FROM users WHERE age > 18"
    },
    {
      question: "How would you implement a descriptor in Python?",
      options: [
        "Create class with __get__, __set__, __delete__",
        "Use property decorator",
        "Use class methods",
        "Use static methods"
      ],
      correctAnswer: 0,
      explanation: "Descriptors control attribute access",
      language: 'python',
      category: 'oop',
      difficulty: 'hard',
      code: `
class ValidString:
    def __init__(self, minlen: int = 1):
        self.minlen = minlen
        self.data = {}

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return self.data.get(id(obj))

    def __set__(self, obj, value: str):
        if not isinstance(value, str):
            raise TypeError("Value must be a string")
        if len(value) < self.minlen:
            raise ValueError(
                f"String must be at least {self.minlen} characters"
            )
        self.data[id(obj)] = value

class User:
    name = ValidString(minlen=2)
    email = ValidString(minlen=5)`,
      sampleInput: `
user = User()
user.name = "John"
try:
    user.name = "A"  # Too short
except ValueError as e:
    print(str(e))`,
      sampleOutput: "String must be at least 2 characters"
    },
    {
      question: "How would you implement multiple inheritance with super()?",
      options: [
        "Use super() with explicit parent class",
        "Call parent methods directly",
        "Use multiple super() calls",
        "Skip parent initialization"
      ],
      correctAnswer: 0,
      explanation: "super() handles method resolution order properly",
      language: 'python',
      category: 'oop',
      difficulty: 'hard',
      code: `
class SaveMixin:
    def save(self):
        print(f"Saving {self.__class__.__name__}")
        return self

class ValidateMixin:
    def validate(self):
        print(f"Validating {self.__class__.__name__}")
        return self

class Model:
    def __init__(self, name: str):
        self.name = name

class User(SaveMixin, ValidateMixin, Model):
    def __init__(self, name: str, email: str):
        super().__init__(name)
        self.email = email

    def save(self):
        self.validate()
        return super().save()`,
      sampleInput: `
user = User("John", "john@example.com")
user.save()`,
      sampleOutput: "Validating User\nSaving User"
    },
    {
      question: "How would you implement a context manager?",
      options: [
        "Use __enter__ and __exit__ methods",
        "Use with statement alone",
        "Use try/finally blocks",
        "Use decorator pattern"
      ],
      correctAnswer: 0,
      explanation: "Context managers need __enter__ and __exit__",
      language: 'python',
      category: 'oop',
      difficulty: 'medium',
      code: `
class FileManager:
    def __init__(self, filename: str, mode: str = 'r'):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        return False  # Don't suppress exceptions`,
      sampleInput: `
with FileManager('test.txt', 'w') as f:
    f.write('Hello, World!')`,
      sampleOutput: "File is automatically closed after writing"
    },
    {
      question: "How would you implement a property with validation?",
      options: [
        "Use @property decorator with setter",
        "Use public variables",
        "Use __getattr__",
        "Use instance methods"
      ],
      correctAnswer: 0,
      explanation: "Properties allow validation in setters",
      language: 'python',
      category: 'oop',
      difficulty: 'medium',
      code: `
class Temperature:
    def __init__(self, celsius: float = 0):
        self._celsius = celsius

    @property
    def celsius(self) -> float:
        return self._celsius

    @celsius.setter
    def celsius(self, value: float):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self) -> float:
        return (self.celsius * 9/5) + 32`,
      sampleInput: `
temp = Temperature(25)
print(f"{temp.celsius}°C is {temp.fahrenheit}°F")
try:
    temp.celsius = -300
except ValueError as e:
    print(str(e))`,
      sampleOutput: "25°C is 77°F\nTemperature below absolute zero!"
    },
    {
      question: "How would you implement a class factory?",
      options: [
        "Use classmethod as alternative constructor",
        "Use static factory method",
        "Use regular methods",
        "Use inheritance only"
      ],
      correctAnswer: 0,
      explanation: "Class methods provide alternative constructors",
      language: 'python',
      category: 'oop',
      difficulty: 'medium',
      code: `
class Date:
    def __init__(self, year: int, month: int, day: int):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, date_str: str) -> 'Date':
        year, month, day = map(int, date_str.split('-'))
        return cls(year, month, day)

    @classmethod
    def today(cls) -> 'Date':
        import datetime
        today = datetime.date.today()
        returncls(today.year, today.month, today.day)

    def __str__(self) -> str:
        return f"{self.year}-{self.month:02d}-{self.day:02d}"`,
      sampleInput: `
date = Date.from_string("2024-03-23")
print(date)`,
      sampleOutput: "2024-03-23"
    }
  ];
}