'use strict';

import express from 'express';
import controller from './knowledge.controller';

var router = express.Router();

// only for demo
router.get('/', controller.get);
router.put('/', controller.update);

export default router;