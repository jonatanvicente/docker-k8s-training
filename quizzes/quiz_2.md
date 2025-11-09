# 🧠 Module 2 Quiz: Using Docker — Images, Volumes, Networks

**Goal:** Assess understanding of building, persisting, and connecting containers effectively.

---

**1. What is the main difference between a base image and a custom image?**  
a) Base images contain only system tools, custom images include your app and dependencies  
b) Custom images contain the Docker Engine  
c) Base images are temporary containers  
d) Custom images cannot be pushed to registries  

<details>
  <summary>Solution</summary>
- a
</details>

---

**2. Which instruction in a Dockerfile specifies the base image to start from?**  
a) `RUN`  
b) `CMD`  
c) `FROM`  
d) `COPY`  

<details>
  <summary>Solution</summary>
- c
</details>

---

**3. What is the purpose of Docker’s build cache?**  
a) To reuse unchanged layers and speed up image builds  
b) To store running containers  
c) To save logs from builds  
d) To back up containers automatically  

<details>
  <summary>Solution</summary>
- a
</details>

---

**4. Which command is used to create an image from a Dockerfile?**  
a) `docker commit`  
b) `docker build`  
c) `docker create`  
d) `docker image`  

<details>
  <summary>Solution</summary>
- b
</details>

---

**5. What happens when you remove a container without using volumes?**  
a) Its data persists automatically  
b) Its data is lost (ephemeral storage)  
c) Docker saves the data in `/tmp`  
d) The image is deleted too  

<details>
  <summary>Solution</summary>
- b
</details>

---

**6. Which of the following is NOT a valid Docker volume type?**  
a) Named volume  
b) Anonymous volume  
c) Temporary volume  
d) Bind mount  

<details>
  <summary>Solution</summary>
- c
</details>

---

**7. What’s a common use case for bind mounts?**  
a) Persisting database data  
b) Sharing files between containers and host for development  
c) Storing container logs automatically  
d) Creating custom images  

<details>
  <summary>Solution</summary>
- b
</details>

---

**8. Which Docker network type allows containers to communicate with each other by name?**  
a) Host  
b) None  
c) Bridge (user-defined)  
d) Local  

<details>
  <summary>Solution</summary>
- c
</details>

---

**9. How can environment variables be passed into a running container?**  
a) Using `-e` or `--env-file` options with `docker run`  
b) By editing `/etc/docker.conf`  
c) Through Docker Hub settings  
d) Only inside the Dockerfile  

<details>
  <summary>Solution</summary>
- a
</details>

---

**10. What is the main benefit of using user-defined networks?**  
a) They disable DNS resolution  
b) They isolate containers and allow name-based communication  
c) They increase container memory limits  
d) They automatically expose ports to the internet  

<details>
  <summary>Solution</summary>
- b
</details>


