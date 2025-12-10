/***************** HOISTING ******************/

// Hoisting means: variable and function declarations
// are moved to the top of their scope before execution.

// Example: Calling a function before defining it works
sayHello(); // Works because function declarations are hoisted

function sayHello() {
  console.log("Hello from Hoisting!");
}

// But variables declared with var behave differently:
console.log(num); // Output: undefined (declared but not assigned)
var num = 10;

// let and const are also hoisted BUT kept in the "Temporal Dead Zone"
// console.log(x);  // ❌ Would throw error (not accessible before initialization)
// let x = 20;

/**✨ Quick Summary Table
Type	                    Hoisted?	       
Function Declaration	    ✔ Yes	            
var variable	            ✔ Yes(initialized to undefined)       
let variable	            ✔ Yes(declared but not initialized - throws error on access)          
const variable	            ✔ Yes(declared but not initialized - throws error on access)	            
Function Expression (var)	✔ Var is hoisted(initialized to undefined, throws error on access)
Arrow Function (let/const)	✔ Declaration is hoisted(throws error on access)
 */
