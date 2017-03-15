//Yelp
var db = require('../database-mongo/index.js');
var Business = require('../database-mongo/models/business.js');
var User = require('../database-mongo/models/user.js');
// var Business = require('../database-mongo/index.js').Business;

exports.checkBusinessData = function(req, res) {
	Business.find({}).then(function(result) {
		console.log('result', result);
		res.send(JSON.stringify(result));
	});
}

