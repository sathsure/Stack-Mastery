### ❓ 1. What is Node.js and why was it created?

📝 **Answer (Point-by-Point):**

- **Node.js** is a JavaScript runtime environment that allows JavaScript to run outside the browser, mainly on servers.
- Internally, Node.js uses the **V8 JavaScript engine**, which compiles JavaScript directly into machine code for fast execution.
- Node.js was created to solve the scalability problem of traditional server models where each incoming request required a new thread.
- Instead of using a blocking request-per-thread model, Node.js uses an **event-driven, non-blocking I/O model**.
- This design allows a single Node.js process to handle thousands of concurrent connections efficiently.

**Previously used approaches:**

- PHP, Java Servlets, ASP.NET used blocking I/O and thread-per-request models.

**Recommended today:**

- Node.js for APIs, real-time applications, microservices, and streaming systems.

![NodeJS Image](/src/assets/nodejs.png)

---

### ❓ 2. What is Express.js and why do we need it?

📝 **Answer**

- **Express.js** is a minimal web framework built on top of Node.js.
- Express.js simplifies HTTP server creation by providing routing, middleware handling, and request/response abstractions.
- Without Express.js, developers would need to manually handle headers, routes, and request parsing using Node’s core modules.
- Express.js follows a middleware-based architecture, which makes applications modular and maintainable.

**Where it is used:**

- REST APIs
- Backend services
- Server-side rendered applications

![ExpressFlow Image](/src/assets/express-flow.png)

---

### ❓ 3. What does non-blocking I/O mean in Node.js?

📝 **Answer**

- Non-blocking I/O means Node.js does not wait for slow operations such as file reads or database queries to finish.
- Instead, Node.js delegates these operations to the operating system or libuv thread pool.
- Once the operation completes, a callback is queued for execution in the event loop.
- This allows Node.js to remain responsive even under heavy load.

---

### ❓ 4. Explain the Node.js Event Loop in detail.

📝 **Answer (Senior-level explanation):**

- The Event Loop is the mechanism that allows Node.js to handle asynchronous operations using a single main JavaScript thread.
- Node.js relies on **libuv**, which manages the event loop and a background thread pool.
- The Event Loop processes tasks in **phases**, ensuring predictable execution order.

#### 🔁 Event Loop Phases (Explained Clearly)

- **Timers Phase**
  Executes callbacks scheduled by `setTimeout()` and `setInterval()` once their delay has expired.

- **Pending Callbacks Phase**
  Handles callbacks deferred from previous operations, such as some TCP errors.

- **Poll Phase**
  Retrieves new I/O events and executes I/O callbacks. If no callbacks are available, it may wait.

- **Check Phase**
  Executes callbacks scheduled using `setImmediate()`.

- **Close Callbacks Phase**
  Handles cleanup callbacks like closing sockets.

#### ⚠️ Microtasks vs Macrotasks

- Promise callbacks (`then`, `catch`) are executed as **microtasks**.
- Microtasks always run **before** the event loop proceeds to the next phase.
- Timers and I/O callbacks are **macrotasks**.

```js
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
```

**Output explanation:**

- `promise` executes first because microtasks have higher priority.

![NodeJSEventLoop Image](/src/assets/nodejs-eventloop.png)

---

### ❓ 5. Is Node.js single-threaded?

📝 **Answer**

- JavaScript execution in Node.js runs on a single main thread.
- Internally, Node.js uses a **thread pool** for CPU-intensive or blocking operations.
- This hybrid model allows high concurrency without blocking the event loop.

---

### ❓ 6. What are Worker Threads and when should they be used?

📝 **Answer**

- Worker Threads allow JavaScript code to run in parallel threads.
- They are designed specifically for CPU-intensive tasks that would otherwise block the event loop.
- Worker threads should be used for tasks such as encryption, image processing, or heavy computations.
- They should not be used for I/O-bound tasks.

---

### ❓ 7. What are Streams and why are they important?

📝 **Answer**

- Streams allow data to be processed in small chunks instead of loading the entire data into memory.
- This approach significantly reduces memory usage and improves performance.
- Streams are critical for handling large files, video streaming, and real-time data processing.

```js
fs.createReadStream("large.log").pipe(fs.createWriteStream("output.log"));
```

![NodeJSStreams Image](/src/assets/nodejs-streams.png)

---

### ❓ 8. What is middleware in Express.js?

📝 **Answer**

- Middleware functions execute sequentially between the incoming request and outgoing response.
- Middleware is used for logging, authentication, validation, parsing, and error handling.
- This architecture promotes separation of concerns and reusability.

#### Common Middleware Examples

- **Logging Middleware:** Morgan, Winston
- **File Upload Middleware:** Multer
- **Parsing Middleware:** `express.json()`, `express.urlencoded()`
- **Static Files:** `express.static()`

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

---

### ❓ 9. What is Authentication and Authorization?

📝 **Answer**

- Authentication verifies the identity of a user and answers the question, “Who are you?”
- Authorization determines what an authenticated user is allowed to access.
- Authentication always happens before authorization.

---

### ❓ 10. Explain all authentication methods used in Node.js applications.

#### 1️⃣ Sessions & Cookies

- Session data is stored on the server.
- A session ID is stored in a cookie on the client.
- This approach is simple but does not scale well without shared session storage.

