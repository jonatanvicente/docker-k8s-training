# 🧠 Module 5 Quiz: Architecture and Configuration Management in Docker and Kubernetes

---

**1. What is one of the main advantages of a microservices architecture over a monolith?**  
a) Easier to deploy a single unit  
b) Independent scaling and development of services  
c) Fewer network connections  
d) All code runs in the same process  

<details>
  <summary>Solution</summary>
- b) Independent scaling and development of services
</details>

---

**2. Which principle is part of the 12-Factor App methodology?**  
a) Store configuration files in the repository  
b) Hardcode credentials into the app  
c) Store configuration in environment variables  
d) Use the same database for all environments  

<details>
  <summary>Solution</summary>
- c) Store configuration in environment variables
</details>

---

**3. In a containerized architecture, what is the role of a sidecar container?**  
a) Acts as a backup for failed containers  
b) Manages storage volumes  
c) Runs administrative scripts on the host  
d) Extends the functionality of the main container  

<details>
  <summary>Solution</summary>
- d) Extends the functionality of the main container
</details>

---

**4. What Kubernetes resource is used to store non-sensitive configuration data?**  
a) ConfigMap  
b) Secret  
c) PersistentVolume  
d) StatefulSet  

<details>
  <summary>Solution</summary>
- a) ConfigMap
</details>

---

**5. Which is an example of an injection pattern for configuration in containers?**  
a) Mounting a ConfigMap as a file inside the container  
b) Editing the container image  
c) Using `kubectl exec` to modify environment variables  
d) Copying configs manually into `/etc`  

<details>
  <summary>Solution</summary>
- a) Mounting a ConfigMap as a file inside the container
</details>

---

**6. How does Kubernetes perform service discovery inside the cluster?**  
a) Through hostnames managed by Docker  
b) Using static IP addresses for pods  
c) Via internal DNS and service endpoints  
d) By reading configuration files in each pod  

<details>
  <summary>Solution</summary>
- c) Via internal DNS and service endpoints
</details>

---

**7. What is the main goal of Infrastructure as Code (IaC)?**  
a) Store all application logs in YAML  
b) Manage infrastructure manually  
c) Automate and version-control infrastructure provisioning  
d) Replace Kubernetes YAML manifests with shell scripts  

<details>
  <summary>Solution</summary>
- c) Automate and version-control infrastructure provisioning
</details>

---

**8. Which tool is commonly used for managing Kubernetes infrastructure declaratively?**  
a) Ansible  
b) Jenkins  
c) Helm  
d) Terraform  

<details>
  <summary>Solution</summary>
- d) Terraform
</details>

---

**9. What is the main difference between declarative and imperative configuration?**  
a) Declarative describes *how* to do it; imperative describes *what* to do  
b) Declarative describes *what* you want; imperative describes *how* to do it  
c) Both mean the same in Kubernetes  
d) Imperative is used only in CI/CD pipelines  

<details>
  <summary>Solution</summary>
- b) Declarative describes *what* you want; imperative describes *how* to do it
</details>

---

**10. What is typically done in a workshop review at the end of this module?**  
a) Deploying and testing a small multi-container architecture  
b) Reviewing theoretical concepts only  
c) Writing documentation for all containers  
d) Installing Kubernetes from scratch  

<details>
  <summary>Solution</summary>
- a) Deploying and testing a small multi-container architecture
</details>


