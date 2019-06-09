/*
 * @Author: homer
 * @Date:   2019-05-09 14:13:33
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-09 17:35:52
 */
import pubsub from '../pubsub';
import SUBSCRIPTIONS from '../../constants/subscriptions.json';

export const load = schemaComposer => {
  // add subscription here
  schemaComposer.Subscription.addFields({
    test: {
      type: 'String',
      resolve: payload => {
        return payload;
      },
      subscribe: () => pubsub.asyncIterator(SUBSCRIPTIONS.test),
    },
  });
};
