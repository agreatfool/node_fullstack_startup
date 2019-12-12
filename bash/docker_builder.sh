#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/..

VERSION="0.0.1"

REGISTRY="127.0.0.1:15000"
ORIGIN_TAG=fullstack_builder:${VERSION}
REGISTRY_TAG=${REGISTRY}/fullstack/builder:${VERSION}

# prepare docker context (leave it empty)
rm -rf ./docker
mkdir -p ./docker/context # since docker COPY command can only copy files & sub dirs of a source dir rather than the source dir itself, so ./docker/context is the actual context dir

# build image
docker build \
    --no-cache \
    --tag fullstack_builder:${VERSION} \
    --file ./Dockerfile_builder \
    ./docker

# remove images without tags
docker rmi $(docker images | awk '/^<none>/ {print $3}')

# remove tmp file
rm -rf ./docker

# push image
docker tag ${ORIGIN_TAG} ${REGISTRY_TAG}
docker push ${REGISTRY_TAG}
