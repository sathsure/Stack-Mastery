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
