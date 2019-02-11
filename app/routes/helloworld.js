var express = require('express');
var router = express.Router();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
  
var colors = ['blue','yellow','white'];


/* GET helloworld page. */
router.get('/', function(req, res, next) {
    var now = new Date();
    var str = now.getUTCFullYear().toString() + "/" +
          (now.getUTCMonth() + 1).toString() +
          "/" + now.getUTCDate() + " " + now.getUTCHours() +
          ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds();

  res.render('helloworld', {
      datetime: str,
      bgcolor: colors[getRandomInt(3)]
  });
});

module.exports = router;
