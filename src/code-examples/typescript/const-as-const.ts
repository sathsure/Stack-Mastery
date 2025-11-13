const mutableobject = { a: 1, b: 2, c: 3 };
mutableobject.a = 100; // Allowed
// mutableobject = { a: 10, b: 20, c: 30 }; // Error: Cannot assign to 'mutableobject' because it is a constant.

const immutableobject = { x: 10, y: 20, z: 30 } as const;
// immutableobject.x = 200; // Error: Cannot assign to 'x' because it is a read-only property.  
// immutableobject = { x: 100, y: 200, z: 300 }; // Error: Cannot assign to 'immutableobject' because it is a constant.

console.log("mutableobject:", mutableobject);
console.log("immutableobject:", immutableobject);