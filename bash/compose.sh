#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEPATH="${FULLPATH}/.."
cd ${BASEPATH}

CONF="${BASEPATH}/vendor/docker/docker-compose.yml"

export BASEPATH="${FULLPATH}/.."

function start() {
    docker-compose -f ${CONF} -p "fullstack" up -d
}

function stop() {
    docker-compose -f ${CONF} -p "fullstack" down
}

function clear() {
    docker-compose -f ${CONF} -p "fullstack" down -v
}

function usage() {
    echo "Usage: compose.sh start|stop|clear"
}

if [[ $1 != "start" ]] && [[ $1 != "stop" ]] && [[ $1 != "clear" ]]; then
    usage
    exit 0
fi

eval $1
