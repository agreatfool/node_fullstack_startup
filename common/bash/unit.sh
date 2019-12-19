#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEPATH=${FULLPATH}/..
cd ${BASEPATH}

# install packages & run tests
yarn install --verbose && ./node_modules/mocha/bin/mocha -r ts-node/register "./test/**/*.spec.ts"
