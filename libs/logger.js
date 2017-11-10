import config from '../config/environment';
import winston from 'winston';

//Use customer logger later
var Logger = new(winston.Logger)({
	level: config.logLvl,
	transports: [
		new(winston.transports.Console)({
			colorize: true,
			timestamp: true
		})
	]
});

export default Logger;