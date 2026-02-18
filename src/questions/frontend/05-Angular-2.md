## Change Detection & Zones

### ❓ How does Angular’s change detection mechanism work, and how did it evolve from AngularJS?

### 📝 Answer

**Current flow (Default Strategy):**

- zone.js observes async tasks (DOM Events, Timers, Promises, HTTP Calls, WebSocket)
  - 📝 Angular Does NOT Track the below changes
    1. Array push - `this.items.push('C');`
    2. Variable mutation - `this.count++;`
    3. Object property change - `this.user.name = 'David';`
    4. Spread operator - `this.items = [...this.items, 'C'];`
  - 📝 Synchronous Code are triggerd
    1. Inside an Event - `<button (click)="add()">Add</button>`
    2. Angular lifecycle
    3. > ❗ Spread only helps with `OnPush` detecting reference change. It does NOT trigger detection.

- zone.js notifies NgZone. It tells Angular _Something happened. Run change detection._
- Angular triggers change detection. Begins from the root component and traverses entire component tree.
- Angular then updates only changed bindings.
- Updates DOM

**With Signals:**

- Signals reduce the need for full tree traversal.
- Instead of Traversing the Component Tree
  - Angular Registers these Signals and builds a Signal Graph
  - Tracks where this signal is used (template / computed / effect)
- Updates ONLY those signal and its dependent nodes

---

## Angular Build System

### ❓ Explain Angular Building Tools?

### 📝 Answer

1️⃣ Big Picture (one-line)

**Bundler** + **Dev Server** + **Compiler** + **Change Detection** + **Reload strategy** together define how your app is built, served, updated, and rendered during development and production.

2️⃣ Bundlers & Dev Servers

🔹 Webpack

1. **Webpack Bundler** - Takes your JS/TS/CSS/assets and Bundles them into optimized files

2. **Webpack Dev Server** - Runs a local server (Reloads or updates browser)

> 📌 Used heavily by Angular (pre-v17)

🔹 Vite

1. **Vite Dev Server** - Uses native ES modules and Starts instantly (no full bundle on startup)

2. **Vite Bundler** - Vite uses **esbuild** for fast transformations and dependency pre-bundling during development, and uses **Rollup** internally for production builds.

> **esbuild** (primary) + **Rollup** (final optimizations)
> 📌 Used by Angular v17+

```sql
Angular 8  → View Engine + Webpack
Angular 9  → Ivy + Webpack
Angular 16 → Ivy + esbuild (partial)
Angular 17+→ Ivy + Vite + esbuild
Angular 19 → Ivy + Vite + esbuild + Rollup
```

3️⃣ Angular Rendering Engines (Compilers)

🔹 View Engine (OLD ❌) - Used before Angular 9
🔹 Ivy Compiler (CURRENT ✅) - Used Angular 9 → present

🔹 JIT (Just-In-Time) - Compilation happens in browser
🔹 AOT (Ahead-Of-Time) - Compilation happens during build

4️⃣ Comparison: View Engine vs Ivy

| Feature         | View Engine | Ivy          |
| --------------- | ----------- | ------------ |
| AOT             | ✅          | ✅           |
| JIT             | ✅          | ✅           |
| Tree-shaking    | ❌ Poor     | ✅ Excellent |
| Build speed     | ❌ Slower   | ✅ Faster    |
| Bundle size     | ❌ Larger   | ✅ Smaller   |
| Debugging       | ❌ Hard     | ✅ Easier    |
| Future features | ❌ No       | ✅ Yes       |

5️⃣ Hot Module Replacement (HMR)

🔹 What is HMR?

- Update code without full page reload
- Keeps app state (forms, data)

🔹 Who supports it?

| Tool               | HMR               |
| ------------------ | ----------------- |
| Webpack Dev Server | Yes               |
| Vite Dev Server    | Yes (much faster) |

🔹 What happens when you change a file?

- Webpack
  - Webpack rebuilds the dependency graph
  - A new bundle or chunk is created
  - Webpack Dev Server pushes updates via WebSocket
  - Browser replaces the affected module

- Vite
  - File is already an ES module
  - Vite sends only that module
  - Browser updates without rebundling

6️⃣ How Everything Connects (Simple Flow)

🧠 Old Angular Setup (Before v17)

```arduino
Code → Ivy Compiler
     → Webpack Bundler
     → Webpack Dev Server
     → Browser
```

