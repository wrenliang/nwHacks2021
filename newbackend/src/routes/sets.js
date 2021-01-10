var express = require('express');
var router = express.Router();
const db = require('../firestore/firebase');

router.get('/', async function(req, res, next) {
  console.log('GET /sets');
  const param = req.query;
  const filter = param.creatorId ? 'creatorId' : 'collaboratorId'

  db.collection('sets').where(filter, '=', param[filter]).get()
  .then(docs => {
    let sets = [];
    docs.forEach(doc => {
       sets.push(doc.data());
    })
    res.send({msg: 'Success', sets: sets});
  });
 });
 
 router.post('/', async function(req, res, next) {
  console.log('POST /sets');

  const param = req.body;

  const docRef = await db.collection('sets').doc()
  docRef.set(param);
  res.send({msg: 'Success'});
 })

 router.put('/', async function(req, res, next) {
  console.log('PUT /sets');

  const param = req.body;

  db.collection('sets').where('creatorId', '=', param.creatorId).where('title', '=', param.title).get()
  .then(docs => {
    docs.forEach(doc =>
      doc.ref.update({param}));
    res.send({msg: 'Success'});
  })
})

 
 router.delete('/', function(req, res, next) {
  console.log('DELETE /sets');

  const param = req.body;

  db.collection('sets').where('title', '=', param.title).where('creatorId', '=', param.creatorId).get()
  .then(docs => {
    docs.forEach(doc => doc.ref.delete());
    res.send({msg: 'Success'});
  });
 })


module.exports = router;
