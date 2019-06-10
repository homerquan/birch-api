import { PubSub } from 'graphql-subscriptions';
import SUBSCRIPTIONS from '../constants/subscriptions.json';

// You can publish changes from anywhere as long as you include this file and call pubsub.publish(...)
const pubsub = new PubSub();

// test
setInterval(() => {
  const ts = new Date();
  pubsub.publish(SUBSCRIPTIONS.test, ts.toString());
}, 1000);

setInterval(() => {
  const ts = new Date();
  pubsub.publish(SUBSCRIPTIONS.globalNotificationChange, {
  	id: 'abc',
  	type: 'general',
    text: `123${ts}`,
    _owner: '607f1f77bcf86cd799439011',
  });
}, 10000);

export default pubsub;
