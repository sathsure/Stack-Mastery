### 1. Change Detection, Zone.js & RxJS

**1.** Why can subscribing to a hot observable (e.g. `Subject`) in a non-Angular callback fail to trigger change detection, and how do you fix it?

**Answer:**  
 Because the callback can run **outside Zone.js**, Angular doesn’t know a value changed. Wrap emission or subscription in `ngZone.run(...)`, or use APIs that are zone-aware (e.g. HttpClient, Router) or `ɵZoneScheduler`-based schedulers.

---

**2.** Why is `async` pipe often preferred over manual `subscribe` in components, especially for UI streams?

**Answer:**  
 `async` pipe:

- Subscribes/unsubscribes automatically with view lifecycle
- Avoids memory leaks
- Triggers change detection correctly
  Manual `subscribe` requires manual teardown and can be forgotten or mis-ordered.

---

**3.** In Angular’s `OnPush` component, why can updating a field inside a subscription not update the UI, and what’s the correct pattern?

**Answer:**  
 OnPush checks on **input changes, events, and async pipe emissions**. If you mutate fields imperatively without async pipe or manual `markForCheck()`, the view may not update. Prefer exposing **observables to the template** and using `async` pipe.

---

### 2. RxJS in Angular Forms & Validation

**4.** Why is using `valueChanges.pipe(debounceTime(...)).subscribe(...)` for autocomplete sometimes problematic?

**Answer:**  
 If you forget to **unsubscribe**, you leak subscriptions across component recreations. Also, ignoring `distinctUntilChanged()` can cause redundant server calls; ignoring `switchMap` can cause out-of-order responses and stale UI.

---

**5.** In reactive forms, how can combining `valueChanges` of multiple controls lead to subtle bugs?

**Answer:**  
 Using `combineLatest` directly can:

- Emit immediately with **current values**, not just changes
- Cause **validation loops** if you patch values in the subscription
  Fix: use `distinctUntilChanged()`, `auditTime()`, and ensure `patchValue({},{ emitEvent:false })` in loops.

---

### 3. HttpClient + RxJS Traps

**6.** Why is swallowing errors in an `HttpClient` observable with `catchError(() => of(null))` dangerous in Angular apps?

**Answer:**  
 You convert a **failure** into a **“valid” value** (null), so:

- Interceptors / global error handlers might not run
- UI might treat `null` as legit data
  Better: rethrow or wrap errors in a domain model: `catchError(err => of({ error: true, err }))`.

---

**7.** Why can using `shareReplay(1)` on an `HttpClient` request cause memory leaks across route changes?

**Answer:**  
 `shareReplay(1)` by default **never completes** the subject it holds and doesn’t reset on unsubscribe. If the source never completes or is hot, the replayed value sticks in memory. Use `shareReplay({ bufferSize: 1, refCount: true })` and ensure the source completes, or use `takeUntil(destroy$)` before `shareReplay`.

---

**8.** What’s the difference between using `switchMap` and `concatMap` on an `HttpClient` stream triggered by user input?

**Answer:**  
 `switchMap`: **cancels previous requests**, good for typeahead search.
`concatMap`: **ueues requests**, ensures order, but user may wait for stale calls to finish. Choosing the wrong one can cause **stale UI** or unnecessary load.

---

### 4. Router + RxJS Integration

**9.** Why is `this.route.params.subscribe(...)` in `ngOnInit` considered a code smell in Angular?

**Answer:**  
 If you manually subscribe:

- You need **manual unsubscribe**
- Reused components across route changes can accumulate subscriptions
  Better: `this.route.params.pipe(takeUntil(destroy$))` or `this.route.params` via `async` pipe or `router.events` composition.

---

**10.** How can combining `ActivatedRoute` streams (`params`, `queryParams`, `data`) incorrectly lead to missed emissions?

**Answer:**  
 Using `withLatestFrom` when you actually need continuous combination can mean some streams **never emit** until others emit first. For route state, `combineLatest` (with proper start values) usually reflects URL changes better.

---

### 5. State Management & Component Store / Signals + RxJS

**11.** Why is exposing `BehaviorSubject` directly from a service a design smell in Angular?

**Answer:**  
 Consumers can **emit directly**, breaking encapsulation and invariants. Prefer exposing **`asObservable()`** or `readonly` signals/selectors, and keep writable subjects private.

