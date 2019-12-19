#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/..

yarn install

MOCHA=./node_modules/mocha/bin/mocha

${MOCHA} -r ts-node/register "./test/**/*.spec.ts"
