## 1️⃣ Spring Core & Fundamentals

### ❓ What is Spring, Why it was introduced?

### 📝 Answer

Spring is a **lightweight, modular, inversion-of-control (IoC) based framework** that helps build loosely coupled, testable, enterprise Java applications.

**Core Principles**

- Inversion of Control (IoC)
  - Dependency Injection (DI)
  - Spring IoC Container
- Aspect-Oriented Programming (AOP)
- Declarative Transactions
- Modular Design

---

### ❓ What is Spring IoC and how is it implemented internally?

### 📝 Answer

1️⃣ **Inversion of Control (IoC)**

Control of **object creation is transferred** from the application code **to the Spring container**.

```java
// ❌ Without Spring:
Service service = new ServiceImpl();

// ✅ With Spring:
@Autowired
private Service service;
```

1. **Dependency Injection (DI)** – Core IoC Implementation

Spring implements IoC mainly using **Dependency Injection**, where dependencies are provided to an object rather than the object creating them itself.

Types of Dependency Injection:

| Types                     | Explanation                                        |
| ------------------------- | -------------------------------------------------- |
| **Constructor Injection** | Dependencies are injected via the constructor      |
| **Setter Injection**      | Dependencies are injected via setter methods       |
| **Field Injection**       | Dependencies are injected directly into its fields |

❌ Field Injection — Problems Explained with **One Simple Example**

```java
@Service
public class OrderService {

    @Autowired
    private PaymentService paymentService; // cannot be final. Object exists without its required dependency.

    public void placeOrder() {
        paymentService.pay();   // ❌ may be null
    }
}

OrderService service = new OrderService();   // Looks valid, but required dependency is invisible
service.placeOrder();   // ❌ NullPointerException
```

What Goes Wrong Here

- **Dependencies are hidden → class contract is unclear**
- **Object can be created in an invalid state**
- **No immutability (`final` not possible)**
- **Hard to unit test (needs Spring / reflection)**

```java
OrderService service = new OrderService();
// No way to inject mock without Spring or reflection
```

- **Failures occur at runtime, not at creation**

```java
service.placeOrder(); // ❌ fails during execution
```

✅ Constructor Injection — The Fix

```java
public class OrderService {

    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
```

- Immutable objects are thread-safe
- App fails during startup in case of missing dependency at compile-time
- Prevents Circular Dependency Bugs
- Works Perfectly with Spring Boot Auto-Configuration (Use `@RequiredArgsConstructor` - Lombok)

2. Spring IoC Container (Core Implementation Mechanism)

The **IoC container** is responsible for:

- Instantiating beans
- Injecting dependencies
- Managing lifecycle
- Handling scopes

![SpringBeanLifeCycle Image](/src/assets/backend/spring-bean-life-cycle.png)

Two Main IoC Containers

🔹 1. **BeanFactory (Basic Container)**

BeanFactory is the basic container in Spring used to **Creates objects (beans), Stores them, provide when needed**.

```java
BeanFactory factory = new ClassPathXmlApplicationContext("beans.xml");

MyService service = factory.getBean(MyService.class);

```

➡ Bean is created only when `getBean()` is called, makes it **lazy initialization**

🔹 2. **ApplicationContext (Advanced – Most Used)**

ApplicationContext is the advanced Spring container

- Creates **beans**
- Connects them together
- Prepares **everything in advance**
- Makes sure the application is ready to run

```java
ApplicationContext context =
        new AnnotationConfigApplicationContext(AppConfig.class);
```

➡ Bean is created at **application startup**, before `getBean()` is called, which makes it **eager initialization** .

```java
//  Spring Boot
@SpringBootApplication
public class MyApp {}


// ➡ Spring Boot automatically creates an ApplicationContext. You never see BeanFactory

// Spring (non-Boot)
AnnotationConfigApplicationContext context =
    new AnnotationConfigApplicationContext(AppConfig.class);


// ➡ Still ApplicationContext
```

> **Spring Boot always uses ApplicationContext**

3. **Bean Configuration Approaches** (How IoC Is Implemented)

Spring provides multiple ways to define **what objects the container manages**.

🔹 1. **XML-Based Configuration (Legacy)**

```xml
<bean id="paymentService" class="com.app.PaymentService"/>
```

❌ Verbose, hard to maintain

🔹 2. **Annotation-Based Configuration (Most Common)**

Annotation-Based Configuration → Spring creates beans automatically by scanning classes

```java
@Component
@Service
@Repository
@Controller
```

```java
@Autowired
private PaymentService paymentService;
```

✅ Cleaner
✅ Modern standard

🔹 3. **Java-Based Configuration (Best Practice)**

Java-Based Configuration → Explicitly tell Spring how to create beans inside a configuration class.

```java
@Configuration
public class AppConfig {

    @Bean
    public PaymentService paymentService() {
        return new PaymentService();
    }
}
```

✅ Type-safe
✅ Refactoring-friendly
✅ Preferred in enterprise apps

4. **Annotations**

![SpringAnnotations Image](/src/assets/backend/spring-annotations.png)

🔹 1. Bean Creation (Stereotype Annotations)

| **Annotation**    | **What it Means**           | **Main Purpose**                                                        |
| ----------------- | --------------------------- | ----------------------------------------------------------------------- |
| `@Component`      | This class is a Spring bean | Tells Spring to automatically create and manage an object of this class |
| `@Service`        | Business logic component    | Marks service-layer classes for better design clarity and readability   |
| `@Repository`     | Database access component   | Marks DAO classes and enables automatic DB exception translation        |
| `@Controller`     | Web request handler         | Handles HTTP requests and returns views (MVC pattern)                   |
| `@RestController` | REST request handler        | Used for REST APIs; returns JSON/XML instead of views                   |

