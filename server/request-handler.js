//Yelp
var yelp = require('./yelp/api-request.js');
var Business = require('../database-mongo/index.js').Business;



exports.checkBusinessData = function(req, res) {
	Business.find({}).exec(function(result) {
		console.log('result');
		// res.send(JSON.stringify(result));
	});
}

//BusinessType: req.body.category, BusinessCity: req.body.location
/*
exports.checkBusinessData = function(req, res) {
	db.Businesses.find({BusinessType: req.body.category, BusinessCity: req.body.location}, function(err, result) {
			if(err) {
				res.status(500).send({ error: 'Something failed!' });
			} else if(result.length < 10) {
				var params = {};
				params.location = req.body.location;
				params.term = req.body.term; //search term
				params.category = req.body.category; //refer to https://www.yelp.com/developers/documentation/v2/all_category_list
				params.sort = 2;
				yelp.search(params, function(result) {
					res.json(result);
				}); 
			} else {

			}
		}
	});

	console.log('trying to check if business data exist in database');
	//add in logic to check if there is enough data in our database - probablh use promises
	//Making the assumption that JSON file is being received with the following keys.
	var params = {};
	params.location = req.body.location;
	params.term = req.body.term; //search term
	params.category = req.body.category; //refer to https://www.yelp.com/developers/documentation/v2/all_category_list
	params.sort = 2;
	yelp.search(params, function(result) {
		res.json(result);
	}); 
}
*/