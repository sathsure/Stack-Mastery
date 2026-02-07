### ❓ What is CSS?

### 📝 Answer

CSS (Cascading Style Sheets) describes **how elements should look** — colors, spacing, layout, and positioning.

HTML defines _structure_, CSS defines _presentation_.
CSS is declarative: you describe **rules**, and the browser decides **how to apply them**.

---

### ❓ How does the browser decide which styles to apply?

### 📝 Answer

CSS follows a **cascade**:

```
Browser default
↓
External CSS
↓
Internal CSS
↓
Inline styles
↓
!important
```

The browser follows this order **step by step**:

1. **Specificity** (stronger selector wins)
2. **Source order** (later wins if specificity is equal)
3. **`!important`** (overrides normal rules)

```html
<p id="text" class="highlight">Hello CSS</p>
```

```css
/* Element selector */
p {
  color: blue;
}

/* Class selector */
.highlight {
  color: green;
}

/* ID selector */
#text {
  color: orange;
}

/* Same specificity, later rule */
#text {
  color: purple;
}
```

**Final Output**

**Text color: purple**

---

### ❓ How do inline, internal, and external styles differ?

### 📝 Answer

```html
<!-- Inline -->
<div style="color:red"></div>

<!-- Internal -->
<style>
  div {
    color: blue;
  }
</style>

<!-- External -->
<link rel="stylesheet" href="styles.css" />
```

- Inline styles apply directly to the element
- Internal styles live in `<style>` tags
- External styles live in `.css` files
- External styles are preferred because they scale and are easier to maintain.

---

### ❓ What are CSS selectors, and how do they determine which elements styles are applied to?

### 📝 Answer

Selectors define **which elements** a style rule applies to.

```css
p {
  color: black;
}
```

CSS first selects elements, then applies rules.
Most CSS issues start with **wrong or overly complex selectors**.

---

### ❓ What different types of CSS selectors are available, and when would you use each?

### 📝 Answer

```css
/* Element */
p {
}

/* Class */
.card {
}

/* ID */
#header {
}

/* Attribute */
input[type="text"] {
}

/* Group */
h1,
h2 {
}
```

- Classes are reusable
- IDs are unique
- Attribute selectors are powerful but slower if overused

---

### ❓ How do descendant selectors differ from child selectors, and how does nesting affect selector behavior?

### 📝 Answer

```css
/* Descendant */
.card p {
}

/* Direct child */
.card > p {
}
```

![Descendants Image](/src/assets/css-descendants.png)

Descendant selectors match deeply nested elements.
Overusing them makes CSS fragile and hard to remove later.

1. Descendant Selector (space)

```css
.parent .child {
  color: red;
}
```

```html
<div class="parent">
  <div>
    <p class="child">Hello</p>
  </div>
</div>
```

Selects **any matching element inside**, at **any depth**.

- Very flexible
- Easy to overuse
- Can accidentally affect deeply nested elements

2. Child Selector (`>`)

```css
.parent > .child {
  color: blue;
}
```

```html
<div class="parent">
  <p class="child">Hello</p>
</div>
```

Selects **only direct children**, not grandchildren.

- More predictable
- Safer for large codebases
- Breaks if DOM structure changes

```
.parent .child     → any level deep ✅
.parent > .child   → direct child only ✅
```

3. Element Selector

```css
p {
  color: black;
}
```

Selects all `<p>` elements.

4. Class Selector

```css
.card {
  border: 1px solid;
}
```

Selects all elements with class `card`.

5. ID Selector

```css
#header {
  height: 60px;
}
```

Selects the element with id `header`.

6. Group Selector

```css
h1,
h2,
h3 {
  font-weight: bold;
}
```

Applies the same styles to multiple selectors.

7. Attribute Selector

```css
input[type="text"] {
  border-color: blue;
}
```

Selects elements based on attributes.

8. Pseudo-class Selector (state-based)

```css
button:hover {
  background: red;
}
```

Applies styles based on **state or position**.

