var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.clearCookie('username');
    res.clearCookie('connect.sid');
    res.render('clearsession');
});

module.exports = router;
