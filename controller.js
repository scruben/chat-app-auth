'use strict';

const Message = require('./models').models.Message;

exports.getLatest = function* (next) {
  this.type = 'json';
  try {
    const msgs = yield Message.find().sort({timestamp: -1}).limit(5);
    this.body = msgs;
  } catch (err) {
    this.status = 500;
    this.body = err;
  }
};

exports.post = function* (next) {
  let data = { content: this.request.body.content, timestamp: Date.now() };
  var message = new Message(data);
  try {
    yield message.save();
    this.body = data;
  } catch (err) {
    this.status = 500;
    this.body = err;
  }
};
