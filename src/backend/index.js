/**
 * Bacnkend
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */

import express from 'express';
import config from './config/environment';
import cors from 'cors';
import $ from './libs/dollar';
import {init as initSocketio} from './config/socketio';
import {init as initExpress} from './config/express';
import {load as loadRoutes} from './routes';

// register app with backend
const backend = (app,socketio) => {

	// Connect to MongoDB
	$['mg'].connect(config.mongo.uri, config.mongo.options);
	$['mg'].connection.on('error', function(err) {
		console.error('MongoDB connection error: ' + err);
		process.exit(-1);
	});

	// Populate databases with sample data
	if (config.seedDB) {
		require('./config/seed');
	}

	initSocketio(socketio.of(config.socketNamespace));
	initExpress(app);
	loadRoutes(app);

};



export default backend;