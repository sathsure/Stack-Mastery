function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

//Alternative using built-in methods
// function isPalindromeBuiltIn(str) {
//   const reversed = str.split("").reverse().join("");
//   return str === reversed;
// }

// Example
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
