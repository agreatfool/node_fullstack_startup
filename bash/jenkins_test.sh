#!/usr/bin/env bash

FULLPATH="$( cd "$(dirname "$0")" ; pwd -P )"
BASEPATH="${FULLPATH}/.."
cd ${BASEPATH}

docker run -d --name jenkins_test \
    -p 18080:8080 \
    -p 50000:50000 \
    -v ${BASEPATH}/vendor/jenkins:/var/jenkins_home \
    jenkins/jenkins:2.190.3-alpine
