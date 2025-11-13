### ❓ 1. What is the difference between `const` and `as const` in TypeScript?
**Answer:**
`const` prevents variable reassignment, but the object is still mutable.  
`as const` makes the value deeply readonly and narrows it to literal types.
**Code Example:** [const-as-const.ts][const-as-const]

[const-as-const]: ../code-examples/typescript/const-as-const.ts