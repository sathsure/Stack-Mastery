# AWS Cloud Practitioner

![AWS_CLS_DIAGRAM Image](/src/assets/aws-cls-diagram.png)

![AWS_Architecture Image](/src/assets/aws-architecture.png)

## 💻 COMPUTE SERVICES

![AWS_Serverless Image](/src/assets/aws-serverless.png)

![AWS_Compute Image](/src/assets/aws-compute.png)

### 🔹 Core Compute Services (VERY IMPORTANT)

| Service                          | What you must know for CLF-C02                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Amazon EC2**                   | Virtual servers in the cloud. You choose instance type, OS, storage, and network. Used for full control workloads. |
| **EC2 Auto Scaling**             | Automatically adds or removes EC2 instances based on demand to maintain performance and reduce cost.               |
| **Elastic Load Balancing (ELB)** | Distributes incoming traffic across multiple targets (EC2, containers, IPs) to improve availability.               |
| **AWS Lambda**                   | Serverless compute. Run code without managing servers. Pay only for execution time.                                |
| **AWS Elastic Beanstalk**        | Platform as a Service (PaaS) for deploying applications without managing infrastructure.                           |
| **Amazon Lightsail**             | Simplified compute for small apps, websites, or beginners with predictable pricing.                                |

### 🔹 Container & Modern Compute (High-Level Awareness)

| Service            | What you must know                                                                     |
| ------------------ | -------------------------------------------------------------------------------------- |
| **Amazon ECS**     | Managed container orchestration for Docker containers.                                 |
| **Amazon EKS**     | Managed Kubernetes service.                                                            |
| **AWS Fargate**    | Serverless compute engine for containers (used with ECS/EKS).                          |
| **AWS App Runner** | Fully managed service to run containerized web apps without infrastructure management. |

### 🔹 Batch & Specialized Compute (Basic Recognition Only)

| Service               | What you must know                                               |
| --------------------- | ---------------------------------------------------------------- |
| **AWS Batch**         | Runs batch computing jobs at any scale without managing servers. |
| **EC2 Image Builder** | Automates creation of secure VM images (AMI).                    |

### 🔹 Hybrid & Edge Compute (Conceptual Awareness)

| Service                 | What you must know                                   |
| ----------------------- | ---------------------------------------------------- |
| **AWS Outposts**        | AWS infrastructure on-premises (hybrid cloud).       |
| **AWS Wavelength**      | Ultra-low latency compute for 5G applications.       |
| **VMware Cloud on AWS** | Run VMware workloads directly on AWS infrastructure. |

---

### 🔹Trick Questions:

1. Which AWS compute service requires **no server provisioning or management**? → **AWS Lambda / AWS Fargate**

2. Which compute service provides **complete control over the operating system**? → **Amazon EC2**

3. Which service automatically **increases or decreases EC2 capacity** based on demand? → **EC2 Auto Scaling**

4. Which AWS service **distributes incoming application traffic** across multiple targets? → **Elastic Load Balancing (ELB)**

5. Which compute service is best for **quickly deploying applications without managing infrastructure**? → **AWS Elastic Beanstalk**

6. Which service is designed for **small websites with predictable monthly pricing**? → **Amazon Lightsail**

7. Which compute service allows you to **run containers without managing EC2 instances**? → **AWS Fargate**

8. Which AWS service is used for **running serverless functions triggered by events**? → **AWS Lambda**

9. Which compute service is considered a **Platform as a Service (PaaS)**? → **AWS Elastic Beanstalk**

10. Which AWS service is suitable for **container orchestration using Kubernetes**? → **Amazon EKS**

11. Which compute service allows AWS infrastructure to run **inside an on-premises data center**? → **AWS Outposts**

12. Which service is billed based on **execution duration rather than instance uptime**? → **AWS Lambda**

13. Which AWS service provides **virtual machines in the AWS Cloud**? → **Amazon EC2**

