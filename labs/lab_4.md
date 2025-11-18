# 🧪 Module 4 Lab: Security and Best Practices

**Goal:** Conocer la seguridad usando Kubernetes


### 🧩 Roles

**Steps:**

1. View all Kubernetes roles by running `kubectl get clusterroles`
2. View the existing contexts with `kubectl config get-contexts`
3. Analyze jonatan-pods.yml. What kind of permissions will the user Jonatan have?
4. Create a new context with `kubectl config set-context jonatan --cluster=minikube --user=jonatan`. You can see which context you are working in with `kubectl config current-context`
5. Switch context using `kubectl config use-context jonatan`
6. Run `kubectl apply -f pod/pod.yaml`. What happens? Why?



Remember:

- To use RBAC, you need to start K8s with `minikube start --vm-driver=none --extra-config=apiserver.authorization-mode=RBAC`
- You can set the cluster credentials with `kubectl config set-cluster minikube --server=https://[IP] --certificate-authority=/ca.crt`
- You can set a user’s credentials with `kubectl config set-credentials jonatan --client-certificate=jonatan.crt --client-key=jonatan.key`

---

### 🧩 Creating an Admin User

**Steps:**

1. To create an administrator user, you just need to create a RoleBinding that links to predefined administrator roles on the platform.
	- Check the available ClusterRoles (`kubectl get clusterroles`).
	- **minikube** is using the ClusterRole **cluster-admin**. We will use this predefined role to assign it to the user Jonatan.
2. Since the Role already exists, it’s only necessary to add it to a manifest, not create a new role (see **cluster-admin.yml**).
	- In the RoleRef, we reference the existing role (**cluster-admin**) and execute as admin (**kubectl config use-context minikube**).
3. Switch to the user Jonatan (**kubectl config use-context jonatan**).
	- Now the user Jonatan can access all system resources (**kubectl get ns**, **kubectl get endpoints**, **kubectl get svc**, etc.).
4. Check that the administrator user has been created correctly.


---


### 🧩 Creating a Group

**Steps:**

1. Apply `group-role.yml`.
2. What type of resources can the Role `svc-clusterrole` access?
3. Which group is assigned the Role `svc-clusterrole`?

---

## 🧩 ServiceAccounts

**_API Tokens Associated with a ServiceAccount_**

When you create a ServiceAccount and associate it with a pod, an API token (handled as a Secret) is created and mounted to the pod as a volume.

**Steps:**

* **1.** Create a Namespace (note that we will work in the default Namespace)
* **2.** Create a ServiceAccount
* **3.** Create a pod linked to the ServiceAccount (`pod.yaml`)
* **4.** Use the token from inside the pod

**_Creating a ServiceAccount_**

- Create a new ServiceAccount (**`kubectl create serviceaccount serviceaccounttest`**).
- Check with **`kubectl get sa`** (there should be two) and **`kubectl get serviceaccounts/serviceaccounttest -o yaml`**
- The ServiceAccount **does not** automatically have an associated token (since v1.31).

**_Creating a Pod and Using the Token_**

- Check the cluster IP (**`kubectl get svc`**)
- Create the pod **`kubectl apply -f pod.yaml`** (linked to the ServiceAccount)
- Inspect with **`kubectl get pods/podtest2 -o yaml`**
- Enter the pod (**`kubectl exec -it podtest2 -- sh`**). The volume with the token is mounted at **`/var/run/secrets/kubernetes.io/serviceaccount`**.
	- You can see fields `ca.crt`, `namespace`, and `token`
	- Check the token (**`cat token`**) and store it in a variable (**`TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)`**)
    - Install curl (**`apk add curl`**)
    - Query other pods from this pod:
    	- `curl -H "Authorization: Bearer ${TOKEN}" https://kubernetes/api/v1/namespaces/default/pods --insecure` returns **forbidden** (the token has no permissions)
- Create a Role & RoleBinding (`kubectl apply -f role.yaml`). Check the resources needed in `kubectl api-resources`
  	- Retry querying other pods: **now the token has permissions and the response is correct**
- This is useful for creating pods that query other pods’ state, monitor, or provision infrastructure.

**_Creating a Long-Lived Token Associated with a ServiceAccount_**

- These have higher risk because they do not expire. Apply `long-lived-API-token.yml` (in this case, it is not associated with any pod).
- If the ServiceAccount associated with the secret is deleted, Kubernetes automatically deletes the token.
- Inspect the token with **`kubectl get secret/[tokenName] -o yaml`**. They are stored as secrets.
	- Example: `kubectl get secret/long-lived-token -o yaml` shows:
		- `ca.crt`: public certificate
		- `namespace`: base64-encoded
		- `token`: base64-encoded JWT
- Running `kubectl get secrets` shows the permanent service-account-token created
- Running `kubectl describe sa` shows the ServiceAccounts in the default namespace. The `serviceaccounttest` namespace contains the linked token **long-lived-token**.

---

### 🧩 Scanning vulnerabilities with Trivy

**Steps:**

1. Apply `trivy-pod.yml`
2. Execute `kubectl logs -f trivy-scan`
3. Trivy analyzes the image (deterministic approach):
	- A Docker image is an immutable artifact: it contains exactly the same files, libraries, and software versions every time you download it.
	- Therefore, if you run Trivy on `nginx:1.25.0` today or tomorrow, you will see exactly the same vulnerabilities.
	- In contrast, a running pod can change in real time:
		- Someone could install packages inside the container.
		- The pod could be running processes that modify files or configuration.
		- The filesystem may have volumes mounted from outside.

For this reason, scanning a running pod does not always give the same result and is less “predictable” than scanning the image, which is fixed."

---

### 🧩 Quotas


_**Pod Quota**_

**Steps:**

1. Analyze and apply pod-quota.yml
2. Fuerza la cantidad de réplicas del Deployment para que sobrepase la definición de ResourceQuota. ¿qué ocurre


_**Resource Quota**_

1. Apply `res-quota.yml`. What limits are set for the `uat` namespace?
2. Increase the replicas. How does Kubernetes behave when you exceed the ResourceQuota limits?


---

### 🧩 Everything has a limit

_**Limit Range**_

1. Analyze min-max-limits.yml: 
	- Are the container cont1 limits within the LimitRange of the prod namespace?
	- What happens if the container exceeds its CPU or memory limits?
2. Analyze default-cpu-mem.yml
	- What default CPU and memory limits are applied to container `cont1` by the LimitRange in the `dev` namespace?
	- If container `cont1` does not specify any resources, what happens when it tries to use more CPU or memory than the defaults?



