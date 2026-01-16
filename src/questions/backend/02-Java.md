## 1️⃣ Core Java – OOP & Design Thinking

### ❓ Why OOP was introduced?

### 📝 Answer

Imagine writing a **bank application**.

```java
double balance = 0;

void deposit(double amount) {
    balance += amount;
}

void withdraw(double amount) {
    balance -= amount;
}
```

As the application grows:

- Another developer adds a method
- Someone directly modifies `balance`
- A bug allows negative balance
- No single place controls the rules

```java
balance = -1000; // accidentally or intentionally
```

❌ **The real problem**:
There is **no protection**, **no ownership**, and **no control over change**.

This is the problem OOP was created to solve.

> The core idea of OOP is to **Put data and the logic together, and control access.**

✅ The solution applied to the same problem (OOP style)

```java
class BankAccount {

    private double balance;

    public void deposit(double amount) {
        if (amount <= 0) return;
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) return;
        balance -= amount;
    }

    public double getBalance() {
        return balance;
    }
}
```

- `balance` is **private**
- Only this class can modify it
- Rules are enforced in **one place**

This is **not about syntax**. This is about **controlling damage and change**.

👉 **OOP is NOT one thing — it has 4 tools (pillars)**

Each pillar exists to solve a **specific kind of problem**.

1. **Encapsulation — “Protect the inside”**

Encapsulation is the practice of controlling how data is accessed and modified, so that an object always remains in a valid state.

```java
class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount <= 0) return;
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) return;
        balance -= amount;
    }
}
```

✅ This is true encapsulation because:

- Balance cannot be negative
- Balance cannot be changed arbitrarily
- Object enforces business rules
- State changes match real-world actions

> Encapsulation is not just about hiding variables and exposing methods;
> it is about protecting an object’s rules so it always stays in a valid state.

2. **Abstraction — “Hide what can change”**

Abstraction means exposing only what the system does, while hiding how it does it, especially for parts that may change.

Now imagine:

- Today you save balance in memory
- Tomorrow you save it in a database
- Later, maybe in a remote service

You don’t want the rest of the system to change every time.

```java
interface AccountService {
    void deposit(double amount);
    void withdraw(double amount);
    double getBalance();
}
```

```java
class BankAccount implements AccountService {
    // implementation here
}
```

✅ This is real abstraction, because

- Interface represents what the system does
- Implementation hides how it is done
- Callers depend on behavior, not details

> Abstraction is not about hiding data;
> it is about hiding change by exposing only stable behavior.

3. **Inheritance — “Reuse with danger”**

Inheritance models an “is-a” relationship by reusing behavior from a parent, but at the cost of tight and permanent coupling.

```java
class Account {
    protected double balance;

    public void withdraw(double amount) {
        if (amount > balance) return;   // prevent negative balance
        balance -= amount;
    }
}

class SavingsAccount extends Account {

    private int withdrawalsThisMonth = 0;

    @Override
    public void withdraw(double amount) {

        // NEW RULE (SavingsAccount specific): Only 3 withdrawals allowed per month
        if (withdrawalsThisMonth >= 3) {
            return; // silently refuse ❌
        }
        super.withdraw(amount);
        withdrawalsThisMonth++;
    }
}

Account acc = new SavingsAccount();
acc.balance = 1000;

// First 3 withdrawals work
acc.withdraw(100);
acc.withdraw(100);
acc.withdraw(100);

// Fourth withdrawal ❌
acc.withdraw(100);   // balance SHOULD become 600, but NOTHING happens

```

❌ **Problem**

- Parent cannot predict child rules
- Every new child risks breaking old code

> Inheritance fails when a child adds rules that the parent never promised to support.

4. **Composition — “Build with parts”**

Composition means building objects using other objects, instead of inheriting from them.

Both inheritance and composition try to achieve:

- Code reuse
- Shared behavior

✅ But composition does it without tight coupling.

```java
class Balance {
    private double amount;

    public void add(double value) {
        amount += value;
    }

    public void subtract(double value) {
        if (value > amount) return;
        amount -= value;
    }

    public double getAmount() {
        return amount;
    }
}

class BankAccount {

    // BankAccount DOES NOT extend Balance, It USES Balance as a part
    private Balance balance = new Balance();

    public void deposit(double amount) {
        balance.add(amount);
    }

    public void withdraw(double amount) {
        balance.subtract(amount);
    }
}
```

What composition solves

- Flexible behavior
- Replaceable parts
- Less coupling

> **Prefer composition over inheritance** unless the relationship is truly “is-a”.

![CompositionVsInheritance Image](/src/assets/backend/composition-vs-inheritance.png)