🚀 Modern Angular Setup (v17+)

```arduino
Code → Ivy Compiler
     → Vite Dev Server (dev)
     → Rollup (prod bundling)
     → Browser
```

7️⃣ How Compiler and Bundler work together?

- Ivy compiler runs first
- Ivy converts this into:
  ✔ Templates compiled
  ✔ Decorators removed
  ✔ Angular instructions generated
  ➡️ Output is pure JavaScript
- esbuild runs next
- esbuild now:
  ✔ Bundles this JS with other JS and TS.
  ✔ Removes unused code
  ✔ Splits chunks
  ✔ Optimizes imports
  ➡️ Produces final JS files for browser

> 📌 Ivy understands Angular and templates
> 📌 HTML disappears after Ivy runs
> 📌 esbuild does not understand Angular decorators

🤔❓ Webpack vs Vite
Vite is faster because it doesn’t bundle everything upfront.

🤔❓ Ivy vs View Engine
Ivy is faster, smaller, and more flexible.

🤔❓ AOT vs JIT
AOT for production, JIT for development.

🤔❓ Dirty checking
Angular checks bindings on every change detection cycle.

🤔❓ HMR
Updates modules without reloading the page.

---

## Unit Testing

### ❓ Difference between Jasmine and Jest?

### 📝 Answer

**Jasmine** → Test framework (how you write tests)
**Karma** → Test runner (where & how tests run)
**Jest** → All-in-one testing tool (framework + runner)

> 👉 Jasmine + Karma = what Jest already gives you

---

### ❓ What is a spy in unit testing?

### 📝 Answer

A spy tracks calls to functions, arguments, and return values without executing the real implementation.

```ts
spyOn(service, "getData").and.returnValue(of([]));
```

- `spyOn()` – Spy on existing method
- `createSpy()` – Standalone spy
- `createSpyObj()` – Mock object with multiple methods

### ❓ Can we test private methods in Angular?

### 📝 Answer

Private methods should be tested indirectly through public methods.

```ts
(component as any).privateMethod();
```

- **TypeScript** private is **Compile-Time Only**
- **JavaScript** has **no private keyword**. The method still exists on the object

### ❓ What is Cypress?

### 📝 Answer

Cypress is an end-to-end testing framework that:

- Runs tests in a real browser
- Simulates real user behavior
- Is faster and more reliable than Protractor

---

### ❓How to Preserve form data on refresh but clear on browser close?

### 📝 Answer

Use:

### 👉 `sessionStorage`

```ts
sessionStorage.setItem("formData", JSON.stringify(this.form.value));
```

On init:

```ts
this.form.patchValue(JSON.parse(sessionStorage.getItem("formData")));
```

SessionStorage:

- Survives refresh
- Cleared on tab/browser close

---

### ❓How to Preserve form data on refresh based on Role?

### 📝 Answer

Steps:

1. On refresh → Check role from JWT
2. If role === "developer"
   - Restore from sessionStorage

3. Else
   - Clear sessionStorage

```ts
if (user.role === "developer") {
  restore();
} else {
  sessionStorage.removeItem("formData");
}
```

---

### ❓ How to Hide backend endpoints in Network tab?

### 📝 Answer

🚫 Impossible.

Browser MUST know endpoint to call it.

But you can hide microservices behind:

👉 API Gateway

Instead of:

```
/user-service/users
/order-service/orders
```

Expose:

```
/api/users
/api/orders
```

Angular only calls gateway.

---

### ❓ Can we jump Angular 5 → Angular 19 directly?

### 📝 Answer

🚫 Not recommended.

Too many breaking changes.

Official way:

Upgrade step-by-step:

5 → 6 → 7 → 8 → ... → 19

Use:

```bash
ng update
```

---

### ❓ Name some Deprecated concepts Angular 5 → 19

### 📝 Answer

Major changes:

- ViewEngine → Ivy
- Http → HttpClient (deprecated old module)
- Renderer → Renderer2
- EntryComponents removed
- RxJS version changes
- Module-based apps → Standalone Components
- Webpack → Vite (latest versions)
- TSLint → ESLint
- Angular CLI changes
- Strict mode enabled
- Differential loading removed

Biggest impact:

- RxJS pipeable operators
- Lazy loading syntax changes
- Zone optimizations
- Signals (Angular 16+)
