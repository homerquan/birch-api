"use strict";

// Production specific configuration
// =================================
module.exports = {
  // Seed database on startup
  seedDB: true,

  // Server port
  port: process.env.PORT || 8080,

  mongo: {
    uri:
      "mongodb://reflen-admin:FhiRqAkF9JuVAjvBDzbNFX0W9o0@mongodb-0.internal.rl.business:27017,mongodb-1.internal.rl.business:27017,mongodb-2.internal.rl.business/reflen-console?replicaSet=rs0"
  },

  grpc: {
    conn: "localhost:8980",
    server: "0.0.0.0:8982"
  },

  apiHost: "api.rl.business",

  apiPort: "8080",

  graphqlProtocol: "wss://",

  graphqlSubscriptionsHost: "console-api.rl.business",

  logLvl: "debug",

  hashSalt:
    "uiMOrtjSHOPzjATFn63teax1l9Q8jV/yOgiXTndQtQcm1cSxSx7rCrHHFdKtl9SE QmGG7V9OjX20B53b/92JUZW1CbD0qhqnwRRs7neDtvBF56xhnafsNutg3dAzTnUf FNi28YxaFWbH40ilXDS7eCkQOXdpuxB3YNTnXLFY/d0=",
  amqpConn: "amqp://user:nfbgFnYXt9bF@rabbitmq.internal.rl.business:5672/seneca"
};
