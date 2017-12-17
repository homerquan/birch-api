/**
 * Bacnkend
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */

import express from 'express';
import expressGraphQL from "express-graphql";
import config from './config/environment';
import cors from 'cors';
import $ from './libs/dollar';
import {init as initSocketio} from './config/socketio';
import {init as initExpress} from './config/express';
import {load as loadRoutes} from './routes';
import { PubSub } from "graphql-subscriptions";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import schema from '../gql/schema';

// register app with backend
const backend = (app, server) => {

	// Connect to MongoDB
	$['mg'].connect(config.mongo.uri, config.mongo.options);
	$['mg'].connection.on('error', function(err) {
		console.error('MongoDB connection error: ' + err);
		process.exit(-1);
	});

	// Populate databases with sample data
	if (config.env === 'development' && config.seedDB) {
		require('./config/seed');
	}

	// socketio server
	const socketio = require('socket.io')(server, {
	    serveClient: config.env !== 'production',
	    path: '/socket.io-client'
	  });
	
	// Register API middleware
	// -----------------------------------------------------------------------------
	const graphqlMiddleware = expressGraphQL(req => ({
		schema,
		graphiql: true,
		rootValue: { request: req },
		pretty: true
	}));

	app.use("/graphql", graphqlMiddleware);

	const subscriptionServer = SubscriptionServer.create(
		{
			schema,
			execute,
			subscribe
		},
		{
			server: server,
			path: "/graphql"
		}
	);

	initSocketio(socketio.of(config.socketNamespace));
	initExpress(app);
	loadRoutes(app);

};



export default backend;