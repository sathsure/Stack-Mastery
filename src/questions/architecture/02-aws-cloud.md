## 1. Cloud Fundamentals & Shared Responsibility Model

### ❓ 1. What does the AWS Shared Responsibility Model mean?

📝 **Answer**

AWS handles **infrastructure security** (data centers, hardware), while customers handle **application-level security**, IAM, encryption, and patching OS. Use this model whenever deciding **what your app code must secure** vs what AWS already secures.

---

### ❓ 2. Who is responsible for patching EC2 instances?

📝 **Answer**

Customer patches the OS and app runtime (Node.js, Java, Nginx). Use OS patching during backend deployments or when hosting APIs/services on EC2.

---

### ❓ 3. Is AWS responsible for encrypting your data by default?

📝 **Answer**

No. You must enable encryption (KMS/SSE) for S3 buckets, RDS, EBS. Use encryption whenever storing sensitive user data (auth tokens, logs, environment configs).

---

---

## 2. IAM, Security & Access Control

### ❓ 4. What is the difference between IAM User vs Role?

📝 **Answer**

Users have long-term credentials; roles provide **temporary auth** for apps, Lambda, EC2, or API calls. Use roles when a **backend/API** needs AWS access—never store keys in frontend code.

---

### ❓ 5. How does an Angular SPA hosted in S3 access AWS APIs securely?

📝 **Answer**

Through **Cognito** (authenticate users → receive JWT) → call API Gateway → Lambda. Use this when your frontend requires secure API calls without exposing secrets.
Includes **frontend code (Cognito login)** + **backend (Lambda)** + **REST API (API Gateway)**.

💻 Example (Angular calling API with JWT):

```ts
this.http.get(apiUrl, {
  headers: { Authorization: userSession.getIdToken().getJwtToken() },
});
```

---

### ❓ 6. What is the principle of least privilege?

📝 **Answer**

Give only required permissions for the task. Use minimal IAM role permissions for Lambda, EC2, API Gateway, or backend code accessing S3/KMS.

---

---

## 3. Compute (EC2, Lambda, Containers)

### ❓ 7. When should you choose Lambda vs EC2?

📝 **Answer**

Use **Lambda** for event-driven, pay-per-use tasks like REST API backends or cron jobs (frontend → API Gateway → Lambda).
Use **EC2** for long-running apps (Node, Angular SSR) requiring OS-level control or background workers.

---

### ❓ 8. What is EC2 Auto Scaling?

📝 **Answer**

Adds/removes EC2 instances based on load. Use during traffic spikes (e-commerce, dashboards) where backend API or Angular SSR server must scale.

---

### ❓ 9. What is serverless?

📝 **Answer**

No server management; AWS handles scaling. Use for **API backends (Lambda)**, **file uploads (S3 triggers)**, or **NoSQL workloads (DynamoDB)**.

---

---

## 4. Storage (S3, EBS, EFS)

### ❓ 10. Difference: S3 vs EBS vs EFS?

📝 **Answer**

Use **S3** for static Angular hosting or images; **EBS** for EC2 OS disks; **EFS** for shared storage between multiple EC2/Lambdas (e.g., shared app configs).

---

### ❓ 11. What is S3 versioning and why enable it?

📝 **Answer**

Retains every version of a file. Use when deploying Angular builds (rollback), or storing logs/configs where accidental deletion must be avoided.

---

### ❓ 12. What is S3 Intelligent-Tiering?

📝 **Answer**

Auto-moves objects to cheaper tiers based on usage. Use for user-uploaded files, logs, backups where access patterns are unpredictable.

---

---

## 5. Database Services

### ❓ 13. When use DynamoDB vs RDS?

📝 **Answer**

Use **DynamoDB** for scalable NoSQL (chat apps, user sessions).
Use **RDS** for relational needs (transactions, multi-table joins). Backend code integrates using AWS SDK/ORM.

---

### ❓ 14. What is the benefit of Aurora over standard RDS?

📝 **Answer**

Higher performance + auto-failover. Use Aurora when backend requires high-read or high-write throughput (e.g., analytics, dashboards).

---

---

## 6. Networking & VPC

### ❓ 15. Difference between Public Subnet and Private Subnet?

📝 **Answer**

Public subnet exposes internet-facing apps (Angular SSR, API LB).
Private subnet hosts DBs, backend services accessible only via NAT or VPC links.

---

### ❓ 16. What is a Security Group?

📝 **Answer**

Stateful firewall controlling inbound/outbound rules. Use to allow API traffic from CloudFront, or lock down DB access to only backend EC2/Lambda.

---

### ❓ 17. What is a NAT Gateway used for?

📝 **Answer**

Allows private-subnet instances outbound access (API updates, NPM install). Use when backend servers need internet but must remain private.

---

---

## 7. Serverless + API Integration (Useful for Angular Developers)

### ❓ 18. What AWS services are typically used to host Angular apps?

📝 **Answer**

**S3 + CloudFront** for hosting; **Route 53** for DNS; **API Gateway + Lambda** for backend; **Cognito** for authentication. Combined use supports full-stack Angular deployments.

---

### ❓ 19. Why CloudFront improves Angular SPA performance?

📝 **Answer**

Caches assets globally, reduces latency, protects via AWS Shield. Use when SPA loads slowly or serves global users.

