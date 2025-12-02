function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log("Hi, I am " + this.name);
};

const p1 = new Person("Dev");
const p2 = new Person("Raj");
// p1 and p2 have different names but share the SAME sayHi() function

p1.sayHi(); // Uses the shared method → "Hi, I am Dev". Saves memory.

p2.sayHi(); // Uses the same shared method → "Hi, I am Raj"

/**
 * ⭐ Real Use Case (Built-in Prototypes)
 * console.log([1,2,3].map); // map() is a method defined on Array.prototype
 * console.log("hello".toUpperCase); // toUpperCase() is a method defined on String.prototype
 */
