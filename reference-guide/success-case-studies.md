## Enterprise-scale Kubernetes architectures (2024–2025)

---

## 🏢 Enterprise / Large Tech Kubernetes Architecture Case Studies (2024–2025)

### **1. Uber**

Uber has publicly documented a major migration and redesign of its compute platform onto Kubernetes. ([Uber][1])

**Architecture Highlights:**

* **Massive Cluster Scale:** Uber runs very large Kubernetes clusters — each with **5,000–7,500 nodes**. ([Uber][1])
* **High Pod Churn:** They're scheduling **~120–130 pods/sec** in a single large cluster. ([Uber][1])
* **Federated Control Plane / Abstraction:**

  * They built a global “Up” layer / service-federation abstraction so that developers don’t need to know (or care) which cluster their service lands on. ([Uber][1])
  * This “Up” abstraction allows new Kubernetes capacity to be added beside Mesos, while traffic is rebalanced from Mesos to Kubernetes transparently. ([Uber][1])
* **Custom Components:**

  * **Artifact uploader**: Because on Mesos developers had access to container crash artifacts, they built a sidecar + uploader daemon to persist logs, heap dumps, etc., on exit. ([Uber][1])
  * **API-driven job CRD**: For their ML / batch jobs, they introduced custom CRDs and a job controller to schedule and monitor jobs. ([Uber][2])
* **Resource Pools & Scheduling:**

  * They maintain a *federated resource view* of clusters (across zones), tracking resource pools per cluster. ([Uber][2])
  * Their scheduler uses filtering + scoring plugins: first filter by resource affinities (e.g. GPU requirements), then score remaining pools by load / availability. ([Uber][2])
* **Organization-Aware Scheduling:**

  * Uber uses an internal asset-management service (“uOwn”) to map teams/projects to resource pools — so job placement respects team ownership and cost/showback. ([Uber][2])
* **Interactive Workloads (Data Science / Notebooks):**

  * They migrated their “Data Science Workbench” (DSW), which runs Jupyter / RStudio sessions, from Mesos to Kubernetes. ([Uber][3])
  * They treat interactive sessions as Jobs, but tune them so they remain long-lived, even though standard Kubernetes Jobs are designed for finite-run tasks. ([Uber][3])
  * For file persistence across sessions, they integrated NFS mounts for user sessions. ([Uber][3])
* **Multi-Cloud & On-Prem Support:**

  * Their Kubernetes clusters span on-prem data centers and cloud (Uber mentions Oracle Cloud + Google Cloud). ([Uber][1])
* **Secrets Management:**

  * They built a multi-cloud secrets platform to support their container workloads. ([Uber][4])

**Why This Architecture Matters:**

* Demonstrates how to migrate from legacy orchestration (Mesos) to K8s at *very large scale*.
* Abstracts infra complexity away from developers via a federation layer (“Up”).
* Handles both **stateless**, **batch**, and **interactive workloads** in a unified Kubernetes platform.
* Maintains control over resource ownership and cost through organizational mapping.

---

### **2. LinkedIn**

LinkedIn presented a very interesting case at **KubeCon Europe 2025**: *“From Metal to Apps: LinkedIn’s Kubernetes-based Compute Platform”*. ([Speaker Deck][5])

**Architecture Highlights:**

* **Bare-metal + Kubernetes:** Their compute platform runs on bare-metal servers, not just cloud — they manage their own data centers and run Kubernetes on those physical machines. ([Speaker Deck][5])
* **API-Driven Compute Stack:** They provide an API / platform layer on top of Kubernetes, so teams (microservices, ML, batch) don’t interact directly with raw node management. ([Speaker Deck][5])
* **Multi-Workload Support:**

  * Thousands of microservices. ([Speaker Deck][5])
  * Large-scale stateful services: they built a *stateful scheduler* (custom) for workloads that require persistent storage. ([Speaker Deck][5])
  * Machine Learning / Batch: they operate a **multi-tenant ML / batch job platform** on top of Kubernetes. ([Speaker Deck][5])
* **GPU / AI Workloads:** They manage a GPU fleet for ML workloads, integrated into their compute platform. ([Speaker Deck][5])
* **Tenant Isolation & Resilience:** They emphasize *tenant isolation*, so different teams working on microservices, AI, or stateful systems don’t interfere, while keeping resilience and upgradeability. ([Speaker Deck][5])
* **Cluster and Node Lifecycle Management:** They handle maintenance of bare-metal nodes via Kubernetes, including draining, rebooting, replacing nodes, all without downtime to the platform. ([Speaker Deck][5])

**Why This Architecture Matters:**

* Shows how Kubernetes can be the *foundational compute primitive* even in a company owning its own data center hardware.
* Supports very diverse workloads (stateless, ML, stateful) from a unified platform.
* Exposes a clean abstraction to developers via API + CRDs, insulating them from infra complexity.
* Provides strong isolation and resource governance across teams.