### ❓ How do you design a system where the same operation behaves differently based on the object type, without changing the calling code?

### 📝 Answer

This is achieved using polymorphism, where different objects respond to the same method call in their own way, allowing behavior to vary without modifying the caller.

Instead of writing if/else or switch logic to decide behavior, we let objects decide their own behavior.

> Polymorphism means “one name, many behaviors.”

Java supports this idea in two different ways:

- Method Overloading → compile-time polymorphism
- Method Overriding → runtime polymorphism

**Method Overriding (Runtime polymorphism)**

> Polymorphism differentiates behavior based on the object’s runtime type, through a shared abstraction.

💻 **Code Example**

```java
interface Payment {
    void pay(double amount);
}
```

```java
class CreditCardPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using Credit Card");
    }
}

class UpiPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using UPI");
    }
}

class CheckoutService {
    public void checkout(Payment payment, double amount) {
        payment.pay(amount); // polymorphism in action
    }
}
```

**Method Overloading (Compile-time polymorphism)**

> Same method name, different parameter lists, in the same class.

💻 **Code Example**

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }

    double add(double a, double b) {
        return a + b;
    }
}
```

```java
Calculator calc = new Calculator();

calc.add(2, 3);        // calls add(int, int)
calc.add(2, 3, 4);     // calls add(int, int, int)
calc.add(2.5, 3.5);    // calls add(double, double)
```

1️⃣ What is a method signature?

A method signature is the method name + parameter types (and order).

⚠️ Return type is NOT part of the method signature.

```java
class Example {

    int getValue() {
        return 10;
    }

    double getValue() {   // ❌ Compile-time error, as method name and parameters are identical
        return 10.5;
    }

    int getValue(int multiplier) { // ✅ Method signature differs by parameter list, not by return type
        return 10 * multiplier;
    }
}
```

2️⃣ Which method gets called when the reference type and object type are different?

The method of the object type (runtime type) is called, not the reference type.
This is called runtime polymorphism / dynamic method dispatch.

- `Reference type` is the type of the variable used to refer to an object.
- `Object type` is the actual class of the object created in memory using new.

```java
Animal a = new Dog(); // Animal - Reference Type,  Dog - Object Type
a.sound(); // a reference points to a Dog object, at runtime → calls Dog.sound()
```

3️⃣ Why is using `instanceof` considered a design smell?

❌ Problem with instanceof

Using instanceof usually means **the polymorphism is not used properly**

```java
class Animal {}

class Dog extends Animal {
    void bark() {
        System.out.println("Bark");
    }
}

class Cat extends Animal {
    void meow() {
        System.out.println("Meow");
    }
}

public class Test {
    static void makeSound(Animal a) {
        if (a instanceof Dog) { // Too many if-else checks, Code becomes fragile and messy
            ((Dog) a).bark();
        } else if (a instanceof Cat) {
            ((Cat) a).meow();
        }
    }
}

```

✅ Better Design (Polymorphism)

```java
class Animal {
    void sound() {}
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Bark");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Meow");
    }
}

public class Test {
    static void makeSound(Animal a) {
        a.sound();  // polymorphism
    }
}
```

> If you’re using instanceof, you’re probably missing polymorphism.

4️⃣ Why doesn’t Java support polymorphism for static methods?

Static methods belong to the class, not the object.
Polymorphism works only with objects, not classes.

```java
class Parent {
    static void show() {
        System.out.println("Parent show");
    }
}

class Child extends Parent {
    static void show() {
        System.out.println("Child show");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
        p.show(); // Output: Parent show
    }
}
```

Because static methods are resolved at compile time using the reference type, not the object type.
This is called **method hiding**, not method overriding.

🧠 **How Java decides (important rule)**

| Member type     | Decided using  | Time         |
| --------------- | -------------- | ------------ |
| Instance method | Object type    | Runtime      |
| Static method   | Reference type | Compile-time |
| Variables       | Reference type | Compile-time |

So Java literally treats this as:

```java
Parent.show();   // decided at compile time
```

If you add `@Override`:

```java
class Child extends Parent {
    @Override
    static void show() { } // ❌ compile-time error
}
```

Java rejects it because:

> **Static methods cannot be overridden**

🌱 Why Static methods cannot be overridden?

Because, Static methods cannot be overridden because overriding requires runtime (object-based) dispatch, while static methods are bound at compile time and belong to the class, not the object.

🌱 Why do we need class and object?

**Class** → A class is a definition that describes what variables and methods something will have.
**Object** → An object is a real instance created from the class that holds actual data and can use those methods.

```java
class Car {
    String color;
    int speed;

    void drive() {
        System.out.println("Car is driving");
    }

