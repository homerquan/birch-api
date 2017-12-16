import config from './env';

const setting = {
    server: {
        type: 'amqp',
        url: config.amqpConn,
        pin: 'role:convospot-console'
    },
    clients: [{
        type: 'amqp',
        url: config.amqpConn,
        pin: 'role:convospot-engine'
    },{
        type: 'amqp',
        url: config.amqpConn,
        pin: 'role:convospot-api'
    },{
        type: 'amqp',
        url: config.amqpConn,
        pin: 'role:convospot-email'
    }]
};

export {setting};