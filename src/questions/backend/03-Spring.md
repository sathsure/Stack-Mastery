## 1️⃣ Spring Core & Fundamentals

### ❓ Why do we use Spring Framework?

- What problems does it solve compared to plain Java?
- What problems does it introduce?

---

### ❓ Explain Inversion of Control in real-world terms.

- How does IoC change application design?
- What problems does it solve in large systems?

---

### ❓ What is Dependency Injection and why is it important?

- Constructor vs setter vs field injection
- Why is field injection discouraged?

---

### ❓ How does Spring manage object creation differently from Java?

- Who owns the lifecycle?
- What impact does this have on design?

---

### ❓ What is a Bean in Spring?

- How is it different from a normal Java object?
- Who controls its lifecycle?

---

## 2️⃣ Spring Bean Lifecycle & Scopes

### ❓ Explain the Spring Bean lifecycle.

- What happens from container startup to shutdown?
- Where can you hook custom logic?

---

### ❓ What are different bean scopes in Spring?

- Singleton vs Prototype vs Request
- When do you use prototype beans?

---

### ❓ What problems can singleton beans cause?

- Thread safety concerns?
- How do you design around them?

---

### ❓ How does Spring handle circular dependencies?

- Why constructor injection fails in this case?
- How do you resolve it properly?

---

## 3️⃣ Spring Configuration & Profiles

### ❓ How do you configure Spring applications?

- XML vs Java Config vs annotations
- Why is Java config preferred?

---

### ❓ How do Spring profiles work?

- How do you manage environment-specific configs?
- What mistakes happen with profiles?

---

### ❓ How does property resolution work in Spring Boot?

- application.yml vs environment variables
- Precedence order?

---

### ❓ How do you externalize configuration securely?

- Secrets management?
- What should never go into config files?

---

## 4️⃣ Spring Boot – Deep Understanding

### ❓ Why Spring Boot instead of traditional Spring?

- What pain points does it solve?
- What trade-offs does it introduce?

---

### ❓ How does Spring Boot auto-configuration work internally?

- What triggers auto-configuration?
- How does Spring decide which beans to create?

---

### ❓ How do you disable or override auto-configuration?

- When is it necessary?
- Risks involved?

---

### ❓ What happens during Spring Boot application startup?

- Startup phases?
- Performance impact?

---

### ❓ How do you reduce Spring Boot startup time?

- Lazy initialization?
- Bean loading strategies?

---

## 5️⃣ Dependency Injection – Advanced Scenarios

### ❓ How does Spring resolve dependencies?

- What happens when multiple beans of the same type exist?
- @Primary vs @Qualifier?

---

### ❓ How do you inject prototype beans into singleton beans?

- Why is it tricky?
- Common solutions?

---

### ❓ How does @Lazy work?

- When is it helpful?
- Potential downsides?

---

## 6️⃣ Spring AOP (Very Common Senior Topic)

### ❓ What is AOP and why is it needed?

- What problems does it solve?
- What problems does it introduce?

---

### ❓ How does Spring AOP work internally?

- Proxy-based mechanism?
- JDK proxy vs CGLIB?

---

### ❓ What are common use cases of AOP?

- Logging
- Security
- Transactions

---

### ❓ What are limitations of Spring AOP?

- Why internal method calls are not intercepted?
- Final methods and classes?

---

### ❓ How do you debug AOP-related issues?

- Proxy confusion?
- Unexpected behavior?

---

## 7️⃣ Spring Transactions (High-Expectation Area)

### ❓ How does transaction management work in Spring?

- Declarative vs programmatic transactions?
- Role of proxies?

---

### ❓ Explain transaction propagation behaviors.

- REQUIRED vs REQUIRES_NEW vs NESTED
- Real-world use cases?

---

### ❓ How does rollback work in Spring?

- Checked vs unchecked exceptions?
- How do you customize rollback rules?

---

### ❓ What problems can @Transactional cause?

- Performance issues?
- Hidden bugs?

---

### ❓ Why doesn’t @Transactional work on private methods?

- Self-invocation issue?

---

## 8️⃣ Spring Data JPA – Integration-Level Questions

### ❓ How does Spring Data simplify JPA?

- What abstractions does it provide?
- What does it hide?

---

### ❓ How do repositories work internally?

- Proxy-based?
- Query generation?

---

### ❓ When do you avoid Spring Data repositories?

- Complex queries?
- Performance-sensitive paths?

---

### ❓ How do transactions behave with JPA repositories?

- Persistence context?
- Lazy loading issues?

---

## 9️⃣ Spring Security (Senior Expectation)

### ❓ What is the difference between authentication and authorization?

- How does Spring Security enforce them?

---

### ❓ How does Spring Security filter chain work?

- Request flow from client to controller?

---

### ❓ How do you secure REST APIs using Spring Security?

- Stateless vs stateful security?
- JWT-based security?

---

### ❓ How do roles and authorities work?

- Role hierarchy?
- Prefix issues?

---

### ❓ How do you handle CORS in Spring?

- Security implications?

---

## 🔟 Spring Performance & Production Issues

### ❓ How does Spring impact application performance?

- Startup time?
- Memory usage?

---

### ❓ How do you troubleshoot slow Spring applications?

- Logs?
- Metrics?
- Profiling?

---

### ❓ What common Spring misconfigurations have you seen?

- Bean explosion?
- Incorrect scopes?

---

### ❓ How do you debug dependency injection issues?

- NoSuchBeanDefinitionException?
- Circular dependency errors?

---

## 1️⃣1️⃣ Spring Testing Strategy

### ❓ How do you test Spring applications?

- Unit vs integration tests?
- @SpringBootTest impact?

---

### ❓ How do you mock dependencies in Spring tests?

- Mockito vs @MockBean?
- Slice tests?

---

### ❓ How do you test transactional behavior?

- Rollback after tests?

---

## 1️⃣2️⃣ Mock Senior Interview – Deep Spring Questions

### ❓ If you remove Spring from your project, what breaks?

- What value does Spring add?

---

### ❓ What Spring feature do you avoid and why?

- Experience-based reasoning?

---

### ❓ What is the worst Spring-related production issue you faced?

- Root cause?
- Fix?

---

### ❓ How do you explain Spring to a junior developer?

- Without framework jargon?

---

### ❓ How do you balance Spring magic vs explicit configuration?

- Maintainability vs speed?

---
