### ❓ What is an RDBMS?

### 📝 Answer

An RDBMS stores data in **structured tables**, enforces **relationships using keys**, and guarantees **data integrity through constraints and transactions**.

- Data consistency
- Multi-user concurrency
- ACID compliance
- Complex querying

**Example**

```sql
CREATE TABLE employee (
  emp_id INT PRIMARY KEY,
  name VARCHAR(50),
  salary NUMBER
);
```

❓ How is RDBMS different from DBMS?
DBMS doesn’t enforce relationships or ACID strictly.

❓ Can RDBMS scale?
Vertically very well, horizontally with sharding/replication.

---

### ❓ Primary Key vs Unique Key vs Foreign Key?

### 📝 Answer

| Feature                         | **Primary Key**                         | **Unique Key**                           | **Foreign Key**                |
| ------------------------------- | --------------------------------------- | ---------------------------------------- | ------------------------------ |
| **What it does**                | Uniquely identifies each row in a table | Ensures values are not duplicated        | Links a table to another table |
| **Uniqueness**                  | Always unique                           | Always unique                            | Duplicates allowed             |
| **NULL values**                 | ❌ Not allowed                          | ✔ Allowed (Oracle allows multiple NULLs) | ✔ Allowed                      |
| **How many key can be defined** | only ONE (emp_id)                       | MULTIPLE (email, phone)                  | Multiple allowed               |

```sql
CREATE TABLE department (
  dept_id INT PRIMARY KEY,
  dept_name VARCHAR(50)
);

CREATE TABLE employee (
  emp_id INT PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  dept_id INT,
  CONSTRAINT fk_employee_department
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)

-- dept_id INT - creates a column named dept_id in the employee table
-- CONSTRAINT - Constraint means setting a rule on the data
-- CONSTRAINT fk_employee_department - Naming a constraint is a best practice
-- FOREIGN KEY (dept_id) - dept_id is a foreign key (Means this column depends on another table)
-- REFERENCES department(dept_id) - value in employee.dept_id must exist in department.dept_id
);
```

❓ Can a foreign key be NULL?
Yes, unless **constrained**.

❓ What Is a Composite Primary Key?
A composite primary key is a **primary key made up of more than one column**.

```sql
-- Composite Primary Key
CREATE TABLE Employee_Project (
    emp_id INT,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    project_id INT,
    PRIMARY KEY (emp_id, project_id)
);

-- Composite Primary Key with Foreign Keys
CREATE TABLE Employee (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50)
);

CREATE TABLE Project (
    project_id INT PRIMARY KEY,
    project_name VARCHAR(50)
);

CREATE TABLE Employee_Project (
    emp_id INT,
    project_id INT,
    PRIMARY KEY (emp_id, project_id),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id),
    FOREIGN KEY (project_id) REFERENCES Project(project_id)
);
```

---

### ❓What is Normalization?

### 📝 Answer

Normalization is the process of **organizing database** tables to **reduce data duplication** and avoid data inconsistency.

Normalization avoids:

- **Insert anomaly** – A new record cannot be inserted properly because some required data is missing.
- **Update anomaly** – The same data exists in multiple places and is updated in one place but not everywhere.
- **Delete anomaly** – Unintended loss of important data occurs when a record is deleted.

Normalization is a **DESIGN CHECK**, **not a DB rule.**

- No SQL constraint
- No MySQL / Oracle setting
- No “NORMALIZE TABLE” command

> 👉 It happens at design time, when you analyze data relationships.

1. **1NF - Can this column contain multiple values?**

❌ Problem (Not in 1NF)

```text
Employee
--------------------------------
emp_id | emp_name | phone_numbers
--------------------------------
1      | Ravi     | 9876,1234
```

**Why wrong?**

- `phone_numbers` has **multiple values**
- Violates **atomic value rule**

✅ Fix (Convert to 1NF)

Split multi-valued column into a new table.

```text
Employee
----------------------
emp_id | emp_name
----------------------
1      | Ravi
```

```text
Employee_Phone
------------------------
emp_id | phone_number
------------------------
1      | 9876
1      | 1234
```

✔ Now each column has **single values**
✔ No repeating groups

> “1NF removes repeating groups and multi-valued attributes.”

**2NF - Does this column depend on the FULL primary key?**

📌 Rule

1. **Must already be in 1NF**
2. **No partial dependency**
   - Non-key column **must depend on full primary key**, not part of it

