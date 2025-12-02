const aa = "asdadssdas kskdaskjk";

let count = 0;

for (const char of aa) {
  // iterates each character
  count++;
}

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
