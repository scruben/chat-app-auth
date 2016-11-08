'use strict';

const router = require('koa-router')();
const bodyParser = require('body-parser');

const loginCtrl = require('./controllerLogin.js');
const messagesCtrl = require('./controllerMessage.js');

router.get('/',loginCtrl.loginScreen);
router.get('/chat',loginCtrl.goToChat);
router.get('/loguser',loginCtrl.loginUser);
router.post('/signup',loginCtrl.signup);
router.get('/messages', messagesCtrl.getLatest);
router.post('/messages', messagesCtrl.post);

module.exports = router;