---

### ❓ 20. Can CloudFront cache API responses?

📝 **Answer**

Yes when headers allow. Use for GET-heavy APIs (product lists, blogs) to improve frontend performance.

---

---

## 8. Billing, Pricing & Cost Optimization

### ❓ 21. What is the AWS pricing model?

📝 **Answer**

Pay for compute, storage, and data transfer used. Useful when estimating backend/API cost based on traffic.

---

### ❓ 22. How do you reduce EC2 cost?

📝 **Answer**

Right-size instances; use Savings Plans or Spot for non-critical tasks like background jobs or batch processing.

---

### ❓ 23. What is the AWS Free Tier trap?

📝 **Answer**

Free limits vary by region/service. Use billing alarms to avoid accidental charges when deploying dev/test apps.

---

---

## 9. Monitoring & Logging

### ❓ 24. How does CloudWatch differ from CloudTrail?

📝 **Answer**

CloudWatch monitors logs/metrics for apps and backend APIs; CloudTrail logs IAM/API activity for audits.

---

### ❓ 25. How do you debug production Lambda errors?

📝 **Answer**

Using CloudWatch Logs + X-Ray traces. Include backend logging code (`console.log`, structured logs).

---

---

## 10. High Availability & Fault Tolerance

### ❓ 26. What is the difference between Multi-AZ vs Multi-Region?

📝 **Answer**

Multi-AZ for automatic failover inside region; Multi-Region for DR or global low-latency (CloudFront + S3 replication).

---

### ❓ 27. What is an Availability Zone?

📝 **Answer**

Physically independent DC inside region. Use AZ spreading when designing VPC, load balancers, RDS.

---

### ❓ 28. Why use Load Balancers?

📝 **Answer**

Distribute traffic, SSL termination, health checks. Use ALB for API traffic; NLB for high-performance TCP.

---

---

## 11. Cloud Practitioner–Level “Mock Tricky” Questions

### ❓ 29. Is S3 a global or regional service?

📝 **Answer**

Regional data but globally unique bucket names. Use region selection for latency and compliance.

---

### ❓ 30. Can you store Angular environment variables securely in S3?

📝 **Answer**

No. Environment files are public. Use **Secrets Manager** or **SSM** in backend Lambda/EC2 APIs.

---

### ❓ 31. Can Lambda run longer than 15 minutes?

📝 **Answer**

No. Use Step Functions or ECS for long-running backend jobs.

---

### ❓ 32. Which AWS service helps estimate costs before deployment?

📝 **Answer**

AWS Pricing Calculator.

---

### ❓ 33. Which AWS service provides organization-wide cost control?

📝 **Answer**

AWS Organizations + SCP + AWS Budgets.

---

---

## 12. Scenario-Based Mock Questions

### ❓ 34. Your Angular app loads slowly from S3. What helps?

📝 **Answer**

Use CloudFront for caching + gzip/brotli compression. Deploy using S3 Transfer Acceleration for faster uploads.

---

### ❓ 35. You need authentication for your Angular SPA. Which service?

📝 **Answer**

Cognito User Pools (login, JWT) + Identity Pools (temporary AWS credentials). Use when frontend needs secure API calls.

---

### ❓ 36. You need backend without servers. Which architecture?

📝 **Answer**

API Gateway → Lambda → DynamoDB. Use in microservices, event-driven systems, or CRUD APIs.

---

### ❓ 37. You need real-time logs from Lambda. How?

📝 **Answer**

CloudWatch Logs with log groups + filters. Use structured JSON logs for better debugging.

---

### ❓ 38. How to prevent accidental S3 exposure?

📝 **Answer**

Enable Block Public Access + correct bucket policy. Use IAM roles in backend to read private files.

---

### ❓ 39. Need DR for static Angular site?

📝 **Answer**

Cross-region replication + CloudFront origin failover. Use for global applications.

---

### ❓ 40. Need WebSockets for real-time updates?

📝 **Answer**

API Gateway WebSocket API or AppSync subscriptions. Use for chat, live dashboards.

---

---

## 🔥 **NEW SECTION — Combinations of AWS Services and When to Use Them**

### ❓ 41. Which AWS service combinations are commonly used for full-stack web apps?

📝 **Answer**

A typical setup uses **S3 + CloudFront** (frontend), **API Gateway + Lambda** (backend), **DynamoDB/RDS** (database), **Cognito** (authentication). Use this for fully serverless Angular/React/Vue apps.

---

### ❓ 42. What services combine well for secure file uploads?

📝 **Answer**

Use **S3 (bucket)** + **pre-signed URLs (backend Lambda)** + **Cognito** for auth.
Angular → GET pre-signed URL → PUT file to S3.

---

### ❓ 43. What combination is used for real-time analytics dashboards?

📝 **Answer**

AppSync/WebSockets + DynamoDB Streams + Lambda.
Use when a frontend dashboard needs live updates.

---

### ❓ 44. What combination supports CI/CD for Angular builds?

📝 **Answer**

CodePipeline → CodeBuild → S3 → CloudFront invalidation.
Use to automate deploys on every git commit.

---

### ❓ 45. What combination ensures secure private APIs?

📝 **Answer**

API Gateway Private Endpoints + VPC Link + ALB/ECS.
Use when frontend should access backend only through controlled VPC traffic.
