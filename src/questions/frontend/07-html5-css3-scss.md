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

### ❓ 6. How browser paints, composites, and reflows CSS?

📝 **Answer:**

Rough pipeline:

1. **DOM + CSSOM → Render Tree**
2. **Layout (Reflow)**: calculate size & position.
3. **Paint**: fill pixels (colors, borders, text).
4. **Composite**: merge layers (e.g. for transforms, fixed elements).

Expensive:

- **Layout/reflow**: changes to geometry (width, height, font-size).
- **Paint**: changes to colors, shadows, borders.
  Cheaper:
- **Compositor-only**: `transform`, `opacity`.

💻 **Code Example:**

```css
/* Better: uses GPU/compositor, avoids layout changes */
.box {
  will-change: transform, opacity;
  transition: transform 200ms, opacity 200ms;
}

.box:hover {
  transform: translateY(-4px) scale(1.02);
  opacity: 0.9;
}
```

```

```
