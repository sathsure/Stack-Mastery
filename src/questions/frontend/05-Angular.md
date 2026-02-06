## Angular Basics & Architecture

### ❓ Can you explain what Angular is and how it differs from AngularJS?

### 📝 Answer

Angular is a TypeScript-based framework (2+) with component-based architecture, ahead-of-time compilation, RxJS, and modern tooling.  
AngularJS (1.x) is JavaScript-based, uses scopes/controllers, and a different change detection mechanism (dirty checking).

---

### ❓ What role does the Angular CLI play in Angular development?

### 📝 Answer

It scaffolds projects, generates code, builds/serves apps, runs tests and linting, and manages configurations.

---

### ❓ How do you configure different environments such as development, QA, and production in Angular?

### 📝 Answer

Through environment files and build configurations; or via runtime configuration (e.g. loading JSON config on startup).

---

## Components, Templates & Data Binding

### ❓ What types of data binding does Angular support?

### 📝 Answer

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

### ❓ What is the difference between components and directives in Angular?

### 📝 Answer

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

1️⃣ Is every component a directive?
Yes — every component is a directive with a template.

2️⃣ Can directives have lifecycle hooks?
Yes (`ngOnInit`, `ngOnChanges`, etc.)

3️⃣ Which directive manipulates DOM structure?
Structural directives like `*ngIf`, `*ngFor`

---

Below is a **complete interview-ready answer set** exactly in the structure you asked for, written in **simple, precise, managerial-round language**, with **trap clarity** (no vague statements).

I’ll reference **Angular** once for correctness.

---

### ❓ What is ViewEncapsulation in Angular?

### 📝 Answer

**ViewEncapsulation** in Angular controls **how component styles are scoped and applied to the DOM**.

🔹 Types of ViewEncapsulation

1️⃣ **Emulated (Default)**

- Angular simulates Shadow DOM behavior
- Adds **generated attributes** to elements and styles

```css
h1 {
  color: red;
}
```

Becomes:

```css
h1[_ngcontent-c0] {
  color: red;
}
```

**Key Points**

- Component styles are **scoped**
- No real Shadow DOM
- Best balance of isolation + compatibility

2️⃣ **None**

- No encapsulation at all
- Styles are **global**

```css
h1 {
  color: red;
}
```

**Key Points**

- Styles leak to entire app
- Risk of conflicts
- Useful for themes or layout styles

3️⃣ **ShadowDom**

- Uses **real browser Shadow DOM**
- Styles live inside a **shadow root**

**Key Points**

- True isolation
- Global styles cannot penetrate
- Styling must be intentional (variables, parts)

🤔 ❓ If two components use `h1 { color: red }`, will they conflict?

| Encapsulation | Conflict? |
| ------------- | --------- |
| Emulated      | ❌ No     |
| None          | ✅ Yes    |
| ShadowDom     | ❌ No     |

🤔 ❓ In Emulated, if I manually add the SAME selector with `_ngcontent-c0` in global CSS, will it override?

**✅ YES — it will override (based on load order).**

⚠️ **But this is unsafe** because `_ngcontent-c0` is **not stable**.

🤔 ❓ What are **all the ways** to override ShadowDom styles?

1. **CSS Custom Properties (Variables)** ✅ _(Recommended)_

```css
:root {
  --primary-color: red;
}
```

2. **`::part()`** (if component exposes it)

```css
my-comp::part(button) {
  color: red;
}
```

3. **`::slotted()`** (for projected content only)

🚫 You **cannot force override** Shadow DOM selectors.

🤔 ❓ Can `::ng-deep` override ShadowDom?

**NO. Never.**

**Why**

- `::ng-deep` breaks **Angular encapsulation**
- ShadowDom is enforced by the **browser**
- Angular cannot bypass browser isolation

🤔 ❓ Does `!important`/ **global styles** override ShadowDom?

**❌ No**

---

### ❓ What is the main use of `::ng-deep`?

### 📝 Answer

It Override styles of **child or third-party components** that use Emulated encapsulation.

Common use cases

- Angular Material overrides
- Third-party UI libraries
- Legacy component styling

| Fact                 | Status |
| -------------------- | ------ |
| Breaks encapsulation | ✅     |
| Deprecated           | ⚠️     |
| Still works          | ✅     |
| Works with ShadowDom | ❌     |

