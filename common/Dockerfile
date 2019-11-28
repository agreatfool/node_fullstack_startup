FROM fullstack_builder:0.0.1 as builder

WORKDIR /opt/common

COPY ./context ./

RUN cd common && \
    yarn install --verbose && \
    ./bash/proto.sh && \
    tsc && \
    ls -l && \
    ls -l node_modules
