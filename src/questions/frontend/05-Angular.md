### ❓ 1. What is Angular, and how is it different from AngularJS?

📝 **Answer:**

Angular is a TypeScript-based framework (2+) with component-based architecture, ahead-of-time compilation, RxJS, and modern tooling.  
AngularJS (1.x) is JavaScript-based, uses scopes/controllers, and a different change detection mechanism (dirty checking).

---

### ❓ 2. Explain the role of NgModules vs Standalone Components.

📝 **Answer:**

NgModules group related code (components, directives, pipes, services) into cohesive blocks; components control views and handle UI logic.
Standalone components can be used without declaring them in an NgModule. They reduce boilerplate and make lazy-loading, code-splitting, and feature isolation easier.

---

### ❓ 3. What are the different types of data binding in Angular

📝 **Answer:**

**Interpolation (`{{ }}`)**

Used to **display data from the component to the template**.  
➡️ Reads the value and renders it as text.  
➡️ **One-way binding (component → view)**.

```ts
name = "Dev";
```

```html
<p>Hello {{ name }}</p>
```

**Property Binding (`[prop]`)**

Used to **bind a component value to an HTML or component property**.  
➡️ Updates **DOM properties**, not strings.  
➡️ **One-way binding (component → view)**.

```ts
isDisabled = true;
```

```html
<button [disabled]="isDisabled">Submit</button>
```

**Event Binding (`(event)`)**

Used to **listen to events from the template and trigger logic in the component**.  
➡️ Sends data **from view → component**.  
➡️ Common events: `click`, `input`, `change`, `keyup`.

```ts
handleClick() {
  console.log('Button clicked');
}
```

```html
<button (click)="handleClick()">Click</button>
```

**Two-Way Binding (`[(ngModel)]`)**

Keeps **component and view in sync automatically**.
➡️ Combines **property + event binding**.
➡️ Requires `FormsModule`.

```ts
username = "";
```

```html
<input [(ngModel)]="username" />
<p>{{ username }}</p>
```

**Custom Two-Way Binding (`@Input + @Output`)**

Used when creating **reusable components**.  
➡️ Gives full control over two-way data flow.

```ts
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  standalone: true,
})
export class InputComponent {
  @Input() value!: string;
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const element = event.target as HTMLInputElement;
    this.valueChange.emit(element.value);
  }
}
```

```html
<input [value]="value" (input)="onInput($event)" />
```

Usage:

```html
<app-input [(value)]="username"></app-input>
```

**Quick Summary**

- `{{ }}` → Display data
- `[prop]` → Set properties
- `(event)` → Handle events
- `[(ngModel)]` → Sync data both ways

---

### ❓ 6. Tell me the Angular Lifecycle Hooks?

📝 **Answer:**

- **ngOnChanges** – Executes whenever an `@Input()` value changes and helps react to parent-to-child data updates.
- **ngOnInit** – Executes once after inputs are initialized and is used for component initialization and API calls.
- **ngDoCheck** – Executes on every change detection cycle and is used for custom change detection logic.
- **ngAfterContentInit** – Executes once after projected content (`ng-content`) is initialized.
- **ngAfterContentChecked** – Executes after every check of projected content.
- **ngAfterViewInit** – Executes once after the component and child views are fully initialized and is the correct place to access the DOM.
- **ngAfterViewChecked** – Executes after every view check and should be avoided unless necessary.
- **ngOnDestroy** – Executes just before the component is destroyed and is used for cleanup.

**Execution Order**

```
ngOnChanges
→ ngOnInit
→ ngDoCheck
→ ngAfterContentInit
→ ngAfterContentChecked
→ ngAfterViewInit
→ ngAfterViewChecked
→ ngOnDestroy
```

**child.component.ts**

```ts
@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
})
export class ChildComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() value!: number;

  // static:true → available in ngOnInit
  @ViewChild("box", { static: true }) box!: ElementRef;

  // Projected content queries
  @ContentChild("title") title!: ElementRef;
  @ContentChild(".desc") description!: ElementRef;
  @ContentChild("#footer") footer!: ElementRef;

  private intervalId!: number;
  private subscription!: Subscription;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes["value"].currentValue);
    // 1 → 2 → 3 (whenever parent updates input)
  }

  ngOnInit() {
    console.log(this.box.nativeElement);
    // <div>Child View Element</div> (because static:true)

    // Correct place for:
    // 1. HTTP calls
    // this.http.get(...)

    // 2. NgRx dispatch
    // this.store.dispatch(loadUsers());

    // Example resource to clean later
    this.intervalId = window.setInterval(() => {}, 1000);
  }

  ngDoCheck() {
    console.log(this.value);
    // Runs every change detection cycle
    // Used only for custom change detection (rare)
  }

  ngAfterContentInit() {
    console.log(this.title.nativeElement.textContent);
    // "Projected Title from Parent"
    // Content projected via <ng-content> is now accessible
  }

  ngAfterContentChecked() {
    console.log(this.description.nativeElement.textContent);
    // Used to react if projected content changes dynamically
  }

  ngAfterViewInit() {
    console.log(this.box.nativeElement);
    // Safe DOM access for component template + child views
  }

  ngAfterViewChecked() {
    console.log(this.box.nativeElement.offsetHeight);
    // Can be used to measure layout or dimensions (use carefully)
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    this.subscription?.unsubscribe();
    // Cleanup: intervals, subscriptions, event listeners
  }
}
```

**child.component.html**

