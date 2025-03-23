import { TechnicalQuestion } from '../../types';

// DSA Questions - Arrays
export async function getArrayQuestionsJava(): Promise<TechnicalQuestion[]> {
  return [
    {
      question: "Two Sum: Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
      options: [
        "Use nested loops to check each pair",
        "Use HashMap to store complements",
        "Sort array first then use two pointers",
        "Use binary search for each element"
      ],
      correctAnswer: 1,
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
      sampleOutput: "[0,1]"
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
      sampleOutput: "6"
    },
    // Add 98 more DSA questions for Java...
  ];
}

export async function getArrayQuestionsPython(): Promise<TechnicalQuestion[]> {
  return [
    {
      question: "Two Sum: Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
      options: [
        "Use nested loops to check each pair",
        "Use dictionary to store complements",
        "Sort list first then use two pointers",
        "Use binary search for each element"
      ],
      correctAnswer: 1,
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
      sampleOutput: "[0,1]"
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
      language: 'python',
      category: 'dsa',
      difficulty: 'medium',
      code: `
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_sum = current_sum = nums[0]
        
        for num in nums[1:]:
            current_sum = max(num, current_sum + num)
            max_sum = max(max_sum, current_sum)
        return max_sum`,
      sampleInput: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      sampleOutput: "6"
    },
    // Add 98 more DSA questions for Python...
  ];
}
