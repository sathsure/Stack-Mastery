### ❓ 1. How does a browser render a webpage?

📝 **Answer**

When a browser receives HTML from a server, it **does not immediately show it on the screen**.
Instead, it follows a strict internal pipeline to understand _what_ to show and _how_ to show it.

#### Step-by-step breakdown:

1. **HTML Parsing**

   - Browser reads HTML from top to bottom
   - Converts it into a tree-like structure called the **DOM (Document Object Model)**

2. **CSS Parsing**

   - CSS files are parsed into another tree called **CSSOM**
   - This determines styles like colors, fonts, layouts

3. **Render Tree Creation**

   - DOM + CSSOM are merged
   - Invisible elements (`display: none`) are ignored

4. **Layout (Reflow)**

   - Browser calculates **exact position and size** of each element
   - Depends on viewport size, fonts, flex/grid rules

5. **Paint**

   - Pixels are drawn (colors, text, borders)

6. **Compositing**

   - Layers are combined and sent to GPU for display

![BrowserRender Image](/src/assets/browser-render.png)

```text
HTML → DOM
CSS → CSSOM
DOM + CSSOM → Render Tree → Layout → Paint → Composite
```

⚠️ **Important Insight:**

- Changing `width`, `height`, `top` → triggers **reflow** (expensive)
- Changing `color`, `background` → triggers **repaint** (cheaper)

---

### ❓ 2. What does “semantic HTML” mean?

📝 **Answer**

Semantic HTML means **using HTML tags that describe the meaning of content**, not just how it looks.

The browser, search engines, and screen readers rely on semantics to understand **structure and intent**.

❌ Non-semantic:

```html
<div class="header"></div>
<div class="nav"></div>
```

✅ Semantic:

```html
<header></header>
<nav></nav>
```

Common semantic elements:

| Tag         | Meaning             |
| ----------- | ------------------- |
| `<header>`  | Intro or header     |
| `<nav>`     | Navigation links    |
| `<main>`    | Primary content     |
| `<section>` | Grouped topic       |
| `<article>` | Independent content |
| `<aside>`   | Side content        |
| `<footer>`  | Footer info         |

![Semantic Image](/src/assets/semantic.png)

🧠 **Why semantics matter:**

- Screen readers announce landmarks
- SEO crawlers rank content better
- Developers understand structure faster

📌 **Rule of thumb:**
If an element has _meaning_, don’t use `<div>`.

---

### ❓ 3. How do you create a responsive layout where paragraphs align horizontally on desktop and vertically on mobile?

📝 **Answer**

This is solved using **Flexbox**, which is designed for **1D layouts**.

Flexbox allows elements to change direction based on screen size.

```html
<div class="container">
  <p>One</p>
  <p>Two</p>
  <p>Three</p>
</div>
```

```css
.container {
  display: flex;
  gap: 16px;
}
```

- Default `flex-direction` is `row`
- Paragraphs align horizontally on large screens

```css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

- On small screens, direction switches to vertical

![Media Image](/src/assets/media.png)

🎯 **Key Understanding:**

- Flexbox responds to **container size**
- Media queries adapt layout to **device width**

---

### ❓ 4. Difference between `<div>` and `<span>`?

📝 **Answer**

Both are **non-semantic** elements, but they differ in **display behavior**.

| Feature      | `<div>`     | `<span>`            |
| ------------ | ----------- | ------------------- |
| Display      | Block-level | Inline              |
| New line     | Yes         | No                  |
| Width/Height | Allowed     | Not effective       |
| Usage        | Layout      | Inline text styling |

```html
<div>This starts on a new line</div>
<span>This stays inline</span>
```

📌 Use `<div>` for structure, `<span>` for inline tweaks.

---

### ❓ 5. Difference between `id` and `class`?

📝 **Answer**

They are identifiers, but serve **very different purposes**.

| Feature      | id    | class             |
| ------------ | ----- | ----------------- |
| Unique       | Yes   | No                |
| Reusable     | ❌    | ✅                |
| CSS Selector | `#id` | `.class`          |
| JS Access    | Fast  | Multiple elements |