📍 Where this rule applies - **Table with Composite Primary Key**

❌ Problem (Not in 2NF)

```text
Employee_Project
-----------------------------------
(emp_id, project_id) | emp_name
-----------------------------------
1, 101               | Ravi
```

**Primary Key:** `(emp_id, project_id)`

**Why wrong?**

- `emp_name` depends only on `emp_id`
- NOT dependent on `project_id`
- This is a **partial dependency**

✅ Fix (Convert to 2NF)

Split table based on dependency.

```text
Employee
--------------------
emp_id | emp_name
--------------------
1      | Ravi
```

```text
Employee_Project
------------------------
emp_id | project_id
------------------------
1      | 101
```

✔ Every non-key column depends on **whole key**

> “2NF removes partial dependency from composite keys.”

**3NF - Is a non-key column depending on another non-key column?**

📌 Rule (What to add)

1. **Must already be in 2NF**
2. **No transitive dependency**
   - Non-key column should NOT depend on another non-key column

📍 Where this rule applies - **Column dependency level**

❌ Problem (Not in 3NF)

```text
Employee
--------------------------------
emp_id | emp_name | dept_name
--------------------------------
1      | Ravi     | IT
```

**Hidden dependency:**

```text
emp_id → dept_name
dept_name → dept_location
```

So:

```text
emp_id → dept_location  (Indirect / Transitive)
```

✅ Fix (Convert to 3NF)

Split dependent attributes into separate tables.

```text
Employee
-----------------------
emp_id | emp_name | dept_id
-----------------------
1      | Ravi     | 10
```

```text
Department
-----------------------------------
dept_id | dept_name | dept_location
-----------------------------------
10      | IT        | Adelaide
```

✔ Non-key columns depend **only on primary key**
✔ No indirect dependency

> “3NF removes transitive dependency.”

---

### ❓ What is Index?

### 📝 Answer

An Index is a database object that improves the **speed of data retrieval** operations on a table.

- It works like a book index → instead of scanning every page, you jump directly to the required page.
- Internally, most RDBMS use B-Tree (or sometimes Hash) structures.
- Indexes are created on one or more columns of a table.

```sql
CREATE INDEX idx_emp_email ON employee(email);
```

> ➡️ This allows faster searches on the email column.

**When Index is NOT Used, What Happens?**

1. Full Table Scan occurs

- The database checks every row in the table.
- Performance degrades heavily for large tables.

2. Effects:

- Slower SELECT queries
- Higher CPU and I/O usage

```sql
SELECT * FROM employee WHERE email = 'abc@xyz.com';
```

> ➡️ DB scans all rows to find the match

**Rules / Best Practices for Indexes**

✅ When to Create an Index
✔ Columns used in:

- WHERE
- JOIN
- ORDER BY
- GROUP BY
- PRIMARY KEY / UNIQUE

❌ When NOT to Create an Index

- Columns with very few unique values (like gender or status)
- Frequent INSERT / UPDATE / DELETE
- Small tables (table scan is faster)

❓ How Many Indexes Can Be Used in a Query?

- Usually only ONE index per table is used in a query execution plan.
- However, Composite (multi-column) indexes count as one index
- A query involving **multiple tables can use one index per table**.
  ```sql
  SELECT *
  FROM orders o
  JOIN customers c ON o.customer_id = c.id
  WHERE c.email = 'x@y.com';
  ```
  ➡️ Index on customers.email
  ➡️ Index on orders.customer_id

---

### ❓ Which performs better, `JOIN` or `SUBQUERY`?

### 📝 Answer

👉 JOIN usually performs better than a SUBQUERY

- Data is processed in a single execution plan
- Better use of indexes
- More readable and maintainable

```sql
-- Subquery
SELECT name
FROM employee
WHERE dept_id IN (
  SELECT dept_id FROM department WHERE location = 'NY'
);

-- JOIN
SELECT e.name
FROM employee e
JOIN department d
ON e.dept_id = d.dept_id
WHERE d.location = 'NY';
```

---

### ❓ What is a View?

### 📝 Answer

A View is a **virtual table** created from a SQL query.

- It does not store data itself
- It shows data from one or more tables
- It behaves like a table when you query it

```sql
--- CREATE A VIEW
CREATE VIEW active_employees AS
SELECT id, name, department
FROM employee
WHERE status = 'ACTIVE';

-- GET VIEW
SELECT * FROM active_employees;
```

