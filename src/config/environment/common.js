// shared configurations for all env
const path = require('path');
module.exports = {
  env: process.env.NODE_ENV,
  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),
  // Server IP
  ip: process.env.IP || '0.0.0.0',
  // GraphQL
  graphqlSubscriptionsProtocol: 'ws://',
  graphqlPath: '/graphql',
  graphqlDevPath: '/playground',
  graphqlSubscriptionsPath: '/graphql-subscriptions',
  // Seneca microservcies
  amqpConn: 'amqp://guest:guest@localhost:5672/seneca',
  // Should we populate the DB with sample data?
  seedDB: false,
  // Secret for session, you will want to change this and make it an environment variable
  // In prod env, changed regularly for safety
  secrets: {
    session:
      process.env.JWT_SECRETS || '08f1af67cddd127b6f2122ce7a05cf5ef171c199a350687d3c8d8ed62b03642c',
  },
  passwordIterations: 10000,
  passwordKeyLength: 64,
  passwordDigest: 'sha512',
  appTokenSize: 16,
  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true,
      },
    },
  },
  verificationExpire: '24h',
  verificationTokenSize: 64,
  loginTokenExpireIn: '24h',
  refreshTokenExpireIn: '96h',
};
