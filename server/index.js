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
app.use(cookieParser('Greenfie1dBr0s'));
app.use(session({
  secret: 'Greenfie1dBr0s',
  resave: false,
  saveUninitialized: true
}));


app.get('/user', function(req, res){
  console.log('req body: ', req.body);
  console.log('cookies: ', req.cookies);
  console.log('session: ', req.session);  
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

//MIKE THIS ISN'T DONE
// app.get('/', handler.getUserSession);

//BELOW IS OKAY
app.get('/user/logout', handler.userLogout);
app.post('/user/signup', handler.userSignUp);
app.post('/user/login', handler.userLogin);
app.post('/businesses', handler.checkBusinessData); 

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


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

