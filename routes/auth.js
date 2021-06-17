var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  const { email, pwd } = req.body;
  
});

module.exports = router;
