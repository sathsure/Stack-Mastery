### ❓ 1. What is the difference between `const` and `as const` in TypeScript?
**Answer:**
`const` The variable cannot be reassigned, but the contents inside the object can still change.
`as const` The value becomes completely locked — its contents cannot change, and the types stay exact.  
**Code Example:** [const-as-const.ts][const-as-const]

[const-as-const]: ../code-examples/typescript/const-as-const.ts