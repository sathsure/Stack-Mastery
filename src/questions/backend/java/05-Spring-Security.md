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

🤔❓ Can authorization happen without authentication?

❌ **No.**
Authorization **always depends on authentication**.

Spring Security **never checks permissions for an anonymous user unless explicitly allowed** (`permitAll()`).

🤔❓ What happens when we add `spring-boot-starter-security`?

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

🤔❓ What is SecurityFilterChain?

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

🤔❓ Why do we need PasswordEncoder?

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

### ❓ Difference between Roles and Authorities in Spring Security?

- **Role** → High-level permission (coarse-grained)
- **Authority** → Low-level permission (fine-grained)

```java
hasRole("ADMIN")        // Automatically becomes ROLE_ADMIN
hasAuthority("DELETE_USER")
```

🤔❓ Can a user have authorities without roles?

✅ **Yes**
Spring Security doesn’t require roles at all.

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
