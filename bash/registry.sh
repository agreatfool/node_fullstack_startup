#!/usr/bin/env bash

REGISTRY="127.0.0.1:15000"
REGISTRY_USER="test"
REGISTRY_PWD="abc123_"

function catalog() {
    curl -u ${REGISTRY_USER}:${REGISTRY_PWD} http://${REGISTRY}/v2/_catalog
}

function tags() {
    curl -u ${REGISTRY_USER}:${REGISTRY_PWD} http://${REGISTRY}/v2/$1/tags/list
}

function usage() {
    echo "Usage: registry.sh catalog|tags"
}

if [[ $1 != "catalog" ]] && [[ $1 != "tags" ]]; then
    usage
    exit 0
fi

eval $1 $2
