#!/bin/bash
set -ev

# Build the Docker images
docker build -t andead/react.nginx:latest .

# Login to Docker Hub and upload images
docker login -u $DOCKER_LOGIN_USERNAME -p $DOCKER_LOGIN_PASSWORD
docker push andead/react.nginx:latest