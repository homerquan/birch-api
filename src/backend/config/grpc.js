// gRPC server
import config from "./environment";
const grpc = require("grpc");
const messages = require("../grpc/engine/input_pb");
const services = require("../grpc/engine/input_grpc_pb");
const grpcExectuter = require("../grpc/executer");

// server
const engineOutputService = grpc.load(
	__dirname + "/../grpc/engine/output.proto"
).output;

// client
const client = new services.CommandsClient(
	config.grpc.conn,
	grpc.credentials.createInsecure()
);

function getResponse(request, cb) {
	grpcExectuter(request, cb);
}

function ask(call, cb) {
	getResponse(call.request, cb);
}

function getServer() {
	const server = new grpc.Server();
	server.addProtoService(engineOutputService.Commands.service, {
		ask: ask
	});
	return server;
}

var apiGrpcServer = getServer();

const init = () => {
	apiGrpcServer.bind(
		config.grpc.server,
		grpc.ServerCredentials.createInsecure()
	);
	console.log(`Listening gRPC service at ${config.grpc.server}`);
	apiGrpcServer.start();
};

// Send as client 
const send = function(req, cb) {
	let request = new messages.Request();
	request.setMessage(req.message || "");
	request.setTypecode(req.typeCode || 0);
	request.setType(req.type || "");
	request.setData(req.data || {});
	client.ask(request, cb);
};

export { init, send };
