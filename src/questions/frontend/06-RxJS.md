### ❓ What is RxJS?

### 📝 Answer

A library for reactive programming using Observables to compose async and event-based programs in a functional style.

---

### ❓ What is an Observable?

### 📝 Answer

A lazy, push-based collection that emits values over time and notifies observers about `next`, `error`, and `complete`.

---

### ❓ What is an Observer?

### 📝 Answer

A set of callbacks (`next`, `error`, `complete`) that define how to react to Observable emissions.

---

### ❓ What is a Subscription?

### 📝 Answer

The object returned from `observable.subscribe(...)` that represents the execution; it can be used to unsubscribe.

---

### ❓ What is an Operator in RxJS?

### 📝 Answer

A pure function that takes an Observable as input and returns a new Observable as output (e.g., `map`, `filter`, `switchMap`).

---

### ❓ What’s the difference between `pipeable` and `creation` operators?

### 📝 Answer

- Creation: create Observables (`of`, `from`, `interval`, `timer`, `fromEvent`)
- Pipeable: modify/transform Observables (`map`, `filter`, `switchMap`, `catchError`), used with `.pipe()`.

---

### ❓ Is an Observable lazy or eager?

### 📝 Answer

Lazy. It doesn’t start producing values until someone subscribes.

---

### ❓ Can Observables be synchronous?

### 📝 Answer

Yes. They can be sync, async, or a mix, depending on how they’re implemented.

---

### ❓ What are the three types of notifications an Observable can emit?

### 📝 Answer

`next` (data), `error` (terminal), `complete` (terminal).

---

### ❓ Can an Observable emit after `complete`?

### 📝 Answer

No. After `complete` or `error`, it must not emit any more values.

---

### ❓ What is a cold Observable?

### 📝 Answer

Each subscription gets its own independent execution and source (e.g., `of`, `from`, `httpClient.get`).

---

### ❓ What is a hot Observable?

### 📝 Answer

The source is shared. Subscriptions tap into an ongoing execution (e.g., DOM events, WebSocket streams).

---

### ❓ How do you convert a cold Observable to a hot one?

### 📝 Answer

Multicasting: using `share`, `shareReplay`, `publish().refCount()`, or a Subject.

---

### ❓ What is a Subject?

### 📝 Answer

Both an Observable and an Observer; it can emit values to multiple subscribers.

---

### ❓ Difference between `Subject`, `BehaviorSubject`, `ReplaySubject`, and `AsyncSubject`?

### 📝 Answer

- `Subject`:
  - A multicast Observable. It does not store any value.
  - 👉 New subscribers get only future values, not past ones.
- `BehaviorSubject`:
  - A Subject that always has a current value.
  - 👉 New subscribers immediately receive the latest value.
- `ReplaySubject`:
  - A Subject that replays past values to new subscribers.
  - 👉 You control how many past values to replay.
- `AsyncSubject`:
  - emits only the last value on completion.

---

### ❓ **Trick:** Does `BehaviorSubject` emit its current value immediately on subscription?

### 📝 Answer

Yes, it synchronously emits the last/current value upon subscription.

---

### ❓ **Trick:** Can a `Subject` emit values before anyone subscribes?

### 📝 Answer

Yes, but those values are lost (no replay).

---

### ❓ `share` vs `shareReplay` in Angular?

### 📝 Answer

🔹 share()

```ts
const src$ = of(0, 1, 2).pipe(share());

src$.subscribe((v) => console.log("A:", v));

setTimeout(() => {
  src$.subscribe((v) => console.log("B:", v));
}, 1000);
```

OUTPUT:

```
A: 0
A: 1
A: 2
```

🔹 shareReplay(1)

```ts
const src$ = of(0, 1, 2).pipe(shareReplay(1));

src$.subscribe((v) => console.log("A:", v));

setTimeout(() => {
  src$.subscribe((v) => console.log("B:", v));
}, 1000);
```

OUTPUT:

```
A: 0
A: 1
A: 2
B: 2 👈 REPLAYED
```

---

