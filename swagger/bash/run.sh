#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/..

node build/index.js -s http://127.0.0.1:3000/swagger.json  -o ../client/src/api
