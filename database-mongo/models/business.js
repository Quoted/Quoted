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
  businessPicture: {data: Buffer, contentType: String},
  businessType: [String], //Changed from Array
  businessLat: Number,
  businessLong: Number,
  businessPictureUrl: String,
  businessDescription: String
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
  businessCity: 'San Francisco',
  businessPictureUrl: 'https://s3-media3.fl.yelpcdn.com/bphoto/2BtYpf1UEakmNHDJyaL2nQ/ms.jpg',
  businessDescription: 'A few months ago, something fell on my windshield & created a crack going halfway across my screen. My dad heard about TLC through a friend so we came here...'
}, function(err, data) {
  console.log('saved');
});
Business.create({
  businessName: "Han",
  businessPhone: 5104568837,
  businessType: "test",
  businessCity: 'San Francisco',
  businessPictureUrl: 'https://s3-media3.fl.yelpcdn.com/bphoto/2BtYpf1UEakmNHDJyaL2nQ/ms.jpg',
  businessDescription: 'A few months ago, something fell on my windshield & created a crack going halfway across my screen. My dad heard about TLC through a friend so we came here...'
}, function(err, data) {
  console.log('saved');
});
Business.create({
  businessName: "Mike",
  businessPhone: 4083182027,
  businessType: "test",
  businessCity: 'San Francisco',
  businessPictureUrl: 'https://s3-media3.fl.yelpcdn.com/bphoto/2BtYpf1UEakmNHDJyaL2nQ/ms.jpg',
  businessDescription: 'A few months ago, something fell on my windshield & created a crack going halfway across my screen. My dad heard about TLC through a friend so we came here...'
}, function(err, data) {
  console.log('saved');
});
Business.create({
  businessName: "Jason",
  businessPhone: 6267168334,
  businessType: "test",
  businessCity: 'San Francisco',
  businessPictureUrl: 'https://s3-media3.fl.yelpcdn.com/bphoto/2BtYpf1UEakmNHDJyaL2nQ/ms.jpg',
  businessDescription: 'A few months ago, something fell on my windshield & created a crack going halfway across my screen. My dad heard about TLC through a friend so we came here...'
}, function(err, data) {
  console.log('saved');
});



module.exports = Business;
