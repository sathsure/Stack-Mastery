### ❓ Reverse an Array

### 📝 Answer

```java
int[] arr = {1, 2, 3, 4};

System.out.println(Arrays.toString(arr)); // [1,2,3,4]
for(int i=0,j=arr.length -1;i<j;i++,j--) {
  int temp = arr[i];
  arr[i] = arr[j];
  arr[j]=temp;
}
System.out.println(Arrays.toString(arr)); // [4,3,2,1]

/* ---- Works only for object arrays, not primitives.---- */
Integer[] arr = {1, 2, 3};
System.out.println(Arrays.toString(arr)); // [1,2,3,4]
Collections.reverse(Arrays.asList(arr));
System.out.println(Arrays.toString(arr)); // [4,3,2,1]
```

### ❓ Find First Non-Repeating Character

> Input: "swiss"
> Output: 'w'

### 📝 Answer

```java
public static Character firstNonRepeating(String input) {
    Map<Character, Long> countMap =
            input.chars()
                 .mapToObj(c -> (char) c)
                 .collect(Collectors.groupingBy(
                         Function.identity(),
                         LinkedHashMap::new,
                         Collectors.counting()
                 ));

    return countMap.entrySet()
                   .stream()
                   .filter(e -> e.getValue() == 1)
                   .map(Map.Entry::getKey)
                   .findFirst()
                   .orElse(null);
}
```

❓ `input.toCharArray()` vs `input.chars()`?

`input.toCharArray()` 👉 Converts the `String` into a **char[] (character array)**

```java
String input = "ABC";

char[] chars = input.toCharArray();
for (char c : chars) {
    System.out.println(c);
}
```

🎯 **Key Understanding**

- Returns: `char[]`
- Best for **simple loops**

`input.chars()` 👉 Returns a **stream of character codes (int values)**

```java
String input = "ABC";

input.chars()
     .forEach(c -> System.out.println((char) c));
```

🎯 **Key Understanding**

- Returns: `IntStream`
- Each value is an **ASCII/Unicode code**
- Requires casting to `char`
- Useful for **stream operations** (filter, map, count)

❓ map vs mapToInt vs mapToObj vs mapToLong vs mapToDouble vs flatMap

1️⃣ `map()` 👉 **Transforms each element → another element**

```java
List<String> names = List.of("java", "angular");

List<String> upper =
    names.stream()
         .map(s -> s.toUpperCase())
         .toList();

System.out.println(upper); // [JAVA, ANGULAR]
```

2️⃣ `mapToInt()` 👉 **Object → primitive `int` stream (`IntStream`)**

```java
List<String> names = List.of("java", "angular");

int[] lengths =
    names.stream()
         .mapToInt(s -> s.length())
         .toArray();

System.out.println(Arrays.toString(lengths)); // [4, 7]
```

3️⃣ `mapToLong()` 👉 **Object → primitive `long` stream (`LongStream`)**

```java
List<String> files = List.of("a", "bb", "ccc");

long total =
    files.stream()
         .mapToLong(s -> s.length())
         .sum();

System.out.println(total); // 6
```

4️⃣ `mapToDouble()` 👉 **Object → primitive `double` stream (`DoubleStream`)**

```java
List<Integer> prices = List.of(100, 200, 300);

double avg =
    prices.stream()
          .mapToDouble(p -> p * 1.18)
          .average()
          .getAsDouble();

System.out.println(avg); // 236.0
```

5️⃣ `mapToObj()` 👉 **Primitive → Object stream**

```java
IntStream.range(1, 4)
         .mapToObj(i -> "Item-" + i)
         .forEach(System.out::println); // Item-1 Item-2 Item-3
```

6️⃣ `flatMap()` 👉 **Flattens nested streams (many → one)**

```java
List<List<String>> data =
    List.of(
        List.of("A", "B"),
        List.of("C", "D")
    );

List<String> flat =
    data.stream()
        .flatMap(list -> list.stream())
        .toList();

System.out.println(flat); // [A, B, C, D]
```

❓ What does this code do? (Short & Simple)

```java
Collectors.groupingBy(
    Function.identity(),
    LinkedHashMap::new,
    Collectors.counting()
)
```

`groupingBy`:

- How to group? → key
- Where to store? → map type (optional)
- What to store? → value aggregation (optional)

Example:

```java
Map<Integer, List<String>> map =
    list.stream().collect(groupingBy(String::length));

// ✔ Default map
// ✔ Default value = List<T>
```

1️⃣ `Function.identity()`

```java
Function.identity()
```

- Means **“use the element itself as the key”**
- No transformation

Example:

```java
"A" → key "A"
"B" → key "B"
```

2️⃣ `LinkedHashMap::new`

```java
LinkedHashMap::new
```

- Specifies the **map implementation**
- Preserves **insertion order**

3️⃣ `Collectors.counting()`

```java
Collectors.counting()
```

- Counts how many elements fall into each group
- Returns `Long`

❓ Collectors.toMap