✅ Other common ones

```css
:first-child
:last-child
:nth-child(2)
:focus
:checked
```

9. Pseudo-element Selector (virtual elements)

```css
p::before {
  content: "→ ";
}
```

Represents **parts of an element**, not real DOM nodes.

✅ Common ones

```css
::before
::after
::first-line
::first-letter
```

![PseudoElements Image](/src/assets/pseudo-elements.png)

10. Universal Selector

```css
* {
  box-sizing: border-box;
}
```

Selects **all elements**.
Use sparingly.

11. Adjacent Sibling Selector (`+`)

```css
h1 + p {
  color: red;
}
```

Selects the **first sibling immediately after** the element.

12. General Sibling Selector (`~`)

```css
h1 ~ p {
  color: blue;
}
```

Selects **all siblings after** the element.

✅ Selector Strength (Mental Order)

```
Element < Class / Attribute < ID < Inline < !important
```

---

### ❓ What is CSS specificity, and how does it influence which style rule is applied?

### 📝 Answer

Specificity is the rule the browser uses to decide which CSS rule wins when multiple rules target the same element.

It is not random, not based only on order, and not about how long a selector is.
It is a priority system.

**The Specificity Levels (From weakest → strongest)**

| Selectors                                  | Example                         |
| ------------------------------------------ | ------------------------------- |
| Element selectors                          | div, p, span                    |
| Class / attribute / pseudo-class selectors | .card, [type="text"], :hover    |
| ID selectors                               | #header                         |
| Inline styles                              | <div style="color:red">         |
| !important                                 | Absolute override (last resort) |

**The Scoring Mental Model (Very Important)**

Specificity can be imagined as a 4-part score:

( inline , ID , class , element )

💡Examples

p → (0,0,0,1)
.card → (0,0,1,0)
#app → (0,1,0,0)
#app .card p → (0,1,1,1)

The browser compares from left to right.
The first higher value wins.

**Example 3 — Combined Selector vs Single ID**

```css
#app {
  color: green;
}

#app .card p {
  color: red;
}
```

```html
<div id="app">
  <div class="card">
    <p>Hello</p>
  </div>
</div>
```

✅ Specificity

```
#app            → (0,1,0,0)
#app .card p    → (0,1,1,1)
```

**Output**

**Text color: red**

Both rules have one ID, but the second rule adds class and element selectors, making it more specific.

---

### ❓ Why `!important` is risky?

### 📝 Answer

```css
p {
  color: red !important;
}
```

`!important` breaks the natural cascade.
Once used, future overrides become harder and force more `!important`.

---

### ❓ How does the CSS box model work, and how does it affect element sizing and layout?

### 📝 Answer

![BoxModel Image](/src/assets/box-model.png)

Every element is a rectangle made of content, padding, border, and margin.
Misunderstanding this causes layout bugs.

---

### ❓ What is the difference between `content-box` and `border-box`?

`content-box` and `border-box` define **how the browser calculates an element’s width and height**.

- **`content-box`** → width/height apply to **content only**
- **`border-box`** → width/height include **content + padding + border**

👉 `box-sizing: content-box` (Default)

The browser treats width as **content-only**.
This often causes layouts to grow larger than expected.

👉 `box-sizing: border-box`

The browser adjusts content size so the **overall element size stays fixed**.
This makes layouts predictable and easier to reason about.

👉 Side-by-Side Summary

| Property               | content-box | border-box       |
| ---------------------- | ----------- | ---------------- |
| Default behavior       | ✅ Yes      | ❌ No            |
| Width includes padding | ❌ No       | ✅ Yes           |
| Width includes border  | ❌ No       | ✅ Yes           |
| Easy layout math       | ❌ No       | ✅ Yes           |
| Preferred in real apps | ❌ Rarely   | ✅ Almost always |

1️⃣ ❓ does adding padding break my layout?

Because you are using `content-box`, and padding increases the total size.

2️⃣ ❓ doesn’t width change when I add padding?

