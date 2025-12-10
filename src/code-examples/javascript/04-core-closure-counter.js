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
