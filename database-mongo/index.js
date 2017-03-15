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
  Category: String
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


// Clear the test data
Business.remove({}, function(err, biz) {
  if (err) {
    console.log(err);
  } else {
    console.log('successfully removed');
  }
});

// add test data
Business.create({
  BusinessName: "Edwin",
  BusinessCell: 7703357571,
  Category: "test"
}, function(err, data) {
  console.log('saved');
});
Business.create({
  BusinessName: "Han",
  BusinessCell: 5104568837,
  Category: "test"
}, function(err, data) {
  console.log('saved');
});
Business.create({
  BusinessName: "Mike",
  BusinessCell: 4083182027,
  Category: "test"
}, function(err, data) {
  console.log('saved');
});
Business.create({
  BusinessName: "Jason",
  BusinessCell: 6267168334,
  Category: "test"
}, function(err, data) {
  console.log('saved');
});

var selectAll = function(callback) {
  Business.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.Business = Business;


