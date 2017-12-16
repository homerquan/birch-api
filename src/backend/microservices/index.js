import {services as apiServices} from './api';
import _  from 'lodash';

var services = _.union(
	apiServices
);

export default (options) => {
    for (var i in services) {
        this.add(services[i].pattern, services[i].action)
    };
}