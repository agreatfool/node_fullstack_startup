// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var api_pb = require('./api_pb.js');

function serialize_com_api_CreateUserReq(arg) {
  if (!(arg instanceof api_pb.CreateUserReq)) {
    throw new Error('Expected argument of type com.api.CreateUserReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_api_CreateUserReq(buffer_arg) {
  return api_pb.CreateUserReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_api_GetSkillsReq(arg) {
  if (!(arg instanceof api_pb.GetSkillsReq)) {
    throw new Error('Expected argument of type com.api.GetSkillsReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_api_GetSkillsReq(buffer_arg) {
  return api_pb.GetSkillsReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_api_GetSkillsRes(arg) {
  if (!(arg instanceof api_pb.GetSkillsRes)) {
    throw new Error('Expected argument of type com.api.GetSkillsRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_api_GetSkillsRes(buffer_arg) {
  return api_pb.GetSkillsRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_api_GetUserReq(arg) {
  if (!(arg instanceof api_pb.GetUserReq)) {
    throw new Error('Expected argument of type com.api.GetUserReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_api_GetUserReq(buffer_arg) {
  return api_pb.GetUserReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_api_GetUserWithSkillsRes(arg) {
  if (!(arg instanceof api_pb.GetUserWithSkillsRes)) {
    throw new Error('Expected argument of type com.api.GetUserWithSkillsRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_api_GetUserWithSkillsRes(buffer_arg) {
  return api_pb.GetUserWithSkillsRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_api_Skill(arg) {
  if (!(arg instanceof api_pb.Skill)) {
    throw new Error('Expected argument of type com.api.Skill');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_api_Skill(buffer_arg) {
  return api_pb.Skill.deserializeBinary(new Uint8Array(buffer_arg));
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


var ApiService = exports.ApiService = {
  getUser: {
    path: '/com.api.Api/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.GetUserReq,
    responseType: api_pb.User,
    requestSerialize: serialize_com_api_GetUserReq,
    requestDeserialize: deserialize_com_api_GetUserReq,
    responseSerialize: serialize_com_api_User,
    responseDeserialize: deserialize_com_api_User,
  },
  getUserWithSkills: {
    path: '/com.api.Api/GetUserWithSkills',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.GetUserReq,
    responseType: api_pb.GetUserWithSkillsRes,
    requestSerialize: serialize_com_api_GetUserReq,
    requestDeserialize: deserialize_com_api_GetUserReq,
    responseSerialize: serialize_com_api_GetUserWithSkillsRes,
    responseDeserialize: deserialize_com_api_GetUserWithSkillsRes,
  },
  createUser: {
    path: '/com.api.Api/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.User,
    responseType: api_pb.User,
    requestSerialize: serialize_com_api_User,
    requestDeserialize: deserialize_com_api_User,
    responseSerialize: serialize_com_api_User,
    responseDeserialize: deserialize_com_api_User,
  },
  createUserWithSkills: {
    path: '/com.api.Api/CreateUserWithSkills',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.CreateUserReq,
    responseType: api_pb.User,
    requestSerialize: serialize_com_api_CreateUserReq,
    requestDeserialize: deserialize_com_api_CreateUserReq,
    responseSerialize: serialize_com_api_User,
    responseDeserialize: deserialize_com_api_User,
  },
  updateUser: {
    path: '/com.api.Api/UpdateUser',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.User,
    responseType: api_pb.User,
    requestSerialize: serialize_com_api_User,
    requestDeserialize: deserialize_com_api_User,
    responseSerialize: serialize_com_api_User,
    responseDeserialize: deserialize_com_api_User,
  },
  getSkills: {
    path: '/com.api.Api/GetSkills',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.GetSkillsReq,
    responseType: api_pb.GetSkillsRes,
    requestSerialize: serialize_com_api_GetSkillsReq,
    requestDeserialize: deserialize_com_api_GetSkillsReq,
    responseSerialize: serialize_com_api_GetSkillsRes,
    responseDeserialize: deserialize_com_api_GetSkillsRes,
  },
  updateSkill: {
    path: '/com.api.Api/UpdateSkill',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.Skill,
    responseType: api_pb.Skill,
    requestSerialize: serialize_com_api_Skill,
    requestDeserialize: deserialize_com_api_Skill,
    responseSerialize: serialize_com_api_Skill,
    responseDeserialize: deserialize_com_api_Skill,
  },
};

exports.ApiClient = grpc.makeGenericClientConstructor(ApiService);
