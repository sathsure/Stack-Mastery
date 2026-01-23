### ❓ Write a program `to check if two strings are anagrams`.

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

### ❓ Write a program `to convert a camelCase string into snake_case`.

### 📝 Answer

```js
//convert a string from camelCase to snake_case

let str = "oneCompilerPlatform";

const toSnakeCase = str.replace(/([A-Z])/g, "_$1").toLowerCase();

console.log(toSnakeCase);
// Expected output: one_compiler_platform
```

---

### ❓ Write a program `to find the first non-repeating character in a string`.

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

// Output: { h: 1, e: 1, l: 3, o: 2, ' ': 1, w: 1, r: 1, d: 1 }
```

---

### ❓ Write a program `to find the length of a string` without using built-in methods.

### 📝 Answer

```js
const aa = "asdadssdas kskdaskjk";

let count = 0;

for (const char of aa) {
  count++;
}

// Alternative approach
// while (str[count] !== undefined) {
//   count++;
// }

// Example
console.log(getLength("hello")); // 5

console.log(count);

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

### ❓ Write a program `to check if a string is a palindrome`.

### 📝 Answer

```js
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

//Alternative using built-in methods
// function isPalindromeBuiltIn(str) {
//   const reversed = str.split("").reverse().join("");
//   return str === reversed;
// }

// Example
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
```

---

### ❓ Write a program `to reverse a string`.

### 📝 Answer

```js
const aa = "asdadssdas kskdaskjk";
let reverse = "";

for (let i = aa.length - 1; i >= 0; i--) {
  reverse += aa[i];
}

//Alternative using built-in methods
// const reverse = aa.split("").reverse().join("");

console.log(reverse);
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
const arr = [ [ 1, 2 ], [ 3, 4, 5 ], [ 6, 7 ] ];

const output = arr.flat();
console.log(output);
// Expected output: [1, 2, 3, 4, 5, 6, 7, 8, 9]

// ------------ WITHOUT FLAT --------------
const aa = [ [ 1, 2 ], [ 3, 4, [5] ], [ 6, 7 ] ];

function recursion(arr) {
    for(let ch of arr) {
      if(Array.isArray(ch)) {
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

### ❓ Explain `call(), bind()` with examples.

### 📝 Answer

```js
/*--------------------------- CALL ---------------------------- */
function greet(city) {
  console.log(`Hi, I am ${this.name} from ${city}`);
}

const person1 = { name: "Dev" };

// call() immediately invokes 'greet'
greet.call(person1, "Chennai"); // Run greet, but treat person as its this. person1 uses greet function.

// Output: Hi, I am Dev from Chennai

/*--------------------------- BIND ---------------------------- */

function greet(city) {
  console.log(`Hi, I am ${this.name} from ${city}`);
}

const person2 = { name: "Dev" };

const greetDev = greet.bind(person2); // It returns a NEW function and later executed

greetDev("Mumbai"); // Now we call the new function whenever we want

// Output: "Hi, I am Dev from Mumbai"
```

---

### ❓ Write a program `to implement a counter using closures`.

### 📝 Answer

```js
function outer() {
  let count = 0;
  return function inner() {
    count++; // inner() can still access and modify 'count'
    console.log(count); // prints the updated value
  };
}

const inner = outer(); // outer() runs once and returns inner(),

inner(); // Output: 1 - calls inner(), count becomes 1
inner(); // Output: 2 - calls again, count becomes 2,
// same 'count' is remembered

//Example: 2
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}

// Output: 3 3 3
```

---

### ❓ Write a program `to implement function currying`.

### 📝 Answer

```js
/***************** FUNCTION CURRYING ********************/

// Currying means converting a function of multiple arguments
// into a sequence of functions taking one argument at a time.

// Normal function:
function normalAdd(a, b, c) {
  return a + b + c;
}

// Curried version:
function curriedAdd(a) {
  // First level receives 'a', returns another function
  return function (b) {
    // Second level receives 'b', returns another function
    return function (c) {
      return a + b + c; // Third level receives 'c', now calculate result
    };
  };
}

// Using the curried function
console.log("Curried:", curriedAdd(1)(2)(3)); // Output: 6

// Storing step-wise
const add1 = curriedAdd(1);
const add1and2 = add1(2);
console.log("Curried step-by-step:", add1and2(3)); // Output: 6
```

---

### ❓ Explain `higher-order functions` with examples.

### 📝 Answer

```js
/********************** HIGHER ORDER FUNCTION (HOF) **********************/

// A Higher Order Function is a function that either:
// 1) accepts another function as an argument, OR
// 2) returns a function

function calculate(a, b, operation) {
  return operation(a, b); // 'operation' is a function passed as an argument
}