---

**12.** In a global store using RxJS, why is using `Subject` for state updates instead of `BehaviorSubject` or `ReplaySubject(1)` problematic?

**Answer:**  
 Late subscribers get **no current value**, only future ones, causing components to render with missing state. State should be **replayable** so components can bootstrap correctly.

---

**13.** When integrating RxJS with Angular’s signals (latest versions), what’s the subtle pitfall of using `toSignal(observable)` on a non-completing stream?

**Answer:**  
 Non-completing streams are fine, but:

- If the observable never emits, the signal’s initial value may be **undefined**
- Without `initialValue`, templates may crash or show “undefined”
  Use `toSignal(obs, { initialValue })` or ensure a seed emission.

---

### 6. Subscriptions, Memory Leaks & Lifecycle

**14.** Why is `takeUntilDestroyed()` (or `takeUntil(this.destroy$)`) not sufficient by itself to avoid all leaks?

**Answer:**  
 It only handles **subscription lifecycle**, not:

- Globally shared hot observables that never complete
- Cached `shareReplay` values
- Manually created subjects kept in singletons
  You must still **complete subjects** and manage singleton caches.

---

**15.** In a `@Directive` using host listeners and RxJS streams, why can leaking subscriptions be especially nasty?

**Answer:**  
 Directives attach to **many elements**, so each leaked subscription multiplies. Over time this can:

- Degrade performance
- Cause ghost event handling for removed elements
  You must always tie directive subscriptions to directive lifecycle (`takeUntilDestroyed`, `ngOnDestroy`).

---

### 7. Scheduling & Testing RxJS in Angular

**16.** Why do some RxJS operators behave differently in Angular tests vs. production, especially around timers?

**Answer:**  
 Tests may use **fakeAsync / Jasmine clock** or `TestScheduler`, while production uses real timers. Operators like `debounceTime`, `delay`, `interval` rely on schedulers. Inconsistent use of **`TestScheduler`** or forgetting to flush fake timers leads to flaky tests.

---

**17.** How can using `observeOn(asyncScheduler)` inside Angular services unintentionally affect change detection?

**Answer:**  
 It shifts emissions to **microtask / macrotask queues** that might not be inside Angular’s zone, or they might delay UI updates unexpectedly. Prefer Angular’s built-in async mechanisms or use `ngZone.run()` when using custom schedulers.

---

### 8. Pipes, Custom Operators & Error Handling

**18.** What’s tricky about using a custom RxJS operator that swallows errors inside Angular services?

**Answer:**  
 If the operator `catchError`-s and returns a replacement observable:

- Callers may be unaware an error occurred
- Global interceptors / logging might not see it
  Better: **log and rethrow** or map to a typed “error state” instead of silently “healing” streams.

---

**19.** Why is writing a custom operator that internally subscribes (instead of returning a new observable) an anti-pattern in Angular?

**Answer:**  
 Hidden `subscribe()`:

- Breaks **pipeability**
- Hides lifecycle from component/service
- Makes teardown impossible to control
  Custom operators should be **pure functions returning new observables**.

---

### 9. Multicasting & Shared Streams in Angular

**20.** Why can using a single shared hot observable (e.g. via `share()` or a `Subject`) for both UI and side-effects cause race conditions?

**Answer:**  
 Multiple subscribers may:

- Start listening at **different times**
- Depend on **ordering** of emissions
  Since hot observables are timing-sensitive, side-effects can run before UI is ready or vice versa. Use **explicit pipelines** for side-effects (e.g. `tap` + `subscribe` in a dedicated service) and keep UI streams deterministic.

---

### 10. Router Guards, Resolvers & RxJS

**21.** Why can returning a non-completing observable from a resolver or canActivate guard break navigation?

**Answer:**  
 Router **waits for completion** from guards/resolvers. If the observable never completes (e.g., a subject or `interval` without `take(1)`), navigation **hangs forever**. Always ensure guards/resolvers **complete** (e.g. `take(1)`, `first()`).

---

**22.** Why is `catchError(() => of(false))` in a `canActivate` guard dangerous?

**Answer:**  
 It treats _all_ errors as **“deny access”**:

- Hides backend / network failures
- Makes debugging harder
  Better: log properly, show an error page, and return meaningful navigation decisions.