```html
<div #box>Child View Element</div>

<ng-content select="h1"></ng-content>
<!-- element selector -->
<ng-content select=".desc"></ng-content>
<!-- class selector -->
<ng-content select="#footer"></ng-content>
<!-- id selector -->

<p>Input value: {{ value }}</p>
```

**parent.component.html**

```html
<app-child [value]="count">
  <h1 #title>Projected Title from Parent</h1>
  <p class="desc">Projected Description</p>
  <div id="footer">Projected Footer</div>
</app-child>
```

> DOM access should be done only in `ngAfterViewInit` because the view and child components are fully initialized at that stage.

![Angular_Lifecycle Image](/src/assets/angular-lifecycle.png)

---

### ❓ 7. What is `ViewChild` and when would you use it?

📝 **Answer:**

In Angular, @ViewChild lets a component directly access something in its own template (DOM element or child component).

👉 Use it when data binding isn’t enough and you need direct control.

Code-Em

```ts
@ViewChild('emailInput', { static: true })
  emailInput!: ElementRef<HTMLInputElement>;

@ViewChild('nameInput')
  nameInput!: ElementRef<HTMLInputElement>;

ngOnInit() {
  this.nameInput.nativeElement.focus(); //  ❌ nameInput is undefined
  this.emailInput.nativeElement.focus(); // ✅ Available here
}

ngAfterViewInit() {
  this.nameInput.nativeElement.focus(); // ✅ Available here
  this.emailInput.nativeElement.focus(); // ✅ works
}
```

nativeElement = real browser DOM element. `type`: **ElementRef<HTMLInputElement>**

---

### ❓ 9. Difference between components and directives?

📝 **Answer:**

**Component**

A component is a **directive with a template** that controls a **part of the UI** and defines how it looks and behaves.

**Key points**

- Has its **own HTML template**
- Used to **create UI blocks**
- Always used with a **selector**

**Example (Component):**

```ts
@Component({
  selector: "app-user",
  template: `<h2>Hello {{ name }}</h2>`,
})
export class UserComponent {
  name = "Dev";
}
```

```html
<app-user></app-user>
```

**Directive**

A directive is used to **change behavior or appearance** of an existing DOM element **without creating a UI**.

**Key points**

- **No template**
- Used to **modify DOM or add behavior**
- Applied as an **attribute**

**Types of Directives**

**1. Attribute Directive**

Changes the appearance or behavior of an element.

```ts
@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = "yellow";
  }
}
```

```html
<p appHighlight>Highlighted text</p>
```

**2. Structural Directive**

Changes the DOM structure by adding or removing elements.

```html
<div *ngIf="isLoggedIn">Welcome</div>
```

➡️ `*ngIf` removes or adds elements to the DOM.

**Key Differences**

| Component            | Directive                   |
| -------------------- | --------------------------- |
| Has template         | No template                 |
| Creates UI           | Modifies existing UI        |
| Uses `@Component`    | Uses `@Directive`           |
| Can use `ng-content` | Cannot use `ng-content`     |
| Always has selector  | Applied as attribute or `*` |

**Q: Is every component a directive?**
✅ Yes — every component is a directive with a template.

**Q: Can directives have lifecycle hooks?**
✅ Yes (`ngOnInit`, `ngOnChanges`, etc.)

**Q: Which directive manipulates DOM structure?**
✅ Structural directives like `*ngIf`, `*ngFor`

---

### ❓ 10. How `*ngIf` and `*ngFor` Works Internally?

<img width="1857" height="475" alt="image" src="https://github.com/user-attachments/assets/254306d8-0b77-4e87-8b29-ffdc975f43c6" />

**TrackBy**

Without `trackBy`:

- Angular destroys and recreates all DOM nodes

With `trackBy`:

```html
<li *ngFor="let user of users; trackBy: trackById"></li>
```

```ts
trackById(index: number, user: any) {
  return user.id;
}
```

- Angular reuses DOM nodes
- Improves performance

**Comparison Summary**

| Feature          | `*ngIf`                        | `*ngFor`                |
| ---------------- | ------------------------------ | ----------------------- |
| Type             | Structural directive           | Structural directive    |
| DOM behavior     | Add/remove element             | Create multiple views   |
| Uses             | TemplateRef + ViewContainerRef | Same                    |
| Lifecycle impact | Destroy & recreate             | Recreate unless trackBy |
| Change detection | Condition based                | Collection based        |

---

### ❓ 11. How Attribute Directive Works Internally?

📝 **Answer:**

**Internal Logic of an Attribute Directive (Simplified)**

```html
<p appHighlight="yellow">Highlighted Text</p>
```

**highlight.directive.ts**

```ts
@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input("appHighlight") color!: string;

  ngOnInit() {
    this.renderer.setStyle(
      this.el.nativeElement,
      "backgroundColor",
      this.color
    );
  }
}
```

**`ngClass` (Simplified Logic)**

```ts
@Directive({ selector: "[ngClass]" })
class NgClass {
  @Input() ngClass!: string | string[];

  ngDoCheck() {
    // Add/remove classes based on value
  }
}
```

**`ngStyle` (Simplified Logic)**

```ts
@Directive({ selector: "[ngStyle]" })
class NgStyle {
  @Input() ngStyle!: Record<string, string>;

  ngDoCheck() {
    // Apply inline styles dynamically
  }
}
```

---

### ❓ 12. Why is it not recommended to manipulate the DOM directly using ElementRef in Angular, and why is Renderer2 preferred instead?

📝 **Answer:**

Directly accessing the DOM through `ElementRef` can expose the application to security risks such as XSS attacks and tightly couples the code to the browser DOM.  
`Renderer2` provides a safe, abstraction-based, and platform-independent way to manipulate the DOM that works across environments like server-side rendering and Web Workers.

