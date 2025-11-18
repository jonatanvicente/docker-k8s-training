# 🧪 Module 6 Lab: Services and Networking in Containers and Kubernetes: Ingress


**Goal**: Follow the next process to connect your Minikube cluster to outside

---

### 🧩 1. Ingress Controller installation

**Steps:**

1. The IngressController behaves like any other exposed Service. In production, one option is to put a LoadBalancer (external provider) in front, which routes to its NodePort as the entry point to the Kubernetes cluster.
2. You need to run: `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.2/deploy/static/provider/baremetal/deploy.yaml` (attached as **nginx-controller.yml**)
3. Verify the existence of pods with `kubectl get pods -n ingress-nginx` (2 completed and 1 running). 
4. Verify the existence of services with `kubectl get svc -n ingress-nginx`. We have a ClusterIP and a NodePort. 
5. This pod will act as the controller. Run `kubectl get svc -n ingress-nginx` and verify that two nginx services have been created. 
6. Run `ip` a to find the machine’s real IP. Run minikube tunnel to map the service ports to the outside of the cluster (or, alternatively, use **port-forward**). 
7. When accessing it, you will see the nginx page (Ingress Controller running; no application pages yet).



### 🧩 2. Creating a Service to route to Pods


**Steps:**

1. Apply `ingress-example.yml`
2. Create Pods in the **default namespace**, modifying the Pod command to include the specific startup instruction.
	- **Create a ClusterIP Service** for **internal** access to the Deployment.
	- **Test service accessibility:** Create a temporary Pod, enter it (`kubectl exec -it podName -- sh`) and run `curl app-v1:8080`.
    - The service is accessible: you can see the nginx output configured in `ingress-example.yml`.
    - Note: the application is **not yet exposed outside the cluster**; you only reach the modified nginx home page. To expose it externally, you need to create Ingress rules.


## 🧩 3. Ingress: creating path-based rules


**Steps:**

1. Apply **ingress-rules.yml**
	- **Handling the `ingressClassName` attribute:** The `ingressClassName` attribute in an Ingress resource tells Kubernetes which Ingress Controller should handle this Ingress rule.
		- **It must match the IngressClass resource that was registered by your Ingress Controller.**
		- To find the name, `kubectl get ingressclass` shows the controller created (in this example, from `nginx-controller.yml`) and **its name**.
		- This name is the one that must be assigned to `ingressClassName`.
		- Now, when accessing [http://192.168.49.2:30784/appv1](http://192.168.49.2:30784/appv1), we see the correct output (IP assigned for the external network: assigned port / path defined in the rules).


#### 4. Ingress: Creating host-based (DNS) rules

**Steps:**

1. Apply **ingress-rules_2.yml**. Create a fictitious domain (note: make sure the tunnel is enabled to access the Ingress Controller, see section above).
2. access with `curl -H "Host: v1.mydomain.com" http://192.168.49.2:30784/appv1`



#### Handling Errors in the previous processes

- **Pod deployment errors:** Use `kubectl describe pods/pod-xxxxxx` to see errors (with `-w` to watch). You can also use `kubectl get pods/pod-xxxx -o yaml`.
- **Routing errors from Controller/Rules to Service:** Check the pods in the `ingress-nginx` namespace (the controller is one of them).
- Check the Controller startup logs with `kubectl -n ingress-nginx logs -f ingress-nginx-controller-xxxxxxx`
- When routing is correct, the logs show the path bindings and also incoming requests