---

### ❓ What is a Stored Procedure?

### 📝 Answer

A stored procedure is a **pre-written SQL program stored in the database** that can be executed by name to perform a specific task.

👉 Think of it like a **function** in programming, but written in SQL and executed by the database.

🔹 Why we use Stored Procedures?

- Reuse SQL logic (write once, use many times)
- Faster execution (precompiled)
- Better security (direct table access can be restricted)
- Keeps business logic close to the data

```sql
-- IN (Input parameter)
CREATE PROCEDURE getEmployeeById(IN empId INT)
BEGIN
  SELECT * FROM employee WHERE id = empId;
END;

-- Call it like this:
CALL getEmployeeById(101);

-------------------------------------------

-- OUT (Output parameter)
CREATE PROCEDURE getEmployeeCount(OUT totalEmployees INT)
BEGIN
  SELECT COUNT(*) INTO totalEmployees FROM employee;
END;

-- Call it like this:
CALL getEmployeeCount(@count);
SELECT @count;

-------------------------------------------

-- INOUT (Input + Output)
CREATE PROCEDURE increaseSalary(INOUT salary INT)
BEGIN
  SET salary = salary + 5000;
END;

-- Call it like this:
SET @sal = 40000;
CALL increaseSalary(@sal);
SELECT @sal;
```

🔹 Stored Procedure vs Function?

- **Stored Procedure** - Used to perform actions (insert, update, delete, complex logic), May or may not return a value
- **Function** - Stored SQL block that **always returns a value**, Can be used inside SQL queries

```sql
-- FUNCTION
CREATE FUNCTION calculateBonus(salary DECIMAL(10,2))
RETURNS DECIMAL(10,2)
BEGIN
  RETURN salary * 0.10;
END;

-- Call it like this:
SELECT calculateBonus(salary) FROM employee;
```

🔹 Cursor in Stored Procedure

    A cursor is used to fetch and process query results row by row inside a stored procedure.

    ```sql
    DECLARE cur CURSOR FOR SELECT salary FROM employee;

    OPEN cur;

    FETCH cur INTO empSalary;

    CLOSE cur;

    -- Each FETCH does
    -- empSalary = 30000
    -- empSalary = 40000
    -- empSalary = 50000
    ```

**Scenario:**
You want to increase salary by 10% for employees one by one, and maybe do some logic per employee

    ```sql
    CREATE PROCEDURE incSalaryCursor()

    BEGIN
        DECLARE done INT DEFAULT 0;
        DECLARE id INT;
        DECLARE sal INT;

        DECLARE cur CURSOR FOR SELECT id, salary FROM employee; -- Defines the data the cursor reads
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1; -- Defines what happens when no more rows are available

        OPEN cur;

        LOOP
            FETCH cur INTO id, sal;
            IF done = 1 THEN LEAVE; END IF;

            UPDATE employee
            SET salary = sal * 1.10,
                role = REPLACE(role, 'Junior', 'Senior')
            WHERE id = id;

        END LOOP;

        CLOSE cur;
    END;

    -- CONTINUE → continue execution
    -- HANDLER → declares an exception handler
    -- FOR NOT FOUND → condition when no rows are found (cursor end)
    -- SET done = 1 → action to perform
    ```

🔹 What is `REPLACE` in a Stored Procedure?

`REPLACE` is a string function used to replace part of a string with another string.

    ```sql
    SELECT REPLACE('Java Developer', 'Java', 'Angular');

    -- OUTPUT
    -- Angular Developer
    ```

---

### ❓ Tricky Questions

### 📝 Answer

1. **NULL Comparison**

```sql
SELECT * FROM employee WHERE salary = NULL;
```

**Output:** ❌ No rows

✅ Correct:

```sql
WHERE salary IS NULL;
```

2: **COUNT(\*), COUNT(col)**

```sql
SELECT COUNT(*), COUNT(salary) FROM employee;
```

**Output Explanation**

- `COUNT(*)` → all rows
- `COUNT(salary)` → excludes NULLs

3. **DELETE with JOIN**

```sql
DELETE e
FROM employee e
JOIN department d ON e.dept_id = d.dept_id
WHERE d.name = 'HR';
```

**Output**

✅ Deletes all HR employees

4. **Second Highest Salary**

```sql
SELECT MAX(salary)
FROM employee
WHERE salary < (SELECT MAX(salary) FROM employee);
```

