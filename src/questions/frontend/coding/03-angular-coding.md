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
  template: ``,
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

4️⃣ **Reactive Form Component (Add User)**

```ts
@Component({
  selector: "app-user-form",
  template: ``,
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

5️⃣ **Dialog Component (Edit User + Unsaved Changes Guard)**

```ts
@Component({
  selector: "app-user-dialog",
  template: ``,
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

6️⃣ **Details Page (No API Call)**

```ts
@Component({
  selector: "app-user-details",
  template: ``,
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
  { path: "", redirectTo: "users", pathMatch: "full" },
];
```
