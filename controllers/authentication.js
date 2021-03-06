const User = require("../models/User");
const jwt = require("jwt-simple");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });

}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  if (!email || !password) {
    return res.status(422).send({ error: "You must provide email and password" });
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    // If a user with email does not exist, create and save user record
    const user = new User({
      name: name,
      email: email,
      password: password,
      points: 0
    });

    user.save(function(err) {
      if (err) { return next(err); }
      res.json({ token: tokenForUser(user) });
    });

  })


}
