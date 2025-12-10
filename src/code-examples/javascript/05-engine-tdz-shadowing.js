var a = 1; // Global variable

function outer() {
  // Local `let a` (below) is hoisted but uninitialized → TDZ.
  // It shadows the global `a`, so this access hits the TDZ.
  console.log(a); // ❌ ReferenceError (TDZ)

  let a = 4; // Local `a` initialized here.

  return function inner() {
    // Another `let a` creates a new local `a`, also in TDZ here.
    console.log(a); // ❌ ReferenceError (TDZ again)

    let a = 2; // Local to inner()
  };
}

const f = outer(); // Error happens here
f(); // Never reached
