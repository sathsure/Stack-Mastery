## Authentication & Authorization

### ❓ 1. What is the difference between Authentication and Authorization?

📝 **Answer:**

- **Authentication**: “Who are you?” – verifying identity (login).
- **Authorization**: “What are you allowed to do?” – permissions after you’re authenticated.
- AuthN happens first, then AuthZ.
- Example: login (authN) → check if user has `admin` role (authZ).

💻 **Code Example:**

```ts
// Pseudo Express middleware example

// Authentication: attach user to request
app.use(async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Unauthenticated");

  try {
    const user = verifyJwt(token); // decode + verify
    req.user = user;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
});

// Authorization: check role/permission
function requireAdmin(req, res, next) {
  if (!req.user?.roles?.includes("admin")) {
    return res.status(403).send("Forbidden"); // authenticated but not allowed
  }
  next();
}

app.get("/admin", requireAdmin, (req, res) => {
  res.send("Welcome, admin");
});
```

---

### ❓ 2. How does JWT work? (Header, Payload, Signature — with example)

📝 **Answer:**

- **JWT** = JSON Web Token used for stateless auth.
- Structure: `header.payload.signature` (3 Base64URL-encoded parts).

  - **Header**: algorithm, token type ⇒ `{ "alg": "HS256", "typ": "JWT" }`
  - **Payload**: claims ⇒ `{ "sub": "123", "role": "admin", "exp": 1712345678 }`
  - **Signature**: HMAC/RS256 over `header.payload` with secret/private key.

- Server **verifies** signature + expiration each request. No DB needed for basic checks.

💻 **Code Example:**

```ts
// Example JWT content (not real secret)
const header = {
  alg: "HS256",
  typ: "JWT",
};

const payload = {
  sub: "123",
  email: "user@example.com",
  role: "user",
  exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
};

// Node.js with jsonwebtoken
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

const token = jwt.sign(payload, secret, { algorithm: "HS256" });
console.log("JWT:", token);

// Verifying on server for each request:
const decoded = jwt.verify(token, secret); // throws if invalid/expired
```

---

### ❓ 3. Where should you store JWTs in a browser and why? (Why HTTP-only cookies > localStorage)

📝 **Answer:**

- **Never 100% safe in frontend**, but:
- `localStorage` / `sessionStorage`:

  - Easy to use, but **fully accessible** by JS → stolen if XSS happens.

- **HttpOnly cookie (Secure + SameSite)**:

  - Not accessible by JS → mitigates token theft via XSS.
  - Automatically sent to correct origin.
  - Helps with CSRF protection when combined with `SameSite` and CSRF tokens.

- Common pattern: **access token in memory**, **refresh token in HttpOnly cookie**.

💻 **Code Example:**

```http
// Server response (Set-Cookie header)
Set-Cookie: refreshToken=eyJhbGciOi...;
  HttpOnly;
  Secure;
  SameSite=Strict;
  Path=/auth/refresh;
  Max-Age=2592000
```

```ts
// Frontend – store only short-lived access token in memory (not localStorage)
let accessToken: string | null = null;

async function login() {
  const res = await fetch("/auth/login", {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  accessToken = data.accessToken; // stored in JS memory only
}

async function apiGet(path: string) {
  const res = await fetch(path, {
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include", // send cookies (for refresh endpoint etc.)
  });
  return res.json();
}
```

---

### ❓ 4. How do you invalidate JWT tokens? (Stateless issue, token blacklisting)

📝 **Answer:**

- JWTs are **stateless**: once issued, server can’t “delete” them by default.
- Common strategies:

  - **Short expiry** (e.g., 15 min access tokens).
  - **Refresh tokens** with rotation.
  - **Server-side blacklist / denylist**: store token `jti` / user id with “revoked until” time (Redis/DB).
  - **Key rotation**: change signing secret; all tokens signed with old key become invalid.

💻 **Code Example:**

```ts
// Example: blacklist using Redis and jti (token ID)
import jwt from "jsonwebtoken";
import { redis } from "./redis-client";

function revokeToken(jti: string, exp: number) {
  const ttl = exp - Math.floor(Date.now() / 1000);
  if (ttl > 0) {
    redis.set(`blacklist:${jti}`, "1", "EX", ttl);
  }
}

async function isTokenRevoked(jti: string) {
  return (await redis.get(`blacklist:${jti}`)) === "1";
}

// Middleware
async function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    if (await isTokenRevoked(decoded.jti)) {
      return res.status(401).send("Token revoked");
    }
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Unauthenticated");
  }
}
```

