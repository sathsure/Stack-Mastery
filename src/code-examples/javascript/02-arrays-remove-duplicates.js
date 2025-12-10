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