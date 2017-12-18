// shared configurations for all env
const path = require('path');

module.exports = {

  env: process.env.NODE_ENV,

	// Root path of server
  root: path.normalize(`${__dirname}/../../..`),

	// Server port
  port: process.env.PORT || 3003,

	// Server IP
  ip: process.env.IP || '0.0.0.0',

  // Seneca microservcies
  amqpConn:  'amqp://guest:guest@localhost:5672/seneca',

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.CONSOLE_CLIENT_URL || `http://localhost:${process.env.PORT || 3000}`,
    // API URL to be used in the server-side code
    serverUrl: process.env.CONSOLE_SERVER_URL || '',
  },

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'convospot_secret' },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
    },

    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
    },
  },

	// Should we populate the DB with sample data?
  seedDB: false,

	// Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.JWT_SECRETS || '08f1af67cddd127b6f2122ce7a05cf5ef171c199a350687d3c8d8ed62b03642c',
  },

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

  facebook: {
    clientID: process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/facebook/callback`,
  },

  google: {
    clientID: process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/google/callback`,
  },

  // set open access endpoints (no need token, but limit rates)
  publicEndpoints: {
    GET: [
      '^/suggestion$',
      '^/file/',
    ],
    POST: [{
      path: '^/user/status$',
      query: {
        action: 'login',
      },
    }, {
      path: '^/user/status$',
      query: {
        action: 'refresh',
      },
    }, {
      path: '^/user/status$',
      query: {
        action: 'reset_password',
      },
    }, {
      path: '^/user/status$',
      query: {
        action: 'check_vtoken',
      },
    }, {
      path: '^/user/status$',
      query: {
        action: 'update_password',
      },
    },
      '^/user$',
      '^/test$',
    ],
    PATCH: [],
    PUT: [],
    DELETE: [],
  },

  loginTokenExpireIn: '24h',
};
