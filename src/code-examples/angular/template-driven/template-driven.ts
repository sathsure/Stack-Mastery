// template-driven-example.component.ts

import { Component } from "@angular/core";

@Component({
  selector: "app-template-driven-example",
  templateUrl: "./template-driven.html",
})
export class TemplateDrivenExampleComponent {
  submit(formValue: any) {
    console.log("Template-Driven Form Value:", formValue);
    // ✔ Handles final form submission
    // ✔ No need to define form model in TypeScript
  }
}