    static void showTrafficRule() {
        System.out.println("All cars must stop at a red signal");
    }
}
```

Class → `Car` describes what a car has and does

```java
Car c1 = new Car();
Car c2 = new Car();

Car.showTrafficRule();  // same method for all cars
```

Object → c1 and c2 are two different cars. Each has their own color, speed and can drive() independently

📌 Objects exist to represent individuality

Hence, **Static methods** exists once per class (Meaning c1.showTrafficRule() and c2.showTrafficRule() point to the same memory) and shared by all objects.

5️⃣ Why doesn’t polymorphism work for variables?

Variables are resolved at compile time, not runtime.

```java
class Parent {
    int x = 10;
}

class Child extends Parent {
    int x = 20;
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.println(p.x); // Output: 10
    }
}
```

Variable access depends on reference type. Java does not override variables. This is called **variable hiding**.

---

### ❓ How do you apply OOP principles in real-world systems?

### 📝 Answer

- Where have you used abstraction effectively?

  1. When code depends on the interface, not the implementation.
  2. Loose coupling between two classes

- When does inheritance become harmful?

  1. Due to Deep Hierarchies
  2. Due to Tight Coupling

- When do you prefer composition over inheritance?

  1. To achieve flexible behavior
  2. When behavior must change at runtime

- Can you give an example where strict OOP caused problems?

  1. Deep inheritance hierarchies that are hard to understand.
  2. Breaking simple logic into many interfaces and classes when they aren’t needed.

---

### ❓ Have you ever violated OOP principles intentionally?

### 📝 Answer

Yes, Skipped abstractions to keep code simple and readable

```java
class FileCleaner {
    void cleanTempFiles() {
        // direct logic, no interfaces or layers
    }
}
```

> Strict OOP wasn’t needed; simplicity was the better design choice.

---

### ❓ What design principles do you follow while writing Java code?

### 📝 Answer

Design principles while writing Java code:

- SOLID principles (especially SRP & DIP)
- Prefer composition over inheritance
- Program to interfaces, not implementations
- Keep classes small and focused
- Avoid over-engineering
- Write readable, maintainable code
- Design for change, not perfection

> Clean, simple, and flexible code over “perfect” architecture.

1️⃣ What is the SOLID principle?

SOLID is a set of 5 object-oriented design principles that help write clean, maintainable, and scalable code:

1. **SRP – Single Responsibility Principle**

Definition: A class should have only one reason to change.

❌ Violation (multiple responsibilities)

```java
class UserService {
    void saveUser() {}
    void sendEmail() {}
}
```

The class UserService has more than one responsibility:

- User persistence (saveUser)
- Email communication (sendEmail)

The class can turn into a **God class** (A class that does too much and knows too much in the system)

✔️ Correct (separate responsibilities)

```java
class UserService {
    void saveUser() {}
}

class EmailService {
    void sendEmail() {}
}
```

What happens is:

- Each class has one clear purpose
- Changes are isolated
- Code is easier to understand and safer to modify

2. **OCP – Open/Closed Principle**

Definition: Classes should be open for extension, closed for modification.

❌ Violation (changing existing code)

```java
class Payment {
    void pay(String type) {
        if (type.equals("CARD")) {}
        if (type.equals("UPI")) {}
    }
}
```

Every time adding a new payment type:

- existing code will be modified
- Risk of introducing bugs
- Create a growing if-else chain

✔️ Correct (extend via abstraction)

```java
interface Payment {
    void pay();
}

class CardPayment implements Payment {
    public void pay() {}
}
```

What happens is:

- Existing code stays untouched
- New behavior is added by adding new classes
- Old, tested code remains stable

3. **LSP – Liskov Substitution Principle**

Definition: Subclasses must be usable without breaking parent behavior.

❌ Violation (unexpected behavior)

```java
class Bird {
    void fly() {}
}

class Ostrich extends Bird {
    void fly() { throw new RuntimeException(); }
}
```

The problem is:

- It breaks the expectation set by Bird
- Causes unexpected behavior at runtime

✔️ Correct (proper hierarchy)

```java
interface Bird {}

interface FlyingBird extends Bird {
    void fly();
}

class Sparrow implements FlyingBird {
    public void fly() {}
}
class Ostrich implements Bird {
    // no fly()
}
```

What happens is:

- Only birds that can actually fly implement FlyingBird
- Ostrich is no longer forced to implement invalid behavior

4. **ISP – Interface Segregation Principle**

Definition: Clients should not be forced to implement unused methods.

❌ Violation (fat interface)

```java
interface Machine {
    void print();
    void scan();
}

