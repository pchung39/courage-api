var User = require('../models/User.js');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const jwt = require("jwt-simple");
const config = require("../config");

let decodeToken = (token) => {
  var decoded = jwt.decode(token, config.secret);
  var subjectId = decoded.sub;
  return subjectId;
}


/* ==== GET USERS ===== */

router.get("/", function(req, res, next) {
  User.
    find( function(err, users) {
    if (err) return next(err);
    res.json(users);
  })
});

/* ==== GET CURRENT USER ===== */

router.get("/user", function(req, res, next) {
  let userId = decodeToken(req.headers.authorization);
  User.
    findById(userId,
    function(err, user) {
    if (err) return next(err);
    res.json(user.name);
  })
})

module.exports = router;
