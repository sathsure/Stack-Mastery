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
