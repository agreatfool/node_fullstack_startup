FROM fullstack_common:0.0.1 as builder

WORKDIR /opt/server

COPY ./context ./

RUN cp -r /opt/common/common ./ && \
    cd server && \
    echo "server: start update_common.sh ..." && \
    ./bash/update_common.sh && \
    echo "server: start yarn install ..." && \
    yarn install && \
    echo "server: start tsc ..." && \
    tsc && \
    cd .. && rm -rf ./common && \
    pwd && \
    ls -l && \
    ls -l ./server/node_modules

FROM fullstack_runner:0.0.1

WORKDIR /app

COPY --from=builder /opt/server .

ENTRYPOINT ["pm2", "start", "./server/build/index.js"]
