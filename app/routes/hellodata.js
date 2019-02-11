var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	let format = req.query.response.toLowerCase();
	let dt = new Date();
	if (format == "xml") {
		return res.send("<?xml version='1.0' encoding='UTF-8'?>Hello Data it's " + dt.getTime());
	}
	if (format == "json") {
		return res.send({"msg": "Hello Data it's " + dt.getTime()});
	}
	res.render('helloworld_error');
});

module.exports = router;