```html
<div id="main"></div>
<div class="card"></div>
<div class="card"></div>
```

---

### ❓ 6. What are `data-*` attributes?

📝 **Answer**

`data-*` attributes let you attach **custom data** to HTML elements without affecting layout or semantics.

```html
<button data-user-id="42">Click</button>
```

```js
button.dataset.userId; // "42"
```

🧠 **Why they exist:**

- Clean separation of HTML & JS
- Avoid hidden inputs or global variables

📌 Use cases:

- User IDs
- Feature flags
- State markers

---

### ❓ 7. Difference between `<strong>` and `<b>`?

📝 **Answer**

Although both appear bold, their **meaning is different**.

| Tag        | Purpose              |
| ---------- | -------------------- |
| `<b>`      | Visual styling only  |
| `<strong>` | Indicates importance |

```html
<strong>Warning!</strong> <b>Bold text</b>
```

🎧 Screen readers **emphasize `<strong>`**, not `<b>`.

---

### ❓ 8. What is accessibility (a11y) in HTML?

📝 **Answer**

Accessibility ensures websites are usable by:

- Screen reader users
- Keyboard-only users
- Visually impaired users

Key HTML practices:

- Semantic tags
- Proper labels
- Logical heading order

```html
<label for="email">Email</label> <input id="email" />
```

📌 Accessibility is **not optional** — it’s a legal requirement in many countries.

---

### ❓ 9. What are ARIA attributes?

📝 **Answer**

ARIA adds **extra meaning** when HTML alone isn’t enough.

```html
<button aria-label="Close dialog">X</button>
```

⚠️ **Golden Rule:**
**Semantic HTML first, ARIA second.**

Misusing ARIA can make accessibility worse.

---

### ❓ 10. Difference between `<script>`, `async`, and `defer`?

📝 **Answer**

```html
<script src="a.js"></script>
<script async src="b.js"></script>
<script defer src="c.js"></script>
```

| Type   | HTML Parsing | Execution  |
| ------ | ------------ | ---------- |
| Normal | Blocks       | Immediate  |
| async  | Continues    | When ready |
| defer  | Continues    | After DOM  |

![AsyncDefer Image](/src/assets/async-defer.png)

🎯 Use `defer` for scripts that depend on DOM elements.

---

### ❓ 11. How does HTML handle parsing errors?

📝 **Answer**

HTML is **forgiving by design**.

```html
<p>Hello</p>
<div>World</div>
```

Browser auto-closes `<p>` to avoid breaking the page.

🧠 This ensures:

- Backward compatibility
- Resilience across devices

---

### ❓ 12. Difference between DOM and Virtual DOM?

📝 **Answer**

| DOM             | Virtual DOM     |
| --------------- | --------------- |
| Browser-managed | JS-managed      |
| Direct updates  | Batched updates |
| Slower          | Faster          |

🧠 Virtual DOM minimizes costly DOM operations.

---

### ❓ 13. What are Web Components?

📝 **Answer**

Web Components allow you to create **custom HTML elements** with isolated styles and behavior.

```js
customElements.define("my-card", class extends HTMLElement {});
```

```html
<my-card></my-card>
```

Benefits:

- Native (no framework)
- Encapsulation
- Reusability

---

### ❓ 14. How does HTML structure impact SEO?

📝 **Answer**

Search engines analyze **HTML structure**, not visuals.

Best practices:

- One `<h1>`
- Proper heading hierarchy
- Semantic tags

```html
<h1>Main Topic</h1>
<h2>Sub Topic</h2>
```

Poor structure = poor ranking.

---

Below is a **clean, interview-focused `.md section`** containing **ONLY Trick Questions and Mock Interview Questions with detailed answers**.

No theory recap, no basics — this is exactly what interviewers use to **test real understanding and catch shallow knowledge**.

You can append this directly to your existing Markdown file.

