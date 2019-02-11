var express = require('express');
var router = express.Router();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
  
var colors = ['blue','yellow','white'];


/* GET helloworld page. */
router.get('/', function(req, res, next) {
    var m = new Date();
    var str =
        m.getUTCFullYear() + "/" +
        ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
        ("0" + m.getUTCDate()).slice(-2) + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2);


  res.render('helloworld', {
      datetime: str,
      bgcolor: colors[getRandomInt(3)]
  });
});

module.exports = router;