### ❓ **Trick:** What’s a common memory leak pitfall with `shareReplay`?

### 📝 Answer

Using `shareReplay({ refCount: false })` or old signature without refCount over infinite streams can keep subscriptions alive forever.

---

### ❓ What does `map` do?

### 📝 Answer

Transforms each emitted value with a pure function, returning a new Observable.

---

### ❓ What does `filter` do?

### 📝 Answer

Emits only values that satisfy a predicate.

---

### ❓ What is `tap` used for?

### 📝 Answer

Side effects (logging, debugging) without changing the stream.

---

### ❓ What does `scan` do?

### 📝 Answer

Like `reduce` over time: accumulates values and emits each intermediate result.

---

### ❓ What is the difference between `map` and `switchMap`?

### 📝 Answer

- `map`: transforms value to another value.
- `switchMap`: transforms value to an inner Observable and **switches** to it, cancelling previous inner subscriptions.

---

### ❓ Explain `mergeMap`.

### 📝 Answer

Maps each value to an inner Observable, subscribes to all inner Observables concurrently, and merges their outputs.

---

### ❓ Explain `concatMap`.

### 📝 Answer

Queues inner Observables and subscribes to them sequentially; each waits for the previous to complete.

---

### ❓ Explain `exhaustMap`.

### 📝 Answer

Ignores new source values while an inner Observable is active; resumes listening after inner completes.

<img width="600" height="500" alt="RxJS Maps Image" src="/src/assets/rxjs-maps.png" />

---

### ❓ **Trick:** For an autocomplete search, which is best: `switchMap`, `mergeMap`, `concatMap`, or `exhaustMap`?

### 📝 Answer

`switchMap`, because it cancels previous HTTP requests when new input arrives.

---

### ❓ **Trick:** For a login button that must ignore double-clicks while a request is in flight, which flattening operator?

### 📝 Answer

`exhaustMap`.

---

### ❓ **Trick:** For processing a queue of tasks in order, one at a time?

### 📝 Answer

`concatMap`.

---

### ❓ Difference between `combineLatest` and `forkJoin`?

### 📝 Answer

- `combineLatest`: emits whenever any source emits, using **latest values** from all; usually never completes if sources never complete.
- `forkJoin`: waits for all sources to complete and emits **one array** of last values, then completes.

---

### ❓ Difference between `merge` and `concat`?

### 📝 Answer

- `merge`: interleaves emissions from sources concurrently.
- `concat`: subscribes to Observables sequentially; second starts after first completes.

---

### ❓ What does `withLatestFrom` do?

### 📝 Answer

Combines the source value with the latest values from other Observables each time the source emits.

---

### ❓ Use case for `race`?

### 📝 Answer

When you want to listen to several Observables but only care about the one that emits first.

---

### ❓ How does `catchError` work?

### 📝 Answer

Catches errors from upstream, lets you return a new Observable (fallback, default value, or rethrow).

---

### ❓ Where should `catchError` be placed (before or after `retry`)?

### 📝 Answer

Usually **before** terminal consumers and often _after_ `retry`. Typical pattern: `source.pipe(retry(3), catchError(...))`.

---

### ❓ What does `retry` do?

### 📝 Answer

Resubscribes to the source Observable on error a given number of times (or indefinitely).

---

### ❓ Difference between `retry` and `repeat`?

### 📝 Answer

- `retry`: re-subscribe on **error**.
- `repeat`: re-subscribe on **completion**.

---

### ❓ **Trick:** If you `catchError` and return `EMPTY`, does the stream complete?

### 📝 Answer

Yes. `EMPTY` completes immediately.

---

### ❓ What is `finalize` used for?

### 📝 Answer

To run cleanup logic on `complete` or `error` (e.g., turn off a loading spinner).

---

### ❓ What is a Scheduler?

### 📝 Answer

A centralized way to control **when** and **where (which execution context)** Observable notifications are delivered.

---

### ❓ Why might you use `observeOn(asyncScheduler)`?

### 📝 Answer

To make a sync stream async (e.g., avoid blocking UI, change microtask/macrotask timing).

