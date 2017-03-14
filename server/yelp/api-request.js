var yelpApi = require('../../yelp_api');
//Yelp Requirements
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

//we're using yelp's search api - NOT BUSINESS API
var request_yelp = function(set_parameters, callback) {
	var httpMethod = 'GET';
	var url = 'http://api.yelp.com/v2/search';
	//set default parameters
	var default_parameters = {
		location: 'San+Francisco',
		sort: '2' //0=Best matched (default), 1=Distance, 2=Highest Rated
	};
	//set require oauth parameters
	var required_parameters = {
		oauth_consumer_key : process.env.yelpApi.consumerKey,
		oauth_token : process.env.yelpApi.token,
		oauth_nonce : n(),
		oauth_timestamp : n().toString().substr(0,10),
		oauth_signature_method : 'HMAC-SHA1',
		oauth_version : '1.0' 
	};
	//combine all parameters in order of importance
	var parameters = _.assign(default_parameters, set_parameters, required_parameters);
	
	//set secrets
	var consumerSecret = process.env.yelpApi.consumerSecret;
	var tokenSecret = process.env.yelpApi.tokenSecret;

	//call Yelp's Oauth 1.0a server
	var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});
	//add signature response to parameters
	parameters.oauth_signature = signature;
	//stringify parameter object to query string
	var paramURL = qs.stringify(parameters);
	//add query string to url
	var apiURL = url + '?' + paramURL;
	request(apiURL, function(err, res, body) {
		return callback(err, res, body);
	})

}