var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('env', {
        data: JSON.stringify(req.headers)
    });
});

module.exports = router;
