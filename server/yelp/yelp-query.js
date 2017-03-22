//Yelp Requirements
var yelpApi = require('../../yelp_api');
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var Yelp = require('yelp');
var Business = require('../../database-mongo/models/business.js')
var Promise = require('bluebird');

var yelp = new Yelp({
  consumer_key: yelpApi.consumerKey,
  consumer_secret: yelpApi.consumerSecret,
  token: yelpApi.token,
  token_secret: yelpApi.tokenSecret
});

yelp.queryApi = function(obj) {
  return new Promise((resolve, reject) => {
    yelp.search(obj)
    .then(function (data) {
      var businesses = data.businesses;
      businesses.forEach((business) => {
        Business.create({
          businessName: business.name,
          businessPhone: business.phone,
          businessAddress: business.location.address,
          businessCity: business.location.city,
          businessPicture: business.snippet_image_url,
          businessType: business.categories
       }).then(function(result) {
          console.log('built', result);          
        });       
      });
      resolve(data);
    })
    .catch(function (err) {
      console.error(err);
    });
  })
};

module.exports = yelp;