Because you are using `border-box`, and padding is absorbed inside.

💡 One-Line Mental Model

> **`content-box`: width means content only
> `border-box`: width means the whole box**

![BorderContent Image](/src/assets/border-content.png)

### ❓ What are the different CSS display types, and how do they impact layout and element behavior?

### 📝 Answer

| Display      | Width | Height | Line Break |
| ------------ | ----- | ------ | ---------- |
| block        | ✔     | ✔      | ✔          |
| inline       | ✖     | ✖      | ✖          |
| inline-block | ✔     | ✔      | ✖          |
| none         | ✖     | ✖      | removed    |

Inline elements ignore width and height.
Many alignment issues come from using the wrong display type.

![DisplayType Image](/src/assets/display-type.png)

---

### ❓ What CSS position types are available, and how does each one affect document flow and positioning?

### 📝 Answer

```css
static
relative
absolute
fixed
sticky
```

![Positioning Image](/src/assets/positioning.jpg)

1️⃣ position: static

- Default positioning
- Element follows normal document flow
- top / left / right / bottom do nothing

2️⃣ position: relative

- Element stays in normal flow
- Can be offset visually using top/left
- Creates positioning context for absolute children

3️⃣ position: absolute

- Removed from document flow
- Positioned relative to nearest positioned ancestor
- Parent height does not include it

4️⃣ position: fixed

- Removed from flow
- Positioned relative to viewport
- Does not move during scroll

5️⃣ position: sticky

- Hybrid of relative + fixed
- Scrolls normally, then sticks at a threshold
- Fails if parent has overflow: hidden/auto

💡 Diagram

```
relative parent
 └── absolute child
```

Absolute elements position relative to the nearest positioned ancestor.
Sticky needs scroll context and fails with overflow clipping.

---

### ❓ Where height and width apply?

### 📝 Answer

| Element        | Width | Height |
| -------------- | ----- | ------ |
| block          | ✔     | ✔      |
| inline         | ✖     | ✖      |
| flex/grid item | ✔     | ✔      |

Inline elements flow with text and ignore dimensions.
Use `inline-block`, flex, or grid for sizing.

---

### ❓ Why `height: 100%` fails?

### 📝 Answer

Percentage heights work only if the parent has an explicit height.
Without it, the browser cannot calculate the value.

---

### ❓ How do different CSS units differ from each other, and how does the browser interpret them?

### 📝 Answer

Below is a **clean, beginner-to-clear explanation** of **CSS units**, expanding your table with **what each unit really means, when to use it, and common traps**, plus **one visual image** to lock the concepts in.

| Unit  | Based On         | What It Really Means          |
| ----- | ---------------- | ----------------------------- |
| `px`  | Fixed            | Absolute size, does not scale |
| `em`  | Parent font-size | Relative to parent text       |
| `rem` | Root font-size   | Relative to `<html>`          |
| `vw`  | Viewport width   | Percentage of screen width    |
| `vh`  | Viewport height  | Percentage of screen height   |

![Units Image](/src/assets/units.png)

**px — Fixed Unit**

```css
.box {
  width: 200px;
}
```

`px` is a fixed unit.
It does **not scale** with screen size or user font settings.

✔ Good for:

- Borders
- Small precise spacing

❌ Not good for:

- Responsive layouts
- Accessibility-friendly text

**em — Relative to Parent**

```css
.parent {
  font-size: 20px;
}

.child {
  font-size: 2em; /* 40px */
}
```

`em` depends on the **parent’s font size**.
This can compound when elements are nested.

⚠️ Common trap:

```css
.child {
  padding: 2em;
}
```

Padding grows as font size grows.

**rem — Relative to Root (`<html>`)**

```css
html {
  font-size: 16px;
}

.box {
  font-size: 1.5rem; /* 24px */
}
```

`rem` always refers to the root font size.
This makes layouts **predictable and scalable**.

✔ Best for:

- Typography
- Spacing systems
- Scalable layouts

**vw — Viewport Width**

