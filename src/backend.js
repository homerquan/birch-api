/**
 * Bacnkend
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */

import express from "express";
import cors from "cors";
import $ from "./libs/dollar";
import { init as initSocketio } from "./config/socketio";
import { init as initExpress } from "./config/express";
import { init as initGraphQL } from "./config/graphql";
import { load as loadRoutes } from "./routes";

// register app with backend
const backend = (app, server) => {
	// Connect to MongoDB
	$["mg"].connect($["config"].mongo.uri, $["config"].mongo.options);
	$["mg"].connection.on("error", function(err) {
		console.error("MongoDB connection error: " + err);
		process.exit(-1);
	});

	// Populate databases with sample data
	if ($["config"].env === "development" && $["config"].seedDB) {
		require("./seed/seed");
	}

	// socketio server
	const socketio = require("socket.io")(server, {
		serveClient: $["config"].env !== "production",
		path: "/socket.io-client"
	});

	initSocketio(socketio.of($["config"].socketNamespace));
	initExpress(app);
	initGraphQL(app, server);
	loadRoutes(app);
};

export default backend;
