const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mercenarySchema = new Schema({
  name: {type: String, required: true, unique: true},
  characterClass: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Mercenary', mercenarySchema);