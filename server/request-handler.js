//Yelp
var Business = require('../database-mongo/index.js').Business;



exports.checkBusinessData = function(req, res) {
	Business.find({}).then(function(result) {
		console.log('result', result);
		res.send(JSON.stringify(result));
	});
}

