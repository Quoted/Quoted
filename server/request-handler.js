//Yelp
var db = require('../database-mongo/index.js');
var Business = require('../database-mongo/models/business.js');
var Users = require('../database-mongo/models/user.js');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var yelp = require('./yelp/yelp-query.js');


exports.createSalt = function() {
  return crypto.randomBytes(20).toString('hex');
};


exports.checkBusinessData = function(req, res) {
	var term = req.body.term;
	var category = req.body.category;
	var location = req.body.location;
	var geolocationLat = req.body.geolocationLat;
	var geolocationLong = req.body.geolocationLong;	

  console.log('this is the req.body: ', req.body);
	Business.find({"businessType": category, "businessCity": location})
  // Business.find({"businessCity": location}) 
  // Business.find({})
		.exec(function(err, result) {
      console.log('result from find: ', result);
			if (err) {
          res.status(500).send("Something unexpected and horrendeous happened"); 	
			} else {
				if(result.length <= 2) {
					yelp.queryApi({ 'term': term, 'location': location })
					.then(function(results) {
						return res.json(results);
					});
				}							
      console.log('request session: ', req.session);
      res.json(result); 
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
