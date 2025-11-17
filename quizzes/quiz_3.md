# 🧠 Module 3 Quiz: Orchestration with Kubernetes

**Goal:** Assess understanding of Kubernetes architecture, core objects, and workload management.

---

**1. What is the main motivation for using Kubernetes?**  
a) To run a single container on a laptop  
b) To automate deployment, scaling, and management of containerized applications  
c) To replace Docker entirely  
d) To manage only virtual machines  

<details>
  <summary>Solution</summary>
- b
</details>

---

**2. Which Kubernetes feature allows an application to automatically recover from failures?**  
a) Load balancing  
b) Self-healing  
c) Namespaces  
d) Templating  

<details>
  <summary>Solution</summary>
- b
</details>

---

**3. Which component is NOT part of the Kubernetes control plane?**  
a) API Server  
b) kubelet  
c) Scheduler  
d) Controller Manager  

<details>
  <summary>Solution</summary>
- b
</details>

---

**4. What is the smallest deployable unit in Kubernetes?**  
a) Node  
b) Deployment  
c) Pod  
d) ReplicaSet  

<details>
  <summary>Solution</summary>
- c
</details>

---

**5. Which service type exposes a Kubernetes application externally via a cloud provider’s load balancer?**  
a) ClusterIP  
b) NodePort  
c) LoadBalancer  
d) HostPort  

<details>
  <summary>Solution</summary>
- c
</details>

---

**6. What is the primary purpose of a ConfigMap?**  
a) Store sensitive data like passwords  
b) Store non-sensitive configuration data for pods  
c) Schedule pods across nodes  
d) Manage network rules  

<details>
  <summary>Solution</summary>
- b
</details>

---

**7. How do you update a deployment with zero downtime in Kubernetes?**  
a) Delete the pods manually  
b) Use rolling updates with a Deployment object  
c) Recreate the cluster  
d) Use `kubectl exec`  

<details>
  <summary>Solution</summary>
- b
</details>

---

**8. What is the function of a readiness probe?**  
a) Check if a container is alive; restart if not  
b) Check if a container is ready to serve traffic  
c) Delete unhealthy pods automatically  
d) Monitor network latency  

<details>
  <summary>Solution</summary>
- b
</details>

---

**9. Which Kubernetes object is used to select a group of pods based on labels?**  
a) Secret  
b) Annotation  
c) Selector  
d) Node  

<details>
  <summary>Solution</summary>
- c
</details>

---

**10. What is the purpose of namespaces in Kubernetes?**  
a) Store container logs  
b) Isolate resources and workloads for multi-team environments  
c) Replace ReplicaSets  
d) Automatically scale pods  

<details>
  <summary>Solution</summary>
- b
</details>

---
