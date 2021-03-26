const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reviewSchema = new Schema({
    content: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, default: 5},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
});

var listingSchema = new Schema({
    title: {
        type: String,
        required: true
      },
      releaseYear: {
        type: Number,
        default: function () {
          return new Date().getFullYear();
        }
      },
      mpaaRating: String,
      cast: [{type: Schema.Types.ObjectId, ref: 'Mercenary'}],
      nowShowing: { type: Boolean, default: false },
      reviews: [reviewSchema]
    }, {
      timestamps: true
    });
    
    module.exports = mongoose.model('Listing', listingSchema);