5. **Duplicate Records**

```sql
SELECT name, COUNT(*)
FROM employee
GROUP BY name
HAVING COUNT(*) > 1;
```

6. **EXISTS vs IN**

employee

| id  | name  | dept_id |
| --- | ----- | ------- |
| 1   | Asha  | 10      |
| 2   | Ravi  | 20      |
| 3   | Meena | 10      |

department

| id  | dept_name |
| --- | --------- |
| 10  | IT        |
| 20  | HR        |

```sql
-- Using IN
SELECT name
FROM employee
WHERE dept_id IN (
  SELECT id FROM department WHERE dept_name = 'IT'
);

-- OUTPUT:
-- Asha
-- Meena

--------------------------------------

-- Using EXISTS
SELECT e.name
FROM employee e
WHERE EXISTS (
  SELECT 1 FROM department d WHERE d.id = e.dept_id AND d.dept_name = 'IT'
);

-- OUTPUT:
-- Asha
-- Meena
```

| **IN**                | **EXISTS**             |
| --------------------- | ---------------------- |
| Checks values list    | Checks row existence   |
| Subquery runs first   | Stops when match found |
| Slower for large data | Faster for large data  |

7. `DISTINCT` with multiple columns

```sql
SELECT DISTINCT dept_id, salary FROM emp;
```

**Explanation:** DISTINCT applies to the **combined values**, not individual columns.

8. `WHERE` vs `HAVING`

```sql
SELECT dept_id, COUNT(*)
FROM emp
GROUP BY dept_id
HAVING COUNT(*) > 5;
```

**Why:** `WHERE` filters rows, `HAVING` filters groups.

9. Order of SQL execution (VERY COMMON)

```text
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY
```

10. `DELETE` vs `TRUNCATE`

```sql
DELETE FROM emp;      -- rollback possible
TRUNCATE TABLE emp;   -- auto commit
```

11. `BETWEEN` is inclusive

```sql
WHERE salary BETWEEN 5000 AND 10000;
```

Includes **5000 & 10000**.

12. `LIKE` performance issue with `Index`

```sql
WHERE name LIKE '%John';
```

❌ Index cannot help when the pattern starts with %

```sql
WHERE name LIKE 'John%';
```

✅ The database can jump directly to John in the index

13. `UNION` vs `UNION ALL`

- UNION → Combines results of two or more SELECT queries and **Removes duplicate rows**
- UNION ALL → Combines results of two or more SELECT queries and **Keeps all rows (including duplicates)**

14. `COALESCE` vs `NVL`

Both are used to **replace NULL values**

**NVL** - Oracle only

```sql
NVL(salary, 0)
```

**COALESCE** - ANSI SQL standard (works in Oracle, MySQL, PostgreSQL, SQL Server, etc.)

```sql
SELECT COALESCE(salary, 0) FROM emp;
```

15. Difference between `CHAR` and `VARCHAR`

Both store text

- CHAR → fixed length

  ```sql
  CHAR(10)

  -- OUTPUT
  -- 'ABC       ' (3 chars + 7 spaces)
  ```

- VARCHAR → variable length

  ```sql
  VARCHAR(10)

  -- OUTPUT
  -- 'ABC' (3 chars)
  ```

### ❓ I see there is a performance issue with the DB. How will you identify the issue? Is there any log you can check?

### 📝 Answer

🟢 STEP 1: CHECK MYSQL LOGS

1️⃣ Slow Query Log

**Purpose:**
Identifies queries that take longer than expected.

```sql
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';
```

Enable if disabled:

```sql
SET GLOBAL slow_query_log = ON;
SET GLOBAL long_query_time = 2;
```

2️⃣ Error Log

**Purpose:**
Detects crashes, deadlocks, disk issues.

```text
/var/log/mysql/error.log
```

Check for:

- InnoDB errors
- Disk full
- Out of memory
- Table corruption

3️⃣ General Query Log (TEMPORARILY)

**Purpose:**
See _what queries are hitting DB right now_

```sql
SET GLOBAL general_log = ON;
```

⚠️ Disable quickly — very heavy.

4️⃣ CHECK INDEX USAGE

### 8️⃣ Verify indexes

```sql
SHOW INDEX FROM orders;
```

### 9️⃣ Find unused indexes

```sql
performance_schema.table_io_waits_summary_by_index_usage;
```

📌 Missing index is the **#1 cause** of performance issues.
