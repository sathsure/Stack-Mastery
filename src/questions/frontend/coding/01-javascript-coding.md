### ❓ You are given an array. Move all 0s to the end without changing the order of other elements.?

> Input
> [0, 1, 0, 3, 12]
>
> Output
> [1, 3, 12, 0, 0]

### 📝 Answer

```js
const arr = [0, 1, 0, 3, 12];

console.log(arr);
let j = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] !== 0) {
    [arr[j], arr[i]] = [arr[i], arr[j]];
    j++;
  }
}

console.log(arr);
```

---

### ❓ Write a program `to check if two strings are anagrams`.

> Input
> listen
>
> Output
> silent

### 📝 Answer

```js
// ======= Using Sort =======
function isAnagram(str1, str2) {
  // If lengths differ, cannot be anagram
  if (str1.length !== str2.length) return false;

  return str1.split("").sort().join("") === str2.split("").sort().join("");
}

// Test
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world")); // false

// ======= Using Characters =======
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  const freq = {};

  for (let char of str1) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (let char of str2) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}

// Test
console.log(isAnagram("triangle", "integral")); // true
console.log(isAnagram("abc", "abd")); // false
```

---

### ❓ Write a program `to find the first non-repeating character in a string`.

> Input
> recurring
>
> Output
> e

### 📝 Answer

```js
function firstNonRepeating(str) {
  const count = {};

  for (let ch of str) count[ch] = (count[ch] || 0) + 1;

  for (let ch of str) {
    if (count[ch] === 1) return ch;
  }

  return null; // if no unique character exists
}

console.log(firstNonRepeating("recurring")); // e
console.log(firstNonRepeating("aabbcc")); // null
```

---

### ❓ Write a program `to find the frequency of each character in a string`.

> Input
> hello world
>
> Output
> { h: 1, e: 1, l: 3, o: 2, ' ': 1, w: 1, r: 1, d: 1 }

### 📝 Answer

```js
function charFrequency(str) {
  const freq = {};
  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  return freq;
}
console.log(charFrequency("hello world"));
```

---

### ❓ Write a program `to find the length of a string` without using built-in methods.

> Input
> hello world
>
> Output
> 11

### 📝 Answer

```js
function getLength(str) {
  let count = 0;

  for (const char of str) {
    count++;
  }
  return count;
}

console.log(getLength("hello")); // 5

// Alternative approach
// while (str[count] !== undefined) {
//   count++;
// }

/**
 * for of loop
 * ✔️ Iterates:
 * For strings → each character
 * For arrays → each value
 * For Maps/Sets → each entry
 *
 * for in loop
 * ✔️ Iterates:
 * For objects → each key
 * For arrays → each index
 * For strings → each index
 */
```

---

### ❓ Write a program `to reverse a string`.

> Input
> hello world
>
> Output
> dlrow olleh

### 📝 Answer

```js
const str = "hello world";
let reverse = "";

for (let i = str.length - 1; i >= 0; i--) {
  reverse += str[i];
}

console.log(reverse);

//Alternative using built-in methods
// const reverse = str.split("").reverse().join("");
```

---

### ❓ Write a program `to reverse a string` while preserving word order.

> Input
> hello world
>
> Output
> olleh dlrow

### 📝 Answer

```js
const str = "hello world";
const strArray = str.split(" ");

for (let [, str] of strArray.entries()) {
  let chars = str.split("");
  for (let i = 0, j = chars.length - 1; i < j; i++, j--) {
    [chars[j], chars[i]] = [chars[i], chars[j]];
  }
  strArray[index] = chars.join("");
}

const reversedStr = strArray.join(" ");

console.log(reversedStr);
```

---

### ❓ Explain the difference between `substring() and slice()` with examples.

### 📝 Answer

```js
// EXAMPLE: 1

/* ------------ substring() treats negative numbers as 0 ------------ */
console.log("world".substring(-2, 4)); // Output: "worl"

/* ------------ slice() counts negative numbers from the end ------------ */
console.log("world".slice(-2, 4)); // Output: l

// EXAMPLE: 2

"hello".substring(4, 1); //  Output: "ell"   // swapped internally to (1,4)
"hello".slice(4, 1); //   Output: ""     // no swap → empty
```

---

### ❓ Write a program `to split an array into chunks`.

### 📝 Answer

```js
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    console.log(i);
    out.push(arr.slice(i, i + size));
  }
  console.log(out);
}

chunk([1, 2, 3, 4, 5, 6], 2);
// Output: [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]

chunk([1, 2, 3, 4, 5], 3);
// Output: [ [ 1, 2, 3 ], [ 4, 5 ] ]
```

