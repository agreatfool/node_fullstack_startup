#!/usr/bin/env bash

swagger-typescript-codegen-cli -s http://127.0.0.1:3000/swagger.json  -o ../client/src/api
