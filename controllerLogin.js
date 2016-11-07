'use strict';

var send = require('koa-send');

const Message = require('./models').models.Message;

exports.login = function* (next) {
  this.status = 200;
  yield send(this, './static/login.html');
};

// exports.post = function* (next) {
//   let data = { content: this.request.body.content, timestamp: Date.now() };
//   var message = new Message(data);
//   try {
//     yield message.save();
//     this.body = data;
//   } catch (err) {
//     this.status = 500;
//     this.body = err;
//   }
// };
