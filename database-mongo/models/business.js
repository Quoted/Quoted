var db = require('../index.js');
var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

var businessSchema = mongoose.Schema({
  businessName: String,
  businessAddress: String,
  businessCity: String,
  businessZip: String,
  businessRating: Number,
  businessPhone: Number,
  businessCell: Number,
  businessEmail: String,
  businessPicture: String,
  businessType: Array,
  businessLat: Number,
  businessLong: Number
});


businessSchema.pre('save', function(next) {
  next();
});

var Business = mongoose.model('Business', businessSchema);

//Method checks if business exists

//Select all business

module.exports = Business;
