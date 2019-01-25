const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json("api index");
});

module.exports = router;
