/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('isemail');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    validate: [isEmail.validate, 'Invalid email address'],
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
  },
});

userSchema.pre('save', function encryptPassword(next) {
  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) {
      next(error);
    } else {
      this.password = hash;
      return next();
    }
  });
});

userSchema.methods.sanitise = function () {
  const userObject = this.toObject();
  const { password, ...rest } = userObject;
  return rest;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
