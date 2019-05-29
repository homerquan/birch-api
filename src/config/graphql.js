import expressGraphQL from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import bodyParser from 'body-parser';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
// import resolvers from '../graphql/resolvers';
// import typeDefs from '../graphql/schema';
import jwt from 'jsonwebtoken';
import schema from '../graphql/schema';
import $ from '../libs/dollar';

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
    },
    {
      server,
      path: $.config.graphqlSubscriptionsPath,
    }
  );

  $.log.info(`GraphQL Subscriptions are now running on ${$.config.graphqlSubscriptionsPath}`);
};

export { init };