🔹 2. Dependency Injection Annotations

| **Annotation** | **What it Means**          | **Main Purpose**                               |
| -------------- | -------------------------- | ---------------------------------------------- |
| `@Autowired`   | Inject required dependency | Automatically injects a matching bean by type  |
| `@Qualifier`   | Choose specific bean       | Used when multiple beans of same type exist    |
| `@Primary`     | Default bean               | Marks one bean as the preferred choice         |
| `@Resource`    | Inject by name             | Java standard annotation; injects bean by name |

🔹 3. Configuration Annotations

| **Annotation**   | **What it Means**     | **Main Purpose**                                                  |
| ---------------- | --------------------- | ----------------------------------------------------------------- |
| `@Configuration` | Configuration class   | Defines Java-based Spring configuration instead of XML            |
| `@Bean`          | Method creates a bean | Used to define beans manually, especially for third-party classes |
| `@ComponentScan` | Scan packages         | Tells Spring where to search for annotated classes                |
| `@Import`        | Import configuration  | Combines multiple configuration classes                           |

🔹 4. Bean Lifecycle Annotations

| **Annotation**   | **What it Means**       | **Main Purpose**                                             |
| ---------------- | ----------------------- | ------------------------------------------------------------ |
| `@PostConstruct` | Run after bean creation | Used to initialize resources after dependencies are injected |
| `@PreDestroy`    | Run before bean removal | Used to clean up resources before bean destruction           |

🔹 5. Bean Scope & Loading Annotations

| **Annotation**        | **What it Means**       | **Main Purpose**                                          |
| --------------------- | ----------------------- | --------------------------------------------------------- |
| `@Scope("singleton")` | Single instance         | One shared bean instance for entire application (default) |
| `@Scope("prototype")` | New instance every time | Creates a new object each time it is requested            |
| `@RequestScope`       | One per HTTP request    | Bean lives for a single web request                       |
| `@SessionScope`       | One per HTTP session    | Bean lives for a user session                             |
| `@Lazy`               | Create when needed      | Delays bean creation until first use                      |

🔹 6. Transaction & AOP Annotations

| **Annotation**                   | **What it Means**        | **Main Purpose**                                                  |
| -------------------------------- | ------------------------ | ----------------------------------------------------------------- |
| `@Transactional`                 | Manage transactions      | Automatically handles commit and rollback of DB operations        |
| `@Aspect`                        | Cross-cutting logic      | Defines reusable logic like logging or security                   |
| `@Before` / `@After` / `@Around` | Run logic around methods | Used inside aspects to execute code before/after method execution |

🔹 7. Web & REST Annotations

| **Annotation**    | **What it Means**    | **Main Purpose**                         |
| ----------------- | -------------------- | ---------------------------------------- |
| `@RequestMapping` | Map URL              | Maps HTTP requests to controller methods |
| `@GetMapping`     | Handle GET           | Used for fetching data                   |
| `@PostMapping`    | Handle POST          | Used for creating data                   |
| `@PutMapping`     | Handle PUT           | Used for updating data                   |
| `@DeleteMapping`  | Handle DELETE        | Used for deleting data                   |
| `@PathVariable`   | Read URL value       | Extracts values from URI path            |
| `@RequestParam`   | Read query parameter | Reads values from request parameters     |
| `@RequestBody`    | Read request body    | Converts JSON/XML to Java object         |
| `@ResponseBody`   | Return data          | Sends data directly in HTTP response     |

🔹 8. Spring Boot Core Annotations

| **Annotation**             | **What it Means** | **Main Purpose**                                              |
| -------------------------- | ----------------- | ------------------------------------------------------------- |
| `@SpringBootApplication`   | Start Boot app    | Entry point; enables auto-config, scanning, and configuration |
| `@EnableAutoConfiguration` | Auto setup        | Automatically configures beans based on classpath             |
| `@ConfigurationProperties` | Bind properties   | Maps configuration values to Java objects                     |
| `@Value`                   | Inject property   | Reads values from application properties                      |

🔹 9.Testing Annotations