**What Renderer2 Is Doing Internally**

- Angular does not touch the DOM directly
- Renderer2 acts as an abstraction layer
- Angular decides how and where the DOM should be updated
- This keeps the app secure and platform-independent

---

### ❓ 13. What are Angular pipes, and how do pure and impure pipes differ in behavior and performance?

📝 **Answer:**

Angular pipes transform data in templates without changing the original value.
A **pure pipe** runs only when the input **reference changes**, while an **impure pipe** runs on **every change detection cycle**, which makes pure pipes faster and safer for performance.

```ts
@Pipe({ name: "double", pure: true })
export class DoublePipe {
  transform(value: number) {
    return value * 2;
  }
}
```

---

### ❓ 14. When should you use pure pipes and why are they preferred in real applications?

📝 **Answer:**

Pure pipes should be used when data follows **immutable patterns**.
They are preferred because Angular skips execution unless the input reference changes, reducing unnecessary recalculations.
Pure pipes are skipped unless Angular detects a reference change.

```ts
numbers = [1, 2, 3];

// ❌ pipe not triggered
this.numbers.push(4);

// ✅ pipe triggered
this.numbers = [...this.numbers, 4];
```

---

### ❓ 15. When is it correct to use an impure pipe and what risks does it introduce?

📝 **Answer:**

Impure pipes are used when data is **mutated directly** or depends on external values like time or browser storage.
They introduce performance risk because they execute repeatedly during every UI change.
Impure pipes are executed during **every change detection cycle**, similar to `ngDoCheck`.

```ts
@Pipe({ name: "now", pure: false })
export class NowPipe {
  transform() {
    return Date.now();
  }
}
```

---

### ❓ 16. How do custom pipes work and how do you create them?

📝 **Answer:**

Custom pipes are reusable transformation logic created using `@Pipe`.
By default, all custom pipes are pure unless explicitly marked impure.

```ts
@Pipe({ name: "capitalize" })
export class CapitalizePipe {
  transform(value: string) {
    return value[0].toUpperCase() + value.slice(1);
  }
}
```

```html
{{ 'angular' | capitalize }}
```

---

### ❓ 17. Can pipes perform async operations or API calls?

📝 **Answer:**

No.
Pipes must be synchronous and side-effect free.
Async logic should be handled in services or Observables using the `async` pipe.

```html
{{ users$ | async }}
```

---

### ❓ 18. Is the async pipe pure or impure and why is it safe?

📝 **Answer:**

The `async` pipe is marked as pure because it does not run on every change detection cycle.  
Angular re-evaluates it only when the Observable or Promise emits a new value, not on unrelated UI changes.

So even though it reacts to async data, it still follows pure pipe rules.

**Angular internally:**

- Subscribes to the Observable or Promise
- Listens for new emissions
- Marks the view for check when a value is emitted
- Unsubscribes automatically when the component is destroyed

```html
{{ users$ | async }}
```

```ts
users$ = this.userService.getUsers(); // Observable
```

This makes it reactive without being impure.

---

### ❓ 19. Name a default impure pipe in Angular.

📝 **Answer:**

Angular does not provide any default impure pipes.  
All built-in Angular pipes are pure by default, including date, currency, json, and even the async pipe.

**What Angular considers truly “impure”**

Only pipes with:

```ts
@Pipe({ pure: false })
```

are impure.

Angular will never mark a pipe impure by default.

---

### ❓ 20. Explain Angular’s change detection mechanism and how it evolved from AngularJS to modern Angular.

📝 **Answer:**

Angular’s change detection is responsible for keeping the UI synchronized with application data.
In **AngularJS**, this was done using a **digest cycle** that relied on dirty checking and repeatedly compared old and new values until the system stabilized. This approach worked but became slow as applications grew.

Modern Angular replaced this with a **unidirectional, tree-based change detection system**, which checks components from the root downward and updates only what is necessary.

---

### ❓ 21. How do `zone.js` and `NgZone` work together to trigger change detection?

📝 **Answer:**

`zone.js` patches asynchronous browser APIs such as timers, HTTP calls, and DOM events to detect when asynchronous work completes.
`NgZone` uses this information to decide **when Angular should run change detection**.

When an async task finishes, `NgZone` re-enters Angular’s zone and triggers change detection, ensuring UI updates happen automatically without manual wiring.

---

### ❓ 22. What exactly happens during a change detection cycle in Angular?

📝 **Answer:**

During a change detection cycle, Angular starts from the root component and traverses the component tree.
For each component, Angular evaluates template expressions, compares current values with previous values, and updates the DOM only when differences are found.

This process is synchronous and deterministic, which makes it predictable but potentially expensive if triggered too often.

---

### ❓ 23. How does Angular scan the component tree and why does this affect performance?

📝 **Answer:**

Angular organizes the application into a **component tree**.
Change detection always starts at the root and proceeds top-down through parent and child components.

If many components are checked unnecessarily, performance degrades, which is why limiting change detection is critical in large applications.

---

### ❓ 24. What change detection strategies does Angular provide and how do they differ?

📝 **Answer:**

Angular provides **Default** and **OnPush** strategies.

The **Default strategy** runs change detection on a component whenever any async event occurs.
The **OnPush strategy** runs change detection only when input references change, an event originates from the component, or an observable emits via the async pipe.

OnPush encourages immutable data patterns and significantly improves performance.

---

### ❓ 30. If no async event happens, will Angular still run change detection?

📝 **Answer:**

