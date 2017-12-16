import {
    setting
} from '../config/seneca';
import ms from '../microservices';
import Promise from 'bluebird';

const seneca = Promise.promisifyAll(require('seneca')());
const start = function(services, option) {
    var senecaService = seneca
        .use('seneca-amqp-transport')
        .use(services)
        .listen(option.server);

    option.clients.forEach(client => {
        senecaService.client(client);
    });

    return senecaService;
}

const handler = start(ms, setting);

export default (role, cmd, data) => {
    if (handler && cmd) {
        return handler.actAsync(`role:${role},cmd:${cmd}`, data);
    }
}