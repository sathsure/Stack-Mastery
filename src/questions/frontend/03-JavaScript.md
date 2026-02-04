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

### ❓ Explain Closure with implementation

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

### ❓ Explain Function Currying with Implementation

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
false;
0 - 0;
0n;
("");
null;
undefined;
NaN;
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
