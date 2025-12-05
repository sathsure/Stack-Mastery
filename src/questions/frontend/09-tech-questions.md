### ❓ 1. Can you explain your experience with REST API integration in your projects?

📝 **Answer:**

- Use Angular HttpClient with services.
- Strongly typed models/interfaces.
- Reusable interceptors for tokens, error handling.
- Use RxJS operators (map, switchMap, retry).
- Separate API layer from UI logic.

💻 **Code Example:**

```ts
// service
getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users').pipe(retry(2));
}
```

---

### ❓ 2. What strategies do you use for performance optimization in web applications?

📝 **Answer:**

- Lazy loading modules
- OnPush change detection
- trackBy in \*ngFor
- Caching + debouncing API calls
- Minimize bundle size (AOT, build optimizer)
- Image compression + CDN

💻 **Code Example:**

```ts
// OnPush
@Component({
  selector: "app-user",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {}
```

---

### ❓ 3. How do you ensure cross-browser compatibility?

📝 **Answer:**

- Up-to-date browserslist config
- Autoprefixer for CSS
- Use feature detection, not browser detection
- Polyfills for unsupported APIs
- Test on Chrome, Firefox, Edge, Safari

💻 **Code Example:**

```ts
if ("IntersectionObserver" in window) {
  // use it
}
```

---

### ❓ 4. How do you handle state management in Angular?

📝 **Answer:**

- Use NgRx / NGXS for complex apps
- Use BehaviorSubject for small local states
- Store global UI or auth data centrally
- Immutable data patterns

💻 **Code Example:**

```ts
// simple state with BehaviorSubject
private user$ = new BehaviorSubject<User | null>(null);
get user() { return this.user$.asObservable(); }
```

---

### ❓ 5. How do you handle authentication in Angular?

📝 **Answer:**

- JWT-based auth
- Interceptors for token injection
- Guard routes using AuthGuard
- Refresh token handling

💻 **Code Example:**

```ts
// interceptor
req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
```

---

### ❓ 6. How do you improve page load time in Angular applications?

📝 **Answer:**

- Preloading strategy
- Lazy loading routes
- Tree-shaking unused modules
- Compress images (WebP)
- Server-side caching

💻 Code Example (Lazy Load Route):

```ts
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
}
```

---

### ❓ 7. How do you handle error management in Angular apps?

📝 **Answer:**

- Global error interceptor
- Toast/notification service
- Server vs client error categorization
- Logging service (Sentry/CloudWatch)

💻 **Code Example:**

```ts
catchError((err) => {
  this.toastr.error("Something went wrong");
  return throwError(() => err);
});
```

---

### ❓ 8. How do you secure your web application?

📝 **Answer:**

- Use HTTPS
- Sanitize user input
- Avoid storing sensitive data in localStorage
- Implement CSRF protection (backend + headers)
- Use rate-limiting & server-side validation

💻 **Code Example:**

```ts
<div [innerHTML]="content | sanitizeHtml"></div>
```

---

### ❓ 9. What is your caching strategy?

📝 **Answer:**

- In-memory caching for temporary data
- LocalStorage/IndexedDB for long-term caching
- HTTP caching via interceptors
- Use ETag headers from backend

💻 **Code Example:**

```ts
if (this.cache[key]) return of(this.cache[key]);
```

---

### ❓ 10. How do you implement file upload/download in Angular?

📝 **Answer:**

- Use FormData for upload
- Set responseType to 'blob' for downloads
- Show progress with HttpEvents

💻 **Code Example:**

```ts
upload(file: File) {
  const form = new FormData();
  form.append('file', file);
  return this.http.post('/upload', form);
}
```

---

### ❓ 11. How do you optimize API calls in Angular?

📝 **Answer:**

- Debounce form inputs
- Cache identical requests
- Combine calls using forkJoin or switchMap
- Use pagination & server-side filtering

💻 **Code Example:**

```ts
search(term$).pipe(
  debounceTime(300),
  switchMap((q) => api.search(q))
);
```

---

### ❓ 12. How do you manage forms in Angular? Template or Reactive?

📝 **Answer:**

- Prefer Reactive Forms for complex validations
- Reusable validators
- Async validators for API checks

💻 **Code Example:**

```ts
this.form = this.fb.group({
  email: ["", [Validators.required, Validators.email]],
});
```

---

### ❓ 13. How do you ensure accessibility (a11y) in your application?

📝 **Answer:**

- ARIA roles
- Keyboard navigation
- Proper contrast / alt text
- Semantic HTML

💻 **Code Example:**

```html
<button aria-label="Close dialog">✖</button>
```

---

### ❓ 14. How do you handle responsive design?

📝 **Answer:**

- CSS Grid & Flexbox
- Media queries
- Angular Material responsive utilities
- Test on multiple screen sizes

💻 **Code Example:**

```css
@media (max-width: 600px) {
  .container {
    flex-direction: column;
  }
}
```

---

### ❓ 15. How do you debug Angular applications?

📝 **Answer:**

- Angular DevTools
- Chrome DevTools
- Breakpoints in TypeScript
- Logging via LoggerService
- Profiling change detection

💻 **Code Example:**

```ts
console.log("User Data:", user);
```
