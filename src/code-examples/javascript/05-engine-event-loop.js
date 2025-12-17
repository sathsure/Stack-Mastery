// event-loop.js
// Run with: node event-loop.js

// 1. Synchronous code
console.log("script-start");

// 2. Synchronous: default params + IIFE
(function (y = 10, x = y) {
  console.log("default-params:", x, y);
})();

// 3. process.nextTick (Node-only microtask, highest priority)
process.nextTick(() => {
  console.log("nextTick");
});

// 4. Promise microtask
Promise.resolve().then(() => {
  console.log("promise-then");
});

// 5. Promise constructor
new Promise((resolve, reject) => {
  resolve(console.log("Promise constructor"));
});


// 6. Promise microtask that schedules a macrotask
Promise.resolve().then(() => {
  setTimeout(() => {
    console.log("Promise microtask that schedules a macrotask");
  }, 0);
});

// 7. queueMicrotask (microtask, after nextTick / promises)
queueMicrotask(() => {
  console.log("queueMicrotask");
});

// 8. async/await (await continuation is a microtask)
(async function asyncFn() {
  console.log("asyncFn-before-await");
  await null; // queues a microtask
  console.log("asyncFn-after-await");
})();

// 9. timers phase: setTimeout
setTimeout(() => {
  console.log("setTimeout-0ms");
}, 0);

// 10. timers phase: setInterval (single tick)
const intervalId = setInterval(() => {
  console.log("setInterval-tick");
  clearInterval(intervalId);
}, 0);

// 11. check phase: setImmediate
setImmediate(() => {
  console.log("setImmediate");
});

console.log("script-end");

// Expected Output Order:
// script-start
// default-params: 10 10
// Promise constructor
// asyncFn-sync-part
// script-end
// nextTick
// promise-then
// queueMicrotask
// asyncFn-after-await
// setTimeout-0ms
// setInterval-tick
// Promise microtask that schedules a macrotask
// setImmediate
