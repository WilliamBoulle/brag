---
layout: $/layouts/post.astro
title: VueJS Front Dockerizing
description: First steps with Docker and VueJS
tags:
  - docker
  - front
  - vuejs
date: 2023-04-07
---

# 

The VueJs official documentation have a section to dockerize an app, cool !

https://v2.vuejs.org/v2/cookbook/dockerize-vuejs-app.html

## Dockerfile

Nothing special here, I just follow the doc.

```dockerfile
FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE  8080

CMD [ "npm", "run", "serve"]
```

## docker-compose.yml

Again, nothing special.
I use environment variables to be able to change the port of the container and the port of the host.
And I connect the container to the network of the main application.

```yaml
services:
  front:
    build:
      dockerfile: ./docker/Dockerfile
    container_name: front
    command: npm run serve
    ports:
      - ${FRONT_CONTAINER_PORT}:${FRONT_PORT}
    networks:
      - plateforme_plateforme
    volumes:
      - .:/app

networks:
  plateforme_plateforme:
    external: true
```

## Build and run

```bash
docker-compose up --build -d
```

## Test

I open a browser at `http://localhost:FRONT_PORT` and I see the front running. Good !

## Useful commands

See [Node API Dockerizing](/brag/notes/docker_api-node#useful-commands) note for more details.