---

### ❓ 5. How do refresh tokens work and how do you secure them?

📝 **Answer:**

- **Access token**:

  - Short-lived (minutes).
  - Used on each API call.

- **Refresh token**:

  - Longer-lived (days/weeks).
  - Used only to get new access tokens.

- Security:

  - Store refresh token in **HttpOnly, Secure, SameSite cookie**.
  - Use **refresh token rotation**: issue a new refresh token each time and invalidate old one.
  - Store refresh tokens (or their hashes) on server side; detect reuse.

💻 **Code Example:**

```ts
// /auth/refresh backend route
app.post("/auth/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).send("No refresh token");

  const stored = await db.refreshTokens.findOne({
    tokenHash: hash(refreshToken),
  });
  if (!stored || stored.revoked)
    return res.status(401).send("Invalid refresh token");

  // rotate token
  const newAccessToken = createAccessToken(stored.userId);
  const newRefreshToken = createRefreshToken(stored.userId);

  // mark old as revoked & save new
  await db.refreshTokens.update({ id: stored.id }, { revoked: true });
  await db.refreshTokens.insert({
    userId: stored.userId,
    tokenHash: hash(newRefreshToken),
  });

  res
    .cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/auth/refresh",
    })
    .json({ accessToken: newAccessToken });
});
```

---

## Web App Security

### ❓ 6. What is XSS and how do you prevent it?

📝 **Answer:**

- **XSS (Cross-Site Scripting)**: attacker injects malicious JS into your page (via user input, query params, etc.).
- Types: **Stored**, **Reflected**, **DOM-based**.
- Prevention:

  - **Escape/encode** all untrusted data before inserting into HTML.
  - Use frameworks that auto-escape (React, Angular).
  - Avoid `innerHTML`, `eval`, `Function`.
  - Use **CSP**, input validation, and sanitize rich HTML.

💻 **Code Example:**

```ts
// ❌ Vulnerable (DOM XSS)
const comment = new URLSearchParams(location.search).get("comment");
document.getElementById("comment")!.innerHTML = comment; // attacker can inject <script>

// ✅ Safer (encode text)
document.getElementById("comment")!.textContent = comment || "";

// React example – safe by default
function Comment({ text }: { text: string }) {
  return <p>{text}</p>; // React escapes {text}
}
```

---

### ❓ 7. Explain CSRF and how do you prevent it?

📝 **Answer:**

- **CSRF (Cross-Site Request Forgery)**: attacker tricks user’s browser into sending authenticated request to your site.
- Happens because browser automatically sends cookies.
- Prevention:

  - **SameSite cookies** (`Lax`/`Strict`).
  - **CSRF tokens** (synchronizer token): random token in form/body/header that attacker can’t read.
  - Use **custom headers** and verify origin/referer.
  - Avoid unsafe HTTP methods for sensitive actions without protection.

💻 **Code Example:**

```ts
// Backend (Express) – generate CSRF token and send it
app.get("/form", (req, res) => {
  const csrfToken = crypto.randomBytes(32).toString("hex");
  req.session.csrfToken = csrfToken;
  res.json({ csrfToken });
});

// Frontend – send token in header
async function submitForm(data: any, csrfToken: string) {
  await fetch("/submit", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify(data),
  });
}

// Backend – verify token
app.post("/submit", (req, res) => {
  if (req.headers["x-csrf-token"] !== req.session.csrfToken) {
    return res.status(403).send("CSRF detected");
  }
  // proceed
});
```

---

### ❓ 8. What is CORS and why do preflight requests exist?

📝 **Answer:**

- **CORS (Cross-Origin Resource Sharing)**: browser security feature that controls which origins can call your API.
- Same-origin = same `scheme + host + port`.
- When a request is **non-simple** (e.g., custom headers, JSON POST), browser sends a **preflight** `OPTIONS` request to ask server if it’s allowed.
- Server responds with `Access-Control-Allow-*` headers.