function add(x, y) {
  return x + y;
}
function multiply(x, y) {
  return x * y;
}

// Using the HOF
console.log("HOF Add:", calculate(3, 4, add)); // 7
console.log("HOF Multiply:", calculate(3, 4, multiply)); // 12
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

---

### ❓ Explain JavaScript `prototype inheritance`.

### 📝 Answer

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log("Hi, I am " + this.name);
};

const p1 = new Person("Dev");
const p2 = new Person("Raj");
// p1 and p2 have different names but share the SAME sayHi() function

p1.sayHi(); // Uses the shared method → "Hi, I am Dev". Saves memory.

p2.sayHi(); // Uses the same shared method → "Hi, I am Raj"

/**
 * ⭐ Real Use Case (Built-in Prototypes)
 * console.log([1,2,3].map); // map() is a method defined on Array.prototype
 * console.log("hello".toUpperCase); // toUpperCase() is a method defined on String.prototype
 */
```

---

### ❓ Explain how the `JavaScript event loop` works.

### 📝 Answer

```js
// event-loop.js
// Run with: node event-loop.js

// 1. Synchronous code
console.log("script-start");

// 2. Synchronous: default params + IIFE
(function (y = 10, x = y) {
  console.log("default-params:", x, y);
})();

// 3. process.nextTick (Node-only microtask, highest priority)
process.nextTick(() => {
  console.log("nextTick");
});

// 4. Promise microtask
Promise.resolve().then(() => {
  console.log("promise-then");
});

// 5. Promise constructor
new Promise((resolve, reject) => {
  resolve(console.log("Promise constructor"));
});

// 6. Promise microtask that schedules a macrotask
Promise.resolve().then(() => {
  setTimeout(() => {
    console.log("Promise microtask that schedules a macrotask");
  }, 0);
});

// 7. queueMicrotask (microtask, after nextTick / promises)
queueMicrotask(() => {
  console.log("queueMicrotask");
});

// 8. async/await (await continuation is a microtask)
(async function asyncFn() {
  console.log("asyncFn-before-await");
  await null; // queues a microtask
  console.log("asyncFn-after-await");
})();

// 9. timers phase: setTimeout
setTimeout(() => {
  console.log("setTimeout-0ms");
}, 0);

// 10. timers phase: setInterval (single tick)
const intervalId = setInterval(() => {
  console.log("setInterval-tick");
  clearInterval(intervalId);
}, 0);

// 11. check phase: setImmediate
setImmediate(() => {
  console.log("setImmediate");
});

console.log("script-end");

// Expected Output Order:
// script-start
// default-params: 10 10
// Promise constructor
// asyncFn-sync-part
// script-end
// nextTick
// promise-then
// queueMicrotask
// asyncFn-after-await
// setTimeout-0ms
// setInterval-tick
// Promise microtask that schedules a macrotask
// setImmediate
```

---

### ❓ Explain hoisting in JavaScript with examples.

### 📝 Answer

```js
/***************** HOISTING ******************/

// Hoisting means: variable and function declarations
// are moved to the top of their scope before execution.

// Example: Calling a function before defining it works
sayHello(); // Works because function declarations are hoisted

function sayHello() {
  console.log("Hello from Hoisting!");
}

// But variables declared with var behave differently:
console.log(num); // Output: undefined (declared but not assigned)
var num = 10;

// let and const are also hoisted BUT kept in the "Temporal Dead Zone"
// console.log(x);  // ❌ Would throw error (not accessible before initialization)
// let x = 20;

/**✨ Quick Summary Table
Type	                    Hoisted?	       
Function Declaration	    ✔ Yes	            
var variable	            ✔ Yes(initialized to undefined)       
let variable	            ✔ Yes(declared but not initialized - throws error on access)          
const variable	            ✔ Yes(declared but not initialized - throws error on access)	            
Function Expression (var)	✔ Var is hoisted(initialized to undefined, throws error on access)
Arrow Function (let/const)	✔ Declaration is hoisted(throws error on access)
 */
```

---

### ❓ Explain temporal dead zone and variable shadowing.

### 📝 Answer

```js
var a = 1; // Global variable

function outer() {
  // Local `let a` (below) is hoisted but uninitialized → TDZ.
  // It shadows the global `a`, so this access hits the TDZ.
  console.log(a); // ❌ ReferenceError (TDZ)

  let a = 4; // Local `a` initialized here.

  return function inner() {
    // Another `let a` creates a new local `a`, also in TDZ here.
    console.log(a); // ❌ ReferenceError (TDZ again)

    let a = 2; // Local to inner()
  };
}

