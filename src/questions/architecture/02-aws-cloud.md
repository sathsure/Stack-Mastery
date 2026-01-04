### ☁️ WHAT IS AWS CLOUD COMPUTING

![Image](https://miro.medium.com/1%2A7V_TnalAMFoQS1TfXTbqxA.png)

![Image](https://ars.els-cdn.com/content/image/1-s2.0-S1084804519303662-gr2.jpg)

- AWS provides computing services like servers, storage, databases, and networking over the internet.
  These resources are available instantly without owning or maintaining physical hardware.

- Cloud resources are provisioned on demand and released when no longer needed.
  This allows faster innovation and eliminates long infrastructure planning cycles.

- AWS follows a pay-as-you-go pricing model.
  Customers pay only for the resources they consume, improving cost efficiency.

---

### 🌍 AWS GLOBAL INFRASTRUCTURE

![Image](https://res.cloudinary.com/hy4kyit2a/f_auto%2Cfl_lossy%2Cq_70/learn/modules/aws-cloud/explore-the-aws-global-infrastructure/images/c72a7ac57ffc2469619e66dc74dfea24_kix.q8rtdmc6bgiq.png)

![Image](https://docs.aws.amazon.com/images/AWSEC2/latest/UserGuide/images/region-with-wavelength-zones.png)

- **Regions** are geographically separate locations that contain AWS data centers.
  Each Region is isolated to ensure fault tolerance and regulatory compliance.

- **Availability Zones (AZs)** are physically separate data centers within a Region.
  Running applications across multiple AZs increases availability and reliability.

- **Edge Locations** cache content closer to users.
  This reduces latency and improves performance for global applications.

---

### 💻 COMPUTE SERVICES

![Image](https://d2908q01vomqb2.cloudfront.net/fc074d501302eb2b93e2554793fcaf50b3bf7291/2021/11/02/Fig1-app2cont.png)

![Image](https://cdn.prod.website-files.com/6340354625974824cde2e195/65f0dd2ea5d885014b1a6840_GIF1.gif)

![Image](https://docs.aws.amazon.com/images/elasticloadbalancing/latest/userguide/images/cross_zone_load_balancing_enabled.png)

- **Amazon EC2** provides virtual machines where customers control the operating system.
  It supports flexible instance sizes and is suitable for most compute workloads.

- **AWS Lambda** runs code automatically in response to events.
  There are no servers to manage, and billing is based on execution time only.

- **Elastic Load Balancing** distributes incoming traffic across multiple resources.
  This ensures high availability and prevents any single resource from overloading.

---

### 🗄️ STORAGE SERVICES

![Image](https://www.cloudkeeper.com/cms-assets/s3fs-public/2023-07/diagram%203.png)

![Image](https://docs.aws.amazon.com/images/ebs/latest/userguide/images/volume-lifecycle.png)

![Image](https://docs.aws.amazon.com/images/efs/latest/ug/images/efs-ec2-how-it-works-Regional_china-world.png)

![Image](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/product-categories/storage/approved/images/9217cf0d435e86882bb9211d9af8eb1e.a9a0c99d2a08a7df38c0d8e0592e04c61a26210e.png)

- **Amazon S3** stores data as objects with extremely high durability.
  It is commonly used for backups, static websites, and data lakes.

- **Amazon EBS** provides block storage for EC2 instances.
  Data persists even when an EC2 instance is stopped or restarted.

- **Amazon S3 Glacier** is designed for long-term archival data.
  It offers very low storage costs with slower retrieval times.

---

### 🧠 DATABASE SERVICES

![Image](https://docs.aws.amazon.com/images/AmazonRDS/latest/UserGuide/images/aws-cloud-deployment-architecture.png)

![Image](https://docs.aws.amazon.com/images/AmazonRDS/latest/AuroraUserGuide/images/aurora_architecture.png)

![Image](https://docs.aws.amazon.com/images/serverless/latest/devguide/images/workshop-m1-infra-complete.png)

- **Amazon RDS** manages relational databases like MySQL and PostgreSQL.
  AWS handles backups, patching, and high availability automatically.

- **Amazon Aurora** is a high-performance relational database.
  It is compatible with MySQL and PostgreSQL and offers better scalability.

- **Amazon DynamoDB** is a serverless NoSQL database.
  It automatically scales and delivers single-digit millisecond performance.

---

### 🌐 NETWORKING & CONTENT DELIVERY

![Image](https://docs.aws.amazon.com/images/vpc/latest/userguide/images/how-it-works.png)

![Image](https://docs.aws.amazon.com/images/AmazonCloudFront/latest/DeveloperGuide/images/how-you-configure-cf.png)

![Image](https://docs.aws.amazon.com/images/Route53/latest/DeveloperGuide/images/how-route-53-routes-traffic.png)

- **Amazon VPC** allows customers to create isolated virtual networks.
  Users control IP ranges, subnets, routing, and security settings.

- **Amazon CloudFront** is a content delivery network (CDN).
  It caches content globally to deliver data faster to users.

- **Amazon Route 53** is a scalable Domain Name System (DNS) service.
  It routes user traffic based on latency, health checks, and policies.

---

### 🔐 SECURITY, IDENTITY & COMPLIANCE

![Image](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/product-categories/security-identity-compliance/compliance/approved/images/7a404923-5572-409c-b30e-6d44706bcd89.094727e5c591e9a96edf10578d0bc1172d9e4553.jpeg)

![Image](https://docs.aws.amazon.com/images/IAM/latest/UserGuide/images/policies-aws-managed-policies.diagram.png)

![Image](https://d1tcczg8b21j1t.cloudfront.net/strapi-assets/14_AWS_shield_2_73de4f1d16.png)

- **AWS IAM** controls access to AWS services and resources.
  Users, roles, and policies define what actions are allowed.

- AWS follows the **Shared Responsibility Model**.
  AWS secures the infrastructure, while customers secure data and access.

- **AWS Shield** and **AWS WAF** protect applications from attacks.
  They defend against DDoS and malicious web traffic.

---

### 🛠️ MANAGEMENT & MONITORING

![Image](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2022/06/09/EBS-Free-Monitoring-Console.png)

![Image](https://d2908q01vomqb2.cloudfront.net/22d200f8670dbdb3e253a90eee5098477c95c23d/2021/11/16/CloudTrail-unexpected-behaviors-1.jpg)

![Image](https://docs.aws.amazon.com/images/awssupport/latest/user/images/ta_recs_updated.png)

- **Amazon CloudWatch** monitors resource performance and logs.
  It provides metrics, alarms, and dashboards for operational visibility.

- **AWS CloudTrail** records all API activity in an AWS account.
  This helps with auditing, compliance, and security investigations.

- **AWS Trusted Advisor** analyzes the AWS environment.
  It provides recommendations for cost, security, and performance.

---

### 💰 PRICING & COST MANAGEMENT

![Image](https://miro.medium.com/0%2Aeeg5qtvxRnrq4voQ)

![Image](https://d1.awsstatic.com/AWSCostManagement/aws-cost-explorer-amazon-ec2-instance-costs.0cc44d7944b0b240011917d5c8e83885c3ba5303.png)

![Image](https://ecstech.com/wp-content/uploads/2020/02/Blog-AWS-Savings-plan-chart-01.png)

- AWS pricing is based on **pay-as-you-go** usage.
  There are no upfront costs or long-term contracts required.

- **AWS Free Tier** allows limited usage for learning and testing.
  It is ideal for beginners and new AWS accounts.

- **Savings Plans and Reserved Instances** reduce costs.
  They offer discounts in exchange for long-term usage commitments.

---

### 🚀 DEPLOYMENT & MIGRATION

![Image](https://docs.aws.amazon.com/images/elasticbeanstalk/latest/dg/images/aeb-overview.png)

![Image](https://docs.aws.amazon.com/images/AWSCloudFormation/latest/UserGuide/images/stack_set_conceptual_sv.png)

![Image](https://cdn.inc42.com/wp-content/uploads/2016/12/awsnowball.jpg)

- **AWS Elastic Beanstalk** deploys applications automatically.
  Developers upload code while AWS manages the infrastructure.

- **AWS CloudFormation** uses templates to create resources.
  It ensures consistent and repeatable infrastructure deployment.

- **AWS Snowball** transfers large amounts of data offline.
  It is useful when network transfer is slow or expensive.

---

### 📦 APPLICATION INTEGRATION

![Image](https://d1.awsstatic.com/product-page-diagram_Amazon-SQS%402x.8639596f10bfa6d7cdb2e83df728e789963dcc39.png)

![Image](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2017/11/20/introducing_sns_message_filtering_image_1.png)

![Image](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2021/05/14/03_architecture_diagram.png)

- **Amazon SQS** enables message queuing between applications.
  It decouples components and improves system reliability.

- **Amazon SNS** uses a publish-subscribe model.
  Messages can be sent to multiple endpoints simultaneously.

- **AWS Step Functions** coordinates multi-step workflows.
  It simplifies complex application logic and error handling.

---

### 📊 ANALYTICS (FOUNDATION LEVEL)

![Image](https://d2908q01vomqb2.cloudfront.net/e1822db470e60d090affd0956d743cb0e7cdf113/2019/12/17/Architecture-diagram-for-querying-S3-analytics-with-amazon-Athena-2.png)

![Image](https://d2908q01vomqb2.cloudfront.net/887309d048beef83ad3eabf2a79a64a389ab1c9f/2017/09/15/AWSArchitecture.jpg)

![Image](https://docs.aws.amazon.com/images/glue/latest/dg/images/HowItWorks-overview.png)

- **Amazon Athena** queries data stored in S3 using SQL.
  It is serverless and requires no infrastructure management.

- **Amazon Redshift** is a data warehouse service.
  It processes large analytical workloads efficiently.

- **AWS Glue** prepares and transforms data automatically.
  It is commonly used for ETL and analytics pipelines.

---

### 🤖 AI & MACHINE LEARNING (AWARENESS)

![Image](https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2023/01/17/ml-blog-cm-video-img-1.png)

![Image](https://media.amazonwebservices.com/blog/2016/polly_talk_1.png)

![Image](https://d1.awsstatic.com/SageMaker/4_how_it_works_diagram_jan29-rev%402x.5387bf546e908574c995b3a1bc13709d18b5e81a.png)

- **Amazon Rekognition** analyzes images and videos.
  It can detect objects, faces, and text automatically.

- **Amazon Polly** converts written text into speech.
  It supports multiple languages and lifelike voices.

- **Amazon SageMaker** builds and trains ML models.
  Cloud Practitioner knowledge is mostly conceptual.

---

![Image](https://d2908q01vomqb2.cloudfront.net/fc074d501302eb2b93e2554793fcaf50b3bf7291/2025/04/02/ARCHBLOG-1141-arch-diagr-964x630.png)

![Image](https://k21academy.com/wp-content/uploads/2021/09/AWS-Architecture-HA-1024x496.png)

![Image](https://mycloudwiki.com/wp-content/uploads/2024/06/AWS-global-infra-1.png)

![Image](https://docs.aws.amazon.com/images/solutions/latest/data-transfer-hub/images/guidance-arch.png)

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
