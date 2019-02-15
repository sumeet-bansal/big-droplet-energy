var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const options = {
	user: 'root',
	password: 'space bar',
	database: 'localhost'
}

router.post('/create', function(req, res) {
	let params = req.headers['content-type'] ? req.body : req.query;
	if (!params.login) {
		return res.status(400).send({
			message : 'No login attribute specified.'
		});
	}
	if (!params.fullname) {
		return res.status(400).send({
			message : 'No fullname attribute specified.'
		});
	}
	if (!params.admin) {
		params.admin = false;
	}
	const connection = mysql.createConnection(options);
	connection.connect(err => {
		if (err) {
			connection.end();
			return res.status(500).send({
				message : 'Unable to connect to the database.'
			});
		}
		connection.query('INSERT INTO users SET ?', params, (error, results, fields) => {
			if (error) {
				connection.end();
				return res.status(500).send({
					message : 'Database insert failed.'
				});
			}
		});
	});
	connection.end();
	return res.status(200);
});

router.get('/read', function(req, res) {
	let params = req.headers['content-type'] ? req.body : req.query;
	if (!params.login) {
		return res.status(400).send({
			message : 'No login attribute specified.'
		});
	}
	// select * from users where login=login
	res.send(JSON.stringify({
		'fullname' : 'Steph',
		'login' : 'gs30',
		'admin' : 'true'
	}));
});

router.put('/update', function(req, res) {
	let params = req.headers['content-type'] ? req.body : req.query;
	if (!params.login) {
		return res.status(400).send({
			message : 'No login attribute specified.'
		});
	}
	/*
	if user not in db {
		return res.status(404).send({
			message : 'Requested user not found.'
		});
	} */
	if (!params.fullname) {
		return res.status(400).send({
			message : 'No fullname attribute specified.'
		});
	}
	if (!params.admin) {
		params.admin = false;
	}
	// update user in database
	// response
});

router.delete('/delete', function(req, res) {
	let params = req.headers['content-type'] ? req.body : req.query;
	if (!params.login) {
		return res.status(400).send({
			message : 'No login attribute specified.'
		});
	}
	// delete from users where login=login
	// response
});

module.exports = router;