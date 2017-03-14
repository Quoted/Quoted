//Yelp
var yelp = require('./yelp/api-request.js');

exports.checkBusinessData = function(req, res) {
	console.log('trying to check if business data exist in database');
	//Making the assumption that JSON file is being received with the following keys.
	var params = {};
	params.location = req.body.location;
	params.term = req.body.term; //search term
	params.category = req.body.category; //refer to https://www.yelp.com/developers/documentation/v2/all_category_list
	yelp.request_yelp();
}