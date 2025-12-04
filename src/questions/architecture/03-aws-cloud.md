## 1. Cloud Fundamentals & Shared Responsibility Model

### **1. What does the AWS Shared Responsibility Model mean?**

**Answer**  
AWS secures **the cloud** (hardware, networking, hypervisor). Customers secure **in the cloud** (data, access, IAM, OS config, encryption).

### **2. Who is responsible for patching EC2 instances?**

**Answer**  
Customer. AWS only patches the underlying physical hosts.

### **3. Is AWS responsible for encrypting your data by default?**

**Answer**  
Not always. AWS provides tools (KMS, SSE), but customer chooses to enable/use them.

---

## 2. IAM, Security & Access Control

### **4. What is the difference between IAM User vs Role?**

**Answer**  
**User:** Long-term identity with credentials.
**Role:** Temporary credentials, assumed by users/services.

### **5. How does an Angular SPA hosted in S3 access AWS APIs securely?**

**Answer**  
Using **Cognito** for auth + **IAM roles** via federated identity → API Gateway/Lambda.

### **6. What is the principle of least privilege?**

**Answer**  
Grant only the minimum permissions required, nothing more.

---

## 3. Compute (EC2, Lambda, Containers)

### **7. When should you choose Lambda vs EC2?**

**A:**

- **Lambda:** Event-driven, short tasks, autoscaling automatically.
- **EC2:** Long-running servers, custom OS-level control.

### **8. What is EC2 Auto Scaling?**

**Answer**  
Automatically increases/decreases instances based on load or schedules.

### **9. What is serverless?**

**Answer**  
No server management; code runs on demand (Lambda, DynamoDB, API Gateway, S3).

---

## 4. Storage (S3, EBS, EFS)

### **10. Difference: S3 vs EBS vs EFS?**

**A:**

- **S3:** Object storage (scalable, durable).
- **EBS:** Block storage for EC2.
- **EFS:** Elastic file storage, shared across instances.

### **11. What is S3 versioning and why enable it?**

**Answer**  
Stores all versions of an object → protects from accidental deletes/overwrites.

### **12. What is S3 Intelligent-Tiering?**

**Answer**  
Automatically moves data to cheaper storage tiers based on usage patterns.

---

## 5. Database Services

### **13. When use DynamoDB vs RDS?**

**A:**

- **DynamoDB:** NoSQL, massive scale, key-value.
- **RDS:** SQL databases (MySQL/Postgres/etc.) with managed operations.

### **14. What is the benefit of Aurora over standard RDS?**

**Answer**  
More performance, distributed storage, automatic failover.

---

## 6. Networking & VPC

### **15. Difference between Public Subnet and Private Subnet?**

**A:**

- **Public:** Has route to Internet Gateway.
- **Private:** Internal resources, no direct Internet exposure.

### **16. What is a Security Group?**

**Answer**  
Virtual firewall at instance level; **stateful**.

### **17. What is a NAT Gateway used for?**

**Answer**  
Lets private subnet instances **outbound** internet access (updates, APIs) without exposing them.

---

## 7. Serverless + API Integration (Useful for Angular Developers)

### **18. What AWS services are typically used to host Angular apps?**

**A:**

- **S3** for hosting static files
- **CloudFront** for CDN + caching
- **Route 53** for DNS
- **Lambda/API Gateway** for backend APIs
- **Cognito** for authentication

### **19. Why CloudFront improves Angular SPA performance?**

**Answer**  
Global edge caching reduces latency, SSL termination, and DDoS protection via Shield.

### **20. Can CloudFront cache API responses?**

**Answer**  
Yes, with proper cache policies/headers.

---

## 8. Billing, Pricing & Cost Optimization

### **21. What is the AWS pricing model?**

**Answer**  
Pay-as-you-go, pay-for-what-you-use, and reserved capacity discounts.

### **22. How do you reduce EC2 cost?**

**A:**

- Right-sizing
- Reserved Instances/Savings Plans
- Spot instances
- Auto Scaling

### **23. What is the AWS Free Tier trap?**

**Answer**  
Free-tier limits aren’t global; exceeding region or service limits → charges.

---

## 9. Monitoring & Logging

### **24. How does CloudWatch differ from CloudTrail?**

**A:**

- **CloudWatch:** Metrics, logs, alarms.
- **CloudTrail:** Records API calls for auditing.

### **25. How do you debug production Lambda errors?**

**Answer**  
Using CloudWatch Logs + Lambda function logs + X-Ray for tracing.

---

## 10. High Availability & Fault Tolerance

### **26. What is the difference between Multi-AZ vs Multi-Region?**

**A:**

- **Multi-AZ:** Failover within same region.
- **Multi-Region:** Geo-redundancy, disaster recovery.

### **27. What is an Availability Zone?**

**Answer**  
Physically separate data centers within a region.

### **28. Why use Load Balancers?**

**Answer**  
Distribute traffic, health checks, SSL termination.

---

## 11. Cloud Practitioner–Level “Mock Tricky” Questions

### **29. Is S3 a global or regional service?**

**Answer**  
Regional — you choose a region for buckets, though namespace is global.

### **30. Can you store Angular environment variables securely in S3?**

**Answer**  
No. SPA code is public. Use **Secrets Manager** or **SSM Parameter Store** in backend.

### **31. Can Lambda run longer than 15 minutes?**

**Answer**  
No. It’s capped at 15 minutes.

### **32. Which AWS service helps estimate costs before deployment?**

**Answer**  
AWS Pricing Calculator.

### **33. Which AWS service provides organization-wide cost control?**

**Answer**  
AWS Organizations + SCP + AWS Budgets.

---

## 12. Scenario-Based Mock Questions (For Interviews)

### **34. Your Angular app loads slowly from S3. What AWS services help?**

**Answer**  
CloudFront CDN + compression + cache invalidation + S3 transfer acceleration.

### **35. You need authentication for your Angular SPA. Which AWS service?**

**Answer**  
Amazon Cognito (User Pools + Federated identities).

### **36. Your app needs a backend without managing servers. Which architecture?**

**Answer**  
API Gateway → Lambda → DynamoDB (Serverless stack).

### **37. You need real-time logs from a Lambda function. How?**

**Answer**  
CloudWatch Logs + log groups + metrics filters.

### **38. How to ensure S3 objects aren't publicly accessible accidentally?**

**Answer**  
S3 Block Public Access + IAM + Bucket Policies.

### **39. Your company wants disaster recovery for a static Angular site. How?**

**Answer**  
Replicate S3 bucket cross-region + multi-region CloudFront failover.

### **40. You need WebSockets for real-time updates. Which AWS service?**

**Answer**  
API Gateway WebSocket APIs or AppSync for GraphQL subscriptions.
