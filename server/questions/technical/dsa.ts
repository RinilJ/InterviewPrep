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
      question: "Given a binary tree, how would you perform a level-order traversal?",
      options: [
        "Use a queue to process nodes level by level",
        "Use recursion with depth parameter",
        "Use stack for iterative traversal",
        "Use array to store nodes"
      ],
      correctAnswer: 0,
      explanation: "Queue helps process nodes level by level, maintaining the order of traversal",
      language: 'java',
      category: 'dsa',
      difficulty: 'medium',
      code: `
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);

                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(currentLevel);
        }
        return result;
    }
}`,
      sampleInput: "root = [3,9,20,null,null,15,7]",
      sampleOutput: "[[3],[9,20],[15,7]]",
      testCases: [
        "root = [1]",
        "root = []",
        "root = [1,2,3,4,5]"
      ]
    },
    {
      question: "How would you find the kth largest element in an array?",
      options: [
        "Use QuickSelect algorithm",
        "Sort the array and return n-k element",
        "Use min heap of size k",
        "Use bubble sort k times"
      ],
      correctAnswer: 0,
      explanation: "QuickSelect provides average O(n) time complexity",
      language: 'java',
      category: 'dsa',
      difficulty: 'medium',
      code: `
class Solution {
    public int findKthLargest(int[] nums, int k) {
        return quickSelect(nums, 0, nums.length - 1, nums.length - k);
    }

    private int quickSelect(int[] nums, int left, int right, int k) {
        if (left == right) return nums[left];

        int pivot = partition(nums, left, right);

        if (pivot == k) return nums[k];
        else if (pivot < k) return quickSelect(nums, pivot + 1, right, k);
        else return quickSelect(nums, left, pivot - 1, k);
    }

    private int partition(int[] nums, int left, int right) {
        int pivot = nums[right];
        int i = left;

        for (int j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                swap(nums, i, j);
                i++;
            }
        }
        swap(nums, i, right);
        return i;
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}`,
      sampleInput: "nums = [3,2,1,5,6,4], k = 2",
      sampleOutput: "5",
      testCases: [
        "nums = [3,2,3,1,2,4,5,5,6], k = 4",
        "nums = [1], k = 1",
        "nums = [1,2,3,4,5], k = 3"
      ]
    },
    {
      question: "How would you detect a cycle in a linked list?",
      options: [
        "Use Floyd's Cycle Finding Algorithm (fast and slow pointers)",
        "Use HashSet to store visited nodes",
        "Use array to store node references",
        "Use recursive approach with counter"
      ],
      correctAnswer: 0,
      explanation: "Floyd's algorithm uses O(1) space and guarantees cycle detection",
      language: 'java',
      category: 'dsa',
      difficulty: 'medium',
      code: `
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) return true;
        }
        return false;
    }
}`,
      sampleInput: "head = [3,2,0,-4], pos = 1",
      sampleOutput: "true",
      testCases: [
        "head = [1,2], pos = 0",
        "head = [1], pos = -1",
        "head = [1,2,3,4], pos = -1"
      ]
    },
    {
      question: "How would you implement a min stack that supports push, pop, top, and getMin operations in O(1) time?",
      options: [
        "Use two stacks, one for elements and one for minimum values",
        "Use single stack with pair objects",
        "Use linked list with min pointer",
        "Use array with sorted copy"
      ],
      correctAnswer: 0,
      explanation: "Two stacks approach maintains minimum value at each step efficiently",
      language: 'java',
      category: 'dsa',
      difficulty: 'medium',
      code: `
class MinStack {
    private Stack<Integer> stack;
    private Stack<Integer> minStack;

    public MinStack() {
        stack = new Stack<>();
        minStack = new Stack<>();
    }

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }

    public void pop() {
        if (!stack.isEmpty()) {
            if (stack.peek().equals(minStack.peek())) {
                minStack.pop();
            }
            stack.pop();
        }
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`,
      sampleInput: `
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();
minStack.pop();
minStack.top();
minStack.getMin();`,
      sampleOutput: `-3
0
-2`,
      testCases: [
        "push(0), push(1), push(-1), getMin(), pop(), getMin()",
        "push(2), push(2), push(2), pop(), getMin()",
        "push(1), push(2), push(3), top(), pop(), getMin()"
      ]
    },
    {
      question: "How would you reverse a linked list iteratively?",
      options: [
        "Use three pointers (prev, curr, next) to reverse links",
        "Use stack to store and rebuild list",
        "Use array to store and rebuild list",
        "Use recursive approach"
      ],
      correctAnswer: 0,
      explanation: "Three pointer approach provides O(n) time and O(1) space complexity",
      language: 'java',
      category: 'dsa',
      difficulty: 'easy',
      code: `
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
      sampleInput: "head = [1,2,3,4,5]",
      sampleOutput: "[5,4,3,2,1]",
      testCases: [
        "head = [1,2]",
        "head = []",
        "head = [1]"
      ]
    },
    {
      question: "How would you merge k sorted linked lists?",
      options: [
        "Use priority queue (min heap) to merge lists efficiently",
        "Merge lists one by one",
        "Convert to arrays, merge and convert back",
        "Use divide and conquer without heap"
      ],
      correctAnswer: 0,
      explanation: "Priority queue provides efficient way to find minimum element among k lists",
      language: 'java',
      category: 'dsa',
      difficulty: 'hard',
      code: `
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;

        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a,b) -> a.val - b.val);

        // Add first node from each list
        for (ListNode list : lists) {
            if (list != null) {
                minHeap.offer(list);
            }
        }

        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (!minHeap.isEmpty()) {
            ListNode node = minHeap.poll();
            tail.next = node;
            tail = tail.next;

            if (node.next != null) {
                minHeap.offer(node.next);
            }
        }

        return dummy.next;
    }
}`,
      sampleInput: "lists = [[1,4,5],[1,3,4],[2,6]]",
      sampleOutput: "[1,1,2,3,4,4,5,6]",
      testCases: [
        "lists = []",
        "lists = [[]]",
        "lists = [[1]]"
      ]
    },
    {
      question: "How would you implement binary search in a sorted array?",
      options: [
        "Use two pointers (left and right) and compute mid point",
        "Use recursion with start and end indices",
        "Use linear search with early termination",
        "Use jump search with sqrt(n) steps"
      ],
      correctAnswer: 0,
      explanation: "Two pointer approach provides O(log n) time complexity",
      language: 'java',
      category: 'dsa',
      difficulty: 'easy',
      code: `
