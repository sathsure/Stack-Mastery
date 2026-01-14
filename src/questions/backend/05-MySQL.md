## 1️⃣ Relational Database Fundamentals (Senior Perspective)

### ❓ How do you design database schemas for real applications?

- How do access patterns influence schema design?
- When do you prioritize reads over writes?

---

### ❓ Normalization vs denormalization – how do you decide?

- Which normal forms do you usually follow?
- When do you intentionally break normalization?

---

### ❓ How do you balance database design and application logic?

- What logic belongs in DB vs application?
- Trade-offs involved?

---

## 2️⃣ Indexing (Most Common MySQL Topic)

### ❓ How do indexes work internally in MySQL?

- What data structures are used?
- How does indexing speed up reads?

---

### ❓ When should you add an index?

- How do you identify index candidates?
- Read vs write trade-offs?

---

### ❓ What types of indexes have you used?

- Single-column vs composite indexes
- Unique indexes
- Full-text indexes

---

### ❓ How does a composite index work?

- Leftmost prefix rule
- Index column order importance

---

### ❓ When do indexes hurt performance?

- Insert/update overhead
- Index maintenance cost

---

## 3️⃣ Query Optimization & Performance

### ❓ How do you identify slow queries?

- Tools used?
- Logging strategies?

---

### ❓ How do you analyze a query using EXPLAIN?

- What parts of the plan matter most?
- Red flags in execution plans?

---

### ❓ What common query performance issues have you seen?

- SELECT \*
- Missing indexes
- Large joins
- Functions in WHERE clause

---

### ❓ How do joins impact performance?

- INNER vs LEFT JOIN
- When do joins become expensive?

---

### ❓ When would you avoid joins?

- Alternatives?
- Trade-offs?

---

## 4️⃣ Transactions & Consistency

### ❓ How do transactions work in MySQL?

- What does ACID mean practically?
- Real-world implications?

---

### ❓ What isolation levels are you aware of?

- READ COMMITTED vs REPEATABLE READ
- Which is MySQL default and why?

---

### ❓ What concurrency issues occur in databases?

- Dirty reads
- Non-repeatable reads
- Phantom reads

---

### ❓ How do you handle transactions in high-concurrency systems?

- Locking strategies?
- Application-level handling?

---

## 5️⃣ Locks & Concurrency Control

### ❓ How does MySQL locking work?

- Row-level vs table-level locks
- InnoDB vs MyISAM

---

### ❓ What is a deadlock?

- How does it occur?
- How do you resolve or prevent it?

---

### ❓ How do you debug locking issues?

- Symptoms?
- Tools or queries used?

---

## 6️⃣ Schema Evolution & Data Changes

### ❓ How do you handle schema changes in production?

- Backward compatibility?
- Zero-downtime deployments?

---

### ❓ How do you manage database migrations?

- Versioning strategy?
- Rollback approach?

---

### ❓ How do you handle large data migrations?

- Performance considerations?
- Risk mitigation?

---

## 7️⃣ Data Integrity & Constraints

### ❓ How do you enforce data integrity?

- Primary keys
- Foreign keys
- Unique constraints

---

### ❓ When do you avoid foreign keys?

- Performance vs integrity trade-offs?
- Microservices impact?

---

### ❓ How do you handle referential integrity without foreign keys?

- Application-level enforcement?
- Risks?

---

## 8️⃣ Pagination, Sorting & Large Data Sets

### ❓ How do you implement pagination in MySQL?

- LIMIT/OFFSET drawbacks?
- Alternatives?

---

### ❓ How do you handle sorting on large tables?

- Index usage?
- Memory concerns?

---

### ❓ How do you optimize queries on large datasets?

- Data partitioning?
- Archiving strategy?

---

## 9️⃣ MySQL in Distributed & Scalable Systems

### ❓ How does MySQL fit into a microservices architecture?

- Database per service?
- Shared database risks?

---

### ❓ How do you handle scaling MySQL?

- Vertical vs horizontal scaling?
- Read replicas?

---

### ❓ How do you manage data consistency with replicas?

- Replication lag?
- Read-after-write consistency?

---

## 🔟 Caching & MySQL Interaction

### ❓ When do you introduce caching on top of MySQL?

- What problems does it solve?
- What new problems appear?

---

### ❓ What data should never be cached?

- Consistency-critical data?
- Security concerns?

---

### ❓ How do you handle cache invalidation?

- TTL-based?
- Event-based?

---

## 1️⃣1️⃣ Security & Reliability

### ❓ How do you secure MySQL databases?

- Access control?
- Credential management?

---

### ❓ How do you prevent SQL injection?

- Application-level protections?
- Prepared statements?

---

### ❓ How do you handle backups and recovery?

- Backup strategies?
- Restore testing?

---

## 1️⃣2️⃣ Production Issues & Debugging

### ❓ What MySQL production issues have you faced?

- Slow queries?
- Deadlocks?
- Data corruption?

---

### ❓ How do you diagnose performance degradation?

- Metrics?
- Query analysis?

---

### ❓ How do you monitor MySQL health?

- What indicators matter most?

---

## 1️⃣3️⃣ Mock Senior Interview – Deep MySQL Questions

### ❓ If you had to redesign your database today, what would you change?

- What assumptions were wrong?
- What trade-offs would you reconsider?

---

### ❓ What is the worst database mistake you made?

- Impact?
- Recovery?

---

### ❓ How do you decide between fixing a query vs redesigning schema?

- Short-term vs long-term thinking?

---

### ❓ How do you explain database performance issues to non-technical stakeholders?

- Communication strategy?

---

## 1️⃣4️⃣ Handling Ambiguity & Trade-offs

### ❓ How do you choose between database optimization and application optimization?

- Measurement strategy?

---

### ❓ What database best practices do you intentionally break sometimes?

- Why?

---

### ❓ How do you make database decisions with incomplete information?

- Risk mitigation?

---