14. Which compute service focuses on **simplicity over flexibility**? → **Amazon Lightsail**

15. Which AWS service supports **automatic scaling without writing scaling logic**? → **EC2 Auto Scaling**

---

## 🗄️ STORAGE SERVICES

| **Service**                          | **Storage Type**        | **What it is**                                                                                                                                                                   | **Common Exam Keywords / Use Case**                                  |
| ------------------------------------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Amazon S3**                        | Object Storage          | Scalable object storage used to store files such as images, videos, backups, logs, and static website content. Data is stored as objects in buckets and accessed via HTTP/HTTPS. | Object storage, unlimited scale, static website, durability (11 9’s) |
| **Amazon S3 Glacier**                | Archival Object Storage | Low-cost storage for long-term data archiving where data is accessed infrequently. Retrieval takes minutes to hours depending on the retrieval option.                           | Archive, low cost, infrequent access                                 |
| **Amazon S3 Glacier Deep Archive**   | Archival Object Storage | Lowest-cost AWS storage option designed for long-term data retention (years). Data retrieval usually takes hours.                                                                | Compliance, backups, cheapest storage                                |
| **Amazon EBS (Elastic Block Store)** | Block Storage           | Persistent block-level storage used with EC2 instances. Data remains even after EC2 is stopped and is typically used for OS disks or databases.                                  | EC2 storage, block storage, persistent                               |
| **Amazon EFS (Elastic File System)** | File Storage            | Fully managed, scalable file system that can be mounted on multiple EC2 instances simultaneously. Commonly used for shared file systems.                                         | Shared storage, Linux file system                                    |
| **Amazon FSx**                       | File Storage            | Managed file systems for specific workloads such as Windows File Server or high-performance computing. Cloud Practitioner only requires recognition, not deep details.           | Windows file system, managed file storage                            |
| **AWS Storage Gateway**              | Hybrid Storage          | Connects on-premises environments with AWS cloud storage, allowing local applications to store data in AWS seamlessly.                                                           | Hybrid cloud, on-prem + AWS                                          |
| **AWS Backup**                       | Backup Service          | Centralized service to automate and manage backups across AWS services like EBS, EFS, RDS, and DynamoDB.                                                                         | Backup automation, centralized backups                               |

### 🔹Trick Questions:

1. Which AWS storage service provides **11 9’s durability** for objects? → **Amazon S3**

2. Which AWS service is the **lowest-cost option for long-term data retention**? → **Amazon S3 Glacier Deep Archive**

3. Which storage service is **mounted like a disk to a single EC2 instance**? → **Amazon EBS**

4. Which AWS storage service allows **multiple EC2 instances to access the same files simultaneously**? → **Amazon EFS**

5. Which service should you use to **store operating system files for an EC2 instance**? → **Amazon EBS**

6. Which AWS service is best suited for **static website hosting**? → **Amazon S3**

7. Which storage service is optimized for **frequent read/write access with low latency**? → **Amazon EBS**

8. Which AWS service provides **file storage accessible using standard file system protocols**? → **Amazon EFS**

9. Which AWS storage option is designed for **data that is rarely accessed but must be retained for years**? → **Amazon S3 Glacier Deep Archive**

10. Which AWS service enables **hybrid storage between on-premises and AWS cloud**? → **AWS Storage Gateway**

11. Which service is commonly used to **archive compliance or audit data at the lowest cost**? → **Amazon S3 Glacier Deep Archive**

12. Which AWS service automatically **scales storage capacity without user intervention**? → **Amazon S3**

13. Which AWS service provides **block-level storage that persists after instance stop**? → **Amazon EBS**

14. Which AWS service is best for **shared Linux file systems across EC2 instances**? → **Amazon EFS**

15. Which AWS service is **NOT suitable for direct installation of an operating system**? → **Amazon S3**

16. Which AWS service supports **lifecycle policies to move data to cheaper storage tiers**? → **Amazon S3**