```css
.hero {
  width: 50vw;
}
```

`1vw` = 1% of browser width.
Elements resize automatically when the screen width changes.

✔ Useful for:

- Full-width layouts
- Fluid typography (with clamp)

**vh — Viewport Height**

```css
.section {
  height: 100vh;
}
```

`1vh` = 1% of viewport height.
Commonly used for full-screen sections.

⚠️ Mobile issue:

- Browser address bars change viewport height
- Can cause layout jumps

✔ Better alternative:

```css
min-height: 100svh;
```

💡 Practical Rule of Thumb (Very Important)

| Use Case             | Best Unit  |
| -------------------- | ---------- |
| Text                 | `rem`      |
| Layout spacing       | `rem`      |
| Borders              | `px`       |
| Full screen sections | `vh / svh` |
| Responsive widths    | `% / vw`   |

1️⃣ ❓ does `em` behave unexpectedly?

Because it compounds with nesting.

2️⃣ ❓ is `rem` preferred?

Because it scales from a **single reference point**.

---

### ❓ Why `100vh` is tricky?

### 📝 Answer

Mobile browsers resize the viewport dynamically.
This causes layout jumps when using fixed viewport heights.

✔ Better:

```css
min-height: 100svh;
```

---

### ❓ What problem does Flexbox solve, and how does it manage alignment and space distribution?

### 📝 Answer

```
Main Axis  → →
Cross Axis ↓ ↓
```

![Flexbox Image](/src/assets/flexbox.png)

**Flexbox is a layout system designed to distribute space and align items along one direction at a time.**

That direction can be:

- **horizontal (row)** or
- **vertical (column)**

The browser’s job in Flexbox is:

> _“Given available space, how should items grow, shrink, and align?”_

**Flexbox Has Two Roles**

#### 1️⃣ Flex Container

The parent that controls layout behavior.

```css
.container {
  display: flex;
}
```

#### 2️⃣ Flex Items

The direct children that are arranged.
Only **direct children** participate in Flexbox.

```
flex-direction: row
→ main axis (horizontal)
↓ cross axis (vertical)

flex-direction: column
↓ main axis (vertical)
→ cross axis (horizontal)
```

Everything else in Flexbox works **relative to these axes**, not the screen.

#### flex-wrap (Single Line vs Multiple Lines)

```css
.container {
  flex-wrap: wrap;
}
```

Whether items stay on one line or wrap onto multiple lines.
Without wrapping, Flexbox will shrink items aggressively to fit.

#### flex-grow, flex-shrink, flex-basis (Space Calculation Engine)

These three decide **how items share available space**.

#### flex-basis (Starting Size)

```css
.item {
  flex-basis: 200px;
}
```

The **initial size** before growing or shrinking.
`flex-basis` overrides `width` in Flexbox calculations.

#### flex-grow (Who Gets Extra Space)

```css
.item {
  flex-grow: 1;
}
```

How much an item should grow **relative to others**.

Example:

```
Item A: flex-grow: 1
Item B: flex-grow: 2
→ B gets twice the extra space
```

#### flex-shrink (Who Shrinks First)

```css
.item {
  flex-shrink: 1;
}
```

How much an item shrinks when space is tight.
Setting `flex-shrink: 0` prevents shrinking.

#### flex (Shorthand)

```css
.item {
  flex: 1;
}
```

Expands to:

```css
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0;
```

`flex-basis: 0` means:

> “Ignore content width, distribute space evenly.”

This explains many “why is width ignored?” issues.

#### Common Flexbox Confusions (Clarified)

#### ❓ width doesn’t work?

Because `flex-basis` is taking priority.

#### ❓ items overflow?

Because default `min-width: auto` prevents shrinking.

Fix:

```css
.item {
  min-width: 0;
}
```

#### ❓ vertical centering fails?

Because people confuse main vs cross axis.

---

### ❓ How does CSS Grid work, and how is it different from other layout systems?

### 📝 Answer

```
Rows + Columns
```

![Grid Image](/src/assets/grid.png)

