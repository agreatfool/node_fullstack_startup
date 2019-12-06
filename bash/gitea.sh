#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEPATH="${FULLPATH}/.."
cd ${BASEPATH}

GITEA_USER="root"
GITEA_PWD="Abcd1234_"
GITEA_URL="127.0.0.1:13000"
TOKEN_NAME="fullstack"
TOKEN="752e305de4936a769d2ed962b3e019f8866e510a"

# https://try.gitea.io/api/swagger#/

function init() {
    # common
    curl -X POST "http://${GITEA_URL}/api/v1/admin/users/fullstack/repos" \
        -H "accept: application/json" \
        -H "Authorization: token ${TOKEN}" \
        -H "Content-Type: application/json" -d "{ \"name\": \"common\", \"auto_init\": false, \"private\": true }"
    echo ""

    # gateway
    curl -X POST "http://${GITEA_URL}/api/v1/admin/users/fullstack/repos" \
        -H "accept: application/json" \
        -H "Authorization: token ${TOKEN}" \
        -H "Content-Type: application/json" -d "{ \"name\": \"gateway\", \"auto_init\": false, \"private\": true }"
    echo ""

    # server
    curl -X POST "http://${GITEA_URL}/api/v1/admin/users/fullstack/repos" \
        -H "accept: application/json" \
        -H "Authorization: token ${TOKEN}" \
        -H "Content-Type: application/json" -d "{ \"name\": \"server\", \"auto_init\": false, \"private\": true }"
    echo ""
}

function clear() {
    # common
    curl -X DELETE "http://${GITEA_URL}/api/v1/repos/fullstack/common" \
        -H "accept: application/json" \
        -H "Authorization: token ${TOKEN}"

    # gateway
    curl -X DELETE "http://${GITEA_URL}/api/v1/repos/fullstack/gateway" \
        -H "accept: application/json" \
        -H "Authorization: token ${TOKEN}"

    # server
    curl -X DELETE "http://${GITEA_URL}/api/v1/repos/fullstack/server" \
        -H "accept: application/json" \
        -H "Authorization: token ${TOKEN}"
}

function usage() {
    echo "Usage: gitea.sh init|clear"
}

if [[ $1 != "init" ]] && [[ $1 != "clear" ]]; then
    usage
    exit 0
fi

eval $1
