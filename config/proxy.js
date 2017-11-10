import config from './environment';
import proxy from 'express-http-proxy';

/**
 * forward to resftul api
 */
const init = (app) => {
	app.use(`/${config.apiPath}`, proxy(`${config.apiHost}:${config.apiPort}`));
};

export {init}