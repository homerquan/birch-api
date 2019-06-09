/**
 * Bacnkend
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */

import express from 'express';
import cors from 'cors';
import $ from './libs/dollar';
import { init as initExpress } from './config/express';
import { init as initGraphQL } from './config/graphql';
import { load as loadRoutes } from './routes';

// register app with api server
const apiServer = (app, server) => {
  // Connect to MongoDB
  $.mg.connect($.config.mongo.uri, $.config.mongo.options);
  $.mg.connection.on('error', function(err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
  });

  // Gen Sample Data
  if ($.config.genSeedData) {
    require('./tools/genSeedData');
  }

  // Populate databases with sample data
  if ($.config.seedDB) {
    require('./tools/seed');
  }

  initExpress(app);
  initGraphQL(app, server);
  loadRoutes(app);
};

export default apiServer;
