### ❓ 1. How browser renders a webpage?

📝 **Answer:**

- Browser downloads HTML:\*\* Starts receiving the document.
- HTML gets parsed:** Browser begins building the **DOM\*\*.
- During parsing, browser finds CSS `<link>`:** Starts downloading CSS **in parallel\*\*, and continues parsing HTML.
- CSSOM starts only _after_ CSS finishes downloading:** CSSOM is built **in parallel with DOM building\*\* (it does _NOT_ wait for DOM to finish).
- During parsing, browser finds JS `<script>`:\*\* Starts downloading JS.
- If JS is not `defer` or `async`: ** DOM creation is **paused**, JS is **executed\*\*, then parsing continues.
- JavaScript can manipulate the DOM only after the DOM parts exist:\*\* (i.e., after those nodes are parsed and created).
- Once DOM + CSSOM are both ready:** Browser builds the **Render Tree\*\* (visible elements + applied styles).
- Layout (Reflow):** Browser computes **size**, **position**, **geometry\*\* of each visible element.
- Paint:** Browser **draws pixels\*\* for text, colors, borders, images, and everything visible.

#### 🎯 **One-line summary**

**HTML → DOM, CSS → CSSOM, JS can block DOM, then DOM+CSSOM → Render Tree → Layout → Paint.**

---

### ❓ 2.**What "semantic" means**

📝 **Answer:**

In HTML, **semantic** means that the tag itself tells you _what the content is_, not just how it looks.

For example:

| Non-semantic | Semantic   | Meaning                  |
| ------------ | ---------- | ------------------------ |
| `<div>`      | `<header>` | A page or section header |
| `<div>`      | `<nav>`    | A navigation menu        |
| `<div>`      | `<main>`   | Main content of the page |
| `<b>`        | `<strong>` | Strong importance        |
| `<i>`        | `<em>`     | Emphasized text          |

---

### ❓ 8.**How do I create a responsive layout where paragraphs inside a div align horizontally on wide screens and vertically on smaller/mobile screens?**

📝 **Answer:**

You can do this easily with **CSS Flexbox + a media query**.

![FlexDirection Image](/src/assets/flex-direction.png)

```html
<div class="container">
  <p>Paragraph One</p>
  <p>Paragraph Two</p>
</div>
```

```css
.container {
  display: flex;
  flex-direction: row; /* Desktop = horizontal */
  gap: 20px; /* Space between paragraphs (optional) */
}

/* Mobile version */
@media (max-width: 768px) {
  .container {
    flex-direction: column; /* Mobile = vertical */
  }
}
```

- `display: flex` makes children align horizontally by default.
- `flex-direction: column` inside a media query overrides layout for smaller screens.

---
