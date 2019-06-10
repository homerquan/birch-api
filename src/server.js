/**
 * Convospot console
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */

import http from 'http';
import express from 'express';
import config from './config/environment';
import apiServer from './apiServer';
import welcome from './libs/welcome';
import $ from './libs/dollar';

const app = express();
const server = http.createServer(app);

if (config.env === 'development') {
  app.enable('trust proxy');
}

// Load api server (api, auth, graphql, socketio)
// -----------------------------------------------------------------------------
apiServer(app, server);

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(config.port, config.ip, () => {
  welcome();
  $.log.info(`The server is running at http://${config.ip}:${config.port}/`);
});