Grid controls space in two dimensions at the same time.
You define the grid; the browser places items inside it.

- Horizontal lines = rows
- Vertical lines = columns
- Spaces between lines = tracks
- Box intersections = cells
- Items can span multiple tracks
- The browser fills empty cells automatically unless told otherwise

---

### ❓ Important grid properties

### 📝 Answer

```css
grid-template-columns
grid-template-rows
gap
auto-fit
minmax()
```

---

### ❓ How do CSS inline and block logical properties work, and why are they preferred over physical properties like left, right, top, and bottom in direction-aware layouts?

### 📝 Answer

**CSS inline and block logical properties define layout based on content flow, not physical screen directions.**
They adapt automatically to writing direction (LTR/RTL) and writing mode (horizontal/vertical), making layouts flexible and internationalization-friendly.

#### 1️⃣ What “inline” and “block” Mean in CSS

CSS layouts are based on **two logical axes**, not left/right/top/bottom:

- **Inline axis** → direction in which text flows
- **Block axis** → direction in which content stacks (new lines)

#### Common cases:

- English (LTR):
  - inline → left ➜ right
  - block → top ➜ bottom

- Arabic (RTL):
  - inline → right ➜ left
  - block → top ➜ bottom

#### 2️⃣ Inline Logical Properties

Inline properties work along the **text direction**.

```css
margin-inline-start: 16px;
margin-inline-end: 16px;
padding-inline-start: 8px;
```

- `inline-start` → where text **starts**
- `inline-end` → where text **ends**

- LTR → `inline-start = left`
- RTL → `inline-start = right`

You do **not** need separate CSS for LTR and RTL.

#### 3️⃣ Block Logical Properties

Block properties work along the **stacking direction** (top to bottom in most cases).

```css
margin-block-start: 12px;
margin-block-end: 12px;
padding-block-start: 8px;
```

- `block-start` → top in horizontal writing
- `block-end` → bottom in horizontal writing

If writing mode changes (for example, vertical text), these adapt automatically.

#### 4️⃣ Why Logical Properties Are Preferred Over Physical Ones

#### ❌ Physical properties (direction-dependent)

```css
margin-left: 16px;
padding-top: 8px;
```

Problems:

- Break in RTL layouts
- Require duplicate CSS rules
- Hard to maintain for global applications

#### ✅ Logical properties (direction-aware)

```css
margin-inline-start: 16px;
padding-block-start: 8px;
```

Benefits:

- Automatically support LTR and RTL
- Work with vertical writing modes
- Reduce conditional CSS
- Future-proof for internationalization

#### 5️⃣ Side-by-Side Comparison

| Physical Property | Logical Equivalent    |
| ----------------- | --------------------- |
| `margin-left`     | `margin-inline-start` |
| `margin-right`    | `margin-inline-end`   |
| `padding-top`     | `padding-block-start` |
| `padding-bottom`  | `padding-block-end`   |
| `left`            | `inset-inline-start`  |
| `top`             | `inset-block-start`   |

#### 6️⃣ When You Should Use Logical Properties

Use logical properties when:

- Building multilingual applications
- Supporting RTL languages
- Creating reusable UI components
- Designing future-ready layouts

Avoid physical properties unless:

- You explicitly need fixed left/right behavior
- The layout is guaranteed to be single-direction only

---

### ❓ Why styles sometimes don’t apply?

### 📝 Answer

Common causes:

- Higher specificity elsewhere
- Inline styles
- `!important`
- Shadow or encapsulation
- Incorrect selector

Most issues are not missing CSS — they are **conflicting CSS**.

---

### ❓ Why is `z-index` not working here?

### 📝 Answer

```html
<div class="parent">
  <div class="child">Text</div>
</div>
```

```css
.parent {
  z-index: 1;
}
.child {
  z-index: 999;
}
```

### ❌ Expected (wrong)

Child should appear on top.

### ✅ Actual behavior

`z-index` has no effect.

