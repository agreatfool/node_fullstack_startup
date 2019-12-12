#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEPATH="${FULLPATH}/.."
cd ${BASEPATH}

function raw() {
    SERVICE_HOST=host.docker.internal \
    CONSUL_HOST=127.0.0.1 \
    CONSUL_PORT=18510 \
        node build/index.js
}

raw