💻 **Code Example:**

```ts
// Express CORS config
import cors from "cors";

app.use(
  cors({
    origin: "https://my-frontend.com",
    credentials: true, // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  })
);

// Preflight response (automatic via cors middleware)
```

---

### ❓ 9. What is Clickjacking and how do you prevent it?

📝 **Answer:**

- **Clickjacking**: attacker loads your site in a transparent `<iframe>` and tricks user into clicking invisible buttons (e.g., “Delete account”).
- Prevention:

  - **`X-Frame-Options`** header (`DENY` or `SAMEORIGIN`).
  - **CSP frame-ancestors** directive.
  - Optional: JS frame-busting, but headers are stronger.

💻 **Code Example:**

```http
// Server response headers
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none';
```

```js
// Old-school frame-busting (not a full solution, just extra)
if (window.top !== window.self) {
  window.top.location = window.location;
}
```

---

### ❓ 10. What is Content Security Policy (CSP)? Why is it important?

📝 **Answer:**

- **CSP** is an HTTP header that tells browser which resources are allowed (scripts, styles, images, frames).
- Helps mitigate **XSS**, data exfiltration, malicious third-party scripts.
- Example: only allow scripts from your domain and disallow inline JS.

💻 **Code Example:**

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.example.com;
  style-src 'self' 'https://fonts.googleapis.com';
  img-src 'self' data:;
  frame-ancestors 'none';
  object-src 'none';
```

---

## API & Server Security

### ❓ 11. What is rate-limiting and why is it important?

📝 **Answer:**

- **Rate limiting**: limit number of requests per IP/user over time window.
- Protects against:

  - Brute-force login attacks.
  - API abuse, scraping.
  - Helps mitigate DoS.

- Usually implemented on API gateway, reverse proxy, or app server.

💻 **Code Example:**

```ts
// Express example with express-rate-limit
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10, // 10 login attempts
  message: "Too many login attempts, try again later",
});

app.post("/auth/login", loginLimiter, loginHandler);
```

---

### ❓ 12. Explain SQL Injection and how ORMs prevent it.

📝 **Answer:**

- **SQL Injection**: attacker injects SQL via untrusted input (e.g., `' OR 1=1 --`).
- Causes data leaks, modification, or full DB compromise.
- Prevention:

  - **Parameterized queries / prepared statements**.
  - ORM query APIs that separate query from parameters.
  - Proper input validation.

💻 **Code Example:**

```ts
// ❌ Vulnerable
const username = req.body.username;
const sql = `SELECT * FROM users WHERE username = '${username}'`;
db.query(sql); // user can inject SQL

// ✅ Safe with parameters
db.query("SELECT * FROM users WHERE username = ?", [username]);

// ORM (Prisma example)
const user = await prisma.user.findUnique({
  where: { username }, // parameters, not string concatenation
});
```

---

### ❓ 13. Explain NoSQL Injection. How can it happen in MongoDB?

📝 **Answer:**

- **NoSQL Injection**: same idea but in NoSQL queries.
- Example in MongoDB: trusting JSON from client directly, allowing `$gt`, `$ne`, `$where` operators.
- Attacker sends JSON that changes query behavior.
- Prevention:

  - **Whitelist** allowed fields and types.
  - Disallow/strip `$`-prefixed keys.
  - Use typed schemas (Mongoose, Zod, Joi).

💻 **Code Example:**

```ts
// ❌ Vulnerable (MongoDB)
const filter = req.body.filter; // client can send { "role": { "$ne": "admin" } }
const users = await User.find(filter);

// ✅ Safer: whitelist fields & disallow $ operators
function sanitizeFilter(raw: any) {
  const clean: any = {};
  if (typeof raw.email === "string") clean.email = raw.email;
  if (typeof raw.role === "string") clean.role = raw.role;
  return clean;
}

const filterSafe = sanitizeFilter(req.body.filter || {});
const usersSafe = await User.find(filterSafe);
```

---

### ❓ 14. What are common security headers you should enable? (Strict-Transport-Security, X-Frame-Options, X-XSS-Protection…)

📝 **Answer:**

Common helpful headers:

