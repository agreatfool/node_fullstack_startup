// package: com.api
// file: api.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as api_pb from "./api_pb";

interface IApiService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUser: IApiService_IGetUser;
    getUserWithSkills: IApiService_IGetUserWithSkills;
    createUser: IApiService_ICreateUser;
    createUserWithSkills: IApiService_ICreateUserWithSkills;
    updateUser: IApiService_IUpdateUser;
    getSkill: IApiService_IGetSkill;
    getSkills: IApiService_IGetSkills;
    updateSkill: IApiService_IUpdateSkill;
}

interface IApiService_IGetUser extends grpc.MethodDefinition<api_pb.GetUserReq, api_pb.User> {
    path: string; // "/com.api.Api/GetUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.GetUserReq>;
    requestDeserialize: grpc.deserialize<api_pb.GetUserReq>;
    responseSerialize: grpc.serialize<api_pb.User>;
    responseDeserialize: grpc.deserialize<api_pb.User>;
}
interface IApiService_IGetUserWithSkills extends grpc.MethodDefinition<api_pb.GetUserReq, api_pb.GetUserWithSkillsRes> {
    path: string; // "/com.api.Api/GetUserWithSkills"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.GetUserReq>;
    requestDeserialize: grpc.deserialize<api_pb.GetUserReq>;
    responseSerialize: grpc.serialize<api_pb.GetUserWithSkillsRes>;
    responseDeserialize: grpc.deserialize<api_pb.GetUserWithSkillsRes>;
}
interface IApiService_ICreateUser extends grpc.MethodDefinition<api_pb.User, api_pb.User> {
    path: string; // "/com.api.Api/CreateUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.User>;
    requestDeserialize: grpc.deserialize<api_pb.User>;
    responseSerialize: grpc.serialize<api_pb.User>;
    responseDeserialize: grpc.deserialize<api_pb.User>;
}
interface IApiService_ICreateUserWithSkills extends grpc.MethodDefinition<api_pb.CreateUserReq, api_pb.User> {
    path: string; // "/com.api.Api/CreateUserWithSkills"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.CreateUserReq>;
    requestDeserialize: grpc.deserialize<api_pb.CreateUserReq>;
    responseSerialize: grpc.serialize<api_pb.User>;
    responseDeserialize: grpc.deserialize<api_pb.User>;
}
interface IApiService_IUpdateUser extends grpc.MethodDefinition<api_pb.User, api_pb.User> {
    path: string; // "/com.api.Api/UpdateUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.User>;
    requestDeserialize: grpc.deserialize<api_pb.User>;
    responseSerialize: grpc.serialize<api_pb.User>;
    responseDeserialize: grpc.deserialize<api_pb.User>;
}
interface IApiService_IGetSkill extends grpc.MethodDefinition<api_pb.GetSkillReq, api_pb.Skill> {
    path: string; // "/com.api.Api/GetSkill"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.GetSkillReq>;
    requestDeserialize: grpc.deserialize<api_pb.GetSkillReq>;
    responseSerialize: grpc.serialize<api_pb.Skill>;
    responseDeserialize: grpc.deserialize<api_pb.Skill>;
}
interface IApiService_IGetSkills extends grpc.MethodDefinition<api_pb.GetSkillsReq, api_pb.GetSkillsRes> {
    path: string; // "/com.api.Api/GetSkills"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.GetSkillsReq>;
    requestDeserialize: grpc.deserialize<api_pb.GetSkillsReq>;
    responseSerialize: grpc.serialize<api_pb.GetSkillsRes>;
    responseDeserialize: grpc.deserialize<api_pb.GetSkillsRes>;
}
interface IApiService_IUpdateSkill extends grpc.MethodDefinition<api_pb.UpdateSkillReq, api_pb.Skill> {
    path: string; // "/com.api.Api/UpdateSkill"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.UpdateSkillReq>;
    requestDeserialize: grpc.deserialize<api_pb.UpdateSkillReq>;
    responseSerialize: grpc.serialize<api_pb.Skill>;
    responseDeserialize: grpc.deserialize<api_pb.Skill>;
}

export const ApiService: IApiService;

export interface IApiServer {
    getUser: grpc.handleUnaryCall<api_pb.GetUserReq, api_pb.User>;
    getUserWithSkills: grpc.handleUnaryCall<api_pb.GetUserReq, api_pb.GetUserWithSkillsRes>;
    createUser: grpc.handleUnaryCall<api_pb.User, api_pb.User>;
    createUserWithSkills: grpc.handleUnaryCall<api_pb.CreateUserReq, api_pb.User>;
    updateUser: grpc.handleUnaryCall<api_pb.User, api_pb.User>;
    getSkill: grpc.handleUnaryCall<api_pb.GetSkillReq, api_pb.Skill>;
    getSkills: grpc.handleUnaryCall<api_pb.GetSkillsReq, api_pb.GetSkillsRes>;
    updateSkill: grpc.handleUnaryCall<api_pb.UpdateSkillReq, api_pb.Skill>;
}