No. Change detection is triggered only by events detected by Angular, such as async operations, user actions, or manual triggers.

---

### ❓ 31. Does OnPush mean change detection never runs?

📝 **Answer:**

No. OnPush limits when detection runs, but it still executes when inputs change or events occur.

---

### ❓ 32. Does mutating an object work with OnPush?

📝 **Answer:**

No. OnPush relies on reference changes, so mutations do not trigger change detection.

---

### ❓ 34. Is change detection asynchronous because HTTP calls are async?

📝 **Answer:**

No. Change detection itself is synchronous, even though it is triggered by async events.

---

### ❓ 25. Why was change detection considered problematic before signals were introduced?

📝 **Answer:**

Before signals, Angular relied heavily on zone-triggered global change detection.
This caused frequent re-checking of large component trees, even when only a small piece of data changed.

Developers had to manually optimize performance using OnPush, immutability, and manual change detection APIs.

Signals introduce **fine-grained reactivity** into Angular.
Instead of scanning the component tree, Angular tracks which signals are read by which templates.

When a signal updates, Angular re-renders only the parts of the UI that depend on that signal, eliminating unnecessary checks.

---

### ❓ 28. Do signals completely replace `zone.js` and traditional change detection?

📝 **Answer:**

No.
Signals reduce reliance on `zone.js`, but Angular can still use zones to detect external async events.

Signals also work in **zone-less Angular**, making change detection more predictable and easier to reason about.

---

### ❓ 38. How does Angular’s DI hierarchy work?

📝 **Answer:**

Providers can be registered in modules, components, or via `providedIn`. The injector tree mirrors the component/module tree; a child injector falls back to parent injectors when resolving dependencies.

---

### ❓ 39. Difference between `providedIn: 'root'` and `providedIn: 'any'`?

📝 **Answer:**

**providedIn: 'root'** - registers the service in the application's main root injector, creating a single, singleton instance shared by all modules (eagerly and lazy loaded) throughout the entire application.

**providedIn: 'any'** - ensures that all eagerly loaded modules share a single instance, but each lazy-loaded module gets its own unique instance of the service.

---

### ❓ 40. What’s a multi-provider and when would you use it?

📝 **Answer:**

A provider configuration with the multi: true property, telling Angular's Dependency Injection (DI) to collect all providers for a specific token into an array instead of replacing them.  
When a component requests a dependency using a token (often an InjectionToken), Angular checks for providers with multi: true. If found, it injects an array containing all registered values/classes, not just the last one.

```ts
// 1. Define a token for validators
import { InjectionToken } from '@angular/core';
export const MY_VALIDATORS = new InjectionToken<any>('my-validators');

// 2. Register multiple validators with 'multi: true' in a module/component
providers: [
  { provide: MY_VALIDATORS, useClass: EmailValidator, multi: true },
  { provide: MY_VALIDATORS, useClass: PasswordStrengthValidator, multi: true },
  // ... add more validators
]

// 3. Inject the array in a service or component
constructor(@Inject(MY_VALIDATORS) private validators: any[]) {
  // 'validators' will now be an array containing EmailValidator and PasswordStrengthValidator
  console.log(this.validators);
}

```

---

### ❓ 41. Trick: If you provide the same service in a lazy-loaded module and in root, how many instances exist?

📝 **Answer:**

👉 **Two instances** will exist.

Angular has **hierarchical dependency injection**:

- `providedIn: 'root'` → one **application-wide singleton**
- A **lazy-loaded module** has its **own injector**
- If the same service is also provided in that lazy module, Angular creates **another instance** scoped to that module

#### ❌ Example: Two instances created

#### `logger.service.ts`

```ts
@Injectable({
  providedIn: "root",
})
export class LoggerService {
  id = Math.random();
}
```

#### `lazy.module.ts`

```ts
@NgModule({
  providers: [LoggerService], // ❌ creates a new instance
})
export class LazyModule {}
```

#### Result

- Components in **AppModule** → instance A
- Components in **LazyModule** → instance B

#### ✅ Best Practice (Recommended)

#### `lazy.module.ts`

```ts
@NgModule({
  // ❌ no providers array
})
export class LazyModule {}
```

✔️ Now **both modules share the same instance**

---

### ❓ 42. What are injection tokens and why are they needed?

📝 **Answer:**

`InjectionToken` is used to inject values that don’t have a class type (e.g. config objects, interfaces). It provides a DI key for non-class dependencies.

---

### ❓ 43. Core concepts of Angular routing?

📝 **Answer:**

Routes config, router outlet, routerLink/routerLinkActive, route guards, lazy loading, resolvers, `ActivatedRoute`.

---

### ❓ 44. What are route guards and types available?

📝 **Answer:**

Guards control navigation. Types: `CanActivate`, `CanDeactivate`, `Resolve`, `CanLoad` / `CanMatch`, etc.

---

### ❓ 45. Difference between `CanLoad`/`CanMatch` and `CanActivate`?

📝 **Answer:**

`CanActivate` runs after module is loaded to allow/deny activation. `CanLoad`/`CanMatch` runs before loading, preventing the lazy module bundle from being loaded if not allowed.

---

### ❓ 46. Explain lazy loading modules / routes.

📝 **Answer:**

Lazy-loaded routes use dynamic imports in route config (e.g. `loadChildren:` or standalone `loadComponent`), so code is loaded on demand.

---

### ❓ 47. Trick: If you have a service provided in a lazy-loaded module, is it shared with the rest of the app?

📝 **Answer:**

No. That service instance is scoped to that lazy module’s injector (unless explicitly provided at root).

---