| **Annotation**    | **What it Means**     | **Main Purpose**                              |
| ----------------- | --------------------- | --------------------------------------------- |
| `@SpringBootTest` | Load full context     | Runs full application for integration testing |
| `@MockBean`       | Mock Spring bean      | Replaces real bean with mock during testing   |
| `@WebMvcTest`     | Test controllers only | Loads only MVC components for fast testing    |

    a. My class is not getting injected. Spring says `NoSuchBeanDefinitionException`. Why?

    ❌ Spring does not know the class. Spring only creates objects for classes it knows about
    ✅ Mark the class with a stereotype annotation.

    ```java
    @Component
    public class EmailService {}
    // using @Service is better practice.
    ```

    b. I am getting `NullPointerException` when using a dependency. Why?
    ❌ Dependency is not injected.
    ✅ Use `@Autowired` (prefer **constructor injection**).

    c. Spring throws `NoUniqueBeanDefinitionException`. Why?
    ❌ More than one implementation exists.

    ```java
    public interface PaymentService {
        void pay();
    }

    @Service
    public class CreditCardPaymentService implements PaymentService {
    public void pay() {
    System.out.println("Paid using Credit Card");
    }
    }
    @Service
    public class UpiPaymentService implements PaymentService {
    public void pay() {
    System.out.println("Paid using UPI");
    }
    }

    @Service
    public class CheckoutService {

        @Autowired
        private PaymentService paymentService; // ❌ Ambiguous. Spring does not know which implementation to inject.

    }

    ```

    ✅ Use `@Qualifier` or `@Primary`.

    ```java
    /* Qualifier on injection point */
    @Component
    public class CheckoutService {

        @Autowired
        @Qualifier("creditCardPaymentService") // ✅ Spring injects CreditCardPaymentService (defaults to class name with first letter lowercase)
        private PaymentService paymentService;
    }

    /* Custom qualifier name */
    @Component("creditPayment")
    public class CreditCardPaymentService implements PaymentService {
        public void pay() {}
    }

    @Autowired
    @Qualifier("creditPayment")
    private PaymentService paymentService;

    /* using @Primary */
    @Primary  // Spring will inject UpiPaymentService unless overridden by @Qualifier.
    @Component
    public class UpiPaymentService implements PaymentService {
        public void pay() {}
    }
    ```

    d. What happens if both `@Primary` and `@Qualifier` are used?

    ✅ `@Qualifier` overrides `@Primary`

    e. Does `@Autowired` inject by type or name?

    ✅ By type first, then by name if needed

    ```
    1. By Type
    2. @Qualifier (if present)
    3. @Primary
    4. By Name
    5. Exception
    ```

    f. I cannot add `@Component` to a library class. Third-party classes cannot be annotated.. How to create object?

    ✅ Define the bean using `@Bean` in the `@Configuration` class.

    g. My application startup is slow because a specific bean is being initialized at launch. How to fix it?

    ✅Use `@Lazy`

    ```java
    @Lazy
    @Component
    public class ReportService {
    }
    ```

    > Bean will be created only when needed.

    h. I need to execute a logic immediately after a bean is create. How can I do it?

    ✅Use `@PostConstruct`

    ```java
    @PostConstruct
    public void init() {
        System.out.println("Bean initialized");
    }
    ```

    ```
    Constructor
    ↓
    @Autowired
    ↓
    @PostConstruct
    ```

    > Runs after dependencies are injected.

    i. I’m seeing resource leaks where **DB connections and threads** aren't closing on shutdown; how can I fix it?

    ✅ Use `@PreDestroy`

    ```java
    @PreDestroy
    public void cleanup() {
        System.out.println("Releasing resources");
    }
    ```

    > Runs just before bean destruction.

    j. I see that my DB changes aren't rolling back on exceptions. how can I fix this?

    ✅Use `@Transactional`

    ```java
    @Transactional
    public void saveOrder() {
        orderRepository.save(order);
        throw new RuntimeException("Error");
    }
    ```

    > Spring manages commit & rollback automatically

5. **Bean Scope Management (IoC Control)**

Spring controls **how many instances** of a bean exist.

| Scope         | Description                          |
| ------------- | ------------------------------------ |
| `singleton`   | One instance per container (default) |
| `prototype`   | New instance every request           |
| `request`     | One per HTTP request                 |
| `session`     | One per HTTP session                 |
| `application` | One per ServletContext               |

```java
@Scope("prototype")
@Component
public class ReportGenerator {}
```

6. **Bean Lifecycle Management (Advanced IoC)**

🔹 1. JVM STARTS → `main()` METHOD

```java
@SpringBootApplication // Combines @Configuration, @EnableAutoConfiguration, @ComponentScan
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

- JVM loads `MyApplication`
- JVM calls `main()`
- Control enters Spring Boot

🔹 2. `SpringApplication.run()` runs and create `SpringApplication` object

```java
public static ConfigurableApplicationContext run(
        Class<?> primarySource, String... args)
```

```java
public static ConfigurableApplicationContext run(Class<?> primarySource, String... args) {
    return new SpringApplication(primarySource).run(args);
}
```

- `run()` is static, only as an **entry point**
- Inside:
  - `new SpringApplication(primarySource)` → **object is created**
  - That object’s **non-static `run()` method** is called

✔ Static method → creates instance → instance drives everything

🔹 3. Application Type Detection (Servlet vs Reactive)

Inside the **SpringApplication constructor**, Spring checks the **classpath**, NOT annotations.

| Found on classpath                                   | Application Type             |
| ---------------------------------------------------- | ---------------------------- |
| `javax.servlet.Servlet`                              | SERVLET (Spring MVC, Tomcat) |
| `org.springframework.web.reactive.DispatcherHandler` | REACTIVE (WebFlux)           |
| None                                                 | NONE (CLI / Batch app)       |

This can be found in `pom.xml`
**pom.xml**

```xml
<dependency>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

Classpath contains:

- javax.servlet.Servlet
- Tomcat / Jetty / Undertow

> ➡ Spring Boot chooses SERVLET

🔹 4. `run()` METHOD – High Level Flow

Once the `SpringApplication` object exists, its **instance `run()`** method executes:

1. Prepare environment
2. Create ApplicationContext
3. Load configuration classes
4. Refresh context
5. Create beans
6. Start web server

🔹 5. Environment Preparation (ONLY properties loading)

Spring loads configuration properties **before** creating the container.

**Properties are loaded from (priority order)**

- Command-line arguments
- `application.properties`
- `application.yml`
- `application-{profile}.properties`
- OS environment variables
- JVM system properties

✔ These values are stored
✔ Used later during bean creation
✔ No beans created here

🔹 6. ApplicationContext Creation

After environment is ready, Spring creates the container.

```java
// 1. Create a new ApplicationContext instance
AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();

// 2. Register configuration classes or individual beans
context.register(AppConfig.class) // Optional in Spring Boot
```

It creates an empty Spring ApplicationContext object that is capable of:

- Accepting Java-based configuration (`@Configuration`, `@Component`)
- Creating and managing a `BeanFactory` later
- Starting the Spring lifecycle when `refresh()` is called

