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
  const listing = new Listing(req.body);
  listing.user = req.user._id;
  listing.name = req.user.userName;
  listing.avatar = req.user.userAvatar;
  listing.save(function(err) {
    res.redirect(`/listings/${listing._id}`);
  });
};

function deleteListing(req, res) {
  Listing.findOneAndDelete(
    {_id: req.params.id, user: req.user._id}, function(err) {
      res.redirect('/listings');
    }
  );
};

// This function along with removing the IF statement
// in index.ejs allows full delete
// function deleteListing(req, res) {
//   Listing.findByIdAndDelete(req.params.id, function (err, deletedListing) {
//     if (err) console.log(err);
//   });
//   res.redirect("/listings");
// }
