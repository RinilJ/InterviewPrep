import { TechnicalQuestion } from '../../types';

// DSA Questions - Arrays & String Operations
export async function getArrayQuestionsJava(): Promise<TechnicalQuestion[]> {
  return [
    {
      question: "Given an array [2,7,11,15] and target = 9, how would you find two numbers that add up to the target?",
      options: [
        "Create a HashMap, store each number's complement (target - num) and find matching pair",
        "Sort the array first and use binary search for each element",
        "Use two nested loops to check every possible pair",
        "Convert array to linked list and traverse with two pointers"
      ],
      correctAnswer: 0,
      explanation: "HashMap provides O(n) time complexity by storing complements",
      language: 'java',
      category: 'dsa',
      difficulty: 'easy',
      code: `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`,
      sampleInput: "nums = [2,7,11,15], target = 9",
      sampleOutput: "[0,1]",
      testCases: [
        "nums = [3,2,4], target = 6",
        "nums = [3,3], target = 6",
        "nums = [1,2,3,4], target = 7"
      ]
    },
    {
      question: "How would you find the longest substring without repeating characters?",
      options: [
        "Use sliding window with HashSet",
        "Use dynamic programming",
        "Use brute force approach",
        "Use HashMap with character counting"
      ],
      correctAnswer: 0,
      explanation: "Sliding window with HashSet provides optimal O(n) solution",
      language: 'java',
      category: 'dsa',
      difficulty: 'medium',
      code: `
class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>();
        int maxLength = 0;
        int left = 0;
        int right = 0;

        while (right < s.length()) {
            if (!set.contains(s.charAt(right))) {
                set.add(s.charAt(right));
                maxLength = Math.max(maxLength, right - left + 1);
                right++;
            } else {
                set.remove(s.charAt(left));
                left++;
            }
        }
        return maxLength;
    }
}`,
      sampleInput: "s = \"abcabcbb\"",
      sampleOutput: "3",
      testCases: [
        "s = \"bbbbb\"",
        "s = \"pwwkew\"",
        "s = \"\"" 
      ]
    },
    {
      question: "How would you implement a Queue using two Stacks?",
      options: [
        "Move elements between stacks during push/pop operations",
        "Use a single stack with extra memory",
        "Use linked list instead",
        "Use array rotation"
      ],
      correctAnswer: 0,
      explanation: "Using two stacks allows O(1) amortized time complexity for queue operations",
      language: 'java',
      category: 'dsa',
      difficulty: 'medium',
      code: `
class MyQueue {
    private Stack<Integer> s1;
    private Stack<Integer> s2;

    public MyQueue() {
        s1 = new Stack<>();
        s2 = new Stack<>();
    }

    public void push(int x) {
        s1.push(x);
    }

    public int pop() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
        return s2.pop();
    }

    public int peek() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
        return s2.peek();
    }

    public boolean empty() {
        return s1.isEmpty() && s2.isEmpty();
    }
}`,
      sampleInput: `
MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);
queue.peek();
queue.pop();`,
      sampleOutput: `
1
1`,
      testCases: [
        "push(1), push(2), peek(), pop(), empty()",
        "push(1), pop(), empty()",
        "push(1), push(2), push(3), pop(), pop(), pop()"
      ]
    },
    {
      question: "How would you implement bracket matching to check if a string of brackets is valid?",
      options: [
        "Use a stack to track opening brackets and match with closing brackets",
        "Count the number of opening and closing brackets",
        "Use string replacement to remove valid pairs recursively",
        "Create a binary tree of bracket pairs"
      ],
      correctAnswer: 0,
      explanation: "Stack provides perfect LIFO structure for matching brackets in correct order",
      language: 'java',
      category: 'dsa',
      difficulty: 'easy',
      code: `
class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }
}`,
      sampleInput: "s = \"()[]{}\"",
      sampleOutput: "true",
      testCases: [
        "s = \"(]\"",
        "s = \"([)]\"",
        "s = \"{[]}\"",
      ]
    },
    {
      question: "Maximum Subarray: Find the contiguous subarray with the largest sum.",
      options: [
        "Use Kadane's Algorithm",
        "Use nested loops to try all subarrays",
        "Sort the array first",
        "Use divide and conquer"
      ],
      correctAnswer: 0,
      explanation: "Kadane's Algorithm provides optimal O(n) solution",
      language: 'java',
      category: 'dsa',
      difficulty: 'medium',
      code: `
class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];

        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,
      sampleInput: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      sampleOutput: "6",
      testCases: [
        "nums = [1]",
        "nums = [5,4,-1,7,8]",
        "nums = [-1,-2,-3,-4]"
      ]
    }
  ];
}

export async function getArrayQuestionsPython(): Promise<TechnicalQuestion[]> {
  return [
    {
      question: "Given a list [2,7,11,15] and target = 9, how would you find two numbers that add up to the target?",
      options: [
        "Use a dictionary to store complements and find matching pair",
        "Sort the list first and use binary search",
        "Use nested loops to check every possible pair",
        "Convert list to linked list and use two pointers"
      ],
      correctAnswer: 0,
      explanation: "Dictionary provides O(n) time complexity by storing complements",
      language: 'python',
      category: 'dsa',
      difficulty: 'easy',
      code: `
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
      sampleInput: "nums = [2,7,11,15], target = 9",
      sampleOutput: "[0,1]",
      testCases: [
        "nums = [3,2,4], target = 6",
        "nums = [3,3], target = 6",
        "nums = [1,2,3,4], target = 7"
      ]
    },
    {
      question: "How would you find the longest substring without repeating characters in Python?",
      options: [
        "Use sliding window with set",
        "Use dictionary to store last positions",
        "Use string slicing",
        "Use list comprehension"
      ],
      correctAnswer: 0,
      explanation: "Sliding window with set provides optimal O(n) solution",
      language: 'python',
      category: 'dsa',
      difficulty: 'medium',
      code: `
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_set = set()
        max_length = 0
        left = 0

        for right in range(len(s)):
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1
            char_set.add(s[right])
            max_length = max(max_length, right - left + 1)

        return max_length`,
      sampleInput: "s = \"abcabcbb\"",
      sampleOutput: "3",
      testCases: [
        "s = \"bbbbb\"",
        "s = \"pwwkew\"",
        "s = \"\""
      ]
    },
    {
      question: "How would you implement a Queue using two Stacks in Python?",
      options: [
        "Use two lists as stacks",
        "Use collections.deque",
        "Use queue.Queue",
        "Use single list"
      ],
      correctAnswer: 0,
      explanation: "Two lists can be used as stacks to implement queue operations",
      language: 'python',
      category: 'dsa',
      difficulty: 'medium',
      code: `
class MyQueue:
    def __init__(self):
        self.s1 = []
        self.s2 = []

    def push(self, x: int) -> None:
        self.s1.append(x)

    def pop(self) -> int:
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2.pop()

    def peek(self) -> int:
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2[-1]

    def empty(self) -> bool:
        return not self.s1 and not self.s2`,
      sampleInput: `
queue = MyQueue()
queue.push(1)
queue.push(2)
queue.peek()
queue.pop()`,
      sampleOutput: `
1
1`,
      testCases: [
        "push(1), push(2), peek(), pop(), empty()",
        "push(1), pop(), empty()",
        "push(1), push(2), push(3), pop(), pop(), pop()"
      ]
    },
    {
      question: "How would you implement bracket matching to check if a string of brackets is valid?",
      options: [
        "Use a stack to track opening brackets and match with closing brackets",
        "Count the number of opening and closing brackets",
        "Use string replacement to remove valid pairs recursively",
        "Create a binary tree of bracket pairs"
      ],
      correctAnswer: 0,
      explanation: "Stack provides perfect LIFO structure for matching brackets in correct order",
      language: 'python',
      category: 'dsa',
      difficulty: 'easy',
      code: `
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        brackets = {')': '(', '}': '{', ']': '['}

        for char in s:
            if char in '({[':
                stack.append(char)
            else:
                if not stack or stack.pop() != brackets[char]:
                    return False

        return len(stack) == 0`,
      sampleInput: "s = \"()[]{}\"",
      sampleOutput: "true",
      testCases: [
        "s = \"(]\"",
        "s = \"([)]\"",
        "s = \"{[]}\"",
      ]
    }
  ];
}