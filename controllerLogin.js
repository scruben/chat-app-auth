'use strict';

const send = require('koa-send');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const atob = require('atob');

const User = require('./models').models.User;

const saltRounds = 10;


exports.loginScreen = function* (next) {
  this.status = 200;
  yield send(this, './static/login.html');
};

exports.goToChat = function* (next) {
  console.log('gotochat');
  let authorized = true;
  let token = (this.request.header.authorization.split(' ')[1]);
  let user = yield User.find({ tokenId: token});
  authorized = (user.length === 1);
  if (authorized) {
    console.log('serving');
    this.status = 301;
    this.redirect('/index.html');
    // yield send(this,'./static/index.html')
  } else {
    this.status = 401;
    yield send(this, './static/404.html');
  }

};

exports.signup = function* (next) {
  let username = this.request.body.user;
  let pass = this.request.body.pass;
  let user_do_not_exist = true;
  // TODO: check if the user exists
  if (user_do_not_exist) {
    let hash = yield new Promise(function(resolve,reject) {
      bcrypt.hash(pass, saltRounds, function(err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    let userData = {
      username: username,
      passHash: hash,
      tokenId: uuid.v4()
    };

    let user =  new User(userData);
    try {
      user.save();
      this.status = 201;
      this.body = { status: 'Authorized', tokenId: user.tokenId };
    } catch (err) {
      this.status = 500;
      this.body = err;
      console.log(err);
    }

  } else {

  }
};

exports.loginUser = function* (next) {
  let auth = this.request.header.authorization.split(' ')[1];
  auth = atob(auth).split(':');
  let user = yield User.findOne({username: auth[0]});
  let res = bcrypt.compareSync(auth[1], user.passHash);
  console.log(res);
};
