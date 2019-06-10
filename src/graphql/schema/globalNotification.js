import { withFilter } from 'graphql-subscriptions';
import pubsub from '../pubsub';
import SUBSCRIPTIONS from '../../constants/subscriptions.json';

export const load = schemaComposer => {
  // You may use SDL format for type definition
  const GlobalNotificationTC = schemaComposer.createObjectTC(`
    type GlobalNotification {
      id: String!
      type: String!
      text: String
      link: String
      _owner: String!
    }
  `);

  // subscription
  schemaComposer.Subscription.addFields({
    globalNotificationChange: {
      type: GlobalNotificationTC,
      resolve: payload => {
        return payload;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator(SUBSCRIPTIONS.globalNotificationChange),
        (payload, variables, context) => {
          return payload._owner === context.user._id || payload._owner === '*';  // * for public notification
        }
      ),
    },
  });
};
