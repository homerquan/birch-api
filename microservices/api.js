/**
 * Microservices for convospot-api
 */

import pubsub from 'pubsub-js';

const services = [{
	pattern: 'role:convospot-console,cmd:create_message',
	action: (msg, cb) => {
		pubsub.publish('create_message', msg);
		cb(null, {
			code: 'console-ok'
		});
	}
}, {
	pattern: 'role:convospot-console,cmd:create_conversation',
	action: (msg, cb) => {
		console.log('create_message');
		pubsub.publish('create_conversation', msg);
		cb(null, {
			code: 'console-ok'
		});
	}
}];

export {services};