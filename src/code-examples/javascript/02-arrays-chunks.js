function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    console.log(i);
    out.push(arr.slice(i, i + size));
  }
  console.log(out);
}

chunk([1, 2, 3, 4, 5, 6], 2);
// Output: [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]

chunk([1, 2, 3, 4, 5], 3);
// Output: [ [ 1, 2, 3 ], [ 4, 5 ] ]