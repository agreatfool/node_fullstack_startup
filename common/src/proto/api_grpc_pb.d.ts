// package: com.api
// file: api.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as api_pb from "./api_pb";

interface IUserServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUser: IUserServiceService_IGetUser;
    createUser: IUserServiceService_ICreateUser;
    updateUser: IUserServiceService_IUpdateUser;
}

interface IUserServiceService_IGetUser extends grpc.MethodDefinition<api_pb.GetUserReq, api_pb.User> {
    path: string; // "/com.api.UserService/GetUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.GetUserReq>;
    requestDeserialize: grpc.deserialize<api_pb.GetUserReq>;
    responseSerialize: grpc.serialize<api_pb.User>;
    responseDeserialize: grpc.deserialize<api_pb.User>;
}
interface IUserServiceService_ICreateUser extends grpc.MethodDefinition<api_pb.User, api_pb.User> {
    path: string; // "/com.api.UserService/CreateUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.User>;
    requestDeserialize: grpc.deserialize<api_pb.User>;
    responseSerialize: grpc.serialize<api_pb.User>;
    responseDeserialize: grpc.deserialize<api_pb.User>;
}
interface IUserServiceService_IUpdateUser extends grpc.MethodDefinition<api_pb.User, api_pb.User> {
    path: string; // "/com.api.UserService/UpdateUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.User>;
    requestDeserialize: grpc.deserialize<api_pb.User>;
    responseSerialize: grpc.serialize<api_pb.User>;
    responseDeserialize: grpc.deserialize<api_pb.User>;
}

export const UserServiceService: IUserServiceService;

export interface IUserServiceServer {
    getUser: grpc.handleUnaryCall<api_pb.GetUserReq, api_pb.User>;
    createUser: grpc.handleUnaryCall<api_pb.User, api_pb.User>;
    updateUser: grpc.handleUnaryCall<api_pb.User, api_pb.User>;
}

export interface IUserServiceClient {
    getUser(request: api_pb.GetUserReq, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    getUser(request: api_pb.GetUserReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    getUser(request: api_pb.GetUserReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    createUser(request: api_pb.User, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    createUser(request: api_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    createUser(request: api_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    updateUser(request: api_pb.User, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    updateUser(request: api_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    updateUser(request: api_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
}

export class UserServiceClient extends grpc.Client implements IUserServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getUser(request: api_pb.GetUserReq, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public getUser(request: api_pb.GetUserReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public getUser(request: api_pb.GetUserReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public createUser(request: api_pb.User, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public createUser(request: api_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public createUser(request: api_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public updateUser(request: api_pb.User, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public updateUser(request: api_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public updateUser(request: api_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
}
