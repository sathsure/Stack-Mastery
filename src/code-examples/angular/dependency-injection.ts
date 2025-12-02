import { Component, Injectable } from "@angular/core";

/* Root-level singleton service */
@Injectable({ providedIn: "root" })
export class LoggerService {
  id = Math.random(); // Helps us see instance differences
}

@Component({
  selector: "app-parent",
  template: `
    <p>Parent ID: {{ logger.id }}</p>
    <app-child></app-child>
  `,
  providers: [LoggerService], // Adding LoggerService to `providers` creates a NEW injector
})
export class ParentComponent {
  // Angular injects the LoggerService from THIS component's injector
  // (not the root one), because providers[] exists here.
  constructor(public logger: LoggerService) {}
}

@Component({
  selector: "app-child",
  template: `<p>Child ID: {{ logger.id }}</p>`,
})
export class ChildComponent {
  // 1. Look at ChildComponent injector → no provider found
  // 2. Look at ParentComponent injector → provider found
  constructor(public logger: LoggerService) {}
}

/*-------------------------------------------
👉 4) Another component outside the subtree
 -------------------------------------------*/
@Component({
  selector: "app-other",
  template: `<p>Other Component ID: {{ logger.id }}</p>`,
})
export class OtherComponent {
  // 1. OtherComponent injector → no LoggerService provider
  // 2. Its parent component (whichever) → no provider
  // 3. Root injector → provider FOUND (because providedIn: 'root')
  constructor(public logger: LoggerService) {}
}
