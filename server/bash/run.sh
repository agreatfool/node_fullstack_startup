#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/..

function container() {
    docker network create fullstack

    docker run -it -d \
        --name fullstack_server \
        --network fullstack \
        -p 50051:50051 \
        -v ${FULLPATH}/../../fullstack.container.yml:/app/fullstack.yml \
        fullstack_server:0.0.1
}

function raw() {
    node build/index.js
}

function usage() {
    echo "Usage: run.sh container|raw"
}

if [[ $1 != "container" ]] && [[ $1 != "raw" ]]; then
    usage
    exit 0
fi

eval $1
