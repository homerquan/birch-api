/*
* @Author: Homer
* @Date:   2017-12-29 19:19:03
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-07 20:13:42
*/
'use strict';

// Development specific configuration
// ==================================
module.exports = {

	// Seed database on startup
	seedDB: true,

	// Server port
    port: process.env.PORT || 8103,

	mongo: {
		uri: 'mongodb://localhost/convospot-console-api',
	},

	grpc: {
		conn: "localhost:8980",
        server: "0.0.0.0:8982"
    },

	apiHost: 'api.stage.reflen.com',

	apiPort: '8101',

	graphqlSubscriptionsHost: 'console-api.stage.reflen.com',

	logLvl: 'debug',

	hashSalt: 'ilikeconvospot',

	amqpConn: 'amqp://guest:guest@localhost:5672/seneca',

};