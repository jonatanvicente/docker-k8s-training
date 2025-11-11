# 🧪 Module 3 Lab: Orchestration with Kubernetes

**Goal:** Practice building, persisting, and connecting Kubernetes objects
**Note:** You can view the result of executing the following commands and exercises using [Lens](https://k8slens.dev/) or another editor. However, we recommend using the command line at the beginning.

### 🧩 kubectl: Using a poweful tool

**Questions:**
- What are the next commands used for?
	- `kubectl config view`
	- `kubectl api-versions` 
	- `kubectl api-resources`
	- `kubectl get all`
	- `kubectl apply -f pod.yaml`
	- `kubectl run - -rm -ti [namePod] --image=[dockerImage] - - sh`. Creates a temporary pod using the image and opens its shell.
	- `kubectl get pod [pod]` and `kubectl get pods`

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
- When you create a pod with 2 constainers inside, can you access one container from the other? Do they share the same network?

### 🧩 ReplicaSets: Using ReplicaSets

**Steps:**
1. Deploy the replicaset.yaml file provided in the project
2. Delete one pod
3. Verify that Kubernetes creates a new pod automatically
4. Modify replicaset.yaml to increase the number of replicas. What happens?

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
- Verify it using `kubectl rollout history deployment [deploymentName]`. Can you see the annotation?

6. Set the parameter revisionHistoryLimit to 1 to limit the revision history (see the excerpt below). Then reapply the deployment using `kubectl apply -f <fileName>`
```yaml
spec:
  revisionHistoryLimit: 1
  replicas: 3
  selector:
    matchLabels:
      app: front
```

7. Introduce a fake into the manifest: change the image name to name nginx:testfake to force an error.
	- Execute `kubectl get pods`. Can you see the error?
	- Execute `kubectl rollout history deployment [deploymentName]`. Is it possible to perform the rollback?

**Questions:**
- What are the next commands used for?
	- `kubectl get deployment --show-labels`
	- `kubectl rollout status deployment [deployName]` and `kubectl rollout status deployment [deployName]`


### 🧩 Services: the higher level


