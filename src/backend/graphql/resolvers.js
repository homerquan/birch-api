import { withFilter } from "graphql-subscriptions"; // will narrow down the changes subscriptions listen to
import { pubsub } from "./subscriptions"; // import pubsub object for subscriptions to work
import $ from "../libs/dollar";

const resolvers = {
  Query: {
   test() {
      return 'test ok';
    },
    conversations(obj, args, context) {
      //test 
      pubsub.publish('onConversationUpdated', { conversationUpdated: {id:"demo"}, channelId: "123" });
      // args has no filter
      return $['ms']
        .act("convospot-api", "list_conversations", {
          client: args.client
        })
    },
  },

  Mutation: {
    updateConversation(obj, args, context) {
      // You'll probably want to validate the args first in production, and possibly check user credentials using context
      // People.update({ _id: args.id }, { $set: { name: args.name, eyeColor: args.eyeColor, occupation: args.occupation } });
      // pubsub.publish("personUpdated", { personUpdated: args }); // trigger a change to all subscriptions to this person
      // Note: You must publish the object with the subscription name nested in the object!
      // See: https://github.com/apollographql/graphql-subscriptions/issues/51
      return args;
    }
  },

  Subscription: {
    onConversationUpdated: {
      // See: https://github.com/apollographql/graphql-subscriptions#channels-mapping
      // Take a look at "Channels Mapping" for handling multiple create, update, delete events
      // Also, check out "PubSub Implementations" for using Redis instead of PubSub
      // PubSub is not recommended for production because it won't work if you have multiple servers
      // withFilter makes it so you can only listen to changes to this person instead of all people
      subscribe: withFilter(
        () => pubsub.asyncIterator("onConversationUpdated"),
        (payload, args) => {
          return payload.channelId === variables.channelId;
        }
      )
    }
  }
};

export default resolvers;