> At this point, Spring has NOT started yet

🔹 6. `refresh()` is called (the real work starts)

Spring now calls:

```java
context.refresh();
```

This is where **everything meaningful happens**.

- Create the REAL Container

```java
DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
```

> ✅ THIS is the IoC container

- Load Bean Definitions
  - `@SpringBootConfiguration`
  - `@ComponentScan`
  - `@EnableAutoConfiguration`

🔹7. `@SpringBootConfiguration` or `@Configuration`?

```java
@SpringBootConfiguration
public class MyApplication {}

// Is internally equivalent to:
@Configuration
public class MyApplication {}
```

- Parses the class
- Finds `@Bean` methods
- Registers **bean definitions**

> ⚠️ No beans created yet

🔹8. `@ComponentScan`

**Find components in packages**

- Scans packages
- Registers bean definitions for:
  - `@Component`
  - `@Service`
  - `@Repository`
  - `@Controller`

> ⚠️ Still no objects created

🔹9. `@EnableAutoConfiguration`

- Reads a list of auto-configuration classes from:

  ```
  META-INF/spring.factories
  META-INF/spring/...AutoConfiguration.imports
  ```

- Loads **configuration classes**
- Applies conditions:
  - Class present?
  - Property enabled?
  - Bean already exists?

✔ Registers **conditional bean definitions**

Example:

- If `DataSource` class exists → register datasource beans
- If `spring.datasource.*` exists → enable DB auto config

> ⚠️ Still no objects created

🔹10. **Beans are created ONLY after all configuration and scanning is complete**

**Trigger point**

```java
preInstantiateSingletons()
```

- Create object (constructor)
- Inject dependencies
- Call `@PostConstruct`
- Bean is ready

❓ Is `@PostConstruct` called once or after all beans?

✅ Once per bean
❌ Not after all beans are created

❓ What about @Lazy beans?

- Skipped in preInstantiateSingletons()
- Created later when first requested

❓ What about prototype beans?

- NOT created in preInstantiateSingletons()
- Created every time they are requested

---

### ❓What is Spring Profile?

### 📝 Answer

A Spring Profile is a way to activate different configurations for different environments (like `dev`, `test`, `qa`, `prod`) without changing code.

1️⃣ **Using Profiles with `application.properties`**

**application-dev.properties**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/devdb
spring.datasource.username=devuser
spring.datasource.password=devpass
```

**application-prod.properties**

```properties
spring.datasource.url=jdbc:mysql://prod-server:3306/proddb
spring.datasource.username=produser
spring.datasource.password=securepass
```

**Activate Profile**

```properties
spring.profiles.active=dev

# Multiple Active Profiles
spring.profiles.active=prod,cloud
```

If **no profile is active**, Spring uses:

```text
default
```

You can define:

```properties
spring.profiles.default=dev
```

> 📌 **Only `dev` configuration loads**

2️⃣ **Using `@Profile` Annotation (Beans Level)**

**Dev Configuration**

```java
@Configuration
@Profile("dev")
public class DevConfig {

    @Bean
    public DataSource dataSource() {
        return new HikariDataSource();
    }
}
```

**Prod Configuration**

```java
@Configuration
@Profile("prod")
public class ProdConfig {

    @Bean
    public DataSource dataSource() {
        return new HikariDataSource();
    }
}
```

> 📌 Only **one DataSource bean** is created based on active profile.

---

3️⃣ **Profile-Specific Beans (Same Interface)**

```java
public interface NotificationService {
    void send(String message);
}
```

**Dev Implementation**

```java
@Service
@Profile("dev")
public class ConsoleNotificationService implements NotificationService {
    public void send(String message) {
        System.out.println("DEV: " + message);
    }
}
```

**Prod Implementation**

```java
@Service
@Profile("prod")
public class EmailNotificationService implements NotificationService {
    public void send(String message) {
        // Send real email
    }
}
```

> 📌 Spring injects the **correct implementation automatically**

1. Can multiple profiles be active at the same time?

✔️ Yes. Spring loads beans from **all active profiles**.

2. What happens if two profiles define the same bean?

⚠️ Bean conflict → Spring throws `NoUniqueBeanDefinitionException` unless qualified.

3. Difference between `@Profile` and `@Conditional`?

| `@Profile`        | `@Conditional`     |
| ----------------- | ------------------ |
| Environment-based | Custom logic-based |
| Simple            | More powerful      |

4. Are profiles evaluated at runtime?

❌ No.
✔️ Profiles are resolved **at application startup**.

5. Why `@Conditional` Is Used?

- When `@Profile` is not flexible enough
- When bean creation depends on:
  - Environment variables
  - Classpath availability
  - Configuration values
  - Custom runtime checks

```java
// Create a Condition
public class ProdCondition implements Condition {

    @Override
    public boolean matches(
        ConditionContext context,
        AnnotatedTypeMetadata metadata) {

        String env = context.getEnvironment()
                            .getProperty("spring.profiles.active");
        return "prod".equals(env);
    }
}

// Use @Conditional
@Configuration
public class AppConfig {

