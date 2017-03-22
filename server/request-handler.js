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

exports.loadBusinessData = function(req, res, next) {
  var term = req.body.term;
  var category = req.body.category;
  var location = req.body.location;
  var geolocationLat = req.body.geolocationLat;
  var geolocationLong = req.body.geolocationLong;

  Business.find({"businessType": category, "businessCity": location})
    .exec(function(err,result) {
      if (err) {
        res.status(500).send("Something unexpected and horrendeous happened");  
      } else {
        if (result.length <= 2) {
          next();
          return;
        }
        console.log('result from loadBusinessData: ', result);
        res.json(result);
      }
    });
};

exports.queryYelp = function(req, res, next) {
  var term = req.body.term;
  var category = req.body.category;
  var location = req.body.location;
  var geolocationLat = req.body.geolocationLat;
  var geolocationLong = req.body.geolocationLong; 

  yelp.queryApi({ 'term': term, 'location': location })
    .then((results) => {
      console.log('yelp query results: ', results);
      next();
      return;
    });

  next();
}


exports.checkBusinessData = function(req, res) {
	var term = req.body.term;
	var category = req.body.category;
	var location = req.body.location;
	var geolocationLat = req.body.geolocationLat;
	var geolocationLong = req.body.geolocationLong;	

  console.log('this is the req.body: ', req.body);
	//check if there are any businesses that matches the provided params
  Business.find({"businessType": category, "businessCity": location})
  // Business.find({"businessCity": location}) 
  // Business.find({})
		.exec(function(err, result) {
      console.log('result from mongoose find: ', result);
			if (err) {
          //it is never going to be inside here - no result still outputs an empty array.
          res.status(500).send("Something unexpected and horrendeous happened"); 	
			} else {
        //if the length of the db search result is less than the indicated threshold
        if(result.length <= 2) {
          //query yelp api while saving the information into db
          yelp.queryApi({ 'term': term, 'location': location })
        //there is an async issue with this part - ideally we will send the newly created businesses from our db as our response
					.then((results) => {
            console.log('yelp query results: ', results);
						res.json(results);
					});
        }             
      // console.log('request session: ', req.session);
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
