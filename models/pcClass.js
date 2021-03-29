var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mercenarySchema = new Schema({
  name: {type: String, required: true, unique: true},
  characterClass: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Mercenary', mercenarySchema);