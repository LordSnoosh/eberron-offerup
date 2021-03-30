var Listing = require("../models/listing");
var Mercenary = require("../models/mercenary");

module.exports = {
  index,
  show,
  new: newListing,
  create,
  delete: deleteListing,
};

function index(req, res) {
  Listing.find({}, function (err, listings) {
    res.render("listings/index", { title: "All Listings", listings });
  });
}

function show(req, res) {
  Listing.findById(req.params.id)
    .populate("party")
    .exec(function (err, listing) {
      Mercenary.find(
        { _id: { $nin: listing.party } },
        function (err, mercenaries) {
          res.render("listings/show", {
            title: "Listing Detail",
            listing,
            mercenaries,
          });
        }
      );
    });
}

function newListing(req, res) {
  res.render("listings/new", { title: "Add Listing" });
}

function create(req, res) {
  Listing.create(req.body, function (err, listing) {
    if (err) console.log(err);
    res.redirect("/listings");
  });
}

// function deleteListing(req, res) {
//   Listing.findOne({'listing'})
// }

function deleteListing(req, res) {
  Listing.findByIdAndDelete(req.params.id, function (err, deletedListing) {
    if (err) console.log(err);
  });
  res.redirect("/listings");
}