17. Which AWS storage service requires **manual capacity provisioning**? → **Amazon EBS**

18. Which AWS service is ideal for **backup and restore across multiple AWS services from one place**? → **AWS Backup**

19. Which AWS service allows **retrieval times measured in hours instead of milliseconds**? → **Amazon S3 Glacier Deep Archive**

20. Which AWS storage option is **object-based rather than file or block**? → **Amazon S3**

---

## 🗄️ AWS DATABASE SERVICES

### 1️⃣ Relational Databases (SQL)

| Service           | What it is (Exam-level)                                                                             | Key Exam Clues                                |
| ----------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **Amazon RDS**    | Fully managed relational database service supporting MySQL, PostgreSQL, MariaDB, Oracle, SQL Server | Automated backups, patching, Multi-AZ         |
| **Amazon Aurora** | AWS-built high-performance relational DB compatible with MySQL & PostgreSQL                         | Faster than RDS, highly available, AWS-native |

---

### 2️⃣ NoSQL Databases

| Service             | What it is (Exam-level)                        | Key Exam Clues                             |
| ------------------- | ---------------------------------------------- | ------------------------------------------ |
| **Amazon DynamoDB** | Serverless NoSQL key-value & document database | Single-digit ms latency, automatic scaling |

### 3️⃣ In-Memory Databases (Caching)

| Service                | What it is (Exam-level)                       | Key Exam Clues                                |
| ---------------------- | --------------------------------------------- | --------------------------------------------- |
| **Amazon ElastiCache** | In-memory data store using Redis or Memcached | Caching, session storage, microsecond latency |

### 4️⃣ Data Warehousing (Analytics)

| Service             | What it is (Exam-level)                              | Key Exam Clues                   |
| ------------------- | ---------------------------------------------------- | -------------------------------- |
| **Amazon Redshift** | Fully managed data warehouse for analytics workloads | OLAP, columnar storage, BI tools |

### 5️⃣ Document Databases

| Service               | What it is (Exam-level)                                | Key Exam Clues                    |
| --------------------- | ------------------------------------------------------ | --------------------------------- |
| **Amazon DocumentDB** | Managed JSON document database compatible with MongoDB | Semi-structured data, scalability |

### 6️⃣ Graph Databases

| Service            | What it is (Exam-level)      | Key Exam Clues                 |
| ------------------ | ---------------------------- | ------------------------------ |
| **Amazon Neptune** | Fully managed graph database | Relationships, social networks |

### 7️⃣ Key-Value (Cassandra-compatible)

| Service              | What it is (Exam-level)                   | Key Exam Clues                 |
| -------------------- | ----------------------------------------- | ------------------------------ |
| **Amazon Keyspaces** | Serverless Apache Cassandra-compatible DB | Wide-column, high availability |

### 🔹Trick Questions:

1. An application needs **SQL support, automated backups, and minimal administration** → **Amazon RDS**

2. A MySQL workload requires **high performance and fault tolerance with AWS-native design** → **Amazon Aurora**

3. A serverless application needs **massive scale with single-digit millisecond latency** → **Amazon DynamoDB**

4. A system stores **session data that must be extremely fast** → **Amazon ElastiCache**

5. A company wants to run **complex analytical queries on petabytes of data** → **Amazon Redshift**

6. An application stores **JSON documents and needs MongoDB compatibility** → **Amazon DocumentDB**

7. A recommendation engine needs to model **relationships between entities** → **Amazon Neptune**

8. A workload requires a **fully managed Apache Cassandra-compatible database** → **Amazon Keyspaces**

9. A database must **scale automatically without capacity planning** → **Amazon DynamoDB**

10. A reporting system is used mainly for **BI dashboards and analytics** → **Amazon Redshift**

11. Data must be **relational but with lower operational overhead** → **Amazon RDS**

12. Data access requires **microsecond latency, not persistence focus** → **Amazon ElastiCache**

