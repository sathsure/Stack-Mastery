## Angular Basics & Architecture

### ❓ Can you explain what Angular is and how it differs from AngularJS?

### 📝 Answer

Angular is a TypeScript-based framework (2+) with component-based architecture, ahead-of-time compilation, RxJS, and modern tooling.  
AngularJS (1.x) is JavaScript-based, uses scopes/controllers, and a different change detection mechanism (dirty checking).

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

## Directives

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
When a component requests a dependency using a token (often an `InjectionToken`), Angular checks for providers with multi: true. If found, it injects an array containing all registered values/classes, not just the last one.

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

### ❓ How do you access route parameters and query parameters in Angular?

### 📝 Answer

Using `ActivatedRoute`: `route.paramMap`, `route.snapshot.paramMap`, `route.queryParamMap`, etc.

---

## Angular Forms

### ❓ Differences between template-driven and reactive forms?

### 📝 Answer

Template-driven: form logic in template, simpler, uses `ngModel`. Reactive: form model in TypeScript, more explicit, scalable, and testable using `FormGroup`, `FormControl`, `FormArray`.

---

### ❓ What happens when we use `[(ngModel)]` in Reactive forms?

### 📝 Answer

It mixes paradigms and can cause confusion and unexpected behavior. You should stick to one approach, usually reactive forms for complex forms.

---

### ❓ How do you create a custom form control in Angular forms?

### 📝 Answer

In Angular, we can implement by using `ControlValueAccessor`

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
