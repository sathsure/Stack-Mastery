### ❓ Build a small Angular application that manages users. It should load initial data from an API, allow CRUD operations, use forms, routing, dialogs, caching, and some custom Angular features. Explain your design decisions.

### 📝 Answer

1️⃣ **User Model**

```ts
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
```

2️⃣ **Data Service (API + Caching + State Retention)**

👉 **Key interview concept:** _No refetch when navigating back_

```ts
@Injectable({ providedIn: "root" })
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private apiLoaded = false;

  constructor(private http: HttpClient) {}

  loadUsers() {
    if (this.apiLoaded) return;

    this.http
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .subscribe((users) => {
        this.usersSubject.next(users);
        this.apiLoaded = true;
      });
  }

  addUser(user: User) {
    this.usersSubject.next([...this.usersSubject.value, user]);
  }

  updateUser(updated: User) {
    const users = this.usersSubject.value.map((u) =>
      u.id === updated.id ? updated : u,
    );
    this.usersSubject.next(users);
  }

  deleteUser(id: number) {
    this.usersSubject.next(this.usersSubject.value.filter((u) => u.id !== id));
  }

  getUserById(id: number): User | undefined {
    return this.usersSubject.value.find((u) => u.id === id);
  }
}
```

🧠 **What to explain**

- `BehaviorSubject` keeps state in memory
- No API hit on back navigation
- Singleton service lifecycle

3️⃣ **User List Component (Table + Routing)**

```ts
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
})
export class UserListComponent implements OnInit {
  users$ = this.userService.users$;

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.userService.loadUsers();
  }

  trackById(_: number, user: User) {
    return user.id;
  }

  goToDetails(user: User) {
    this.router.navigate(["/users", user.id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }

  editUser(user: User) {
    this.dialog.open(UserDialogComponent, {
      data: user,
    });
  }
}
```

**user-list.component.html**

```html
<div class="container">
  <h2>Users</h2>

  <button mat-raised-button color="primary" routerLink="/add">Add User</button>

  <table mat-table [dataSource]="users$ | async" class="mat-elevation-z8">
    <!-- ID -->
    <ng-container matColumnDef="id">
      <th mat-header-cell *matHeaderCellDef>ID</th>
      <td mat-cell *matCellDef="let user">{{ user.id }}</td>
    </ng-container>

    <!-- Name -->
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef>Name</th>
      <td mat-cell *matCellDef="let user">{{ user.name }}</td>
    </ng-container>

    <!-- Email -->
    <ng-container matColumnDef="email">
      <th mat-header-cell *matHeaderCellDef>Email</th>
      <td mat-cell *matCellDef="let user">{{ user.email }}</td>
    </ng-container>

    <!-- Actions -->
    <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef>Actions</th>
      <td mat-cell *matCellDef="let user">
        <button mat-button (click)="goToDetails(user)">View</button>
        <button mat-button color="accent" (click)="editUser(user)">Edit</button>
        <button mat-button color="warn" (click)="deleteUser(user.id)">
          Delete
        </button>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="['id','name','email','actions']"></tr>
    <tr
      mat-row
      *matRowDef="let row; columns: ['id','name','email','actions']; trackBy: trackById"
    ></tr>
  </table>
</div>
```

4️⃣ **Reactive Form Component (Add User)**

```ts
@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
})
export class UserFormComponent {
  form = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  submit() {
    if (this.form.invalid) {
      this.snackBar.open("Invalid form", "Close", { duration: 2000 });
      return;
    }

    this.userService.addUser({
      id: Date.now(),
      ...this.form.value,
    } as User);

    this.snackBar.open("User added", "Close", { duration: 2000 });
    this.form.reset();
  }
}
```

**user-form.component.html**

```html
<div class="container">
  <h2>Add User</h2>

  <form [formGroup]="form" (ngSubmit)="submit()">
    <mat-form-field appearance="outline">
      <mat-label>Name</mat-label>
      <input matInput formControlName="name" />
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Email</mat-label>
      <input matInput formControlName="email" appInvalidHighlight />
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Phone</mat-label>
      <input matInput formControlName="phone" />
    </mat-form-field>

    <button mat-raised-button color="primary" type="submit">Save</button>
  </form>
</div>
```

5️⃣ **Dialog Component (Edit User + Unsaved Changes Guard)**

