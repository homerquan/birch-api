import { withFilter } from "graphql-subscriptions"; // will narrow down the changes subscriptions listen to
import { pubsub } from "./subscriptions"; // import pubsub object for subscriptions to work
import $ from "../libs/dollar";

const CONVERSATION_ADDED_TOPIC = 'conversationAdded';

//demo
const timer = setInterval(() => {
  const now = (new Date()).toString();
  console.log(now);
  pubsub.publish('now', {now});
  pubsub.publish('nowWithFilter', {nowWithFilter: now+'test to user 5821d2b0-e660-11e7-a1e8-a73d2ee333a4', client:'5821d2b0-e660-11e7-a1e8-a73d2ee333a4'});
}, 1000);

const resolvers = {
  Query: {
   test() {
      return 'test ok';
    },
    conversations(obj, args, context) {
      //test 
      pubsub.publish(CONVERSATION_ADDED_TOPIC, "test");
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
    conversationAdded(message, variables, context, subscription) {
       subscribe: () => pubsub.asyncIterator(CONVERSATION_ADDED_TOPIC)
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