### ❓ 48. How do you access route params and query params?

📝 **Answer:**

Using `ActivatedRoute`: `route.paramMap`, `route.snapshot.paramMap`, `route.queryParamMap`, etc.

---

### ❓ 49. Differences between template-driven and reactive forms?

📝 **Answer:**

Template-driven: form logic in template, simpler, uses `ngModel`. Reactive: form model in TypeScript, more explicit, scalable, and testable using `FormGroup`, `FormControl`, `FormArray`.

---

### ❓ 50. What is a `FormGroup` and `FormControl`?

📝 **Answer:**

`FormControl` represents a single value and validation state. `FormGroup` is a collection of controls, acting like an object model.

---

### ❓ 51. How do you create a custom form control compatible with Angular forms?

📝 **Answer:**

Implement `ControlValueAccessor` and optionally `Validator` to integrate with the forms API and be used with `formControlName`/`ngModel`.

---

### ❓ 52. Trick: Why is using `[(ngModel)]` with reactive forms generally discouraged?

📝 **Answer:**

It mixes paradigms and can cause confusion and unexpected behavior. You should stick to one approach, usually reactive forms for complex forms.

---

### ❓ 53. What is `HttpClient` and advantages over old `Http` module?

📝 **Answer:**

`HttpClient` returns typed, observable responses, handles JSON automatically, supports interceptors, easier configuration.

---

### ❓ 54. What are HTTP interceptors used for?

📝 **Answer:**

To inspect/modify requests and responses globally (e.g. auth headers, logging, error handling, retries).

---

### ❓ 55. Trick: In what order do multiple interceptors execute?

📝 **Answer:**

They execute in the order they are provided for outgoing requests, and in reverse order for incoming responses.

---

### ❓ 56. How do you handle global HTTP errors?

📝 **Answer:**

Use an interceptor to catch errors in `catchError`, and possibly a global error handler (`ErrorHandler`) for non-HTTP errors.

---

### ❓ 57. How do you usually handle application-wide state in Angular?

📝 **Answer:**

Options: services with RxJS (BehaviorSubject, signals), NgRx, Akita, NGXS, or custom state management patterns.

---

### ❓ 58. When would you prefer NgRx over simple services with subjects/signals?

📝 **Answer:**

For large, complex apps that need predictable, testable state changes, time-travel debugging, and strict one-way data flow.

---

### ❓ 59. Trick: Is `async` pipe unsubscribing automatically a replacement for manual unsubscribe in all cases?

📝 **Answer:**

Only in templates. Subscriptions created in code (e.g. in `ngOnInit`) must still be manually managed/unsubscribed.

---

### ❓ 60. How do you avoid multiple HTTP calls when multiple subscribers listen to the same Observable?

📝 **Answer:**

Use sharing operators like `shareReplay` or convert to a signal/store, or cache results in services.

---

### ❓ 61. What techniques do you use for Angular performance optimization?

📝 **Answer:**

`OnPush` change detection, trackBy in `*ngFor`, lazy loading routes/components, preloading strategies, pure pipes, avoiding heavy work in templates, memoization, CDRef control.

---

### ❓ 62. Why is `trackBy` important for `*ngFor`?

📝 **Answer:**

It helps Angular identify items uniquely, so it reuses DOM elements instead of destroying/recreating them, improving performance on large lists.

---

### ❓ 63. Trick: What happens if you mutate the array used in `*ngFor` without a `trackBy`?

📝 **Answer:**

Angular may re-render many list items unnecessarily, causing poor performance.

---

### ❓ 64. How would you analyze performance issues in an Angular app?

📝 **Answer:**

Use Angular DevTools, browser performance profiler, change detection profiling, logging of lifecycle hooks, and analyzing network/bundle size.

---

### ❓ 65. What is AOT compilation and why is it useful?

📝 **Answer:**

Ahead-of-time compiles Angular templates during build, reducing bundle size, catching template errors early, and improving startup time.

---

### ❓ 66. What is Angular Universal?

📝 **Answer:**

A solution for server-side rendering (SSR) Angular apps to improve first paint and SEO for crawlers.

---

### ❓ 67. What is hydration in Angular?

📝 **Answer:**

The process of reusing server-rendered DOM on the client and “wiring it up” to Angular, reducing re-rendering on startup.

---

### ❓ 68. Trick: Why might you still need `meta` tags service even with SSR?

📝 **Answer:**

Dynamic pages or client-side navigation need meta tags updated after initial load for social previews and some crawlers.

---

### ❓ 69. Trick: Is binding to `[innerHTML]` always safe?

📝 **Answer:**

No. It’s a common XSS vector if you bind untrusted input. Only use with sanitized/trusted content.

Here is a **clean, well-organized, interview-ready Markdown**, rewritten exactly as you asked — with the question starting from **“Consider the below scenario, what will be the output”**, and a crisp, logical answer.

---

### ❓ 70. Trick: Consider the below scenario. What will be the output?

**Global styles (`styles.css`)**

```css
div[_ngcontent-c1] {
  color: red;
}
```

**Child component (compiled HTML)**

```html
<div _ngcontent-c1>Hello from Child</div>
```

**Parent component (compiled HTML)**

```html
<div _ngcontent-c7>Hello from Parent</div>
<app-child _ngcontent-c7></app-child>
```

**Parent component styles**

```css
div[_ngcontent-c1] {
  color: blue;
}
```

📝 **Answer:**

**Child Output: Color -> Red**

1. The child element is rendered as:
   ```html
   <div _ngcontent-c1>Hello from Child</div>
   ```
