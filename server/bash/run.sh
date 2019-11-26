#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/..

HOST_IP=`ifconfig en0 | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p'`

function container() {
    docker network create fullstack

#    docker run -it -d \
#        --name fullstack_server \
#        --network fullstack \
#        -p 50051:50051 \
#        -v ${FULLPATH}/../../fullstack.container.yml:/app/fullstack.yml \
#        fullstack_server:0.0.1
}

function raw() {
    SERVICE_HOST=${HOST_IP} \
    CONSUL_HOST=127.0.0.1 \
    CONSUL_PORT=18500 \
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
