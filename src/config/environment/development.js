'use strict';

// Development specific configuration
// ==================================
module.exports = {

	// Seed database on startup
	seedDB: true,

	// Server port
    port: process.env.PORT || 8003,

	mongo: {
		uri: 'mongodb://localhost/reflen-console-api',
	},

	grpc: {
		conn: "localhost:8980",
        server: "0.0.0.0:8982"
    },

	apiHost: 'localhost',

	apiPort: '8001',

	graphqlSubscriptionsHost: 'localhost:' + (process.env.PORT || 8003),

	logLvl: 'debug',

	hashSalt: 'ilikeconvospot',

	amqpConn: 'amqp://guest:guest@localhost:5672/seneca',

};