`z-index` works **only on positioned elements**.
Since neither element has `position` set, the browser ignores `z-index`.

✔ Fix:

```css
.child {
  position: relative;
  z-index: 999;
}
```

---

### ❓ Why does `height: 100%` not work?

### 📝 Answer

```css
.child {
  height: 100%;
}
```

Percentage heights require the parent to have an **explicit height**.
If the parent’s height is auto, the browser has nothing to calculate from.

✔ Fix:

```css
.parent {
  height: 300px;
}
```

---

### ❓ Why doesn’t `text-overflow: ellipsis` work?

### 📝 Answer

```css
.text {
  text-overflow: ellipsis;
}
```

Ellipsis works only when **all three conditions** are met:

1. Fixed width
2. `overflow: hidden`
3. `white-space: nowrap`

✔ Correct:

```css
.text {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

---

### ❓ Why does `position: sticky` fail?

### 📝 Answer

```css
.container {
  overflow: hidden;
}
.header {
  position: sticky;
  top: 0;
}
```

Sticky positioning depends on a scrollable ancestor.
When overflow is hidden or auto, the browser cannot determine sticky bounds.

✔ Fix:
Remove overflow or move sticky element outside.

---

### ❓ Why does margin collapse happen here?

### 📝 Answer

```html
<div class="box1"></div>
<div class="box2"></div>
```

```css
.box1 {
  margin-bottom: 20px;
}
.box2 {
  margin-top: 30px;
}
```

Vertical margins of block elements collapse into a single margin.
The browser uses the **largest margin**, not the sum.

✔ Resulting margin: `30px`

---

### ❓ Why does inline element ignore width and height?

### 📝 Answer

```css
span {
  width: 200px;
  height: 100px;
}
```

Inline elements flow with text and do not accept box dimensions.
They are sized by content only.

✔ Fix:

```css
span {
  display: inline-block;
}
```

---

### ❓ Why does `100vh` break on mobile?

### 📝 Answer

```css
.section {
  height: 100vh;
}
```

Mobile browsers dynamically change viewport height when address bars show/hide.
This causes layout jumps.

✔ Fix:

```css
.section {
  min-height: 100svh;
}
```

---

### ❓ Why does `flex: 1` ignore width?

### 📝 Answer

```css
.item {
  width: 300px;
  flex: 1;
}
```

`flex: 1` sets `flex-basis: 0`, which overrides width.
Flexbox distributes available space equally.

✔ Fix:

```css
.item {
  flex: 0 0 300px;
}
```

---

### ❓ Why is `!important` not working here?

### 📝 Answer

```css
p {
  color: red !important;
}
```

```html
<p style="color: blue">Text</p>
```

Inline styles have higher priority than external styles, even with `!important`.
This surprises many people.

✔ Fix:
Avoid inline styles or remove conflict.

---

### ❓ Why does this selector not apply?

### 📝 Answer

```css
.card > .title {
  color: red;
}
```

```html
<div class="card">
  <div>
    <div class="title">Hello</div>
  </div>
