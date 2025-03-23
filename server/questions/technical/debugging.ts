import { TechnicalQuestion } from '../../types';

export async function getDebuggingQuestionsJava(): Promise<TechnicalQuestion[]> {
  return [
    {
      question: "What's wrong with this string reversal implementation?",
      options: [
        "Loop iterates full length causing double reversal of characters",
        "Array bounds checking is missing causing potential overflow",
        "Temporary variable is unnecessary for swapping",
        "String to char array conversion is inefficient"
      ],
      correctAnswer: 0,
      explanation: "The loop should run until i < length/2 to avoid re-reversing the string",
      language: 'java',
      category: 'debugging',
      difficulty: 'easy',
      code: `
public String reverseString(String str) {
    char[] chars = str.toCharArray();
    int length = chars.length;

    // Bug: Loop condition should be i < length/2
    for (int i = 0; i < length; i++) {
        char temp = chars[i];
        chars[i] = chars[length - 1 - i];
        chars[length - 1 - i] = temp;
    }

    return new String(chars);
}`,
      sampleInput: '"hello"',
      sampleOutput: '"olleh"'
    },
    {
      question: "What's the bug in this binary search implementation?",
      options: [
        "Mid calculation can cause integer overflow with large arrays",
        "Loop condition should be left < right",
        "Array bounds checking is missing",
        "Return value for not found case is incorrect"
      ],
      correctAnswer: 0,
      explanation: "Using (left + right) / 2 can cause integer overflow with large arrays",
      language: 'java',
      category: 'debugging',
      difficulty: 'medium',
      code: `
public int binarySearch(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;

    while (left <= right) {
        // Bug: Can cause integer overflow
        int mid = (left + right) / 2;

        if (nums[mid] == target) {
            return mid;
        }
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
      sampleInput: "nums = [1,2,3,4,5], target = 3",
      sampleOutput: "2"
    },
    {
      question: "What's wrong with this thread synchronization implementation?",
      options: [
        "Missing synchronization on shared resource access",
        "Thread pool configuration is incorrect",
        "Thread naming is missing",
        "Exception handling is incomplete"
      ],
      correctAnswer: 0,
      explanation: "Concurrent access to shared counter needs synchronization",
      language: 'java',
      category: 'debugging',
      difficulty: 'hard',
      code: `
class SharedCounter {
    private int count = 0;

    // Bug: Method should be synchronized
    public void increment() {
        // Bug: This is not atomic
        count = count + 1;
    }

    public int getCount() {
        return count;
    }
}

class CounterThread extends Thread {
    private SharedCounter counter;

    public CounterThread(SharedCounter counter) {
        this.counter = counter;
    }

    @Override
    public void run() {
        for (int i = 0; i < 1000; i++) {
            counter.increment();
        }
    }
}`,
      sampleInput: `
SharedCounter counter = new SharedCounter();
Thread t1 = new CounterThread(counter);
Thread t2 = new CounterThread(counter);
t1.start(); t2.start();
t1.join(); t2.join();
System.out.println(counter.getCount());`,
      sampleOutput: "Less than 2000 due to race condition"
    },
    {
      question: "What's the bug in this resource management code?",
      options: [
        "Resources not properly closed in case of exception",
        "File path validation is missing",
        "Buffer size is too small",
        "File mode is incorrect"
      ],
      correctAnswer: 0,
      explanation: "Resources should be closed in finally block or use try-with-resources",
      language: 'java',
      category: 'debugging',
      difficulty: 'medium',
      code: `
public class FileProcessor {
    public String readFile(String path) throws IOException {
        // Bug: Resources might not be closed if exception occurs
        FileReader fileReader = new FileReader(path);
        BufferedReader reader = new BufferedReader(fileReader);

        StringBuilder content = new StringBuilder();
        String line;

        while ((line = reader.readLine()) != null) {
            content.append(line).append("\\n");
        }

        reader.close();
        fileReader.close();

        return content.toString();
    }
}`,
      sampleInput: `
FileProcessor processor = new FileProcessor();
String content = processor.readFile("test.txt");`,
      sampleOutput: "FileReader might leak if exception occurs"
    },
    {
      question: "What's wrong with this null pointer handling?",
      options: [
        "Missing null checks before accessing object methods",
        "Exception handling is too broad",
        "Method return type is incorrect",
        "Variable scope is too wide"
      ],
      correctAnswer: 0,
      explanation: "Methods should check for null parameters before accessing them",
      language: 'java',
      category: 'debugging',
      difficulty: 'easy',
      code: `
public class UserManager {
    public String formatUserName(User user) {
        // Bug: No null check before accessing user methods
        String firstName = user.getFirstName().trim();
        String lastName = user.getLastName().trim();

        return firstName + " " + lastName;
    }

    public void sendWelcomeEmail(User user) {
        // Bug: NullPointerException if email is null
        String email = user.getEmail().toLowerCase();
        String message = "Welcome " + formatUserName(user);
        emailService.send(email, message);
    }
}`,
      sampleInput: `
User user = getUser(); // might return null
userManager.sendWelcomeEmail(user);`,
      sampleOutput: "NullPointerException if user or email is null"
    },
    {
      question: "What's the bug in this collection manipulation code?",
      options: [
        "Concurrent modification of collection during iteration",
        "Collection initialization is incorrect",
        "Wrong collection type used",
        "Sorting implementation is inefficient"
      ],
      correctAnswer: 0,
      explanation: "Cannot modify collection while iterating using foreach loop",
      language: 'java',
      category: 'debugging',
      difficulty: 'medium',
      code: `
public class ListCleaner {
    public void removeInvalid(List<String> items) {
        // Bug: ConcurrentModificationException will occur
        for (String item : items) {
            if (!isValid(item)) {
                items.remove(item);
            }
        }
    }

    private boolean isValid(String item) {
        return item != null && !item.isEmpty();
    }
}`,
      sampleInput: `
List<String> items = new ArrayList<>(Arrays.asList("a", "", "b", null, "c"));
cleaner.removeInvalid(items);`,
      sampleOutput: "ConcurrentModificationException"
    },
    {
      question: "What's wrong with this singleton implementation?",
      options: [
        "Not thread-safe due to lazy initialization",
        "Constructor should be private",
        "Instance variable should be volatile",
        "Method synchronization is unnecessary"
      ],
      correctAnswer: 0,
      explanation: "Double-checked locking pattern needs volatile keyword",
      language: 'java',
      category: 'debugging',
      difficulty: 'hard',
      code: `
public class DatabaseConnection {
    // Bug: instance should be volatile
    private static DatabaseConnection instance;

    private DatabaseConnection() {}

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            // Bug: Race condition possible here
            synchronized(DatabaseConnection.class) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
}`,
      sampleInput: `
// Multiple threads accessing
Thread t1 = new Thread(() -> DatabaseConnection.getInstance());
Thread t2 = new Thread(() -> DatabaseConnection.getInstance());
t1.start(); t2.start();`,
      sampleOutput: "Possible partially constructed instance due to reordering"
    },
    {
      question: "What's the bug in this exception handling code?",
      options: [
        "Generic exception catches specific ones",
        "Finally block is missing",
        "Exception message is incorrect",
        "Wrong exception type is thrown"
      ],
      correctAnswer: 0,
      explanation: "Specific exceptions should be caught before generic ones",
      language: 'java',
      category: 'debugging',
      difficulty: 'medium',
      code: `
public class ExceptionHandler {
    public void processFile(String path) {
        try {
            // Bug: Order of catch blocks is wrong
            Files.readAllLines(Paths.get(path));
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        } catch (IOException e) {
            System.err.println("IO Error: " + e.getMessage());
        } catch (SecurityException e) {
            System.err.println("Security Error: " + e.getMessage());
        }
    }
}`,
      sampleInput: "handler.processFile('confidential.txt')",
      sampleOutput: "SecurityException caught by general Exception block"
    },
    {
      question: "What's wrong with this array copy implementation?",
      options: [
        "Array bounds not checked before copy operation",
        "Array size calculation is incorrect",
        "Wrong array type used",
        "Copy method is inefficient"
      ],
      correctAnswer: 0,
      explanation: "Should check array bounds to prevent ArrayIndexOutOfBoundsException",
      language: 'java',
      category: 'debugging',
      difficulty: 'easy',
      code: `
public class ArrayCopier {
    public int[] copyArray(int[] source, int start, int length) {
        // Bug: No bounds checking
        int[] result = new int[length];

        // Bug: Possible ArrayIndexOutOfBoundsException
        for (int i = 0; i < length; i++) {
            result[i] = source[start + i];
        }

        return result;
    }
}`,
      sampleInput: `
int[] source = {1, 2, 3, 4, 5};
int[] result = copier.copyArray(source, 3, 3);`,
      sampleOutput: "ArrayIndexOutOfBoundsException"
    },
    {
      question: "What's the bug in this builder pattern implementation?",
      options: [
        "Missing validation in build method",
        "Builder methods return wrong type",
        "Constructor access is incorrect",
        "Method naming is inconsistent"
      ],
      correctAnswer: 0,
      explanation: "Build method should validate required fields",
      language: 'java',
      category: 'debugging',
      difficulty: 'medium',
      code: `
public class User {
    private final String username;
    private final String email;
    private final int age;

    private User(Builder builder) {
        this.username = builder.username;
        this.email = builder.email;
        this.age = builder.age;
    }

    public static class Builder {
        private String username;
        private String email;
        private int age;

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder age(int age) {
            this.age = age;
            return this;
        }

        // Bug: No validation before building
        public User build() {
            return new User(this);
        }
    }
}`,
      sampleInput: `
User user = new User.Builder()
    .username(null)
    .email("")
    .age(-1)
    .build();`,
      sampleOutput: "Invalid user object created without validation"
    }
  ];
}

export async function getDebuggingQuestionsPython(): Promise<TechnicalQuestion[]> {
  return [
    {
      question: "What's the bug in this binary search implementation?",
      options: [
        "Missing check for empty list at the start",
        "Mid calculation should use floor division",
        "List indices are incorrect",
        "Return value for not found case is missing"
      ],
      correctAnswer: 0,
      explanation: "Need to check if list is empty before searching",
      language: 'python',
      category: 'debugging',
      difficulty: 'medium',
      code: `
def binary_search(nums: List[int], target: int) -> int:
    # Bug: Missing base case for empty list
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      sampleInput: "nums = [1,2,3,4,5], target = 3",
      sampleOutput: "2"
    },
    {
      question: "What's wrong with this list comprehension?",
      options: [
        "Memory inefficient for large lists",
        "Syntax error in comprehension",
        "Wrong list method used",
        "Incorrect list slicing"
      ],
      correctAnswer: 0,
      explanation: "Should use generator expression for memory efficiency",
      language: 'python',
      category: 'debugging',
      difficulty: 'medium',
      code: `
def process_large_file(filename: str) -> List[str]:
    # Bug: Memory inefficient for large files
    with open(filename) as f:
        # Loads entire file into memory
        lines = [line.strip() 
                for line in f.readlines() 
                if line.strip()]
    return lines`,
      sampleInput: "process_large_file('huge_file.txt')",
      sampleOutput: "MemoryError for very large files"
    },
    {
      question: "What's the bug in this context manager implementation?",
      options: [
        "Missing exception handling in __exit__",
        "Wrong method signatures",
        "Resource not properly initialized",
        "Context variables scope incorrect"
      ],
      correctAnswer: 0,
      explanation: "Context manager should handle exceptions in __exit__",
      language: 'python',
      category: 'debugging',
      difficulty: 'hard',
      code: `
class DatabaseConnection:
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.conn = None

    def __enter__(self):
        self.conn = self.connect()
        return self.conn

    # Bug: No exception handling
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()

    def connect(self):
        return psycopg2.connect(self.connection_string)`,
      sampleInput: `
with DatabaseConnection("postgresql://...") as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT 1/0")  # Raises ZeroDivisionError`,
      sampleOutput: "Connection might not be properly closed"
    },
    {
      question: "What's wrong with this decorator implementation?",
      options: [
        "Missing functools.wraps decorator",
        "Arguments passed incorrectly",
        "Return value handling incorrect",
        "Decorator syntax error"
      ],
      correctAnswer: 0,
      explanation: "functools.wraps preserves function metadata",
      language: 'python',
      category: 'debugging',
      difficulty: 'medium',
      code: `
def retry(times: int):
    def decorator(func):
        # Bug: Missing @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for i in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if i == times - 1:
                        raise e
                    time.sleep(1)
        return wrapper
    return decorator

@retry(times=3)
def fetch_data():
    """Fetches data from API"""
    return requests.get('https://api.example.com/data')`,
      sampleInput: "help(fetch_data)",
      sampleOutput: "Shows wrapper function docs instead of original"
    },
    {
      question: "What's the bug in this class attribute usage?",
      options: [
        "Mutable class attribute used as default",
        "Instance attribute not initialized",
        "Wrong attribute type",
        "Attribute name conflict"
      ],
      correctAnswer: 0,
      explanation: "Mutable defaults are shared between instances",
      language: 'python',
      category: 'debugging',
      difficulty: 'medium',
      code: `
class User:
    # Bug: Mutable default value
    friends = []

    def __init__(self, name: str):
        self.name = name

    def add_friend(self, friend: 'User'):
        self.friends.append(friend)

    def get_friends(self) -> List['User']:
        return self.friends`,
      sampleInput: `
user1 = User("Alice")
user2 = User("Bob")
user1.add_friend(User("Charlie"))
print(user2.get_friends())`,
      sampleOutput: "[User(name='Charlie')] # Unexpected shared state"
    },
    {
      question: "What's wrong with this property implementation?",
      options: [
        "Infinite recursion in setter",
        "Property decorator missing",
        "Attribute name incorrect",
        "Wrong property method used"
      ],
      correctAnswer: 0,
      explanation: "Using same name in setter causes infinite recursion",
      language: 'python',
      category: 'debugging',
      difficulty: 'medium',
      code: `
class Temperature:
    def __init__(self, celsius: float):
        self._celsius = celsius

    @property
    def celsius(self) -> float:
        return self._celsius

    @celsius.setter
    def celsius(self, value: float):
        # Bug: Infinite recursion
        self.celsius = value

    @property
    def fahrenheit(self) -> float:
        return (self.celsius * 9/5) + 32`,
      sampleInput: `
temp = Temperature(25)
temp.celsius = 30`,
      sampleOutput: "RecursionError: maximum recursion depth exceeded"
    },
    {
      question: "What's the bug in this metaclass implementation?",
      options: [
        "Missing super() call in __new__",
        "Wrong metaclass method used",
        "Class attributes not properly set",
        "Inheritance chain broken"
      ],
      correctAnswer: 0,
      explanation: "Metaclass should call super().__new__",
      language: 'python',
      category: 'debugging',
      difficulty: 'hard',
      code: `
class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            # Bug: Missing super() call
            cls._instances[cls] = cls.__new__(cls)
            cls._instances[cls].__init__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=Singleton):
    def __init__(self, connection_string: str):
        self.connection_string = connection_string`,
      sampleInput: `
db1 = Database("postgresql://...")
db2 = Database("postgresql://...")
print(db1 is db2)`,
      sampleOutput: "AttributeError: 'Database' object has no attribute 'connection_string'"
    },
    {
      question: "What's wrong with this async/await usage?",
      options: [
        "Blocking call in async function",
        "Async function not properly defined",
        "Await keyword missing",
        "Wrong async library used"
      ],
      correctAnswer: 0,
      explanation: "Should use aiohttp instead of requests in async function",
      language: 'python',
      category: 'debugging',
      difficulty: 'hard',
      code: `
async def fetch_all_urls(urls: List[str]) -> List[dict]:
    results = []
    for url in urls:
        # Bug: Blocking call in async function
        response = requests.get(url)
        results.append(response.json())
    return results

async def main():
    urls = [
        'https://api.example.com/1',
        'https://api.example.com/2'
    ]
    return await fetch_all_urls(urls)`,
      sampleInput: "asyncio.run(main())",
      sampleOutput: "Entire event loop blocked during requests.get"
    },
    {
      question: "What's the bug in this exception handling?",
      options: [
        "Base exception caught before specific ones",
        "Wrong exception type caught",
        "Exception not properly re-raised",
        "Finally block missing"
      ],
      correctAnswer: 0,
      explanation: "Specific exceptions should be caught before base Exception",
      language: 'python',
      category: 'debugging',
      difficulty: 'medium',
      code: `
def process_data(data: str) -> dict:
    try:
        # Bug: Exception order is wrong
        processed = json.loads(data)
        return processed
    except Exception as e:
        logging.error(f"Error processing data: {e}")
        raise
    except json.JSONDecodeError as e:
        logging.error(f"Invalid JSON: {e}")
        raise ValueError("Invalid data format")`,
      sampleInput: 'process_data("invalid json")',
      sampleOutput: "General Exception caught instead of JSONDecodeError"
    },
    {
      question: "What's wrong with this iterator implementation?",
      options: [
        "StopIteration not properly raised",
        "Iterator protocol incomplete",
        "Wrong method names used",
        "Return value incorrect"
      ],
      correctAnswer: 0,
      explanation: "Iterator should raise StopIteration when exhausted",
      language: 'python',
      category: 'debugging',
      difficulty: 'medium',
      code: `
class CustomRange:
    def __init__(self, start: int, end: int):
        self.start = start
        self.end = end
        self.current = start

    def __iter__(self):
        return self

    # Bug: Doesn't raise StopIteration
    def __next__(self):
        if self.current >= self.end:
            return None
        value = self.current
        self.current += 1
        return value`,
      sampleInput: `
for i in CustomRange(1, 3):
    print(i)
print("Done")`,
      sampleOutput: "1, 2, None, None, None... (infinite loop)"
    }
  ];
}