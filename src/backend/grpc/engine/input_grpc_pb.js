// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var input_pb = require('./input_pb.js');

function serialize_input_Request(arg) {
  if (!(arg instanceof input_pb.Request)) {
    throw new Error('Expected argument of type input.Request');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_input_Request(buffer_arg) {
  return input_pb.Request.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_input_Response(arg) {
  if (!(arg instanceof input_pb.Response)) {
    throw new Error('Expected argument of type input.Response');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_input_Response(buffer_arg) {
  return input_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}


var CommandsService = exports.CommandsService = {
  say: {
    path: '/input.Commands/Say',
    requestStream: false,
    responseStream: false,
    requestType: input_pb.Request,
    responseType: input_pb.Response,
    requestSerialize: serialize_input_Request,
    requestDeserialize: deserialize_input_Request,
    responseSerialize: serialize_input_Response,
    responseDeserialize: deserialize_input_Response,
  },
  stream: {
    path: '/input.Commands/Stream',
    requestStream: true,
    responseStream: true,
    requestType: input_pb.Request,
    responseType: input_pb.Response,
    requestSerialize: serialize_input_Request,
    requestDeserialize: deserialize_input_Request,
    responseSerialize: serialize_input_Response,
    responseDeserialize: deserialize_input_Response,
  },
  ask: {
    path: '/input.Commands/Ask',
    requestStream: false,
    responseStream: false,
    requestType: input_pb.Request,
    responseType: input_pb.Response,
    requestSerialize: serialize_input_Request,
    requestDeserialize: deserialize_input_Request,
    responseSerialize: serialize_input_Response,
    responseDeserialize: deserialize_input_Response,
  },
};

exports.CommandsClient = grpc.makeGenericClientConstructor(CommandsService);
