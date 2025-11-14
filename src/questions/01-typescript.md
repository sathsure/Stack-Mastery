### ❓ 1. What is the difference between `const` and `as const` in TypeScript?
**📝 Answer:**  
`const` The variable cannot be reassigned, but the contents inside the object can still change.  
`as const` The value becomes completely locked — its contents cannot change, and the types stay exact.  
**💻 Code Example:** [const-as-const.ts][const-as-const]

[const-as-const]: ../code-examples/typescript/const-as-const.ts

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
Interface is mainly for describing object shapes and is extendable (can be merged).  
Type is more flexible — can represent unions, primitives, tuples, and complex compositions.  
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
🔑 Key Difference:
```ts
// Declaration Merging (Interface only)
interface Config {
  apiUrl: string;
}

interface Config {
  timeout: number;
}

const appConfig: Config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
};

// This would cause an error with type aliases:
// type MyType = { a: string };
// type MyType = { b: number }; // Error: Duplicate identifier 'MyType'.
```

### ❓4. What are mapped types? Examples.
**📝 Answer:**  
Mapped types apply transformations to each property of an existing type to produce a new type.  
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
Generic: A placeholder type that makes code reusable for many types.
Constraint: A rule that limits what types the generic can accept to ensure safety (like requiring a length property).  
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
1. Partial<Type>: The Partial utility type makes all properties in Type optional.
**💻 Code Example:**
```ts
interface User {
  id: number;
  name: string;
  email: string;
}

// type PartialUser = { id?: number; name?: string; email?: string; }
type PartialUser = Partial<User>;

const updateProfile = (fields: PartialUser) => {
  // function that can accept an object with any subset of User properties
};

updateProfile({ name: 'Jane Doe' }); // Valid
```
