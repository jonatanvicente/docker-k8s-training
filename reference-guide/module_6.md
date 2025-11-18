# ✨ Module 6 References: Services and Networking in Containers and Kubernetes: Ingress


References:

- [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)

---

_**Tips:**_


#### Port Forwarding

- To expose any cluster port (for **development** purposes), it is necessary to do port-forwarding. To access the service output:
  - From localhost: `kubectl port-forward service/[myService] -n [namespace] [external_port]:[pod_port]`
  - For access from any IP: `kubectl port-forward service/[myService] -n [namespace] [external_port]:[pod_port] --address 0.0.0.0`

#### minikube tunnel

- To run a tunnel and make any service accessible, we can do:
  - `minikube service ingress-nginx-controller -n ingress-nginx --url [url]` (if url is empty → '/' as URL)
    - When running this command, the tunnel opens **two external IPs outside the Kubernetes cluster** (one mapping port 80 and another for 443). The nginx web page is accessible from the browser. The URL to port 80 will be the entry point.
      - [http://192.168.49.2:30784](http://192.168.49.2:30784)       # port 80
      - [http://192.168.49.2:30679](http://192.168.49.2:30679)       # port 443


