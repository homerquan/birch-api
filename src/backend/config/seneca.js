import config from './environment';

module.exports = {
    server: {
        type: 'amqp',
        url: config.amqpConn,
        pin: 'role:convospot-console-api'
    },
    clients: [{
        type: 'amqp',
        url: config.amqpConn,
        pin: 'role:convospot-api'
    },{
        type: 'amqp',
        url: config.amqpConn,
        pin: 'role:convospot-email'
    }]
}