var Listing = require("../models/listing");

module.exports = {
  create,
  delete: deleteReview,
  update: updateReview,
};

function deleteReview(req, res, next) {
  Listing.findOne({ "reviews._id": req.params.id }).then(function (listing) {
    const review = listing.reviews.id(req.params.id);
    if (!review.user.equals(req.user._id))
      return res.redirect(`/listings/${listing._id}`);
    review.remove();
    listing
      .save()
      .then(function () {
        res.redirect(`/listings/${listing._id}`);
      })
      .catch(function (err) {
        return next(err);
      });
  });
}

function create(req, res) {
  Listing.findById(req.params.id, function (err, listing) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    listing.reviews.push(req.body);
    listing.save(function (err) {
      res.redirect(`/listings/${listing._id}`);
    });
  });
}

function updateReview(req, res) {
  Listing.findOne({ "reviews._id": req.params.id }, function (err, listing) {
    const review = listing.reviews.id(req.params.id);
    if (!review.user._id.equals(req.user._id))
      return res.redirect(`/listings/${listing._id}`);
    Object.assign(review, req.body);
    listing.save(function (err) {
      res.redirect(`/listings/${listing._id}`);
    });
  });
}
