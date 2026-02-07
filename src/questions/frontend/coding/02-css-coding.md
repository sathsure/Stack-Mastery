### ❓ Center a div both vertically & horizontally.

### 📝 Answer

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

---

### Convert a row layout to column layout on mobile.

### 📝 Answer

```css
.container {
  display: flex;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

---

### ❓ Create a circular div

### 📝 Answer

```html
<div class="circle"></div>
```

```css
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
```

---

### ❓ Make element stick while scrolling

### 📝 Answer

> `position: sticky` sticks ONLY inside its scrolling ancestor.
> It does NOT stick to the viewport if a parent scrolls.

```html
<div class="container">
  <div class="header">Sticky Header</div>
  <div class="content">Scroll Content</div>
</div>
```

```css
.container {
  height: 250px;
  overflow-y: auto; /* scrolling ancestor */
}

.header {
  position: sticky;
  top: 0;
  background: black;
  color: white;
}

.content {
  height: 1000px; /* forces scroll */
}
```

---

### ❓ `margin: auto` not centering vertically, What is the issue?

> ```css
> .box {
>   margin: auto;
> }
> ```

### 📝 Answer

```css
.parent {
  display: flex;
}

.box {
  margin: auto;
}
```

---

Perfect. Below is a **single, high-value CSS design mock interview question** that **covers almost all important CSS concepts interviewers expect**.
This is commonly used as a **“build this UI” round**.

---

### ❓ Design a User Profile Card UI with the following requirements.

> 1. Layout & Structure
>
> - Card centered horizontally on the page
> - Fixed-width card, responsive-friendly
> - Image at the top
> - Content section below image
>
> 2. Styling & Visuals
>
> - Rounded corners
> - Box shadow
> - Hover effect (slight lift)
> - Proper spacing (no hardcoded magic numbers)
>
> 3. Image
>
> - Image must:
>   - Fill width
>   - Maintain aspect ratio
>   - Not stretch
>
> 4. Text
>
> - Name (bold, single line)
> - Bio text:
>   - Maximum 2 lines
>   - Ellipsis if overflow
> - Role badge aligned top-right (overlay)
>
> 5. Actions
>
> - Two buttons at bottom:
>   - Left aligned
>   - Right aligned
> - Buttons must stay at bottom even if bio text changes
>
> 6. Behavior Constraints
>
> - No JavaScript
> - No absolute positioning for main layout
> - Use modern CSS only

### 📝 Answer

```html
<div class="card">
  <span class="badge">PRO</span>

  <img src="https://via.placeholder.com/400x200" alt="profile" />

  <div class="card-body">
    <h2>John Doe</h2>

    <p>
      Frontend developer with strong experience in building scalable UI
      components and design systems.
    </p>

    <div class="actions">
      <button>Message</button>
      <button>Follow</button>
    </div>
  </div>
</div>
```

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
}

.card {
  width: 320px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: black;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
}

.card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-body h2 {
  margin: 0 0 8px;
  font-size: 18px;
}

.card-body p {
  margin: 0;
  color: #555;
  font-size: 14px;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.actions {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}

button {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: #007bff;
  color: white;
  cursor: pointer;
}
```
