const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");



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
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text model
      user.password = hash;
      next();
    })
  })
});

userSchema.methods.comparePassword = function(candidatePassword, user, callback) {
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) { return callback(err); }
    console.log("password stuff: ", candidatePassword);
    console.log("user password: ", user.password);
    console.log("ismatch: ", isMatch);
    callback(null, isMatch);
  });
};

/*
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    console.log("password stuff: ", candidatePassword);
    console.log("user password: ", this);
    callback(null, isMatch);
  });
};
*/

userSchema.post("findOneAndUpdate", function(result) {
  let totalPoints = 0;
  for (let pos=0; pos < result.entries.length; pos++) {
    if (result.entries[pos].outcome == "rejected") {
      totalPoints = totalPoints + 10;
    } else {
      totalPoints = totalPoints + 1;
    }
  }


  result.points = totalPoints;
  result.save(function(err, product, numAffected) {
    if (err) { return err };
    console.log("Points successfully updated!");
  })

});


// Create the model class
const ModelClass = mongoose.model("user", userSchema);

// Export the model
module.exports = ModelClass;