    @Bean
    @Conditional(ProdCondition.class)
    public DataSource prodDataSource() {
        return new HikariDataSource();
    }
}
```

> 📌 Bean is created only if condition returns true

---

### ❓What is Spring Boot Actuator?

### 📝 Answer

**Spring Boot Actuator** is a production-ready feature of Spring Boot that helps you **monitor, manage, and inspect your application** while it is running.

> Actuator answers How is my application behaving right now?

| Endpoint             | Purpose                      |
| -------------------- | ---------------------------- |
| `/actuator/health`   | Application health           |
| `/actuator/info`     | App metadata                 |
| `/actuator/metrics`  | JVM & custom metrics         |
| `/actuator/env`      | Environment properties       |
| `/actuator/beans`    | Spring beans                 |
| `/actuator/mappings` | Request mappings             |
| `/actuator/loggers`  | Change log levels at runtime |
| `/actuator/shutdown` | Graceful shutdown (optional) |

🔹 Step 1: Add Dependency

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

🔹 Step 2: Enable Endpoints

By default, only `/health` and `/info` are exposed.

```properties
# application.properties
management.endpoints.web.exposure.include=health,info,metrics
```

❓ Difference between Actuator and Logging?

- **Logging** shows what happened.
- **Actuator** shows current system state.

❓ Difference between Actuator and Swagger?

- **Actuator** is for operations & monitoring,
- **Swagger** is for API documentation & testing.

![SpringActuator Image](/src/assets/backend/spring-actuator.png)

---

### ❓ What is Spring AOP, Why it was introduced?

### 📝 Answer

Spring AOP (Aspect-Oriented Programming) is a module of the Spring Framework that helps you **separate cross-cutting concerns** (like logging, security, transactions, monitoring) from your business logic.

> Spring AOP = Clean code + Reusable behavior + Less duplication

| Concept        | Simple Meaning                                       |
| -------------- | ---------------------------------------------------- |
| **Aspect**     | Class containing cross-cutting logic                 |
| **Advice**     | When the logic runs (`@Before`, `@After`, `@Around`) |
| **Join Point** | Method execution point                               |
| **Pointcut**   | Expression to match methods                          |
| **Weaving**    | Applying aspect to target                            |
| **Proxy**      | Wrapper object created by Spring                     |

**Types of Advice**

| Advice Type       | Runs When                      |
| ----------------- | ------------------------------ |
| `@Before`         | Before method execution        |
| `@After`          | After method (finally)         |
| `@AfterReturning` | After successful return        |
| `@AfterThrowing`  | On exception                   |
| `@Around`         | Before & after (most powerful) |

❌ **Without AOP (Logging mixed with business logic)**

```java
@Service
public class OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    public void placeOrder() {
        logger.info("placeOrder() started");

        System.out.println("Placing order..."); // Business logic

        logger.info("placeOrder() finished");
    }
}
```

❗ Problems

- Logging code repeated in every method
- Business logic is polluted
- Hard to maintain if logging changes

✅ **With AOP (Clean & Maintainable)**

1️⃣ Business Logic (NO logging code)

```java
@Service
public class OrderService {

    public void placeOrder() {
        System.out.println("Placing order...");
    }
}
```

2️⃣ Logging Aspect

```java
@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Around("execution(* com.example.service.*.*(..))")
    public Object logMethod(ProceedingJoinPoint joinPoint) throws Throwable {

        logger.info(joinPoint.getSignature() + " started");

        Object result = joinPoint.proceed(); // calls actual method

        logger.info(joinPoint.getSignature() + " finished");

        return result;
    }
}
```

❓ How Spring AOP Works Internally

- Spring creates a proxy object
- Calls go through the proxy
- Proxy executes aspect logic
- Then calls actual method

❓ Can Spring AOP intercept private methods?

    No. It works on public/protected methods via proxies.

❓ Spring AOP vs AspectJ

| Spring AOP          | AspectJ                          |
| ------------------- | -------------------------------- |
| Runtime proxy       | Compile-time / load-time weaving |
| Method-level only   | Fields, constructors, methods    |
| Easy & lightweight  | Powerful but complex             |
| Used in Spring apps | Used for deep instrumentation    |

---

### ❓ How doe you handle Exception in your application?

### 📝 Answer

✔ Use **`@RestControllerAdvice` + `@ExceptionHandler`**
✔ Never expose stack trace to clients
✔ Create **custom exceptions**
✔ Map exceptions to proper **HTTP status codes**
✔ Log errors centrally

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<String> handleNotFound() {
    return ResponseEntity.status(404).body("Not Found");
  }
}
```

---

### ❓ What is Spring Modular Design?

### 📝 Answer

![ModularDesign Image](/src/assets/backend/spring-modular-design.png)

**Spring Modular Design** means the Spring Framework is built as a collection of independent, loosely coupled modules, where each module solves a specific concern (core container, web, data access, security, etc.).

> 👉 You only include what you need, keeping applications lightweight, maintainable, and scalable.

| Types                                | Responsibilities                                                        |
| ------------------------------------ | ----------------------------------------------------------------------- |
| **Spring Core Container**            | IoC Container, Bean lifecycle, Dependency Injection, Configuration Mgmt |
| **Spring Data Access / Integration** | JDBC, ORM (Hibernate, JPA), Transactions, Spring Data JPA               |
| **Spring Web Layer**                 | Spring MVC, Spring WebFlux (Reactive)                                   |
| **Spring Security**                  | Authentication, Authorization, CSRF protection, OAuth2, JWT             |
| **Spring AOP**                       | Logging, Security, Transactions, Auditing                               |

---

### ❓ Important http status codes to know

### 📝 Answer

---

## Spring Security

### ❓ What is Spring Security and why do we need it??

### 📝 Answer

**Spring Security** is a **framework that handles authentication, authorization, and protection against security vulnerabilities** in Spring-based applications.

Without Spring Security:

- We would manually write login logic
- We would manually protect URLs
- We might forget edge cases like CSRF, session fixation, etc.

Spring Security solves this using **filters**, **contexts**, and **standard security patterns**.

---

### ❓ Explain authentication vs authorization with a real example.

### 📝 Answer

