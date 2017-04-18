const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");



// Define our model
const userSchema = new Schema ({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: String,
  points: Number,
  entries: [{
              ask: String,
              askee: String,
              outcome: String,
              category: String,
              timestamp: { type: Date, default: Date.now }
            }]
});

// On save hook, encrypt password
// Before saving a model, run this function
userSchema.pre("save", function(next) {
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash our password using the salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text model
      user.password = hash;
      next();
    })
  })
});

/*
userSchema.methods.comparePassword = function(candidatePassword, user, callback) {
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) { return callback(err); }
    console.log("password stuff: ", candidatePassword);
    console.log("user password: ", user.password);
    console.log("ismatch: ", isMatch);
    callback(null, isMatch);
  });
};
*/

userSchema.methods.comparePassword = function(candidatePassword, userPassword, cb) {
  bcrypt.compare(candidatePassword, userPassword, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};



// Create the model class
const ModelClass = mongoose.model("user", userSchema);

// Export the model
module.exports = ModelClass;
