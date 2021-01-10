var express = require('express');
var router = express.Router();
const user = require('../components/user');


router.get('/', function(req, res, next) {
  res.send({});
});

router.post('/', function(req, res, next) {
  res.send({});
})

router.delete('/', function(req, res, next) {
  res.send({});
})

module.exports = router;
