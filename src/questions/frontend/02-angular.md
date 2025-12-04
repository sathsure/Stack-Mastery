## 1. Architecture & Core Concepts

**1. What is Angular, and how is it different from AngularJS?**

**Answer:**  
Angular is a TypeScript-based framework (2+) with component-based architecture, ahead-of-time compilation, RxJS, and modern tooling; AngularJS (1.x) is JavaScript-based, uses scopes/controllers, and a different change detection mechanism (dirty checking).

**2. Explain the role of NgModules vs Components.**

**Answer:**  
NgModules group related code (components, directives, pipes, services) into cohesive blocks; components control views and handle UI logic. With standalone APIs, modules are optional for many scenarios, but still exist for features like `RouterModule`.

**3. What are standalone components? Why were they introduced?**

**Answer:**  
Standalone components can be used without declaring them in an NgModule. They reduce boilerplate and make lazy-loading, code-splitting, and feature isolation easier.

**4. What is a feature module and why would you use it?**

**Answer:**  
A feature module encapsulates a specific domain/feature (e.g. `UserModule`). It helps with organization, reusability, and lazy loading.

**5. What are the main building blocks of an Angular application?**

**Answer:**  
Modules, components, templates, metadata, services, dependency injection, directives, pipes, and routing.

---

## 2. Components, Templates & Data Binding

**6. What are the different types of data binding in Angular?**

**Answer:**  
Interpolation (`{{ }}`), property binding (`[prop]`), event binding (`(event)`), and two-way binding (`[(ngModel)]`, or custom via `@Input` + `@Output`).

**7. How do you implement a custom two-way binding for a component?**

**Answer:**  
Use an `@Input()` property like `value` and an `@Output()` EventEmitter like `valueChange`. The parent uses `[(value)]="someVar"`.

**8. What is the difference between `ngOnInit` and the constructor in a component?**

**Answer:**  
Constructor is for basic initialization and DI. `ngOnInit` is part of Angular’s lifecycle and is called after inputs are resolved and the first `ngOnChanges` runs.

**9. How do you pass data from parent to child and child to parent?**

**Answer:**  
Parent to child: `@Input()` properties. Child to parent: `@Output()` EventEmitters.

**10. What is `ViewChild` and when would you use it?**

**Answer:**  
`@ViewChild` gives you a reference to a child component/directive or template element in the same view. You use it to interact with child APIs directly (e.g. focus, call methods).

**11. Trick: Can you access a `@ViewChild` in the constructor?**

**Answer:**  
No. It’s only reliably available in `ngAfterViewInit` (or later), not in the constructor.

---

## 3. Directives & Pipes

**12. Difference between components and directives?**

**Answer:**  
A component is a directive with a template. Directives without templates are used to modify behavior/appearance of existing elements.

**13. What’s the difference between structural and attribute directives?**

**Answer:**  
Structural directives change the DOM layout (`*ngIf`, `*ngFor`). Attribute directives change appearance/behavior of an existing element (`ngClass`, `ngStyle`, custom ones).

**14. Why is there an asterisk in `*ngIf` or `*ngFor`?**

**Answer:**  
It’s syntactic sugar for using `<ng-template>`; Angular desugars it into an underlying template structure.

**15. What is a pure pipe vs impure pipe?**

**Answer:**  
Pure pipes run only when input references change. Impure pipes run on every change detection cycle; they can handle mutable data but impact performance.

**16. Trick: Why is using an impure pipe on large lists risky?**

**Answer:**  
Because it executes on every change detection run and can dramatically slow rendering.

---

## 4. Change Detection, Zones & Signals

**17. Explain Angular’s change detection mechanism.**

**Answer:**  
Angular walks the component tree and checks bindings. By default, `Zone.js` patches async APIs to know when to trigger change detection.

**18. What is the difference between `ChangeDetectionStrategy.Default` and `OnPush`?**

**Answer:**  
`Default` runs change detection for a component whenever any ancestor runs. `OnPush` only checks when input references change, an event originates in the component, or Observable/Promise emits via async pipe, etc.

**19. Trick: In an `OnPush` component, will mutating an array (e.g. `arr.push()`) trigger a view update?**

**Answer:**  
Not automatically. You must provide a new reference (e.g. `arr = [...arr, newItem]`) or manually mark for check.

**20. What is `ChangeDetectorRef` and when do you use it?**

**Answer:**  
It allows fine-grained control over change detection (marking views for check, detaching, reattaching). Useful in performance-sensitive components or when integrating with non-Angular APIs.

**21. What are Angular signals (if you’ve used them)?**

**Answer:**  
Signals are reactive primitives that hold a value and notify dependents when the value changes, offering a more explicit and fine-grained reactivity model than Zone-based change detection.

