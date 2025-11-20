# 🧠 Module 6 Quiz: Services and Networking in Containers and Kubernetes

---

**1. Which Docker network driver allows a container to share the host network namespace?**  
a) bridge  
b) none  
c) host  
d) overlay  

<details>
  <summary>Solution</summary>
- c) host
</details>

---

**2. What is the main difference between a bridge and an overlay network in Docker?**  
a) Bridge connects containers across hosts; overlay connects containers on a single host  
b) Bridge connects containers on a single host; overlay connects containers across multiple hosts  
c) Both connect containers only on a single host  
d) Overlay is for host networking only  

<details>
  <summary>Solution</summary>
- b) Bridge connects containers on a single host; overlay connects containers across multiple hosts
</details>

---

**3. In Kubernetes, what is the purpose of the cluster networking model?**  
a) Assign a shared IP to all pods  
b) Assign static IPs manually for each pod  
c) Disable pod-to-pod communication  
d) Ensure all pods can communicate directly without NAT  

<details>
  <summary>Solution</summary>
- d) Ensure all pods can communicate directly without NAT
</details>

---

**4. Which of the following is a Kubernetes CNI plugin for advanced networking and policy enforcement?**  
a) Flannel  
b) Docker bridge  
c) Calico  
d) NGINX  

<details>
  <summary>Solution</summary>
- c) Calico
</details>

---

**5. What type of Kubernetes Service exposes an application only inside the cluster?**  
a) NodePort  
b) ClusterIP  
c) LoadBalancer  
d) ExternalName  

<details>
  <summary>Solution</summary>
- b) ClusterIP
</details>

---

**6. What is a headless service used for in Kubernetes?**  
a) To expose services externally via a cloud load balancer  
b) To provide a static IP to all pods  
c) To allow direct pod-to-pod communication without a ClusterIP  
d) To replace an Ingress controller  

<details>
  <summary>Solution</summary>
- c) To allow direct pod-to-pod communication without a ClusterIP
</details>

---

**7. What is the main role of an Ingress in Kubernetes?**  
a) Provide internal DNS for pods  
b) Scale pods automatically  
c) Persist data in volumes  
d) Manage external HTTP/HTTPS access to services  

<details>
  <summary>Solution</summary>
- d) Manage external HTTP/HTTPS access to services
</details>

---

**8. Which of the following is an example of an Ingress controller?**  
a) Docker Swarm  
b) NGINX  
c) Flannel  
d) ClusterIP  

<details>
  <summary>Solution</summary>
- b) NGINX
</details>

---

**9. What is one key advantage of using annotations in an Ingress resource?**  
a) Enable custom behavior like rewrites or rate limiting  
b) Define pod CPU limits  
c) Assign static IPs to pods  
d) Replace ConfigMaps  

<details>
  <summary>Solution</summary>
- a) Enable custom behavior like rewrites or rate limiting
</details>

---

**10. How does the Gateway API differ from a traditional Ingress?**  
a) It is used only for NodePort services  
b) It replaces ClusterIP services entirely  
c) It provides more flexible traffic routing, including L4-L7, beyond HTTP  
d) It only supports single-host networking  

<details>
  <summary>Solution</summary>
- c) It provides more flexible traffic routing, including L4-L7, beyond HTTP
</details>
