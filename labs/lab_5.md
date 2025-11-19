# 🧪 Module 5 Lab: Architecture and Configuration Management in Docker and Kubernetes

**Goal:** Deep dive into Kubernetes architecture and configuration management.


### 🧩 HPA Demo: Horizontal Pod Autoscaler

**Steps:**

1. Enable the metrics-server addon `minikube addons enable metrics-server`
2. From the HPA directory, apply the manifests using `kubectl apply -f .` 
3. Check the initial status:
`kubectl get hpa
kubectl get pods`
4. Generate load to triger pod scaling, launch a container with `kubectl run -it --rm load-generator --image=busybox -- sh`
	- Inside the shell `while true; do wget -q -O- http://demo-svc; done`
5. Observe autoscaling in real time (in another terminal): `kubectl get hpa -w`
6. You can also check:
`kubectl get deploy
kubectl get pods -w`



---

### 🧩 ConfigMaps: Config management using cmd

**Steps:**

1. See nginx.conf in `configmaps-examples`
2. Create the ConfigMap with the command `kubectl create configmap nginx-config --from-file=configmaps-examples/nginx.conf`
3. `kubectl describe cm nginx-config` shows the key (the file name by default) and all associated fields.
4. We can create a ConfigMap with multiple files by providing the folder path: `kubectl create configmap nginx-config1 --from-file=configmaps-examples`
5. We verify the content with two keys (`index.html` and `nginx.conf`) using: `kubectl describe cm nginx-config1`

---

### 🧩 ConfigMaps: Config management using manifests

**_Volumes_**

**Steps:**
1. Analyze the example with volumes in **cm-nginx-vol.yaml**
2. Creates a deployment to consume it
3. Introduce some significant change in the data > nginx configuration. Verify the change



**_Environment vars_**

**Steps:**

1. We will create another ConfigMap with a script and environment variables: the env vars will be consumed from the described ConfigMap. See **cm-nginx-env.yml**
	- We create a script that echoes to the Nginx root folder, outputting to a file. This will be the script.
2. We specify the script in a volume and mount the environment variables by referencing the indicated ConfigMap.
3. We create a Pod, enter it, and validate the environment variables using env.
4. We check the script created in /opt and execute it.
	- `cat /usr/share/nginx/html/test.html` correctly captures the environment variables.


---

### 🧩 Secrets: Config management using manifests

**_Secret from a txt file_**

**Steps:**

1. Use following commands:
	- `kubectl create secret generic mysecret --from-file=./secret-files/test.txt`
  - `kubectl get secrets -o yaml`
  - `kubectl describe secrets mysecret`
2. Secrets are codified in base64

**_Secret from a manifest_**

**Steps:**

1. Use **secret-data.yml** and the commands above to analyze how K8s stores sensitive data.
2. Use **secret-stringdata.yml**. StringData directly encodes the sensitive data.


**_Hiding Credentials / Value Substitution_**

**Steps:**

1. Creation of a file with hidden secrets (**secret-secure.yml**). 
	- WARNING: Kubernetes does not correctly substitute placeholders when we provide values for environment variables.
2. Hiding and setting values:
	- We create a file referencing environment variables (**secret-secure_2.yml**).
	- We use the tool envsubst to replace the file’s placeholders with the previously created environment variable values.
	- We output to a new file not saved in version control (`envsubst < secret-secure_2.yml > tmp.yml`).
	- We apply the new file (`kubectl apply -f tmp.yml`).


**_Setting Credentials with Volumes_**

**Steps:**

1. Create a manifest with secrets and a Pod in **pod-vol-secret.yml**. Execute `kubectl apply -f pod-vol-secret.yml`
2. The user/password are set in the secret using `stringData` (converted to base64).
3. We create volumes that pass the credentials to files (user/password). Review the manifest to analyze
4. Credentials can be loaded by reading the file
5. Check the results entering in the container and using the command `kubectl get secret secret1 -o yaml`


**_Using Credentials with Volumes + Environment Variables_**

1. Create a manifest with secrets and a Pod in **pod-vol-and-envs.yml**.
2. We create environment variables that point to the secret created above.
	- `export VAR_NAME="value"`
	- `echo $VAR_NAME`
3. It is easier to load credentials as environment variables than by reading from a file (as in the previous example).

---