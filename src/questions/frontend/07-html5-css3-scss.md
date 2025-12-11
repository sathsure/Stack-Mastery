### ❓ 1. Explain flexbox and CSS Grid?

📝 **Answer:**

- **Flexbox**: 1D layout (row _or_ column). Great for navbars, aligning items.
- **Grid**: 2D layout (rows _and_ columns). Great for full-page or complex layouts.

💻 **Code Example:**

```css
/* Flexbox */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 1rem;
}
```

---

### ❓ 2. Difference between em, rem, vh, vw?

📝 **Answer:**

- `em`: relative to **font-size of the element’s parent**.
- `rem`: relative to **root (`html`) font-size**.
- `vh`: % of **viewport height** (1vh = 1% of height).
- `vw`: % of **viewport width** (1vw = 1% of width).

💻 **Code Example:**

```css
html {
  font-size: 16px;
}

.parent {
  font-size: 20px;
}

.child-em {
  font-size: 1.5em;
} /* 30px (1.5 * 20) */
.child-rem {
  font-size: 1.5rem;
} /* 24px (1.5 * 16) */

.full-height {
  height: 100vh;
}
.half-width {
  width: 50vw;
}
```

---

### ❓ 3. How does CSS specificity work?

📝 **Answer:**

Specificity weight (low → high):

1. Type/element selectors (`div`, `p`)
2. Class, pseudo-class, attribute (`.btn`, `:hover`, `[type="text"]`)
3. ID selectors (`#header`)
4. Inline styles (`style=""`)
5. `!important` overrides normal specificity (but should be avoided).

💻 **Code Example:**

```css
/* Specificity: 0-0-1 */
p {
  color: black;
}

/* Specificity: 0-1-0 */
.text {
  color: blue;
}

/* Specificity: 1-0-0 */
#main {
  color: red;
}

/* Result: #main wins on the same element */
```

---

### ❓ 4. Critical rendering path optimization?

📝 **Answer:**

Goal: **render above-the-fold content fast** by reducing/blocking resources.

Key points:

- Minify/concat CSS & JS.
- Move **render-blocking JS** to `defer`/`async`.
- Inline **critical CSS** for above-the-fold.
- Lazy-load non-critical resources (images, JS chunks).

💻 **Code Example:**

```html
<!-- Critical CSS inlined -->
<style>
  /* minimal styles for first paint */
  body {
    font-family: system-ui;
    margin: 0;
  }
  header {
    padding: 1rem;
  }
</style>

<!-- Non-critical CSS -->
<link
  rel="stylesheet"
  href="styles.css"
  media="print"
  onload="this.media='all'"
/>

<!-- Non-blocking JS -->
<script src="app.js" defer></script>
```

---

### ❓ 5. CSS BEM, utility-based architecture?

📝 **Answer:**

- **BEM** (Block–Element–Modifier): naming convention for reusable components.

  - `block__element--modifier`

- **Utility-based**: small single-purpose classes (e.g. Tailwind) for quick composition.

💻 **Code Example:**

```css
/* BEM */
.card {
  /* block */
}
.card__title {
  /* element */
}
.card__title--highlight {
  /* modifier */
}

/* Utility-based */
.mt-4 {
  margin-top: 1rem;
}
.text-center {
  text-align: center;
}
.bg-primary {
  background: #0d6efd;
}
```

```html
<!-- BEM -->
<article class="card">
  <h2 class="card__title card__title--highlight">Title</h2>
</article>

<!-- Utility -->
<h2 class="mt-4 text-center bg-primary">Title</h2>
```

---

### ❓ 6. How browser renders a webpage?

📝 **Answer:**

**1. Browser downloads HTML:** Starts receiving the document.

**2. HTML gets parsed:** Browser begins building the **DOM**.

**3. During parsing, browser finds CSS `<link>`:** Starts downloading CSS **in parallel**, and continues parsing HTML.

**4. CSSOM starts only _after_ CSS finishes downloading:** CSSOM is built **in parallel with DOM building** (it does _NOT_ wait for DOM to finish).

**5. During parsing, browser finds JS `<script>`:** Starts downloading JS.

**6. If JS is not `defer` or `async`: ** DOM creation is **paused**, JS is **executed**, then parsing continues.

**7. JavaScript can manipulate the DOM only after the DOM parts exist:** (i.e., after those nodes are parsed and created).

**8. Once DOM + CSSOM are both ready:** Browser builds the **Render Tree** (visible elements + applied styles).

**9. Layout (Reflow):** Browser computes **size**, **position**, **geometry** of each visible element.

**10. Paint:** Browser **draws pixels** for text, colors, borders, images, and everything visible.

---

# 🎯 **One-line summary**

**HTML → DOM, CSS → CSSOM, JS can block DOM, then DOM+CSSOM → Render Tree → Layout → Paint.**

### ❓ 7.**What "semantic" means**

In HTML, **semantic** means that the tag itself tells you *what the content is*, not just how it looks.

For example:

| Non-semantic | Semantic   | Meaning                  |
| ------------ | ---------- | ------------------------ |
| `<div>`      | `<header>` | A page or section header |
| `<div>`      | `<nav>`    | A navigation menu        |
| `<div>`      | `<main>`   | Main content of the page |
| `<b>`        | `<strong>` | Strong importance        |
| `<i>`        | `<em>`     | Emphasized text          |

### ❓ 8.**How do I create a responsive layout where paragraphs inside a div align horizontally on wide screens and vertically on smaller/mobile screens?**

You can do this easily with **CSS Flexbox + a media query**.

![Image](https://blog.logrocket.com/wp-content/uploads/2023/01/flex-direction-aligning-rows-columns.png?utm_source=chatgpt.com)

---

```html
<div class="container">
  <p>Paragraph One</p>
  <p>Paragraph Two</p>
</div>
```

```css
.container {
  display: flex;
  flex-direction: row;   /* Desktop = horizontal */
  gap: 20px;             /* Space between paragraphs (optional) */
}

/* Mobile version */
@media (max-width: 768px) {
  .container {
    flex-direction: column;  /* Mobile = vertical */
  }
}
```
---

* `display: flex` makes children align horizontally by default.
* `flex-direction: column` inside a media query overrides layout for smaller screens.

---

