var db = require('../index.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var businessSchema = mongoose.Schema({
  BusinessName: String,
  BusinessAddress: String,
  BusinessCity: String,
  BusinessZip: String,
  BusinessRating: Number,
  BusinessPhone: Number,
  BusinessCell: Number,
  BusinessEmail: String,
  BusinessPicture: String,
  BusinessType: String
});


businessSchema.pre('save', function(next) {
  next();
});

var Business = mongoose.model('Business', businessSchema);

//Method checks if business exists

//Select all business

module.exports = Business;
