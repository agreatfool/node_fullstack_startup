#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEPATH="${FULLPATH}/.."
cd ${BASEPATH}

CONF="${BASEPATH}/vendor/docker/develop-compose.yml"

HOST_IP=`ifconfig en0 | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p'`

export BASEPATH=${BASEPATH}
export COMMON_VERSION=`cat ./common/package.json | jq -r '.version'`
export GATEWAY_VERSION=`cat ./gateway/package.json | jq -r '.version'`
export SERVER_VERSION=`cat ./server/package.json | jq -r '.version'`

# jenkins login: admin abc123_
# gitea login: root Abcd1234_

function start() {
    docker-compose \
        -f ${CONF} -p "localbuild" up -d
}

function stop() {
    docker-compose \
        -f ${CONF} -p "localbuild" down
}

function clear() {
    docker-compose \
        -f ${CONF} -p "localbuild" down -v
}

function rebuild() {
    docker-compose \
        -f ${CONF} -p "localbuild" up -d $1
}

function restart() {
    docker-compose \
        -f ${CONF} -p "localbuild" restart $1
}

function usage() {
    echo "Usage: develop.sh start|stop|clear|mysql|restart|rebuild"
}

if [[ $1 != "start" ]] && [[ $1 != "stop" ]] && [[ $1 != "clear" ]] && [[ $1 != "mysql" ]] && [[ $1 != "restart" ]] && [[ $1 != "rebuild" ]]; then
    usage
    exit 0
fi

eval $1 $2
