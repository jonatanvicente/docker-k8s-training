# ✨ Module 3 References: Orchestration with Kubernetes


![k8s structure Pattern](../images/k8s_structure.png)


References:

- [kubectl Quick Reference](https://kubernetes.io/docs/reference/kubectl/quick-reference/)
- [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
- [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
- [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- [Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
- [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/)

---

### Tips

_**Pods**_

- A pod cannot update itself. You must either delete and recreate it, or update it through a higher-level object (Deployment or ReplicaSet).
- Do not create pods manually (except for ephemeral or temporary pods). Always create them through higher-level controllers like ReplicaSets or Deployments.
- Never create “flat” PODs **without an owner**. They must be created by higher-level objects (e.g., ReplicaSets).
- If you label a pod without a label, and it matches another label that a ReplicaSet manages, the ReplicaSet will adopt the pod (including it in the requested number of replicas), and this is dangerous.


_**Deployment**_

- Parameters:
	- MaxUnavailable: How many pods you allow to be unavailable. Defines the percentage of pods that can be down while ensuring the rest remain available. Default value = 25%.
	- MaxSearch: How many additional pods can be created above 100% during an update. Defines the scaling capacity while performing an update. Default value = 25%.

_**ReplicaSet**_

- Changes to running ReplicaSets:
	- If you change the YAML file and execute apply, nothing will update automatically. You must delete the pod. Then the ReplicaSet will create pods according to the description in the YAML file.

_**Service**_

- A Service provides a stable IP address that is maintained over time and guaranteed by the cluster. This is not the case with pods, which can die and be replaced by a new pod with a different IP. A Service also has a unique DNS name.
- A Service needs an Endpoint to route traffic to (entrypoint).
	- If no type is specified, it defaults to ClusterIP (a virtual IP not associated with a physical MAC).
- By default, all services have DNS [ServiceName].[NamespaceName].svc.cluster.local

**Service types:**

- **ClusterIP**
	- Default Service type. The IP is only accessible from within the cluster node. Used for internal communication between Services. We **cannot expose** the service externally (you would need to expose a LAN or Wi-Fi IP to access it).
	- It also acts as a **load balancer** between pods, which are managed by a Deployment.
- **NodePort** 
	- **Allows us to expose the Service outside the cluster**. It exposes the service through a port on the node, which has an IP accessible from outside, allowing access to the ClusterIP.
	- It opens a default port range (**30000–32767**), but not beyond the cluster. If not defined, NodePort will choose one automatically.
	- Minikube does not expose NodePorts on your host IP (127.0.0.1) by default, as cloud Kubernetes clusters do.
	- To access the port (from outside of k8s cluster), it is necessary to:
		- **Port-forward:** `kubectl port-forward service/[serviceName] -n [namespace] [clusterPort]:[podPort]`
  		- **Minikube tunnel:** `minikube service [serviceName] -n [namespaceName] --url [url]`. In any case, a NodePort **creates a ClusterIP** internally to communicate with. It does not replace it.
- **LoadBalancer**
	- Creates only **external load balancers** (Kubernetes has no built-in option for this by default).
	- It opens NodePorts on each node so users can access the balancer. When you create a LoadBalancer, you automatically create a NodePort, which in turn creates a ClusterIP.



_**2 containers in one pod?**_

Normally, each Pod runs a single main container, but Kubernetes allows multiple containers per Pod when they need to work tightly together — sharing the same network namespace, storage, and lifecycle. Recommended scenarios for using two (or more) containers per Pod:

- 🧩 1. **Sidecar Pattern** (most common scenario).
	- **Use case**: One container extends or enhances the functionality of the main app container.
	- **Examples**: 
		- A logging or monitoring agent that collects metrics from the main container.
		- A proxy like Envoy or Fluent Bit forwarding traffic or logs.
	- **Benefit**: Keeps responsibilities separated but within the same lifecycle.
- 🛰️ 2. **Ambassador Pattern**
	- **Use case**: One container acts as a proxy or intermediary between the main app and external services.
	- **Examples**:
		- A container proxying database connections or handling network routing.
		- Managing secure connections (TLS termination, API gateway functions).
	- **Benefit**: The main app stays simple while the ambassador container manages external communication.
- 🧰 3. **Adapter Pattern**
	- **Use case**: Transform or normalize data between the main container and external systems.
	- **Examples**:
		- A container adapting metrics formats before sending them to a monitoring system.
		- A log formatter or data converter.
	- **Benefit**: Decouples transformation logic from the main application.
- ⚙️ 4. **Init + Main Containers**
	- **Use case**: You need one container to perform initialization tasks before the main container runs.
	- **Examples**:
		- Downloading configuration files or secrets.
		- Preparing shared volumes with data.
	- **Benefit**: Clean separation between setup logic and runtime logic.
- **📦 5. Shared Volume or Shared Network Scenarios**
	- **Use case**: Containers need to share files or sockets directly.
	- **Examples**:
		- One container writes logs to a shared volume, another processes or ships them.
		- Web server + file sync agent sharing the same directory.
	- **Benefit**: Efficient inter-container communication without external networking.

🚫 **When not to use multiple containers per Pod** 
- When containers are independent and could scale separately.
- When containers don’t need to share storage or network tightly.
- When one container might outlive or restart separately — use separate Pods instead.

---

_**More than one namespace in one context?**_

A context can only have one namespace. A context is just a combination of:
1. cluster
2. user
3.  namespace. The namespace field accepts only one value.

You can have:
- one cluster
- multiple users
- multiple namespaces
- many combinations → each can become its own context

---

_**Port forwarding is only meant for development. What is the recommended approach in production?**_

1. **Use Services**. Kubernetes Services provide stable networking to pods. Depending on your needs:
	- ClusterIP (default) – Only reachable within the cluster (useful for internal communication between services).
	- NodePort – Opens a port on all cluster nodes, so external traffic can reach your app via NodeIP:NodePort.
	- LoadBalancer – If your cluster is in a cloud (AWS, GCP, Azure), this automatically provisions a cloud load balancer. This is the standard for production.
	- ExternalName – Maps a service to an external DNS name.

**Recommendation**: Use LoadBalancer for production external access, or ClusterIP + an Ingress for routing.

2. **Ingress / Ingress Controller**. An Ingress provides HTTP/S routing from outside the cluster to your services, with features like TLS termination, path-based routing, and host-based routing.
	- Works with an Ingress Controller like Nginx, Traefik, or Istio.
	- Lets you manage multiple services under a single IP/domain.
	- Scales better than exposing multiple NodePorts or LoadBalancers.

3. **API Gateway or Service Mesh** (Optional). In larger setups:
	- Service Mesh (Istio, Linkerd) for secure, observability-rich, internal communication.
	- API Gateway (Kong, Ambassador, etc.) for controlling external traffic to multiple services.

✅ Summary

**Development:** kubectl port-forward is fine.
**Production:** Expose services via LoadBalancer or Ingress, not direct port-forwarding. Avoid NodePort unless you have specific reasons.

---

### Useful commands 

- `apk add -U <package>`. Install packages into an Alpine image
- `kubectl <command> --help`
- `kubectl delete -f [manifest.yml]`
- `kubectl apply -f [manifest.yml`
- `kubectl logs [podName]`
- `kubectl describe [element] [elementName]`. 
- `kubectl get [element]`
- `kubectl get [element] -o yaml`
- `kubectl get [element] -o wide`
- `kubectl rollout status deployment [deployName]`
- `kubectl exec -it <name> -- sh`

