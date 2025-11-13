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
