var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
      meetingPlace: {
        type: String,
        required: true,
      },
      challengeRating: String,
      recClass: String,
      party: [{type: Schema.Types.ObjectId, ref: 'Mercenary'}],
      RecList: [],
      reviews: [reviewSchema]
    }, {
      timestamps: true
    });
    
    module.exports = mongoose.model('Listing', listingSchema);
