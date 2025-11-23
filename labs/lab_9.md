# 🧪 Module 9 Lab: Monitoring and Logging of Containers


**Goal**: To know how Grafana works.

---

### 🧩 Grafana: Create your own Dashboard

**Steps:**

1. Start Minikube
2. Enable metrics-server addon

```bash
minikube addons enable metrics-server
```
3. Install Grafana and Prometheus in only one step using Helm
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install monitoring prometheus-community/kube-prometheus-stack
```

4. Deploy a simple application
```bash
kubectl create deployment demo --image=nginx
kubectl scale deployment demo --replicas=3
```

4. Check that the pods are running
```bash
kubectl get pods -l app=demo
kubectl get pods -n default | grep prometheus
```

5. Access Grafana
```bash
kubectl port-forward deployment/monitoring-grafana 3000:3000
```
- Browse to http://localhost:3000 and login into
	- user: admin
	- password: [provided at installation]

6. Create a dashboard
	- In Grafana menu → + Create → Dashboard
	- Click Add new panel
	- Select datasource Prometheus
	- Enter a PromQL query to monitor pods (see next step)


7. Example queries

- CPU per pod:
```
rate(container_cpu_usage_seconds_total{pod=~"demo.*"}[2m])
```
- Memory per pod:
```
container_memory_usage_bytes{pod=~"demo.*"}
```
- Pod restarts:
```
kube_pod_container_status_restarts_total{pod=~"demo.*"}
```
- Pod status:
```
kube_pod_status_phase{pod=~"demo.*"}
```


8. Generate load to see metrics increase
```bash
kubectl run load-generator --image=busybox -it --restart=Never -- /bin/sh
while true; do wget -qO- http://demo; done
```
Metrics in Grafana (CPU, memory, restarts) will now reflect this load in real time.



### 🧩 Grafana: Import an existing Dashboard

1. Log into your Grafana installation
2. Create new Dashboard, and import the existing Dashboard "Kubernetes Monitoring Overview" (attached)
3. Review all panel and generate load to see metrics increase


### 🧩 ArgoCD: Automatic deployments to the cluster

1. **Install ArgoCD**

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

2. **Expose the ArgoCD server**

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```
Now you can access the web interface at [https://localhost:8080](https://localhost:8080).

3. **Get the initial password**

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
```

4. **Create a simple Git repository**. It can be a public repository with an example deployment and service, for instance, an nginx

5. **Create the ArgoCD application**

From the ArgoCD web interface:

* **New App**
* **App name:** nginx-demo
* **Project:** default
* **Repository URL:** your Git repo URL
* **Path:** folder where the manifests are located (use `.` if they are in the root)
* **Cluster:** your current cluster
* **Namespace:** default
Click **Create** and then **Sync**.

From the CLI:

```bash
argocd app create nginx-demo \
  --repo https://github.com/argoproj/argocd-example-apps.git \
  --path local-app \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace default

```

6. **Test changes**

```bash
kubectl get pods
kubectl get svc
```
- Modify the deployment (for example, change replicas from 1 → 2) and commit.
- In the ArgoCD interface, you will see it detects the change and allows you to synchronize it.
