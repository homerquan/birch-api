'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Seed database on startup
  seedDB: true,

  // Server port
    port: process.env.PORT || 8803,

  mongo: {
    uri: 'mongodb://localhost/convospot-console-api',
  },

  grpc: {
    conn: "localhost:8980",
        server: "0.0.0.0:8982"
    },

  apiHost: 'api.reflen.com',

  apiPort: '8801',

  graphqlSubscriptionsHost: 'console-api.reflen.com',

  logLvl: 'debug',

  hashSalt: 'ilikeconvospot',

  amqpConn: 'amqp://guest:guest@localhost:5672/seneca',
};