# 🧪 Module 1 Lab: Containerization Basics

## 🧩 Exercise 1: Run Your First Container

**Objective:** Verify your Docker installation and understand what a container is.

**Steps:**

1. Open a terminal and run:
```
   docker run hello-world
```
2. Observe the output message.
3. Identify:
- What happened behind the scenes when you ran this command?
- Which image was downloaded and what container was created?

**Expected Result:**
- You should see a message confirming that Docker is installed and working correctly.


## 🧩 Exercise 2: Run and Manage a Web Server Container

**Objective:** Run a simple web server using the official NGINX image.

**Steps:**
1. Start a container:
```
docker run -d -p 8080:80 --name mynginx nginx
```
2. Open your browser and visit:
👉 http://localhost:8080

3. List all running containers:
```
docker ps
```
4. Stop and remove the container:
```
docker stop mynginx
docker rm mynginx
```
**Expected Result:**
You should see the NGINX welcome page in your browser and understand how to start/stop containers.

## 🧩 Exercise 3: Explore Images and Containers

**Objective:** Learn how to list and manage images and containers.

**Steps:**

1. List all images:
```
docker images
```
2. List all containers (including stopped ones):
```
docker ps -a
```
3. Remove an image:
```
docker rmi hello-world
```

Try to remove an image that is in use — **what happens?**

**Expected Result:**
You’ll understand the relationship between containers and images, and how Docker stores them locally.

## 🧩 Exercise 4: Inspect Containers and View Logs

**Objective:** Get deeper insights into a running container.

**Steps:**

1. Run a container:
```
docker run -d --name mynginx2 nginx
```
2. View logs:
```
docker logs mynginx2
```
3. Inspect detailed information:
```
    docker inspect mynginx2
```
4. Identify the container’s IP address and mapped ports.

**Expected Result:**
You can read and interpret container metadata, including networking details and configuration.


## 🧩 Exercise 5: Create a Custom Command Container


**Objective:** Run a lightweight command in a temporary container.

**Steps:**

1. Run an Alpine container to execute a simple command:
```
docker run --rm alpine echo "Hello from Docker!"
```
2. Now, run an interactive container:

```
docker run -it alpine sh
```
3. Inside the shell:
- Run ls, pwd, and cat /etc/os-release
- Exit using exit

**Expected Result:**
You’ll see how to use containers for lightweight, isolated commands and how to access their interactive shell.


Summary

After completing this lab, you should be able to:
- Run and manage containers using docker run, docker ps, docker stop, docker rm
- Work with images using docker pull, docker images, docker rmi
- Inspect containers and view logs
- Understand the basic lifecycle of a Docker container

**Optional Challenge:**
Run two NGINX containers on different ports (8081, 8082) and confirm they both serve web pages independently.


