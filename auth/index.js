'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import User from '../api/user/user.model';
import * as localPassport from './local/passport';
import {default as localRoutes} from './local';

// Passport Configuration
localPassport.setup(User, config);

var router = express.Router();

router.use('/local', localRoutes);

export default router;
