import { retry } from "rxjs/operators";
import { timer } from "rxjs";

function loadData(this: any) {
  this.http
    .get("/api/data")
    .pipe(
      retry({
        count: 3, // number of retries
        delay: (error, retryCount) => {
          // retryCount = 1, 2, 3
          return timer(retryCount * 1000);
        },
      })
    )
    .subscribe({
      next: (data: any) => console.log("Success", data),
      error: (err: any) => console.log("Failed after 3 attempts", err),
    });
}

export { loadData };
