---
layout: $/layouts/post.astro
title: Node API Dockerizing
description: First steps with Docker
tags:
  - docker
  - api
  - node
date: 2023-04-04
---

# Node API Dockerizing

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

~~~bash
touch docker/Dockerfile
~~~

### Connect with the main application container

