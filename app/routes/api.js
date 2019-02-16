var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const options = {
	user: 'root',
	password: 'space bar',
	database: 'test'
}

router.post('/create', function(req, res) {
	let params = req.headers['content-type'] ? req.body : req.query;
	if (!params.login) {
		return res.status(400).send({
			message: 'No login attribute specified.'
		});
	}
	if (!params.fullname) {
		return res.status(400).send({
			message: 'No fullname attribute specified.'
		});
	}
	if (!params.admin) {
		params.admin = 0;
	}
	const connection = mysql.createConnection(options);
	connection.connect(err => {
		if (err) {
			return res.status(500).send({
				message: 'Unable to connect to the database.'
			});
		}
		connection.query('INSERT INTO users SET ?', params, (error, results, fields) => {
			connection.end();
			if (error) {
				return res.status(500).send({
					message: 'Database insert failed.'
				});
			}
			return res.status(200).send({
				message: 'Database insert successful.'
			});
		});
	});
});

router.get('/read', function(req, res) {
	let id = req.headers['content-type'] ? req.body.login : req.query.login;
	if (!id) {
		return res.status(400).send({
			message: 'No login attribute specified.'
		});
	}
	const connection = mysql.createConnection(options);
	connection.connect(err => {
		if (err) {
			return res.status(500).send({
				message: 'Unable to connect to the database.'
			});
		}
		connection.query('SELECT * FROM users WHERE login = ?', [id], (error, results, fields) => {
			connection.end();
			if (error) {
				return res.status(500).send({
					message: 'Database read failed.'
				});
			}
			res.send({
				results: results
			});
		});
	});
});

router.put('/update', function(req, res) {
	let params = req.headers['content-type'] ? req.body : req.query;
	if (!params.login) {
		return res.status(400).send({
			message: 'No login attribute specified.'
		});
	}
	if (!params.fullname) {
		return res.status(400).send({
			message: 'No fullname attribute specified.'
		});
	}
	if (!params.admin) {
		params.admin = 0;
	}
	const connection = mysql.createConnection(options);
	connection.connect(err1 => {
		if (err1) {
			return res.status(500).send({
				message: 'Unable to connect to the database.'
			});
		}
		connection.query('SELECT * FROM users WHERE login = ?', [params.login], (err2, results, fields) => {
			if (err2) {
				connection.end();
				return res.status(500).send({
					message: 'Database operation failed.'
				});
			}
			if (results.length == 0) {
				connection.end();
				return res.status(400).send({
					message: 'Requested user not found.'
				});
			}
			connection.query(
				'UPDATE users SET fullname = ?, admin = ? WHERE login = ?',
				[params.fullname, params.admin, params.login], (err3, results, fields) => {
					connection.end();
					if (err3) {
						return res.status(500).send({
							message: 'Database update failed.'
						});
					}
					return res.status(200).send({
						message: 'Database update successful.'
					});
				});
		});
	});
});

router.delete('/delete', function(req, res) {
	let params = req.headers['content-type'] ? req.body : req.query;
	if (!params.login) {
		return res.status(400).send({
			message: 'No login attribute specified.'
		});
	}
	const connection = mysql.createConnection(options);
	connection.connect(err => {
		if (err) {
			return res.status(500).send({
				message: 'Unable to connect to the database.'
			});
		}
		connection.query('DELETE FROM users WHERE login = ?', [params.login], (error, results, fields) => {
			connection.end();
			if (error) {
				return res.status(500).send({
					message: 'Database deletion failed.'
				});
			}
			return res.status(200).send({
				message: 'Database deletion successful.'
			});
		});
	});
});

module.exports = router;