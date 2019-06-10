import expressGraphQL from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import bodyParser from 'body-parser';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { verifyToken } from '../auth/auth-service';
import schema from '../graphql/schema';
import * as socketLogic from '../libs/socket-logic';
import $ from '../libs/dollar';

// When the user disconnects.. perform this
const onDisconnect = socket => {
  socketLogic.disconnect(socket);
};

// When the user connects.. perform this
const onConnect = socket => {
  // Insert sockets below
  socketLogic.connect(socket);
};

const init = (app, server) => {
  // Register API middleware
  const graphqlMiddleware = expressGraphQL(req => ({
    schema,
    rootValue: { request: req },
    subscriptionsEndpoint: $.config.graphqlSubscriptionsPath,
  }));

  app.use($.config.graphqlPath, graphqlMiddleware);

  $.log.info(`GraphQL Server is now running on ${$.config.graphqlPath}`);

  // Add graphiql dev console
  app.use(
    $.config.graphqlDevPath,
    bodyParser.json(),
    expressPlayground({
      endpoint: $.config.graphqlPath,
      subscriptionEndpoint:
        $.config.graphqlSubscriptionsProtocol +
        $.config.graphqlSubscriptionsHost +
        $.config.graphqlSubscriptionsPath,
    })
  );

  $.log.info(`GraphQL Interactive Console is now running on ${$.config.graphqlDevPath}`);

  // GraphQL subscription
  // create subscription server
  const subscriptionServer = new SubscriptionServer(
    {
      schema,
      execute,
      subscribe,
      onConnect: (connectionParams, webSocket) => {
        if (connectionParams.token) {
          const decoded = verifyToken(connectionParams.token);
          webSocket.decodedToken = decoded;
          onConnect(decoded);
          return true;
        }
        $.log.error('No token in socket connecting.');
        return false;
      },
      onDisconnect: webSocket => {
        onDisconnect(webSocket.decodedToken);
      },
      onOperation: (message, params, webSocket) => {
        return {
          ...params,
          context: {
            user: webSocket.decodedToken, // This is important! used by subscription filters
          },
        };
      },
    },
    {
      server,
      path: $.config.graphqlSubscriptionsPath,
    }
  );

  $.log.info(`GraphQL Subscriptions are now running on ${$.config.graphqlSubscriptionsPath}`);
};

export { init };
