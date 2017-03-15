var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var handler = require('./request-handler');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');

//Twillio Requirements
// var twilioKeys = require('../twilio_api');

var app = express();

// // Twilio Credentials Move somewhere else later
// var accountSid = twilioKeys.accountSid; 
// var authToken = twilioKeys.authToken;
//require the Twilio module and create a REST client

// var client = require('twilio')(accountSid, authToken);
app.use(express.static(__dirname + '/../react-client/dist'));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json 
app.use(bodyParser.json());


// app.post('/messages', function(req, res) {
//   console.log('trying to send out text messages');  
//   client.messages.create({
//       to: '7703357571',
//       from: '4152001619',
//       body: 'This is a test message, hello how are you',
//   }, function (err, message) {
//       if (err) {
//         console.log('err', err);
//         res.status(404).end();
//       } else {
//         console.log('message sid', message.sid);
//         res.status(200).send();
//       }
//   });
// });

app.get('/businesses', handler.checkBusinessData); 

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

