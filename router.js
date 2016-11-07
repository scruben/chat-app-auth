'use strict';

const router = require('koa-router')();
const bodyParser = require('body-parser');
const loginCtrl = require('./controllerLogin.js');

const messagesCtrl = require('./controller.js');

router.get('/',loginCtrl.login);
router.get('/messages', messagesCtrl.getLatest);
router.post('/messages', messagesCtrl.post);

module.exports = router;
