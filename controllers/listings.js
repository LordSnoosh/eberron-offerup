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
  // Assign the logged in user's id
  listing.user = req.user._id;
  listing.save(function(err) {
    // Probably want to go to newly added book's show view
    res.redirect(`/listings/${listing._id}`);
  });
}

// function create(req, res) {
//   Listing.create(req.body, function (err, listing) {
//     if (err) console.log(err);
//     res.redirect("/listings");
//   });
// }

function deleteListing(req, res) {
  Listing.findOneAndDelete(
    // Ensue that the book was created by the logged in user
    {_id: req.params.id, user: req.user._id}, function(err) {
      // Deleted book, so must redirect to index
      res.redirect('/listings');
    }
  );
}

// function deleteListing(req, res, next) {
//   Listing.findOne({'listing._id': req.params.id}) 
//     if (!listing.user.equals(req.user._id));
//     listing.remove().then(function() {
//       res.redirect("/");
//     }).catch(function(err) {
//       return next(err);
//     });
//   };


// function deleteListing(req, res) {
//   Listing.findByIdAndDelete(req.params.id, function (err, deletedListing) {
//     if (err) console.log(err);
//   });
//   res.redirect("/listings");
// }
