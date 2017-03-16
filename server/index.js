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
  console.log('getting response from client'); 
  console.log('req body', req.body);
  var textInput = req.body.textInput
  console.log('textInput', textInput);

  Business.find({Category: "test"}, function(err, businesses){
    if (err) {
      console.log(err);
    } else {
      // console.log('test businesses', businesses);
      businesses.forEach(function(biz) {
        console.log('business phone', biz.BusinessPhone);
        client.messages.create({
          to: biz.BusinessPhone,
          from: '4152001619',
          body: 'Hey ' + biz.BusinessName +  'I want to let you know that :' + textInput
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
  
});

/*
app.post('/call', function(req, res) {
  console.log('trying to send out text messages'); 
  Business.find({Category: "test"}, function(err, businesses){
    if (err) {
      console.log(err);
    } else {
      console.log('test businesses', businesses);
      businesses.forEach(function(biz) {
        console.log('calling people at this number', biz.BusinessPhone);
        client.calls.create({
          url: 'http://580709ae.ngrok.io/voice',
          to: biz.BusinessPhone,
          from: '4152001619',
          body: 'Test message, hello ' + biz.BusinessName +  ' Han wants to spam you',
        }, function (err, message) {
          if (err) {
            console.log('err', err);            
            res.status(404).end();
          } else {
            // console.log('message sid', message.sid);
            console.log('message', message);
            process.stdout.write(calls.sid);
            res.status(200).send();
          }
        });
      });
    }
  });
});
*/

app.post('/voice', function(req, res) {  
  var twiml = new twilio.TwimlResponse();
  // console.log('request', req.body);
  console.log('request', req);
  console.log('request body', req.body);
  console.log('currentName', app.currentBusiness.BusinessName);
  twiml.say('Hey ' + app.currentBusiness.BusinessName + ' Hash tag party! From bros');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});



function Iterator(businesses, index, callback) {
  try {
    var biz = businesses[index];
    app.currentBusiness = biz;
    // console.log('biz', biz);
    client.calls.create({
        url: 'http://580709ae.ngrok.io/voice',
        to: biz.BusinessPhone,
        from: '4152001619',
        name: 'fdsfsafadsf'             
    }, function(err, message) {
      index++; //increment the index
      if (index >= businesses.length) {
        callback();
      } else {
        // console.log('index', index);
        // console.log('businesses', businesses);
        Iterator(businesses, index, callback);
      }
    })
  } catch(e) {
    console.log('caught some error:', e);
  }
}


app.post('/call', function(req, res) {
  Business.find({Category: "test"}, function(err, businesses){
    if (err) {
      console.log(err);
    } else {      
      Iterator(businesses, 0, function() {
        res.end('finshed calling everyone');
      })
    }
  });
});



app.get('/businesses', handler.checkBusinessData); 


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

