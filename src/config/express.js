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
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import lusca from 'lusca';
import config from './environment';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import cors from 'cors';
import {init as proxyInit} from './proxy';

const mongoStore = connectMongo(session);

const init = (app) => {
    var env = app.get('env');

    app.set('views', config.root + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(compression());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());

    // Persist sessions with mongoStore / sequelizeStore
    // We need to enable sessions for passport-twitter because it's an
    // oauth 1.0 strategy, and Lusca depends on sessions
    app.use(session({
        secret: config.secrets.session,
        saveUninitialized: true,
        resave: false,
        store: new mongoStore({
            mongooseConnection: mongoose.connection,
            db: 'app'
        })
    }));

    /**
     * Proxy to restful api
     */
    proxyInit(app);

    /**
     * express server security
     * https://github.com/krakenjs/lusca
     */
    if ('test' !== env) {
        // TODO: Enable later
        // app.use(lusca({
        //     csrf: {
        //         angular: true
        //     },
        //     xframe: 'SAMEORIGIN',
        //     hsts: {
        //         maxAge: 31536000, //1 year, in seconds
        //         includeSubDomains: true,
        //         preload: true
        //     },
        //     xssProtection: true
        // }));
    }

    app.set('appPath', path.join(config.root, 'client'));

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