---

### **3. Microsoft / Azure (AKS Innovations)**

Recent architecture decisions and features from Microsoft (and AKS) give insight into how they are architecting for enterprise + AI workloads. ([opensource.microsoft.com][6])

**Architecture Highlights & Trends:**

* **AI / ML Workload Focus:** Microsoft is pushing Kubernetes (AKS) for AI workloads: they've talked about **distributed inference**, multi-node LLM serving, and integration with GPU and AI infra. ([opensource.microsoft.com][6])
* **Kubernetes AI Conformance Program:** Microsoft is contributing to a conformance program to ensure **interoperability and portability** of AI workloads across Kubernetes platforms. ([opensource.microsoft.com][6])
* **Node Lifecycle Improvements:** In Kubernetes v1.34, Microsoft is emphasizing better node lifecycle features (e.g., separating node provisioning from eviction) to improve stability and autoscaling. ([LinkedIn][7])
* **Fleet Manager / Namespace Management:** AKS’s “Managed Namespaces” helps platform teams enforce resource quotas, RBAC, and policies across clusters at scale. ([opensource.microsoft.com][6])
* **Security & Immutable Infrastructure:**

  * Using **immutable OS images** for nodes to reduce drift. ([opensource.microsoft.com][6])
  * Enhancing host-level security (e.g., trusted launch, integrity verification). ([opensource.microsoft.com][6])
* **Model Serving & Inference:** They’re building a component called **Kubernetes AI Toolchain Operator (KAITO)**, which supports multi-node inference (for LLMs) and integrates with the Gateway API for inference workloads. ([opensource.microsoft.com][6])

**Why This Architecture Matters:**

* Demonstrates how a **public cloud provider** is evolving Kubernetes for AI-native enterprise workloads.
* Shows a clear path to unify **AI/ML compute** and **general container workloads** under AKS.
* Introduces strong governance features (namespace-level quotas, RBAC) to handle enterprise multi-tenant use.
* Highlights a platform engineering mindset: making Kubernetes consumable while enforcing best practices.

---

## 🔭 Key Architectural Trends from These Enterprise Examples

* **Unification of Compute Platform**: Big companies (Uber, LinkedIn) are using Kubernetes as a *single control plane* for stateless services, batch / ML workloads, and even interactive dev sessions.
* **Custom CRDs / Controllers**: Enterprises are building their own layers on top of Kubernetes (e.g., job CRDs, scheduler plugins) to adapt it to their internal workflows.
* **Scale & Performance Tuning**: At very large scale, tuning is required (API-server QPS, scheduler parallelism, controller settings) — especially in clusters with thousands of nodes.
* **Tenant Isolation + Governance**: Multi-tenant architecture is common: platform teams enforce isolation, resource quotas, and policies across different teams.
* **Lifecycle Management**: Node lifecycle (upgrade, replacement) is managed at scale; and in some cases, infrastructure is immutable.
* **AI / ML as First-Class Workloads**: Kubernetes is increasingly used for AI: distributed inference, training, job orchestration, GPU fleet — not just web services.

---

[1]: https://www.uber.com/en-GB/blog/migrating-ubers-compute-platform-to-kubernetes-a-technical-journey/?utm_source=chatgpt.com "Migrating Uber's Compute Platform to Kubernetes"
[2]: https://www.uber.com/en-GB/blog/ubers-journey-to-ray-on-kubernetes-ray-setup/?utm_source=chatgpt.com "Uber's Journey to Ray on Kubernetes: Ray Setup"
[3]: https://www.uber.com/en-GB/blog/migrating-large-scale-compute-workloads-to-kubernetes/?utm_source=chatgpt.com "Migrating Large-Scale Interactive Compute Workloads to ..."
[4]: https://www.uber.com/en-GB/blog/building-ubers-multi-cloud-secrets-management-platform/?utm_source=chatgpt.com "Building Uber's Multi-Cloud Secrets Management Platform ..."
[5]: https://speakerdeck.com/alp/from-metal-to-apps-linkedins-kubernetes-based-compute-platform?utm_source=chatgpt.com "From Metal To Apps: LinkedIn's Kubernetes-based ..."
[6]: https://opensource.microsoft.com/blog/2025/11/10/whats-new-with-microsoft-in-open-source-and-kubernetes-at-kubecon-north-america-2025?utm_source=chatgpt.com "What's new with Microsoft in open-source and Kubernetes ..."
[7]: https://www.linkedin.com/posts/joachimehillgrannec_when-is-kubernetes-actually-worth-it-it-activity-7373341094186729472-tyAQ?utm_source=chatgpt.com "A Guide | Joachim Hill-Grannec posted on the topic"

