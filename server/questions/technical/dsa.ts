import { TechnicalQuestion } from '../../types';

// DSA Questions - Arrays & String Operations
export async function getArrayQuestionsJava(): Promise<TechnicalQuestion[]> {
  return [
    {
      question: "Two Sum: Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
      options: [
        "Use HashMap to store complements",
        "Use nested loops to check each pair",
        "Sort array first then use two pointers",
        "Use binary search for each element"
      ],
      correctAnswer: 0,
      explanation: "Using HashMap provides O(n) time complexity by storing complements",
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
      question: "Valid Parentheses: Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      options: [
        "Use Stack data structure",
        "Count opening and closing brackets",
        "Use string replacement",
        "Use recursion"
      ],
      correctAnswer: 0,
      explanation: "Stack is perfect for matching brackets in order",
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
      question: "Merge Two Sorted Lists: Merge two sorted linked lists and return it as a new sorted list.",
      options: [
        "Use two pointers approach",
        "Convert to arrays first",
        "Use recursion",
        "Use priority queue"
      ],
      correctAnswer: 0,
      explanation: "Two pointers provide an efficient way to merge sorted lists",
      language: 'java',
      category: 'dsa',
      difficulty: 'easy',
      code: `
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }

        current.next = l1 != null ? l1 : l2;
        return dummy.next;
    }
}`,
      sampleInput: "l1 = [1,2,4], l2 = [1,3,4]",
      sampleOutput: "[1,1,2,3,4,4]",
      testCases: [
        "l1 = [], l2 = []",
        "l1 = [], l2 = [0]",
        "l1 = [1], l2 = [2]"
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
    // Add 95 more DSA questions for Java...
  ];
}

export async function getArrayQuestionsPython(): Promise<TechnicalQuestion[]> {
  return [
    {
      question: "Two Sum: Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
      options: [
        "Use dictionary to store complements",
        "Use nested loops to check each pair",
        "Sort list first then use two pointers",
        "Use binary search for each element"
      ],
      correctAnswer: 0,
      explanation: "Using dictionary provides O(n) time complexity by storing complements",
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
      question: "Valid Parentheses: Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      options: [
        "Use stack data structure",
        "Count opening and closing brackets",
        "Use string replacement",
        "Use recursion"
      ],
      correctAnswer: 0,
      explanation: "Stack is perfect for matching brackets in order",
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
    // Add more Python DSA questions here...
  ];
}