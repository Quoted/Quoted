var yelp = require('./yelp/yelp-query.js');



var loadExampleData = function() {
  console.log('Loading Starter Data');
  yelp.queryApi({category: 'Home Repair', term: 'Home Repair', location: 'San Francisco'});
  yelp.queryApi({category: 'Auto Repair', term: 'Auto Repair', location: 'San Francisco'});
}


module.exports.loadExampleData = loadExampleData;