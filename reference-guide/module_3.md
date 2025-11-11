# ✨ Module 3 References: Orchestration with Kubernetes


# <img src="images/k8s_structure.png" alt="k8s structure" width="50"/>


References:

- [kubectl Quick Reference](https://kubernetes.io/docs/reference/kubectl/quick-reference/)
- [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
- [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)


### Tips

_**Pods**__

- Un pod NO puede actualizarse a sí mismo. Es necesario eliminarlo y volverlo a crear o bien actualizar desde una jerarquía superior (Deployment o ReplicaSet).
- No crear los pods a mano (salvo los efímeros o temporales), fuera de controladores como Deployment o ReplicaSet. Crearlos siempre a partir de estructuras superiores (ReplicaSets, Deployments). 
- NUNCA crear PODs planos, SIN OWNER. Deben ser creados por objetos de mayor nivel (replicaSets, por ejemplo).

    Si etiquetamos un pod sin label, y es coincidente con otra label que tenga un descriptor de replicaSet, el replicaSet ADOPTARÁ el pod (incluyéndolo en el número de réplicas que se le solicitan), Y ESTO ES PELIGROSO

_**Deployment**_

- Parameters:
	- MaxUnavailable: Cuántos pods voy a permitir que mueran. Qué porcentaje voy a permitir que esté unavailble (no disponible), garantizando el resto de pods siempre disponibles. Default value = 25%
	- MaxSearch: Cuánto voy a añadir al 100% para que se creen pods nuevos, cuánto voy a permitir escalar mientras se efectúa una tarea de actualización. Default value = 25%

_**ReplicaSet**_

- Cambios de replicaSets en ejecución:
	- Si cambiamos el file yaml en ejecución y ejecutamos apply, NO se actualizará nada. Es necesario borrar el pod. Entonces ReplicaSet actualiza pods empleando la descripción existente en el file


_**Service**_
- Service devolverá una IP única que será mantenida en el tiempo y que el cluster garantiza. No así con los pods: un pod puede morir, otro se levantará con otra IP. Un service tiene también un DNS único.
- Necesitará tener un Endpoint al cual enrutar los datos: entrypoint.
	- Si no especificamos otro, se creará de tipo ClusterIP (IP virtual no asociada a una MAC física).


### Useful commands 

- `apk add -U <package>`. Install packages needed into an Alpine image

