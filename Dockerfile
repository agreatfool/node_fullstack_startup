FROM node:10.16.3

WORKDIR /opt/builder

COPY ./context ./

RUN apt-get update && \
    apt-get -y install git unzip build-essential autoconf libtool

RUN git clone https://github.com/google/protobuf.git && \
    cd protobuf && \
    ./autogen.sh && \
    ./configure && \
    make && \
    make install && \
    ldconfig && \
    make clean && \
    cd .. && \
    rm -r protobuf

RUN npm i typescript -g --unsafe-perm && \
    npm i grpc-tools -g --unsafe-perm && \
    npm i yarn -g  --unsafe-perm