class SimplePrinter implements Machine {
    public void print() {}
    public void scan() {} // not needed, but forced
}
```

The Problem is:

- Clients (classes) are forced to implement methods they don’t need.

✔️ Correct (small interfaces)

```java
interface Printer {
    void print();
}

interface Scanner {
    void scan();
}
```

What happens is:

- A class implements only what it uses
- No unused or dummy methods

5. **DIP – Dependency Inversion Principle**

Definition: Depend on abstractions, not concrete classes.

❌ Violation (tight coupling)

```java
class OrderService {
    MySQLDatabase db = new MySQLDatabase();
}
```

The problem is:

- OrderService (high-level business logic) directly depends on MySQLDatabase (low-level detail)
- The class is tightly coupled to one specific database
- If you change the database (MySQL → MongoDB), you must change OrderService

✔️ Correct (loose coupling)

```java
interface Database {}

class OrderService {
    Database db;
    OrderService(Database db) {
        this.db = db;
    }
}
```

What happens is:

- Dependency is inverted → OrderService depends on Database (abstraction)
- Loose coupling → OrderService does not care which database is used

2️⃣ How do SOLID principles help in large systems?

1. Reduce tight coupling between components
2. Make code easier to extend without breaking existing logic
3. Improve readability and maintainability
4. Enable parallel team development
5. Simplify testing and refactoring

> 👉 They control complexity as the system grows.

3️⃣ Which SOLID principle is most commonly violated?

SRP (Single Responsibility Principle)

- **Classes become “God classes”** - A single class grows too large and controls too much logic, making it hard to understand and maintain.
- **One class handles multiple concerns** - A class is responsible for more than one job (e.g., business logic, validation, logging, persistence).
- **Small changes cause unexpected side effects** - Modifying one part of the class accidentally breaks other unrelated functionality.

> 👉 SRP violations are the root cause of many design problems.

---

## 2️⃣ Core Java – Collections Framework

![Collections Image](/src/assets/backend/java-collections.png)

### ❓ What is the Collections Framework?

### 📝 Answer

Definition: A unified architecture to store, retrieve, and manipulate groups of objects.

Main components:

- Interfaces → List, Set, Queue, Map
- Implementations → ArrayList, HashSet, HashMap, etc.
- Algorithms → sort(), search(), shuffle() (via Collections class)

```java
List<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
```

### ❓ Difference between `Collection` and `Collections`

| **Collection**                                                   | **Collections**                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Interface**                                                    | **Utility class (`final`)**                                            |
| Used to **store and manage a group of objects**                  | Used to **operate on Collection objects**                              |
| Defines **basic operations** like `add()`, `remove()`, `size()`  | Provides **static helper methods** like `sort()`, `reverse()`, `max()` |
| Implemented by classes like `ArrayList`, `HashSet`, `LinkedList` | Not implemented or extended by any class                               |
| Part of the **Collections Framework hierarchy**                  | Not part of the hierarchy; acts as a **helper**                        |
| Allows **polymorphism** (`Collection ref = new ArrayList()`)     | Cannot be instantiated                                                 |

> **`Collection` stores data, `Collections` processes data.**

```java
// Collection
Collection<String> names = new ArrayList<>();
names.add("Java");
names.add("Python");
names.remove("Python");
System.out.println(names); // [Java]

Collection<Integer> numbers = new HashSet<>();
numbers.add(10);
numbers.add(20);
System.out.println(numbers); // [20, 10]

// Collections
List<Integer> list = new ArrayList<>();
list.add(3);
list.add(1);
list.add(2);

Collections.sort(list);
System.out.println(list); // [1, 2, 3]
```

1️⃣ What will be the output of the following code?

> ```java
> Collection<Integer> c = new ArrayList<>();
> c.add(3);
> c.add(1);
> c.add(2);
>
> Collections.sort(c);
> System.out.println(c);
>
> ```

_Output_

❌ Compiles and throws ClassCastException at runtime.

_Explanation_

- `Collections.sort()` accepts a `List`, not a `Collection`.
- Reference type mismatch

```java
public static <T extends Comparable<? super T>>
void sort(List<T> list)

