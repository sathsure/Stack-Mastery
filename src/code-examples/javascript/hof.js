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
