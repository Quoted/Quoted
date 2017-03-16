var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var Business = require('../database-mongo/models/business.js');
var twilio = require('twilio');
var handler = require('./request-handler');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');

//Twillio Requirements
var twilioKeys = require('../twilio_api');
// // Twilio Credentials Move somewhere else later
var accountSid = twilioKeys.accountSid; 
var authToken = twilioKeys.authToken;
//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

var app = express();

app.currentBusiness = {BusinessName: 'Ice Cream Truck'};

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser('Greenfie1dBr0s'));
app.use(session({
  secret: 'Greenfie1dBr0s',
  resave: false,
  saveUninitialized: true
}));


app.get('/user', function(req, res){ 
  var sessionCheck = req.session ? !!req.session.username : false;
  if (sessionCheck) {
    res.json(req.session.user);
  } else {
    res.json(null);
  }
});

app.post('/user', function(req, res){
  console.log('req ', req);
  var sessionCheck = req.session ? !!req.session.username : false;
  if (sessionCheck) {
    console.log('i\'m getting destroyed');
    req.session.destroy(function(){
      res.end();
    }); 
  } else {
    console.log('failed');
    res.end();
  }
});

app.get('/user/logout', handler.userLogout);
app.post('/user/signup', handler.userSignUp);
app.post('/user/login', handler.userLogin);

app.post('/businesses', handler.checkBusinessData); 
// app.get('/businesses', handler.checkBusinessData); 

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


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

