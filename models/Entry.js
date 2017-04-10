var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
  ask: String,
  askee: String,
  outcome: String,
  category: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entry', EntrySchema);
