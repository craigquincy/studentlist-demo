var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Is this page working?', _layoutFile: 'layout.ejs' });
});

module.exports = router;