```

1. Why does Collections.sort() accept List but not Collection?

- Sorting requires index-based access
- Only `List` guarantees positional access `(get(int index))`
- `Collection` could be a `Set` or `Queue`, where ordering or indexing doesn’t exist

> Collection → generic container
> List → ordered, index-based container

---

### ❓ Difference between `List`, `Set`, and `Map`

| **Feature**    | **List**                                                                                               | **Set**                                                                                                                 | **Map**                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Duplicates** | Allows duplicate elements. The same value can appear multiple times at different indexes.              | Does **not** allow duplicates. If you try to add a duplicate, it is ignored.                                            | Duplicate **keys** are not allowed (new value replaces old), but **values** can be duplicated.                                     |
| **Order**      | Maintains **insertion order**. Elements are stored and retrieved in the same sequence they were added. | Order **depends on implementation**: `HashSet` → no order, `LinkedHashSet` → insertion order, `TreeSet` → sorted order. | Does **not guarantee order** by default (`HashMap`). Some implementations maintain order (`LinkedHashMap`) or sorting (`TreeMap`). |
| **Access**     | Elements are accessed using a **numeric index** (position-based).                                      | No index available; elements are accessed using **iteration or search**.                                                | Values are accessed using a **key**, not by position or index.                                                                     |

```java
Map<Integer, String> map = new HashMap<>();
map.put(1, "Java");
```

1️⃣ What will be the output of the following code?

> ```java
> List<Integer> list = new ArrayList<>();
> list.add(10);
> list.add(20);
> list.remove(10);
> ```

_Output_

❌ it throws java.lang.IndexOutOfBoundsException at `list.remove(10);`

🧠 _Explanation_

List has two overloaded remove() methods:

- remove(int index)
- remove(Object o)

Because `10` is a primitive `int`, JVM tries to remove the element at index 10, but the list size is only `2`.

✅ _Correct Way_

```java
list.remove(Integer.valueOf(10));
```

> Remove by index → remove(index)
> Remove by value (Wrapper Object) → remove(Integer.valueOf(x))

2️⃣ What will be the output of the following code?

```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");

for (String s : list) {
    list.remove(s);
}
System.out.println(list);
```

_Output_

❌ it throws java.util.ConcurrentModificationException at `list.remove(s);`

🧠 _Explanation_

- Enhanced for-loop uses an **Iterator internally**
- Modifying the list directly breaks iterator contract

✅ _Correct Way_

```java
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    it.next();
    it.remove();
}
System.out.println(list); // []
```

_Alternate 1_

❌ Traditional for loop — Does NOT throw exception

```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");

for (int i = 0; i < list.size(); i++) {
    list.remove(i);
}
System.out.println(list); // [B] - No exception, but wrong Output

```

- When you remove index `0`, elements shift left
- `"B"` moves to index `0`
- Loop increments `i` → skips `"B"`

✅ _Correct Way_

```java
for (int i = list.size() - 1; i >= 0; i--) {
    list.remove(i);
}
System.out.println(list); // []

```

- Removing from the end
- No shifting issues

_Alternate 2_

✅ while loop with index — Safe

```java
int i = 0;
while (i < list.size()) {
    list.remove(i);
}
System.out.println(list); // []
```

- After removal, next element shifts to same index
- Index is not incremented

3️⃣ What will be the output of the following code?

```java
Set<Integer> set = new HashSet<>();
set.add(10);
set.add(20);
set.add(10);
System.out.println(set);
```

_Output_

```
[20, 10]   // or [10, 20]
```

🧠 _Explanation_

- `HashSet`:

  - ❌ Does NOT maintain insertion order
  - ❌ Does NOT allow duplicates

- Order is **hash-based**, not predictable

✔️ If order matters

```java
Set<Integer> set = new LinkedHashSet<>();
```

4️⃣ What will be the output of the following code?

```java
class Employee {
    int id;
    Employee(int id) { this.id = id; }
}

