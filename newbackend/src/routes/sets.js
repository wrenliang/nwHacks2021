var express = require('express');
var router = express.Router();
const db = require('../firestore/firebase');

router.get('/', function(req, res, next) {
  const param = req;

  db.collection('sets').where(param.owner, '=', param.uuid).get()
  .then(docs => {
    let sets = [];
    docs.forEach(doc => {
       sets.push(doc.data());
    })
    res.send({msg: 'Success',sets: sets});
  });
 });
 
 router.post('/', function(req, res, next) {
  //INSERT PARSING LOGIC HERE

  const param = req.body;

  db.collection('sets').doc()
  .then(doc => {
    doc.set(param);
    res.send({msg: 'Success'});
  })
 })

 router.put('/', function(req, res, next) {
  //INSERT PARSING LOGIC HERE

  const param = req.body;

  db.collection('sets').where('creatorId', '=', param.creatorId).where('title', '=', param.title).get()
  .then(docs => {
    docs.forEach(doc => doc.ref.update({param}));
    res.send({msg: 'Success'});
  })
})

 
 router.delete('/', function(req, res, next) {
  const param = req.body;

  db.collection('sets').where('name', '=', param.name).where('creatorId', '=', param.creatorId).get()
  .then(docs => {
    docs.forEach(doc => doc.ref.delete());
    res.send({msg: 'Success'});
  });
 })


module.exports = router;