```java
List<String> list = List.of("A", "B", "A", "C", "B");

Map<String, Integer> map =
    list.stream()
        .collect(Collectors.toMap(
            s -> s,              // 1️⃣ keyMapper
            s -> 1,              // 2️⃣ valueMapper
            Integer::sum,        // 3️⃣ mergeFunction - What if duplicate keys?
            LinkedHashMap::new   // 4️⃣ mapFactory - Which Map implementation?
        ));

System.out.println(map); // {A=2, B=2, C=1}
```

---

### ❓ Optional.isPresent vs Optional.IfPresent

### 📝 Answer

`Optional.isPresent()` - To check if the Optional instance contains a non-null value

```java
Optional<String> optional = Optional.of("Hello");

if (optional.isPresent()) {
    System.out.println("Value is: " + optional.get()); // Can throw an exception if the Optional is empty
} else {
    System.out.println("Value is not present.");
}
```

Usage: Typically used in a traditional if-else block

`Optional.ifPresent()` - To perform a specific action on the contained value only if it is present.

```java
Optional<String> optional = Optional.of("Hello");

// The consumer action is executed only if a value is present
optional.ifPresent(value -> System.out.println("Value is: " + value));
// Output: Value is: Hello
```

Usage: It takes a lambda expression (or method reference) as an argument

---

### ❓ Remove Duplicates from a List (Preserve Order)

### 📝 Answer

```java
public static List<Integer> removeDuplicates(List<Integer> list) {
    return new ArrayList<>(new LinkedHashSet<>(list));
}

// OR

Set<Integer> set = list
                    .stream()
                    .collect(Collectors.toCollection(LinkedHashSet::new))
```

---

### ❓ Count Word Occurrences

> Input: "java spring java angular spring java"

### 📝 Answer

```java
public static Map<String, Long> wordCount(String input) {
    return Arrays.stream(input.split(" "))
            .collect(Collectors.groupingBy(
                    word -> word,
                    LinkedHashMap::new,
                    Collectors.counting()
            ));
}
```

---

### ❓ Check if String is Palindrome (Ignore Case & Spaces)

### 📝 Answer

```java
public static boolean isPalindrome(String s) {
    String cleaned = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    return new StringBuilder(cleaned).reverse().toString().equals(cleaned);
}
```

---

### ❓ Find Second Highest Number in Array

### 📝 Answer

```java
public static int secondHighest(int[] arr) {
    int first = Integer.MIN_VALUE;
    int second = Integer.MIN_VALUE;

    for (int num : arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num != first) {
            second = num;
        }
    }
    return second;
}
```

---

### ❓ Thread-Safe Counter

### 📝 Answer

```java
class Counter {
    private AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();
    }

    public int getValue() {
        return count.get();
    }
}
```

---

### ❓ Reverse Words in a Sentence

> Input: "Java is powerful"
> Output: "powerful is Java"

### 📝 Answer

```java
public static String reverseWords(String s) {
    String[] words = s.split(" ");
    Collections.reverse(Arrays.asList(words));
    return String.join(" ", words);
}
```

---

### ❓ Reverse a LinkedList

### 📝 Answer

```java
public class Main {
    public static void main(String[] args) {

        Node node = new Node(1);                 // create head node
        node.next = new Node(1);                 // link second node
        node.next.next = new Node(1);            // link third node
        node.next.next.next = new Node(1);       // link fourth node

        printNode(node);                         // print original list

        node = reverse(node);                    // update head after reversal

        printNode(node);                         // print reversed list
    }

    static void printNode(Node node) {
        Node curr = node;                        // start traversal from head
        while (curr != null) {                   // traverse till end of list
            System.out.println(curr.data);       // print current node data
            curr = curr.next;                    // move to next node
        }
    }

    static Node reverse(Node node) {
        Node prev = null;                        // will become new head
        Node curr = node;                        // start from current head

        while (curr != null) {                   // iterate till list ends
            Node next = curr.next;               // store next node
            curr.next = prev;                    // reverse the link
            prev = curr;                         // move prev forward
            curr = next;                         // move curr forward
        }
        return prev;                             // return new head
    }
}

class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;                        // store node value
        this.next = null;                        // initialize next as null
    }
}
```

---

### ❓ What will be the output of the following code?

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

### 📝 Answer

_Output_

❌ Compiles and throws ClassCastException at runtime.

🧠 _Explanation_

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

### ❓ What will be the output of the following code?

> ```java
> List<Integer> list = new ArrayList<>();
> list.add(10);
> list.add(20);
> list.remove(10);
> ```

### 📝 Answer

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

---

### ❓ What will be the output of the following code?

> ```java
> List<String> list = new ArrayList<>();
> list.add("A");
> list.add("B");
>
> for (String s : list) {
>     list.remove(s);
> }
> System.out.println(list);
> ```

### 📝 Answer

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

---

### ❓ What will be the output of the following code?

> ```java
> Set<Integer> set = new HashSet<>();
> set.add(10);
> set.add(20);
> set.add(10);
> System.out.println(set);
> ```

