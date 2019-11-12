FROM fullstack_common:0.0.1 as builder

WORKDIR /opt/gateway

COPY ./context ./

RUN cp -r /opt/common/common ./ && \
    cd gateway && \
    echo "gateway: start update_common.sh ..." && \
    ./bash/update_common.sh && \
    echo "gateway: start yarn install ..." && \
    yarn install && \
    echo "gateway: start tsc ..." && \
    tsc && \
    cd .. && rm -rf ./common && \
    pwd

FROM fullstack_runner:0.0.1

WORKDIR /app

COPY --from=builder /opt/gateway .

RUN cd gateway && \
    echo "gateway: npm rebuild for common/grpc" && \
    npm rebuild --loglevel verbose && cd .. && \
    ls -l && \
    ls -l ./gateway/node_modules

#ENTRYPOINT ["pm2", "start", "./gateway/build/index.js"]
ENTRYPOINT ["node", "./gateway/build/index.js"]
