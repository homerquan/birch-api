import config from "../config/environment";
import expressGraphQL from "express-graphql";
import { graphiqlExpress } = from 'graphql-server-express';
import bodyParser from 'body-parser';
import { PubSub } from "graphql-subscriptions";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/schema";

const colors = require('colors');


const init = (app,server) => {
	//Setup GRAPHQL 	
	// make schema executable
	const schema = makeExecutableSchema({
		typeDefs,
		resolvers
	});

	// any additional context you use for your resolvers, if any
	const context = {};

	// Register API middleware
	const graphqlMiddleware = expressGraphQL(req => ({
		schema,
		rootValue: { request: req },
		subscriptionsEndpoint: config.graphqlSubscriptionsPath
	}));

	app.use(config.graphqlPath, graphqlMiddleware);
	console.log(`GraphQL Server is now running on ${config.graphqlPath}`.green);


	// Add graphiql dev console
	app.use('/graphiql', bodyParser.json(), graphiqlExpress({
  		endpointURL: config.graphqlPath,
  		subscriptionsEndpoint: 'ws://localhost:3003'+config.graphqlSubscriptionsPath,
	}));
    
	// GraphQL subscription
	// create subscription server
	new SubscriptionServer(
		{
			schema,
			execute,
			subscribe
		},
		{
			server: server,
			path: config.graphqlSubscriptionsPath
		}
	);
	console.log(`GraphQL Subscriptions are now running on ${config.graphqlSubscriptionsPath}`.green);
}

export {init}