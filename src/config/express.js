/**
 * Express configuration
 */

'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import path from 'path';
import config from './environment';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';

const init = (app) => {
    var env = app.get('env');

    app.use(compression());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    if ('production' === env) {

        // allow cors in api (this have to put before multer)
        var whitelist = config.corsWhitelist;
        var corsOptionsDelegate = function(req, callback) {
            var corsOptions;
            if (whitelist.indexOf(req.header('Origin')) !== -1) {
                corsOptions = {
                    origin: true
                }; // reflect (enable) the requested origin in the CORS response
            } else {
                corsOptions = {
                    origin: false
                }; // disable CORS for this request
            }
            callback(null, corsOptions); // callback expects two parameters: error and options
        };

        //TODO: change for security later
        //app.use(cors(corsOptionsDelegate)); 
        app.use(cors());
        app.use(morgan('dev'));
    }

    if ('development' === env) {
        console.log('Enable cors for all, for development only!');
        app.use(cors());
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};

export {init}