#### 2️⃣ JWT (Recommended for APIs)

- JWT stores authentication data inside a signed token.
- The server verifies the token signature instead of querying a database.
- JWT is stateless and works well with microservices.

```js
jwt.sign({ userId }, SECRET, { expiresIn: "15m" });
```

#### 3️⃣ OAuth & SSO

- OAuth allows authentication using third-party providers.
- SSO allows a user to authenticate once and access multiple systems.

---

### ❓ 11. Explain Access Tokens, Refresh Tokens, and Token Rotation.

📝 **Answer**

- Access tokens are short-lived tokens used for API access.
- Refresh tokens are long-lived tokens used to obtain new access tokens.
- Token rotation invalidates old refresh tokens after use, preventing token replay attacks.

---

### ❓ 12. How do you secure authentication systems?

📝 **Answer**

- **HTTPOnly Cookies** prevent JavaScript access to tokens.
- **SameSite Cookies** protect against CSRF attacks.
- **CSRF Tokens** validate request origin.
- **Helmet** secures HTTP headers.
- **Rate Limiting** prevents brute-force attacks.
- **Password Hashing** ensures passwords are never stored in plaintext.
- **Salting** prevents rainbow table attacks.
- **Peppering** adds an application-level secret.
- **MFA / 2FA / OTP / TOTP** add extra verification layers.
- **RBAC, ABAC, PBAC** control access based on roles, attributes, or policies.
- **Nonce usage** prevents replay attacks.
- **Token expiration handling** ensures old tokens are invalidated properly.
- **API Keys & Basic Auth** are used for machine-to-machine communication.

![Image](/src/assets/nodejs-at-and-rt.png)

- **_AT: Access Token_**
- **_RT: Refresh Token_**
- **_RS: Resource Server_**
- **_AS: Authorization Server_**
- **_SPA: Single Page Application_**

![Image](/src/assets/nodejs-authorization-flow.png)

![Image](/src/assets/nodejs-csrftoken.png)

---

### ❓ 13. How do you manage environment configuration?

📝 **Answer**

- Environment variables separate configuration from code.
- This allows different values for development, staging, and production.
- Tools like `dotenv` are commonly used.

---

### ❓ 14. How does load balancing work in Node.js?

📝 **Answer**

- Load balancing distributes incoming requests across multiple application instances.
- This improves availability, scalability, and fault tolerance.
- Tools include NGINX, PM2 cluster mode, and cloud load balancers.

---

### ❓ 15. Explain routing, route params, and query params.

📝 **Answer**

- Routing maps HTTP requests to handlers.
- Route parameters identify specific resources.
- Query parameters modify request behavior.

```js
app.get("/users/:id", (req, res) => {
  req.params.id;
  req.query.page;
});
```

---

### ❓ 16. How do you profile Node.js applications?

📝 **Answer**

- Profiling identifies CPU bottlenecks and memory leaks.
- Tools include Chrome DevTools, Clinic.js, and Node’s inspector.

---

### ❓ 17. How does logging work in production?

📝 **Answer**

- Logging captures application behavior over time.
- Libraries like Winston and Pino support log levels and persistence.
- Logging is critical for debugging and monitoring.

---

### ❓ 18. Explain memory management and garbage collection.

📝 **Answer**

- Node.js uses V8’s garbage collector.
- Unused memory is reclaimed automatically.
- Memory leaks occur due to global variables, closures, or unremoved listeners.

---

### ❓ 19. Compare npm, yarn, pnpm, and npx.

📝 **Answer**

- `npm` is the default and widely supported.
- `yarn` improves install speed and consistency.
- `pnpm` is disk-efficient and recommended for large monorepos.
- `npx` runs packages without installing them globally.

---

### ❓ 20. What is the Node.js REPL?

📝 **Answer**

- REPL allows interactive execution of JavaScript.
- It is useful for debugging and experimentation.

---

### ❓ 21. How does the File System module work?

📝 **Answer**

- The File System module provides APIs to interact with files.
- Asynchronous methods are preferred to avoid blocking the event loop.

---

### ❓ 22. What is caching and why is it important?

📝 **Answer**

- Caching stores frequently accessed data for faster retrieval.
- It reduces database load and improves response time.
- Tools like **Redis** are commonly used.

---

### ❓ 23. Does `async/await` create threads in Node.js?

📝 **Answer**

- No, `async/await` does **not** create new threads in Node.js.
- `async/await` is **syntactic sugar** built on top of JavaScript **Promises**, and it does not change how JavaScript is executed internally.
- When an `async` function is called, it starts executing synchronously until it reaches an `await` keyword.
- At the point of `await`, the function pauses execution and returns control back to the **event loop**, allowing other tasks to run.
- The awaited operation is handled asynchronously, often by the operating system or Node.js’s internal thread pool if it involves I/O.
- Once the awaited Promise is resolved or rejected, the remaining part of the function is placed in the **microtask queue**.
- The event loop then executes this continuation when it reaches the microtask processing step.

#### 💡 Code Example

```js
async function fetchData() {
  console.log("Start");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("End");
}

fetchData();
```

**Execution explanation:**

- `"Start"` is logged immediately.
- The function pauses at `await`, and the event loop continues processing other tasks.
- After one second, the Promise resolves.
- `"End"` is executed as a microtask after the current event loop phase completes.

---
