## ☁️ DOMAIN 1: CLOUD CONCEPTS – MODEL ANSWERS

![Image](https://k21academy.com/wp-content/uploads/2024/05/AWS.png)

![Image](https://k21academy.com/wp-content/uploads/2023/07/8.webp)

![Image](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/product-categories/networking/approved/images/02b790d3d6b773afdea29a2483c46cd0.4c2a53c7c0d445df26718987c0b6a4ff3a05510c.jpeg)

### ❓ 1. What is Cloud Computing?

**Answer**
Cloud computing is the on-demand delivery of computing resources like servers, storage, and databases over the internet with pay-as-you-go pricing, without owning physical infrastructure.

---

### ❓ 2. Why AWS Cloud instead of On-Prem?

**Answer**
AWS reduces upfront cost, provides global scalability, high availability, faster deployment, and managed services so companies can focus on business instead of infrastructure.

---

### ❓ 3. What is Elasticity?

**Answer**
Elasticity is the ability to automatically increase or decrease resources based on real-time demand.

---

### ❓ 4. Elasticity vs Scalability?

**Answer**

- **Scalability:** Ability to grow capacity (manual or planned).
- **Elasticity:** Automatic scaling based on demand.

---

### ❓ 5. What is High Availability?

**Answer**
Designing systems to remain operational even if components fail, typically using Multi-AZ deployments and load balancing.

---

### ❓ 6. What is Durability?

**Answer**
Durability ensures data is not lost, even during failures. Example: Amazon S3 stores multiple copies across AZs.

---

### ❓ 7. Public vs Private vs Hybrid Cloud?

**Answer**

- **Public:** AWS-managed, internet accessible
- **Private:** Dedicated infra for one org
- **Hybrid:** Combination of on-prem + AWS

---

### ❓ 8. IaaS vs PaaS vs SaaS?

**Answer**

- **IaaS:** You manage OS & apps (EC2)
- **PaaS:** AWS manages infra, you deploy code (Elastic Beanstalk)
- **SaaS:** Fully managed software (WorkDocs)

---

### ❓ 9. What is Pay-As-You-Go?

**Answer**
You pay only for what you use, without long-term commitment or upfront cost.

---

### ❓ 10. AWS Pricing Models?

**Answer**

- On-Demand – flexible
- Reserved – long-term savings
- Spot – low cost, interruptible
- Savings Plans – flexible commitment

---

### ❓ 11. Shared Responsibility Model?

**Answer**
AWS secures the **cloud**, customers secure **what’s in the cloud** (data, access, OS configs).

---

### ❓ 12. What is an AWS Region and AZ?

**Answer**

- **Region:** Geographic location
- **AZ:** Isolated data centers within a region

---

### ❓ 13. What is CloudFront?

**Answer**
A CDN that caches content at edge locations for low-latency delivery.

---

### ❓ 14. AWS Well-Architected Framework?

**Answer**
A best-practice framework with 6 pillars: Operational Excellence, Security, Reliability, Performance, Cost Optimization, Sustainability.

---

## 🔐 DOMAIN 2: SECURITY, IDENTITY & GOVERNANCE

![Image](https://docs.aws.amazon.com/images/whitepapers/latest/aws-risk-and-compliance/images/image2.png)

![Image](https://docs.aws.amazon.com/images/IAM/latest/UserGuide/images/intro-diagram%20_policies_800.png)

![Image](https://docs.aws.amazon.com/images/whitepapers/latest/aws-overview/images/security-identity-governance-services.png)

### ❓ 15. What is IAM?

**Answer**
IAM controls who can access AWS resources and what actions they can perform.

---

### ❓ 16. IAM User vs Role?

**Answer**

- **User:** Permanent identity
- **Role:** Temporary access, more secure, no credentials

---

### ❓ 17. What is IAM Policy?

**Answer**
A JSON document defining permissions (Allow/Deny).

---

### ❓ 18. Why use IAM Roles?

**Answer**
They avoid hard-coded credentials and are safer for services and cross-account access.

---

### ❓ 19. What is AWS Organizations?

**Answer**
Used to manage multiple AWS accounts centrally with billing and security policies.

---

### ❓ 20. What is GuardDuty?

**Answer**
Threat detection service using ML to detect suspicious activity.

---

### ❓ 21. What is AWS Config?

**Answer**
Tracks resource configuration changes for compliance auditing.

---

### ❓ 22. KMS vs CloudHSM?

**Answer**

- **KMS:** Managed key service
- **CloudHSM:** Customer-controlled hardware keys

---

### ❓ 23. Secrets Manager vs Parameter Store?

**Answer**
Secrets Manager supports automatic rotation; Parameter Store is cheaper and simpler.

---

### ❓ 24. AWS Shield vs WAF?

**Answer**

- **Shield:** DDoS protection
- **WAF:** Protects web apps from attacks like SQL injection

---

## 🚚 DOMAIN 3: MIGRATION & DATA TRANSFER

![Image](https://docs.aws.amazon.com/images/whitepapers/latest/aws-overview/images/data-migration-services.png)

![Image](https://d2908q01vomqb2.cloudfront.net/e1822db470e60d090affd0956d743cb0e7cdf113/2020/12/08/Summary-comparison-of-the-AWS-Snow-Family.png)

![Image](https://d2908q01vomqb2.cloudfront.net/fc074d501302eb2b93e2554793fcaf50b3bf7291/2021/09/29/Figure2-Access.png)

### ❓ 25. What is AWS Migration Hub?

**Answer**
Central dashboard to track migration progress.

---

### ❓ 26. DataSync vs Snowball?

**Answer**

- **DataSync:** Online transfer
- **Snowball:** Offline large data transfer

---

### ❓ 27. Snowball vs Snowmobile?

**Answer**
Snowmobile is used for exabyte-scale data using a shipping container.

---

### ❓ 28. AWS Storage Gateway?

**Answer**
Hybrid service connecting on-prem storage to AWS cloud storage.

---

### ❓ 29. What are the 6 Migration Strategies?

**Answer**
Rehost, Replatform, Refactor, Repurchase, Retire, Retain (+ Relocate).

---

## 🤖 DOMAIN 4: CORE SERVICES

![Image](https://miro.medium.com/1%2Akt3-ZdHERuDfwXP33dhMww.jpeg)

![Image](https://docs.aws.amazon.com/images/vpc/latest/userguide/images/how-it-works.png)

![Image](https://cdn.prod.website-files.com/6340354625974824cde2e195/65f0dd2ea5d885014b1a6840_GIF1.gif)

### ❓ 30. What is EC2?

**Answer**
Scalable virtual servers with full OS control.

---

### ❓ 31. What is an AMI?

**Answer**
A template containing OS, software, and configuration for EC2.

---

### ❓ 32. What is Auto Scaling?

**Answer**
Automatically adjusts EC2 capacity based on demand.

---

### ❓ 33. ALB vs NLB?

**Answer**

- **ALB:** HTTP/HTTPS, layer 7
- **NLB:** TCP, ultra-low latency

---

### ❓ 34. What is Lambda?

**Answer**
Serverless compute that runs code without managing servers.

---

### ❓ 35. S3 vs EBS?

**Answer**

- **S3:** Object storage
- **EBS:** Block storage for EC2

---

### ❓ 36. RDS vs DynamoDB?

**Answer**

- **RDS:** Relational, SQL
- **DynamoDB:** NoSQL, serverless

---

### ❓ 37. What is VPC?

**Answer**
A logically isolated virtual network in AWS.

---

### ❓ 38. Security Group vs NACL?

**Answer**

- **SG:** Instance-level, stateful
- **NACL:** Subnet-level, stateless

---

## 🚀 DOMAIN 5: DEPLOYMENT, MONITORING & COST

![Image](https://k21academy.com/wp-content/uploads/2021/02/difference.png)

![Image](https://d2908q01vomqb2.cloudfront.net/7719a1c782a1ba91c031a682a0a2f8658209adbf/2020/10/11/Single-tenant-SaaS-CICD-Pipeline-1024x492.png)

![Image](https://www.cloudzero.com/wp-content/uploads/2024/01/aws-cost-explorer.webp)

### ❓ 39. CloudWatch vs CloudTrail?

**Answer**

- **CloudWatch:** Metrics & logs
- **CloudTrail:** API activity audit

---

### ❓ 40. What is CloudFormation?

**Answer**
Infrastructure as Code service to automate resource creation.

---

### ❓ 41. What is Trusted Advisor?

**Answer**
Provides best-practice recommendations for cost, security, performance.

---

### ❓ 42. What is Cost Explorer?

**Answer**
Visual tool to analyze AWS spending trends.

---

### ❓ 43. AWS Support Plans?

**Answer**
Basic, Developer, Business, Enterprise (TAM included).

---

# PART 2 – MOCK INTERVIEW Q&A ROLE-PLAY

---

### ❓ 44. Explain AWS Shared Responsibility Model.

**Answer**

AWS is responsible for securing the infrastructure like physical data centers, networking, and virtualization.
The customer is responsible for securing data, access control, OS patching, and application security.

---

### ❓ 45. Which pricing model will you use for a batch job?

**Answer**

Spot Instances, because batch jobs can tolerate interruptions and offer up to 90% cost savings.

---

### ❓ 46. How do you design a highly available application?

**Answer**

By deploying across multiple AZs, using load balancers, auto scaling, backups, and monitoring.

---

### ❓ 47. Is S3 highly available or highly durable?

**Answer**

S3 is **both** highly durable and highly available, but durability is higher (11 9’s).

---

### ❓ 48. How do you reduce AWS costs?

**Answer**

By right-sizing resources, using Reserved or Spot instances, deleting unused services, and monitoring with Cost Explorer.

---
