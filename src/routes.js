/**
 * Main application routes
 */
import path from 'path';
import httpError from './libs/http-error';

const load = (app) => {
  app.route('/*').get(httpError('NOT_FOUND'));
};

export {
  load
}