---

### ❓ Write a program `to check if two arrays are equal`.

### 📝 Answer

```js
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

console.log(arraysEqual([1, 2, 3], [1, 2, 3])); // true
console.log(arraysEqual([1, 2, 3], [1, 2, 4])); // false
```

---

### ❓ Write a program `to flatten a nested array`.

### 📝 Answer

```js
const arr = [
  [1, 2],
  [3, 4, 5],
  [6, 7],
];

const output = arr.flat();
console.log(output);
// Expected output: [1, 2, 3, 4, 5, 6, 7, 8, 9]

// ------------ WITHOUT FLAT --------------
const aa = [
  [1, 2],
  [3, 4, [5]],
  [6, 7],
];

function recursion(arr) {
  for (let ch of arr) {
    if (Array.isArray(ch)) {
      recursion(ch);
    } else {
      console.log(ch);
    }
  }
}

recursion(aa);
```

---

### ❓ Write a program `to find the maximum and minimum values in an array`.

### 📝 Answer

```js
// ======= With Spread =======
const array = [10, 5, 88, 32, 1, 7];

const maximum = Math.max(...arr);
const minimum = Math.min(...arr);

console.log("Max:", maximum);
console.log("Min:", minimum);
// Output:
// Max: 88
// Min: 1

// ======= Without Spread =======
const arr = [10, 5, 88, 32, 1, 7];

let max = arr[0];
let min = arr[0];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > max) max = arr[i];
  if (arr[i] < min) min = arr[i];
}

console.log("Max:", max);
console.log("Min:", min);
// Output:
// Max: 88
// Min: 1
```

---

### ❓ Write a program `to remove duplicate elements from an array`.

### 📝 Answer

```js
// Remove duplicates from an array
const arr = [1, 2, 3, 2, 4, 3, 5, 1];
const unique = [];
const seen = {};

for (let val of arr) {
  if (!seen[val]) {
    unique.push(val);
    seen[val] = true;
  }
}
console.log(unique);

// Output: [1, 2, 3, 4, 5]

// ======= Alternative using Set =======
// const unique = [...new Set(arr)];
// console.log(unique);

// ======= Alternative using Filter =======
// const unique = arr.filter((val, index) => arr.indexOf(val) === index);
// console.log(unique);
```

---

### ❓ Write a program `to find the second largest number in an array`.

### 📝 Answer

```js
let array = [1, 3, 5, 7, 9, 10];

const newArray = array.sort((a, b) => a - b);

console.log(newArray[newArray.length - 2]);

// Output: 9
```

---

### ❓ Write a program `to extract unique values from an array`.

### 📝 Answer

```js
function unique(arr) {
  const result = [];
  const seen = {};

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (!seen[value]) {
      seen[value] = true;
      result.push(value);
    }
  }

  return result;
}

// Example
console.log(unique([1, 2, 2, 3, 4, 4])); // [1, 2, 3, 4]
```

---

### ❓ Write a program `to generate the Fibonacci series`.

### 📝 Answer

```js
function fibonacci(n) {
  const result = [0, 1];

  for (let i = 2; i < n; i++) {
    const next = result[i - 1] + result[i - 2];
    result.push(next);
  }

  return result;
}

// Example:
console.log(fibonacci(10));
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

---

### ❓ Write a program `to implement FizzBuzz`.

### 📝 Answer

```js
function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    let out = "";
    if (i % 3 === 0) out += "Fizz";
    if (i % 5 === 0) out += "Buzz";
    console.log(out || i);
  }
}

fizzBuzz(15);

// Example Output:
// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// 8
// Fizz
// Buzz
// 11
// Fizz
// 13
// 14
// FizzBuzz
```

---

### ❓ Write a program `to implement memoization`.

### 📝 Answer

```js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

const calculate = (function () {
  let cache = {}; // private cache stored in closure

  // inner function that will be used as calculate(a, b, func)
  return function (a, b, func) {
    const key = `${a} + ${b} + ${func}`; // create unique cache key

    // check if value already exists in cache
    if (cache[key]) {
      console.log("Read From Cache");
      return cache[key]; // return cached value
    } else {
      console.log("Write new Cache");
      const value = func(a, b); // compute value
      cache[key] = value;
      return value;
    }
  };
})(); // IIFE runs once to create closure

console.log(calculate(10, 10, add));
console.log(calculate(10, 10, add));

console.log(calculate(10, 10, multiply));
console.log(calculate(10, 10, multiply));

// Expected Output:
// Write new Cache
// 20
// Read From Cache
// 20
// Write new Cache
// 100
// Read From Cache
// 100
```
