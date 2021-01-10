var express = require('express');
var router = express.Router();
const db = require('../firestore/firebase');


router.get('/', function(req, res, next) {
  const param = req;
  db.collection('users').where('uuid', '=', param.uuid).get()
  .then(docs => {
    docs.forEach(user => res.send({msg: 'Success', user: user}));
  })
});

router.post('/', function(req, res, next) {
  const param = req.body;
  db.collection('users').doc()
  .then(doc => {
    doc.set(param);
    res.send({msg: 'Success'})
  })
})

module.exports = router;
