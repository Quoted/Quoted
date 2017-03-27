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
  var category = req.body.category;
  var location = req.body.location;
	
  //currently not being used
  // var term = req.body.term;
	// var geolocationLat = req.body.geolocationLat;
	// var geolocationLong = req.body.geolocationLong;	

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
  res.end();
  console.log('getting response from client'); 
  console.log('req body', req.body);
  var textInput = req.body.textInput
  console.log('textInput', textInput);
  // if we are just getting an array from the client then we don't need to do the Business.find
  // we'd just start on the forEach loop
  // var businessType = "test" // req.body.businesstype
  // var location = "San Francisco" // req.body.    locationCity? 
  
  //change this so that we're sending text to req.body.businesses
  var businessType = req.body.businessCategory;
  var location = req.body.location;

  Business.find({businessType: businessType, businessCity: location}, function(err, businesses){
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
  }); // possibly limit here if we're still quering from db!
};


exports.callBusinesses = function(req, res) {
  console.log('trying to call');


  var businessType = req.body.businessCategory;
  var location = req.body.location;
  console.log('request body', req.body);
  console.log('businessType', businessType);
  console.log('location', location);


  Business.find({businessType: businessType, businessCity: location}, function(err, businesses){
    if (err) {
      console.log(err);
    } else {
      console.log('test businesses', businesses);
      businesses.forEach(function(biz) {
        client.calls.create({
          // FOR THE URL in the server in terminal write "./ngrok http 3000". Then paste the URL below followed by /voice
          url: 'https://0ab38556.ngrok.io/voice', // CHANGE THIS!!!!
          // url: 'http://demo.twilio.com/docs/voice.xml', // The twilio test
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
  console.log('in set vm', req.body);
  // var voiceRecording = 'https://s3-us-west-1.amazonaws.com/hrsf72-quoted-app/65005.mp3'; // req.body to get

  // var voiceRecording = 'http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02.wav'; // WAV classical music in case we get too many errors
  // var voiceRecording = 'http://www.stephaniequinn.com/Music/Jazz%20Rag%20Ensemble%20-%2010.mp3'; // MP3 JAZZ
  // var voiceRecording = 'http://demo.twilio.com/docs/classic.mp3'; 
  // var voiceRecording = 'https://s3-us-west-1.amazonaws.com/hrsf72-quoted-app/75386.mp3'
  // var voiceRecording = 'https://s3-us-west-1.amazonaws.com/hrsf72-quoted-app/90665.audio'
  var voiceRecording = 'https://s3-us-west-1.amazonaws.com/hrsf72-quoted-app/DemoAudioRecording.wav' // manually converted using internet from webm to wav
  // var user = req.body.user;
  var user = {
    name: "edwin brower",
    userCellPhone: 7703357571
  }

  var twiml = new twilio.TwimlResponse();
  var quotedMessage = 'This message was sent through Quoted. Please call back ' + user.name + ' at ' + user.userCellPhone + ' that again is ' + user.userCellPhone;
  // var quotedMessage = 'This message was sent through Quoted. Please call back the number provided within the message';
  twiml.play(voiceRecording);
  twiml.say(quotedMessage, 
    {
      'voice':'alice',
      'language':'en-GB'
    });
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};
