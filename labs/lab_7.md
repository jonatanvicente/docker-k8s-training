# 🧪 Module 7 Lab: Main Platforms and Ecosystems in Kubernetes


**Goal**: Understand the main tools in the Kubernetes ecosystem

---


### 🧩 Openshift Developer Sandbox

**Steps:**

1. Follow [Red Hat Openshift Tutorial](https://developers.redhat.com/learn/openshift/learn-kubernetes-using-developer-sandbox)

---

### 🧩 Helm: Deploy Nginx


**Steps:**

1. Prepare your environment
	- Make sure you have:  
		- Kubernetes running (`minikube start` or a local cluster)  
		- Helm installed (`helm version`)  
		- kubectl configured (`kubectl get nodes`)  
2. Add Helm chart repository
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```
3. Create a custom values file (my-values.yml).

<details>
  <summary>my-values.yaml</summary>

```
replicaCount: 2

service:
  type: NodePort
  port: 8080
  nodePort: 30080  # optional

ingress:
  enabled: false

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 200m
    memory: 256Mi
```

</details>

This file:
- Sets 2 replicas
- Uses NodePort service 
- Disables Ingress for simplicity
- Limits resources for the cluster

4. Install Nginx with Helm
```bash
helm install my-nginx bitnami/nginx -f my-values.yaml
```
- `my-nginx` is the Helm release name
- Helm generates all Kubernetes manifests from the chart
5. Verify installation
```bash
kubectl get pods
kubectl get svc
```
- You should see 2 pods running and a Service named my-nginx exposing port 80.

6. Access Nginx using port-forward 
- Since the Service is NodePort, you can forward a local port to access it:
```bash
kubectl port-forward service/my-nginx 8080:80
```
7. Scale replicas (optional)
```bash
helm upgrade my-nginx bitnami/nginx -f my-values.yaml --set replicaCount=3
kubectl get pods
```

8. Clean up
```bash
helm uninstall my-nginx
kubectl get pods
```

