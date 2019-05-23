/**
 * Convospot console
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */

import path from "path";
import http from "http";
import https from "https"; //use https in producation
import Promise from "bluebird";
import express from "express";
import bodyParser from "body-parser";
import expressJwt, { UnauthorizedError as Jwt401Error } from "express-jwt";
import expressGraphQL from "express-graphql";
import jwt from "jsonwebtoken";
import PrettyError from "pretty-error";
import config from "./config/environment";
import backendServer from "./backend";
import welcome from "./libs/welcome";
import $ from './libs/dollar';

const app = express();
const server = http.createServer(app);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (config.env === 'development') {
  app.enable("trust proxy");
}

// Load backend (api, auth, graphql, socketio)
// -----------------------------------------------------------------------------
backendServer(app, server);

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(config.port, config.ip, () => {
  welcome();
  $['log'].info(`The server is running at http://${config.ip}:${config.port}/`);
});
