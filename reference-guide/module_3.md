# ✨ Module 3 References: Orchestration with Kubernetes


![k8s structure Pattern](../images/k8s_structure.png)


References:

- [kubectl Quick Reference](https://kubernetes.io/docs/reference/kubectl/quick-reference/)
- [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
- [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)


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


### Useful commands 

- `apk add -U <package>`. Install packages needed into an Alpine image

