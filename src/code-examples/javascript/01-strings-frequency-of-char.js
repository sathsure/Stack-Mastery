function charFrequency(str) {
  const freq = {};
  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  return freq;
}
console.log(charFrequency("hello world"));

// Output: { h: 1, e: 1, l: 3, o: 2, ' ': 1, w: 1, r: 1, d: 1 }
