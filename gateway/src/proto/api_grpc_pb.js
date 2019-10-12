// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var api_pb = require('./api_pb.js');

function serialize_com_api_GetUserReq(arg) {
  if (!(arg instanceof api_pb.GetUserReq)) {
    throw new Error('Expected argument of type com.api.GetUserReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_api_GetUserReq(buffer_arg) {
  return api_pb.GetUserReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_api_User(arg) {
  if (!(arg instanceof api_pb.User)) {
    throw new Error('Expected argument of type com.api.User');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_api_User(buffer_arg) {
  return api_pb.User.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  getUser: {
    path: '/com.api.UserService/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.GetUserReq,
    responseType: api_pb.User,
    requestSerialize: serialize_com_api_GetUserReq,
    requestDeserialize: deserialize_com_api_GetUserReq,
    responseSerialize: serialize_com_api_User,
    responseDeserialize: deserialize_com_api_User,
  },
  createUser: {
    path: '/com.api.UserService/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.User,
    responseType: api_pb.User,
    requestSerialize: serialize_com_api_User,
    requestDeserialize: deserialize_com_api_User,
    responseSerialize: serialize_com_api_User,
    responseDeserialize: deserialize_com_api_User,
  },
  updateUser: {
    path: '/com.api.UserService/UpdateUser',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.User,
    responseType: api_pb.User,
    requestSerialize: serialize_com_api_User,
    requestDeserialize: deserialize_com_api_User,
    responseSerialize: serialize_com_api_User,
    responseDeserialize: deserialize_com_api_User,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