2. The global stylesheet contains:
   ```css
   div[_ngcontent-c1] {
     color: red;
   }
   ```
3. Global styles are **not scoped** by Angular.
4. The selector **exactly matches** the child element.  
   ➡️ Therefore, the browser applies `color: red` to the child text.

5. The parent component uses **default ViewEncapsulation (Emulated)**.
6. Angular rewrites the parent CSS internally as:
   ```css
   div[_ngcontent-c1][_ngcontent-c7] {
     color: blue;
   }
   ```
7. This selector requires the element to have **both** attributes:
   - `_ngcontent-c1` (child scope)
   - `_ngcontent-c7` (parent scope)
8. The child element only has `_ngcontent-c1`.

➡️ The selector does **not match**, so the parent style is ignored.

✅ **Final Conclusion**

- **Child text is red** → applied by global styles
- **Parent component styles are not applied** → blocked by Angular’s view encapsulation

---

### ❓ 71. What role does the Angular CLI play?

📝 **Answer:**

It scaffolds projects, generates code, builds/serves apps, runs tests and linting, and manages configurations.

---

### ❓ 72. How do you configure different environments (dev, QA, prod)?

📝 **Answer:**

Through environment files and build configurations; or via runtime configuration (e.g. loading JSON config on startup).

---

### ❓ 73. What is `ngZone: 'noop'` mode and when might you use it?

📝 **Answer:**

It disables Zone.js-based auto change detection. You then trigger detection manually; useful for high-performance use cases or integrating with other reactive systems.

---

### ❓ 74. How do you structure a large Angular project?

📝 **Answer:**

By domain/feature modules or feature folders, shared/core modules, clear layering (components → services → data layer), consistent naming, and enforcing boundaries.

---

### ❓ 75. How do smart vs dumb (container vs presentational) components help?

📝 **Answer:**

Smart components handle data fetching and state; dumb components focus on UI and inputs/outputs. This improves reusability and testability.

---

### ❓ 76. Trick: When is a service NOT a singleton in Angular?

📝 **Answer:**

When it’s provided in a component or in a lazy-loaded module, rather than in root; then each component/module gets its own instance.

---

### ❓ 77. What are some anti-patterns you watch out for in Angular code?

📝 **Answer:**

Business logic in components instead of services, massive god components, heavy logic in templates, subscriptions without unsubscribe, using `any` everywhere, too many global singletons.

---

### ❓ 78. Why can subscribing to a hot observable (e.g. `Subject`) in a non-Angular callback fail to trigger change detection, and how do you fix it?

📝 **Answer:**

Because the callback can run outside Zone.js, Angular doesn’t know a value changed. Wrap emission or subscription in `ngZone.run(...)`, or use APIs that are zone-aware (e.g. HttpClient, Router) or `ɵZoneScheduler`-based schedulers.

---

### ❓ 79. Why is `async` pipe often preferred over manual `subscribe` in components, especially for UI streams?

📝 **Answer:**

`async` pipe:

- Subscribes/unsubscribes automatically with view lifecycle
- Avoids memory leaks
- Triggers change detection correctly
  Manual `subscribe` requires manual teardown and can be forgotten or mis-ordered.

---

### ❓ 80. In Angular’s `OnPush` component, why can updating a field inside a subscription not update the UI, and what’s the correct pattern?

📝 **Answer:**

OnPush checks on input changes, events, and async pipe emissions. If you mutate fields imperatively without async pipe or manual `markForCheck()`, the view may not update. Prefer exposing observables to the template and using `async` pipe.

---

### ❓ 81. Why is using `valueChanges.pipe(debounceTime(...)).subscribe(...)` for autocomplete sometimes problematic?

📝 **Answer:**

If you forget to unsubscribe, you leak subscriptions across component recreations. Also, ignoring `distinctUntilChanged()` can cause redundant server calls; ignoring `switchMap` can cause out-of-order responses and stale UI.

---

### ❓ 82. In reactive forms, how can combining `valueChanges` of multiple controls lead to subtle bugs?

📝 **Answer:**

Using `combineLatest` directly can:

- Emit immediately with current values, not just changes
- Cause validation loops if you patch values in the subscription
  Fix: use `distinctUntilChanged()`, `auditTime()`, and ensure `patchValue({},{ emitEvent:false })` in loops.

---

### ❓ 83. Why is swallowing errors in an `HttpClient` observable with `catchError(() => of(null))` dangerous in Angular apps?

📝 **Answer:**

You convert a failure into a “valid” value (null), so:

- Interceptors / global error handlers might not run
- UI might treat `null` as legit data
  Better: rethrow or wrap errors in a domain model: `catchError(err => of({ error: true, err }))`.

---

### ❓ 84. Why can using `shareReplay(1)` on an `HttpClient` request cause memory leaks across route changes?

📝 **Answer:**

`shareReplay(1)` by default never completes the subject it holds and doesn’t reset on unsubscribe. If the source never completes or is hot, the replayed value sticks in memory. Use `shareReplay({ bufferSize: 1, refCount: true })` and ensure the source completes, or use `takeUntil(destroy$)` before `shareReplay`.

---

### ❓ 85. What’s the difference between using `switchMap` and `concatMap` on an `HttpClient` stream triggered by user input?

📝 **Answer:**

`switchMap`: cancels previous requests, good for typeahead search.
`concatMap`: ueues requests, ensures order, but user may wait for stale calls to finish. Choosing the wrong one can cause stale UI or unnecessary load.

---

### ❓ 86. Why is `this.route.params.subscribe(...)` in `ngOnInit` considered a code smell in Angular?