</div>
```

The `>` selector matches **only direct children**.
Here `.title` is nested deeper.

✔ Fix:

```css
.card .title {
  color: red;
}
```

---

### ❓ Why does `overflow: hidden` break dropdowns?

### 📝 Answer

```css
.container {
  overflow: hidden;
}
```

Overflow clipping hides content outside the container.
Dropdowns often rely on overflowing content.

✔ Fix:
Move dropdown outside or change layout strategy.

---

### ❓ Why does absolute positioning break layout height?

### 📝 Answer

```css
.child {
  position: absolute;
}
```

Absolutely positioned elements are removed from document flow.
Parents no longer calculate height based on them.

✔ Fix:
Use relative positioning or include a wrapper.

---

### ❓ Why does this animation feel janky?

### 📝 Answer

```css
.box {
  transition: width 0.3s;
}
```

Animating layout properties forces recalculation and repaint.
This is expensive and causes frame drops.

✔ Fix:

```css
.box {
  transition: transform 0.3s;
}
```

---

### ❓ Why does Grid overflow unexpectedly?

### 📝 Answer

```css
grid-template-columns: 1fr 1fr;
```

Grid items have a default `min-width: auto`, based on content size.
Long content prevents shrinking.

✔ Fix:

```css
grid-item {
  min-width: 0;
}
```

---

### ❓ Why does `:hover` not work on mobile?

### 📝 Answer

Touch devices do not have hover state.
Browsers simulate hover inconsistently.

✔ Solution:
Design interactions that don’t depend on hover.

---

### ❓ justify-self vs justify-content

### 📝 Answer

| Property          | Controls                               | Applies To       |
| ----------------- | -------------------------------------- | ---------------- |
| `justify-content` | **How multiple items are distributed** | Flexbox, Grid    |
| `justify-self`    | **How a single item aligns itself**    | Item (Grid only) |

Example: **`justify-content`**

```css
.container {
  display: flex;
  justify-content: center;
}
```

```less
|       A B       | ← both items horizontally centered
```

Example: **`justify-self`**

```css
.box-B-div {
  justify-self: end;
}
```

```less
|  A        |       B | ← A stays default, B moves right inside its own cell
```

---

### ❓ justify-content vs align-content

### 📝 Answer

`justify-content` controls spacing along the main axis (horizontal),
`align-content` controls spacing between **multiple rows/columns** on the cross axis (vertical).

> ❗ If there is only one row, `align-content` does nothing.
> Works ONLY when items wrap. Requires: `flex-wrap: wrap;`

Example: **`align-content`**

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* space between cards */
  justify-content: center; /* horizontal alignment */
  align-content: space-between; /* vertical spacing between rows */
  height: 400px; /* important for align-content */
}
```

```less
| Card 1  Card 2  Card 3 | ← start
|                        | ← free space
| Card 4  Card 5  Card 6 | ← end

```

---

### ❓ align-self vs align-items

### 📝 Answer

| Property      | Controls                                  | Applies To    |
| ------------- | ----------------------------------------- | ------------- |
| `align-items` | **Aligns all items inside the container** | Flexbox, Grid |
| `align-self`  | **Aligns one specific item**              | Flexbox, Grid |

Aligns along the cross-axis

- Flexbox → vertical (row direction)
- Grid → block axis (vertical in LTR)

> ❗ `align-self` works in Flexbox & Grid,
> ❗ `justify-self` works only in Grid

Example: **`align-items`**

```css
.container {
  display: flex;
  align-items: center;
}
```

```less
|                |
|   A   B        | ← both items vertically centered
|                |
```

Example: **`align-self`**

```css
.box:last-child {
  align-self: flex-end;
}
```

```less
|      A         |
|          B     |   ← only B moves
```

---

### ❓ What is `inset` in CSS?

### 📝 Answer

`inset` is a shorthand property for positioning an element using **top, right, bottom, and left** — mainly used with `position: absolute` or `position: fixed`.

> inset = top + right + bottom + left (all in one line)

```css
.box {
  position: fixed;
  inset: 0;
}
```

✅ What this means

```css
top: 0;
right: 0;
bottom: 0;
left: 0;
```

```css
inset: 10px; /* all sides */
inset: 10px 20px; /* top/bottom | left/right */
inset: 10px 20px 30px; /* top | left/right | bottom */
inset: 10px 20px 30px 40px; /* top | right | bottom | left */
```

---

### ❓ What is a pseudo-class and pseudo-element?

### 📝 Answer

🔹 Pseudo-Class

A **pseudo-class** defines a **state** of an element.

```css
button:hover {
}
input:focus {
}
li:first-child {
}
```

✔ Describes _when_ an element is in a certain condition

🔹 Pseudo-Element

A **pseudo-element** styles **a specific part** of an element.

```css
p::first-line {
}
p::before {
}
p::after {
}
```

✔ Describes _which part_ of an element

> **Pseudo-class → state**
> **Pseudo-element → part**