**22. Trick: Does changing a signal value in a service automatically update all consuming components?**

**Answer:**  
Yes, any computed views or effects using that signal re-run, updating the UI where it’s read.

---

## 5. Dependency Injection & Providers

**23. How does Angular’s DI hierarchy work?**

**Answer:**  
Providers can be registered in modules, components, or via `providedIn`. The injector tree mirrors the component/module tree; a child injector falls back to parent injectors when resolving dependencies.

**24. Difference between `providedIn: 'root'` and `providedIn: 'any'`?**

**Answer:**  
`'root'` creates a singleton service in the root injector. `'any'` creates a new instance in each lazy-loaded module or component injector where it’s requested.

**25. What’s a multi-provider and when would you use it?**

**Answer:**  
A multi-provider allows multiple values for the same token (e.g. multiple `HTTP_INTERCEPTORS`). You declare `multi: true` in the provider.

**26. Trick: If you provide the same service in a lazy-loaded module and in root, how many instances exist?**

**Answer:**  
Two: one in the root injector, and a separate one in the lazy module’s injector.

**27. What are injection tokens and why are they needed?**

**Answer:**  
`InjectionToken` is used to inject values that don’t have a class type (e.g. config objects, interfaces). It provides a DI key for non-class dependencies.

---

## 6. Routing & Navigation

**28. Core concepts of Angular routing?**

**Answer:**  
Routes config, router outlet, routerLink/routerLinkActive, route guards, lazy loading, resolvers, `ActivatedRoute`.

**29. What are route guards and types available?**

**Answer:**  
Guards control navigation. Types: `CanActivate`, `CanDeactivate`, `Resolve`, `CanLoad` / `CanMatch`, etc.

**30. Difference between `CanLoad`/`CanMatch` and `CanActivate`?**

**Answer:**  
`CanActivate` runs after module is loaded to allow/deny activation. `CanLoad`/`CanMatch` runs before loading, preventing the lazy module bundle from being loaded if not allowed.

**31. Explain lazy loading modules / routes.**

**Answer:**  
Lazy-loaded routes use dynamic imports in route config (e.g. `loadChildren:` or standalone `loadComponent`), so code is loaded on demand.

**32. Trick: If you have a service provided in a lazy-loaded module, is it shared with the rest of the app?**

**Answer:**  
No. That service instance is scoped to that lazy module’s injector (unless explicitly provided at root).

**33. How do you access route params and query params?**

**Answer:**  
Using `ActivatedRoute`: `route.paramMap`, `route.snapshot.paramMap`, `route.queryParamMap`, etc.

---

## 7. Forms (Template-Driven & Reactive)

**34. Differences between template-driven and reactive forms?**

**Answer:**  
Template-driven: form logic in template, simpler, uses `ngModel`. Reactive: form model in TypeScript, more explicit, scalable, and testable using `FormGroup`, `FormControl`, `FormArray`.

**35. What is a `FormGroup` and `FormControl`?**

**Answer:**  
`FormControl` represents a single value and validation state. `FormGroup` is a collection of controls, acting like an object model.

**36. How do you create a custom form control compatible with Angular forms?**

**Answer:**  
Implement `ControlValueAccessor` and optionally `Validator` to integrate with the forms API and be used with `formControlName`/`ngModel`.

**37. Trick: Why is using `[(ngModel)]` with reactive forms generally discouraged?**

**Answer:**  
It mixes paradigms and can cause confusion and unexpected behavior. You should stick to one approach, usually reactive forms for complex forms.

---

## 8. HTTP, Interceptors & Error Handling

**38. What is `HttpClient` and advantages over old `Http` module?**

**Answer:**  
`HttpClient` returns typed, observable responses, handles JSON automatically, supports interceptors, easier configuration.

**39. What are HTTP interceptors used for?**

**Answer:**  
To inspect/modify requests and responses globally (e.g. auth headers, logging, error handling, retries).

**40. Trick: In what order do multiple interceptors execute?**

**Answer:**  
They execute in the order they are provided for outgoing requests, and in reverse order for incoming responses.

**41. How do you handle global HTTP errors?**

**Answer:**  
Use an interceptor to catch errors in `catchError`, and possibly a global error handler (`ErrorHandler`) for non-HTTP errors.

---

## 9. State Management & RxJS Integration

**42. How do you usually handle application-wide state in Angular?**

**Answer:**  
Options: services with RxJS (BehaviorSubject, signals), NgRx, Akita, NGXS, or custom state management patterns.

**43. When would you prefer NgRx over simple services with subjects/signals?**

**Answer:**  
For large, complex apps that need predictable, testable state changes, time-travel debugging, and strict one-way data flow.

**44. Trick: Is `async` pipe unsubscribing automatically a replacement for manual unsubscribe in all cases?**

