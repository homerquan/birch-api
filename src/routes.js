/**
 * Main application routes
 */
import path from 'path';
import httpError from './libs/httpError';
import {default as apiRoutes} from './api/app';
import {default as userRoutes} from './api/user';
import {default as knowledgeRoutes} from './api/knowledge';
import {default as verificationRoutes} from './api/verification';
import {default as authRoutes} from './auth';

const load = (app) => {

  // Insert routes below
  app.use('/api/apps', apiRoutes);
  app.use('/api/users', userRoutes);
  app.use('/rest-api/knowledge', knowledgeRoutes);
  app.use('/api/verification', verificationRoutes);
  app.route('/api/*').get(httpError('NOT_FOUND'));
  app.use('/auth', authRoutes);


  // TODO: Move following to middleware (with content check)
  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //  response 404

  // All other routes should redirect to the react (in app.js)

};

export {
  load
}