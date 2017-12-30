/*
* @Author: Homer
* @Date:   2017-12-29 19:19:03
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-29 19:58:31
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
		uri: 'mongodb://localhost/convospot-console-api-dev',
	},

	apiHost: 'localhost',

	apiPort: '8101',

	logLvl: 'debug',

	hashSalt: 'ilikeconvospot',

	amqpConn: 'amqp://guest:guest@localhost:5672/seneca',

};