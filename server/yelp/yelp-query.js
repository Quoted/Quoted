//Yelp Requirements
var yelpApi = require('../../yelp_api');
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var Yelp = require('yelp');
//var _ = require('lodash')
// var db = require('../../database-mongo/index.js');
var Business = require('../../database-mongo/index').Business;


var yelp = new Yelp({
  consumer_key: yelpApi.consumerKey,
  consumer_secret: yelpApi.consumerSecret,
  token: yelpApi.token,
  token_secret: yelpApi.tokenSecret
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'auto', location: 'San Francisco' })
.then(function (data) {
  // console.log(data);
  console.log(data.businesses);
  var businesses = data.businesses;

  businesses.forEach((business) => {
  	Business.create({
			BusinessName: business.name,
			BusinessPhone: business.phone,	
      Category: 'NOT YET IMPLEMENTED'
      //Enter the Categor
  	}).then(function(result) {
      console.log('built', result);
    });
  });
})
.catch(function (err) {
  console.error(err);
  
});

module.exports = yelp;
