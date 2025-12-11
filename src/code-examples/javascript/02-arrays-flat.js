var arr = [1, 2, 3, [4, 5], [6, 7], 8, 9];

const output = arr.flat();
console.log(output);
// Expected output: [1, 2, 3, 4, 5, 6, 7, 8, 9]

// ------------ WITHOUT FLAT --------------
var arr = [1, 2, 3, [4, 5], [6, 7], 8, 9];

const outputWithoutFlat = [].concat(...arr);
console.log(outputWithoutFlat);
// Expected output: [1, 2, 3, 4, 5, 6, 7, 8, 9]