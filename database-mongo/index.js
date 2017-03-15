var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

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

var userSchema = mongoose.Schema({
  Name: String,
  Username: String,
  Password: String,
  UserEmail: String,
  UserCellPhone: String,
  Salt: String,
  UserAddress: String,
  UserCity: String,
  UserZip: Number
});

var Business = mongoose.model('Business', businessSchema);
var Users = mongoose.model('Users', userSchema);

module.exports.Business = Business;