```ts
@Component({
  selector: "app-user-dialog",
  templateUrl: "./user-dialog.component.html",
})
export class UserDialogComponent {
  form: FormGroup;
  private initialValue: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private userService: UserService,
  ) {
    this.form = this.fb.group({
      name: [user.name, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      phone: [user.phone, Validators.required],
    });

    this.initialValue = this.form.value;
  }

  save() {
    this.userService.updateUser({
      ...this.user,
      ...this.form.value,
    });
    this.dialogRef.close();
  }

  close() {
    if (this.form.dirty) {
      if (!confirm("Discard changes?")) return;
    }
    this.dialogRef.close();
  }
}
```

**user-dialog.component.html**

```html
<h2 mat-dialog-title>Edit User</h2>

<form [formGroup]="form" mat-dialog-content>
  <mat-form-field appearance="outline">
    <mat-label>Name</mat-label>
    <input matInput formControlName="name" />
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Email</mat-label>
    <input matInput formControlName="email" />
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Phone</mat-label>
    <input matInput formControlName="phone" />
  </mat-form-field>
</form>

<mat-dialog-actions align="end">
  <button mat-button (click)="close()">Cancel</button>
  <button mat-raised-button color="primary" (click)="save()">Save</button>
</mat-dialog-actions>
```

6️⃣ **Details Page (No API Call)**

```ts
@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
})
export class UserDetailsComponent implements OnInit {
  user?: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.user = this.userService.getUserById(id);
  }
}
```

**user-details.component.html**

```html
<div class="container" *ngIf="user">
  <h2>User Details</h2>

  <p><strong>ID:</strong> {{ user.id }}</p>
  <p><strong>Name:</strong> {{ user.name }}</p>
  <p><strong>Email:</strong> {{ user.email }}</p>
  <p><strong>Phone:</strong> {{ user.phone | phonePostal }}</p>

  <button mat-button routerLink="/users">Back</button>
</div>
```

app.component.html

```html
<mat-toolbar color="primary">
  <span>User Management</span>
</mat-toolbar>

<router-outlet></router-outlet>
```

7️⃣ **Custom Pipe (Phone Formatter)**

```ts
@Pipe({ name: "phonePostal" })
export class PhonePostalPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return "";
    return `+91 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
  }
}
```

8️⃣ **Custom Directive (Invalid Highlight)**

```ts
@Directive({
  selector: "[appInvalidHighlight]",
})
export class InvalidHighlightDirective {
  @HostBinding("style.border")
  get border() {
    return "1px solid red";
  }
}
```

Usage:

```html
<input formControlName="email" appInvalidHighlight />
```

9️⃣ **Routing Module**

```ts
const routes: Routes = [
  { path: "users", component: UserListComponent },
  { path: "users/:id", component: UserDetailsComponent },
  { path: "add", component: UserFormComponent },

  {
    path: "admin",
    canMatch: [AdminCanMatchGuard],
    loadComponent: () =>
      import("./admin/admin.component").then((c) => c.AdminComponent),
  },

  { path: "", redirectTo: "users", pathMatch: "full" },
];
```

🔟 **Auth Model** - `auth.model.ts`

```ts
export type Role = "ADMIN" | "USER";
```

1️⃣1️⃣ **Auth Service (Role-based logic)** - `auth.service.ts`

```ts
@Injectable({ providedIn: "root" })
export class AuthService {
  private role: Role = "USER"; // change to ADMIN to allow access

  isAdmin(): boolean {
    return this.role === "ADMIN";
  }

  getRole(): Role {
    return this.role;
  }
}
```

1️⃣2️⃣ **`canMatch` Guard** - `admin-can-match.guard.ts`

```ts
@Injectable({ providedIn: "root" })
export class AdminCanMatchGuard implements CanMatch {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canMatch(): boolean | UrlTree {
    if (this.auth.isAdmin()) {
      return true;
    }

    return this.router.parseUrl("/users");
  }
}
```

✔ Prevents module loading
✔ Redirects unauthorized users
✔ Synchronous → fast

1️⃣3️⃣ **Lazy-loaded Admin Component** - `admin-dashboard.component.ts`

```ts
@Component({
  selector: "app-admin",
  template: `
    <div class="container">
      <h2>Admin Panel</h2>
      <p>Only admins can access this page.</p>
    </div>
  `,
})
export class AdminComponent {}
```
