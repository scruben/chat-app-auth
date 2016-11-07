'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // version that supports yields

const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
});

userSchema.methods.comparePassword = function *(candidatePassword) {
  return yield bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.matchUser = function *(username, password) {
  var user = yield this.findOne({ 'username': username.toLowerCase() }).exec();
  if (!user) throw new Error('User not found');

  if (yield user.comparePassword(password))
    return user;

  throw new Error('Password does not match');
};

userSchema.pre('save', function (done) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return done();
  }

  co(function*() {
    try {
      var salt = yield bcrypt.genSalt();
      var hash = yield bcrypt.hash(this.password, salt);
      this.password = hash;
      done();
    }
    catch (err) {
      done(err);
    }
  }).call(this, done);
});

mongoose.model('User', userSchema);
