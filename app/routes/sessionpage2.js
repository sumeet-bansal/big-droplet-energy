var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var c;
    if (req.cookies.username) {
        c = "Hi, "+req.cookies.username+" nice to meet you!";
    } else {
        c = "Howdy stranger. Please tell me your name on page1!";
    }
    res.render('sessionpage2', {
        content: c
    });

});

module.exports = router;
