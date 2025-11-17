import {
  Component,
  Input,
  type OnChanges,
  type OnInit,
  type DoCheck,
  type AfterContentInit,
  type AfterContentChecked,
  type AfterViewInit,
  type AfterViewChecked,
  type OnDestroy,
  type SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-lifecycle-demo",
  template: `<div>{{ value }}</div>`,
})
export class LifecycleDemoComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() value: string = "";

  constructor() {
    console.log("constructor");
    // 👉 Triggered FIRST when the component instance is created.
    // 👉 Good for DI & basic setup.
    // ❌ Inputs & view not available yet.
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges", changes);
    // 👉 Triggered whenever @Input() value changes.
    // 👉 Also called BEFORE ngOnInit on first load.
    // 👉 Provides previous + current values of changed inputs.
  }

  ngOnInit() {
    console.log("ngOnInit");
    // 👉 Called ONCE after the first ngOnChanges.
    // 👉 Inputs are now available.
    // 👉 Best for API calls and initialization logic.
  }

  ngDoCheck() {
    console.log("ngDoCheck");
    // 👉 Runs on EVERY change detection cycle.
    // 👉 Called MULTIPLE TIMES.
    // 👉 Use for custom change detection logic.
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit");
    // 👉 Triggered ONCE after Angular projects external content (<ng-content>).
    // 👉 Content DOM is now ready.
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked");
    // 👉 Triggered after ngAfterContentInit.
    // 👉 Runs again after EVERY ngDoCheck.
    // 👉 Ensures projected content is checked.
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    // 👉 Triggered ONCE after the component’s view + child views render.
    // 👉 Local template elements now exist.
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked");
    // 👉 Runs after ngAfterViewInit.
    // 👉 Also runs after EVERY ngDoCheck.
    // 👉 Ensures the view & child views are checked.
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    // 👉 Triggered RIGHT BEFORE the component is destroyed.
    // 👉 Best place to unsubscribe + remove listeners to prevent leaks.
  }
}

/*
============================
🚀 EXPECTED LIFECYCLE ORDER
============================

► Component Loads
-------------------------
1. constructor  
2. ngOnChanges  
3. ngOnInit  
4. ngDoCheck  
5. ngAfterContentInit  
6. ngAfterContentChecked  
7. ngAfterViewInit  
8. ngAfterViewChecked  

► During Any Update (Input change, event, timer)
------------------------------------------------
- ngOnChanges (only if @Input changes)
- ngDoCheck  
- ngAfterContentChecked  
- ngAfterViewChecked  

► When Component is Destroyed
------------------------------
- ngOnDestroy  

============================
✔ This shows EXACT calling order + purpose
============================
*/
