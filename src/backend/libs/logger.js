import config from '../config/environment';
import winston from 'winston';

//Use customer logger later
let logger = winston.createLogger({
	level: config.LOG_LEVEL || "info",
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.colorize(),
				winston.format.simple()
			)
		})
	]
});

export default logger;