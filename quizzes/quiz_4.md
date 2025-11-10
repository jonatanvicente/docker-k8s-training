# 🧠 Module 4 Quiz: Security and Best Practices

**Goal:** Assess understanding of Docker and Kubernetes security concepts and best practices.

---

**1. What is the main purpose of Docker Content Trust (DCT)?**  
a) To reduce image size  
b) To verify image integrity and authenticity  
c) To encrypt container logs  
d) To improve network performance  

<details>
  <summary>Solution</summary>
- b
</details>

---

**2. Why should containers be run as non-root whenever possible?**  
a) It makes containers start faster  
b) It prevents privilege escalation if the container is compromised  
c) It increases CPU usage but improves network speed  
d) It enables automatic scaling  

<details>
  <summary>Solution</summary>
- b
</details>

---

**3. What is the safest way to manage secrets in Docker containers?**  
a) Store them in environment variables  
b) Embed them directly in the Dockerfile  
c) Use Docker secrets or external secret managers  
d) Encode them with Base64 and store in images  

<details>
  <summary>Solution</summary>
- c
</details>

---

**4. What is the benefit of using multi-stage builds in Docker?**  
a) They allow multiple containers in one image  
b) They reduce image size and remove unnecessary build tools  
c) They enable load balancing automatically  
d) They simplify network configuration  

<details>
  <summary>Solution</summary>
- b
</details>

---

**5. Which Kubernetes component controls who can perform actions in the cluster?**  
a) Admission Controller  
b) RBAC (Role-Based Access Control)  
c) Scheduler  
d) Controller Manager  

<details>
  <summary>Solution</summary>
- b
</details>

---

**6. What is the main purpose of a Kubernetes Network Policy?**  
a) Encrypt pod communication  
b) Define CPU limits per pod  
c) Control which pods and services can communicate  
d) Assign public IPs to services  

<details>
  <summary>Solution</summary>
- c
</details>

---

**7. What is true about Kubernetes Secrets?**  
a) They are encrypted by default in all clusters  
b) They store sensitive data like passwords and tokens  
c) They replace ConfigMaps automatically  
d) They are visible in plain text to all pods  

<details>
  <summary>Solution</summary>
- b
</details>

---

**8. What are Pod Security Standards (PSS) used for?**  
a) To define how many pods can run per node  
b) To enforce cluster-wide security baselines for pods  
c) To control network access between pods  
d) To monitor resource consumption  

<details>
  <summary>Solution</summary>
- b
</details>

---

**9. What is a common tool for scanning Docker images for vulnerabilities?**  
a) Helm  
b) Trivy  
c) Kubectl  
d) Prometheus  

<details>
  <summary>Solution</summary>
- b
</details>

---

**10. What is the main benefit of the immutable infrastructure approach?**  
a) It makes containers editable at runtime  
b) It allows changes directly inside containers  
c) It ensures consistency and eliminates configuration drift  
d) It improves performance of old containers  

<details>
  <summary>Solution</summary>
- c
</details>

---

