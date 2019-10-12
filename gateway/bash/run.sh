#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/..

HTTP_HOST="0.0.0.0" HTTP_PORT="3000" node ./build/index.js