- `Strict-Transport-Security` (HSTS): force HTTPS.
- `Content-Security-Policy`: control allowed resources.
- `X-Frame-Options` or `frame-ancestors`: prevent clickjacking.
- `X-Content-Type-Options: nosniff`: prevent MIME sniffing.
- `Referrer-Policy`: limit referrer leakage.
- `Permissions-Policy`: control access to powerful features (camera, mic, etc.).
- (Legacy) `X-XSS-Protection`: older IE/Chrome filter.

💻 **Code Example:**

```ts
// Express + helmet
import helmet from "helmet";

app.use(
  helmet({
    contentSecurityPolicy: false, // often configured separately
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});
```

---

## Password & Data Security

### ❓ 15. How do hashing and salting work? Why bcrypt > SHA?

📝 **Answer:**

- **Hashing**: one-way function (e.g., SHA-256) → same input → same output.
- **Salting**: add random string to password before hashing so two same passwords don’t have same hash.
- **bcrypt / Argon2 / scrypt**:

  - Slow + configurable cost factor.
  - Built-in salt.
  - Resistant to brute-force with GPUs.

- SHA-256/512 alone are too fast → easier to brute-force.

💻 **Code Example:**

```ts
import bcrypt from "bcryptjs";

// Hash password
const password = "MyS3cret!";
const hash = await bcrypt.hash(password, 12); // cost factor 12
console.log(hash); // includes salt

// Verify password
const isMatch = await bcrypt.compare("MyS3cret!", hash);
console.log(isMatch); // true
```

---

### ❓ 16. What is the difference between encryption and hashing?

📝 **Answer:**

- **Hashing**:

  - One-way.
  - No key.
  - Used for integrity & password storage.

- **Encryption**:

  - Two-way (reversible).
  - Uses key (symmetric/asymmetric).
  - Used for confidentiality (e.g., storing credit card numbers).

- Don’t encrypt passwords; **hash** them.

💻 **Code Example:**

```ts
import crypto from "crypto";

// Hash
const hash = crypto.createHash("sha256").update("hello").digest("hex");

// Symmetric encryption (AES)
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
let encrypted = cipher.update("secret data", "utf8", "hex");
encrypted += cipher.final("hex");
const tag = cipher.getAuthTag();
```

---

### ❓ 17. What is the purpose of secret rotation?

📝 **Answer:**

- **Secret rotation** = regularly changing secrets (API keys, JWT signing keys, DB passwords).
- Benefits:

  - Limits impact window if secret leaks.
  - Allows you to revoke compromised keys.
  - Often compliance requirement.

- Typically support **multiple active keys** at once during rotation.

💻 **Code Example:**

```ts
// JWT verification with multiple keys (kid header)
const keys = {
  "key-2024-01": process.env.JWT_KEY_1!,
  "key-2024-06": process.env.JWT_KEY_2!, // current
};

function verifyToken(token: string) {
  const decodedHeader = JSON.parse(
    Buffer.from(token.split(".")[0], "base64").toString()
  );
  const key = keys[decodedHeader.kid];
  if (!key) throw new Error("Unknown key id");
  return jwt.verify(token, key);
}
```

---

## Cloud & Secrets Security

### ❓ 18. Why should you never store secrets in environment files (.env) in production?

📝 **Answer:**

- `.env` **is fine on server** if:

  - Not committed to git.
  - Correct file permissions.

- But you should **never**:

  - Check `.env` into repo.
  - Bundle secrets into frontend code (they become public).

- Better in production:

  - Use **secret managers** (AWS Secrets Manager, GCP Secret Manager, Vault).
  - Inject env vars at deploy time, not build time if frontend is public.

💻 **Code Example:**

```bash
# .gitignore
.env
.env.* # ignore all env files
```

```ts
// Backend config
const dbPassword = process.env.DB_PASSWORD; // injected from secret manager, not in repo
```

---

### ❓ 19. What is IAM? How do roles differ from policies?

📝 **Answer:**

- **IAM (Identity and Access Management)**: manage users, roles, and their permissions (AWS IAM, GCP IAM, etc.).
- **Policy**:

  - Document that says “this identity can do X on resource Y”.

- **Role**:

  - Identity with a set of policies attached.
  - App/Service/Person assumes a role → gets its permissions.

- Roles = “who”, Policies = “what they can do”.

