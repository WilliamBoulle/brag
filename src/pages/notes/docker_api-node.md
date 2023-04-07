---
layout: $/layouts/post.astro
title: Node API Dockerizing
description: First steps with Docker and Node
tags:
  - docker
  - api
  - node
date: 2023-04-05
---

# 

## Existing

Currently, there is a Node API on a side and the main application in another side.  
The main application is dockerized, but the Node API require that Node is installed locally to be able to run it.

## Goal

The first goal is to dockerize the Node API.
Then, it is to connect the containers so that the main application can call the API.

## Steps

### Dockerize the API

This is the first time I create a Docker config, so I have to start to the beginning → search documentation.  
The luck to work with popular tools is that is well documented or/and there is a good community behind : so I quickly found some useful links:
- https://nodejs.org/en/docs/guides/nodejs-docker-webapp
- https://www.sharooq.com/how-to-set-up-docker-for-local-development

I used this two links to achieve the first step.  

**Dockerfile creation**

_I put the docker config inside a `docker` directory_

`docker/Dockerfile`

~~~bash
# use node image in version 12 according to the project
FROM node:12
# Create api directory
WORKDIR /api
# Copy necessary files to the workdir
COPY package*.json ./
COPY src/env.js.sample /api/src/env.js

# Install app dependencies
RUN NODE_ENV=development npm install
# Install nodemon globally to be able to run it (see script **dev** in package.json)
RUN npm i -g nodemon

# Bundle app source
COPY . .

# Export port 8081 where the API is running
EXPOSE 8081

# Run the API
CMD ["npm", "run dev"]
~~~

After creating the Dockerfile, I build the image with the following command to test it:

~~~bash
docker build -t api . -f ./docker/Dockerfile
~~~

I open a browser at `http://localhost:8081/documentation` and I see the API running. Good !

**Docker Compose creation**

`docker-compose.yml`

~~~yaml
services:
  # name of the service
  api:
    build: 
        # path to the Dockerfile
        dockerfile: ./docker/Dockerfile
    # name of the container
    container_name: api
    # command to run when the container is started
    command: npm run dev
    # ports to expose: host:container API is running on port 8081 inside the container
    # I expose it on port 8082 on my host because I already have a service running on port 8081
    ports:
      - 8082:8081
    # volumes to mount: host:container
    volumes:
      - .:/api
    # environment variables
    environment:
      - NODE_ENV=development
      - SQL_HOST=mysql
      - SQL_PORT=3306
~~~

With that, I can run the API with the following command:

~~~bash
docker-compose up -d
~~~

### Connect with the main application container

I have to connect the containers so that the main application can call the API.

The main application containers use the **plateforme_plateforme** network.

I have to add the API container to this network.

I add the following lines to the `docker-compose.yml` file:

~~~yaml
...
# add the container to the plateforme_plateforme network
networks:
  plateforme_plateforme:
    external: true
~~~

After rebuild the image and run the container, I can see that the API container is connected to the network with the following command:

~~~bash
docker network inspect plateforme_plateforme
~~~

Inside the **"Containers"** section, I have the main application containers and the API container.

A ping from the main application container to the API container works.

---

## Useful commands

### Build the image

```bash
docker build -t name_of_container .
```

### Run the container

```bash
docker compose up -d
```

### Stop the container

```bash
docker compose stop
```

### Connect to the container

```bash
docker exec -it name_of_container /bin/bash
```

### List the containers

```bash
docker ps
```

### Inspect the network

```bash
docker network inspect name_of_network
```

### Inspect a container

```bash
docker inspect name_of_container
```
