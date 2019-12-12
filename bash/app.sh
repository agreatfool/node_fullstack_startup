#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEPATH="${FULLPATH}/.."
cd ${BASEPATH}

CONF="${BASEPATH}/vendor/docker/compose-app.yml"

HOST_IP=`ifconfig en0 | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p'`

export BASEPATH=${BASEPATH}
export REGISTRY="127.0.0.1:15000"
export MYSQL_PWD=abc123_
export GATEWAY_VERSION=`cat ./gateway/package.json | jq -r '.version'`
export SERVER_VERSION=`cat ./server/package.json | jq -r '.version'`

CONSUL_SERVER_COUNT=3
CONSUL_CLIENT_COUNT=2

# consul commands:
# nodes:
#   list all: curl http://127.0.0.1:18500/v1/health/state/any | jq .
#   list all services: curl http://127.0.0.1:18500/v1/catalog/services | jq .
#   detail service: curl http://127.0.0.1:18500/v1/catalog/service/:service_name | jq .
# services:
#   list all: curl http://127.0.0.1:18500/v1/agent/services | jq .
#   detail: curl http://127.0.0.1:18500/v1/agent/service/:service_id | jq .
#   deregister: curl --request PUT http://127.0.0.1:18500/v1/agent/service/deregister/:service_id

function start() {
    mkdir -p /tmp/logs/gateway
    mkdir -p /tmp/logs/server

    docker-compose -f ${CONF} -p "fullstack" \
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
    docker-compose -f ${CONF} -p "fullstack" \
        up -d $1
}

function restart() {
    docker-compose -f ${CONF} -p "fullstack" \
        restart $1
}

function mysql_connect() {
    docker run --rm -it \
        --network fullstack_net \
        mysql:5.6.45 \
        mysql -hfullstack_mysql -uroot -p${MYSQL_PWD}
}

function template_test() {
    mkdir -p /tmp/template

    docker run --rm -it --name template1 \
        -v ${BASEPATH}/vendor/consul/nginx:/tmp/nginx.ctmpl \
        -v /tmp/template:/consul-template/data \
        hashicorp/consul-template:0.22.1-alpine \
        -dry -log-level=debug -consul-addr=${HOST_IP}:18500 \
        -consul-retry -consul-retry-attempts=5 -consul-retry-backoff=500ms \
        -template=/tmp/nginx.ctmpl:/consul-template/data/default.conf
}

function nginx_reload() {
    docker exec -it fullstack_nginx nginx -s reload
}

function generate_compose() {
    NL=$'\n'

    echo
}

function usage() {
    echo "Usage: app.sh start|stop|clear|rebuild|restart|mysql_connect|template_test|nginx_reload|generate_compose"
}

if [[ $1 != "start" ]] && [[ $1 != "stop" ]] && [[ $1 != "clear" ]] && [[ $1 != "rebuild" ]] && [[ $1 != "restart" ]] && [[ $1 != "mysql_connect" ]] && [[ $1 != "template_test" ]] && [[ $1 != "nginx_reload" ]] && [[ $1 != "generate_compose" ]]; then
    usage
    exit 0
fi

eval $1 $2
