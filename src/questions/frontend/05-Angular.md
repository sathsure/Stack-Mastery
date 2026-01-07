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
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
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

### ❓ 4. What is the difference between `ngOnInit` and the constructor in a component

📝 **Answer:**

**Constructor**

- Used to **create the component instance**
- Mainly for **dependency injection**
- Runs **before Angular initializes bindings**
- Should **NOT contain business logic or API calls**

```ts
constructor(private service: DataService) {
  // Dependency injection only
}
```

**ngOnInit**

- Lifecycle hook called **after Angular initializes all `@Input()` properties**
- Used for **component initialization logic**
- Ideal place for **API calls, subscriptions, default values**

```ts
ngOnInit() {
  this.loadData();
}
```

**Key Differences (One-line Points)**

| Constructor                     | ngOnInit                                 |
| ------------------------------- | ---------------------------------------- |
| Runs when class is instantiated | Runs after data-bound properties are set |
| Used for DI                     | Used for initialization logic            |
| Runs before `@Input()` values   | Has access to `@Input()` values          |
| Not a lifecycle hook            | Lifecycle hook                           |

---

### ❓ 5. Difference between `ngOnChanges` and `ngOnInit`?

📝 **Answer:**

**ngOnChanges**

- Called **every time an `@Input()` value changes**
- Runs **before `ngOnInit`** (on first change)
- Receives **previous and current values**
- Used to **react to input changes from parent**

```ts
@Input() userId!: number;

ngOnChanges(changes: SimpleChanges) {
  if (changes['userId']) {
    console.log('Previous:', changes['userId'].previousValue);
    console.log('Current:', changes['userId'].currentValue);
  }
}
```

**ngOnInit**

- Called **once after the first `ngOnChanges`**
- Used for **initial setup**
- Ideal for **API calls, subscriptions, initialization logic**

```ts
ngOnInit() {
  this.fetchUserData();
}
```

**Key Differences**

| ngOnChanges                     | ngOnInit                |
| ------------------------------- | ----------------------- |
| Runs on every `@Input()` change | Runs only once          |
| Gets `SimpleChanges` object     | No parameters           |
| Detects parent → child updates  | Initial setup only      |
| Can run multiple times          | Runs once per component |

**Execution Order**

```
constructor → ngOnChanges → ngOnInit
```

**When to Use What (One-liners)**

- Use **`ngOnChanges`** when:

  - Parent data changes dynamically
  - You must respond to input updates

- Use **`ngOnInit`** when:

  - Component loads for the first time
  - You need initial API calls or setup

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

---

### ❓ 7. What is `ViewChild` and when would you use it?

📝 **Answer:**

`@ViewChild` gives you a reference to a child component/directive or template element in the same view.  
You use it to interact with child APIs directly (e.g. focus, call methods).

---

### ❓ 8. Trick: Can you access a `@ViewChild` in the constructor?

📝 **Answer:**

No. It’s only reliably available in `ngAfterViewInit` (or later), not in the constructor.



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

### ❓ 25. Why was change detection considered problematic before signals were introduced?

📝 **Answer:**

Before signals, Angular relied heavily on zone-triggered global change detection.
This caused frequent re-checking of large component trees, even when only a small piece of data changed.

Developers had to manually optimize performance using OnPush, immutability, and manual change detection APIs.

---

### ❓ 26. How do Angular Signals change the way change detection works?

📝 **Answer:**

Signals introduce **fine-grained reactivity** into Angular.
Instead of scanning the component tree, Angular tracks which signals are read by which templates.

When a signal updates, Angular re-renders only the parts of the UI that depend on that signal, eliminating unnecessary checks.

---

### ❓ 27. How do signals know where input reference changes occur?

📝 **Answer:**

Signals track **access**, not references.

When a signal is read in a template, Angular records that dependency.
When the signal’s value is updated, Angular already knows exactly which views depend on it and updates only those views.

This removes the need for full tree traversal.

---

### ❓ 28. Do signals completely replace `zone.js` and traditional change detection?

📝 **Answer:**

No.
Signals reduce reliance on `zone.js`, but Angular can still use zones to detect external async events.

Signals also work in **zone-less Angular**, making change detection more predictable and easier to reason about.

---

### ❓ 29. How do signals improve performance compared to OnPush?

📝 **Answer:**

OnPush limits when components are checked, but Angular still walks parts of the component tree.
Signals skip the tree entirely and update only the exact reactive consumers, making them more precise and efficient.

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

### ❓ 33. Do signals rely on dirty checking like AngularJS?

📝 **Answer:**

No. Signals rely on dependency tracking, not repeated value comparisons.

---

### ❓ 34. Is change detection asynchronous because HTTP calls are async?

📝 **Answer:**

No. Change detection itself is synchronous, even though it is triggered by async events.

---

### ❓ 35. Can signals update the UI without scanning the component tree?

📝 **Answer:**

Yes. Signals update only the views that explicitly depend on them.

---

### ❓ 36. What are Angular signals (if you’ve used them)?

📝 **Answer:**

Signals are reactive primitives that hold a value and notify dependents when the value changes, offering a more explicit and fine-grained reactivity model than Zone-based change detection.

---

### ❓ 37. Trick: Does changing a signal value in a service automatically update all consuming components?

📝 **Answer:**

Yes, any computed views or effects using that signal re-run, updating the UI where it’s read.

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

A multi-provider allows multiple values for the same token (e.g. multiple `HTTP_INTERCEPTORS`). You declare `multi: true` in the provider.

---

### ❓ 41. Trick: If you provide the same service in a lazy-loaded module and in root, how many instances exist?

📝 **Answer:**

Two: one in the root injector, and a separate one in the lazy module’s injector.

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

### ❓ 90. When integrating RxJS with Angular’s signals (latest versions), what’s the subtle pitfall of using `toSignal(observable)` on a non-completing stream?

📝 **Answer:**

Non-completing streams are fine, but:

- If the observable never emits, the signal’s initial value may be undefined
- Without `initialValue`, templates may crash or show “undefined”
  Use `toSignal(obs, { initialValue })` or ensure a seed emission.

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
