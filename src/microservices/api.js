// Microservice to the business bus

import pubsub from '../graphql/pubsub';
import topics from '../graphql/topics';

module.exports = [
  {
    pattern: 'role:reflen-console-api,cmd:create_message',
    action: (msg, cb) => {
      pubsub.publish(topics.CREATE_MESSAGE_TOPIC, {
        createMessage: msg,
        conversation: msg.conversation,
        client: msg.client,
      });
      cb(null, {
        code: 'console-api-ok',
      });
    },
  },
  {
    pattern: 'role:reflen-console-api,cmd:update_message',
    action: (msg, cb) => {
      pubsub.publish(topics.UPDATE_MESSAGE_TOPIC, {
        updateMessage: msg,
        conversation: msg.conversation,
        client: msg.client,
      });
      cb(null, {
        code: 'console-api-ok',
      });
    },
  },
  {
    pattern: 'role:reflen-console-api,cmd:create_conversation',
    action: (msg, cb) => {
      pubsub.publish(topics.CREATE_CONVERSATION_TOPIC, {
        createConversation: msg,
        client: msg.client,
      });
      cb(null, {
        code: 'console-api-ok',
      });
    },
  },
  {
    pattern: 'role:reflen-console-api,cmd:update_conversation',
    action: (msg, cb) => {
      pubsub.publish(topics.UPDATE_CONVERSATION_TOPIC, {
        updateConversation: msg,
        client: msg.client,
      });
      cb(null, {
        code: 'console-api-ok',
      });
    },
  },
];
