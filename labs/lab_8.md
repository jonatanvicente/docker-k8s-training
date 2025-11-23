# 🧪 Module 8 Lab: 


**Goal**: To define the right CI/CD pipelines

---

### 🧩 Building a CI/CD pipeline

Detail all the steps required in a CI/CD pipeline.


<details>
  <summary>Solution:</summary>

**Steps:**

1. **Source Control & Trigger**
  - Version control (Git, etc.)
  - Trigger pipeline on commit, PR, or manual/scheduled triggers.

2. **Build & Package**
  - Fetch code from repo.
  - Install dependencies.
  - Compile/build code.
  - Static code analysis / linting.
  - Unit tests.
  - Build Docker image:
    - Use Dockerfile to create a container image.
    - Tag image with branch/version (e.g., myapp:1.2.3 or myapp:feature-branch).
    - Push Docker image to a container registry (DockerHub, Harbor, ECR, etc.).

3. **Automated Testing**
  - Integration, functional, and possibly performance/security testing.
    - Optional: spin up Docker containers for test environment.
  - Fail pipeline if tests do not pass.

4. **Deployment Preparation**
  - Define Kubernetes manifests:
    - Deployment, Service, ConfigMap, Secret, Ingress.
    - Use Helm, Kustomize, or plain YAML.
  - Apply environment-specific configurations.
  - Optionally, tag release version for traceability.

5. **Kubernetes Deployment (Continuous Delivery/Deployment)**
  - Deploy Docker images to Kubernetes cluster:
  - Apply manifests via kubectl apply, Helm chart, or CI/CD tool integration.
  - Staging environment first:
    - Smoke tests, automated checks.
    - Production deployment:
    - Rolling updates, Blue/Green, or Canary deployments.
  - Monitor pods, services, and workloads for success.
  - Rollback if health checks fail.

6. **Post-deployment Monitoring & Feedback**
  - Logs, metrics, and alerting.
  - Automated health checks or synthetic transactions.
  - Feedback into development for bug fixes or optimizations.

7. **Pipeline Optimization**
  - Cache dependencies and Docker layers for faster builds.
  - Run jobs in parallel where possible.
  - Maintain pipeline scripts and documentation.

💡 **Key Notes on Docker & Kubernetes Integration**
  - Every commit can produce a Docker image automatically.
  - Kubernetes manifests should reference Docker image tags for reproducible deployments.
  - CI/CD tools (Jenkins, GitLab CI, GitHub Actions, ArgoCD, etc.) can integrate directly with both Docker registry and Kubernetes cluster.

  </details>


### 🧩 ArgoCD: Automatic deployments to the cluster

1. **Install ArgoCD**

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

2. **Expose the ArgoCD server**

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```
Now you can access the web interface at [https://localhost:8080](https://localhost:8080).

3. **Get the initial password**

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
```

4. **Create a simple Git repository**. It can be a public repository with an example deployment and service, for instance, an nginx

5. **Create the ArgoCD application**

From the ArgoCD web interface:

* **New App**
* **App name:** nginx-demo
* **Project:** default
* **Repository URL:** your Git repo URL
* **Path:** folder where the manifests are located (use `.` if they are in the root)
* **Cluster:** your current cluster
* **Namespace:** default
Click **Create** and then **Sync**.

From the CLI:

```bash
argocd app create nginx-demo \
  --repo https://github.com/argoproj/argocd-example-apps.git \
  --path local-app \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace default

```

6. **Test changes**

```bash
kubectl get pods
kubectl get svc
```
- Modify the deployment (for example, change replicas from 1 → 2) and commit.
- In the ArgoCD interface, you will see it detects the change and allows you to synchronize it.