class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`,
      sampleInput: "nums = [-1,0,3,5,9,12], target = 9",
      sampleOutput: "4",
      testCases: [
        "nums = [-1,0,3,5,9,12], target = 2",
        "nums = [5], target = 5",
        "nums = [], target = 0"
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
    },
    {
      question: "How would you implement a priority queue efficiently?",
      options: [
        "Use a binary heap implementation",
        "Use a sorted array",
        "Use a linked list",
        "Use a regular queue"
      ],
      correctAnswer: 0,
      explanation: "Binary heap provides O(log n) insertion and deletion with O(1) peek operations",
      language: 'java',
      category: 'dsa',
      difficulty: 'medium',
      code: `
class PriorityQueue<T> {
    private List<T> heap;
    private Comparator<T> comparator;

    public PriorityQueue(Comparator<T> comparator) {
        this.heap = new ArrayList<>();
        this.comparator = comparator;
    }

    public void offer(T element) {
        heap.add(element);
        siftUp(heap.size() - 1);
    }

    public T poll() {
        if (heap.isEmpty()) return null;
        T result = heap.get(0);
        T last = heap.remove(heap.size() - 1);
        if (!heap.isEmpty()) {
            heap.set(0, last);
            siftDown(0);
        }
        return result;
    }

    private void siftUp(int index) {
        T element = heap.get(index);
        while (index > 0) {
            int parentIndex = (index - 1) / 2;
            T parent = heap.get(parentIndex);
            if (comparator.compare(element, parent) >= 0) break;
            heap.set(index, parent);
            index = parentIndex;
        }
        heap.set(index, element);
    }

