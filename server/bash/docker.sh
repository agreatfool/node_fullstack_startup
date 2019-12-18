#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/.. # server root

# prepare private registry secret
if [[ ! -d "~/.docker" ]];then
    mkdir ~/.docker
    cp ./dockerconfigjson ~/.docker/config.json
fi

# versions
VERSION=`cat ./package.json | jq -r '.version'`
COMMON_VER=`cat ./docker_dep.json | jq -r '.common'`
RUNNER_VER=`cat ./docker_dep.json | jq -r '.runner'`

# global variables
REGISTRY="127.0.0.1:15000"
ORIGIN_TAG=fullstack_server:${VERSION}
REGISTRY_TAG=${REGISTRY}/fullstack/server:${VERSION}

# pull necessary images
docker pull ${REGISTRY}/fullstack/common:${COMMON_VER}
docker pull ${REGISTRY}/fullstack/runner:${RUNNER_VER}

# prepare docker context
rm -rf /tmp/docker
mkdir -p /tmp/docker/context/server # since docker COPY command can only copy files & sub dirs of a source dir rather than the source dir itself, so ./docker/context is the actual context dir
mkdir -p /tmp/docker/context/logs # business logs
mkdir -p /tmp/docker/context/pm2  # pm2 logs

rsync -av \
    ./* \
    /tmp/docker/context/server \
    --exclude build \
    --exclude node_modules \
    --exclude .gitignore \
    --exclude Dockerfile \
    --exclude README.md

cp ./fullstack.container.yml /tmp/docker/context/server
mv /tmp/docker/context/server/fullstack.container.yml /tmp/docker/context/server/fullstack.yml

# build image
docker build \
    --no-cache \
    --build-arg COMMON_VER=${COMMON_VER} \
    --build-arg RUNNER_VER=${RUNNER_VER} \
    --build-arg REGISTRY=${REGISTRY} \
    --tag ${ORIGIN_TAG} \
    --file ./Dockerfile \
    /tmp/docker

# remove tmp file
rm -rf /tmp/docker

# push image
docker tag ${ORIGIN_TAG} ${REGISTRY_TAG}
docker push ${REGISTRY_TAG}
