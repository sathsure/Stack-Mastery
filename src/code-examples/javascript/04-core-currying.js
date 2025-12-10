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