    private void siftDown(int index) {
        T element = heap.get(index);
        int size = heap.size();
        int half = size >>> 1;
        while (index < half) {
            int child = (index << 1) + 1;
            T childElement = heap.get(child);
            int right = child + 1;
            if (right < size && comparator.compare(childElement, heap.get(right)) > 0) {
                child = right;
                childElement = heap.get(right);
            }
            if (comparator.compare(element, childElement) <= 0) break;
            heap.set(index, childElement);
            index = child;
        }
        heap.set(index, element);
    }
}`,
      sampleInput: "Add elements: [5,2,8,1,9]",
      sampleOutput: "Poll elements: [1,2,5,8,9]",
      testCases: [
        "Add: [3,1,4,1,5], Poll all",
        "Add: [10], Poll, Add: [5], Poll",
        "Poll empty queue"
      ]
    },
    {
      question: "How would you implement a trie (prefix tree) for efficient string operations?",
      options: [
        "Use a tree structure with character nodes and end markers",
        "Use a hash table with string keys",
        "Use a balanced binary search tree",
        "Use array of strings with binary search"
      ],
      correctAnswer: 0,
      explanation: "Trie provides efficient prefix-based operations with O(m) complexity where m is key length",
      language: 'java',
      category: 'dsa',
      difficulty: 'hard',
      code: `
class TrieNode {
    private TrieNode[] children;
    private boolean isEndOfWord;

    public TrieNode() {
        children = new TrieNode[26];
        isEndOfWord = false;
    }

    public TrieNode[] getChildren() { return children; }
    public boolean isEndOfWord() { return isEndOfWord; }
    public void setEndOfWord(boolean end) { isEndOfWord = end; }
}

class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode current = root;
        for (char ch : word.toCharArray()) {
            int index = ch - 'a';
            if (current.getChildren()[index] == null) {
                current.getChildren()[index] = new TrieNode();
            }
            current = current.getChildren()[index];
        }
        current.setEndOfWord(true);
    }

    public boolean search(String word) {
        TrieNode node = searchNode(word);
        return node != null && node.isEndOfWord();
    }

    public boolean startsWith(String prefix) {
        return searchNode(prefix) != null;
    }

    private TrieNode searchNode(String str) {
        TrieNode current = root;
        for (char ch : str.toCharArray()) {
            int index = ch - 'a';
            if (current.getChildren()[index] == null) return null;
            current = current.getChildren()[index];
        }
        return current;
    }
}`,
      sampleInput: `
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");
trie.search("app");
trie.startsWith("app");`,
      sampleOutput: `
true
false
true`,
      testCases: [
        "Insert: cat, catch, catch; Search: cat, catch",
        "Insert: the; StartsWith: th, the, they",
        "Search empty trie"
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
    },
    {
      question: "How would you implement a priority queue in Python?",
      options: [
        "Use heapq module with a list",
        "Use sorted list with binary search",
        "Use regular list with linear search",
        "Use collections.deque"
      ],
      correctAnswer: 0,
      explanation: "heapq provides efficient priority queue operations with O(log n) complexity",
      language: 'python',
      category: 'dsa',
      difficulty: 'medium',
      code: `
import heapq

class PriorityQueue:
    def __init__(self):
        self._queue = []
        self._index = 0

    def push(self, item, priority):
        heapq.heappush(self._queue, (priority, self._index, item))
        self._index += 1

    def pop(self):
        if self._queue:
            return heapq.heappop(self._queue)[-1]
        return None

    def peek(self):
        if self._queue:
            return self._queue[0][-1]
        return None

    def is_empty(self):
        return len(self._queue) == 0`,
      sampleInput: `
pq = PriorityQueue()
pq.push('task1', 3)
pq.push('task2', 1)
pq.push('task3', 2)`,
      sampleOutput: `
task2
task3
task1`,
      testCases: [
        "Push multiple items, pop all",
        "Push one item, pop, check empty",
        "Pop from empty queue"
      ]
    },
    {
      question: "How would you implement a trie (prefix tree) in Python?",
      options: [
        "Use dictionary for children and end marker",
        "Use list for character storage",
        "Use binary search tree",
        "Use string array with sorting"
      ],
      correctAnswer: 0,
      explanation: "Dictionary provides O(1) child lookup and flexible character support",
      language: 'python',
      category: 'dsa',
      difficulty: 'hard',
      code: `
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._search_node(word)
        return node is not None and node.is_end

    def starts_with(self, prefix: str) -> bool:
        return self._search_node(prefix) is not None

    def _search_node(self, string: str) -> TrieNode:
        node = self.root
        for char in string:
            if char not in node.children:
                return None
            node = node.children[char]
        return node`,
      sampleInput: `