- **Authentication** answers: _Who are you?_
- **Authorization** answers: _What are you allowed to do?_

**Example:**

- Logging in with username/password → Authentication
- Accessing `/admin/deleteUser` → Authorization

👉 Authentication happens **before** authorization.

---

### ❓ Can authorization happen without authentication?

### 📝 Answer

👉 **No.**
Authorization **always depends on authentication**.

Spring Security **never checks permissions for an anonymous user unless explicitly allowed** (`permitAll()`).

---

### ❓ What happens when we add `spring-boot-starter-security`?

### 📝 Answer

Spring Security automatically:

- Secures all endpoints
- Creates a default login page
- Creates a default user
- Prints a generated password in logs

This is called **auto-configuration**.

---

### ❓ Explain Spring Security architecture.

### 📝 Answer

Spring Security works using a **Filter Chain**.

1. HTTP request enters application
2. Goes through **Security Filters**
3. Authentication is performed
4. Authorization decision is made
5. Request allowed or rejected

Each filter has **one responsibility**.

---

### ❓ What is SecurityFilterChain?

### 📝 Answer

It defines **how requests are secured**:

- Which URLs are protected
- Which authentication method is used
- Which filters are enabled

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
        .formLogin();
    return http.build();
}
```

---

### ❓ How do you allow public and secured endpoints?

```java
http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/login", "/public").permitAll()
    .requestMatchers("/admin/**").hasRole("ADMIN")
    .anyRequest().authenticated()
);
```

**Explanation:**
Rules are evaluated **top-down**.
The first match wins.

---

### ❓ Why is /admin accessible even after removing hasRole?

### 📝 Answer

Because:

- You may have **method-level security**
- Or a **global rule** like `anyRequest().authenticated()`

Spring Security rules are **additive**, not exclusive.

---

### ❓ Difference between roles and authorities?

### 📝 Answer

- Roles are **coarse-grained**
- Authorities are **fine-grained**

```java
hasRole("ADMIN")       // internally ROLE_ADMIN
hasAuthority("DELETE")
```

👉 Roles are just authorities with a `ROLE_` prefix.

---

### ❓ Can a user have authorities without roles?

### 📝 Answer

✅ **Yes**
Spring Security doesn’t require roles at all.

### ❓ Why do we need PasswordEncoder?

### 📝 Answer

Because:

- Plain text passwords are insecure
- Hashing prevents password leaks
- BCrypt adds **salt + adaptive hashing**

```java
@Bean
PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

---

### ❓ Explain JWT authentication flow.

### 📝 Answer

1. User logs in
2. Server generates JWT
3. Client stores token
4. Token sent with each request
5. Server validates token

👉 No session stored on server.

```java
public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws IOException, ServletException {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            // validate token
            // set authentication in SecurityContext
        }

        chain.doFilter(request, response);
    }
}
```

❓ Why OncePerRequestFilter?

### 📝 Answer

To prevent **multiple executions** of the same filter in a single request lifecycle.

---

### ❓ How does Spring Security store authentication?

### 📝 Answer

Using **SecurityContext** stored in:

- Session (stateful)
- ThreadLocal
- JWT token (stateless)

---

### ❓ How would you secure microservices?

### 📝 Answer

- API Gateway authentication
- JWT validation at gateway
- Token propagation
- Central auth server
- Zero trust architecture

---

### ❓ Is JWT always better than sessions?

### 📝 Answer

❌ **No**

JWT drawbacks:

- Token revocation is hard
- Token size increases
- Security risks if leaked

Sessions are better for:

- Small apps
- Admin dashboards

---

### ❓ Explain CSRF.

### 📝 Answer

CSRF happens when:

- User is authenticated
- Browser auto-sends cookies
- Attacker triggers state-changing action

Disable only for stateless APIs:

```java
http.csrf(csrf -> csrf.disable());
```

---

### ❓ How do you test secured endpoints?

```java
@WithMockUser(roles = "ADMIN")
@Test
void adminTest() {
    // secured test
}
```

---

### ❓ If Spring Security fails completely, what’s your debugging approach?

### 📝 Answer

1. Enable debug logs
2. Check filter chain
3. Verify password encoding
4. Inspect SecurityContext
5. Validate token/session

---

### ❓ CORS vs CSRF vs OAuth2 vs JWT?

### 📝 Answer

- **CORS** is a **browser security mechanism** that controls _which origins can call your API_
- **CSRF** is an **attack** that exploits _authenticated users via cookies_
- **OAuth2** is an **authorization framework**
- **JWT** is a **token format**

👉 They solve **completely different problems**
👉 They are **not competitors**
👉 OAuth2 often **uses JWT**

🔹 CORS (Cross-Origin Resource Sharing)

A **browser-enforced rule** that prevents JavaScript on one origin from calling another origin **unless explicitly allowed**.

**Key point:**
👉 CORS is **not a Spring Security feature**
👉 It is enforced by the **browser**, not the backend

**Example:**

```text
Frontend: http://localhost:3000
Backend:  http://api.company.com
```

Browser blocks the request unless backend allows it.

🔹 CSRF (Cross-Site Request Forgery)

A **security attack** where a malicious site tricks a logged-in user’s browser into sending authenticated requests.

**Why it works:**

- Browser automatically sends cookies
- Server trusts cookies
- Attacker exploits that trust

🔹 OAuth2 Explained

**OAuth2 is about delegation of access**

**Example:**

> Let Google authenticate the user, but let _my app_ access their profile.

OAuth2 defines:

- Authorization flows
- Tokens
- Roles of participants

🔹 JWT Explained

**JWT (JSON Web Token)** is:

