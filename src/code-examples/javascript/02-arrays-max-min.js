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
