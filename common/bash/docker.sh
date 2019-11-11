#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/../..

VERSION=`cat ./gateway/package.json | jq -r '.version'`

# prepare docker context
rm -rf ./docker
mkdir -p ./docker/context # since docker COPY command can only copy files & sub dirs of a source dir rather than the source dir itself, so ./docker/context is the actual context dir

rsync -av \
    common \
    ./docker/context \
    --exclude node_modules \
    --exclude build \
    --exclude README.md

# build image
docker build \
    --no-cache \
    --tag fullstack_common:${VERSION} \
    --file ./common/Dockerfile \
    ./docker

# remove images without tags
docker rmi $(docker images | awk '/^<none>/ {print $3}')

# remove tmp file
rm -rf ./docker
