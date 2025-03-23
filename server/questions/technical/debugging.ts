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
    // Add 98 more debugging questions for Java...
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
    }
    // Continue with more Python debugging questions...
  ];
}