// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var output_pb = require('./output_pb.js');

function serialize_output_Request(arg) {
  if (!(arg instanceof output_pb.Request)) {
    throw new Error('Expected argument of type output.Request');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_output_Request(buffer_arg) {
  return output_pb.Request.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_output_Response(arg) {
  if (!(arg instanceof output_pb.Response)) {
    throw new Error('Expected argument of type output.Response');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_output_Response(buffer_arg) {
  return output_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}


var CommandsService = exports.CommandsService = {
  ask: {
    path: '/output.Commands/Ask',
    requestStream: false,
    responseStream: false,
    requestType: output_pb.Request,
    responseType: output_pb.Response,
    requestSerialize: serialize_output_Request,
    requestDeserialize: deserialize_output_Request,
    responseSerialize: serialize_output_Response,
    responseDeserialize: deserialize_output_Response,
  },
};

exports.CommandsClient = grpc.makeGenericClientConstructor(CommandsService);
