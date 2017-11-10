'use strict';

import express from 'express';
import controller from './verification.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.verify);

export default router;