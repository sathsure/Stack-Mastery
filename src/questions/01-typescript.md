### ❓ 1. What is the difference between `const` and `as const` in TypeScript?
**📝 Answer:**  
`const` The variable cannot be reassigned, but the contents inside the object can still change.  
`as const` The value becomes completely locked — its contents cannot change, and the types stay exact.  
**💻 Code Example:** [const-as-const.ts][const-as-const]

### ❓2. How does TypeScript’s type inference work?
**📝 Answer:**  
TypeScript's type inference is the ability of the compiler to automatically determine and assign types to variables, functions, objects, arrays.  
**💻 Code Example:**  
Variable Initialization:  
```ts
let myString = "hello"; // Inferred as string
let myNumber = 123;     // Inferred as number
let myBoolean = true;   // Inferred as boolean
```
Function Return Types:  
```ts
function add(a: number, b: number) {
    return a + b; // Inferred as number
}
```
Arrays and Objects:  
```ts
let numbers = [1, 2, 3];         // Inferred as number[]
let user = { name: "Alice", age: 30 }; // Inferred as { name: string; age: number; }
```

### ❓3. Explain the difference between types vs interfaces. When do you use each?
**📝 Answer:**  
`Interface` is mainly for describing object shapes and is extendable (can be merged).  
`Type` is more flexible — can represent unions, primitives, tuples, and complex compositions.  
**💻 Code Example:**  
Interface:  
```ts
interface User {
  id: number;
  name: string;
  email: string;
}

// Extending an interface
interface Admin extends User {
  role: "admin";
}
```
Types:
```ts
type ID = number; // Primitive alias
type Coordinates = [number, string]; // Tuple
type Status = "success" | "error" | "loading"; // Union type
type Product = { name: string; }; // Object type
type DetailedProduct = Product & { price: number; }; // Intersection (combine types)
```
🔑 Key Difference: [types-vs-interfaces.ts][types-vs-interfaces]


### ❓4. What are mapped types? Examples.
**📝 Answer:**  
`Mapped types` apply transformations to each property of an existing type to produce a new type.  
**💻 Code Example:**  
```ts
type Person = { name: string; age: number };
// A new type where both `name` and `age` are optional
type PartialPerson = { [P in keyof Person]?: Person[P] };

const person1: PartialPerson = { name: "Alice" }; // Valid
const person2: PartialPerson = { age: 30 }; // Valid
const person3: PartialPerson = {}; // Valid
```

### ❓5. Explain Generics with constraints.
**📝 Answer:**  
`Generic:` A placeholder type that makes code reusable for many types.
`Constraint:` A rule that limits what types the generic can accept to ensure safety (like requiring a length property).  
**💻 Code Example:**  
```ts
// T must have a 'length' property
function getLength<T extends { length: number }>(value: T) {
  return value.length;
}

getLength("hello");   // ✔ works (string has length)
getLength([1, 2, 3]); // ✔ works (array has length)
// getLength(10);     // ❌ error (number has no length)
```
### ❓6. What are utility types like Partial, Pick, Omit, ReturnType?
**📝 Answer:**  
1. `Partial<Type>:` The Partial utility type makes all properties in Type optional.  
**💻 Code Example:** [utility-type-partial.ts][utility-type-partial]  
2. `Pick<Type, Keys>:` Pick creates a new type that contains only the selected properties from an existing type.  
**💻 Code Example:** [utility-type-pick.ts][utility-type-pick]  
3. `Omit<Type, Keys>:` Omit creates a new type by removing specific properties from an existing type.   
**💻 Code Example:** [utility-type-omit.ts][utility-type-omit]  
4. `ReturnType<Type>:` ReturnType extracts the type of a function’s return value without repeating the function’s definition.  
**💻 Code Example:** [utility-type-returntype.ts][utility-type-returntype]  

### ❓7. What is declaration merging?
**📝 Answer:**  
`Declaration merging` combines multiple declarations of the same name into a single definition  
**💻 Code Example:** [declaration-merging][types-vs-interfaces]

### ❓8. Explain structural typing in TS? 
**📝 Answer:**  
`Structural typing` in TypeScript means two types are compatible if their shape (properties and methods) matches, regardless of their names.  
In short: If the structure fits, the type fits.  
**💻 Code Example:** [structural-typing.ts][structural-typing]  

### ❓9. What are discriminated unions?
**📝 Answer:**  
`Discriminated unions` allow grouping related types using a common discriminant property, enabling TypeScript to narrow types safely.  
**💻 Code Example:**  
```ts
type Shape =
  | { kind: "circle"; r: number }   // circle - Discriminant
  | { kind: "square"; s: number };  // square - Discriminant

function area(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.r ** 2; 
  }
}
```

### ❓10. How do you create and use custom type guards?
**📝 Answer:**  
A `custom type guard` is a function that returns `x is Type` to help TypeScript narrow types at runtime.  
**💻 Code Example:**  
```ts
// Custom type guard: checks if val is a number
function isNumber(val: unknown): val is number {
  return typeof val === "number"; // returns true only for numbers
}

const input: unknown = 10;

// TypeScript: if this returns true, treat 'input' as a number inside the block
if (isNumber(input)) {
  console.log(input.toFixed(2));   // safe: 'input' is now definitely a number
}
```

### ❓11. What is never, unknown, void? When to use each?
**📝 Answer:**  
`never:` A type that never occurs, used for unreachable code or exhaustive checks.  
`unknown:`A safe alternative to `any`, requires type-checking before use.  
`void:` Represents no return value, typically in functions.  
**💻 Code Example:**  
```ts
function fail(): never { throw new Error(); }   // never returns because it throws an error
let x: unknown = "hi";                          // could be anything, but TS won't let you use blindly
function log(msg: string): void { console.log(msg); } // returns nothing
```

### ❓12. What are decorators and how are they applied?
**📝 Answer:**  
Decorators are annotations that modify classes, methods, or properties at runtime; enabled via `experimentalDecorators`.  
**💻 Code Example:**  
```ts
function Logger(target: Function) { console.log("Class loaded"); }

@Logger
class User {}
```


[const-as-const]: ../code-examples/typescript/const-as-const.ts
[types-vs-interfaces]: ../code-examples/typescript/types-vs-interfaces.ts
[utility-type-partial]: ../code-examples/typescript/utility-type-partial.ts
[utility-type-pick]: ../code-examples/typescript/utility-type-pick.ts
[utility-type-omit]: ../code-examples/typescript/utility-type-omit.ts
[utility-type-returntype]: ../code-examples/typescript/utility-type-returntype.ts
[structural-typing]: ../code-examples/typescript/structural-typing.ts





