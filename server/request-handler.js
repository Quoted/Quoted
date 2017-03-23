//Yelp
var db = require('../database-mongo/index.js');
var Business = require('../database-mongo/models/business.js');
var Users = require('../database-mongo/models/user.js');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var yelp = require('./yelp/yelp-query.js');
var twilio = require('twilio');

//Twillio Requirements
var twilioKeys = require('../twilio_api');
// // Twilio Credentials Move somewhere else later
var accountSid = twilioKeys.accountSid; 
var authToken = twilioKeys.authToken;
//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);


exports.createSalt = function() {
  return crypto.randomBytes(20).toString('hex');
};


exports.checkBusinessData = function(req, res) {
	var term = req.body.term;
	var category = req.body.category;
	var location = req.body.location;
	var geolocationLat = req.body.geolocationLat;
	var geolocationLong = req.body.geolocationLong;	

  console.log('category in request handelr', category);
  console.log('location in request handelr', location);

  Business.find({"businessType": category, "businessCity": location})
		.exec(function(err, result) {
			if (err) {
          res.status(500).send("Something unexpected and horrendeous happened"); 	
			} else {
        if(result.length <= 2) {
          yelp.queryApi({ 'term': category, 'location': location })
					.then((results) => {
            console.log('yelp query results: ', results);
						res.json(results.businesses);
					});
        } else {            
          res.json(result); 
        }
      }
		});
};

exports.userSignUp = function(req, res) {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;

  Users.findOne({ "username": username })
    .exec(function(err, user) {
      if (!user) {
        Users.create({'name': name, 'username': username, 'password': password});
        res.json('Account created');
      } else {
      	res.json('Account already exists');
        console.log('Account already exists');
      }
    });
};

exports.userLogin = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  Users.findOne({ "username": username })
  	.exec(function(err, user) {
  		console.log('user logging in: ', user);
  		if (!user) {
        res.status(500).send("No such user");
      } else {
  			Users.comparePassword(password, user.password, function(err, match) {
		  		if (err) {
		  			res.status(404).send("Incorrect Password");
		  		} else {
		  			console.log('req session prior to reg: ', req.session);
		  			  req.session.regenerate(function() {
              req.session.user = user;
		  				console.log('req session after reg: ', req.session);		  				
              res.json(user);
		  				});
  				}
  			});
			}
		});
};

exports.userLogout = function(req, res) {
	req.session.destroy(function() {
		res.redirect('/user/login');
	})
};



exports.textBusinesses = function(req, res) {
  console.log('getting response from client'); 
  console.log('req body', req.body);
  var textInput = req.body.textInput
  console.log('textInput', textInput);
  var businessType = "test" // req.body. businesstype


  Business.find({businessType: businessType}, function(err, businesses){
    if (err) {
      console.log(err);
    } else {
      console.log('test businesses', businesses);
      businesses.forEach(function(biz) {
        console.log('business phone', biz.businessPhone);
        client.messages.create({
          to: biz.businessPhone,
          from: '4152001619',
          body: 'Hey ' + biz.businessName +  '! ' + textInput
        }, function (err, message) {
          if (err) {
            console.log('err', err);
            res.status(404).end();
          } else {
            console.log('sent message!!!!!');
            console.log('message sid', message.sid);
            res.status(200).send();
          }
        });
      });
    }
  });
};


exports.callBusinesses = function(req, res) {
  console.log('trying to call'); 
  Business.find({businessType: "test"}, function(err, businesses){
    if (err) {
      console.log(err);
    } else {
      console.log('test businesses', businesses);
      businesses.forEach(function(biz) {
        client.calls.create({
          // url: 'https://0eee99e4.ngrok.io/voice',
          url: 'https://5eae2b54.ngrok.io/voice',
          // url: 'http://demo.twilio.com/docs/voice.xml',
          to: biz.businessPhone,
          from: '4152001619',
        }, function (err, call) {
          if (err) {
            console.log(err);
          } else {
            process.stdout.write(call.sid);
            res.status(200).send();
          }
        });
      });
    }
  });
};

exports.setVoiceMessage = function(req, res) {
  // var textInput = req.body.textInput;
  // textInput = 'Get me a mechanic';

  var twiml = new twilio.TwimlResponse();
  // twiml.say('Hey ');
  // twiml.play('http://demo.twilio.com/docs/classic.mp3');
  // twiml.play('https://s3-us-west-1.amazonaws.com/hrsf72-quoted-app/75386.mp3');
  // twiml.play('https://s3-us-west-1.amazonaws.com/hrsf72-quoted-app/90665.audio');
  twiml.say('Hey do you want to hear classical music?');
  twiml.play('http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02.wav'); // classical music in case we get too many errors
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};
