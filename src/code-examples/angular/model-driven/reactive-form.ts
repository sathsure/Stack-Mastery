import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: "app-reactive-dynamic",
  template: `<p>Check console for outputs</p>`,
})
export class ReactiveDynamicComponent {
  loginForm: FormGroup<any> = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl(""),

    // Example dynamic list (e.g., phone numbers)
    phones: new FormArray([]),
  });

  constructor() {
    // ---------------------------------------------
    // ✔ LISTENING TO FORM VALUE & STATUS CHANGES
    // ---------------------------------------------
    this.loginForm.valueChanges.subscribe((val) => {
      console.log("Form value changed:", val);
    });

    this.loginForm.statusChanges.subscribe((status) => {
      console.log("Form validation status:", status);
    });

    // ---------------------------------------------
    // ✔ DYNAMICALLY ADDING A CONTROL (e.g., phone)
    // ---------------------------------------------
    const phones = this.loginForm.get("phones") as FormArray;
    phones.push(new FormControl("1234567890"));

    // result:
    // phones = ['1234567890']

    // ---------------------------------------------
    // ✔ DYNAMICALLY REMOVING A CONTROL
    // ---------------------------------------------
    phones.removeAt(0);
    // result:
    // phones = []

    // ---------------------------------------------
    // ✔ SETTING FULL FORM VALUES (setValue)
    // setValue MUST match the structure exactly
    // ---------------------------------------------
    this.loginForm.setValue({
      username: "JohnDoe",
      password: "secret123",
      phones: [], // required because structure must match!
    });

    // ---------------------------------------------
    // ✔ PARTIAL UPDATE (patchValue)
    // patchValue does NOT need full structure
    // ---------------------------------------------
    this.loginForm.patchValue({
      password: "updatedPasswordOnly",
      // username & phones remain unchanged
    });

    // ---------------------------------------------
    // ✔ ADDING CONTROLS BASED ON CONDITION
    // Example: Add "email" only if needed — no TS error with Untyped*
    // ---------------------------------------------
    if (!this.loginForm.get("email")) {
      this.loginForm.addControl(
        "email",
        new FormControl("", [Validators.email])
      );
    }

    // ---------------------------------------------
    // ✔ REMOVING CONTROL DYNAMICALLY
    // Example: Remove email if not required
    // ---------------------------------------------
    this.loginForm.removeControl("email");
  }

  submit() {
    console.log("Final Form:", this.loginForm.value);
  }
}
