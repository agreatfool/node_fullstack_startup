FROM fullstack_builder:0.0.1 as builder

WORKDIR /opt/server

COPY ./context ./

RUN cd common && \
    ./bash/proto.sh && \
    npm i --only=prod --unsafe-perm --loglevel verbose && \
    tsc && \
    cd ../server && \
    ./bash/update_common.sh && \
    npm i --only=prod --unsafe-perm --loglevel verbose && \
    tsc && \
    cd .. && \
    rm -rf ./common && \
    pwd && \
    ls -l

FROM node:10.16.3-alpine

WORKDIR /app

RUN npm i pm2 -g --unsafe-perm

COPY --from=builder /opt/server .

ENTRYPOINT ["pm2", "start", "./server/build/index.js"]
