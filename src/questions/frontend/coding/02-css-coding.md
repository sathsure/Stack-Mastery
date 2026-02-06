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