var Mercenary = require("../models/mercenary");
var Listing = require("../models/listing");

module.exports = {
  new: newMercenary,
  create,
  addToParty,
};

function addToParty(req, res) {
  Listing.findById(req.params.id, function (err, listing) {
    listing.party.push(req.body.mercenaryId);
    listing.save(function (err) {
      res.redirect(`/listings/${listing._id}`);
    });
  });
}

function create(req, res) {
  Mercenary.create(req.body, function (err, mercenary) {
    res.redirect("/mercenaries/new");
  });
}

function newMercenary(req, res) {
  Mercenary.find({}, function (err, mercenaries) {
    res.render("mercenaries/new", {
      title: "Add Mercenary",
      mercenaries,
    });
  });
}
