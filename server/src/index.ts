#!/usr/bin/env node

import "reflect-metadata";
import * as LibPath from "path";
import {Config, Database, grpc, GrpcPb, typeorm} from "common";
import {ApiServiceImpl} from "./service/api";
import {Logger} from "./logger/logger";

const startServer = async () => {
    // init system
    Config.get(LibPath.join(__dirname, "..", "..", "fullstack.yml"));
    await typeorm.createConnection(Database.getConnectionOptions());
    Logger.get();

    // start server
    const server = new grpc.Server();

    server.addService(GrpcPb.ApiService, new ApiServiceImpl());
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();

    console.log("Server started, listening: 127.0.0.1:50051");
};

startServer().then((_) => _).catch();

process.on("uncaughtException", (err: Error) => {
    console.log(`process on uncaughtException error: ${err}`);
});

process.on("unhandledRejection", (err: Error) => {
    console.log(`process on unhandledRejection error: ${err}`);
});
