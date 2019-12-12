#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/../..

VERSION=`cat ./gateway/package.json | jq -r '.version'`

REGISTRY="127.0.0.1:15000"
ORIGIN_TAG=fullstack_gateway:${VERSION}
REGISTRY_TAG=${REGISTRY}/fullstack/gateway:${VERSION}

# prepare docker context
rm -rf ./docker
mkdir -p ./docker/context # since docker COPY command can only copy files & sub dirs of a source dir rather than the source dir itself, so ./docker/context is the actual context dir
mkdir -p ./docker/context/logs # business logs
mkdir -p ./docker/context/pm2  # pm2 logs

rsync -av \
    gateway \
    ./docker/context \
    --exclude node_modules \
    --exclude build \
    --exclude Dockerfile \
    --exclude README.md

cp ./fullstack.container.yml ./docker/context
mv ./docker/context/fullstack.container.yml ./docker/context/fullstack.yml

# build image
docker build \
    --no-cache \
    --tag ${ORIGIN_TAG} \
    --file ./gateway/Dockerfile \
    ./docker

# remove images without tags
docker rmi $(docker images | awk '/^<none>/ {print $3}')

# remove tmp file
rm -rf ./docker

# push image
docker tag ${ORIGIN_TAG} ${REGISTRY_TAG}
docker push ${REGISTRY_TAG}