---

### ❓ In Angular, how does RxJS interact with Zones and change detection?

### 📝 Answer

Angular patches async APIs (including many RxJS sources) via Zone.js; emissions trigger change detection if they run inside the Angular zone. You can run outside zone for performance and manually trigger when needed.

---

### ❓ How does Angular `HttpClient` use RxJS?

### 📝 Answer

It returns cold Observables that complete after emitting the HTTP response.

---

### ❓ **Trick:** If you subscribe twice to the same `this.http.get(...)`, how many HTTP calls happen?

### 📝 Answer

Two. `HttpClient` Observables are cold; each subscription triggers a new request (unless shared).

---

### ❓ How do you avoid multiple HTTP calls when many components need the same data?

### 📝 Answer

Share the stream using `shareReplay`, store it in a service, and reuse the same Observable.

---

### ❓ What does the `async` pipe do?

### 📝 Answer

Subscribes to an Observable/Promise in a template, exposes latest value, and automatically unsubscribes on destroy.

---

### ❓ When should you **NOT** use the `async` pipe?

### 📝 Answer

When you need imperative control over subscription or side effects, or when the value is used in many places and you want a single shared subscription in TS.

---

### ❓ How would you model component state using RxJS?

### 📝 Answer

Use Subjects/BehaviorSubjects, `scan` or `withLatestFrom` to build state reducers, expose as Observables, and bind via `async` pipe.

---

### ❓ Example: How to debounce a search input in Angular?

### 📝 Answer

Use `FormControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), switchMap(term => this.service.search(term)))`.

---

### ❓ How does RxJS fit into NgRx?

### 📝 Answer

NgRx store, actions, and effects are built on top of Observables; effects use RxJS operators (`ofType`, `mergeMap`, `switchMap`, `catchError`, etc.).

---

### ❓ How do memory leaks occur with RxJS in Angular?

### 📝 Answer

By not unsubscribing from **long-lived** or **infinite** Observables (e.g. `interval`, `fromEvent`) when components are destroyed.

---

### ❓ Ways to avoid manual `unsubscribe`?

### 📝 Answer

- Use `async` pipe in templates.
- Use `takeUntil(destroy$)`.
- Use `take`, `first`, `takeWhile`.
- Use scoped libraries (`takeUntilDestroyed` in newer Angular).

---

### ❓ Which streams generally do **not** need manual unsubscribe?

### 📝 Answer

Finite Observables that complete (e.g. single HTTP calls) and streams managed by `async` pipe.

---

### ❓ **Trick:** Does a `BehaviorSubject` with no subscribers cause a memory leak by itself?

### 📝 Answer

Not by itself; but if it holds large objects or references, they stay in memory as long as the Subject is referenced.

---

### ❓ **Trick:** Does `subscribe` return a Promise?

### 📝 Answer

No. It returns a `Subscription`. To get a Promise, use `firstValueFrom` or `lastValueFrom`.

---

### ❓ **Trick:** If you call `unsubscribe()` on a completed stream, what happens?

### 📝 Answer

Nothing special; completion already cleaned up. Calling `unsubscribe` again is a no-op.

---

### ❓ **Trick:** Will `map` be executed if no one subscribes?

### 📝 Answer

No. Operators are applied only when there is a subscription.

---

### ❓ **Trick:** Does `tap` change the emitted values?

### 📝 Answer

No. It is for side effects; it passes through the original values.

---

### ❓ **Trick:** `interval(1000).pipe(take(0))` — does it emit anything?

### 📝 Answer

No. It completes immediately with zero emissions.

---

### ❓ **Trick:** Does `combineLatest([a$, b$])` emit if `a$` emits but `b$` has never emitted?

### 📝 Answer

No. It waits until **each** source has emitted at least once.

---

### ❓ **Trick:** Can `catchError` swallow an error and keep the outer stream alive?

### 📝 Answer

Yes, if it returns a new Observable that doesn’t error.

---

### ❓ **Trick:** `from([1,2,3]).pipe(switchMap(x => of(x)))` — can any values be “cancelled”?

