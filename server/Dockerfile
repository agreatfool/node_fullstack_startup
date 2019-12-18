ARG REGISTRY
ARG COMMON_VER
ARG RUNNER_VER

FROM $REGISTRY/fullstack/common:$COMMON_VER as builder

WORKDIR /opt/server

COPY ./context ./

RUN cp -r /opt/common/common ./ && \
    cd server && \
    echo "server: start update_common.sh ..." && \
    ./bash/update_common.sh && \
    echo "server: start yarn install ..." && \
    yarn install --verbose && \
    echo "server: start tsc ..." && \
    tsc && \
    cd .. && rm -rf ./common && \
    pwd

FROM $REGISTRY/fullstack/runner:$RUNNER_VER

WORKDIR /app

COPY --from=builder /opt/server .

RUN cd server && \
    echo "server: npm rebuild for common/grpc" && \
    npm rebuild --loglevel verbose && cd .. && \
    ls -l && \
    ls -l ./server/node_modules

ENTRYPOINT ["pm2-runtime", "start", "./server/build/index.js"]
#ENTRYPOINT ["node", "./server/build/index.js"]
