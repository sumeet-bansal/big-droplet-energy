var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('echo', {
		username : req.query.first_name + " " + req.query.last_name,
		datetime : new Date().toLocaleString(),
		bgcolor : req.query.color
	});
});
router.post('/', function(req, res) {
	res.render('echo', {
		username : req.body.first_name + " " + req.body.last_name,
		datetime : new Date().toLocaleString(),
		bgcolor : req.body.color
	});
});

module.exports = router;
