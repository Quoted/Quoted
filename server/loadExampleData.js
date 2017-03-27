var yelp = require('./yelp/yelp-query.js');



var loadExampleData = function() {
  console.log('Loading Starter Data');
  yelp.queryApi({category: 'Home Repair', term: 'Home Repair', location: 'San Francisco'});
  yelp.queryApi({category: 'Auto Repair', term: 'Auto Repair', location: 'San Francisco'});
  yelp.queryApi({category: 'Computer Repair', term: 'Auto Repair', location: 'San Francisco'});
  yelp.queryApi({category: 'Phone Repair', term: 'Auto Repair', location: 'San Francisco'});
  yelp.queryApi({category: 'Sewer Repair', term: 'Auto Repair', location: 'San Francisco'});
  yelp.queryApi({category: 'Home Repair', term: 'Home Repair', location: 'Oakland'});
  yelp.queryApi({category: 'Auto Repair', term: 'Auto Repair', location: 'Oakland'});
  yelp.queryApi({category: 'Computer Repair', term: 'Auto Repair', location: 'Oakland'});
  yelp.queryApi({category: 'Phone Repair', term: 'Auto Repair', location: 'Oakland'});
  yelp.queryApi({category: 'Sewer Repair', term: 'Auto Repair', location: 'Oakland'});  
  yelp.queryApi({category: 'Home Repair', term: 'Home Repair', location: 'San Jose'});
  yelp.queryApi({category: 'Auto Repair', term: 'Auto Repair', location: 'San Jose'});
  yelp.queryApi({category: 'Computer Repair', term: 'Auto Repair', location: 'San Jose'});
  yelp.queryApi({category: 'Phone Repair', term: 'Auto Repair', location: 'San Jose'});
  yelp.queryApi({category: 'Sewer Repair', term: 'Auto Repair', location: 'San Jose'});    
}


module.exports.loadExampleData = loadExampleData;