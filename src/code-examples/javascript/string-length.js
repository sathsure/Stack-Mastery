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
