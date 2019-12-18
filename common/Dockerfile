ARG REGISTRY
ARG BUILDER_VER

FROM $REGISTRY/fullstack/builder:$BUILDER_VER as builder

WORKDIR /opt/common

COPY ./context ./

RUN cd common && \
    yarn install --verbose && \
    ./bash/proto.sh && \
    tsc && \
    ls -l && \
    ls -l node_modules
