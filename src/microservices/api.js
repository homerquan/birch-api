// Microservice to the business bus

import pubsub from '../graphql/pubsub';
import TOPICS from '../constants/topics.json';

module.exports = [
  {
    pattern: 'role:reflen-console-api,cmd:create_message',
    action: (msg, cb) => {
      pubsub.publish(TOPICS.createMessageTopic, {
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
      pubsub.publish(TOPICS.updateMessageTopic, {
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
      pubsub.publish(TOPICS.createConversationTopic, {
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
      pubsub.publish(TOPICS.updateConversationTopic, {
        updateConversation: msg,
        client: msg.client,
      });
      cb(null, {
        code: 'console-api-ok',
      });
    },
  },
];
