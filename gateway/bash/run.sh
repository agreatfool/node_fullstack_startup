#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/..

HTTP_HOST="0.0.0.0" HTTP_PORT="3000" TEST_HOST="127.0.0.1" node ./build/index.js
