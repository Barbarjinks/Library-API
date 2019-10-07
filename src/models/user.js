const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
