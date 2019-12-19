#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEPATH=${FULLPATH}/..
cd ${BASEPATH}

# means this testing running in the drone env, need to handle common lib cloning
if [[ ! -d "../common" ]];then
    GITEA_USER="root"
    GITEA_URL="127.0.0.1:13000"
    TOKEN="752e305de4936a769d2ed962b3e019f8866e510a"

    COMMON_VER=`cat ./docker_dep.json | jq -r '.common'`

    git clone http://${GITEA_USER}:${TOKEN}@${GITEA_URL}/fullstack/common.git ../common
    cd ../common
    git checkout "v${COMMON_VER}"
    yarn install --verbose
    cd ${BASEPATH}
fi

# install packages & run tests
yarn install --verbose && ./node_modules/mocha/bin/mocha -r ts-node/register "./test/**/*.spec.ts"
