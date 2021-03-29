var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pcClassSchema = new Schema({
  name: String
}, {
  timestamps: true
});

module.exports = mongoose.model('PcClass', pcClassSchema);