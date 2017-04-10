var express = require('express');
var router = express.Router();
const jwt = require("jwt-simple");
const config = require("../config");
var mongoose = require('mongoose');
var User = require('../models/User.js');
/* GET /entries listing. */

let decodeToken = (token) => {
  var decoded = jwt.decode(token, config.secret);
  var subjectId = decoded.sub;
  return subjectId;
}

/* ==== GET USER'S ENTRIES ==== */

router.get('/', function(req, res, next) {
  let userId = decodeToken(req.headers.authorization);
  User.
    findById(userId,
    function(err, entries) {
    if (err) return next(err);
    console.log(entries.entries);
    res.json(entries.entries);
  })
});


/*
router.get('/', function(req, res, next) {
  let userId = decodeToken(req.headers.authorization);
  Entry.find(function(err, entries) {
    if (err) return next(err);
    res.json(entries);
  })
});
*/

/* ==== POST USER'S ENTRIES ==== */

router.post('/', function(req, res, next) {
  let userId = decodeToken(req.headers.authorization);
  User.update(
    { _id: userId },
    { $push: { entries: req.body } },
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/*
router.post('/', function(req, res, next) {
  Entry.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/

router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* ==== DELETE USER'S ENTRY ==== */

router.delete('/:id', function(req, res, next) {
  let userId = decodeToken(req.headers.authorization);
  User.update(
    { _id : userId },
    { $pull: { entries : { _id: req.params.id } } },
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/*
router.delete('/:id', function(req, res, next) {
  Entry.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    { _id : req.params.id }
    res.json(post);
  });
});
*/

module.exports = router;
