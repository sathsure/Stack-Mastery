/*--------------------------- CALL ---------------------------- */
function greet(city) {
  console.log(`Hi, I am ${this.name} from ${city}`);
}

const person1 = { name: "Dev" };

// call() immediately invokes 'greet'
greet.call(person1, "Chennai"); // Run greet, but treat person as its this. person1 uses greet function.

// Output: Hi, I am Dev from Chennai

/*--------------------------- BIND ---------------------------- */

function greet(city) {
  console.log(`Hi, I am ${this.name} from ${city}`);
}

const person2 = { name: "Dev" };

const greetDev = greet.bind(person2); // It returns a NEW function and later executed

greetDev("Mumbai"); // Now we call the new function whenever we want

// Output: "Hi, I am Dev from Mumbai"
