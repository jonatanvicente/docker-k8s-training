# 🧪 Module 3 Lab: Orchestration with Kubernetes

**Goal:** Practice building, persisting, and connecting Kubernetes objects
**Note:** You can view the result of executing the following commands and exercises using [Lens](https://k8slens.dev/) or another editor. However, we recommend using the command line at the beginning.


### 🧩 Services: the higher level

**Steps:**

1. Deploy svc.yaml
2. Observe the following:
	- Port mapping and entry sequence:
		- Service IP: Kubernetes guarantees the service IP (it does not change)
		- Service port → spec > ports > port
		- Pod ports where the Service redirects traffic → spec > ports > targetPort
3. Introduce another type of Service (not default type) and redeploy it. Use `kubectl delete -f svc.yaml` and `kubectl apply -f svc2.yaml`

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