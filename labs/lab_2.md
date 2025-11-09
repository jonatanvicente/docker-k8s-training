# 🧪 Module 2 Lab: Using Docker — Images, Volumes, Networks

**Goal:** Practice building, persisting, and connecting containers using Docker images, volumes, and networks.

**Prerequisites:**  
- Docker installed and running  
- Basic knowledge from Module 1  

---

## 🧩 Exercise 1: Build a Custom Docker Image

**Objective:** Create your own image from a Dockerfile.

**Steps:**
1. Create a folder called `myapp` and add a file `index.html` with sample content.
2. Create a Dockerfile in the same folder:

```dockerfile
   FROM nginx:alpine
   COPY index.html /usr/share/nginx/html/index.html
```
3. Build the image
```bash
docker build -t mynginx:1.0 .
```
4. Run a container using your image:
```bash
docker run -d -p 8080:80 mynginx:1.0
```
5. Verify by opening http://localhost:8080

**Expected Result:**
Your custom NGINX page should be visible in the browser.

---

## 🧩 Exercise 2: Tag and Push Image

**Objective:** Learn how to tag and push images to Docker Hub.

**Steps:**

1. Tag your image for Docker Hub:
```bash
docker tag mynginx:1.0 <your-dockerhub-username>/mynginx:1.0
```
2. Push the image:
```bash
docker push <your-dockerhub-username>/mynginx:1.0
```

**Expected Result:**
Your image is uploaded to Docker Hub and available for others to pull.

## 🧩 Exercise 3: Use Volumes for Data Persistence

**Objective:** Create a volume and persist data.

**Steps:**

1. Run a container with a volume:
```bash
docker run -d -v mydata:/data alpine sh -c "while true; do echo 'Hello Volume' >> /data/log.txt; sleep 5; done"
```

2. Access the volume content:
```bash
docker run --rm -v mydata:/data alpine cat /data/log.txt
```

**Expected Result:**
Data written by the first container is accessible even if the container stops.

## 🧩 Exercise 4: Bind Mounts for Development

**Objective:** Share a local folder with a container.

**Steps:**

1. Create a folder shared with a text file.
2. Run a container with a bind mount:
```bash
docker run -it -v $(pwd)/shared:/mnt alpine sh
```

3. Inside the container, check /mnt content with ls and cat.

**Expected Result:**
Changes in /mnt reflect in the host folder shared and vice versa.

## 🧩 Exercise 5: Create and Inspect Docker Networks

**Objective:** Understand networking between containers.

**Steps:**

1. Create a user-defined bridge network:
```bash
docker network create mynet
```
2. Run two containers on this network:
```bash
docker run -d --name container1 --network mynet nginx
docker run -d --name container2 --network mynet nginx
```
3. Inspect the network:
```bash
docker network inspect mynet
```

**Expected Result:**
Both containers are connected to mynet and can communicate using container names.


## 🧩 Exercise 6: Environment Variables in Containers

**Objective:** Pass configuration to containers using environment variables.

**Steps:**

1. Run an Alpine container:
```bash
docker run -it -e GREETING="Hello Docker" alpine sh
```
2. Inside the container:
```bash
echo $GREETING
```

**Expected Result:**
You should see Hello Docker printed inside the container.


## 🧩 Exercise 7: Multi-container Setup Simulation

**Objective:** Practice connecting multiple containers manually.

**Steps:**

1. Run a simple web container:
```bash
docker run -d --name web --network mynet nginx
```
2. Run a client container on the same network:
```bash
docker run -it --rm --network mynet alpine sh
```
3. Inside the client container, ping the web container:
```bash
ping web
```

**Expected Result:**
The client container can reach the web container using its name, demonstrating inter-container communication.

---

✅ **Summary**

After completing this lab, you should be able to:

- Build custom images using Dockerfile
- Tag and push images to Docker Hub
- Use volumes and bind mounts for persistent data
- Create and inspect Docker networks
- Pass configuration via environment variables
- Connect multiple containers manually and test communication






