#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEPATH="${FULLPATH}/.."
cd ${BASEPATH}

CONF="${BASEPATH}/vendor/docker/docker-compose.yml"

export BASEPATH=${BASEPATH}
export MYSQL_PWD=abc123_
export GATEWAY_VERSION=`cat ./gateway/package.json | jq -r '.version'`
export SERVER_VERSION=`cat ./server/package.json | jq -r '.version'`

function start() {
    mkdir -p /tmp/logs/gateway
    mkdir -p /tmp/logs/server

    docker-compose \
        -f ${CONF} -p "fullstack" up -d
}

function stop() {
    docker-compose \
        -f ${CONF} -p "fullstack" down
}

function clear() {
    docker-compose \
        -f ${CONF} -p "fullstack" down -v
}

function mysql() {
    docker run --rm -it \
        --network fullstack_net \
        mysql:5.6.45 \
        mysql -hfullstack_mysql -uroot -p${MYSQL_PWD}
}

function usage() {
    echo "Usage: compose.sh start|stop|clear"
}

if [[ $1 != "start" ]] && [[ $1 != "stop" ]] && [[ $1 != "clear" ]]; then
    usage
    exit 0
fi

eval $1
