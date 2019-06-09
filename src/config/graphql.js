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
    context: {
      user: req.user,
    },
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
  new SubscriptionServer(
    {
      schema,
      execute,
      subscribe,
      onConnect: (connectionParams, webSocket, context) => {
        if (connectionParams.token) {
          const decoded = verifyToken(connectionParams.token);
          webSocket.decodedToken = decoded;
          context.user = decoded;
          onConnect(decoded);
        } else {
          $.log.error('No token in socket connecting.');
          return false;
        }
      },
      onDisconnect: (webSocket, context) => {
        onDisconnect(webSocket.decodedToken);
        $.log.info('Disconnected websocket.');
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
