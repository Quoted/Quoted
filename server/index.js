var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');

var Business = require('../database-mongo/index').Business;

var twilio = require('twilio');

var handler = require('./request-handler');
//Twillio Requirements
var twilioKeys = require('../twilio_api');



var app = express();

// Twilio Credentials Move somewhere else later
var accountSid = twilioKeys.accountSid; 
var authToken = twilioKeys.authToken;
//require the Twilio module and create a REST client

var client = require('twilio')(accountSid, authToken);



app.currentBusiness = {BusinessName: 'Ice Cream Truck'};

// UNCOMMENT FOR REACT

app.use(express.static(__dirname + '/../react-client/dist'));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());

app.post('/messages', function(req, res) {
  console.log('trying to send out text messages'); 
  Business.find({Category: "test"}, function(err, businesses){
    if (err) {
      console.log(err);
    } else {
      console.log('test businesses', businesses);
      businesses.forEach(function(biz) {
        client.messages.create({
          to: biz.BusinessCell,
          from: '4152001619',
          body: 'Hey ' + biz.BusinessName +  ' this is Billy! I want to SPAM you!',
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
    }
  });
  // This is how to do a basic send message from twilio 
  // where the 770 num is a verified number that is like a biz number 
  // and the 415 number is a twilio number

  // client.messages.create({
  //     to: '7703357571',
  //     from: '4152001619',
  //     body: 'This is a test message, hello how are you',
  // }, function (err, message) {
  //     if (err) {
  //       console.log('err', err);
  //       res.status(404).end();
  //     } else {
  //       console.log('message sid', message.sid);
  //       res.status(200).send();
  //     }
  // });
});


app.post('/call', function(req, res) {
  console.log('trying to send out text messages'); 
  Business.find({Category: "test"}, function(err, businesses){
    if (err) {
      console.log(err);
    } else {
      console.log('test businesses', businesses);
      businesses.forEach(function(biz) { // UNCOMMENT
        app.currentBusiness = biz;
/// Set params in post request for url        
        client.calls.create({
          // url: 'http://demo.twilio.com/docs/voice.xml',
          url: 'https://0eee99e4.ngrok.io/voice',
          // url: 'https://0eee99e4.ngrok.io/Edwin',
          to: biz.BusinessCell, // UNCOMMENT
          // to: '7703357571',
          from: '4152001619',
        }, function (err, call) {
          if (err) {
            console.log(err);
            // res.status(404).end();
          } else {
            // console.log('message sid', message.sid);
            // process.stdout.write(call.sid);
            console.log(call.sid);
            process.stdout.write(call.sid);
            // res.status(200).send(call.sid);
          }
        });
        setTimeout(() => {}, 1000);
        console.log('another business', app.currentBusiness.BusinessName);
      }); //UNCOMMENT
    }
  });
});


app.post('/voice', function(req, res) {
  var twiml = new twilio.TwimlResponse();
  // console.log('request', req.body);
  twiml.say('Hey ' + app.currentBusiness.BusinessName + ' Hash tag party! From bros');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  // res.end(req);
});

// Business.find({Category: "test"}, function(err, businesses){
//   if (err) {
//     console.log(err);
//   } else {
//     // console.log('test businesses', businesses);
//     businesses.forEach(function(biz) {
//       app.post(`/${biz.BusinessName}`, function(req, res) {
//         var twiml = new twilio.TwimlResponse();
//         console.log('request', req.body);
//         twiml.say(biz.BusinessName + ' Hash tag party! From bros');
//         res.writeHead(200, {'Content-Type': 'text/xml'});
//         res.end(twiml.toString());
//         // res.end(req);
//       });
//     });
//   }
// });


app.get('/businesses', handler.checkBusinessData); 


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

