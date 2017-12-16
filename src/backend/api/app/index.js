'use strict';


import auth from '../../auth/auth.service';
import express from 'express';
import controller from './app.controller';
// var knowledgeController = require('../knowledge/knowledge.controller');
// var conversationController = require('../conversation/conversation.controller');


let router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

//forward to other controllers
// router.get('/:id/knowledges', knowledgeController.filterByApp);
// router.get('/:id/conversations', conversationController.filterByApp);

export default router;