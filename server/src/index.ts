#!/usr/bin/env node

import "reflect-metadata";
import * as LibPath from "path";
import {Config, Database, grpc, GrpcPb, typeorm} from "common";
import {ApiServiceImpl} from "./service/api";
import {Logger} from "./logger/logger";

const startServer = async () => {
    // init system
    Config.get(LibPath.join(__dirname, "..", "..", "fullstack.yml"));
    await typeorm.createConnection(Object.assign({
        logger: Logger.createDbLogger(),
    }, Database.getConnectionOptions()));
    Logger.get();

    // start server
    const server = new grpc.Server();

    const host = Config.get().getRaw().server.httpHost;
    const port = Config.get().getRaw().server.httpPort;

    server.addService(GrpcPb.ApiService, new ApiServiceImpl());
    server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();

    console.log(`Server started, listening: ${host}:${port}`);
};

startServer().then((_) => _).catch();

process.on("uncaughtException", (err: Error) => {
    console.log(`process on uncaughtException error: ${err}`);
});

process.on("unhandledRejection", (err: Error) => {
    console.log(`process on unhandledRejection error: ${err}`);
});