📝 **Answer:**

If you manually subscribe:

- You need manual unsubscribe
- Reused components across route changes can accumulate subscriptions
  Better: `this.route.params.pipe(takeUntil(destroy$))` or `this.route.params` via `async` pipe or `router.events` composition.

---

### ❓ 87. How can combining `ActivatedRoute` streams (`params`, `queryParams`, `data`) incorrectly lead to missed emissions?

📝 **Answer:**

Using `withLatestFrom` when you actually need continuous combination can mean some streams never emit until others emit first. For route state, `combineLatest` (with proper start values) usually reflects URL changes better.

---

### ❓ 88. Why is exposing `BehaviorSubject` directly from a service a design smell in Angular?

📝 **Answer:**

Consumers can emit directly, breaking encapsulation and invariants. Prefer exposing `asObservable()` or `readonly` signals/selectors, and keep writable subjects private.

---

### ❓ 89. In a global store using RxJS, why is using `Subject` for state updates instead of `BehaviorSubject` or `ReplaySubject(1)` problematic?

📝 **Answer:**

Late subscribers get no current value, only future ones, causing components to render with missing state. State should be replayable so components can bootstrap correctly.

---

### ❓ 91. Why is `takeUntilDestroyed()` (or `takeUntil(this.destroy$)`) not sufficient by itself to avoid all leaks?

📝 **Answer:**

It only handles subscription lifecycle, not:

- Globally shared hot observables that never complete
- Cached `shareReplay` values
- Manually created subjects kept in singletons
  You must still complete subjects and manage singleton caches.

---

### ❓ 92. In a `@Directive` using host listeners and RxJS streams, why can leaking subscriptions be especially nasty?

📝 **Answer:**

Directives attach to many elements, so each leaked subscription multiplies. Over time this can:

- Degrade performance
- Cause ghost event handling for removed elements
  You must always tie directive subscriptions to directive lifecycle (`takeUntilDestroyed`, `ngOnDestroy`).

---

### ❓ 93. Why do some RxJS operators behave differently in Angular tests vs. production, especially around timers?

📝 **Answer:**

Tests may use fakeAsync / Jasmine clock or `TestScheduler`, while production uses real timers. Operators like `debounceTime`, `delay`, `interval` rely on schedulers. Inconsistent use of `TestScheduler` or forgetting to flush fake timers leads to flaky tests.

---

### ❓ 94. How can using `observeOn(asyncScheduler)` inside Angular services unintentionally affect change detection?

📝 **Answer:**

It shifts emissions to microtask / macrotask queues that might not be inside Angular’s zone, or they might delay UI updates unexpectedly. Prefer Angular’s built-in async mechanisms or use `ngZone.run()` when using custom schedulers.

---

### ❓ 95. What’s tricky about using a custom RxJS operator that swallows errors inside Angular services?

📝 **Answer:**

If the operator `catchError`-s and returns a replacement observable:

- Callers may be unaware an error occurred
- Global interceptors / logging might not see it
  Better: log and rethrow or map to a typed “error state” instead of silently “healing” streams.

---

### ❓ 96. Why is writing a custom operator that internally subscribes (instead of returning a new observable) an anti-pattern in Angular?

📝 **Answer:**

Hidden `subscribe()`:

- Breaks pipeability
- Hides lifecycle from component/service
- Makes teardown impossible to control
  Custom operators should be pure functions returning new observables.

---

### ❓ 97. Why can using a single shared hot observable (e.g. via `share()` or a `Subject`) for both UI and side-effects cause race conditions?

📝 **Answer:**

Multiple subscribers may:

- Start listening at different times
- Depend on ordering of emissions
  Since hot observables are timing-sensitive, side-effects can run before UI is ready or vice versa. Use explicit pipelines for side-effects (e.g. `tap` + `subscribe` in a dedicated service) and keep UI streams deterministic.

---

### ❓ 98. Why can returning a non-completing observable from a resolver or canActivate guard break navigation?

📝 **Answer:**

Router waits for completion from guards/resolvers. If the observable never completes (e.g., a subject or `interval` without `take(1)`), navigation hangs forever. Always ensure guards/resolvers complete (e.g. `take(1)`, `first()`).

---

### ❓ 99. Why is `catchError(() => of(false))` in a `canActivate` guard dangerous?

📝 **Answer:**

It treats _all_ errors as “deny access”:

- Hides backend / network failures
- Makes debugging harder
- Better: log properly, show an error page, and return meaningful navigation decisions.

---

### ❓ 100. In an Angular application, we want to remove trailing and leading spaces from all user input fields. We want to avoid calling trim() in every component, and we don’t want to use directives or pipes that must be applied to each field individually. How would you design a centralized solution?

📝 **Answer:**

There are two approaches:

**Approach 1:**

If the application uses NgRx, sanitize the data inside the effect, before making the HTTP call.

```ts
saveUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(saveUser),
    map((action) => ({
      ...action,
      user: trimStringsDeep(action.user),
    })),
    switchMap((action) => this.userService.save(action.user))
  )
);
```

**Approach 2:**

If trimming is a generic requirement for all outgoing data, enforce it globally using an HTTP interceptor.

```ts
@Injectable()
export class TrimInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.body) {
      const sanitizedBody = trimStringsDeep(req.body);
      req = req.clone({ body: sanitizedBody });
    }
    return next.handle(req);
  }
}
```

```ts
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: TrimInterceptor, multi: true },
];
```

### ❓ 101. what is the main purpose of using ControlValueAccessor in angular?

📝 **Answer:**

