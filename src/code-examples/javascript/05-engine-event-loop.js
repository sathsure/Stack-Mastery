// event-loop.js
// Run with: node event-loop.js

console.log("script-start");

// 1. Synchronous code
console.log("sync-log");

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

// 5. queueMicrotask (microtask, after nextTick / promises)
queueMicrotask(() => {
  console.log("queueMicrotask");
});

// 6. async/await (await continuation is a microtask)
(async function asyncFn() {
  console.log("asyncFn-sync-part");
  await null; // queues a microtask
  console.log("asyncFn-after-await");
})();

// 7. timers phase: setTimeout
setTimeout(() => {
  console.log("setTimeout-0ms");
}, 0);

// 8. timers phase: setInterval (single tick)
const intervalId = setInterval(() => {
  console.log("setInterval-tick");
  clearInterval(intervalId);
}, 0);

// 9. check phase: setImmediate
setImmediate(() => {
  console.log("setImmediate");
});

console.log("script-end");

// Expected Output Order:
// script-start
// sync-log
// default-params: 10 10
// asyncFn-sync-part
// script-end
// nextTick
// promise-then
// queueMicrotask
// asyncFn-after-await
// setTimeout-0ms
// setInterval-tick
// setImmediate