---

### ❓ 15. Is `<section>` always better than `<div>`?

📝 **Answer**

❌ **No.**

`<section>` should be used **only when the content has a thematic meaning and usually a heading**.

- `<section>` creates a **document outline**
- `<div>` is purely for grouping or styling

```html
<section>
  <h2>Pricing</h2>
</section>
```

```html
<div class="wrapper"></div>
```

✅ **Rule:**
If removing the element removes meaning → use semantic
If it’s only for layout → use `<div>`

---

### ❓ 16. Can a webpage have multiple `<h1>` tags?

📝 **Answer**

✅ **Yes (HTML5 allows it)**
❌ **But it’s not recommended for SEO**

- Search engines expect **one primary topic**
- Multiple `<h1>` tags can confuse ranking

```html
<h1>Main Article</h1>
<h2>Subsection</h2>
```

📌 **Best practice:** One `<h1>` per page

---

### ❓ 17. Is ARIA better than semantic HTML?

📝 **Answer**

❌ **No. ARIA is a fallback, not a replacement.**

- Native HTML is always preferred
- ARIA overrides default semantics

```html
<button>Submit</button>
<!-- Better -->
```

```html
<div role="button">Submit</div>
<!-- Worse -->
```

⚠️ **Golden rule:**

> _“Use ARIA only when HTML can’t do the job.”_

---

### ❓ 18. Does HTML support multithreading?

📝 **Answer**

❌ **No.**

- HTML parsing is **single-threaded**
- Script execution blocks parsing (unless `defer/async`)
- Rendering pipeline depends on ordered execution

🧠 **Why it matters:**
Blocking scripts = slow page load

---

### ❓ 19. Why does broken HTML still work?

📝 **Answer**

Because HTML is **fault-tolerant by design**.

```html
<p>Hello</p>
<div>World</div>
```

Browser auto-corrects:

- Closes `<p>`
- Maintains valid DOM structure

🎯 This ensures backward compatibility on the web.

---

### ❓ 20. Does `<b>` and `<strong>` behave the same?

📝 **Answer**

❌ **No, they look similar but mean different things.**

- `<b>` → visual styling
- `<strong>` → semantic importance

Screen readers emphasize `<strong>`.

---

### ❓ 21. Does `display: none` remove an element from the DOM?

📝 **Answer**

❌ **No.**

- Element stays in the DOM
- Removed from layout and accessibility tree
- JavaScript can still access it

```css
display: none;
```

---

### ❓ 22. Can CSS affect DOM structure?

📝 **Answer**

❌ **No.**

CSS:

- Affects layout & appearance
- Cannot add/remove DOM nodes

Only JavaScript can modify DOM structure.

---

### ❓ 23. Your page loads slowly even though HTML is small. What do you check?

📝 **Answer**

- Blocking `<script>` tags
- Missing `defer`
- Excessive DOM nesting
- Reflow-heavy layouts
- Large images without lazy loading

---

### ❓ 24. Screen reader users report incorrect reading order.

📝 **Answer**

- Check semantic tags
- Heading hierarchy (`h1 → h2 → h3`)
- ARIA misuse
- Hidden content with `display:none`

---

### ❓ 25. Mobile layout breaks but desktop works fine.

📝 **Answer**

- Missing viewport meta tag
- Fixed widths
- Flexbox direction issues
- Overflow caused by large elements

---

### ❓ 26. Buttons are not keyboard-accessible.

📝 **Answer**

- Using `<div>` instead of `<button>`
- Missing `tabindex`
- Incorrect ARIA roles
- Focus styles removed

---

### ❓ 27. SEO ranking drops after redesign.

📝 **Answer**

- Lost semantic structure
- Multiple `<h1>`
- Removed `<main>`
- Content wrapped in non-semantic `<div>`s
- Hidden text abuse

---

### ❓ 28. Click handlers stop working after DOM updates.

📝 **Answer**

- DOM replaced dynamically
- Event listeners lost
- Need event delegation

---
