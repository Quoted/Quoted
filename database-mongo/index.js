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
  BusinessPicture: String
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


var selectAll = function(callback) {
  Business.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;