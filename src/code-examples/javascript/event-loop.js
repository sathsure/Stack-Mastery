// event-loop.js
// Demonstrates JS Event Loop order: sync → microtasks → macrotasks

console.log("start");
// Synchronous → runs immediately

setTimeout(() => {
  console.log("timeout");
}, 0);
// Macrotask → runs after microtasks

Promise.resolve().then(() => {
  console.log("promise-1");
});
// Microtask → runs before setTimeout

Promise.resolve().then(() => {
  console.log("promise-2");
});
// Another microtask

(function (y = 10, x = y) {
  console.log(x, y);
})();
// Default params → x receives value of y

queueMicrotask(() => {
  console.log("1");
});
// Explicit microtask → runs with other promise microtasks

console.log("end");
// Last synchronous log
