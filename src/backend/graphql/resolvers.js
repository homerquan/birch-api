import { withFilter } from "graphql-subscriptions"; // will narrow down the changes subscriptions listen to
import { pubsub } from "./subscriptions"; // import pubsub object for subscriptions to work
import $ from "../libs/dollar";
import topics from "./topics";


const resolvers = {
  Query: {
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
      //return client.hgetAsync("demo-kb","knowledge");
      return $['ms']
       .act("convospot-api", "get_knowledge", {
          bot: args.botId,
          client: args.clientId,
      })
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
    createBot (obj, args, context) {
      return $['ms']
        .act("convospot-api", "create_bot", {
          client: args.clientId,
          name: args.name,
          url: args.url
        })
    },
    updateKnowledge(obj, args, context) {
      //client.hsetAsync("demo-kb","knowledge",args.text.replace(/\s+/g, ' '));
      return $['ms']
       .act("convospot-api", "update_knowledge", {
          raw: args.text,
          bot: args.botId,
          client: args.clientId,
      })
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
        }
      )
    },
    updateConversation: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(topics['UPDATE_CONVERSATION_TOPIC']),
        (payload, args, ctx) => {
            return true;
        }
      )
    },
    receiveSuggestion: {
      subscribe: () => pubsub.asyncIterator('now'),
    },
    createSuggestion: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(topics['RECEIVE_SUGGESTION_TOPIC']),
        (payload, args, ctx) => {
          return Boolean(
            args.conversationId && args.conversationId === payload.conversation
          );   
        }
      )
    }
  }
};

export default resolvers;