In Angular, the **main purpose of using `ControlValueAccessor`** is to **connect a custom component to Angular Forms** so that it behaves like a native form control (`input`, `select`, etc.).

#### In simple terms

`ControlValueAccessor (CVA)` acts as a **bridge** between:

- **Angular Forms API** (`FormControl`, `ngModel`, validation, touched/dirty states)
- **Your custom UI component**

Without CVA, Angular **cannot read from or write to** your custom form component.

#### Why it exists

Angular forms expect every form control to know how to:

1. **Receive a value from the form**
2. **Notify the form when the value changes**
3. **Notify when the control is touched**
4. **Handle disabled state**

Native inputs already do this.
**Custom components do not — unless you implement `ControlValueAccessor`.**

#### What ControlValueAccessor enables

When you implement CVA, your component can:

- Work with **Reactive Forms**
- Work with **Template-driven Forms**
- Support:

  - `formControlName`
  - `formControl`
  - `ngModel`
  - Validators
  - `touched`, `dirty`, `disabled` states

#### Core methods and what they do

| Method                         | Purpose                                   |
| ------------------------------ | ----------------------------------------- |
| `writeValue(value)`            | Angular → Component (set value from form) |
| `registerOnChange(fn)`         | Component → Angular (notify value change) |
| `registerOnTouched(fn)`        | Component → Angular (mark as touched)     |
| `setDisabledState(isDisabled)` | Enable/disable control                    |

#### When you should use ControlValueAccessor

Use it **when building custom form components**, such as:

- Custom dropdowns
- Date pickers
- Toggle switches
- OTP inputs
- Rich text editors
- Multi-select components

If the component **accepts user input and should participate in a form**, CVA is the correct solution.

#### Example scenario

You create a `<custom-toggle>` component.

Without CVA ❌

```html
<custom-toggle formControlName="status"></custom-toggle>
```

➡️ Angular throws errors or doesn’t track value/state.

With CVA ✅

```html
<custom-toggle formControlName="status"></custom-toggle>
```

➡️ Works exactly like `<input type="checkbox">`

💻 **Code Example:**

#### 1️⃣ Custom Input Component (with ControlValueAccessor)

#### `custom-input.component.ts`

```ts
import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-custom-input",
  template: `
    <input [value]="value" (input)="onInput($event)" (blur)="onTouched()" />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  value: string = "";

  // Functions provided by Angular Forms
  private onChange = (value: any) => {};
  private onTouched = () => {};

  // Called when form sets a value
  writeValue(value: any): void {
    this.value = value;
  }

  // Register change callback
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register touched callback
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Handle user typing
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }
}
```

#### 2️⃣ Use it in a Reactive Form

##### `app.component.ts`

```ts
import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-root",
  template: `
    <form [formGroup]="form">
      <app-custom-input formControlName="name"></app-custom-input>
    </form>

    <p>Form Value: {{ form.value | json }}</p>
  `,
})
export class AppComponent {
  form = new FormGroup({
    name: new FormControl(""),
  });
}
```

#### Core rule (important)

> **Use `ControlValueAccessor` ONLY when the component _is a form control_.**

#### 1️⃣ Why do we add `NG_VALUE_ACCESSOR`?

#### What Angular Forms is looking for

When Angular sees this:

```html
<app-custom-input formControlName="name"></app-custom-input>
```

Angular asks internally:

> “Does this element know how to behave like a form control?”

It answers this by **looking in the component’s injector** for a provider with the token:

```ts
NG_VALUE_ACCESSOR;
```

👉 This token represents **“a thing that knows how to read/write form values.”**

#### What happens if you don’t provide it?

If you **implement `ControlValueAccessor` but don’t provide `NG_VALUE_ACCESSOR`**:

❌ Angular **will NOT use your component**
❌ You’ll get errors like:

```
No value accessor for form control with name 'name'
```

So:

> **Implementing the interface is not enough — you must register it.**

That’s why we add:

```ts
providers: [{
  provide: NG_VALUE_ACCESSOR,
  useExisting: ...
}]
```

#### 2️⃣ Why `useExisting`?

```ts
useExisting: forwardRef(() => CustomInputComponent);
```

This tells Angular:

> “Use **this component instance itself** as the value accessor.”

Not:

- a new instance
- not some service
- not a different class

Without `useExisting`, Angular would not know **which object actually implements CVA**.

#### 3️⃣ Why `forwardRef()`?

#### The problem

At the moment Angular processes `providers`, **the class is not fully defined yet**.

This would break:

```ts
useExisting: CustomInputComponent; // ❌ class not ready yet
```

#### The solution

`forwardRef()` delays the reference until runtime:

```ts
useExisting: forwardRef(() => CustomInputComponent);
```

Meaning:

> “I promise this class will exist later — trust me.”

This avoids circular dependency and load-order issues.

#### 4️⃣ Why `multi: true`? (VERY important)

#### What `NG_VALUE_ACCESSOR` actually is

`NG_VALUE_ACCESSOR` is a **multi-provider token**.

That means Angular expects:

```ts
NG_VALUE_ACCESSOR = [ accessor1, accessor2, accessor3, ... ]
```

Built-in Angular controls already register themselves:

- `input`
- `select`
- `textarea`
- `checkbox`

#### What happens if you omit `multi: true`?

If you write:

```ts
{
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomInputComponent)
  // ❌ multi missing
}
```

🚨 You will **overwrite Angular’s entire list of value accessors**.

This can:

- Break other form controls
- Cause unpredictable behavior
- Create hard-to-debug issues

So `multi: true` means:

> “Add my accessor to the list — don’t replace others.”