13. A workload needs **high availability with read replicas and failover** → **Amazon Aurora**

14. A NoSQL database must handle **unpredictable traffic spikes** → **Amazon DynamoDB**

15. An analytics team queries data using **SQL but not for transactions** → **Amazon Redshift**

16. SQL transactions with joins and constraints → **Amazon RDS**

17. Serverless key-value storage with global scale → **Amazon DynamoDB**

18. Caching layer placed in front of a database → **Amazon ElastiCache**

19. Graph-based queries like “friends of friends” → **Amazon Neptune**

20. Semi-structured document storage → **Amazon DocumentDB**

---

## 🌐 NETWORKING & CONTENT DELIVERY

![AWS_DNS Image](/src/assets/aws-dns.png)

| **Service**                      | **What it is**                                                 | **Key Purpose / When to Use**                                                                          |
| -------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Amazon VPC**                   | A logically isolated virtual network in AWS                    | Used to launch AWS resources (EC2, RDS, etc.) in a private, controlled network with your own IP ranges |
| **Subnets**                      | A segmented range of IPs inside a VPC                          | Used to separate resources (public vs private) across Availability Zones                               |
| **Internet Gateway (IGW)**       | A gateway that allows VPC resources to access the internet     | Required for public subnets so instances can send/receive internet traffic                             |
| **NAT Gateway**                  | Allows private subnet resources to access the internet         | Used when instances must download updates but must NOT be publicly accessible                          |
| **Route Tables**                 | Rules that control traffic routing in a VPC                    | Determines where network traffic is directed (IGW, NAT, VPC peering, etc.)                             |
| **Security Groups**              | Virtual firewall at the instance level                         | Controls inbound and outbound traffic (stateful)                                                       |
| **Network ACL (NACL)**           | Firewall at the subnet level                                   | Provides an extra layer of security (stateless)                                                        |
| **Elastic Load Balancing (ELB)** | Distributes incoming traffic across multiple targets           | Improves availability and fault tolerance (ALB, NLB – no deep config needed for exam)                  |
| **Amazon Route 53**              | Highly available DNS (Domain Name System) service              | Routes users to applications using domain names and routing policies                                   |
| **Amazon CloudFront**            | Content Delivery Network (CDN)                                 | Delivers content (images, videos, APIs) with low latency using edge locations                          |
| **AWS Direct Connect**           | Dedicated private connection from on-premises to AWS           | Used for consistent network performance and lower latency (enterprise use case)                        |
| **Site-to-Site VPN**             | Encrypted tunnel between on-prem and AWS                       | Used for hybrid cloud connectivity over the public internet                                            |
| **AWS Global Accelerator**       | Improves availability and performance using AWS global network | Routes traffic to the nearest healthy endpoint using static IPs                                        |
| **Amazon API Gateway**           | Managed service to create, publish, and secure APIs            | Acts as a front door for applications (often used with Lambda)                                         |

### 🔹Trick Questions:

1. A service is needed to **translate a domain name to an IP address globally** → **Amazon Route 53**

2. Users worldwide experience **high latency while loading static images** → **Amazon CloudFront**

3. An application must **distribute traffic across multiple EC2 instances** → **Elastic Load Balancing (ELB)**

4. Resources must run in a **logically isolated private network** → **Amazon VPC**

5. Instances in a private subnet need **outbound internet access only** → **NAT Gateway**

6. A subnet requires **direct inbound and outbound internet access** → **Internet Gateway**

7. Traffic routing rules inside a VPC must be controlled → **Route Tables**

8. Security rules must apply **directly to EC2 instances** → **Security Groups**

9. Security rules must apply **at the subnet level** → **Network ACL (NACL)**

10. On-premises data center needs a **secure encrypted connection over the internet** → **Site-to-Site VPN**

11. On-premises data center needs a **private, dedicated, high-bandwidth connection** → **AWS Direct Connect**

