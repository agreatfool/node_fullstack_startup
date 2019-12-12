#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEPATH="${FULLPATH}/.."
cd ${BASEPATH}

CONF="${BASEPATH}/vendor/docker/compose-local-build.yml"

export BASEPATH=${BASEPATH}

REGISTRY_USER="test"
REGISTRY_PWD="abc123_"

# jenkins login: admin abc123_
# gitea login: root Abcd1234_
# registry login: 127.0.0.1:15000 test abc123_

function start() {
    mkdir -p ${BASEPATH}/vendor/registry/data

    docker-compose -f ${CONF} -p "localbuild" \
        up -d
}

function stop() {
    if [[ ! -z $1 ]]; then
        docker-compose -f ${CONF} -p "localbuild" \
            rm -f -s $1
    else
        docker-compose -f ${CONF} -p "localbuild" \
            down
    fi
}

function clear() {
    if [[ ! -z $1 ]]; then
        docker-compose -f ${CONF} -p "localbuild" \
            rm -f -s -v $1
    else
        docker-compose -f ${CONF} -p "localbuild" \
            down -v
    fi
}

function rebuild() {
    docker-compose -f ${CONF} -p "localbuild" \
        up -d $1
}

function restart() {
    docker-compose -f ${CONF} -p "localbuild" \
        restart $1
}

function gen_registry_auth() {
    mkdir -p ${BASEPATH}/vendor/registry/auth

    docker run --rm \
        --entrypoint htpasswd \
        registry:2.7.1 \
        -Bbn ${REGISTRY_USER} ${REGISTRY_PWD} > ${BASEPATH}/vendor/registry/auth/htpasswd
}

function usage() {
    echo "Usage: local_build.sh start|stop|clear|restart|rebuild|gen_registry_auth"
}

if [[ $1 != "start" ]] && [[ $1 != "stop" ]] && [[ $1 != "clear" ]] && [[ $1 != "restart" ]] && [[ $1 != "rebuild" ]] && [[ $1 != "gen_registry_auth" ]]; then
    usage
    exit 0
fi

eval $1 $2
