#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEPATH="${FULLPATH}/.."
cd ${BASEPATH}

GITEA_USER="root"
GITEA_PWD="Abcd1234_"
GITEA_URL="127.0.0.1:13000"
TOKEN="752e305de4936a769d2ed962b3e019f8866e510a"

function init() {
    if [[ ! -d ".git" ]]; then
        echo ".git not found, init ..."
        git init .
        git remote add origin http://${GITEA_USER}:${TOKEN}@${GITEA_URL}/fullstack/$1.git
        git config user.name "root"
        git config user.email "testmail@testmail.com"
    fi
}

function commit() {
    git add .
    git commit -m "Update."
}

function push() { # commit & push
    commit
    git push origin master --follow-tags --verbose
}

function version() { # commit & bump version & push
    commit
    npm version patch
    git push origin master --follow-tags --verbose
}

function tag() { # commit & bump version & create tag & push
    commit
    npm version patch
    VERSION=`cat ./package.json | jq -r '.version'`
    git tag ${VERSION}
    git push origin master --follow-tags --verbose
}

function clear() {
    rm -rf ./.git
}

function usage() {
    echo "Usage: git.sh push|version|tag|clear common|gateway|server"
}

if [[ $1 != "push" ]] && [[ $1 != "version" ]] && [[ $1 != "tag" ]] && [[ $1 != "clear" ]]; then
    usage
    exit 0
fi


if [[ $2 != "common" ]] && [[ $2 != "gateway" ]] && [[ $2 != "server" ]]; then
    usage
    exit 0
fi

cd "./$2"
init $2
eval $1 $2
