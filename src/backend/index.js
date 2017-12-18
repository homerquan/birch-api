/**
 * Bacnkend
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */

import express from "express";
import config from "./config/environment";
import cors from "cors";
import $ from "./libs/dollar";
import { init as initSocketio } from "./config/socketio";
import { init as initExpress } from "./config/express";
import { load as loadRoutes } from "./routes";
import expressGraphQL from "express-graphql";
import { PubSub } from "graphql-subscriptions";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schema.graphql";

// register app with backend
const backend = (app, server) => {
	// Connect to MongoDB
	$["mg"].connect(config.mongo.uri, config.mongo.options);
	$["mg"].connection.on("error", function(err) {
		console.error("MongoDB connection error: " + err);
		process.exit(-1);
	});

	// Populate databases with sample data
	if (config.env === "development" && config.seedDB) {
		require("./config/seed");
	}

	// make schema executable
	const schema = makeExecutableSchema({
		typeDefs,
		resolvers
	});

	// any additional context you use for your resolvers, if any
	const context = {};

	// Register API middleware
	const graphqlMiddleware = expressGraphQL(req => ({
		schema,
		graphiql: true,
		rootValue: { request: req },
		pretty: true,
		subscriptionsEndpoint: '/graphql-subscriptions'
	}));

	app.use("/graphql", graphqlMiddleware);

	// GraphQL subscription
	// create subscription server
	new SubscriptionServer(
		{
			schema,
			execute,
			subscribe
			// // on connect subscription lifecycle event
			// onConnect: async (connectionParams, webSocket) => {
			//   // if a meteor login token is passed to the connection params from the client,
			//   // add the current user to the subscription context
			//   const subscriptionContext = connectionParams.authToken
			//     ? await addCurrentUserToContext(context, connectionParams.authToken)
			//     : context;
			//   return subscriptionContext;
			// }
		},
		{
			server: server,
			path: "/graphql-subscriptions"
		}
	);

	// socketio server
	const socketio = require("socket.io")(server, {
		serveClient: config.env !== "production",
		path: "/socket.io-client"
	});

	initSocketio(socketio.of(config.socketNamespace));
	initExpress(app);
	loadRoutes(app);
};

export default backend;