12. A global application needs **static IPs and fastest user routing** → **AWS Global Accelerator**

13. A service is needed to **create, manage, and secure REST APIs** → **Amazon API Gateway**

14. Traffic must be routed to the **nearest healthy endpoint globally** → **Amazon Route 53 (latency routing)**

15. DDoS protection for network-level attacks is required → **AWS Shield**

16. Content must be cached at **edge locations worldwide** → **Amazon CloudFront**

17. A company wants **high availability without managing servers** → **Elastic Load Balancing**

18. A VPC needs to communicate with another VPC securely → **VPC Peering**

19. Hybrid architecture is required using the **public internet** → **VPN**

20. Hybrid architecture requires **predictable performance and low latency** → **Direct Connect**

---

## 🔐 SECURITY, IDENTITY & COMPLIANCE

| **Service**                                  | **What it is**                                                                                                                   | **Exam Keywords / Focus**                                      |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **AWS Identity and Access Management (IAM)** | Core AWS service to **manage users, groups, roles, and permissions**. Uses policies written in JSON to define _who can do what_. | Authentication, Authorization, Least Privilege, Roles vs Users |
| **IAM Identity Center (SSO)**                | Centralized **single sign-on (SSO)** service to manage access across **multiple AWS accounts and applications**.                 | SSO, Multi-account access, Federation                          |
| **Amazon Cognito**                           | Provides **user sign-up, sign-in, and authentication** for web and mobile apps. Used for **application users**, not AWS admins.  | App users, OAuth, User pools                                   |
| **AWS Organizations**                        | Helps manage **multiple AWS accounts** centrally, apply **Service Control Policies (SCPs)**, and consolidate billing.            | Multi-account management, SCPs                                 |
| **AWS Key Management Service (KMS)**         | Managed service to **create, manage, and control encryption keys** used to encrypt data across AWS services.                     | Encryption at rest, CMK, Integrated encryption                 |
| **AWS Secrets Manager**                      | Securely **stores and rotates secrets** like database passwords, API keys, and tokens.                                           | Secrets rotation, No hardcoded secrets                         |
| **AWS Certificate Manager (ACM)**            | Manages **SSL/TLS certificates** for services like ALB, CloudFront, and API Gateway.                                             | HTTPS, TLS, Certificates                                       |
| **AWS Shield**                               | Provides **DDoS protection**. Shield Standard is automatic and free; Shield Advanced offers enhanced protection.                 | DDoS protection                                                |
| **AWS Web Application Firewall (WAF)**       | Protects web applications from **common web exploits** like SQL injection and XSS attacks.                                       | Layer 7 protection                                             |
| **Amazon GuardDuty**                         | **Threat detection service** that continuously monitors AWS accounts for malicious activity using ML and logs.                   | Intelligent threat detection                                   |
| **Amazon Inspector**                         | **Automated security assessment** service that scans EC2 and container workloads for vulnerabilities.                            | Vulnerability scanning                                         |
| **Amazon Macie**                             | Uses ML to **discover and protect sensitive data** (like PII) stored in Amazon S3.                                               | PII, Data classification                                       |
| **AWS Security Hub**                         | Central dashboard that **aggregates security findings** from multiple AWS security services.                                     | Security posture management                                    |
| **AWS Artifact**                             | Provides **on-demand access to compliance reports** and agreements (SOC, ISO, PCI).                                              | Compliance reports                                             |
| **AWS CloudTrail**                           | Records **all API calls and account activity** for auditing and compliance.                                                      | Who did what, Audit logs                                       |

### 🔹Trick Questions:

1. A service is needed to **control who can access AWS resources using policies** → **AWS IAM**

2. A service is required to **grant temporary permissions to AWS services** → **IAM Role**

3. A company wants **single sign-on across multiple AWS accounts** → **IAM Identity Center (SSO)**

4. A mobile app needs **user sign-up and sign-in** → **Amazon Cognito**