**Answer:**  
Only in templates. Subscriptions created in code (e.g. in `ngOnInit`) must still be manually managed/unsubscribed.

**45. How do you avoid multiple HTTP calls when multiple subscribers listen to the same Observable?**

**Answer:**  
Use sharing operators like `shareReplay` or convert to a signal/store, or cache results in services.

---

## 10. Performance & Optimization

**46. What techniques do you use for Angular performance optimization?**

**Answer:**  
`OnPush` change detection, trackBy in `*ngFor`, lazy loading routes/components, preloading strategies, pure pipes, avoiding heavy work in templates, memoization, CDRef control.

**47. Why is `trackBy` important for `*ngFor`?**

**Answer:**  
It helps Angular identify items uniquely, so it reuses DOM elements instead of destroying/recreating them, improving performance on large lists.

**48. Trick: What happens if you mutate the array used in `*ngFor` without a `trackBy`?**

**Answer:**  
Angular may re-render many list items unnecessarily, causing poor performance.

**49. How would you analyze performance issues in an Angular app?**

**Answer:**  
Use Angular DevTools, browser performance profiler, change detection profiling, logging of lifecycle hooks, and analyzing network/bundle size.

**50. What is AOT compilation and why is it useful?**

**Answer:**  
Ahead-of-time compiles Angular templates during build, reducing bundle size, catching template errors early, and improving startup time.

---

## 11. SSR, Hydration & SEO

**51. What is Angular Universal?**

**Answer:**  
A solution for server-side rendering (SSR) Angular apps to improve first paint and SEO for crawlers.

**52. What is hydration in Angular?**

**Answer:**  
The process of reusing server-rendered DOM on the client and “wiring it up” to Angular, reducing re-rendering on startup.

**53. Trick: Why might you still need `meta` tags service even with SSR?**

**Answer:**  
Dynamic pages or client-side navigation need meta tags updated after initial load for social previews and some crawlers.

---

## 12. Security

**54. How does Angular help protect against XSS?**

**Answer:**  
By default, it sanitizes values in templates and escapes interpolated strings; it also has `DomSanitizer` for safe bypass in controlled situations.

**55. What is `DomSanitizer` and when should you use it?**

**Answer:**  
Service to mark trusted HTML/URLs/styles as safe. Use sparingly when you’re certain data is safe, e.g. from trusted sources.

**56. Trick: Is binding to `[innerHTML]` always safe?**

**Answer:**  
No. It’s a common XSS vector if you bind untrusted input. Only use with sanitized/trusted content.

---

## 13. Testing (Unit, Integration, E2E)

**57. How do you test components in Angular?**

**Answer:**  
With TestBed to configure testing module, create component fixture, interact with DOM, and assert outputs.

**58. What’s the difference between shallow tests and integrated tests in Angular?**

**Answer:**  
Shallow: test component in isolation with mocked child components/services. Integrated: include real child components, services, and possibly routing.

**59. How do you test an Angular service that uses HttpClient?**

**Answer:**  
Use `HttpClientTestingModule` and `HttpTestingController` to mock and assert HTTP calls.

**60. Trick: Why is it a bad idea to rely heavily on `fakeAsync` for all async testing?**

**Answer:**  
It can hide real timing issues and doesn’t handle all async sources gracefully (e.g. some timers or external APIs). Use `async`/`waitForAsync` or Observables where appropriate.

---

## 14. Build, Tooling & Versioning

**61. What role does the Angular CLI play?**

**Answer:**  
It scaffolds projects, generates code, builds/serves apps, runs tests and linting, and manages configurations.

**62. How do you configure different environments (dev, QA, prod)?**

**Answer:**  
Through environment files and build configurations; or via runtime configuration (e.g. loading JSON config on startup).

**63. What is `ngZone: 'noop'` mode and when might you use it?**

**Answer:**  
It disables Zone.js-based auto change detection. You then trigger detection manually; useful for high-performance use cases or integrating with other reactive systems.

---

## 15. Design, Patterns & Best Practices

**64. How do you structure a large Angular project?**

**Answer:**  
By domain/feature modules or feature folders, shared/core modules, clear layering (components → services → data layer), consistent naming, and enforcing boundaries.

**65. How do smart vs dumb (container vs presentational) components help?**

**Answer:**  
Smart components handle data fetching and state; dumb components focus on UI and inputs/outputs. This improves reusability and testability.

**66. Trick: When is a service NOT a singleton in Angular?**

**Answer:**  
When it’s provided in a component or in a lazy-loaded module, rather than in root; then each component/module gets its own instance.

**67. What are some anti-patterns you watch out for in Angular code?**

**Answer:**  
Business logic in components instead of services, massive god components, heavy logic in templates, subscriptions without unsubscribe, using `any` everywhere, too many global singletons.
