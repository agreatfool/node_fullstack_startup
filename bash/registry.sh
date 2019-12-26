#!/usr/bin/env bash

REGISTRY="127.0.0.1:15000"
REGISTRY_USER="test"
REGISTRY_PWD="abc123_"

# /# /bin/registry garbage-collect /etc/docker/registry/config.yml

function catalog() {
    curl -u ${REGISTRY_USER}:${REGISTRY_PWD} http://${REGISTRY}/v2/_catalog | jq .
}

function tags() {
    curl -u ${REGISTRY_USER}:${REGISTRY_PWD} http://${REGISTRY}/v2/$1/tags/list | jq .
}

function digest() {
    curl -u ${REGISTRY_USER}:${REGISTRY_PWD} http://${REGISTRY}/v2/$1/manifests/$2 \
        --header "Accept: application/vnd.docker.distribution.manifest.v2+json" | jq '.config|.digest'
}

function delete() {
    curl -u ${REGISTRY_USER}:${REGISTRY_PWD} -I -X DELETE "http://${REGISTRY}/v2/$1/manifests/$2"
}

function usage() {
    echo "Usage: registry.sh catalog | tags \$repo_name | digest \$repo_name \$tag | delete \$repo_name \$digest"
}

if [[ $1 != "catalog" ]] && [[ $1 != "tags" ]] && [[ $1 != "digest" ]] && [[ $1 != "delete" ]]; then
    usage
    exit 0
fi

eval $1 $2 $3