- A compact token format
- Self-contained
- Signed (and sometimes encrypted)

```java
@Configuration
@EnableWebSecurity // Enables Spring Security for web (HTTP) requests
public class SecurityConfig {

    // 1️⃣ API SECURITY (Access Token - JWT - Stateless)
    @Bean
    @Order(1)
    SecurityFilterChain apiSecurityChain(HttpSecurity http) throws Exception {

        http
            .securityMatcher("/api/**")

            // CORS needed for browser-based APIs
            .cors(cors -> {})

            // JWT in header → no CSRF needed
            .csrf(csrf -> csrf.disable())

            // Stateless
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Authorization
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )

            // JWT validation
            .oauth2ResourceServer(oauth2 -> oauth2.jwt());

        return http.build();
    }

    // 2️⃣ AUTH SECURITY (Refresh Token - Cookie - CSRF Protected)
    @Bean
    @Order(2)
    SecurityFilterChain authSecurityChain(HttpSecurity http) throws Exception {

        http
            .securityMatcher("/auth/**")

            // CORS often still needed
            .cors(cors -> {})

            // Cookie-based refresh → CSRF REQUIRED
            .csrf(csrf -> csrf.enable())

            // Usually no session, but IF_REQUIRED is ok
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )

            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/login", "/auth/refresh").permitAll()
                .anyRequest().authenticated()
            )

            // Optional: OAuth2 login (Google, GitHub, etc.)
            .oauth2Login();

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() { // Automatically gets called by .cors(cors -> {})
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
```

❓ _Why `@Order` matters?_

- Spring Security checks filter chains in order.
- More specific (`/api/**`) must come first.

❓ What happens when we call `.cors(cors -> {})`?

Spring Security automatically looks for a `CorsConfigurationSource` bean in the application context and wires it into the `CorsFilter`

❓ _Does Spring MVC CORS config also work here?_

Spring Security **runs before MVC**, so:

- Security CORS config takes precedence
- **MVC `@CrossOrigin` may be ignored**

❓ _Is `csrf(csrf -> csrf.disable())` enabled by default?_

Yes. **CSRF protection is enabled by default** in Spring Security for web applications.
When you add Spring Security:

- CSRF protection is **ON by default**
- Applies to **state-changing HTTP methods** (POST, PUT, DELETE, PATCH)
- Uses a CSRF token **stored in session or cookie**

❓ _Why CSRF is not needed for JWT?_

CSRF protection is not needed for JWT because **JWT is not automatically sent by the browser**.

CSRF exploits **cookie-based authentication**:

- User logs into a site
- Browser stores session cookie
- **Browser automatically sends cookies with every request**
- Malicious site triggers a request
- Cookie is sent → request is authenticated

With JWT authentication:

- Token is stored in client-side memory (E.g `useState`, `NgRx`) or localstorage, sessionStorage
- Not stored in cookies
- Explicitly sent in headers

❓ _Even JWT refresh token might need help from cookie and CSRF to protect, correct?_

✅ Correct

- Refresh tokens are often stored in **HttpOnly cookies**
- Cookies are automatically sent by the browser
- That reintroduces CSRF risk
- So CSRF protection is required

Access Token - Sent via `Authorization` header, Not automatically sent by the browser, **No CSRF Protection**
Refresh Token - Automatically sent by the browser, **CSRF protection IS needed**

❓ _Why Access Token in Header and Refresh Token in Cookie?_

You must balance two threats:

- ❌ XSS (JavaScript stealing tokens)
- ❌ CSRF (browser auto-sending credentials)

| Endpoint type | Auth mechanism   | CSRF          | Session      |
| ------------- | ---------------- | ------------- | ------------ |
| `/api/**`     | JWT (header)     | ❌ Not needed | ❌ Stateless |
| `/auth/**`    | Cookie (refresh) | ✅ Required   | ⚠️ Minimal   |

> You **cannot eliminate both completely** — you minimize damage.

❓ _What SessionCreationPolicy Actually Controls?_

**SessionCreationPolicy** tells Spring Security:

> Should I create / use an **HTTP session** to store authentication?

- `IF_REQUIRED` allows Spring Security to **create and use an HTTP session**, which is typical for stateful authentication.
- `STATELESS` disables server-side session storage, which is commonly used with **JWT-based authentication**.

  ❓ _Is OAuth2 authentication or authorization?_

👉 **Authorization framework**

---

### ❓ Filters vs Interceptors

### 📝 Answer

🔹 Spring Security **Filters**

- Part of **Servlet container**
- Execute **before the request reaches the Controller**
- Used for **authentication & authorization**
- Spring Security works **mainly using filters**

📌 Examples:

- `UsernamePasswordAuthenticationFilter`
- `JwtAuthenticationFilter`

🔹 Spring MVC **Interceptors**

- Part of **Spring MVC**
- Execute **after filter, before controller method**
- Used for **logging, auditing, request modification**
- **NOT** used for security

🔁 Execution Flow

```
Client → Filters → Interceptors → Controller
```

✅ Simple Comparison Table

| Feature                | Filter  | Interceptor |
| ---------------------- | ------- | ----------- |
| Layer                  | Servlet | Spring MVC  |
| Runs before Controller | ✅      | ✅          |
| Can block request      | ✅      | ❌ (mostly) |
| Used for Security      | ✅      | ❌          |
| Spring Security uses   | Filters | ❌          |

> **Spring Security uses Filters because security must be applied before request reaches the controller.**

---

### ❓ How Role-Based Access is Implemented in Spring Security

### 📝 Answer

🔹 Concept

- Users are assigned **roles** (ADMIN, USER)
- Roles are checked **before allowing access**

