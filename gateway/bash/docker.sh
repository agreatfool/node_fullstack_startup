#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"

cd ${FULLPATH}/.. # gateway root

# prepare private registry secret
if [[ ! -d "~/.docker" ]];then
    mkdir ~/.docker
    cp ./dockerconfigjson ~/.docker/config.json
fi

VERSION=`cat ./package.json | jq -r '.version'`
COMMON_VERSION="0.0.28" # since drone env has current repo only, it has to be hard-coded

REGISTRY="127.0.0.1:15000"
ORIGIN_TAG=fullstack_gateway:${VERSION}
REGISTRY_TAG=${REGISTRY}/fullstack/gateway:${VERSION}

# prepare docker context
rm -rf /tmp/docker
mkdir -p /tmp/docker/context/gateway # since docker COPY command can only copy files & sub dirs of a source dir rather than the source dir itself, so ./docker/context is the actual context dir
mkdir -p /tmp/docker/context/logs # business logs
mkdir -p /tmp/docker/context/pm2  # pm2 logs

rsync -av \
    ./* \
    /tmp/docker/context/gateway \
    --exclude build \
    --exclude node_modules \
    --exclude .gitignore \
    --exclude Dockerfile \
    --exclude README.md

cp ./fullstack.container.yml /tmp/docker/context/gateway
mv /tmp/docker/context/gateway/fullstack.container.yml /tmp/docker/context/gateway/fullstack.yml

# build image
docker build \
    --no-cache \
    --build-arg COMMON_VERSION=${COMMON_VERSION} \
    --build-arg REGISTRY=${REGISTRY} \
    --tag ${ORIGIN_TAG} \
    --file ./Dockerfile \
    /tmp/docker

# remove images without tags
docker rmi $(docker images | awk '/^<none>/ {print $3}')

# remove tmp file
rm -rf /tmp/docker

# push image
docker tag ${ORIGIN_TAG} ${REGISTRY_TAG}
docker push ${REGISTRY_TAG}
