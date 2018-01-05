import _  from 'lodash';

var services = _.union(
	require('./api')
);

module.exports = function convospot(options) {
    for (var i in services) {
        this.add(services[i].pattern, services[i].action)
    };
}