trie = Trie()
trie.insert("apple")
trie.search("apple")
trie.search("app")
trie.starts_with("app")`,
      sampleOutput: `
True
False
True`,
      testCases: [
        "Insert: python, py, pytorch; Search: py, python",
        "Insert: code; StartsWith: co, cod, coding",
        "Search in empty trie"
      ]
    },
    {
      question: "How would you implement binary search in Python?",
      options: [
        "Use two pointers with while loop",
        "Use recursive approach",
        "Use list.index() method",
        "Use linear search"
      ],
      correctAnswer: 0,
      explanation: "Two pointer approach provides O(log n) time complexity",
      language: 'python',
      category: 'dsa',
      difficulty: 'easy',
      code: `
def binary_search(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
      sampleInput: "nums = [-1,0,3,5,9,12], target = 9",
      sampleOutput: "4",
      testCases: [
        "nums = [-1,0,3,5,9,12], target = 2",
        "nums = [5], target = 5",
        "nums = [], target = 0"
      ]
    }
  ];
}

// Add similar comprehensive set of questions for Python
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
      options:[
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
    },
    {
      question: "How would you implement a priority queue in Python?",
      options: [
        "Use heapq module with a list",
        "Use sorted list with binary search",
        "Use regular list with linear search",
        "Use collections.deque"
      ],
      correctAnswer: 0,
      explanation: "heapq provides efficient priority queue operations with O(log n) complexity",
      language: 'python',
      category: 'dsa',
      difficulty: 'medium',
      code: `
import heapq

class PriorityQueue:
    def __init__(self):
        self._queue = []
        self._index = 0

    def push(self, item, priority):
        heapq.heappush(self._queue, (priority, self._index, item))
        self._index += 1

    def pop(self):
        if self._queue:
            return heapq.heappop(self._queue)[-1]
        return None

    def peek(self):
        if self._queue:
            return self._queue[0][-1]
        return None

    def is_empty(self):
        return len(self._queue) == 0`,
      sampleInput: `
pq = PriorityQueue()
pq.push('task1', 3)
pq.push('task2', 1)
pq.push('task3', 2)`,
      sampleOutput: `
task2
task3
task1`,
      testCases: [
        "Push multiple items, pop all",
        "Push one item, pop, check empty",
        "Pop from empty queue"
      ]
    },
    {
      question: "How would you implement a trie (prefix tree) in Python?",
      options: [
        "Use dictionary for children and end marker",
        "Use list for character storage",
        "Use binary search tree",
        "Use string array with sorting"
      ],
      correctAnswer: 0,
      explanation: "Dictionary provides O(1) child lookup and flexible character support",
      language: 'python',
      category: 'dsa',
      difficulty: 'hard',
      code: `
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._search_node(word)
        return node is not None and node.is_end

    def starts_with(self, prefix: str) -> bool:
        return self._search_node(prefix) is not None

    def _search_node(self, string: str) -> TrieNode:
        node = self.root
        for char in string:
            if char not in node.children:
                return None
            node = node.children[char]
        return node`,
      sampleInput: `
trie = Trie()
trie.insert("apple")
trie.search("apple")
trie.search("app")
trie.starts_with("app")`,
      sampleOutput: `
True
False
True`,
      testCases: [
        "Insert: python, py, pytorch; Search: py, python",
        "Insert: code; StartsWith: co, cod, coding",
        "Search in empty trie"
      ]
    },
    {
      question: "How would you implement binary search in Python?",
      options: [
        "Use two pointers with while loop",
        "Use recursive approach",
        "Use list.index() method",
        "Use linear search"
      ],
      correctAnswer: 0,
      explanation: "Two pointer approach provides O(log n) time complexity",
      language: 'python',
      category: 'dsa',
      difficulty: 'easy',
      code: `
def binary_search(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
      sampleInput: "nums = [-1,0,3,5,9,12], target = 9",
      sampleOutput: "4",
      testCases: [
        "nums = [-1,0,3,5,9,12], target = 2",
        "nums = [5], target = 5",
        "nums = [], target = 0"
      ]
    }
  ];
}