const f = outer(); // Error happens here
f(); // Never reached
```

---

### ❓ If Array.prototype.map is removed, how do you recreate it?

### 📝 Answer

```js
Array.prototype.myMap = function (callback) {
  let result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(callback(this[i], i, this));
    }
  }

  return result;
};

const arr = [1, 2, 3];
console.log(arr.myMap((v) => v * 2)); // [2, 4, 6]
```

1️⃣ Why does the callback receive **3 parameters**?

**`callback(value, index, array)`**

JavaScript provides **value**, **index**, and **array** so the callback can make **context-aware decisions** without relying on external variables.

- `value` → current element being processed
- `index` → useful for position-based logic
- `array` → allows comparison or reference to the full array

👉 This design makes `map` and `filter` **flexible and self-contained**.

2️⃣ Why do `map` and `filter` return a **new (immutable) array** instead of mutating the original?

`map` and `filter` follow **functional programming principles**—they are **pure functions**.

- They **do not change** the original array
- They return a **new array** with transformed or filtered values
- This avoids **side effects**, making code safer and more predictable

👉 Mutating the original array would break chaining and introduce bugs.

3️⃣ How does `this` get the array value inside `myMap` / `myFilter`?

When you call:

```js
arr.myMap(...)
```

- `myMap` is executed as a **method of `arr`**
- JavaScript automatically binds `this` to the object before the dot (`arr`)
- So inside `myMap`, `this === arr`

👉 That’s why `this.length`, `this[i]`, and `this` (passed to callback) work correctly.

---

### ❓ Why does `this` behave differently in arrow vs normal functions?

### 📝 Answer

```js
const obj = {
  value: 10,
  normal() {
    console.log(this.value);
  },
  arrow: () => {
    console.log(this.value);
  },
};

obj.normal(); // 10
obj.arrow(); // undefined
```

**Normal function (`normal`):**

- `normal` is called as a **method**
- JavaScript sets `this = obj` **at runtime**
- `this.value → 10`

✔️ **Dynamic `this` binding**

**Arrow function (`arrow`):**

- Arrow functions **do not have their own `this`**
- They capture `this` from the **lexical (outer) scope**
- Here, the outer scope is **global / module scope**
- `this.value` is `undefined`

✔️ **Lexical `this` binding**

---

### ❓ Explain Why `[] == ![] is true`?

### 📝 Answer

1️⃣ Why `[]` is **true**?

```js
if ([]) {
  /* runs */
}
```

- `[]` is an **object**
- **All objects are truthy** in JavaScript
- Truthiness check does **not** convert types

✅ So `[]` → **true**

2️⃣ Why `![]` is **false**?

```js
![];
```

1. `[]` is truthy
2. `!truthy` → `false`

✅ So `![]` → **false**

#### 3️⃣ Why `[] == ![]` is **true**?

⚠️ This is **NOT** a truthiness check.
This uses **abstract equality (`==`)**, which **forces type conversion**.

🔍 Step-by-step:

```js
[] == ![];
```

1. `![]` → `false`
2. Expression becomes:

   ```js
   [] == false;
   ```

3. `false` → `0`
4. `[]` → `""` → `0`
5. Final comparison:

   ```js
   0 == 0; // true
   ```

✅ Result → **true**

❓ What values are falsy in JavaScript?

```js
false
0
-0
0n
''
null
undefined
NaN
```

---

### ❓ Why `typeof null === "object"`?

### 📝 Answer

This is **a historical bug in JavaScript**, not a logical design decision.

1️⃣ How `typeof` works internally?

In the original JavaScript implementation, values were stored using **type tags**:

| Type    | Tag (binary) |
| ------- | ------------ |
| Object  | `000`        |
| Integer | `001`        |
| Double  | `010`        |
| String  | `100`        |
| Boolean | `110`        |

2️⃣ Why `null` becomes `"object"`?

- `null` was represented as **all zero bits (`000`)**
- `000` matched the **object type tag**
- So `typeof null` returned `"object"`

```js
typeof null; // "object"
```

This behavior was **never fixed** because:

- It would break massive amounts of existing code
- JavaScript preserves backward compatibility

⚠️ **Important clarification**

- `null` is **NOT** an object
- It represents **intentional absence of value**

Correct checks:

```js
null === null; // true
typeof null === "object"; // true (bug)
null instanceof Object; // false
```

---

### ❓ How does the Event Loop work internally?

### 📝 Answer

![EventLoop Image](/src/assets/event-loop.png)

1. Call Stack (Executes First)

- JavaScript executes **only one thing at a time**
- All **synchronous code** runs here
- Code runs **top to bottom**
- If Call Stack is busy, nothing else runs

👉 **Rule:** Call Stack must be empty before async code runs

2. Web APIs (Background Work)

- Provided by browser / Node.js
- Handles:

  - `setTimeout`
  - `setInterval`
  - HTTP / HTTPS calls
  - Events

- Does **not execute JS**, only waits

👉 After completion, callbacks are pushed to queues

3. Microtask Queue (High Priority)

- Runs **immediately after Call Stack is empty**
- Executed **before any macrotask**
- Contains:

  - `Promise.then / catch / finally`
  - `queueMicrotask`
  - `async / await` (after `await`)
  - `process.nextTick` (Node.js – highest)

👉 **All microtasks are executed completely**

4. Macrotask Queue (Low Priority / Callback Queue)

- Runs **after microtasks**
- Only **one macrotask runs per cycle**
- Contains:

  - `setTimeout`
  - `setInterval`
  - I/O callbacks
  - DOM events

👉 `setTimeout(0)` still waits

Below is a **detailed yet crisp comparison** of
**`Promise.all` vs `Promise.allSettled` vs `Promise.race` vs `Promise.any`**,
with **clear behavior rules and real outputs** — exactly how interviewers expect you to explain it.

---

### ❓ Explain the difference between Promise.all, Promise.allSettled, Promise.race, and Promise.any. When would you use each one?

### 📝 Answer

1. `Promise.all()`

- Runs **multiple promises in parallel**
- **Fails fast** → rejects immediately if **any one** promise fails
- Returns **results in the same order** as input promises

✅ When to use

- When **all async operations are mandatory**
- Example: Load user profile, permissions, and config

🧠 Behavior

| Scenario     | Result                               |
| ------------ | ------------------------------------ |
| All resolved | Resolves with array of values        |
| Any rejected | Rejects immediately with first error |

💡 Example

```js
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.resolve(30);

