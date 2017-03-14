var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
//Twillio Requirements
var twilioKeys = require('../twilio_api');
//Yelp
var yelp = require('./yelp');


var app = express();

// Twilio Credentials Move somewhere else later
var accountSid = twilioKeys.accountSid; 
var authToken = twilioKeys.authToken;
//require the Twilio module and create a REST client

var client = require('twilio')(accountSid, authToken);

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));



app.post('/messages', function(req, res) {
  console.log('trying to send out text messages');  
  client.messages.create({
      to: '7703357571',
      from: '4152001619',
      body: 'This is a test message, hello how are you',
  }, function (err, message) {
      if (err) {
        console.log('err', err);
        res.status(404).end();
      } else {
        console.log('message sid', message.sid);
        res.status(200).send();
      }
  });
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

