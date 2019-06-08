import { PubSub } from 'graphql-subscriptions';

// You can publish changes from anywhere as long as you include this file and call pubsub.publish(...)
const pubsub = new PubSub();

// test
setInterval(() => {
  const ts = new Date();
  pubsub.publish('test', ts.toString());
}, 1000);

export default pubsub;
