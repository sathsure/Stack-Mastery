const aa = "asdadssdas kskdaskjk";
let reverse = "";

for (let i = aa.length - 1; i >= 0; i--) {
  reverse += aa[i];
}

//Alternative using built-in methods
// const reverse = aa.split("").reverse().join("");

console.log(reverse);
