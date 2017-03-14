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
  	console.log('business name', business.name);
  	console.log('business phone', business.phone);
  	Business.create({
			BusinessName: business.name,
			BusinessPhone: business.phone		
  	});
  	console.log('business', Business);
  });
})
.catch(function (err) {
  console.error(err);
  
});

// See http://www.yelp.com/developers/documentation/v2/business
// yelp.business('yelp-san-francisco')
//   .then(console.log)
//   .catch(console.error);

// yelp.phoneSearch({ phone: '+15555555555' })
//   .then(console.log)
//   .catch(console.error);

// // A callback based API is also available:
// yelp.business('yelp-san-francisco', function(err, data) {
//   if (err) return console.log(error);
//   console.log(data);
// });


	// //we're using yelp's search api - NOT BUSINESS API
	// var request_yelp = function(set_parameters, callback) {
	// 	var httpMethod = 'GET';
	// 	var url = 'http://api.yelp.com/v2/search';
	// 	//set default parameters
	// 	var default_parameters = {
	// 		location: 'San+Francisco',
	// 		sort: '2' //0=Best matched (default), 1=Distance, 2=Highest Rated
	// 	};
	// 	//set require oauth parameters
	// 	var required_parameters = {
	// 		oauth_consumer_key : process.env.yelpApi.consumerKey,
	// 		oauth_token : process.env.yelpApi.token,
	// 		oauth_nonce : n(),
	// 		oauth_timestamp : n().toString().substr(0,10),
	// 		oauth_signature_method : 'HMAC-SHA1',
	// 		oauth_version : '1.0' 
	// 	};
	// 	//combine all parameters in order of importance
	// 	var parameters = _.assign(default_parameters, set_parameters, required_parameters);
		
	// 	//set secrets
	// 	var consumerSecret = process.env.yelpApi.consumerSecret;
	// 	var tokenSecret = process.env.yelpApi.tokenSecret;

	// 	//call Yelp's Oauth 1.0a server
	// 	var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});
	// 	//add signature response to parameters
	// 	parameters.oauth_signature = signature;
	// 	//stringify parameter object to query string
	// 	var paramURL = qs.stringify(parameters);
	// 	//add query string to url
	// 	var apiURL = url + '?' + paramURL;
	// 	request(apiURL, function(err, res, body) {
	// 		return callback(err, res, body);
	// 	})

	// }

module.exports = yelp;