🔹 Role vs Authority

- `ROLE_ADMIN` → internally treated as **authority**
- `hasRole("ADMIN")` → checks `ROLE_ADMIN`

✅ Method-Level Security (Most Asked)

```java
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin")
public String adminOnly() {
    return "Admin Access";
}
```

✅ URL-Based Security

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/admin/**").hasRole("ADMIN")
            .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
            .anyRequest().authenticated()
        )
        .httpBasic();
    return http.build();
}
```

---

### ❓ What is SAML?

### 📝 Answer

**SAML (Security Assertion Markup Language)** is an **XML-based authentication protocol** used for **Single Sign-On (SSO)**.

📌 Example:

> Login once → Access Gmail, Jira, Confluence without logging in again

🔹 How SAML Works (Simple Flow)

1. User tries to access App
2. App redirects to **Identity Provider (IdP)** (like Okta)
3. User logs in
4. IdP sends **SAML Assertion (XML)**
5. App trusts it → Login success

🔹 Why SAML?

- Used in **Enterprise applications**
- Works well with **legacy systems**
- Browser-based SSO

---

### ❓ SAML vs JWT

### 📝 Answer

| Feature         | SAML             | JWT         |
| --------------- | ---------------- | ----------- |
| Format          | XML              | JSON        |
| Size            | Large            | Small       |
| Transport       | Browser Redirect | HTTP Header |
| Common Use      | Enterprise SSO   | REST APIs   |
| Mobile Friendly | ❌               | ✅          |
| Complexity      | High             | Low         |

> **SAML is XML-based and heavy, JWT is lightweight and ideal for APIs.**

---

### ❓ SAML vs OAuth vs OIDC

### 📝 Answer

🔹 OAuth 2.0

- **Authorization protocol**
- Allows apps to access user data
- Does **NOT authenticate users**

📌 Example:

> Allow this app to access your Google Drive

🔹 OpenID Connect (OIDC)

- Built **on top of OAuth**
- Used for **Authentication**
- Returns **ID Token (JWT)**

📌 Example:

> Login with Google

🔹 SAML

- Older SSO protocol
- XML-based
- Mostly enterprise usage

✅ Comparison Table

| Feature        | SAML           | OAuth         | OIDC           |
| -------------- | -------------- | ------------- | -------------- |
| Purpose        | Authentication | Authorization | Authentication |
| Token Type     | XML Assertion  | Access Token  | ID Token (JWT) |
| Modern APIs    | ❌             | ✅            | ✅             |
| Mobile Support | ❌             | ✅            | ✅             |
| Best For       | Enterprise SSO | API Access    | Login / SSO    |

---

## Other Spring Concepts

### ❓ Spring HATEOAS

### 📝 Answer

❓ Problem Before

- REST APIs returned **only data**
- Client didn’t know **next actions / URLs**

✅ What it Solves

- Adds **hypermedia links**
- Makes API **self-discoverable**

🔁 What was used before

- Plain REST + hardcoded URLs

💡 Example

```java
EntityModel<User> model = EntityModel.of(user);
model.add(linkTo(methodOn(UserController.class).getAll()).withRel("all-users"));
```

🧠 In Short

> HATEOAS adds links to REST responses so clients know what to do next.

---

### ❓ Thymeleaf

### 📝 Answer

❓ Problem Before

- JSP had poor Spring integration
- Not HTML-friendly

✅ What it Solves

- **Server-side HTML rendering**
- Works naturally with Spring MVC

🔁 What was used before

- JSP, Velocity, FreeMarker

💡 Example

```html
<p th:text="${user.name}"></p>
```

```java
model.addAttribute("user", user);
```

🧠 In Short

> Thymeleaf is a server-side template engine used to render dynamic HTML in Spring Boot.

---

### ❓ application.properties vs application.yml?

### 📝 Answer

Both are used to **configure Spring Boot applications** (DB config, server port, logging, etc.).

| application.properties      | application.yml          |
| --------------------------- | ------------------------ |
| Key = value format          | YAML (indentation-based) |
| Easy for small configs      | Best for complex configs |
| Less readable for hierarchy | Very readable & clean    |
| No indentation              | Indentation is mandatory |

Spring Boot supports **both**, but **YAML is preferred** for large projects.

**Example**

application.properties

```properties
server.port=8081
spring.datasource.url=jdbc:mysql://localhost:3306/testdb
spring.datasource.username=root
spring.datasource.password=admin
```

application.yml

```yaml
server:
  port: 8081

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/testdb
    username: root
    password: admin
```

> prefer `application.yml` for readability when configs grow.

---

### ❓ What Unit Testing technique you used in Java and Spring?

### 📝 Answer

**Tools Used**

- **JUnit 5** → Testing framework
- **Mockito** → Mock dependencies
- **Spring Boot Test** → Integration testing

**Unit Testing (Service Layer Example)**

Service Class

```java
@Service
public class UserService {

    public String getUserName() {
        return "Dev";
    }
}
```

Unit Test

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Test
    void testGetUserName() {
        assertEquals("Dev", userService.getUserName());
    }
}
```

**Mocking Dependencies (Real-world Example)**

```java
@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    @Test
    void testCreateOrder() {
        when(orderRepository.save(any()))
            .thenReturn(new Order(1L));

        Order order = orderService.createOrder(new Order());

        assertNotNull(order);
    }
}
```

**Spring Boot Integration Test**

```java
@SpringBootTest
class UserControllerTest {

    @Autowired
    private UserController controller;

    @Test
    void contextLoads() {
        assertNotNull(controller);
    }
}
```

> Write unit tests with Mockito and integration tests using `@SpringBootTest`.

---

