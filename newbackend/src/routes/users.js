var express = require('express');
var router = express.Router();
const db = require('../firestore/firebase');


router.get('/', async function(req, res, next) {
  console.log('GET /users');
  const param = req.query;
  db.collection('users').where('uuid', '=', param.uuid).get()
  .then(docs => {
    docs.forEach(user => res.send({msg: 'Success', user: user._fieldsProto}));
  })
});

router.post('/', async function(req, res, next) {
  console.log('POST /users');
  const param = req.body;
  const docRef = db.collection('users').doc();
  docRef.set(param);
  res.send({msg: 'Success'});
})

module.exports = router;