5. A service is needed to **centrally manage multiple AWS accounts** → **AWS Organizations**

6. A company wants to **restrict what accounts can do, even for admins** → **Service Control Policies (SCPs)**

7. A service is required to **encrypt data at rest using managed keys** → **AWS KMS**

8. A service is needed to **store database passwords securely** → **AWS Secrets Manager**

9. A service automatically **rotates database credentials** → **AWS Secrets Manager**

10. A service is required to **protect applications from DDoS attacks** → **AWS Shield**

11. A service is needed to **block SQL injection and XSS attacks** → **AWS WAF**

12. A service continuously **detects suspicious activity using ML** → **Amazon GuardDuty**

13. A service is required to **scan EC2 instances for vulnerabilities** → **Amazon Inspector**

14. A service identifies **PII data stored in S3 buckets** → **Amazon Macie**

15. A service provides a **central security findings dashboard** → **AWS Security Hub**

16. A service records **who did what and when in AWS** → **AWS CloudTrail**

17. A service is needed to **audit API calls for compliance** → **AWS CloudTrail**

18. A service provides **SOC, ISO, and PCI compliance reports** → **AWS Artifact**

19. A service manages **SSL/TLS certificates for AWS services** → **AWS Certificate Manager**

20. A service is needed to **protect against account compromise attempts** → **Amazon GuardDuty**

21. A service enforces **least privilege access by default** → **AWS IAM**

22. A service allows **federated login using Google or Facebook** → **Amazon Cognito**

23. A service helps **meet regulatory compliance without managing infrastructure** → **AWS Artifact**

24. A service aggregates **security alerts from Inspector, GuardDuty, and Macie** → **AWS Security Hub**

25. A service detects **unauthorized cryptocurrency mining** → **Amazon GuardDuty**

---

## 🛠️ MANAGEMENT & MONITORING

| **Service**                   | **What it does**                                                                               | **Why it exists (exam-oriented)**                                                                           |
| ----------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Amazon CloudWatch**         | Collects **metrics, logs, and alarms** from AWS resources like EC2, Lambda, RDS, etc.          | Used to **monitor performance and health** of AWS resources and trigger alerts when thresholds are crossed. |
| **AWS CloudTrail**            | Records **all API calls and account activity** made in your AWS account.                       | Used for **auditing, governance, and security investigations** (who did what, when).                        |
| **AWS Config**                | Tracks **resource configurations** and configuration changes over time.                        | Helps with **compliance and drift detection** (e.g., “Was encryption turned off?”).                         |
| **AWS Systems Manager**       | Centralized operational hub for **patching, automation, parameter storage, and run commands**. | Used to **manage EC2 and hybrid resources at scale** without logging into servers.                          |
| **AWS Trusted Advisor**       | Analyzes your account and gives **best-practice recommendations**.                             | Helps improve **cost optimization, security, fault tolerance, and performance**.                            |
| **AWS Health Dashboard**      | Displays **service-level and account-specific AWS issues**.                                    | Used to understand **AWS outages and planned maintenance** affecting your resources.                        |
| **AWS Organizations**         | Manages **multiple AWS accounts centrally** using OUs and policies.                            | Enables **account governance, consolidated billing, and SCPs**.                                             |
| **AWS Control Tower**         | Automates **multi-account setup** using AWS best practices.                                    | Used to quickly build a **secure, governed landing zone**.                                                  |
| **AWS Service Catalog**       | Allows admins to create **approved service portfolios**.                                       | Ensures teams launch **only compliant and pre-approved resources**.                                         |
| **AWS Well-Architected Tool** | Reviews workloads against AWS **best-practice pillars**.                                       | Helps identify **architectural risks** in cost, security, reliability, etc.                                 |
| **AWS Auto Scaling**          | Automatically adjusts capacity across services (EC2, ECS, DynamoDB).                           | Ensures **availability and cost efficiency** during demand changes.                                         |

### 🔹Trick Questions:

