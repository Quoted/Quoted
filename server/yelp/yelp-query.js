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
        console.log('obj term', obj.term);
        Business.create({
          businessName: business.name,
          businessPhone: business.phone,
          businessAddress: business.location.address,
          businessCity: business.location.city,
          // businessPicture: business.snippet_image_url,
          businessType: obj.term
       }).then(function(result) {
          // console.log('stored following entry into Business Schema: ', result);     
        });       
      });
      resolve(data);
    })
    .catch(function (err) {
      console.log('im erroring out');
      console.error(err);
    });
  });
};




// //Populating the database with auto stuff and home repair stuff
// yelp.queryApi({category: 'Home Repair', term: 'Home Repair', location: 'San Francisco'});
// yelp.queryApi({category: 'Auto Repair', term: 'Auto Repair', location: 'San Francisco'});


module.exports = yelp;
