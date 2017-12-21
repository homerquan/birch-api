'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import User from '../api/user/user.model';
import * as localPassport from './local/passport';
import {default as localRoutes} from './local';
import {default as refreshRoutes} from './refresh';

// Passport Configuration
localPassport.setup(User, config);

var router = express.Router();

router.use('/local', localRoutes);
router.use('/local_refresh', refreshRoutes);


export default router;
