#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd ${FULLPATH}/..

PROTO_DEST=./src/proto

mkdir -p ${PROTO_DEST}

# JavaScript code generating
grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${PROTO_DEST} \
    --grpc_out=${PROTO_DEST} \
    --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
    -I ./proto \
    proto/*.proto

protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=${PROTO_DEST} \
    -I ./proto \
    proto/*.proto

# TypeScript compiling
mkdir -p build/proto
cp -r ./src/proto/*.js build/proto
tsc