Promise.all([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
```

📤 Output

```txt
[10, 20, 30]
```

❌ **Failure Case**

```js
const p2 = Promise.reject("Error in p2");

Promise.all([p1, p2, p3]).catch((err) => console.error(err));
```

```txt
Error in p2
```

2. `Promise.allSettled()`

- Waits for **all promises to complete**
- Never fails fast
- Returns **status + value/reason** for each promise

✅ When to use

- When **partial success is acceptable**
- Logging, batch processing, analytics, retries

🧠 Behavior

| Scenario      | Result                          |
| ------------- | ------------------------------- |
| All resolved  | All `fulfilled`                 |
| Some rejected | Still resolves with full report |

💡 Example

```js
const p1 = Promise.resolve(10);
const p2 = Promise.reject("Failed");
const p3 = Promise.resolve(30);

Promise.allSettled([p1, p2, p3]).then((result) => console.log(result));
```

📤 Output

```txt
[
  { status: 'fulfilled', value: 10 },
  { status: 'rejected', reason: 'Failed' },
  { status: 'fulfilled', value: 30 }
]
```

3. `Promise.race()`

- Returns **first settled promise**
- Can be **resolve OR reject**
- Others are ignored

✅ When to use

- Timeouts
- First-response wins (CDN, fallback APIs)

🧠 Behavior

| Scenario       | Result   |
| -------------- | -------- |
| First resolves | Resolves |
| First rejects  | Rejects  |

💡 Example

```js
const p1 = new Promise((res) => setTimeout(() => res("Fast"), 100));
const p2 = new Promise((res) => setTimeout(() => res("Slow"), 500));

Promise.race([p1, p2]).then((result) => console.log(result));
```

📤 Output

```txt
Fast
```

❌ **Reject Case**

```js
const p1 = new Promise((_, rej) => setTimeout(() => rej("Timeout"), 100));

Promise.race([p1, p2]).catch((err) => console.error(err));
```

```txt
Timeout
```

4. `Promise.any()` (ES2021)

- Returns **first fulfilled promise**
- Ignores rejections unless **all fail**
- Rejects with `AggregateError` if none succeed

✅ When to use

- Multiple fallback APIs
- First **successful** response wins

🧠 Behavior

| Scenario     | Result                        |
| ------------ | ----------------------------- |
| Any resolved | Resolves                      |
| All rejected | Rejects with `AggregateError` |

💡 Example

```js
const p1 = Promise.reject("Error 1");
const p2 = Promise.resolve("Success");
const p3 = Promise.reject("Error 3");

Promise.any([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
```

📤 Output

```txt
Success
```

❌ **All Failed**

```js
Promise.any([p1, p3]).catch((err) => console.error(err.errors));
```

```txt
["Error 1", "Error 3"]
```

**Follow-up Questions**

Which Promise method should be used?

1️⃣ You are calling three backend APIs in parallel. One API is critical, two are optional. → **Promise.any**
2️⃣ How would you implement an API timeout using Promises? → **Promise.race**

---
