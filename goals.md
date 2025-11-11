
## ✨ Module 1. Containers Essentials (2,5 hours)

🧪 **Goal:** Understand what containers are, how Docker works, and their role in modern DevOps.

- **Containerization Basics**
  - Difference between virtualization and containerization
  - Benefits of containers: portability, efficiency, consistency
- **Docker Overview**
  - Docker Engine, Docker CLI, Docker Hub
  - Docker architecture: client–server model, images, containers
- **Main Components**
  - Images vs Containers
  - Docker Daemon, Registry, and CLI
- **Basic Commands**
  - `docker run`, `docker ps`, `docker stop`, `docker rm`, `docker images`
- **Lifecycle of a Container**
  - Creation → Execution → Stopping → Removal
- **Hands-on Concepts**
  - Running first container (`hello-world`, `nginx`)
  - Inspecting container logs and details

---

## ✨ Module 2. Using Docker: Images, Volumes, Networks (2.5 hours)

🧪 **Goal:** Learn to build, persist, and connect containers effectively.

- **Docker Images**
  - Base vs custom images
  - `Dockerfile` syntax and best practices
  - Layers and caching in builds
  - Using `docker build`, `docker tag`, `docker push`
- **Volumes (Persistence)**
  - Data persistence vs ephemeral storage
  - Volume types: named, anonymous, bind mounts
  - Sharing data between containers
- **Docker Networks**
  - Bridge, host, none networks
  - User-defined networks
  - Container communication and DNS resolution
- **Multi-container Basics**
  - Linking containers manually
  - Environment variables and configuration

---

## ✨ Module 3. Orchestration with Kubernetes (5.0 hours)

🧪 **Goal:** Manage containerized applications at scale using Kubernetes.

- **Introduction to Kubernetes**
  - Motivation for orchestration
  - Key features: scaling, load balancing, self-healing
- **Kubernetes Architecture**
  - Control Plane components: API Server, Scheduler, Controller Manager, etcd
  - Node components: kubelet, kube-proxy, container runtime
- **Core Kubernetes Objects**
  - Pods, ReplicaSets, Deployments
  - Services (ClusterIP, NodePort, LoadBalancer)
  - ConfigMaps, Secrets
- **Managing Applications**
  - Declarative YAML manifests
  - `kubectl` essentials
  - Scaling and rolling updates
- **Workload Management**
  - Namespaces and resource isolation
  - Probes (liveness, readiness)
  - Labels, selectors, annotations

---

## ✨ Module 4. Security and Best Practices (5.0 hours)

🧪 **Goal:** Secure Docker and Kubernetes environments through hardening and governance.

- **Docker Security**
  - Image signing and verification
  - Least-privilege containers and rootless mode
  - Managing secrets safely
  - Reducing attack surface (multi-stage builds, minimal base images)
- **Kubernetes Security**
  - Role-Based Access Control (RBAC)
  - Network Policies
  - Secrets management
  - Pod Security Standards (PSS)
  - Admission controllers and policies (OPA/Gatekeeper)
- **Best Practices**
  - Scanning images (Trivy, Clair)
  - Managing vulnerabilities and updates
  - Immutable infrastructure approach
  - Resource limits and quotas

---

## ✨ Module 5. Architecture and Configuration Management in Docker and Kubernetes (5.0 hours)

🧪 **Goal:** Learn how containers fit into modern architectures and how configuration is handled declaratively.

- **Containerized Architecture Patterns**
  - Microservices vs monolith
  - 12-Factor App principles
  - Sidecar and ambassador patterns
- **Configuration Management**
  - Environment variables and files
  - ConfigMaps and Secrets in Kubernetes
  - Injection patterns
- **Service Discovery**
  - Kubernetes DNS, service endpoints
  - External service integration
- **Infrastructure as Code**
  - Managing Docker/Kubernetes with IaC tools (Terraform, Ansible)
  - Declarative vs imperative configuration
- **Workshop Review**
  - Deploying a small multi-container architecture

---

## ✨ Module 6. Services and Networking in Containers and Kubernetes: Ingress (5.0 hours)

🧪 **Goal:**-* Deep dive into container networking and Kubernetes ingress mechanisms.

- **Container Networking Model (CNM)**
  - Docker network drivers
  - Overlay vs bridge
- **Kubernetes Networking**
  - Cluster networking model (flat, pod-to-pod)
  - CNI plugins (Flannel, Calico, Cilium)
- **Services in Detail**
  - ClusterIP, NodePort, LoadBalancer types
  - Headless services and DNS
- **Ingress**
  - Concept and role
  - Ingress controllers (NGINX, Traefik)
  - Routing rules, TLS, annotations
  - Ingress vs Service vs Gateway API

---

## ✨ Module 7. Main Platforms and Ecosystems in Kubernetes and Containers: OpenShift, Docker Compose, etc. (5.0 hours)

🧪 **Goal:**-* Explore the broader ecosystem beyond Docker and Kubernetes.

- **Ecosystem Overview**
  - CNCF Landscape
  - OCI standards
- **Platforms**
  - OpenShift, Rancher, Docker Swarm
  - Docker Compose vs Kubernetes
- **Cloud Kubernetes Services**
  - EKS (AWS), AKS (Azure), GKE (Google Cloud)
- **Container Registries**
  - Docker Hub, Harbor, GitHub Packages
  - Image lifecycle and automation
- **Complementary Tools**
  - Helm charts and templating
  - Kustomize, Skaffold, Tilt

---

## ✨ Module 8. CI/CD with Docker: Build and Deployment Pipelines (5.0 hours)

🧪 **Goal:** Integrate Docker into continuous integration and deployment workflows.

- **Docker in CI/CD**
  - Building reproducible images
  - Using Docker in Jenkins, GitHub Actions, GitLab CI
- **Pipelines**
  - Build → Test → Scan → Push → Deploy
  - Example pipeline structure (with YAML)
- **Kubernetes Deployment Automation**
  - kubectl apply, Helm install, ArgoCD, FluxCD
- **Versioning and Rollbacks**
  - Image tagging strategies
  - Blue-green and canary deployments
- **Best Practices**
  - Secrets in CI/CD
  - Reusable pipeline templates

---

## ✨ Module 9. Monitoring and Logging of Containers (5.0 hours)

🧪 **Goal:** Learn to monitor, log, and trace containerized workloads.

- **Monitoring Basics**
  - Metrics types: resource, application, cluster
  - cAdvisor, Node Exporter
- **Prometheus Stack**
  - Prometheus, Alertmanager, Grafana overview
  - Key metrics for Docker/Kubernetes
- **Logging**
  - Docker logging drivers
  - Centralized logging with Fluentd / Loki / ELK
  - Log aggregation and retention
- **Tracing**
  - OpenTelemetry and Jaeger basics
- **Best Practices**
  - Metrics-driven alerting
  - Log structure and labeling