export interface IApiClient {
    getUser(request: api_pb.GetUserReq, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    getUser(request: api_pb.GetUserReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    getUser(request: api_pb.GetUserReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    getUserWithSkills(request: api_pb.GetUserReq, callback: (error: grpc.ServiceError | null, response: api_pb.GetUserWithSkillsRes) => void): grpc.ClientUnaryCall;
    getUserWithSkills(request: api_pb.GetUserReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.GetUserWithSkillsRes) => void): grpc.ClientUnaryCall;
    getUserWithSkills(request: api_pb.GetUserReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.GetUserWithSkillsRes) => void): grpc.ClientUnaryCall;
    createUser(request: api_pb.User, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    createUser(request: api_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    createUser(request: api_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    createUserWithSkills(request: api_pb.CreateUserReq, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    createUserWithSkills(request: api_pb.CreateUserReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    createUserWithSkills(request: api_pb.CreateUserReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    updateUser(request: api_pb.User, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    updateUser(request: api_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    updateUser(request: api_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    getSkill(request: api_pb.GetSkillReq, callback: (error: grpc.ServiceError | null, response: api_pb.Skill) => void): grpc.ClientUnaryCall;
    getSkill(request: api_pb.GetSkillReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.Skill) => void): grpc.ClientUnaryCall;
    getSkill(request: api_pb.GetSkillReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.Skill) => void): grpc.ClientUnaryCall;
    getSkills(request: api_pb.GetSkillsReq, callback: (error: grpc.ServiceError | null, response: api_pb.GetSkillsRes) => void): grpc.ClientUnaryCall;
    getSkills(request: api_pb.GetSkillsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.GetSkillsRes) => void): grpc.ClientUnaryCall;
    getSkills(request: api_pb.GetSkillsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.GetSkillsRes) => void): grpc.ClientUnaryCall;
    updateSkill(request: api_pb.UpdateSkillReq, callback: (error: grpc.ServiceError | null, response: api_pb.Skill) => void): grpc.ClientUnaryCall;
    updateSkill(request: api_pb.UpdateSkillReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.Skill) => void): grpc.ClientUnaryCall;
    updateSkill(request: api_pb.UpdateSkillReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.Skill) => void): grpc.ClientUnaryCall;
}

export class ApiClient extends grpc.Client implements IApiClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getUser(request: api_pb.GetUserReq, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public getUser(request: api_pb.GetUserReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public getUser(request: api_pb.GetUserReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public getUserWithSkills(request: api_pb.GetUserReq, callback: (error: grpc.ServiceError | null, response: api_pb.GetUserWithSkillsRes) => void): grpc.ClientUnaryCall;
    public getUserWithSkills(request: api_pb.GetUserReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.GetUserWithSkillsRes) => void): grpc.ClientUnaryCall;
    public getUserWithSkills(request: api_pb.GetUserReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.GetUserWithSkillsRes) => void): grpc.ClientUnaryCall;
    public createUser(request: api_pb.User, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public createUser(request: api_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public createUser(request: api_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public createUserWithSkills(request: api_pb.CreateUserReq, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public createUserWithSkills(request: api_pb.CreateUserReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public createUserWithSkills(request: api_pb.CreateUserReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public updateUser(request: api_pb.User, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public updateUser(request: api_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public updateUser(request: api_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.User) => void): grpc.ClientUnaryCall;
    public getSkill(request: api_pb.GetSkillReq, callback: (error: grpc.ServiceError | null, response: api_pb.Skill) => void): grpc.ClientUnaryCall;
    public getSkill(request: api_pb.GetSkillReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.Skill) => void): grpc.ClientUnaryCall;
    public getSkill(request: api_pb.GetSkillReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.Skill) => void): grpc.ClientUnaryCall;
    public getSkills(request: api_pb.GetSkillsReq, callback: (error: grpc.ServiceError | null, response: api_pb.GetSkillsRes) => void): grpc.ClientUnaryCall;
    public getSkills(request: api_pb.GetSkillsReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.GetSkillsRes) => void): grpc.ClientUnaryCall;
    public getSkills(request: api_pb.GetSkillsReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.GetSkillsRes) => void): grpc.ClientUnaryCall;
    public updateSkill(request: api_pb.UpdateSkillReq, callback: (error: grpc.ServiceError | null, response: api_pb.Skill) => void): grpc.ClientUnaryCall;
    public updateSkill(request: api_pb.UpdateSkillReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.Skill) => void): grpc.ClientUnaryCall;
    public updateSkill(request: api_pb.UpdateSkillReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.Skill) => void): grpc.ClientUnaryCall;
}
