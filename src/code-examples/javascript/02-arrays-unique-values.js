function unique(arr) {
  const result = [];
  const seen = {};

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (!seen[value]) {
      seen[value] = true;
      result.push(value);
    }
  }

  return result;
}

// Example
console.log(unique([1, 2, 2, 3, 4, 4])); // [1, 2, 3, 4]