1. A service is needed to **control access to AWS services using users, roles, and policies** → **AWS Identity and Access Management (IAM)**

2. A service is needed to **grant temporary permissions to AWS resources without sharing credentials** → **AWS Identity and Access Management (IAM Roles)**

3. A service is needed to **authenticate users for a web or mobile application** → **Amazon Cognito**

4. A service is needed to **protect applications from DDoS attacks automatically** → **AWS Shield**

5. A service is needed to **block malicious HTTP requests like SQL injection and XSS** → **AWS WAF**

6. A service is needed to **encrypt data using managed encryption keys** → **AWS Key Management Service (KMS)**

7. A service is needed to **store database passwords and API keys securely** → **AWS Secrets Manager**

8. A service is needed to **detect suspicious activity like compromised credentials** → **Amazon GuardDuty**

9. A service is needed to **scan EC2 instances for vulnerabilities** → **Amazon Inspector**

10. A service is needed to **identify sensitive data like PII in S3 buckets** → **Amazon Macie**

11. A service is needed to **provide AWS compliance reports (SOC, ISO, PCI)** → **AWS Artifact**

12. A service is needed to **centrally manage security findings across AWS accounts** → **AWS Security Hub**

13. A service is needed to **log all API calls made in an AWS account** → **AWS CloudTrail**

14. A service is needed to **monitor configuration changes for compliance** → **AWS Config**

15. A service is needed to **store SSL/TLS certificates for free and manage renewals** → **AWS Certificate Manager (ACM)**

16. A service is needed to **protect network traffic with managed firewall rules** → **AWS Network Firewall**

17. A service is needed to **share AWS resources securely between accounts** → **AWS Resource Access Manager (RAM)**

18. A service is needed to **enforce permissions across multiple AWS accounts** → **AWS Organizations**

---

### 💰 PRICING & COST MANAGEMENT

| **Service**                          | **What it is**                                                   | **What problem it solves**                                                                                                                                                    |
| ------------------------------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AWS Cost Explorer**                | A visual analytics tool to explore AWS costs and usage over time | Helps you **analyze past & current spending**, identify which services or accounts cost the most, and forecast future costs. Exam keyword: **visualize & analyze costs**.     |
| **AWS Budgets**                      | A budgeting and alerting service                                 | Lets you **set cost, usage, or reservation budgets** and sends alerts when thresholds are exceeded or forecasted to exceed. Exam keyword: **alerts & thresholds**.            |
| **AWS Cost and Usage Report (CUR)**  | The most detailed billing report AWS provides                    | Gives **hourly or daily line-item usage and cost data** for every AWS service. Used for **deep cost analysis and auditing**. Exam keyword: **most detailed billing data**.    |
| **AWS Billing Conductor**            | Custom billing management service                                | Used mainly by **enterprises and solution providers** to do **chargeback/showback** with custom pricing views. Exam keyword: **custom billing for internal teams/customers**. |
| **Savings Plans**                    | A flexible pricing model based on usage commitment               | Provides **lower prices than On-Demand** in exchange for a **1-year or 3-year commitment**. Exam keyword: **commit to usage → save money**.                                   |
| **Reserved Instance (RI) Reporting** | Reporting tools for Reserved Instances                           | Helps track **RI utilization and coverage** to ensure you’re actually using what you paid for. Exam keyword: **measure RI efficiency**.                                       |

### 🔹Trick Questions:

1. A service is needed to **visualize AWS costs and forecast future spending** → **AWS Cost Explorer**

2. A service is required to **send alerts when monthly spend exceeds a limit** → **AWS Budgets**

3. A company needs **hour-by-hour, line-item billing data for every service** → **AWS Cost and Usage Report (CUR)**

4. A business wants to **set different internal prices for different teams** → **AWS Billing Conductor**

5. A pricing model offers **discounts in exchange for a 1-year or 3-year usage commitment** → **Savings Plans**

