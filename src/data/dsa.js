const dsaBank = [
  {
    id: 'dsa-001',
    topic: 'Arrays',
    difficulty: 'basic',
    title: 'Find Maximum Element',
    description: 'Given an array of integers, find the maximum element in the array.',
    examples: [
      { input: '[1, 5, 3, 9, 2]', output: '9' }
    ],
    constraints: ['1 <= array.length <= 1000'],
    hints: ['Iterate through the array']
  },

{
    id: 'dsa-002',
    topic: 'Arrays',
    difficulty: 'basic',
    title: 'Sum of Array Elements',
    description: 'Calculate the sum of all elements in an array.',
    examples: [
      { input: '[1, 2, 3, 4, 5]', output: '15' },
      { input: '[10, -5, 3]', output: '8' },
    ],
    constraints: ['1 <= array.length <= 10000'],
  },

   {
    id: 'dsa-003',
    topic: 'Arrays',
    difficulty: 'basic',
    title: 'Reverse Array',
    description: 'Reverse the given array in-place.',
    examples: [
      { input: '[1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' },
    ],
    constraints: ['1 <= array.length <= 10000'],
    hints: ['Use two pointers: one at start, one at end'],
  },
  {
    id: 'dsa-004',
    topic: 'Arrays',
    difficulty: 'basic',
    title: 'Find Second Largest',
    description: 'Find the second largest element in an array.',
    examples: [
      { input: '[12, 35, 1, 10, 34, 1]', output: '34' },
    ],
    constraints: ['2 <= array.length <= 1000'],
  },
  {
    id: 'dsa-005',
    topic: 'Arrays',
    difficulty: 'basic',
    title: 'Count Even Numbers',
    description: 'Count the number of even elements in an array.',
    examples: [
      { input: '[1, 2, 3, 4, 5, 6]', output: '3' },
    ],
    constraints: ['1 <= array.length <= 1000'],
  },

  // BASIC - Strings
  {
    id: 'dsa-006',
    topic: 'Strings',
    difficulty: 'basic',
    title: 'Reverse a String',
    description: 'Given a string, return it reversed.',
    examples: [
      { input: '"hello"', output: '"olleh"' },
      { input: '"world"', output: '"dlrow"' },
    ],
    constraints: ['1 <= string.length <= 10000'],
  },
  {
    id: 'dsa-007',
    topic: 'Strings',
    difficulty: 'basic',
    title: 'Check Palindrome',
    description: 'Check if the given string is a palindrome.',
    examples: [
      { input: '"madam"', output: 'true' },
      { input: '"hello"', output: 'false' },
    ],
    constraints: ['String contains only lowercase letters'],
  },
  {
    id: 'dsa-008',
    topic: 'Strings',
    difficulty: 'basic',
    title: 'Count Vowels',
    description: 'Count the number of vowels in a string.',
    examples: [
      { input: '"hello world"', output: '3' },
    ],
    constraints: ['String contains only lowercase letters and spaces'],
  },

  // MODERATE - Arrays
  {
    id: 'dsa-009',
    topic: 'Arrays',
    difficulty: 'moderate',
    title: 'Two Sum',
    description: 'Given an array of integers and a target, return indices of two numbers that add up to target.',
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
    ],
    constraints: ['Each input has exactly one solution', 'Cannot use same element twice'],
    hints: ['Use a hash map to store complement'],
  },
  {
    id: 'dsa-010',
    topic: 'Arrays',
    difficulty: 'moderate',
    title: 'Find Duplicates',
    description: 'Find all duplicate elements in an array.',
    examples: [
      { input: '[1, 2, 3, 1, 2, 4]', output: '[1, 2]' },
    ],
    constraints: ['1 <= array.length <= 10000'],
  },
  {
    id: 'dsa-011',
    topic: 'Arrays',
    difficulty: 'moderate',
    title: 'Rotate Array',
    description: 'Rotate array to the right by k steps.',
    examples: [
      { input: 'nums = [1, 2, 3, 4, 5], k = 2', output: '[4, 5, 1, 2, 3]' },
    ],
    constraints: ['1 <= array.length <= 10000', '0 <= k <= 10000'],
  },
  {
    id: 'dsa-012',
    topic: 'Arrays',
    difficulty: 'moderate',
    title: 'Merge Sorted Arrays',
    description: 'Merge two sorted arrays into one sorted array.',
    examples: [
      { input: '[1, 3, 5], [2, 4, 6]', output: '[1, 2, 3, 4, 5, 6]' },
    ],
    constraints: ['Arrays are sorted in ascending order'],
  },
  {
    id: 'dsa-013',
    topic: 'Arrays',
    difficulty: 'moderate',
    title: 'Find Missing Number',
    description: 'Given an array containing n distinct numbers from 0 to n, find the missing number.',
    examples: [
      { input: '[3, 0, 1]', output: '2' },
      { input: '[0, 1]', output: '2' },
    ],
    constraints: ['All numbers are unique'],
  },

  // MODERATE - Strings
  {
    id: 'dsa-014',
    topic: 'Strings',
    difficulty: 'moderate',
    title: 'Valid Anagram',
    description: 'Check if two strings are anagrams of each other.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
    ],
    constraints: ['Strings contain only lowercase letters'],
  },
  {
    id: 'dsa-015',
    topic: 'Strings',
    difficulty: 'moderate',
    title: 'First Unique Character',
    description: 'Find the first non-repeating character in a string and return its index.',
    examples: [
      { input: '"leetcode"', output: '0' },
      { input: '"loveleetcode"', output: '2' },
    ],
    constraints: ['String contains only lowercase letters'],
  },
  {
    id: 'dsa-016',
    topic: 'Strings',
    difficulty: 'moderate',
    title: 'Longest Common Prefix',
    description: 'Find the longest common prefix among an array of strings.',
    examples: [
      { input: '["flower", "flow", "flight"]', output: '"fl"' },
      { input: '["dog", "racecar", "car"]', output: '""' },
    ],
    constraints: ['0 <= strs.length <= 200'],
  },

  // MODERATE - Sorting
  {
    id: 'dsa-017',
    topic: 'Sorting',
    difficulty: 'moderate',
    title: 'Bubble Sort',
    description: 'Implement bubble sort algorithm to sort an array.',
    examples: [
      { input: '[64, 34, 25, 12, 22, 11, 90]', output: '[11, 12, 22, 25, 34, 64, 90]' },
    ],
    constraints: ['1 <= array.length <= 1000'],
  },
  {
    id: 'dsa-018',
    topic: 'Sorting',
    difficulty: 'moderate',
    title: 'Selection Sort',
    description: 'Implement selection sort algorithm.',
    examples: [
      { input: '[29, 10, 14, 37, 13]', output: '[10, 13, 14, 29, 37]' },
    ],
    constraints: ['1 <= array.length <= 1000'],
  },

  // ADVANCED - Linked Lists
  {
    id: 'dsa-019',
    topic: 'Linked Lists',
    difficulty: 'advanced',
    title: 'Reverse Linked List',
    description: 'Reverse a singly linked list.',
    examples: [
      { input: '1 -> 2 -> 3 -> 4 -> 5', output: '5 -> 4 -> 3 -> 2 -> 1' },
    ],
    constraints: ['List can be empty'],
    hints: ['Use three pointers: prev, current, next'],
  },
  {
    id: 'dsa-020',
    topic: 'Linked Lists',
    difficulty: 'advanced',
    title: 'Detect Cycle',
    description: 'Detect if a linked list has a cycle.',
    examples: [
      { input: '3 -> 2 -> 0 -> -4 (cycle at pos 1)', output: 'true' },
    ],
    constraints: [],
    hints: ['Use Floyd\'s Tortoise and Hare algorithm'],
  },
  {
    id: 'dsa-021',
    topic: 'Linked Lists',
    difficulty: 'advanced',
    title: 'Merge Two Sorted Lists',
    description: 'Merge two sorted linked lists into one sorted list.',
    examples: [
      { input: 'list1 = [1, 2, 4], list2 = [1, 3, 4]', output: '[1, 1, 2, 3, 4, 4]' },
    ],
    constraints: ['Both lists are sorted'],
  },
  {
    id: 'dsa-022',
    topic: 'Linked Lists',
    difficulty: 'advanced',
    title: 'Middle of Linked List',
    description: 'Find the middle node of a linked list.',
    examples: [
      { input: '[1, 2, 3, 4, 5]', output: '3' },
      { input: '[1, 2, 3, 4, 5, 6]', output: '4' },
    ],
    constraints: [],
    hints: ['Use slow and fast pointer technique'],
  },

  // ADVANCED - Stacks & Queues
  {
    id: 'dsa-023',
    topic: 'Stacks',
    difficulty: 'advanced',
    title: 'Valid Parentheses',
    description: 'Check if the input string has valid parentheses.',
    examples: [
      { input: '"()[]{}"', output: 'true' },
      { input: '"(]"', output: 'false' },
    ],
    constraints: ['String contains only parentheses characters'],
    hints: ['Use a stack to match opening and closing brackets'],
  },
  {
    id: 'dsa-024',
    topic: 'Stacks',
    difficulty: 'advanced',
    title: 'Min Stack',
    description: 'Design a stack that supports getMin() in O(1).',
    examples: [
      { input: 'push(-2), push(0), push(-3), getMin(), pop(), getMin()', output: '-3, -2' },
    ],
    constraints: ['All operations in O(1)'],
  },
  {
    id: 'dsa-025',
    topic: 'Queues',
    difficulty: 'advanced',
    title: 'Implement Queue using Stacks',
    description: 'Implement a FIFO queue using only two stacks.',
    examples: [
      { input: 'push(1), push(2), peek(), pop()', output: '1, 1' },
    ],
    constraints: [],
  },

  // ADVANCED - Trees
  {
    id: 'dsa-026',
    topic: 'Trees',
    difficulty: 'advanced',
    title: 'Inorder Traversal',
    description: 'Perform inorder traversal of a binary tree.',
    examples: [
      { input: 'root = [1, null, 2, 3]', output: '[1, 3, 2]' },
    ],
    constraints: [],
  },
  {
    id: 'dsa-027',
    topic: 'Trees',
    difficulty: 'advanced',
    title: 'Maximum Depth of Binary Tree',
    description: 'Find the maximum depth of a binary tree.',
    examples: [
      { input: '[3, 9, 20, null, null, 15, 7]', output: '3' },
    ],
    constraints: [],
    hints: ['Use recursion: depth = 1 + max(left_depth, right_depth)'],
  },
  {
    id: 'dsa-028',
    topic: 'Trees',
    difficulty: 'advanced',
    title: 'Same Tree',
    description: 'Check if two binary trees are identical.',
    examples: [
      { input: 'p = [1, 2, 3], q = [1, 2, 3]', output: 'true' },
    ],
    constraints: [],
  },

  // ADVANCED - Binary Search
  {
    id: 'dsa-029',
    topic: 'Binary Search',
    difficulty: 'advanced',
    title: 'Binary Search',
    description: 'Implement binary search to find target in sorted array.',
    examples: [
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', output: '4' },
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1' },
    ],
    constraints: ['Array is sorted in ascending order'],
  },
  {
    id: 'dsa-030',
    topic: 'Binary Search',
    difficulty: 'advanced',
    title: 'Search Insert Position',
    description: 'Find the index where target should be inserted in sorted array.',
    examples: [
      { input: 'nums = [1, 3, 5, 6], target = 5', output: '2' },
      { input: 'nums = [1, 3, 5, 6], target = 2', output: '1' },
    ],
    constraints: [],
  },

  // PRO - Dynamic Programming
  {
    id: 'dsa-031',
    topic: 'Dynamic Programming',
    difficulty: 'pro',
    title: 'Climbing Stairs',
    description: 'You can climb 1 or 2 steps. How many ways to reach top?',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1 or 2' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1' },
    ],
    constraints: ['1 <= n <= 45'],
    hints: ['This is Fibonacci sequence!'],
  },
  {
    id: 'dsa-032',
    topic: 'Dynamic Programming',
    difficulty: 'pro',
    title: 'Fibonacci Number',
    description: 'Calculate the nth Fibonacci number.',
    examples: [
      { input: 'n = 4', output: '3', explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3' },
    ],
    constraints: ['0 <= n <= 30'],
    hints: ['Use memoization or tabulation'],
  },
  {
    id: 'dsa-033',
    topic: 'Dynamic Programming',
    difficulty: 'pro',
    title: 'Maximum Subarray',
    description: 'Find the contiguous subarray with the largest sum.',
    examples: [
      { input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6', explanation: '[4, -1, 2, 1]' },
    ],
    constraints: ['1 <= nums.length <= 10^5'],
    hints: ['Kadane\'s algorithm'],
  },
  {
    id: 'dsa-034',
    topic: 'Dynamic Programming',
    difficulty: 'pro',
    title: 'Coin Change',
    description: 'Find minimum number of coins to make up the amount.',
    examples: [
      { input: 'coins = [1, 2, 5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
    ],
    constraints: ['1 <= coins.length <= 12', '0 <= amount <= 10^4'],
  },
  {
    id: 'dsa-035',
    topic: 'Dynamic Programming',
    difficulty: 'pro',
    title: 'Longest Increasing Subsequence',
    description: 'Find the length of the longest strictly increasing subsequence.',
    examples: [
      { input: '[10, 9, 2, 5, 3, 7, 101, 18]', output: '4', explanation: '[2, 3, 7, 101]' },
    ],
    constraints: ['1 <= nums.length <= 2500'],
  },

  // PRO - Graphs
  {
    id: 'dsa-036',
    topic: 'Graphs',
    difficulty: 'pro',
    title: 'Number of Islands',
    description: 'Count the number of islands in a 2D grid.',
    examples: [
      { 
        input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', 
        output: '3' 
      },
    ],
    constraints: ['m == grid.length', 'n == grid[i].length'],
    hints: ['Use DFS or BFS to mark visited islands'],
  },
  {
    id: 'dsa-037',
    topic: 'Graphs',
    difficulty: 'pro',
    title: 'BFS Traversal',
    description: 'Perform Breadth-First Search on a graph.',
    examples: [
      { input: 'Graph with 5 nodes starting from 0', output: 'Level order traversal' },
    ],
    constraints: [],
  },
  {
    id: 'dsa-038',
    topic: 'Graphs',
    difficulty: 'pro',
    title: 'DFS Traversal',
    description: 'Perform Depth-First Search on a graph.',
    examples: [
      { input: 'Graph with 5 nodes starting from 0', output: 'Depth first traversal' },
    ],
    constraints: [],
  },
  {
    id: 'dsa-039',
    topic: 'Graphs',
    difficulty: 'pro',
    title: 'Detect Cycle in Graph',
    description: 'Detect if a directed graph contains a cycle.',
    examples: [
      { input: 'Graph with edges forming a cycle', output: 'true' },
    ],
    constraints: [],
    hints: ['Use DFS with recursion stack'],
  },

  // PRO - Recursion & Backtracking
  {
    id: 'dsa-040',
    topic: 'Recursion',
    difficulty: 'pro',
    title: 'Generate Parentheses',
    description: 'Generate all combinations of well-formed parentheses.',
    examples: [
      { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]' },
    ],
    constraints: ['1 <= n <= 8'],
  },
  {
    id: 'dsa-041',
    topic: 'Backtracking',
    difficulty: 'pro',
    title: 'Subsets',
    description: 'Return all possible subsets of a set.',
    examples: [
      { input: '[1, 2, 3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
    ],
    constraints: ['All elements are unique'],
  },
  {
    id: 'dsa-042',
    topic: 'Backtracking',
    difficulty: 'pro',
    title: 'Permutations',
    description: 'Return all permutations of an array.',
    examples: [
      { input: '[1, 2, 3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
    ],
    constraints: ['All elements are unique'],
  },
  {
    id: 'dsa-043',
    topic: 'Backtracking',
    difficulty: 'pro',
    title: 'N-Queens',
    description: 'Place n queens on n×n chessboard so no two attack each other.',
    examples: [
      { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
    ],
    constraints: ['1 <= n <= 9'],
  },

  // Additional questions
  {
    id: 'dsa-044',
    topic: 'Hashing',
    difficulty: 'moderate',
    title: 'Group Anagrams',
    description: 'Group strings that are anagrams together.',
    examples: [
      { input: '["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
    ],
    constraints: [],
  },
  {
    id: 'dsa-045',
    topic: 'Hashing',
    difficulty: 'moderate',
    title: 'Contains Duplicate',
    description: 'Check if array contains any duplicates.',
    examples: [
      { input: '[1, 2, 3, 1]', output: 'true' },
      { input: '[1, 2, 3, 4]', output: 'false' },
    ],
    constraints: [],
  },
  {
    id: 'dsa-046',
    topic: 'Two Pointers',
    difficulty: 'advanced',
    title: 'Container With Most Water',
    description: 'Find two lines that form container with most water.',
    examples: [
      { input: '[1,8,6,2,5,4,8,3,7]', output: '49' },
    ],
    constraints: [],
  },
  {
    id: 'dsa-047',
    topic: 'Two Pointers',
    difficulty: 'advanced',
    title: '3Sum',
    description: 'Find all unique triplets that sum to zero.',
    examples: [
      { input: '[-1, 0, 1, 2, -1, -4]', output: '[[-1, -1, 2], [-1, 0, 1]]' },
    ],
    constraints: [],
  },
  {
    id: 'dsa-048',
    topic: 'Sliding Window',
    difficulty: 'pro',
    title: 'Longest Substring Without Repeating',
    description: 'Find length of longest substring without repeating characters.',
    examples: [
      { input: '"abcabcbb"', output: '3', explanation: 'Answer is "abc"' },
    ],
    constraints: [],
  },
  {
    id: 'dsa-049',
    topic: 'Heap',
    difficulty: 'pro',
    title: 'Kth Largest Element',
    description: 'Find the kth largest element in an unsorted array.',
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
    ],
    constraints: [],
  },
  {
    id: 'dsa-050',
    topic: 'Heap',
    difficulty: 'pro',
    title: 'Merge K Sorted Lists',
    description: 'Merge k sorted linked lists into one sorted list.',
    examples: [
      { input: '[[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
    ],
    constraints: [],
  },
  {
    id: 'dsa-051',
    topic: 'Bit Manipulation',
    difficulty: 'moderate',
    title: 'Single Number',
    description: 'Find the element that appears only once.',
    examples: [
      { input: '[2, 2, 1]', output: '1' },
      { input: '[4, 1, 2, 1, 2]', output: '4' },
    ],
    constraints: ['Every element appears twice except one'],
    hints: ['XOR operation'],
  },
  {
    id: 'dsa-052',
    topic: 'Bit Manipulation',
    difficulty: 'advanced',
    title: 'Counting Bits',
    description: 'Count number of 1s in binary representation of each number from 0 to n.',
    examples: [
      { input: 'n = 5', output: '[0,1,1,2,1,2]' },
    ],
    constraints: [],
  },
  {
    id: 'dsa-053',
    topic: 'Math',
    difficulty: 'basic',
    title: 'Power of Two',
    description: 'Check if a number is a power of two.',
    examples: [
      { input: 'n = 16', output: 'true' },
      { input: 'n = 3', output: 'false' },
    ],
    constraints: [],
  },
  {
    id: 'dsa-054',
    topic: 'Math',
    difficulty: 'moderate',
    title: 'Count Primes',
    description: 'Count the number of prime numbers less than n.',
    examples: [
      { input: 'n = 10', output: '4', explanation: '2, 3, 5, 7 are primes' },
    ],
    constraints: [],
    hints: ['Sieve of Eratosthenes'],
  },
  {
    id: 'dsa-055',
    topic: 'Greedy',
    difficulty: 'pro',
    title: 'Jump Game',
    description: 'Determine if you can reach the last index.',
    examples: [
      { input: '[2, 3, 1, 1, 4]', output: 'true' },
      { input: '[3, 2, 1, 0, 4]', output: 'false' },
    ],
    constraints: [],
  },

  // keep ALL your 55 questions inside this array
];
