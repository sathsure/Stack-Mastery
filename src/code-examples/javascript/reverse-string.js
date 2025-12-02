const aa = "asdadssdas kskdaskjk";
let reverse = "";

for (let i = aa.length - 1; i >= 0; i--) {
  reverse += aa[i];
}

/* Alternative approach */
// const array = aa.split("");
// let length = array.length;
// array.forEach((_, index) => {
//     reverse += array[length - 1 - index];
// });

console.log(reverse);