💻 **Code Example (AWS policy snippet):**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": ["arn:aws:s3:::my-bucket/*"]
    }
  ]
}
```

---

### ❓ 20. How do you secure API keys in frontend and backend apps?

📝 **Answer:**

- **Backend**:

  - Store in environment variables or secret manager.
  - Never log full keys.
  - Restrict key permissions (least privilege).

- **Frontend**:

  - Any key in client JS is considered **public**.
  - Only put public/limited-scope keys (e.g., public map key scoped to domain).
  - For sensitive keys (payments, DB, 3rd party APIs), call them via your **backend proxy**.

💻 **Code Example:**

```ts
// Backend using env var
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Frontend calls backend instead of Stripe directly
async function createCheckoutSession() {
  const res = await fetch("/api/create-checkout", { method: "POST" });
  const data = await res.json();
  // use sessionId on frontend
}
```

---

## Advanced / Frontend-Focused Security

### ❓ 21. How do you protect routes in a SPA (React/Angular) on frontend vs backend?

📝 **Answer:**

- **Frontend route guarding**:

  - Hide UI, redirect to login if not authenticated.
  - Good for UX, but **not security boundary**.

- **Backend must also enforce**:

  - Check auth & permissions on every API.

- Never trust just route guards; always do server-side checks.

💻 **Code Example (React Route Guard):**

```tsx
// Frontend (just UX)
function PrivateRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = !!localStorage.getItem("accessToken"); // example
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
```

```ts
// Backend still must check token!
app.get("/api/user", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
```

---

### ❓ 22. How do you safely use third-party scripts in your web app?

📝 **Answer:**

- Third-party scripts have full power in your page.
- Risks: XSS, data theft, performance issues.
- Mitigations:

  - Load only from trusted sources.
  - Use **Subresource Integrity (SRI)** for static scripts.
  - Limit what they can access (sandboxed iframe).
  - Use CSP to restrict where they can send data.

💻 **Code Example (SRI):**

```html
<script
  src="https://cdn.example.com/lib.min.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxyDqgNFJwYtUSc8CfpC5iPoeU3kO3L"
  crossorigin="anonymous"
></script>
```

---

### ❓ 23. What is SameSite cookie and how does it help security?

📝 **Answer:**

- **SameSite** controls if cookies are sent on cross-site requests.
- Values:

  - `Strict`: only first-party navigation → best CSRF protection.
  - `Lax`: sent on top-level GET navigations.
  - `None`: allow cross-site, must also use `Secure`.

- Helps reduce **CSRF** because attacker’s site requests often won’t include cookies.

💻 **Code Example:**

```http
Set-Cookie: session=abc123;
  HttpOnly;
  Secure;
  SameSite=Strict;
  Path=/;
```

---

### ❓ 24. How do you handle security for dependencies (npm packages) in frontend projects?

📝 **Answer:**

- Risks: supply-chain attacks, vulnerable versions.
- Practices:

  - Use **lockfiles** (`package-lock.json`, `yarn.lock`).
  - Regularly run `npm audit` / `yarn audit`.
  - Use tools like Dependabot/Snyk.
  - Avoid random small packages for trivial things.
  - Review packages with many downloads / good reputation.

💻 **Code Example:**

```bash
# check vulnerabilities
npm audit

# automatic fixes (carefully review)
npm audit fix
```

---

### ❓ 25. How do you secure file uploads from a frontend app?

📝 **Answer:**

- Frontend:

  - Client-side validation (size, type) for UX, but not trusted.

- Backend (real security):

  - Enforce size limits.
  - Validate MIME type & extension.
  - Store outside web root or on object storage with correct ACL.
  - Scan for malware if necessary.
  - Don’t execute or render user files directly as HTML.

💻 **Code Example (Frontend + basic backend):**

```tsx
// Frontend
function FileUploader() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) alert("File too large");
    // then upload via fetch/FormData
  };
  return <input type="file" onChange={onChange} />;
}
```

```ts
// Backend (Express + multer) – size + type checks
import multer from "multer";

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!["image/png", "image/jpeg"].includes(file.mimetype)) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
});

app.post("/upload", upload.single("file"), (req, res) => {
  // save to safe storage, not /public directly
  res.sendStatus(200);
});
```
