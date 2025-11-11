# 🧪 Module 3 Lab: Orchestration with Kubernetes

**Goal:** Practice building, persisting, and connecting Kubernetes objects 
**Note:** You can view the result of executing the following commands and exercises using [Lens](https://k8slens.dev/) or another editor. However, we recommend using the command line at the beginning.

---

### 🧩 kubectl: Using a powerful tool

**Questions:**
- What are the next commands used for?
	- `kubectl config view`
	- `kubectl api-versions` 
	- `kubectl api-resources`
	- `kubectl get all`
	- `kubectl apply -f pod.yaml`
	- `kubectl run - -rm -ti [namePod] --image=[dockerImage] -- sh`. Creates a temporary pod using the image and opens its shell.
	- `kubectl get pod [pod]` and `kubectl get pods`

---

### 🧩 Pods: Creating pods

**Steps:**
1. Use pod.yaml file provided in the project
2. Execute `kubectl apply -f pod.yaml`
3. Verify that a new pod exists
4. Delete the pod
5. Modify pod.yaml to add another pod and reapply the manifest
6. Create a new manifest called **containers.yml**. Include 2 containers instead just one and apply it
7. Create a new manifest called **labels.yml**. Add the labels 'app' and 'env' in the metadata section

**Keep an eye to this:**
- A container cannot update itself. It requires a higher-level object

**Questions:**
- What are the next commands used for?
	- `kubectl apply -f <filename>`
	- `kubectl get pods -l app=<label>`
	- `kubectl get pod [podName] -o yaml`	
	- `kubectl delete pod [podName]`	
	- `kubectl delete -f [fileName]`	
	- `kubectl describe <name>`
	- `kubectl logs <name> -c <container>`
	- `kubectl exec -it <name> -c <container> -- sh`
- When you create a pod with 2 constainers inside, **can you access one container from the other? Do they share the same network?**

---

### 🧩 ReplicaSets: Using ReplicaSets

**Steps:**
1. Deploy the replicaset.yaml file provided in the project
2. Delete one pod
3. Verify that Kubernetes creates a new pod automatically
4. Modify replicaset.yaml to increase the number of replicas. **What happens?**

---

### 🧩 Deployments

**Steps:**
1. Deploy the dep.yaml file provided in the project and verify it was created successfully.
2. Modify the image used by replacing nginx:alpine with nginx. Also, remove the 'ports' element
3. Verify the changes in real time using `kubectl rollout status deployment [deploymentName]`
4. Make another change: revert to the first image (nginx:alpine) and set the port to 90. 
5. Add the following annotation to metadata section (excerpt):
```yaml
metadata:
  annotations:
    kubernetes.io/change-cause: "Change port to 110"
  name: deployment-test
  labels:
    app: front
```
- Verify it using `kubectl rollout history deployment [deploymentName]`. **Can you see the annotation?**

6. Set the parameter **revisionHistoryLimit** to 1 to limit the revision history (see the excerpt below). Then reapply the deployment using `kubectl apply -f <fileName>`
```yaml
spec:
  revisionHistoryLimit: 1
  replicas: 3
  selector:
    matchLabels:
      app: front
```

7. **Introduce a fake into the manifest**: change the image name to name nginx:testfake to force an error.
	- Execute `kubectl get pods`. Can you see the error?
	- Execute `kubectl rollout history deployment [deploymentName]`. Is it possible to perform the rollback?

**Questions:**
- What are the next commands used for?
	- `kubectl get deployment --show-labels`
	- `kubectl rollout status deployment [deployName]` and `kubectl rollout status deployment [deployName]`

---

### 🧩 Services: the higher level

**Steps:**

1. Deploy svc.yaml
2. Observe the following:
	- Port mapping and entry sequence:
		- Service IP: Kubernetes guarantees the service IP (it does not change)
		- Service port → spec > ports > port
		- Pod ports where the Service redirects traffic → spec > ports > targetPort
3. Introduce another type of Service (default type, ClusterIP) and redeploy it. Use `kubectl delete -f svc.yaml` and `kubectl apply -f svc2.yaml`

```yaml
apiVersion: v1 
kind: Service
metadata:
  name: my-service
  labels:
    app: front
spec:
  type: ClusterIP
  selector: 
    app: front
  ports:
    - protocol: TCP
      port: 8080 
      targetPort: 80 
```

4. **NodePort**.

	- Deploy nodeport.yml (svc.yaml is already deployed). It uses nodeport instead ClusterIP.
	- Execute `kubectl get pods -l app=[front | backend`. **How many pods can you see?**
	- Now execute `kubectl get svc`. **How many services are deployed?**
	- **What port is exposing Nodeport?**

5. **Port Forwarding**: Accessing from outside of k8s cluster (only for develop purposes)
	- From localhost, execute `kubectl port-forward service/[myService] -n [namespace] [external_port]:[pod_port]`
	- To access from any IP, execute `kubectl port-forward service/[myService] -n [namespace] [external_port]:[pod_port] --address 0.0.0.0`	
	- Try to do it using Lens

6. **minikube tunnel**. 
	- To make available any service, we can make a tunnel executing `minikube service ingress-nginx-controller -n ingress-nginx  --url [url]`	

---

### 🧩 Namespaces and Contexts: tidying the room

**Steps:**

1. Create two namespaces by applying the manifest ns.yml. 
2. Verify the deployment using `kubectl get deploy -n dev` and `kubectl get pods -n dev`
	- **How many replicas are there in each one?**
4. **Using DNSs**. Apply ns-and-dns.yml
	- Create an ephemeral pod using `kubectl run --rm -ti podtest3 --image=nginx:alpine -- sh`
	- Try to reach another service using curl (`curl backend-k8s-hands-on`). **What happens?**
	- Try it again using the full domain name [ServiceName].[NamespaceName].svc.cluster.local. **Does it still not work?**
5. **Contexts**.
	- Review the configuration options using `kubectl config view`
	- Create a new context linked to a specific namespace. You can do this with `kubectl config set-context ci-context --namespace ci --cluster minikube --user=minikube`
	- Switch to the new context using (`kubectl config use-context ci-context`)
	- **Can you see the default resources? Is it necessary to select the context? Explain why.**

---

### 🧩 Probes: is there anybody?

**Steps:**

1. **Liveness**:
	- Apply liveness-cmd.yml.
	- Liveness sequence:
		- Every 5 seconds it performs a cat on the file. When it reaches the 35-second mark, it will fail.
		- Kubernetes will restart the container inside the pod. After another 35 seconds, it will fail again.
		- This sequence will repeat several times until it enters **CrashLoopBackOff**, which means Kubernetes tried multiple times but a bug causes the container to crash, and it will stop restarting it.
	- **Commands sequence used:**
		- `kubectl get pods`
		- `kubectl get pods -w` to watch events that occur on the pods
		- `kubectl describe pod liveness-exec` 	to analyze the full event log

2. **Readiness**
	- Apply liveness-tcp.yml
	- Analyze the manifest and keep an eye to this: **Readiness** deregisters the container's ports from the service if there is an error, but it does not restart the container.


