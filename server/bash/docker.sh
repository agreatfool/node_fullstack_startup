#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/../..

VERSION=`cat ./package.json | jq -r '.version'`

# prepare docker context
rm -rf ./docker
mkdir -p ./docker/context # since docker COPY command can only copy files & sub dirs of a source dir rather than the source dir itself, so ./docker/context is the actual context dir

rsync -av --progress \
    common \
    ./docker/context \
    --exclude node_modules \
    --exclude build \
    --exclude README.md

rsync -av --progress \
    server \
    ./docker/context \
    --exclude node_modules \
    --exclude build \
    --exclude Dockerfile \
    --exclude README.md

cp fullstack.container.yml ./docker/context
mv ./docker/context/fullstack.container.yml ./docker/context/fullstack.yml

mkdir -p ./docker/content/logs

# build image
docker build \
    --no-cache \
    --tag fulstack_server:${VERSION} \
    --file ./server/Dockerfile \
    ./docker

# remove images without tags
docker rmi $(docker images | awk '/^<none>/ {print $3}')

# remove tmp file
rm -rf ./docker
