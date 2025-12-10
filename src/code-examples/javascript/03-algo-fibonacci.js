function fibonacci(n) {
  const result = [0, 1];

  for (let i = 2; i < n; i++) {
    const next = result[i - 1] + result[i - 2];
    result.push(next);
  }

  return result;
}

// Example:
console.log(fibonacci(10));
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
