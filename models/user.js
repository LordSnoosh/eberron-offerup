var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: String,
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