6. A report is needed to **check if Reserved Instances are being fully utilized** → **Reserved Instance (RI) Reporting**

7. A user wants to **compare cost trends across multiple linked AWS accounts** → **AWS Cost Explorer**

8. A finance team needs **budget alerts via email or SNS** → **AWS Budgets**

9. A company wants the **most detailed billing data for auditing purposes** → **AWS Cost and Usage Report (CUR)**

10. A solution provider needs **chargeback and showback for customers** → **AWS Billing Conductor**

11. Pay only for compute time with **no upfront commitment** → **On-Demand pricing**

12. Get **up to 90% discount** using unused EC2 capacity → **Spot Instances**

13. Reduce cost by **committing to spend per hour, not instance type** → **Savings Plans**

14. Reserve EC2 capacity for long-term predictable workloads → **Reserved Instances**

15. New users want **limited free usage for 12 months** → **AWS Free Tier**

16. **Analyze past costs** but not alert → **AWS Cost Explorer**

17. **Alert on future overspend** → **AWS Budgets**

18. **Deep billing export to S3** → **AWS Cost and Usage Report**

19. **Custom internal pricing views** → **AWS Billing Conductor**

20. **Commit usage across EC2, Lambda, Fargate** → **Compute Savings Plans**

---

### 🚀 DEPLOYMENT & MIGRATION

- **AWS Elastic Beanstalk** deploys applications automatically.
  Developers upload code while AWS manages the infrastructure.

- **AWS CloudFormation** uses templates to create resources.
  It ensures consistent and repeatable infrastructure deployment.

- **AWS Snowball** transfers large amounts of data offline.
  It is useful when network transfer is slow or expensive.

---

### 📦 APPLICATION INTEGRATION

- **Amazon SQS** enables message queuing between applications.
  It decouples components and improves system reliability.

- **Amazon SNS** uses a publish-subscribe model.
  Messages can be sent to multiple endpoints simultaneously.

- **AWS Step Functions** coordinates multi-step workflows.
  It simplifies complex application logic and error handling.

---

### 📊 ANALYTICS (FOUNDATION LEVEL)

- **Amazon Athena** queries data stored in S3 using SQL.
  It is serverless and requires no infrastructure management.

- **Amazon Redshift** is a data warehouse service.
  It processes large analytical workloads efficiently.

- **AWS Glue** prepares and transforms data automatically.
  It is commonly used for ETL and analytics pipelines.

---

### 🤖 AI & MACHINE LEARNING (AWARENESS)

- **Amazon Rekognition** analyzes images and videos.
  It can detect objects, faces, and text automatically.

- **Amazon Polly** converts written text into speech.
  It supports multiple languages and lifelike voices.

- **Amazon SageMaker** builds and trains ML models.
  Cloud Practitioner knowledge is mostly conceptual.

---

- **User → Route 53 → DNS → Shield → WAF**
  User traffic is routed using DNS, protected from DDoS attacks, and filtered by web application rules.

- **Regions → Availability Zones → CloudFront → Edge Locations**
  Requests are served globally with low latency using edge caching before reaching core infrastructure.

- **VPC → Subnets → Internet Gateway / NAT Gateway**
  Traffic enters isolated virtual networks with controlled public and private access.

- **ELB → Auto Scaling → EC2 Instances**
  Load balancers distribute traffic while Auto Scaling adjusts compute capacity automatically.

- **S3 → S3 Glacier → RDS → Aurora → DynamoDB**
  Data flows between object storage, archival storage, relational databases, and NoSQL databases.

- **IAM → CloudWatch → CloudTrail → Trusted Advisor → Cost Explorer**
  Access control, monitoring, auditing, best-practice checks, and cost analysis work together.

- **Hybrid & Integration Layer**
  On-Premises ↔ Snowball / Snowmobile (data transfer),
  AppSync / API Gateway (APIs),
  SQS / SNS (messaging),
  Athena / Redshift (analytics).
