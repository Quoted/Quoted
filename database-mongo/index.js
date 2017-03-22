var mongoose = require('mongoose');

var mongoUrl = process.env.MONGOLAB_URI ||
process.env.MONGODB_URI ||
'mogodb://localhost/test';

mongoose.connect(mongoUrl);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

module.exports = db;