### 📝 Answer

No, because inner Observables complete synchronously; `switchMap` doesn’t have time to cancel.

---

### ❓ **Trick:** `share()` vs `shareReplay(1)` for HTTP caching?

### 📝 Answer

`share()` only shares among **current** subscribers; late subscribers won’t get the last value. `shareReplay(1)` lets late subscribers receive the cached last emission.

---

### ❓ **Trick:** What happens if you call `next` on a completed `Subject`?

### 📝 Answer

It does nothing; subscribers don’t receive anything after completion.

---

### ❓ Mock: You have an infinite WebSocket stream. Some components need the stream; others don’t. How do you design it?

### 📝 Answer

Wrap WebSocket in a service, create a Subject or `share`/`shareReplay` Observable, manage connection at service level, and expose a hot shared stream to components.

---

### ❓ Mock: You have a file upload progress API that emits progress %. You must show progress and allow cancel. RxJS approach?

### 📝 Answer

Use HTTP with `reportProgress`, map events to % using `scan`/`map`, and use a `Subject` as a cancel notifier combined with `takeUntil(cancel$)`.

---

### ❓ Mock: You need to poll a backend every 10s, but stop when user navigates away or an error happens. How?

### 📝 Answer

`timer(0, 10000).pipe(switchMap(() => http.get(...)), takeUntil(routeDestroyed$), catchError(err => { stop / notify; return EMPTY; }))`.

---

### ❓ Mock: You must combine user preferences from backend and local overrides from UI. How would you model with RxJS?

### 📝 Answer

`combineLatest([backendPrefs$, uiOverrides$]).pipe(map(([b, u]) => ({...b, ...u})))`.

---

### ❓ Mock: You have three dependent HTTP calls (B depends on A, C depends on B). Implementation?

### 📝 Answer

Chain with `switchMap` or `concatMap`:

```ts
this.http.get<A>(...).pipe(
  switchMap(a => this.http.get<B>(`/b/${a.id}`)),
  switchMap(b => this.http.get<C>(`/c/${b.id}`))
);
```

---

### ❓ Mock: You need to debounce keystrokes, but execute immediately on Enter key. Pattern?

### 📝 Answer

Merge two streams:

- `valueChanges.pipe(debounceTime(...), distinctUntilChanged(), ...)`
- `enterKey$.pipe(withLatestFrom(valueChanges), map(([, val]) => val))`
  Then `merge` them.

---

### ❓ Mock: You want to build a “wizard” where each step depends on the previous step’s result and can be retried. Operator choices?

### 📝 Answer

Use `concatMap` for ordered steps, `catchError` for per-step retry logic, maybe a state stream with `scan`.

---

### ❓ You are given two REST APIs in an Angular application:

> - https://jsonplaceholder.typicode.com/users → returns 10 user records
> - https://jsonplaceholder.typicode.com/photos → returns multiple photo records  
>   Both APIs contain an id field.  
>   How would you fetch data from both APIs, match users with photos using the id, and merge only the matched photo records into each user object?

### 📝 Answer

```ts
import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { forkJoin } from "rxjs"; // Used to run multiple HTTP requests in parallel and wait for all to complete

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HttpClientModule], // Enables HttpClient for making HTTP API calls
  template: ``,
})
export class App {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    forkJoin([
      this.http.get("https://jsonplaceholder.typicode.com/users"),
      this.http.get("https://jsonplaceholder.typicode.com/photos"),
    ]).subscribe((value) => {
      const updatedValue = (value[0] as any[]).map((user) => {
        const photo = (value[1] as any[])?.find(
          (photo) => photo["id"] === user["id"],
        );

        return {
          ...user,
          ...photo,
        };
      });

      console.log(updatedValue); // Merged output of photos and users
    });
  }
}
```

---

### ❓ Why is exposing a `BehaviorSubject` directly from a service considered a design smell?

### 📝 Answer

Consumers can emit directly, breaking encapsulation and invariants. Prefer exposing `asObservable()` or `readonly` signals/selectors, and keep writable subjects private.
