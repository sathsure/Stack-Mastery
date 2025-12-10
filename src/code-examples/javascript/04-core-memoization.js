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
