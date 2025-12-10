// ======= Using Sort =======
function isAnagram(str1, str2) {
  // If lengths differ, cannot be anagram
  if (str1.length !== str2.length) return false;

  return str1.split("").sort().join("") === str2.split("").sort().join("");
}

// Test
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world")); // false

// ======= Using Characters =======
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  const freq = {};

  for (let char of str1) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (let char of str2) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}

// Test
console.log(isAnagram("triangle", "integral")); // true
console.log(isAnagram("abc", "abd")); // false
