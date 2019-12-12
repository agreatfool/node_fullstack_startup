#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEPATH="${FULLPATH}/.."
cd ${BASEPATH}

# For local app testing usage, since even apps running locally, they need consul services

CONF="${BASEPATH}/vendor/docker/compose-consul.yml"

function start() {
    docker-compose -f ${CONF} -p "consul" \
        up -d
}

function stop() {
    docker-compose -f ${CONF} -p "consul" \
        down
}

function clear() {
    docker-compose -f ${CONF} -p "consul" \
        down -v
}

function restart() {
    docker-compose -f ${CONF} -p "consul" \
        restart $1
}

function usage() {
    echo "Usage: consul.sh start|stop|clear|restart"
}

if [[ $1 != "start" ]] && [[ $1 != "stop" ]] && [[ $1 != "clear" ]] && [[ $1 != "restart" ]]; then
    usage
    exit 0
fi

eval $1 $2
