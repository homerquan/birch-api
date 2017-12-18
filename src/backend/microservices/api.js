/**
 * Microservices for convospot-api
 */

import pubsub from 'pubsub-js';

module.exports = [{
	pattern: 'role:convospot-console-api,cmd:create_message',
	action: (msg, cb) => {
		pubsub.publish('create_message', msg);
		cb(null, {
			code: 'console-ok'
		});
	}
}, {
	pattern: 'role:convospot-console-api,cmd:update_conversations',
	action: (msg, cb) => {
		pubsub.publish('update_conversations', msg);
		cb(null, {
			code: 'console-ok'
		});
	}
}];