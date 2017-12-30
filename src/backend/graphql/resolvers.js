import { withFilter } from "graphql-subscriptions"; // will narrow down the changes subscriptions listen to
import { pubsub } from "./subscriptions"; // import pubsub object for subscriptions to work
import $ from "../libs/dollar";
import topics from "./topics";

//TODO: mvp only
var redis = require("redis");
var bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
var client = redis.createClient();


// For test
// const timer = setInterval(() => {
//   const now = (new Date()).toString();
//   console.log(now);
//   pubsub.publish('now', {now});
//   pubsub.publish('nowWithFilter', {nowWithFilter: now+'test to user 5821d2b0-e660-11e7-a1e8-a73d2ee333a4', client:'ddcd39c9-dcbc-4a26-bcf7-525d77c12d54'});
// }, 1000);

const resolvers = {
  Query: {
   test() {
      return 'test ok';
    },
    conversations(obj, args, context) {
      return $['ms']
        .act("convospot-api", "list_conversations", {
          client: args.clientId,
          bot: args.botId,
          status: 'online'
        })
    },
    messages(obj, args, context) {
      return $['ms']
        .act("convospot-api", "list_messages", {
          conversation: args.conversationId,
          client: args.clientId
        })
    },
    bots(obj, args, context) {
      return $['ms']
        .act("convospot-api", "list_bots", {
          client: args.clientId
        })
    },
    knowledge(obj, args, context) {
      return client.hgetAsync("demo-kb","knowledge");
    }
  },

  Mutation: {
    updateConversation(obj, args, context) {
      // You'll probably want to validate the args first in production, and possibly check user credentials using context
      // People.update({ _id: args.id }, { $set: { name: args.name, eyeColor: args.eyeColor, occupation: args.occupation } });
      // pubsub.publish("personUpdated", { personUpdated: args }); // trigger a change to all subscriptions to this person
      // Note: You must publish the object with the subscription name nested in the object!
      // See: https://github.com/apollographql/graphql-subscriptions/issues/51
      return args;
    },
    createMessage (obj, args, context) {
      return $['ms']
        .act("convospot-api", "create_message", {
          conversation: args.conversationId,
          source: "helper",
          type: "language",
          text: args.text
        })
    },
    updateKnowledge(obj, args, context) {
      client.hsetAsync("demo-kb","knowledge",args.text);
    }
  },

  Subscription: {
    createConversation: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(topics['CREATE_CONVERSATION_TOPIC']),
        (payload, args, ctx) => {
            return Boolean(
              args.clientId && args.clientId === payload.client
            );
        },
      ),
    },
    updateConversation: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(topics['UPDATE_CONVERSATION_TOPIC']),
        (payload, args, ctx) => {
            return true;
        },
      ),
    },
    now: {
      subscribe: () => pubsub.asyncIterator('now'),
    },
    nowWithFilter: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('nowWithFilter'),
        (payload, args, ctx) => {
            return Boolean(
              args.userId && args.userId === payload.client
            );
        },
      ),
    },
  }
};

export default resolvers;