> `::ng-deep` is mainly a workaround for overriding third-party component styles when no proper theming API is available.

---

## Lifecycle Hooks

### ❓ What are Angular lifecycle hooks, and when are the most commonly used ones triggered?

### 📝 Answer

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

## Directives & Structural Directives

### ❓ How do `*ngIf` and `*ngFor` work conceptually in Angular?

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

### ❓ How do attribute directives work internally in Angular?

### 📝 Answer

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
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @Input("appHighlight") color!: string;

  ngOnInit() {
    this.renderer.setStyle(
      this.el.nativeElement,
      "backgroundColor",
      this.color,
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

### ❓ Why is `trackBy` important when rendering lists using `*ngFor`?

### 📝 Answer

It helps Angular identify items uniquely, so it reuses DOM elements instead of destroying/recreating them, improving performance on large lists.

---

### ❓ What happens internally if you mutate an array used in `*ngFor` without using `trackBy`?

### 📝 Answer

Angular may re-render many list items unnecessarily, causing poor performance.

---

## Modules & Standalone APIs

### ❓ How do standalone components differ from NgModules, and when would you choose one over the other?

### 📝 Answer

NgModules group related code (components, directives, pipes, services) into cohesive blocks; components control views and handle UI logic.
Standalone components can be used without declaring them in an NgModule. They reduce boilerplate and make lazy-loading, code-splitting, and feature isolation easier.

---

## View & DOM Interaction

### ❓ What is `@ViewChild`, and in what scenarios would you use it?

### 📝 Answer

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

### ❓ Why is direct DOM manipulation using `ElementRef` discouraged, and how does `Renderer2` help?

### 📝 Answer

Directly accessing the DOM through `ElementRef` can expose the application to security risks such as XSS attacks and tightly couples the code to the browser DOM.  
`Renderer2` provides a safe, abstraction-based, and platform-independent way to manipulate the DOM that works across environments like server-side rendering and Web Workers.

**What Renderer2 Is Doing Internally**

- Angular does not touch the DOM directly
- Renderer2 acts as an abstraction layer
- Angular decides how and where the DOM should be updated
- This keeps the app secure and platform-independent

---

## Pipes

### ❓ What are Angular pipes, and what is the difference between pure and impure pipes?

### 📝 Answer

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

### ❓ Why are pure pipes preferred in most real-world Angular applications?

### 📝 Answer

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

### ❓ When would you use an impure pipe, and what performance risks does it introduce?

### 📝 Answer

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

### ❓ How do you create a custom pipe, and how does Angular execute it?

### 📝 Answer

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

### ❓ Should pipes perform async operations or API calls, and why?

### 📝 Answer

No.
Pipes must be synchronous and side-effect free.
Async logic should be handled in services or Observables using the `async` pipe.

```html
{{ users$ | async }}
```

---

### ❓ Is the `async` pipe pure or impure, and why is it considered safe?

### 📝 Answer

**AsyncPipe** is an impure pipe. Angular marks it as pure: false because it must react to Observable or Promise emissions that occur without reference changes.

🧠 Why AsyncPipe MUST be impure (key reasoning)

```html
{{ users$ | async }}
```

```ts
users$ = this.userService.getUsers(); // Observable
```

What happens:

- users$ reference never changes
- Observable emits values over time
- Angular change detection does not know when the emission happens

If **AsyncPipe** were pure:
❌ It would run only once
❌ UI would never update

So Angular makes it impure so it can:

- Stay subscribed
- Detect emissions
- Trigger view updates

---

## Dependency Injection (DI)

### ❓ How does Angular’s dependency injection system and hierarchy work?

### 📝 Answer

Providers can be registered in modules, components, or via `providedIn`. The injector tree mirrors the component/module tree; a child injector falls back to parent injectors when resolving dependencies.

---

### ❓ What is the difference between `providedIn: 'root'` and `providedIn: 'any'`?

### 📝 Answer

**providedIn: 'root'** - registers the service in the application's main root injector, creating a single, singleton instance shared by all modules (eagerly and lazy loaded) throughout the entire application.

**providedIn: 'any'** - ensures that all eagerly loaded modules share a single instance, but each lazy-loaded module gets its own unique instance of the service.

---

### ❓ What is a multi-provider, and when would you use one?

### 📝 Answer

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

### ❓ What are injection tokens, and why are they required in Angular?

### 📝 Answer

`InjectionToken` is used to inject values that don’t have a class type (e.g. config objects, interfaces). It provides a DI key for non-class dependencies.

---

### ❓ In which scenarios is a service not a singleton in Angular?

### 📝 Answer

When it’s provided in a component or in a lazy-loaded module, rather than in root; then each component/module gets its own instance.

---

### ❓ If a service is provided in both the root injector and a lazy-loaded module, how many instances are created?

### 📝 Answer

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

## Routing

### ❓ What are the core concepts of Angular routing?

### 📝 Answer

Routes config, router outlet, routerLink/routerLinkActive, route guards, lazy loading, resolvers, `ActivatedRoute`.

---

### ❓ What are route guards, and what types does Angular provide?

### 📝 Answer

Guards control navigation. Types: `CanActivate`, `CanDeactivate`, `Resolve`, `CanLoad` / `CanMatch`, etc.

---

### ❓ What is the difference between `CanActivate`, `CanLoad`, and `CanMatch`?

### 📝 Answer

`CanActivate` runs after module is loaded to allow/deny activation. `CanLoad`/`CanMatch` runs before loading, preventing the lazy module bundle from being loaded if not allowed.

---

### ❓ How do you configure lazy-loaded modules or routes in Angular?

### 📝 Answer

Lazy-loaded routes use dynamic imports in route config (e.g. `loadChildren:` or standalone `loadComponent`), so code is loaded on demand.

---

### ❓ What happens to service instances provided in a lazy-loaded route?

### 📝 Answer

No. That service instance is scoped to that lazy module’s injector (unless explicitly provided at root).

---

### ❓ How do you access route parameters and query parameters in Angular?

### 📝 Answer

Using `ActivatedRoute`: `route.paramMap`, `route.snapshot.paramMap`, `route.queryParamMap`, etc.

---

### ❓ Why can returning a non-completing observable from a resolver or canActivate guard break navigation?

### 📝 Answer

Router waits for completion from guards/resolvers. If the observable never completes (e.g., a subject or `interval` without `take(1)`), navigation hangs forever. Always ensure guards/resolvers complete (e.g. `take(1)`, `first()`).

---

### ❓ Why is `catchError(() => of(false))` in a `canActivate` guard dangerous?

### 📝 Answer

It treats _all_ errors as deny access:

- Hides backend / network failures
- Makes debugging harder
- Better: log properly, show an error page, and return meaningful navigation decisions.

---

## Change Detection & Zones

### ❓ How does Angular’s change detection mechanism work, and how did it evolve from AngularJS?

### 📝 Answer

Angular’s change detection is responsible for keeping the UI synchronized with application data.
In **AngularJS**, this was done using a **digest cycle** that relied on dirty checking and repeatedly compared old and new values until the system stabilized. This approach worked but became slow as applications grew.

Modern Angular replaced this with a **unidirectional, tree-based change detection system**, which checks components from the root downward and updates only what is necessary.

---

### ❓ What role does `zone.js` play, and how does `NgZone` interact with it?

### 📝 Answer

`zone.js` patches asynchronous browser APIs such as timers, HTTP calls, and DOM events to detect when asynchronous work completes.
`NgZone` uses this information to decide **when Angular should run change detection**.

When an async task finishes, `NgZone` re-enters Angular’s zone and triggers change detection, ensuring UI updates happen automatically without manual wiring.

---

### ❓ What happens internally during a single change detection cycle?

### 📝 Answer

During a change detection cycle, Angular starts from the root component and traverses the component tree.
For each component, Angular evaluates template expressions, compares current values with previous values, and updates the DOM only when differences are found.

This process is synchronous and deterministic, which makes it predictable but potentially expensive if triggered too often.

---

### ❓ How does Angular traverse the component tree, and why does this impact performance?

### 📝 Answer

Angular organizes the application into a **component tree**.
Change detection always starts at the root and proceeds top-down through parent and child components.

If many components are checked unnecessarily, performance degrades, which is why limiting change detection is critical in large applications.

---

### ❓ What change detection strategies does Angular support, and how do they differ?

### 📝 Answer

Angular provides **Default** and **OnPush** strategies.

The **Default strategy** runs change detection on a component whenever any async event occurs.
The **OnPush strategy** runs change detection only when input references change, an event originates from the component, or an observable emits via the async pipe.

OnPush encourages immutable data patterns and significantly improves performance.

---

### ❓ Does OnPush mean change detection never runs?

### 📝 Answer

No. OnPush limits when detection runs, but it still executes when inputs change or events occur.

---

### ❓ Why does mutating an object fail to trigger UI updates in `OnPush` components?

### 📝 Answer

No. OnPush relies on reference changes, so mutations do not trigger change detection.

---

### ❓ If no async event happens, will Angular still run change detection?

### 📝 Answer

No. Change detection is triggered only by events detected by Angular, such as async operations, user actions, or manual triggers.

---

### ❓ Is Angular’s change detection asynchronous just because HTTP calls are async?

### 📝 Answer

No. Change detection itself is synchronous, even though it is triggered by async events.

---

### ❓ Why was Angular’s change detection considered problematic before signals were introduced?

### 📝 Answer

Before signals, Angular relied heavily on zone-triggered global change detection.
This caused frequent re-checking of large component trees, even when only a small piece of data changed.

Developers had to manually optimize performance using OnPush, immutability, and manual change detection APIs.

Signals introduce **fine-grained reactivity** into Angular.
Instead of scanning the component tree, Angular tracks which signals are read by which templates.

When a signal updates, Angular re-renders only the parts of the UI that depend on that signal, eliminating unnecessary checks.

---

### ❓ Do signals completely replace `zone.js` and traditional change detection?

### 📝 Answer

No.
Signals reduce reliance on `zone.js`, but Angular can still use zones to detect external async events.

Signals also work in **zone-less Angular**, making change detection more predictable and easier to reason about.

---

### ❓ What is `ngZone: 'noop'` mode and when might you use it?

### 📝 Answer

It disables Zone.js-based auto change detection. You then trigger detection manually; useful for high-performance use cases or integrating with other reactive systems.

---

### ❓ Why can subscribing to a hot observable (e.g. `Subject`) in a non-Angular callback fail to trigger change detection, and how do you fix it?

### 📝 Answer

Because the callback can run outside Zone.js, Angular doesn’t know a value changed. Wrap emission or subscription in `ngZone.run(...)`, or use APIs that are zone-aware (e.g. HttpClient, Router) or `ɵZoneScheduler`-based schedulers.

---

### ❓ In Angular’s `OnPush` component, why can updating a field inside a subscription not update the UI, and what’s the correct pattern?

### 📝 Answer

OnPush checks on input changes, events, and async pipe emissions. If you mutate fields imperatively without async pipe or manual `markForCheck()`, the view may not update. Prefer exposing observables to the template and using `async` pipe.

---

### ❓ How can using `observeOn(asyncScheduler)` inside Angular services unintentionally affect change detection?

### 📝 Answer

It shifts emissions to microtask / macrotask queues that might not be inside Angular’s zone, or they might delay UI updates unexpectedly. Prefer Angular’s built-in async mechanisms or use `ngZone.run()` when using custom schedulers.

---

## Forms

### ❓ Differences between template-driven and reactive forms?

### 📝 Answer

Template-driven: form logic in template, simpler, uses `ngModel`. Reactive: form model in TypeScript, more explicit, scalable, and testable using `FormGroup`, `FormControl`, `FormArray`.

---

### ❓ What are `FormGroup` and `FormControl`?

### 📝 Answer

`FormControl` represents a single value and validation state. `FormGroup` is a collection of controls, acting like an object model.

---

### ❓ Why is using `[(ngModel)]` with reactive forms generally discouraged?

### 📝 Answer

It mixes paradigms and can cause confusion and unexpected behavior. You should stick to one approach, usually reactive forms for complex forms.

---

### ❓ How do you create a custom form control compatible with Angular forms?

### 📝 Answer

Implement `ControlValueAccessor` and optionally `Validator` to integrate with the forms API and be used with `formControlName`/`ngModel`.

---

### ❓ what is the main purpose of using ControlValueAccessor in angular?

### 📝 Answer

In Angular, the **main purpose of using `ControlValueAccessor`** is to **connect a custom component to Angular Forms** so that it behaves like a native form control (`input`, `select`, etc.).

`ControlValueAccessor (CVA)` acts as a **bridge** between:

- **Angular Forms API** (`FormControl`, `ngModel`, validation, touched/dirty states)
- **Your custom UI component**

Without CVA, Angular **cannot read from or write to** your custom form component.

Angular forms expect every form control to know how to:

1. **Receive a value from the form**
2. **Notify the form when the value changes**
3. **Notify when the control is touched**
4. **Handle disabled state**

Native inputs already do this.
**Custom components do not — unless you implement `ControlValueAccessor`.**

When you implement CVA, your component can:

- Work with **Reactive Forms**
- Work with **Template-driven Forms**
- Support:
  - `formControlName`
  - `formControl`
  - `ngModel`
  - Validators
  - `touched`, `dirty`, `disabled` states

| Method                         | Purpose                                   |
| ------------------------------ | ----------------------------------------- |
| `writeValue(value)`            | Angular → Component (set value from form) |
| `registerOnChange(fn)`         | Component → Angular (notify value change) |
| `registerOnTouched(fn)`        | Component → Angular (mark as touched)     |
| `setDisabledState(isDisabled)` | Enable/disable control                    |

Use it **when building custom form components**, such as:

- Custom dropdowns
- Date pickers
- Toggle switches
- OTP inputs
- Rich text editors
- Multi-select components

If the component **accepts user input and should participate in a form**, CVA is the correct solution.

💡 Example

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

💻 **Code Example**

1. Custom Input Component (with ControlValueAccessor)

**`custom-input.component.ts`**

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

2. Use it in a Reactive Form

`app.component.ts`

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

**Core rule (important)**

> **Use `ControlValueAccessor` ONLY when the component _is a form control_.**

1️⃣ Why do we add `NG_VALUE_ACCESSOR`?

When Angular sees this:

```html
<app-custom-input formControlName="name"></app-custom-input>
```

Angular asks internally:

> Does this element know how to behave like a form control?

It answers this by **looking in the component’s injector** for a provider with the token:

```ts
NG_VALUE_ACCESSOR;
```

👉 This token represents **a thing that knows how to read/write form values.**

2️⃣ What happens if you don’t provide it?

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

3️⃣ Why `useExisting`?

```ts
useExisting: forwardRef(() => CustomInputComponent);
```

This tells Angular:

> Use **this component instance itself** as the value accessor.

Not:

- a new instance
- not some service
- not a different class

Without `useExisting`, Angular would not know **which object actually implements CVA**.

4️⃣ Why `forwardRef()`?

At the moment Angular processes `providers`, **the class is not fully defined yet**.

This would break:

```ts
useExisting: CustomInputComponent; // ❌ class not ready yet
```

✅ Solution

`forwardRef()` delays the reference until runtime:

```ts
useExisting: forwardRef(() => CustomInputComponent);
```

Meaning:

> I promise this class will exist later — trust me.

This avoids circular dependency and load-order issues.

5️⃣ Why `multi: true`? (VERY important)

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

6️⃣ What happens if you omit `multi: true`?

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

> Add my accessor to the list — don’t replace others.

---

### ❓ How would you globally trim leading and trailing spaces from user input fields in Angular?

### 📝 Answer

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
    switchMap((action) => this.userService.save(action.user)),
  ),
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

---

### ❓ Why is using `valueChanges.pipe(debounceTime(...)).subscribe(...)` for autocomplete sometimes problematic?

### 📝 Answer

If you forget to unsubscribe, you leak subscriptions across component recreations. Also, ignoring `distinctUntilChanged()` can cause redundant server calls; ignoring `switchMap` can cause out-of-order responses and stale UI.

---

### ❓ In reactive forms, how can combining `valueChanges` of multiple controls lead to subtle bugs?

### 📝 Answer

Using `combineLatest` directly can:

- Emit immediately with current values, not just changes
- Cause validation loops if you patch values in the subscription
  Fix: use `distinctUntilChanged()`, `auditTime()`, and ensure `patchValue({},{ emitEvent:false })` in loops.

---

## HTTP & RxJS

### ❓ What is `HttpClient`, and how is it better than the old `Http` module?

### 📝 Answer

`HttpClient` returns typed, observable responses, handles JSON automatically, supports interceptors, easier configuration.

---

### ❓ What are HTTP interceptors used for?

### 📝 Answer

To inspect/modify requests and responses globally (e.g. auth headers, logging, error handling, retries).

---

### ❓ In what order are multiple HTTP interceptors executed?

### 📝 Answer

They execute in the order they are provided for outgoing requests, and in reverse order for incoming responses.

---

### ❓ Is the `async` pipe always a complete replacement for manual unsubscription?

### 📝 Answer

Only in templates. Subscriptions created in code (e.g. in `ngOnInit`) must still be manually managed/unsubscribed.

---

### ❓ Why is subscribing to `ActivatedRoute.params` inside `ngOnInit` considered a code smell?

### 📝 Answer

If you manually subscribe:

- You need manual unsubscribe
- Reused components across route changes can accumulate subscriptions
  Better: `this.route.params.pipe(takeUntil(destroy$))` or `this.route.params` via `async` pipe or `router.events` composition.

---

### ❓ Why is exposing a `BehaviorSubject` directly from a service considered a design smell?

### 📝 Answer

Consumers can emit directly, breaking encapsulation and invariants. Prefer exposing `asObservable()` or `readonly` signals/selectors, and keep writable subjects private.

---

### ❓ Why can using `shareReplay(1)` on an `HttpClient` request cause memory leaks across route changes?

### 📝 Answer

`shareReplay(1)` by default never completes the subject it holds and doesn’t reset on unsubscribe. If the source never completes or is hot, the replayed value sticks in memory. Use `shareReplay({ bufferSize: 1, refCount: true })` and ensure the source completes, or use `takeUntil(destroy$)` before `shareReplay`.

---

### ❓ Why is swallowing errors in an `HttpClient` observable with `catchError(() => of(null))` dangerous in Angular apps?

### 📝 Answer

You convert a failure into a valid value (null), so:

- Interceptors / global error handlers might not run
- UI might treat `null` as legit data
  Better: rethrow or wrap errors in a domain model: `catchError(err => of({ error: true, err }))`.

---

### ❓ Why is `takeUntilDestroyed()` (or `takeUntil(this.destroy$)`) not sufficient by itself to avoid all leaks?

### 📝 Answer

It only handles subscription lifecycle, not:

- Globally shared hot observables that never complete
- Cached `shareReplay` values
- Manually created subjects kept in singletons
  You must still complete subjects and manage singleton caches.

---

### ❓ How do you handle global HTTP errors?

### 📝 Answer

Use an interceptor to catch errors in `catchError`, and possibly a global error handler (`ErrorHandler`) for non-HTTP errors.

---

### ❓ How do you avoid multiple HTTP calls when multiple subscribers listen to the same Observable?

### 📝 Answer

Use sharing operators like `shareReplay` or convert to a signal/store, or cache results in services.

---

### ❓ What’s the difference between using `switchMap` and `concatMap` on an `HttpClient` stream triggered by user input?

### 📝 Answer

`switchMap`: cancels previous requests, good for typeahead search.
`concatMap`: ueues requests, ensures order, but user may wait for stale calls to finish. Choosing the wrong one can cause stale UI or unnecessary load.

---

### ❓ How can combining `ActivatedRoute` streams (`params`, `queryParams`, `data`) incorrectly lead to missed emissions?

### 📝 Answer

Using `withLatestFrom` when you actually need continuous combination can mean some streams never emit until others emit first. For route state, `combineLatest` (with proper start values) usually reflects URL changes better.

---

### ❓ In a global store using RxJS, why is using `Subject` for state updates instead of `BehaviorSubject` or `ReplaySubject(1)` problematic?

### 📝 Answer

Late subscribers get no current value, only future ones, causing components to render with missing state. State should be replayable so components can bootstrap correctly.

---

### ❓ In a `@Directive` using host listeners and RxJS streams, why can leaking subscriptions be especially nasty?

### 📝 Answer

Directives attach to many elements, so each leaked subscription multiplies. Over time this can:

- Degrade performance
- Cause ghost event handling for removed elements
  You must always tie directive subscriptions to directive lifecycle (`takeUntilDestroyed`, `ngOnDestroy`).

---

### ❓ Why do some RxJS operators behave differently in Angular tests vs. production, especially around timers?

### 📝 Answer

Tests may use fakeAsync / Jasmine clock or `TestScheduler`, while production uses real timers. Operators like `debounceTime`, `delay`, `interval` rely on schedulers. Inconsistent use of `TestScheduler` or forgetting to flush fake timers leads to flaky tests.

---

### ❓ Why can using a single shared hot observable (e.g. via `share()` or a `Subject`) for both UI and side-effects cause race conditions?

### 📝 Answer

Multiple subscribers may:

- Start listening at different times
- Depend on ordering of emissions
  Since hot observables are timing-sensitive, side-effects can run before UI is ready or vice versa. Use explicit pipelines for side-effects (e.g. `tap` + `subscribe` in a dedicated service) and keep UI streams deterministic.

---

## Performance & Architecture

### ❓ What techniques do you use to optimize Angular application performance?

### 📝 Answer

`OnPush` change detection, trackBy in `*ngFor`, lazy loading routes/components, preloading strategies, pure pipes, avoiding heavy work in templates, memoization, CDRef control.

---

### ❓ How would you analyze and debug performance issues in a large Angular application?

### 📝 Answer

Use Angular DevTools, browser performance profiler, change detection profiling, logging of lifecycle hooks, and analyzing network/bundle size.

---

### ❓ How do smart vs dumb (container vs presentational) components help in Angular architecture?

### 📝 Answer

Smart components handle data fetching and state; dumb components focus on UI and inputs/outputs. This improves reusability and testability.

---

### ❓ What Angular anti-patterns do you actively watch out for?

### 📝 Answer

Business logic in components instead of services, massive god components, heavy logic in templates, subscriptions without unsubscribe, using `any` everywhere, too many global singletons.

---

### ❓ How do you usually handle application-wide state in Angular?

### 📝 Answer

Options: services with RxJS (BehaviorSubject, signals), NgRx, Akita, NGXS, or custom state management patterns.

---

### ❓ When would you prefer NgRx over simple services with subjects/signals?

### 📝 Answer

For large, complex apps that need predictable, testable state changes, time-travel debugging, and strict one-way data flow.

---

### ❓ What is AOT compilation and why is it useful?

### 📝 Answer

Ahead-of-time compiles Angular templates during build, reducing bundle size, catching template errors early, and improving startup time.

---

### ❓ How do you structure a large Angular project?

### 📝 Answer

By domain/feature modules or feature folders, shared/core modules, clear layering (components → services → data layer), consistent naming, and enforcing boundaries.

---

### ❓ Is binding to `[innerHTML]` always safe?

### 📝 Answer

No. It’s a common XSS vector if you bind untrusted input. Only use with sanitized/trusted content.

Here is a **clean, well-organized, interview-ready Markdown**, rewritten exactly as you asked — with the question starting from **Consider the below scenario, what will be the output**, and a crisp, logical answer.

---

## Angular Universal (SSR) & Rendering

### ❓ What is Angular Universal?

### 📝 Answer

A solution for server-side rendering (SSR) Angular apps to improve first paint and SEO for crawlers.

---

### ❓ What is hydration in Angular?

### 📝 Answer

The process of reusing server-rendered DOM on the client and wiring it up to Angular, reducing re-rendering on startup.

---

### ❓ Why might you still need `meta` tags service even with SSR?

### 📝 Answer

Dynamic pages or client-side navigation need meta tags updated after initial load for social previews and some crawlers.

---

### ❓ Consider the below scenario. What will be the output?

### 📝 Answer

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

## Angular Build System

### ❓ Explain Angular Building Tools?

### 📝 Answer

1️⃣ Big Picture (one-line)

**Bundler** + **Dev Server** + **Compiler** + **Change Detection** + **Reload strategy** together define how your app is built, served, updated, and rendered during development and production.

2️⃣ Bundlers & Dev Servers

🔹 Webpack

1. **Webpack Bundler** - Takes your JS/TS/CSS/assets and Bundles them into optimized files

2. **Webpack Dev Server** - Runs a local server (Reloads or updates browser)

> 📌 Used heavily by Angular (pre-v17)

🔹 Vite

1. **Vite Dev Server** - Uses native ES modules and Starts instantly (no full bundle on startup)

2. **Vite Bundler** - Vite uses **esbuild** for fast transformations and dependency pre-bundling during development, and uses **Rollup** internally for production builds.

> **esbuild** (primary) + **Rollup** (final optimizations)
> 📌 Used by Angular v17+

```sql
Angular 8  → View Engine + Webpack
Angular 9  → Ivy + Webpack
Angular 16 → Ivy + esbuild (partial)
Angular 17+→ Ivy + Vite + esbuild
Angular 19 → Ivy + Vite + esbuild + Rollup
```

3️⃣ Angular Rendering Engines (Compilers)

🔹 View Engine (OLD ❌) - Used before Angular 9
🔹 Ivy Compiler (CURRENT ✅) - Used Angular 9 → present

🔹 JIT (Just-In-Time) - Compilation happens in browser
🔹 AOT (Ahead-Of-Time) - Compilation happens during build

4️⃣ Comparison: View Engine vs Ivy

| Feature         | View Engine | Ivy          |
| --------------- | ----------- | ------------ |
| AOT             | ✅          | ✅           |
| JIT             | ✅          | ✅           |
| Tree-shaking    | ❌ Poor     | ✅ Excellent |
| Build speed     | ❌ Slower   | ✅ Faster    |
| Bundle size     | ❌ Larger   | ✅ Smaller   |
| Debugging       | ❌ Hard     | ✅ Easier    |
| Future features | ❌ No       | ✅ Yes       |

5️⃣ Hot Module Replacement (HMR)

🔹 What is HMR?

- Update code without full page reload
- Keeps app state (forms, data)

🔹 Who supports it?

| Tool               | HMR               |
| ------------------ | ----------------- |
| Webpack Dev Server | Yes               |
| Vite Dev Server    | Yes (much faster) |

🔹 What happens when you change a file?

- Webpack
  - Webpack rebuilds the dependency graph
  - A new bundle or chunk is created
  - Webpack Dev Server pushes updates via WebSocket
  - Browser replaces the affected module

- Vite
  - File is already an ES module
  - Vite sends only that module
  - Browser updates without rebundling

6️⃣ How Everything Connects (Simple Flow)

🧠 Old Angular Setup (Before v17)

```arduino
Code → Ivy Compiler
     → Webpack Bundler
     → Webpack Dev Server
     → Browser
```

🚀 Modern Angular Setup (v17+)

```arduino
Code → Ivy Compiler
     → Vite Dev Server (dev)
     → Rollup (prod bundling)
     → Browser
```

7️⃣ How Compiler and Bundler work together?

- Ivy compiler runs first
- Ivy converts this into:
  ✔ Templates compiled
  ✔ Decorators removed
  ✔ Angular instructions generated
  ➡️ Output is pure JavaScript
- esbuild runs next
- esbuild now:
  ✔ Bundles this JS with other JS and TS.
  ✔ Removes unused code
  ✔ Splits chunks
  ✔ Optimizes imports
  ➡️ Produces final JS files for browser

> 📌 Ivy understands Angular and templates
> 📌 HTML disappears after Ivy runs
> 📌 esbuild does not understand Angular decorators

❓ Webpack vs Vite
👉 Vite is faster because it doesn’t bundle everything upfront.

❓ Ivy vs View Engine
👉 Ivy is faster, smaller, and more flexible.

❓ AOT vs JIT
👉 AOT for production, JIT for development.

❓ Dirty checking
👉 Angular checks bindings on every change detection cycle.

❓ HMR
👉 Updates modules without reloading the page.

---

## Unit Testing

### ❓ Difference between Jasmine and Jest?

### 📝 Answer

**Jasmine** → Test framework (how you write tests)
**Karma** → Test runner (where & how tests run)
**Jest** → All-in-one testing tool (framework + runner)

> 👉 Jasmine + Karma = what Jest already gives you

---

### ❓ What is a spy in unit testing?

### 📝 Answer

A spy tracks calls to functions, arguments, and return values without executing the real implementation.

```ts
spyOn(service, "getData").and.returnValue(of([]));
```

- `spyOn()` – Spy on existing method
- `createSpy()` – Standalone spy
- `createSpyObj()` – Mock object with multiple methods

### ❓ Can we test private methods in Angular?

### 📝 Answer

Private methods should be tested indirectly through public methods.

```ts
(component as any).privateMethod();
```

- **TypeScript** private is **Compile-Time Only**
- **JavaScript** has **no private keyword**. The method still exists on the object

### ❓ What is Cypress?

### 📝 Answer

Cypress is an end-to-end testing framework that:

- Runs tests in a real browser
- Simulates real user behavior
- Is faster and more reliable than Protractor
