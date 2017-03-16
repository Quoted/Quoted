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

//callback attempt
yelp.queryApi = function(obj) {
  return new Promise((resolve, reject) => {
    // yelp.search(obj)
    yelp.search(obj)
    .then(function (data) {
      // console.log(data);
      console.log(data.businesses);
      var businesses = data.businesses;

      businesses.forEach((business) => {
        Business.create({
          businessName: business.name,
          businessPhone: business.phone,
          businessCity: business.location.city,
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




// // See http://www.yelp.com/developers/documentation/v2/search_api
// yelp.search({ term: 'auto', location: 'San Francisco' })
// .then(function (data) {
//   // console.log(data);
//   console.log(data.businesses);
//   var businesses = data.businesses;

//   businesses.forEach((business) => {
//   	Business.create({
// 			businessName: business.name,
// 			businessPhone: business.phone,
//       businessCity: business.location.city,
//       businessType: business.categories
//   	}).then(function(result) {
//       console.log('built', result);
//     });
//   });
// })
// .catch(function (err) {
//   console.error(err);
// });

module.exports = yelp;
