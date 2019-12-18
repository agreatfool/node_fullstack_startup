#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/.. # common root

# prepare private registry secret
if [[ ! -d "~/.docker" ]];then
    mkdir ~/.docker
    cp ./dockerconfigjson ~/.docker/config.json
fi

# versions
VERSION=`cat ./package.json | jq -r '.version'`
BUILDER_VER=`cat ./docker_dep.json | jq -r '.builder'`

# global variables
REGISTRY="127.0.0.1:15000"
ORIGIN_TAG=fullstack_common:${VERSION}
REGISTRY_TAG=${REGISTRY}/fullstack/common:${VERSION}

# pull necessary images
docker pull ${REGISTRY}/fullstack/builder:${BUILDER_VER}

# prepare docker context
rm -rf /tmp/docker
mkdir -p /tmp/docker/context/common # since docker COPY command can only copy files & sub dirs of a source dir rather than the source dir itself, so ./docker/context is the actual context dir

rsync -av \
    ./* \
    /tmp/docker/context/common \
    --exclude build \
    --exclude node_modules \
    --exclude .gitignore \
    --exclude Dockerfile \
    --exclude README.md

# build image
docker build \
    --no-cache \
    --build-arg REGISTRY=${REGISTRY} \
    --build-arg BUILDER_VER=${BUILDER_VER} \
    --tag fullstack_common:${VERSION} \
    --file ./Dockerfile \
    /tmp/docker

# remove images without tags
docker rmi $(docker images | awk '/^<none>/ {print $3}')

# remove tmp file
rm -rf /tmp/docker

# push image
docker tag ${ORIGIN_TAG} ${REGISTRY_TAG}
docker push ${REGISTRY_TAG}