### 📝 Answer

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

---

### ❓ What will be the output of the following code?

> ```java
> class Employee {
>     int id;
>     Employee(int id) { this.id = id; }
> }
>
> Set<Employee> set = new HashSet<>();
> set.add(new Employee(1));
> set.add(new Employee(1));
> System.out.println(set.size());
> ```

### 📝 Answer

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

---

### ❓ What will be the output of the following code?

> ```java
> Map<String, Integer> map = new HashMap<>();
> map.put(null, 1);
> map.put(null, 2);
> System.out.println(map);
> ```

### 📝 Answer

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

---

### ❓ What will be the output of the following code?

> ```java
> Map<StringBuilder, String> map   new HashMap<>();
>
> StringBuilder key = new StringBuilder("A");
> map.put(key, "Value");
>
> key.append("B");
>
> System.out.println(map.get(key));
> ```

### 📝 Answer

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

---

### ❓ What will be the output of the following code?

> ```java
> Map<Integer, String> map = new HashMap<>();
> map.put(1, "A");
> map.put(2, "B");
>
> for (Integer key : map.keySet()) {
>     map.remove(key);
> }
> System.out.println(map);
> ```

### 📝 Answer

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

### ❓ What will be the output of the following code? **(orElse() vs orElseGet())**

> ```java
> Optional<String> name = Optional.of("Dev");
>
> String value = name.orElse(getDefault());
> System.out.println(value);
>
> static String getDefault() {
>     System.out.println("Default called");
>     return "Default";
> }
> ```

### 📝 Answer

```
Default called
Dev
```

🧠 _Explanation_

- orElse() always executes the argument even when value is present.
- use `orElseGet()` → `name.orElseGet(() -> getDefault());`

```
Dev
```

---

### ❓ What will be the output of the following code? **(Optional get())**

> ```java
> Optional<String> name = Optional.empty();
> System.out.println(name.get());
> ```

### 📝 Answer

❌ Throws NoSuchElementException

---

### ❓ Employee–Department Related Questions

> You are given two classes, `Employee` and `Department`.
> Each department references employees using `empId`.
> Write a program to:
>
> 1. Find the total number of employees
> 2. Find the total number of employees grouped by department name
> 3. Identify the department with the lowest number of employees
> 4. Identify the department with the highest number of employees
> 5. Calculate the average employee score

### 📝 Answer

```java
/* ---- Model Classes ----*/
class Employee {
    String empId;
    String empName;
    int empScore;
}

class Department {
    String depId;
    String depName;
    String empId; // Foreign key reference
}


/* ---- Total Number of Employees ----*/
int totalEmployees = employees.size(); // Direct count

/* ---- Employees per Department ----*/
Map<String, Long> empCountByDept =
    departments.stream()
        .collect(Collectors.groupingBy(
            d -> d.depName,
            Collectors.counting()
        )); // Group by department name

/* ---- Department with Lowest Employees ----*/
String minDept =
    empCountByDept.entrySet()
        .stream()
        .min(Map.Entry.comparingByValue())
        .get()
        .getKey(); // Lowest count department

/* ---- Department with Highest Employees ----*/
String maxDept =
    empCountByDept.entrySet()
        .stream()
        .max(Map.Entry.comparingByValue())
        .get()
        .getKey(); // Highest count department

/* ---- Average Employee Score ----*/
double avgScore =
    employees.stream()
        .mapToInt(e -> e.empScore)
        .average()
        .orElse(0); // Handles empty list safely
```

---

### ❓ Perfect Numbers

> Write a program to find all **perfect numbers** up to a given input `N`.
> A perfect number is one where the sum of its positive divisors (excluding itself) equals the number.

### 📝 Answer

```java
static List<Integer> findPerfectNumbers(int n) {
    List<Integer> result = new ArrayList<>();

    for (int i = 2; i <= n; i++) {
        int sum = 1; // 1 is always a divisor

        for (int j = 2; j <= i / 2; j++) {
            if (i % j == 0) sum += j; // Add divisor
        }

        if (sum == i) result.add(i); // Perfect number check
    }
    return result;
}
```

**Time Complexity:** `O(n²)`
**Output (1000):** `[6, 28, 496]`

---

### ❓ Two Sum Problem

> Given an integer array and a target value, find the indices of two numbers whose sum equals the target.
> Implement:
>
> - A brute-force solution (O(n²))
> - An optimized solution (O(n))

### 📝 Answer

**Approach 1: Brute Force (O(n²))**

```java
static int[] twoSumBrute(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target)
                return new int[]{i, j}; // Match found
        }
    }
    return new int[]{};
}
```

**Approach 2: Optimized (O(n)) – HashMap**

```java
static int[] twoSumOptimized(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
        int diff = target - nums[i];

        if (map.containsKey(diff))
            return new int[]{map.get(diff), i}; // Complement found

        map.put(nums[i], i); // Store number with index
    }
    return new int[]{};
}
```
