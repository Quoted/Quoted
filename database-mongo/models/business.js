var db = require('../index.js');
var mongoose = require('mongoose');

var businessSchema = mongoose.Schema({
  businessName: {type: String, unique: true },
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

// add test data
Business.create({
  businessName: "Edwin",
  businessPhone: 7703357571,  
  businessType: "test",
  businessCity: 'San Francisco'
}, function(err, data) {
  console.log('saved');
});
Business.create({
  businessName: "Han",
  businessPhone: 5104568837,
  businessType: "test",
  businessCity: 'San Francisco'
}, function(err, data) {
  console.log('saved');
});
Business.create({
  businessName: "Mike",
  businessPhone: 4083182027,
  businessType: "test",
  businessCity: 'San Francisco'
}, function(err, data) {
  console.log('saved');
});
Business.create({
  businessName: "Jason",
  businessPhone: 6267168334,
  businessType: "test",
  businessCity: 'San Francisco'
}, function(err, data) {
  console.log('saved');
});


module.exports = Business;
