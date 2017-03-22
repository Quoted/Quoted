var db = require('../index.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

//User Table Schema
var userSchema = mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  userEmail: String,
  userCellPhone: String,
  salt: String,
  userAddress: String,
  userCity: String,
  userZip: Number
});

//Middleware to hash password
userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

//Users Collection
var Users = mongoose.model('Users', userSchema);

//Method to comparePassword in database against submitted password
Users.comparePassword = function(attemptedPassword, savedPassword, callback) {
  bcrypt.compare(attemptedPassword, savedPassword, function(err, isMatch) {
    if (err) {
      return callback(err);
    } else {
      callback(null, isMatch);
    }
  });
};

module.exports = Users;
