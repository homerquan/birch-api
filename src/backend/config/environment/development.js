'use strict';

// Development specific configuration
// ==================================
module.exports = {

	// Seed database on startup
	seedDB: true,

	// Server port
    port: process.env.PORT || 8003,

	mongo: {
		uri: 'mongodb://localhost/convospot-console-api',
	},

	apiHost: 'localhost',

	apiPort: '8001',

	logLvl: 'debug',

	hashSalt: 'ilikeconvospot',

	amqpConn: 'amqp://guest:guest@localhost:5672/seneca',

};