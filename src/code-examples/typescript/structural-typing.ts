interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`x: ${p.x}, y: ${p.y}`);
}

const myCoords = { x: 10, y: 20 };
printPoint(myCoords); // Valid, because myCoords structurally matches Point
