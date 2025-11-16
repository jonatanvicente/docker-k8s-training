# 🧠 Module 8 Quiz: CI/CD with Docker: Build and Deployment Pipelines

---

**1. What is one of the main benefits of using Docker in CI/CD pipelines?**  
a) Faster VM provisioning  
b) Reproducible and consistent build environments  
c) Avoiding the need for registries  
d) Running pipelines without YAML  

<details>
  <summary>Solution</summary>
- b) Reproducible and consistent build environments
</details>

---

**2. Which step typically comes first in a CI/CD pipeline?**  
a) Push  
b) Deploy  
c) Build  
d) Scan  

<details>
  <summary>Solution</summary>
- c) Build
</details>

---

**3. Which tool is commonly used to build and deploy images in GitHub Actions?**  
a) Jenkinsfile  
b) Dockerfile  
c) GitHub workflow YAML  
d) Helmfile  

<details>
  <summary>Solution</summary>
- c) GitHub workflow YAML
</details>

---

**4. What is the purpose of the “Scan” stage in a pipeline?**  
a) To check code formatting  
b) To find container image vulnerabilities  
c) To add metadata to images  
d) To deploy applications  

<details>
  <summary>Solution</summary>
- b) To find container image vulnerabilities
</details>

---

**5. Which tool is specifically designed for GitOps-based continuous delivery?**  
a) kubectl  
b) ArgoCD  
c) Docker Swarm  
d) Skaffold  

<details>
  <summary>Solution</summary>
- b) ArgoCD
</details>

---

**6. What is a recommended strategy for tagging Docker images?**  
a) Always use “latest”  
b) Random values  
c) Semantic versioning or commit hashes  
d) Tag every image as “prod”  

<details>
  <summary>Solution</summary>
- c) Semantic versioning or commit hashes
</details>

---

**7. Blue-green deployment means:**  
a) Deploying on two clusters in different clouds  
b) Splitting traffic 50/50 permanently  
c) Maintaining two identical environments to switch traffic instantly  
d) Using different Docker networks  

<details>
  <summary>Solution</summary>
- c) Maintaining two identical environments to switch traffic instantly
</details>

---

**8. What is canary deployment used for?**  
a) Deploying only on staging  
b) Testing new versions with a small percentage of users  
c) Encrypting secrets  
d) Running pipelines without downtime  

<details>
  <summary>Solution</summary>
- b) Testing new versions with a small percentage of users
</details>

---

**9. Where should secrets be stored in CI/CD pipelines?**  
a) In the Dockerfile  
b) In version control  
c) In CI/CD secret storage or vaults  
d) Inside container logs  

<details>
  <summary>Solution</summary>
- c) In CI/CD secret storage or vaults
</details>

---

**10. What is the benefit of using reusable pipeline templates?**  
a) They prevent tests from running  
b) They reduce the number of pipeline stages  
c) They make pipelines consistent and easier to maintain  
d) They remove the need for Docker  

<details>
  <summary>Solution</summary>
- c) They make pipelines consistent and easier to maintain
</details>
