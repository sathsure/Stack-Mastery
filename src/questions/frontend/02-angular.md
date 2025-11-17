### ❓ 1. Explain Angular lifecycle hooks (all of them)?

**📝 Answer:**
Angular lifecycle hooks are special methods called by Angular at specific points in a component's life, allowing you to perform actions during creation, updating, and destruction.
Main Hooks:  

`constructor:`  
Runs first when the component is created; used for dependency injection and basic setup but not for accessing inputs or the view.  

`ngOnChanges:`  
Triggers whenever input-bound properties change, providing a SimpleChanges object with previous and current values.  

`ngOnInit:`  
Runs once after the first change detection, ideal for one-time initialization like data fetching.  

`ngDoCheck:`  
Executes on every change detection cycle, allowing custom change-tracking logic beyond Angular's default checks.  

`ngAfterContentInit:`  
Called once after Angular projects external content (<ng-content>) into the component.  

`ngAfterContentChecked:`  
Runs after content initialization and then after every change detection to re-check projected content.  

`ngAfterViewInit:`  
Called once when the component’s own view and all child views finish initializing.  

`ngAfterViewChecked:`  
Runs after view initialization and on every subsequent change detection to verify the component and child views.  

`ngOnDestroy:`  
Called just before the component is removed; used to clean up subscriptions, listeners, and resources to prevent memory leaks.  

**💻 Code Example:** : [lifecycle-hooks.ts][lifecycle-hooks]

### ❓ 2. Difference between template-driven and reactive forms.

**📝 Answer:**
Template-Driven Forms:  
Use directives and two-way binding in the template; best for simple, small forms with minimal logic.  
Logic mainly in HTML  

Reactive Forms:  
Use a model-driven, TypeScript-based approach; ideal for complex forms requiring full control, validation, and scalability.  
Logic mainly in TypeScript.  

**💻 Code Example:**  
[template-driven][template-driven]  
[model-driven][model-driven]  

### ❓ 3. How change detection works in Angular.

**📝 Answer:**
Whenever any **asynchronous operation** occurs—like a click, input update, HTTP response, setTimeout, setInterval, or Promise, the **Zone.js** monitors all async operations and detects when an async event finishes.  
**👉 Zone.js → “Hey, something async happened.”**

NgZone is a bridge between Zone.js and Angular’s change detection system, where when Zone.js reports an async event, NgZone decides whether Angular should run change detection.

✔ NgZone triggers change detection
✔ NgZone can suppress change detection (runOutsideAngular)
✔ NgZone can re-enter Angular (run) to re-enable change detection

**👉 NgZone → “Start change detection NOW.”**

Once NgZone notifies Angular, **change detection** runs through the component tree, checks all bindings, and updates the affected DOM nodes. 

**👉 Change Detection → checks component tree → updates DOM**

Developers can also manually start change detection when using OnPush or external callbacks:  
`markForCheck()` → mark component + ancestors to run in the next cycle  
`detectChanges()` → run change detection immediately on the component subtree  

With **Signals**, every piece of state is tracked with fine-grained reactivity.  
So instead of scanning the entire component tree:  

👉 Only the component whose signal changed gets updated.  
👉 No global tree walk, no unnecessary checks.  
👉 DOM updates become faster, more granular, and more predictable.  

This enables zoneless Angular (no Zone.js needed).  

### ❓ 4. What is Ahead-of-Time (AOT) compilation and Just-in-Time compilation?

**📝 Answer:**
**AOT (Ahead-of-Time)**
- Templates compiled **at build time**  
- **Faster startup**, **smaller bundle**  
- Template errors caught **early** during build  
- Used primarily for **production**

**JIT (Just-in-Time)**
- Templates compiled **in the browser at runtime**  
- **Slower initial load**, **larger bundle**  
- Useful for **quick development** or debugging template compilation  
- **Not recommended** for production

During a build, Webpack triggers Angular’s compiler (**ngc**) to run either:  
  - **AOT compilation** (production builds)  
  - **JIT compilation** (development builds)

### ❓ 5. Explain Dependency Injection hierarchy.

**📝 Answer:**

**💻 Code Example:**

### ❓ 6. What is Content Projection and ng-content?

**📝 Answer:**

**💻 Code Example:**

### ❓ 7. Explain ViewChild vs ContentChild.

**📝 Answer:**

**💻 Code Example:**

### ❓ 8. What is OnPush Change Detection, when and how to use it?

**📝 Answer:**

**💻 Code Example:**

### ❓ 9. How to optimize Angular apps for Core Web Vitals?

**📝 Answer:**

**💻 Code Example:**

### ❓ 10. Lazy loading and preloading strategies.

**📝 Answer:**

**💻 Code Example:**

### ❓ 11. How to reduce bundle size? (Terser, Build Optimizer, Tree-shaking)

**📝 Answer:**

**💻 Code Example:**

### ❓ 12. What are Signals?

**📝 Answer:**

**💻 Code Example:**

### ❓ 13. Difference between signals, computed, and effects.

**📝 Answer:**

**💻 Code Example:**

### ❓ 14. How do Signals differ from RxJS Observables?

**📝 Answer:**

**💻 Code Example:**

### ❓ 15. Migration strategy from RxJS state to Signals.

**📝 Answer:**

**💻 Code Example:**

### ❓ 16. What is a Standalone Component?

**📝 Answer:**

**💻 Code Example:**

### ❓ 17. Explain feature modules vs shared modules.

**📝 Answer:**

**💻 Code Example:**

### ❓ 18. What is Nx Monorepo and how to use Angular inside it?

**📝 Answer:**

**💻 Code Example:**

### ❓ 19. How Angular handles SSR with Angular Universal?

**📝 Answer:**

**💻 Code Example:**


[lifecycle-hooks]: ../../code-examples/angular/lifecycle-hooks.ts
[template-driven]: ../../code-examples/angular/template-driven/template-driven.html
[model-driven]: ../../code-examples/angular/model-driven/reactive-form.ts