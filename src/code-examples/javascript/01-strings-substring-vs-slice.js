// EXAMPLE: 1

/* ------------ substring() treats negative numbers as 0 ------------ */
console.log("world".substring(-2, 4)); // Output: "worl"

/* ------------ slice() counts negative numbers from the end ------------ */
console.log("world".slice(-2, 4)); // Output: l

// EXAMPLE: 2

"hello".substring(4, 1); //  Output: "ell"   // swapped internally to (1,4)
"hello".slice(4, 1); //   Output: ""     // no swap → empty
