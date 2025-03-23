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
      question: "Given two sorted linked lists, what's the most efficient way to merge them into one sorted list?",
      options: [
        "Use two pointers to compare and link nodes in order",
        "Convert both lists to arrays, merge and convert back",
        "Use recursion to merge from end to start",
        "Create a min heap with all nodes"
      ],
      correctAnswer: 0,
      explanation: "Two pointer approach allows merging in O(n+m) time without extra space",
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
    // Add more Python DSA questions here...
  ];
}