Set<Employee> set = new HashSet<>();
set.add(new Employee(1));
set.add(new Employee(1));
System.out.println(set.size());
```

_Output_

```
2
```

🧠 _Explanation_

Although both Employee objects have the same id value, Java treats them as different objects because:

- `HashSet` uses two methods to detect duplicates:
  1. `hashCode()` → to find the bucket
  2. `equals()` → to check equality inside the bucket
- In this class, neither `equals()` nor `hashCode()` is overridden
- So Java uses the default implementations from Object

Default behavior compares memory references, not data

> Each `new Employee(1)` is a different object in memory, so both are added to the set.

✅ _Correct Way_

```java
class Employee {
    int id;
    Employee(int id) { this.id = id; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true; // this refers to: The object already present in the HashSet. o refers to: The new object being added to the HashSet.
        if (!(o instanceof Employee)) return false; // Ensures the other object is of the correct type before comparing data
        Employee e = (Employee) o;
        return id == e.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

Set<Employee> set = new HashSet<>();
set.add(new Employee(1));
set.add(new Employee(1));
System.out.println(set.size()); // 1

```

🧠 What happens when you call set.add()? **(Equals and Hashcode)**

- HashSet internally uses a HashMap
- First time when calling `add(new Employee(1))`
  1. It first calls `hashCode()` of the object
  2. Finds an empty bucket
  3. Stores the object
  4. ❌ equals() is NOT called
- Second time when calling `add(new Employee(1))`
  1. Calls hashCode() of the new object
  2. Finds the target bucket and checks if bucket is empty
  3. if bucket has elements, ✔️ equals() is called

5️⃣ What will be the output of the following code?

```java
Map<String, Integer> map = new HashMap<>();
map.put(null, 1);
map.put(null, 2);
System.out.println(map);
```

_Output_

```
{null=2}
```

🧠 _Explanation_

In Java, a `HashMap` has these important properties:

- It allows one `null` key.
- It allows multiple `null` values.
- Keys must be unique — inserting a value with an existing key **overwrites** the old value.

In the above code,

- `null` is allowed as a key in `HashMap` and becomes `{null=1}`
- The new value `(2)` replaces the old value `(1)` and becomes `{null=2}`
- the second `put()` **overwrites** the first value.

6️⃣ What will be the output of the following code?

```java
Map<StringBuilder, String> map   new HashMap<>();

StringBuilder key = new StringBuilder("A");
map.put(key, "Value");

key.append("B");

System.out.println(map.get(key));
```

_Output_

```
null
```

🧠 _Explanation_

- `StringBuilder` is **mutable**
- `map.put(key, "Value");` = `HashMap` stores exactly 1 key–value pair based on `"A"`
- Key = reference to a StringBuilder object
- modifying the same key object from `"A"` → `"AB"`
- `map.get(key);`, generate a Hash based on `"AB"` and check in the bucket.
- Since there is no content for `"AB"`, the output result is `null`

✅ _Correct Way_

```java
Map<String, String> map = new HashMap<>();
String key = "A";
map.put(key, "Value");
```

> String is immutable, StringBuilder is mutable.
> HashMap requires keys to be immutable.

7️⃣ What will be the output of the following code?

```java
Map<Integer, String> map = new HashMap<>();
map.put(1, "A");
map.put(2, "B");

for (Integer key : map.keySet()) {
    map.remove(key);
}
System.out.println(map);
```

_Output_

❌ it throws java.util.ConcurrentModificationException

🧠 _Explanation_

- Enhanced for-loop uses an **Iterator internally**
- Modifying the Map directly breaks iterator contract

✅ _Correct Way_

```java
Iterator<Integer> it = map.keySet().iterator();
while (it.hasNext()) {
    it.next();
    it.remove();
}
```

---

### 4. Why does `Map` not extend `Collection`?

**Answer:**
Because `Map` stores **key-value pairs**, not individual elements.

👉 _Senior Insight:_ Operations like `add()` or `iterator()` don’t semantically apply.

---

### 5. Difference between `ArrayList` and `LinkedList`

| Feature       | ArrayList     | LinkedList         |
| ------------- | ------------- | ------------------ |
| Structure     | Dynamic array | Doubly linked list |
| Access        | Fast (O(1))   | Slow (O(n))        |
| Insert/Delete | Slow          | Fast               |

```java
List<Integer> list = new LinkedList<>();
list.add(10);
```

---

## 🔹 INTERMEDIATE LEVEL (Performance & Internals)

### 6. How does `HashMap` work internally?

**Answer:**

1. Key’s `hashCode()` is calculated
2. Index = `hash % capacity`
3. Stored as **Node<K,V>**
4. Collision handled using:

   - Linked List (before Java 8)
   - Red-Black Tree (Java 8+ if > 8 entries)

```java
map.put("A", 1);
```

👉 _Senior Focus:_ Collision handling + treeification threshold.

---

### 7. Difference between `HashMap`, `LinkedHashMap`, `TreeMap`

| Map           | Order                  | Performance     |
| ------------- | ---------------------- | --------------- |
| HashMap       | No order               | Fastest         |
| LinkedHashMap | Insertion/Access order | Slightly slower |
| TreeMap       | Sorted                 | O(log n)        |

```java
Map<Integer, String> map = new TreeMap<>();
```

---

### 8. What is fail-fast vs fail-safe iterator?

**Fail-Fast**

- Throws `ConcurrentModificationException`
- Example: `ArrayList`, `HashMap`

**Fail-Safe**

- Works on cloned copy
- Example: `ConcurrentHashMap`

```java
Iterator<Integer> it = list.iterator();
list.add(5); // Exception
```

---

### 9. Difference between `Iterator` and `ListIterator`

| Feature    | Iterator        | ListIterator |
| ---------- | --------------- | ------------ |
| Direction  | Forward only    | Both         |
| Add/Set    | ❌              | ✔            |
| Applies to | All collections | Only List    |

---

### 10. How does `equals()` and `hashCode()` affect HashSet?

**Answer:**

- `hashCode()` → bucket location
- `equals()` → duplicate check

```java
class Employee {
    int id;

    public int hashCode() { return id; }
    public boolean equals(Object o) {
        return this.id == ((Employee)o).id;
    }
}
```

👉 _Senior Mistake:_ Overriding one without the other.

---

## 🔹 ADVANCED LEVEL (Concurrency & Design)

### 11. Difference between `Comparable` and `Comparator`

| Comparable    | Comparator    |
| ------------- | ------------- |
| Natural order | Custom order  |
| `compareTo()` | `compare()`   |
| Inside class  | Outside class |

```java
Collections.sort(list, (a, b) -> b - a);
```

---

### 12. How does `ConcurrentHashMap` work internally?

**Answer:**

- Java 7 → Segment locking
- Java 8+ → Bucket-level locking + CAS

👉 Allows **high concurrency with minimal blocking**

```java
Map<Integer, String> map = new ConcurrentHashMap<>();
```

---

### 13. Why is `HashMap` not thread-safe?

- No synchronization
- Race conditions
- Infinite loop risk (pre-Java 8 rehashing)

---

### 14. Difference between `SynchronizedMap` and `ConcurrentHashMap`

| SynchronizedMap | ConcurrentHashMap |
| --------------- | ----------------- |
| Full lock       | Partial lock      |
| Slower          | Faster            |
| Fail-fast       | Fail-safe         |

---

### 15. What is the time complexity of common operations?

| Structure  | Get      | Add      | Remove   |
| ---------- | -------- | -------- | -------- |
| ArrayList  | O(1)     | O(1)\*   | O(n)     |
| LinkedList | O(n)     | O(1)     | O(1)     |
| HashMap    | O(1)     | O(1)     | O(1)     |
| TreeMap    | O(log n) | O(log n) | O(log n) |

---

## 🔹 EXPERT LEVEL (Deep Internals & Edge Cases)

### 16. Explain resizing in HashMap

- Default capacity = **16**
- Load factor = **0.75**
- Resize when size > (capacity × load factor)

👉 Resizing is **expensive (rehashing)**

---

### 17. Why are immutable keys recommended in HashMap?

**Answer:**
If key changes after insertion:

- `hashCode()` changes
- Entry becomes unreachable

```java
map.put(new StringBuilder("key"), "value"); // BAD
```

---

### 18. What is `WeakHashMap`?

- Keys are weakly referenced
- GC removes entries when key is no longer referenced

```java
Map<Object, String> map = new WeakHashMap<>();
```

👉 Used in **caching frameworks**

---

### 19. Difference between `CopyOnWriteArrayList` and `ArrayList`

| CopyOnWrite                        | ArrayList |
| ---------------------------------- | --------- |
| Thread-safe                        | Not       |
| No ConcurrentModificationException | Yes       |
| Write expensive                    | Cheap     |

---

### 20. How would you choose the right Collection?

**Decision Rule**

- Fast search → `HashMap`
- Sorted data → `TreeMap`
- Insertion order → `LinkedHashMap`
- Thread-safe reads → `ConcurrentHashMap`
- Frequent inserts → `LinkedList`

### ❓ How do you choose between List, Set, and Map?

- What factors influence your choice?
- How does access pattern affect this decision?

---

### ❓ How does HashMap work internally?

- What happens when two keys have the same hash?
- How does Java 8 optimize HashMap?
- What is the impact of a bad hashCode implementation?

---

### ❓ Difference between HashMap, LinkedHashMap, and TreeMap?

- When would you use TreeMap despite slower performance?
- Memory vs ordering trade-offs?

---

### ❓ How does ConcurrentHashMap work internally?

- How is it different from Hashtable?
- Why is it more scalable?

---

### ❓ When would you prefer immutable collections?

- What are the trade-offs?

---

## 3️⃣ Core Java – equals(), hashCode(), Comparable

### ❓ Why must equals() and hashCode() be consistent?

- What breaks if they aren’t?
- How does this affect HashMap and HashSet?

---

### ❓ Difference between Comparable and Comparator?

- When do you use one over the other?
- Real-world example?

---

### ❓ What are common mistakes in equals() implementations?

- How do you avoid them?

---

## 4️⃣ Java 8+ Features (Streams, Optional, Lambda)

### ❓ Why were Streams introduced in Java?

- How do Streams differ from collections?
- Are Streams always better than loops?

---

### ❓ When should Streams NOT be used?

- Debugging concerns?
- Performance concerns?

---

### ❓ How do parallel streams work internally?

- When are they dangerous?
- CPU-bound vs IO-bound tasks?

---

### ❓ How do you use Optional correctly?

- Where should Optional NOT be used?
- Why is Optional discouraged as a field?

---

### ❓ How do lambdas impact readability and debugging?

- Have you seen misuse of lambdas?

---

## 5️⃣ Exception Handling – Senior Strategy

### ❓ How do you design exception handling in large Java applications?

- How do you avoid exception clutter?
- Where should exceptions be handled?

---

### ❓ Checked vs unchecked exceptions – what is your strategy?

- Why are checked exceptions controversial?
- When do you still use them?

---

### ❓ How do you design custom exceptions?

- What information should exceptions carry?
- Logging vs rethrowing?

---

### ❓ How do exceptions affect performance?

- Have you faced performance issues due to exceptions?

---

## 6️⃣ Immutability & Object Design

### ❓ Why do you prefer immutable objects?

- How does immutability help concurrency?
- What are the drawbacks?

---

### ❓ How do you design immutable classes?

- What common mistakes break immutability?

---

### ❓ When is mutability acceptable or required?

- Real-world examples?

---

## 7️⃣ Concurrency & Multithreading (Very Important)

### ❓ How do you handle concurrency in Java applications?

- How do you avoid shared mutable state?
- What concurrency bugs have you faced?

---

### ❓ synchronized vs ReentrantLock?

- When do you prefer one over the other?
- Fairness and try-lock use cases?

---

### ❓ What are volatile variables?

- When are they insufficient?
- Difference between visibility and atomicity?

---

### ❓ How does ExecutorService work?

- Why is it preferred over creating threads manually?
- How do you size thread pools?

---

### ❓ How do Concurrent collections work internally?

- Difference between CopyOnWriteArrayList and synchronizedList?

---

### ❓ Deadlocks – how do they occur and how do you prevent them?

- Detection strategies?
- Design-time prevention?

---

## 8️⃣ JVM Deep Dive (Senior Expectation)

### ❓ Explain JVM memory structure.

- Heap vs Stack vs Metaspace
- What lives where?

---

### ❓ How does Garbage Collection work?

- Minor vs Major GC?
- Stop-the-world events?

---

### ❓ Types of GC algorithms you are aware of?

- G1, CMS, ZGC – when to use which?
- Trade-offs?

---

### ❓ What causes memory leaks in Java?

- Even with GC, why do leaks happen?
- How do you diagnose them?

---

### ❓ How do you analyze OutOfMemoryError?

- Tools you have used?
- Heap dump analysis experience?

---

### ❓ How does JVM tuning work at a high level?

- Which parameters have you tuned?
- What mistakes to avoid?

---

## 9️⃣ Java Performance & Optimization

### ❓ How do you approach performance optimization in Java?

- Measure-first strategy?
- Tools used?

---

### ❓ Object creation cost – when does it matter?

- GC pressure?
- Pooling objects – good or bad?

---

### ❓ String vs StringBuilder vs StringBuffer?

- Real-world impact?

---

### ❓ How does autoboxing affect performance?

- Where have you seen issues?

---

## 🔟 Advanced Java Topics

### ❓ How does class loading work in Java?

- Parent delegation model?
- Custom class loaders?

---

### ❓ Reflection – when do you use it and why?

- Performance impact?
- Security implications?

---

### ❓ Serialization – problems and alternatives?

- Why is Java serialization discouraged?

---

### ❓ How does Java handle backward compatibility?

- How do you manage versioning?

---

## 1️⃣1️⃣ Java + Spring Integration (Very Common)

### ❓ How does Spring manage object lifecycle differently from plain Java?

- Inversion of Control impact?

---

### ❓ How does dependency injection improve testability?

- Constructor vs field injection?

---

### ❓ How do proxies work in Spring?

- JDK dynamic proxy vs CGLIB?
- Impact on final methods?

---

### ❓ How do transactions work internally in Spring?

- Propagation types?
- Rollback rules?

---

### ❓ How do Spring annotations impact performance?

- Reflection cost?
- Startup time?

---

## 1️⃣2️⃣ Mock Senior Interview – Deep Pressure Questions

### ❓ If you had to redesign your last Java application today, what would you change?

- What technical debt did you accept earlier?
- Why?

---

### ❓ What is the worst production bug you caused?

- How did you debug it?
- What did you learn?

---

### ❓ How do you balance clean code vs delivery pressure?

- When do you compromise?

---

### ❓ How do you mentor junior developers in Java?

- Code reviews?
- Design discussions?

---

### ❓ What Java feature do you avoid and why?

- Experience-based reasoning?

---

### ❓ What’s something you disagree with Java community best practices on?

- Why?

---

```

```
